import { Geolocation } from '@capacitor/geolocation';
import { Flashlight } from '@awesome-cordova-plugins/flashlight';
import { Device } from '@capacitor/device';
import { Toast } from '@capacitor/toast';
import { Motion } from '@capacitor/motion';
import QRCode from 'qrcode';
import { OfflineContent } from './content';
import './styles.css';

// --- STATE & CONFIG ---
const state = {
    isStrobeOn: false,
    strobeInterval: null,
    isSirenOn: false,
    whistleOscillator: null
};

// --- NAVIGATION ---
window.Navigation = {
    to: (viewId, btnEl) => {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        document.querySelectorAll('.page-view').forEach(v => {
            v.classList.add('hidden');
            v.classList.remove('animate-fade');
        });

        const target = document.getElementById('view-' + viewId);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('animate-fade');
        }
    }
};

// --- APP CORE ---
window.App = {
    init: async () => {
        console.log("QuakeSafe Pro Initialized");
        App.updateStatus();
        setInterval(App.updateStatus, 30000);
    },

    updateStatus: async () => {
        try {
            const bat = await Device.getBatteryInfo();
            const batEl = document.getElementById('battery-status');
            if (batEl) batEl.innerText = Math.round((bat.batteryLevel || 1) * 100) + '%';
        } catch (e) { }

        try {
            const perm = await Geolocation.checkPermissions();
            const gpsEl = document.getElementById('gps-status');
            if (gpsEl) {
                if (perm.location === 'granted') gpsEl.style.color = '#32D74B';
                else gpsEl.style.color = '#555';
            }
        } catch (e) { }
    },

    // --- SOS LONG PRESS LOGIC ---
    sosTimer: null,
    sosHoldDuration: 1500, // 1.5s
    sosStartTime: 0,

    startSOSHold: () => {
        const btn = document.querySelector('.panic-btn');
        const ring = document.querySelector('.pulse-ring');

        if (btn) btn.style.transform = 'scale(0.95)';
        if (ring) {
            ring.style.animation = 'none'; // Reset
            ring.offsetHeight; /* trigger reflow */
            ring.style.animation = `pulse-animation ${App.sosHoldDuration}ms forwards`; // Use hold duration
            ring.style.opacity = '1';
        }

        App.sosStartTime = Date.now();
        App.sosTimer = setTimeout(() => {
            App.triggerSOS();
        }, App.sosHoldDuration);
    },

    endSOSHold: () => {
        const btn = document.querySelector('.panic-btn');
        const ring = document.querySelector('.pulse-ring');

        if (btn) btn.style.transform = 'scale(1)';

        // Check if hold was long enough handled by timer, but if released early:
        if (Date.now() - App.sosStartTime < App.sosHoldDuration) {
            clearTimeout(App.sosTimer);
            if (ring) {
                ring.style.animation = ''; // Revert to idle pulse if we want or hide
                ring.style.opacity = '0';
            }
        }
        App.sosTimer = null;
    },

    triggerSOS: async () => {
        // Visual Success Feedback
        const btn = document.querySelector('.panic-btn');
        if (btn) {
            btn.style.boxShadow = '0 0 50px #fff';
            setTimeout(() => btn.style.boxShadow = '', 200);
        }

        if (navigator.vibrate) navigator.vibrate([500, 100, 500]);
        TacticalTools.startSOS();
        TacticalTools.playSiren();
        await Toast.show({ text: 'ACİL DURUM MODU AKTİF!', duration: 'long', position: 'center' });
    },

    toggleSOS: async () => {
        // Legacy click handler removed or re-routed
        // console.log("Use hold to activate");
    },

    shareLocation: async () => {
        try {
            const pos = await Geolocation.getCurrentPosition();
            const msg = `ACİL: ${pos.coords.latitude}, ${pos.coords.longitude} (${pos.coords.accuracy}m)`;
            alert(msg);
        } catch (e) { alert("Konum hatası: " + e.message); }
    }
};

// --- MODULES ---
window.TacticalTools = {
    toggleFlash: async () => {
        try {
            if (await Flashlight.isSwitchedOn()) await Flashlight.switchOff();
            else await Flashlight.switchOn();
        } catch (e) { }
    },
    startStrobe: async () => {
        if (state.isStrobeOn) {
            clearInterval(state.strobeInterval);
            await Flashlight.switchOff();
            state.isStrobeOn = false;
            return;
        }
        state.isStrobeOn = true;
        state.strobeInterval = setInterval(async () => { try { await Flashlight.toggle(); } catch (e) { } }, 100);
    },
    startSOS: async () => {
        // SOS Pattern: ... --- ...
        // Simplified for this demo as just "On" or specific flashing could be implemented
        await Flashlight.switchOn();
    },
    toggleWhistle: () => {
        if (state.whistleOscillator) {
            state.whistleOscillator.stop();
            state.whistleOscillator = null;
            return;
        }
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(3000, ctx.currentTime);
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        state.whistleOscillator = osc;
    },
    playSiren: () => {
        if (state.isSirenOn) return;
        state.isSirenOn = true;
        TacticalTools.toggleWhistle();
    },
    openPoliceMode: () => {
        const overlay = document.getElementById('overlay-police');
        overlay.classList.remove('hidden');
    },
    openMirror: () => {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then(stream => {
                let vid = document.getElementById('mirror-video');
                if (!vid) {
                    vid = document.createElement('video');
                    vid.id = 'mirror-video';
                    vid.className = 'full-screen';
                    vid.style.objectFit = 'cover';
                    vid.style.transform = 'scaleX(-1)';
                    vid.onclick = () => { vid.pause(); vid.remove(); stream.getTracks().forEach(t => t.stop()); };
                    document.body.appendChild(vid);
                }
                vid.srcObject = stream;
                vid.play();
            })
            .catch(e => alert("Kamera hatası: " + e));
    }
};

window.ContentManager = {
    render: () => {
        const container = document.getElementById('info-content');
        if (!container) return;
        container.innerHTML = Object.keys(OfflineContent).map(key => {
            const item = OfflineContent[key];
            return `
                <div class="glass-panel p-4 mb-4 rounded-xl border-l-4" style="border-left-color: ${item.color === 'red' ? '#ef4444' : (item.color === 'green' ? '#22c55e' : '#f97316')}">
                    <div class="flex justify-between items-center mb-2 cursor-pointer" onclick="ContentManager.toggle('${key}')">
                        <h3 class="font-bold text-lg">${item.title}</h3>
                        <i data-lucide="chevron-down" id="icon-${key}"></i>
                    </div>
                    <div id="content-${key}" class="hidden text-gray-300 mt-2 text-sm">
                        ${item.html}
                    </div>
                </div>
            `;
        }).join('');
        if (window.lucide) lucide.createIcons();
    },
    toggle: (key) => {
        const el = document.getElementById(`content-${key}`);
        const icon = document.getElementById(`icon-${key}`);
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            el.classList.add('hidden');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    }
};

window.ProfileManager = {
    data: JSON.parse(localStorage.getItem('qs_profile')) || { name: 'İSİMSİZ', blood: 'Bilinmiyor' },
    init: () => { ProfileManager.render(); },
    render: () => {
        const qrContainer = document.getElementById('qrcode-container');
        if (qrContainer) {
            const info = `AD: ${ProfileManager.data.name}\nKAN: ${ProfileManager.data.blood}\nACİL: 112`;
            QRCode.toCanvas(info, { width: 200, margin: 2 }, function (err, canvas) {
                if (!err) {
                    qrContainer.innerHTML = '';
                    qrContainer.appendChild(canvas);
                }
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
    if (window.ContentManager) ContentManager.render();
    if (window.ProfileManager) ProfileManager.init();
    if (window.lucide) lucide.createIcons();
});

"use client";

import { Siren } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface LifesaverProps {
    active: boolean;
    onClose: () => void;
}

export default function Lifesaver({ active, onClose }: LifesaverProps) {
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const flashIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Whistle Logic
    const startWhistle = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            audioContextRef.current = ctx;

            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(3000, ctx.currentTime);

            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            oscillatorRef.current = osc;
        } catch (e) {
            console.error(e);
        }
    };

    const stopWhistle = () => {
        if (oscillatorRef.current) {
            try { oscillatorRef.current.stop(); } catch (e) { }
            oscillatorRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    // Flash Logic
    const triggerFlash = () => {
        document.body.style.backgroundColor = 'white';
        setTimeout(() => {
            document.body.style.backgroundColor = '#000000'; // Reset to pure black for contrast
        }, 100);
    };

    useEffect(() => {
        if (active) {
            startWhistle();
            flashIntervalRef.current = setInterval(triggerFlash, 500);
        } else {
            stopWhistle();
            if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
            document.body.style.backgroundColor = '';
        }

        return () => {
            stopWhistle();
            if (flashIntervalRef.current) clearInterval(flashIntervalRef.current);
            document.body.style.backgroundColor = '';
        };
    }, [active]);

    if (!active) return null;

    return (
        <div
            id="lifesaver-overlay"
            onClick={triggerFlash}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-center select-none cursor-pointer"
        >
            <div className="w-48 h-48 rounded-full bg-red-900/20 flex items-center justify-center mb-10 animate-pulse">
                <Siren size={96} className="text-red-600" />
            </div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">ENKAZ MODU</h1>
            <p className="text-red-500 font-bold uppercase tracking-[0.2em] animate-pulse">Yardım için ekrana dokun</p>

            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute bottom-32 border border-[#333] px-8 py-3 rounded-full text-sm font-bold text-gray-400 hover:bg-[#111] transition-colors"
            >
                MODU KAPAT
            </button>
        </div>
    );
}

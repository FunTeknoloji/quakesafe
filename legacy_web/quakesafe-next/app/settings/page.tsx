"use client";

import { useSettings } from '@/context/SettingsContext';
import { RotateCcw, CreditCard, Map, MessageSquareWarning, Edit2, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
    const { settings, updateSettings, resetSettings } = useSettings();
    const [activeModal, setActiveModal] = useState<'sos' | 'profile' | 'plan' | null>(null);

    // Local state for forms
    const [tempSos, setTempSos] = useState(settings.sosMessage);
    const [tempProfile, setTempProfile] = useState(settings.profile);
    const [tempPlan, setTempPlan] = useState(settings.plan);

    const openModal = (modal: 'sos' | 'profile' | 'plan') => {
        if (modal === 'sos') setTempSos(settings.sosMessage);
        if (modal === 'profile') setTempProfile({ ...settings.profile });
        if (modal === 'plan') setTempPlan({ ...settings.plan });
        setActiveModal(modal);
    };

    const closeModal = () => setActiveModal(null);

    const saveSos = () => {
        updateSettings({ sosMessage: tempSos });
        closeModal();
    };

    const saveProfile = () => {
        updateSettings({ profile: tempProfile });
        closeModal();
    };

    const savePlan = () => {
        updateSettings({ plan: tempPlan });
        closeModal();
    };

    return (
        <main className="pt-8 px-5 max-w-md mx-auto pb-24">
            <h2 className="text-2xl font-black text-white mb-6">Ayarlar</h2>

            {/* 1. GENEL */}
            <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Genel</h3>
                <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">

                    {/* Text Size */}
                    <div className="p-4 border-b border-[#222]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-white">Metin Boyutu</span>
                            <span className="text-xs text-gray-400">
                                {settings.textSize === 1 ? 'Küçük' :
                                    settings.textSize === 2 ? 'Normal' :
                                        settings.textSize === 3 ? 'Geniş' :
                                            settings.textSize === 4 ? 'Büyük' : 'Devasa'}
                            </span>
                        </div>
                        <input
                            type="range" min="1" max="5" step="1"
                            value={settings.textSize}
                            onChange={(e) => updateSettings({ textSize: parseInt(e.target.value) })}
                            className="w-full accent-violet-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Quick Access Toggle */}
                    <div className="p-4 border-b border-[#222] flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-white">Hızlı Erişim</h4>
                            <p className="text-[10px] text-gray-500">Ana sayfada araçları göster</p>
                        </div>
                        <button
                            onClick={() => updateSettings({ quickAccess: !settings.quickAccess })}
                            className={`w-11 h-6 rounded-full transition-colors relative ${settings.quickAccess ? 'bg-green-500' : 'bg-gray-700'}`}
                        >
                            <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${settings.quickAccess ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* High Contrast Toggle */}
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-white">Yüksek Kontrast</h4>
                            <p className="text-[10px] text-gray-500">Daha belirgin renkler</p>
                        </div>
                        <button
                            onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                            className={`w-11 h-6 rounded-full transition-colors relative ${settings.highContrast ? 'bg-green-500' : 'bg-gray-700'}`}
                        >
                            <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${settings.highContrast ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>

                </div>
            </div>

            {/* 2. PROFILE */}
            <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Profil & Acil</h3>
                <div className="bg-[#111] border border-[#222] rounded-2xl p-4 space-y-4">

                    <button onClick={() => openModal('sos')} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded-xl flex items-center justify-between active:scale-95 transition-transform">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                                <MessageSquareWarning size={16} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-white">SOS Mesajı</h4>
                                <p className="text-[10px] text-gray-500">Düzenle</p>
                            </div>
                        </div>
                        <Edit2 size={16} className="text-gray-600" />
                    </button>

                    <button onClick={() => openModal('profile')} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded-xl flex items-center justify-between active:scale-95 transition-transform">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center">
                                <CreditCard size={16} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-white">Acil Durum Kartı</h4>
                                <p className="text-[10px] text-gray-500">{settings.profile.name ? 'Dolu' : 'Boş'}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>

                    <button onClick={() => openModal('plan')} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded-xl flex items-center justify-between active:scale-95 transition-transform">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <Map size={16} />
                            </div>
                            <div className="text-left">
                                <h4 className="text-sm font-bold text-white">Aile Toplanma Planı</h4>
                                <p className="text-[10px] text-gray-500">{settings.plan.meetingPoint ? 'Planlandı' : 'Planlanmadı'}</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>

                </div>
            </div>

            {/* 3. RESET */}
            <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
                <button onClick={resetSettings} className="w-full text-left p-4 flex items-center justify-between hover:bg-[#1a1a1c] transition-colors text-red-500">
                    <span className="text-sm font-bold">Verileri Sıfırla</span>
                    <RotateCcw size={16} />
                </button>
            </div>

            <div className="text-center mt-8 space-y-2">
                <p className="text-[10px] text-gray-600">QuakeSafe Next v1.0</p>
            </div>

            {/* MODALS */}
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#141419] border border-[#333] w-full max-w-sm rounded-3xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button onClick={closeModal} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-gray-400 hover:text-white">
                            <X size={16} />
                        </button>

                        {activeModal === 'sos' && (
                            <>
                                <h3 className="text-lg font-bold text-white mb-4">SOS Mesajı</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold block mb-2">SOS SMS METNİ</label>
                                        <textarea
                                            value={tempSos}
                                            onChange={(e) => setTempSos(e.target.value)}
                                            className="w-full bg-[#222] border border-[#333] p-3 rounded-xl text-white h-32 text-sm outline-none resize-none focus:border-violet-500"
                                        />
                                    </div>
                                    <button onClick={saveSos} className="w-full bg-red-600 font-bold text-white py-3 rounded-xl">KAYDET</button>
                                </div>
                            </>
                        )}

                        {activeModal === 'profile' && (
                            <>
                                <h3 className="text-lg font-bold text-white mb-4">Acil Durum Kartı</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold block mb-1">AD SOYAD</label>
                                        <input
                                            type="text"
                                            value={tempProfile.name}
                                            onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                                            className="w-full bg-[#222] border border-[#333] p-3 rounded-xl text-white outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold block mb-1">KAN GRUBU</label>
                                        <select
                                            value={tempProfile.blood}
                                            onChange={(e) => setTempProfile({ ...tempProfile, blood: e.target.value })}
                                            className="w-full bg-[#222] border border-[#333] p-3 rounded-xl text-white outline-none focus:border-violet-500"
                                        >
                                            <option value="">Seçiniz</option>
                                            <option value="A+">A Rh+</option>
                                            <option value="A-">A Rh-</option>
                                            <option value="0+">0 Rh+</option>
                                            <option value="0-">0 Rh-</option>
                                            <option value="B+">B Rh+</option>
                                            <option value="B-">B Rh-</option>
                                            <option value="AB+">AB Rh+</option>
                                            <option value="AB-">AB Rh-</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold block mb-1">ALERJİLER</label>
                                        <textarea
                                            value={tempProfile.allergies}
                                            onChange={(e) => setTempProfile({ ...tempProfile, allergies: e.target.value })}
                                            className="w-full bg-[#222] border border-[#333] p-3 rounded-xl text-white h-24 outline-none resize-none focus:border-violet-500"
                                        />
                                    </div>
                                    <button onClick={saveProfile} className="w-full bg-violet-600 font-bold text-white py-3 rounded-xl">KAYDET</button>
                                </div>
                            </>
                        )}

                        {activeModal === 'plan' && (
                            <>
                                <h3 className="text-lg font-bold text-white mb-4">Aile Planı</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold block mb-1">TOPLANMA ALANI</label>
                                        <textarea
                                            value={tempPlan.meetingPoint}
                                            onChange={(e) => setTempPlan({ ...tempPlan, meetingPoint: e.target.value })}
                                            className="w-full bg-[#222] border border-[#333] p-3 rounded-xl text-white h-24 outline-none resize-none focus:border-violet-500"
                                            placeholder="Örn: Evin karşısındaki park..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold block mb-1">İLETİŞİM KİŞİSİ</label>
                                        <input
                                            type="text"
                                            value={tempPlan.contactPerson}
                                            onChange={(e) => setTempPlan({ ...tempPlan, contactPerson: e.target.value })}
                                            className="w-full bg-[#222] border border-[#333] p-3 rounded-xl text-white outline-none focus:border-violet-500"
                                            placeholder="Örn: Ankara'daki Dayım"
                                        />
                                    </div>
                                    <button onClick={savePlan} className="w-full bg-blue-600 font-bold text-white py-3 rounded-xl">KAYDET</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}

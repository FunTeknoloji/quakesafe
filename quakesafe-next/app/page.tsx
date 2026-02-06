"use client";

import { ShieldCheck, Zap, Activity, HeartPulse, Siren, Phone } from 'lucide-react';
import Lifesaver from '@/components/Lifesaver';
import { useState } from 'react';

export default function Home() {
    const [lifesaverActive, setLifesaverActive] = useState(false);

    return (
        <main>
            <Lifesaver active={lifesaverActive} onClose={() => setLifesaverActive(false)} />

            {/* Header */}
            <header className="glass-header">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/40">
                        <ShieldCheck size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight leading-none text-white">QuakeSafe</h1>
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Next.js Edition</span>
                    </div>
                </div>
            </header>

            <div className="pt-24 px-5 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pl-1">Acil Durum Rehberi</p>

                {/* Cards */}
                <button className="ultra-card group">
                    <div className="icon-box blue">
                        <ShieldCheck />
                    </div>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-[17px]">Deprem Öncesi</h3>
                        <p className="text-gray-400 text-xs font-medium">Hazırlık & Planlama</p>
                    </div>
                </button>

                <button className="ultra-card group">
                    <div className="icon-box orange">
                        <Zap />
                    </div>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-[17px]">Deprem Anı</h3>
                        <p className="text-gray-400 text-xs font-medium">Çök, Kapan, Tutun</p>
                    </div>
                </button>

                <button className="ultra-card group">
                    <div className="icon-box violet">
                        <Activity />
                    </div>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-[17px]">Deprem Sonrası</h3>
                        <p className="text-gray-400 text-xs font-medium">Toplanma & Güvenlik</p>
                    </div>
                </button>

                <button className="ultra-card group">
                    <div className="icon-box red">
                        <HeartPulse />
                    </div>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-[17px]">İlk Yardım</h3>
                        <p className="text-gray-400 text-xs font-medium">Hayati Müdaheleler</p>
                    </div>
                </button>

                <div className="h-px bg-white/5 my-6"></div>

                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 pl-1">Araçlar</p>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setLifesaverActive(true)}
                        className="ultra-card !flex-col !items-center !text-center !gap-3 !py-6"
                    >
                        <div className="icon-box red !w-12 !h-12 !rounded-full">
                            <Siren size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Enkaz Modu</h3>
                            <p className="text-gray-500 text-[10px]">Düdük & SOS</p>
                        </div>
                    </button>

                    <button className="ultra-card !flex-col !items-center !text-center !gap-3 !py-6">
                        <div className="icon-box green !w-12 !h-12 !rounded-full">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Numaralar</h3>
                            <p className="text-gray-500 text-[10px]">Tek Tıkla Ara</p>
                        </div>
                    </button>
                </div>

            </div>
        </main>
    );
}

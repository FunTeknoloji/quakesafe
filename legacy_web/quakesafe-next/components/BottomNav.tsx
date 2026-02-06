"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-[#141419]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-3 flex justify-around shadow-2xl z-50">
            <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-violet-500' : 'text-gray-400 hover:text-gray-200'}`}>
                <Home size={24} />
                <span className="text-[10px] font-bold">Ana Sayfa</span>
            </Link>
            <Link href="/settings" className={`flex flex-col items-center gap-1 transition-colors ${isActive('/settings') ? 'text-violet-500' : 'text-gray-400 hover:text-gray-200'}`}>
                <Settings size={24} />
                <span className="text-[10px] font-bold">Ayarlar</span>
            </Link>
        </nav>
    );
}

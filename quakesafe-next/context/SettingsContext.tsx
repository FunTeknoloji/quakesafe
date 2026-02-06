"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppSettings, defaultSettings } from '../lib/types';

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: Partial<AppSettings>) => void;
    resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem('qs_prefs');
        if (saved) {
            try {
                setSettings({ ...defaultSettings, ...JSON.parse(saved) });
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem('qs_prefs', JSON.stringify(settings));

            // Apply side effects
            document.documentElement.style.fontSize = ['14px', '16px', '18px', '20px', '22px'][settings.textSize - 1] || '16px';
            if (settings.highContrast) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
        }
    }, [settings, loaded]);

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const resetSettings = () => {
        if (confirm("Tüm kişisel veriler silinecek, emin misiniz?")) {
            setSettings(defaultSettings);
            localStorage.removeItem('qs_prefs');
            localStorage.removeItem('qs_inventory');
            localStorage.removeItem('qs_contacts');
            window.location.reload();
        }
    };

    if (!loaded) return null; // or a loader

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

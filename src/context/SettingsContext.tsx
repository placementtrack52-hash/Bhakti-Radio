'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  theme: 'dark' | 'light';
  textSize: 'sm' | 'md' | 'lg';
  animationIntensity: 'none' | 'reduced' | 'full';
  backgroundEffects: boolean;
  sleepTimerMinutes: number | null; // null = off
  lastPlayedSongId: number | null;
  lastPlaybackPosition: number;
  meditationMode: boolean;
}

const defaults: Settings = {
  theme: 'dark',
  textSize: 'md',
  animationIntensity: 'full',
  backgroundEffects: true,
  sleepTimerMinutes: null,
  lastPlayedSongId: null,
  lastPlaybackPosition: 0,
  meditationMode: false,
};

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bhakti_settings');
      if (stored) setSettings({ ...defaults, ...JSON.parse(stored) });
    } catch {}
  }, []);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem('bhakti_settings', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(defaults);
    try { localStorage.removeItem('bhakti_settings'); } catch {}
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

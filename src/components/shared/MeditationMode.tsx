'use client';

import { useSettings } from '@/context/SettingsContext';
import { usePlayer } from '@/hooks/usePlayer';
import BackgroundManager from '@/components/shared/BackgroundManager';
import { useEffect } from 'react';

export default function MeditationMode() {
  const { settings, updateSetting } = useSettings();
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  // Trap keyboard Escape to exit
  useEffect(() => {
    if (!settings.meditationMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') updateSetting('meditationMode', false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [settings.meditationMode, updateSetting]);

  if (!settings.meditationMode) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Meditation Mode"
    >
      <BackgroundManager overlay={false} />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center text-white px-6">
        {/* Now Playing info */}
        {currentSong && (
          <>
            <div className="text-6xl mb-6 animate-float" aria-hidden="true">🪔</div>
            <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-gradient-gold mb-2">
              {currentSong.title}
            </h2>
            <p className="text-sm text-[#a0896a] mb-8">{currentSong.artist}</p>
          </>
        )}

        {/* Minimal controls */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#D4A843] flex items-center justify-center text-2xl mx-auto mb-8 hover:scale-105 transition-transform"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          onClick={() => updateSetting('meditationMode', false)}
          className="text-xs text-[#8a7258] hover:text-white transition-colors uppercase tracking-widest"
          id="exit-meditation-mode"
        >
          Press Esc or tap to exit
        </button>
      </div>
    </div>
  );
}

'use client';

import { useSettings } from '@/context/SettingsContext';
import SleepTimerControl from '@/components/shared/SleepTimerControl';
import { usePlayer } from '@/hooks/usePlayer';

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { currentSong, progress } = usePlayer();

  return (
    <div className="min-h-screen bg-[#0D0808] text-[#F5E6C0]">
      <div className="pt-20" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-10">
          <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase">Preferences</span>
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-gradient-gold mt-2">Settings</h1>
        </div>

        <div className="space-y-6">

          {/* Theme */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h2 className="text-sm font-bold text-[#d4a843] mb-4 font-[family-name:var(--font-cinzel)]">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Text Size</label>
                <div className="flex gap-2">
                  {(['sm', 'md', 'lg'] as const).map(size => (
                    <button
                      key={size}
                      id={`text-size-${size}`}
                      onClick={() => updateSetting('textSize', size)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                        settings.textSize === size
                          ? 'bg-[#d4a843]/20 border-[#d4a843] text-white'
                          : 'bg-white/5 border-transparent text-[#8a7258]'
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Animation Intensity</label>
                <div className="flex gap-2">
                  {(['none', 'reduced', 'full'] as const).map(level => (
                    <button
                      key={level}
                      id={`anim-${level}`}
                      onClick={() => updateSetting('animationIntensity', level)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                        settings.animationIntensity === level
                          ? 'bg-[#d4a843]/20 border-[#d4a843] text-white'
                          : 'bg-white/5 border-transparent text-[#8a7258]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Background Effects</label>
                <button
                  id="bg-effects-toggle"
                  onClick={() => updateSetting('backgroundEffects', !settings.backgroundEffects)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    settings.backgroundEffects ? 'bg-[#d4a843]' : 'bg-white/20'
                  }`}
                  aria-checked={settings.backgroundEffects}
                  role="switch"
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                    settings.backgroundEffects ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Sleep Timer */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h2 className="text-sm font-bold text-[#d4a843] mb-4 font-[family-name:var(--font-cinzel)]">Sleep Timer</h2>
            <SleepTimerControl />
            <p className="text-xs text-[#8a7258] mt-3">Automatically pauses music after the selected duration.</p>
          </div>

          {/* Meditation Mode */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h2 className="text-sm font-bold text-[#d4a843] mb-4 font-[family-name:var(--font-cinzel)]">Meditation Mode</h2>
            <button
              id="meditation-mode-toggle"
              onClick={() => updateSetting('meditationMode', !settings.meditationMode)}
              disabled={!currentSong}
              className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all bg-[#d4a843]/10 border border-[#d4a843]/30 text-[#d4a843] hover:bg-[#d4a843] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
            >
              🧘 {settings.meditationMode ? 'Exit Meditation' : 'Enter Meditation Mode'}
            </button>
            <p className="text-xs text-[#8a7258] mt-3">Hides all controls. Only the current song is visible. Press Escape to exit.</p>
          </div>

          {/* Continue Listening */}
          {settings.lastPlayedSongId && (
            <div className="glass rounded-2xl p-5 border border-[rgba(212,168,67,0.15)]">
              <h2 className="text-sm font-bold text-[#d4a843] mb-2 font-[family-name:var(--font-cinzel)]">Continue Listening</h2>
              <p className="text-xs text-[#8a7258]">Your last session will resume automatically when you start playing.</p>
            </div>
          )}

          {/* Reset */}
          <div className="glass rounded-2xl p-5 border border-white/5">
            <h2 className="text-sm font-bold text-[#d4a843] mb-4 font-[family-name:var(--font-cinzel)]">Reset</h2>
            <button
              id="reset-settings-btn"
              onClick={resetSettings}
              className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              Reset All Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

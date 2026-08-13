'use client';

import { useState, useEffect, useRef } from 'react';

interface SoundTrack {
  id: string;
  name: string;
  icon: string;
  url: string;
}

const ambientTracks: SoundTrack[] = [
  { id: 'temple-bells', name: 'Temple Bells', icon: '🔔', url: 'https://assets.mixkit.co/active_storage/sfx/1006/1006-84.wav' },
  { id: 'rain', name: 'Rain', icon: '🌧️', url: 'https://assets.mixkit.co/active_storage/sfx/2507/2507-84.wav' },
  { id: 'river', name: 'River', icon: '🌊', url: 'https://assets.mixkit.co/active_storage/sfx/1230/1230-84.wav' },
  { id: 'wind', name: 'Wind', icon: '💨', url: 'https://assets.mixkit.co/active_storage/sfx/2544/2544-84.wav' }
];

export default function AmbientSoundManager() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeTrack) {
      const track = ambientTracks.find(t => t.id === activeTrack);
      if (track) {
        audio.src = track.url;
        audio.volume = volume;
        audio.play().catch(e => console.warn("Failed to play ambient sound loop", e));
      }
    } else {
      audio.pause();
    }
  }, [activeTrack, volume]);

  const handleSelectTrack = (trackId: string) => {
    if (activeTrack === trackId) {
      setActiveTrack(null);
    } else {
      setActiveTrack(trackId);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {isOpen ? (
        <div className="glass-gold border border-[rgba(212,168,67,0.3)] rounded-2xl p-4 w-60 shadow-2xl mb-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-[family-name:var(--font-cinzel)] font-bold text-[#d4a843]">
              Meditation Sounds
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#8a7258] hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {ambientTracks.map(track => {
              const isActive = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  id={`ambient-${track.id}`}
                  onClick={() => handleSelectTrack(track.id)}
                  className={`p-2.5 rounded-xl text-center text-xs transition-all border ${
                    isActive
                      ? 'bg-[#d4a843]/20 border-[#d4a843] text-white font-bold'
                      : 'bg-white/5 border-transparent text-[#a0896a] hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg block mb-1" aria-hidden="true">{track.icon}</span>
                  {track.name}
                </button>
              );
            })}
          </div>

          {activeTrack && (
            <div className="space-y-1">
              <label htmlFor="ambient-volume" className="text-[10px] text-[#8a7258] block">Volume</label>
              <input
                id="ambient-volume"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full player-progress"
                style={{ '--progress': `${volume * 100}%` } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      ) : null}

      <button
        id="ambient-toggle-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-gold border border-[rgba(212,168,67,0.4)] flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-all shadow-lg"
        aria-label="Toggle meditation ambient background sound"
      >
        🧘
      </button>
    </div>
  );
}

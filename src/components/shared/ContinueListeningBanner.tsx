'use client';

import { useState, useEffect } from 'react';
import { useContinueListening } from '@/hooks/useContinueListening';
import Image from 'next/image';
import { Song } from '@/types/song';

export default function ContinueListeningBanner() {
  const { getLastSession, resumeLastSession } = useContinueListening();
  const [session, setSession] = useState<{ song: Song; position: number } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only check after hydration
    const s = getLastSession();
    setSession(s);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!session || dismissed) return null;

  return (
    <div
      className="glass-gold border border-[rgba(212,168,67,0.3)] rounded-2xl p-4 flex items-center gap-4 animate-fade-in"
      role="region"
      aria-label="Continue listening"
    >
      {/* Album art */}
      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={session.song.cover}
          alt={session.song.title}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#d4a843] font-semibold uppercase tracking-widest mb-0.5">
          Continue Listening
        </p>
        <p className="text-sm font-bold text-white truncate">{session.song.title}</p>
        <p className="text-xs text-[#8a7258]">{session.song.artist} • {formatTime(session.position)} in</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          id="continue-listening-btn"
          onClick={() => { resumeLastSession(); setDismissed(true); }}
          className="px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white rounded-full text-xs font-bold hover:scale-105 transition-transform"
        >
          ▶ Resume
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#5a4a3a] hover:text-white transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

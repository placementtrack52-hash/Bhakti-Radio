'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import BackgroundManager from '@/components/shared/BackgroundManager';
import { usePlayer } from '@/hooks/usePlayer';
import songsData from '@/data/songs.json';
import { Song } from '@/types/song';

const songs = songsData as Song[];

function DivaParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, #ffcf40, #ff6b00)',
        boxShadow: '0 0 8px #ff6b00',
        animation: `particleRise ${2 + Math.random() * 2}s ease-out infinite`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default function HeroSection({ embedded = false }: { embedded?: boolean }) {
  const { togglePlay, playSong, isPlaying, currentSong } = usePlayer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartListening = () => {
    if (!currentSong) {
      playSong(songs[0], 0);
    } else {
      togglePlay();
    }
  };

  const particles = mounted
    ? [
        { left: '5%', bottom: '20%', animationDelay: '0s' },
        { left: '12%', bottom: '30%', animationDelay: '0.5s' },
        { left: '20%', bottom: '15%', animationDelay: '1s' },
        { left: '80%', bottom: '20%', animationDelay: '0.3s' },
        { left: '88%', bottom: '35%', animationDelay: '0.8s' },
        { left: '95%', bottom: '18%', animationDelay: '1.5s' },
        { left: '50%', bottom: '10%', animationDelay: '0.7s' },
        { left: '35%', bottom: '8%', animationDelay: '1.2s' },
        { left: '65%', bottom: '12%', animationDelay: '0.2s' },
      ]
    : [];

  return (
    <section
      className={`relative flex flex-col items-center justify-center overflow-hidden ${
        embedded ? 'py-6 md:py-12' : 'min-h-screen'
      }`}
      aria-label="Hero section"
      role="region"
    >
      {/* Animated background (only when standalone) */}
      {!embedded && <BackgroundManager overlay />}

      {/* Diya particles */}
      {particles.map((p, i) => (
        <DivaParticle key={i} style={p} />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Sanskrit blessing */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span
            className="text-4xl md:text-5xl font-[family-name:var(--font-noto)] text-[rgba(212,168,67,0.8)]"
            aria-label="Om symbol"
          >
            ॐ
          </span>
        </div>

        {/* Main title */}
        <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div
            className="inline-flex items-center gap-2 text-xs md:text-sm font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase mb-4"
          >
            <span className="w-8 h-px bg-[#d4a843] opacity-60" aria-hidden="true" />
            Sacred Devotional Radio
            <span className="w-8 h-px bg-[#d4a843] opacity-60" aria-hidden="true" />
          </div>
          <h1
            className="font-[family-name:var(--font-cinzel)] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-glow-gold"
            style={{
              background: 'linear-gradient(135deg, #D4A843 0%, #FF6B00 40%, #D4A843 70%, #F5E6C0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            🪔 BHAKTI
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">RADIO</span>
          </h1>
        </div>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-3 mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.35s' }}
          aria-hidden="true"
        >
          <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-[#d4a843]" />
          <span className="text-[#d4a843] text-sm">✦</span>
          <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-[#d4a843]" />
        </div>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-[#c8a870] mb-2 font-light animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Discover devotion.
        </p>
        <p
          className="text-lg sm:text-xl md:text-2xl text-[#a0896a] mb-10 font-light animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Listen in peace.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '0.65s' }}
        >
          <Button
            id="hero-start-listening-btn"
            variant="primary"
            size="lg"
            onClick={handleStartListening}
            ariaLabel={isPlaying && currentSong ? 'Pause music' : 'Start listening to bhajans'}
          >
            {isPlaying && currentSong ? '⏸ Pause' : '▶ Start Listening'}
          </Button>
          <Button
            id="hero-explore-btn"
            variant="secondary"
            size="lg"
            ariaLabel="Explore Bhakti music collection"
          >
            <Link href="#explore" className="flex items-center gap-2">
              📖 Explore Bhakti
            </Link>
          </Button>
        </div>

        {/* Currently playing sneak peek */}
        {currentSong && mounted && (
          <div
            className="mt-12 glass-gold rounded-2xl px-5 py-3 inline-flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-end gap-0.5" aria-hidden="true">
              <span className="waveform-bar" style={{ height: '4px' }} />
              <span className="waveform-bar" style={{ height: '4px' }} />
              <span className="waveform-bar" style={{ height: '4px' }} />
            </div>
            <span className="text-xs text-[#d4a843] font-medium">
              Now playing: {currentSong.title}
            </span>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
        aria-hidden="true"
      >
        <span className="text-xs text-[#8a7258] tracking-widest uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6" y="2" width="4" height="4" rx="2" fill="#8a7258" className="animate-bounce" />
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#8a7258" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    </section>
  );
}

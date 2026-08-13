'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlayer } from '@/hooks/usePlayer';
import ProgressBar from '@/components/player/ProgressBar';
import songsData from '@/data/songs.json';
import { Song } from '@/types/song';

const songs = songsData as Song[];

export default function NowPlayingSection() {
  const { currentSong, isPlaying, progress, duration, seek, formatTime, playSong, togglePlay } = usePlayer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const displaySong = currentSong || songs[0];

  if (!mounted) return null;

  return (
    <section
      className="py-20 px-4 relative"
      aria-label="Now Playing"
      role="region"
      aria-live="polite"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase mb-3">
            <span className="w-6 h-px bg-[#d4a843]" />
            Live Stream
            <span className="w-6 h-px bg-[#d4a843]" />
          </div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-gradient-gold">
            Now Playing
          </h2>
        </div>

        {/* Player card */}
        <div
          className="glass-gold rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-20 blur-xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #FF6B00, #D4A843)',
            }}
            aria-hidden="true"
          />

          {/* Album art */}
          <div className="relative flex-shrink-0">
            <div
              className={`relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
                isPlaying && currentSong ? 'scale-105' : ''
              }`}
              style={{
                boxShadow: isPlaying && currentSong
                  ? '0 0 50px rgba(212,168,67,0.5), 0 0 100px rgba(255,107,0,0.2)'
                  : '0 8px 32px rgba(0,0,0,0.6)',
              }}
            >
              <Image
                src={displaySong.cover}
                alt={`${displaySong.title} cover art`}
                fill
                sizes="224px"
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/default-cover.webp';
                }}
                unoptimized
              />
            </div>

            {/* Waveform below art */}
            {isPlaying && currentSong && (
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-8"
                aria-label="Audio playing"
              >
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-[#d4a843]"
                    style={{
                      height: `${10 + Math.random() * 20}px`,
                      animation: `waveform ${0.8 + i * 0.1}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Song details */}
          <div className="flex-1 w-full">
            <p className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase mb-2">
              {displaySong.deity || 'Devotional'}
            </p>
            <h3 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-white mb-1 text-glow-gold">
              {displaySong.title}
            </h3>
            <p className="text-[#a0896a] mb-6">{displaySong.artist}</p>

            {/* Progress */}
            {currentSong && (
              <div className="mb-6">
                <ProgressBar
                  progress={progress}
                  duration={duration}
                  onSeek={seek}
                  formatTime={formatTime}
                />
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                id="now-playing-play-btn"
                onClick={() => {
                  if (!currentSong) playSong(displaySong, 0);
                  else togglePlay();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-[family-name:var(--font-cinzel)] font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00, #D4A843)',
                  boxShadow: '0 0 20px rgba(255,107,0,0.4)',
                }}
                aria-label={isPlaying && currentSong ? 'Pause' : 'Play'}
              >
                {isPlaying && currentSong ? '⏸ Pause' : '▶ Play'}
              </button>

              <Link
                href="/radio"
                className="px-4 py-3 rounded-full glass border border-[rgba(212,168,67,0.3)] text-[#d4a843] text-sm hover:bg-[rgba(212,168,67,0.1)] transition-all"
              >
                Full Player →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

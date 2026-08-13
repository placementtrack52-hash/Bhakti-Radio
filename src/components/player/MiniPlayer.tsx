'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePlayer } from '@/hooks/usePlayer';
import { useRadio } from '@/hooks/useRadio';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import SleepTimer from '@/components/SleepTimer';

export default function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    seek,
    setVolume,
    togglePlay,
    nextSong,
    prevSong,
    formatTime,
  } = usePlayer();

  const { activeStation, pendingStation } = useRadio();

  if (!currentSong) return null;

  return (
    <div
      className="mini-player border-t border-[rgba(212,168,67,0.3)] shadow-[0_-5px_25px_rgba(0,0,0,0.8)]"
      role="region"
      aria-label="Now Playing"
      aria-live="polite"
    >
      {/* Progress bar at top */}
      <ProgressBar
        progress={progress}
        duration={duration}
        onSeek={seek}
        formatTime={formatTime}
        mini
        className="px-0"
      />

      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {/* Song info + Station Name */}
        <Link
          href="/radio"
          className="flex items-center gap-3 min-w-0 flex-1 group"
          aria-label={`Now playing: ${currentSong.title} by ${currentSong.artist} on station ${activeStation.name}. Click to open full player.`}
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
            <Image
              src={currentSong.cover}
              alt={`${currentSong.title} cover art`}
              fill
              sizes="44px"
              className={`object-cover transition-all duration-300 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/default-cover.webp';
              }}
              unoptimized
            />
            {isPlaying && (
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  boxShadow: 'inset 0 0 0 2px rgba(212,168,67,0.5)',
                }}
              />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] bg-[#d4a843]/20 text-[#d4a843] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {activeStation.icon} {activeStation.name}
              </span>
              {pendingStation && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] animate-pulse" title="Pending station switch" />
              )}
            </div>
            <p className="text-sm font-bold text-white truncate group-hover:text-[#d4a843] transition-colors mt-0.5">
              {currentSong.title}
            </p>
          </div>
        </Link>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
          <button
            id="mini-prev-btn"
            onClick={prevSong}
            className="text-[#d4a843] hover:text-white transition-all p-2 rounded-full hover:bg-white/10"
            aria-label="Previous song"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button
            id="mini-play-btn"
            onClick={togglePlay}
            className="relative w-11 h-11 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'linear-gradient(135deg, #FF6B00, #D4A843)',
              boxShadow: isPlaying
                ? '0 0 15px rgba(255,107,0,0.5)'
                : '0 2px 10px rgba(0,0,0,0.4)',
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
            {isPlaying && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'rgba(255,107,0,0.2)',
                  animation: 'pulse-ring 2s ease-out infinite',
                }}
              />
            )}
          </button>

          <button
            id="mini-next-btn"
            onClick={nextSong}
            className="text-[#d4a843] hover:text-white transition-all p-2 rounded-full hover:bg-white/10"
            aria-label="Next song"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          {/* Sleep Timer controller */}
          <div className="flex items-center">
            <SleepTimer />
          </div>

          <div className="hidden md:flex">
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
          </div>
        </div>
      </div>
    </div>
  );
}

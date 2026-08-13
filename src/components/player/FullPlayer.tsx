'use client';

import Image from 'next/image';
import { usePlayer } from '@/hooks/usePlayer';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default function FullPlayer() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    shuffle,
    repeat,
    seek,
    setVolume,
    togglePlay,
    nextSong,
    prevSong,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  } = usePlayer();

  const repeatLabel =
    repeat === 'none' ? 'Repeat off' : repeat === 'all' ? 'Repeat all' : 'Repeat one';

  if (!currentSong) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="text-6xl mb-4" aria-hidden="true">🪔</div>
        <p className="font-[family-name:var(--font-cinzel)] text-[#d4a843] text-xl mb-2">
          No song selected
        </p>
        <p className="text-[#8a7258] text-sm">Select a song to begin your journey</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-6 md:p-10 max-w-md mx-auto">
      {/* Album art */}
      <div className="relative">
        <div
          className="relative w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            boxShadow: isPlaying
              ? '0 0 40px rgba(212,168,67,0.4), 0 0 80px rgba(255,107,0,0.2)'
              : '0 8px 32px rgba(0,0,0,0.8)',
          }}
        >
          <Image
            src={currentSong.cover}
            alt={`${currentSong.title} album art`}
            fill
            sizes="(max-width: 768px) 256px, 288px"
            className={`object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/default-cover.webp';
            }}
            unoptimized
            priority
          />
          {/* Gold ring overlay when playing */}
          {isPlaying && (
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(212,168,67,0.1) 0%, transparent 50%, rgba(255,107,0,0.1) 100%)',
                boxShadow: 'inset 0 0 0 2px rgba(212,168,67,0.4)',
              }}
            />
          )}
        </div>

        {/* Waveform indicator */}
        {isPlaying && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="waveform-bar" style={{ height: '4px' }} />
            ))}
          </div>
        )}
      </div>

      {/* Song info */}
      <div className="text-center mt-4">
        <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white text-glow-gold mb-1">
          {currentSong.title}
        </h2>
        <p className="text-[#a0896a]">{currentSong.artist}</p>
        {currentSong.deity && (
          <p className="text-xs text-[#d4a843] mt-1 uppercase tracking-widest">
            {currentSong.deity}
          </p>
        )}
      </div>

      {/* Progress */}
      <div className="w-full">
        <ProgressBar
          progress={progress}
          duration={duration}
          onSeek={seek}
          formatTime={formatTime}
        />
      </div>

      {/* Main controls */}
      <div className="flex items-center gap-4 md:gap-6" role="group" aria-label="Playback controls">
        {/* Shuffle */}
        <button
          id="shuffle-btn"
          onClick={toggleShuffle}
          className={`p-2 rounded-full transition-all ${
            shuffle
              ? 'text-[#ff6b00]'
              : 'text-[#8a7258] hover:text-[#d4a843]'
          }`}
          aria-label={shuffle ? 'Shuffle on' : 'Shuffle off'}
          aria-pressed={shuffle}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
        </button>

        {/* Prev */}
        <button
          id="full-prev-btn"
          onClick={prevSong}
          className="text-[#d4a843] hover:text-white transition-all p-2 hover:scale-110"
          aria-label="Previous song"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          id="full-play-btn"
          onClick={togglePlay}
          className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #FF6B00, #D4A843)',
            boxShadow: isPlaying
              ? '0 0 30px rgba(255,107,0,0.7), 0 0 60px rgba(212,168,67,0.3)'
              : '0 4px 20px rgba(0,0,0,0.6)',
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
          {isPlaying && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(255,107,0,0.3)',
                animation: 'pulse-ring 2s ease-out infinite',
              }}
            />
          )}
        </button>

        {/* Next */}
        <button
          id="full-next-btn"
          onClick={nextSong}
          className="text-[#d4a843] hover:text-white transition-all p-2 hover:scale-110"
          aria-label="Next song"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        {/* Repeat */}
        <button
          id="repeat-btn"
          onClick={toggleRepeat}
          className={`p-2 rounded-full transition-all relative ${
            repeat !== 'none'
              ? 'text-[#ff6b00]'
              : 'text-[#8a7258] hover:text-[#d4a843]'
          }`}
          aria-label={repeatLabel}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          {repeat === 'one' && (
            <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-[#ff6b00] text-white rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          )}
        </button>
      </div>

      {/* Volume */}
      <VolumeControl volume={volume} onVolumeChange={setVolume} className="w-full justify-center" />
    </div>
  );
}

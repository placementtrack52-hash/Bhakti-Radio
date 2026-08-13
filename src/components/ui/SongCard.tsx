'use client';

import Image from 'next/image';
import { Song } from '@/types/song';
import { usePlayer } from '@/hooks/usePlayer';

interface SongCardProps {
  song: Song;
  index: number;
  showIndex?: boolean;
  compact?: boolean;
}

export default function SongCard({ song, index, showIndex = false, compact = false }: SongCardProps) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  if (compact) {
    return (
      <button
        id={`song-card-${song.id}`}
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group text-left ${
          isCurrentSong
            ? 'bg-gradient-to-r from-[rgba(255,107,0,0.15)] to-[rgba(212,168,67,0.1)] border border-[rgba(212,168,67,0.3)]'
            : 'hover:bg-white/5 border border-transparent'
        }`}
        onClick={() => playSong(song, index)}
        aria-label={`Play ${song.title} by ${song.artist}`}
        aria-pressed={isCurrentSong}
      >
        {showIndex && (
          <span className="w-5 text-center text-xs text-[#8a7258] flex-shrink-0">
            {isCurrentSong && isPlaying ? (
              <span className="flex items-end gap-0.5" aria-hidden="true">
                <span className="waveform-bar" style={{ height: '4px' }} />
                <span className="waveform-bar" style={{ height: '4px' }} />
                <span className="waveform-bar" style={{ height: '4px' }} />
              </span>
            ) : (
              index + 1
            )}
          </span>
        )}
        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={song.cover}
            alt={`${song.title} cover`}
            fill
            sizes="40px"
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/default-cover.webp';
            }}
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold truncate ${
            isCurrentSong ? 'text-[#d4a843]' : 'text-white group-hover:text-[#d4a843]'
          } transition-colors`}>
            {song.title}
          </p>
          <p className="text-xs text-[#8a7258] truncate">{song.artist}</p>
        </div>
        <span className="text-xs text-[#8a7258] flex-shrink-0">{song.duration}</span>
      </button>
    );
  }

  return (
    <button
      id={`song-card-grid-${song.id}`}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 text-left w-full ${
        isCurrentSong
          ? 'ring-2 ring-[#d4a843] shadow-[0_0_20px_rgba(212,168,67,0.3)]'
          : 'hover:ring-1 hover:ring-[rgba(212,168,67,0.3)]'
      }`}
      style={{
        background:
          isCurrentSong
            ? 'linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(212,168,67,0.05) 100%)'
            : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      onClick={() => playSong(song, index)}
      aria-label={`Play ${song.title} by ${song.artist}`}
      aria-pressed={isCurrentSong}
    >
      {/* Cover art */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={song.cover}
          alt={`${song.title} cover art`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/default-cover.webp';
          }}
          unoptimized
        />
        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isCurrentSong
              ? 'opacity-100 bg-black/30'
              : 'opacity-0 group-hover:opacity-100 bg-black/50'
          }`}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #D4A843)' }}
          >
            {isCurrentSong && isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className={`font-semibold text-sm truncate ${
          isCurrentSong ? 'text-[#d4a843]' : 'text-white'
        }`}>
          {song.title}
        </p>
        <p className="text-xs text-[#8a7258] truncate mt-0.5">{song.artist}</p>
        {song.deity && (
          <p className="text-xs text-[rgba(212,168,67,0.6)] mt-1">{song.deity}</p>
        )}
        <p className="text-xs text-[#6b5a42] mt-1">{song.duration}</p>
      </div>
    </button>
  );
}

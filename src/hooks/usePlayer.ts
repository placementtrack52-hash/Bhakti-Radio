'use client';

import { usePlayerContext } from '@/context/PlayerContext';
import { Song } from '@/types/song';

export function usePlayer() {
  const {
    state,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    audioRef,
  } = usePlayerContext();

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent =
    state.duration > 0 ? (state.progress / state.duration) * 100 : 0;

  return {
    // State
    currentSong: state.currentSong,
    isPlaying: state.isPlaying,
    volume: state.volume,
    progress: state.progress,
    duration: state.duration,
    shuffle: state.shuffle,
    repeat: state.repeat,
    queue: state.queue,
    currentIndex: state.currentIndex,
    progressPercent,
    // Refs
    audioRef,
    // Actions
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    // Utilities
    formatTime,
  };
}

export type UsePlayerReturn = ReturnType<typeof usePlayer>;

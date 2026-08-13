'use client';

import { usePlayerContext } from '@/context/PlayerContext';

export function useRadio() {
  const { state, selectStation, nextSong, prevSong, togglePlay } = usePlayerContext();

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return {
    activeStation: state.activeStation,
    pendingStation: state.pendingStation,
    upcomingQueue: state.upcomingQueue,
    allStations: state.allStations,
    currentSong: state.currentSong,
    isPlaying: state.isPlaying,
    progress: state.progress,
    duration: state.duration,
    volume: state.volume,
    selectStation,
    nextSong,
    prevSong,
    togglePlay,
    formatTime
  };
}

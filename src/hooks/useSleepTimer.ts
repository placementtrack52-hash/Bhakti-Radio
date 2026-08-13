'use client';

import { useEffect, useCallback } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { useTimerContext } from '@/context/TimerContext';
import { SleepTimerMode } from '@/services/SleepTimerService';

export function useSleepTimer() {
  const player = usePlayer();
  const timer = useTimerContext();

  const { state, cancelTimer, fadeVolumeAndPause } = timer;
  const { isPlaying, audioRef, togglePlay } = player;

  // Stop playback action helper
  const handleTimeOut = useCallback(() => {
    if (audioRef.current) {
      fadeVolumeAndPause(audioRef.current, () => {
        // Double check playing state and pause
        if (isPlaying) {
          togglePlay();
        }
        cancelTimer();
      });
    }
  }, [audioRef, isPlaying, togglePlay, cancelTimer, fadeVolumeAndPause]);

  // Hook countdown complete trigger
  useEffect(() => {
    if (state.isActive && state.remainingSeconds === 0 && state.mode !== 'endOfSong') {
      handleTimeOut();
    }
  }, [state.isActive, state.remainingSeconds, state.mode, handleTimeOut]);

  // Hook End Of Song Mode trigger
  useEffect(() => {
    if (!state.isActive || state.mode !== 'endOfSong') return;
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    const handleEnded = () => {
      // Trigger volume fade immediately
      handleTimeOut();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [state.isActive, state.mode, audioRef, handleTimeOut]);

  // Hook unexpected stop check
  useEffect(() => {
    if (state.isActive && !isPlaying) {
      // Reset/cancel timer if playback is stopped manually
      cancelTimer();
    }
  }, [isPlaying, state.isActive, cancelTimer]);

  return {
    timerState: state,
    timerPrefs: timer.prefs,
    setTimer: timer.setTimer,
    cancelTimer: timer.cancelTimer,
    updatePref: timer.updatePref,
  };
}

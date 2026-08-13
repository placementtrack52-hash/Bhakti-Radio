'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SleepTimerService, SleepTimerState, SleepTimerPrefs, SleepTimerMode } from '@/services/SleepTimerService';

interface TimerContextType {
  state: SleepTimerState;
  prefs: SleepTimerPrefs;
  setTimer: (mode: SleepTimerMode, seconds: number) => void;
  cancelTimer: () => void;
  updatePref: (key: keyof SleepTimerPrefs, value: boolean) => void;
  fadeVolumeAndPause: (audioEl: HTMLAudioElement, onComplete: () => void) => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SleepTimerState>({
    mode: 'off',
    targetSeconds: 0,
    remainingSeconds: 0,
    isActive: false,
  });

  const [prefs, setPrefs] = useState<SleepTimerPrefs>({
    fadeOutEnabled: true,
    timerNotifications: true,
    autoRestore: true,
  });

  // Load state and preferences on mount
  useEffect(() => {
    const savedPrefs = SleepTimerService.getPreferences();
    setPrefs(savedPrefs);

    if (savedPrefs.autoRestore) {
      const savedState = SleepTimerService.getSavedState();
      if (savedState.isActive && savedState.remainingSeconds > 0) {
        setState(savedState);
      }
    }
  }, []);

  // Update preferences helper
  const updatePref = useCallback((key: keyof SleepTimerPrefs, value: boolean) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: value };
      SleepTimerService.savePreferences(next);
      return next;
    });
  }, []);

  // Set the active timer
  const setTimer = useCallback((mode: SleepTimerMode, seconds: number) => {
    const newState: SleepTimerState = {
      mode,
      targetSeconds: seconds,
      remainingSeconds: seconds,
      isActive: true,
    };
    setState(newState);
    SleepTimerService.saveState(newState);
  }, []);

  // Cancel the active timer
  const cancelTimer = useCallback(() => {
    const newState: SleepTimerState = {
      mode: 'off',
      targetSeconds: 0,
      remainingSeconds: 0,
      isActive: false,
    };
    setState(newState);
    SleepTimerService.clearState();
  }, []);

  // Fade out volume and pause utility (5-second fade)
  const fadeVolumeAndPause = useCallback((audioEl: HTMLAudioElement, onComplete: () => void) => {
    if (!prefs.fadeOutEnabled) {
      audioEl.pause();
      onComplete();
      return;
    }

    const startVolume = audioEl.volume;
    const fadeSteps = 10;
    const stepDuration = 500; // 10 steps over 5 seconds (5000ms)
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextVolume = startVolume * (1 - currentStep / fadeSteps);
      
      if (nextVolume <= 0.01 || currentStep >= fadeSteps) {
        clearInterval(interval);
        audioEl.volume = 0;
        audioEl.pause();
        // Restore volume back to initial level
        audioEl.volume = startVolume;
        onComplete();
      } else {
        audioEl.volume = nextVolume;
      }
    }, stepDuration);
  }, [prefs.fadeOutEnabled]);

  // Main countdown tick effect
  useEffect(() => {
    if (!state.isActive || state.mode === 'off' || state.mode === 'endOfSong') return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.remainingSeconds <= 1) {
          clearInterval(timer);
          const finishedState = { ...prev, remainingSeconds: 0, isActive: false };
          SleepTimerService.saveState(finishedState);
          return finishedState;
        }

        const nextState = { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        SleepTimerService.saveState(nextState);
        return nextState;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isActive, state.mode]);

  return (
    <TimerContext.Provider
      value={{
        state,
        prefs,
        setTimer,
        cancelTimer,
        updatePref,
        fadeVolumeAndPause,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimerContext must be used within a TimerProvider');
  return ctx;
}

'use client';

import { useEffect, useRef } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { storage } from '@/utils/storage';

const SAVE_KEY_SONG = 'last_song_id';
const SAVE_KEY_POSITION = 'last_position';
const SAVE_INTERVAL_MS = 5000;

/**
 * Persists the currently playing song + position every 5 seconds.
 * On mount, returns the last saved state so the UI can offer a "Continue" button.
 */
export function useContinueListening() {
  const { currentSong, progress, audioRef, seek, playSong, queue } = usePlayer();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Save position every 5 seconds while playing
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (currentSong) {
      intervalRef.current = setInterval(() => {
        storage.set(SAVE_KEY_SONG, currentSong.id);
        storage.set(SAVE_KEY_POSITION, Math.floor(progress));
      }, SAVE_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSong, progress]);

  // Also save on page unload
  useEffect(() => {
    const saveNow = () => {
      if (currentSong) {
        storage.set(SAVE_KEY_SONG, currentSong.id);
        storage.set(SAVE_KEY_POSITION, Math.floor(audioRef.current?.currentTime ?? 0));
      }
    };
    window.addEventListener('beforeunload', saveNow);
    return () => window.removeEventListener('beforeunload', saveNow);
  }, [currentSong, audioRef]);

  const getLastSession = () => {
    const songId = storage.get<number | null>(SAVE_KEY_SONG, null);
    const position = storage.get<number>(SAVE_KEY_POSITION, 0);
    if (!songId) return null;
    const song = queue.find((s) => s.id === songId);
    if (!song) return null;
    return { song, position };
  };

  const resumeLastSession = () => {
    const session = getLastSession();
    if (!session) return;
    playSong(session.song);
    // Small delay so audio loads before seek
    setTimeout(() => seek(session.position), 800);
  };

  return { getLastSession, resumeLastSession };
}

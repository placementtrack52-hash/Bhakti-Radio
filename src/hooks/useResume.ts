'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { ResumeService, SavedPlayerState, UserPrefs } from '@/services/ResumeService';
import { Song } from '@/types/song';
import songsData from '@/data/songs.json';

export function useResume() {
  const player = usePlayer();
  const [savedSession, setSavedSession] = useState<{ song: Song; state: SavedPlayerState } | null>(null);
  const [preferences, setPreferences] = useState<UserPrefs | null>(null);
  const [isSongUnavailable, setIsSongUnavailable] = useState(false);
  const autoSavedRef = useRef<number>(0);

  // Load preferences and saved sessions on mount
  useEffect(() => {
    const prefs = ResumeService.getPreferences();
    setPreferences(prefs);

    const saved = ResumeService.getSavedState();
    if (saved && saved.songId) {
      const song = ResumeService.findSong(saved.songId);
      if (song) {
        setSavedSession({ song, state: saved });
      } else {
        setIsSongUnavailable(true);
      }
    }
  }, []);

  // Update Settings/Preferences
  const updatePreference = useCallback((key: keyof UserPrefs, value: boolean) => {
    setPreferences((prev) => {
      if (!prev) return null;
      const next = { ...prev, [key]: value };
      ResumeService.savePreferences(next);
      return next;
    });
  }, []);

  // Periodically save progress every 5 seconds when playing
  useEffect(() => {
    if (!player.isPlaying || !player.currentSong || !preferences) return;

    const interval = setInterval(() => {
      const currentSongId = player.currentSong?.id || null;
      const queueIds = preferences.rememberPlaylists ? player.queue.map((s) => s.id) : [];

      const stateToSave: SavedPlayerState = {
        songId: currentSongId,
        stationId: (player as any).state?.activeStation?.id || null,
        currentTime: player.progress,
        volume: preferences.rememberVolume ? player.volume : 0.8,
        repeat: player.repeat,
        shuffle: player.shuffle,
        playlist: queueIds,
      };

      // Debounce and prevent unnecessary identical writes
      if (Math.abs(autoSavedRef.current - player.progress) >= 4.5) {
        ResumeService.saveState(stateToSave);
        autoSavedRef.current = player.progress;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [
    player.isPlaying,
    player.currentSong,
    player.progress,
    player.volume,
    player.repeat,
    player.shuffle,
    player.queue,
    preferences,
  ]);

  // Action to Resume Session
  const resume = useCallback(() => {
    if (!savedSession) return;
    const { song, state } = savedSession;

    // Restore volume if preferred
    if (preferences?.rememberVolume) {
      player.setVolume(state.volume);
    }

    // Load song and seek
    player.playSong(song);

    // Short timeout to let audio element load metadata before seeking
    setTimeout(() => {
      player.seek(state.currentTime);
    }, 500);

    // Clean active session prompt
    setSavedSession(null);
  }, [savedSession, player, preferences]);

  // Action to Skip & start fresh
  const startOver = useCallback(() => {
    ResumeService.clearSavedState();
    setSavedSession(null);
  }, []);

  // Clear song unavailable flag and play first available
  const playAlternative = useCallback(() => {
    setIsSongUnavailable(false);
    startOver();
    const songs = songsData as Song[];
    if (songs.length > 0) {
      player.playSong(songs[0]);
    }
  }, [player, startOver]);

  return {
    savedSession,
    preferences,
    isSongUnavailable,
    updatePreference,
    resume,
    startOver,
    playAlternative,
  };
}

import { Song } from '@/types/song';
import songsData from '@/data/songs.json';
import stationsData from '@/data/stations.json';
import { Station } from '@/types/station';
import { storage } from '@/utils/localStorage';

export interface SavedPlayerState {
  songId: number | null;
  stationId: number | null;
  currentTime: number;
  volume: number;
  repeat: 'none' | 'one' | 'all';
  shuffle: boolean;
  playlist: number[]; // Song IDs in current queue
}

export interface UserPrefs {
  autoResume: boolean;
  rememberVolume: boolean;
  rememberPlaylists: boolean;
}

const PREF_KEY = 'settings_prefs';
const STATE_KEY = 'state_checkpoint';

const defaultPrefs: UserPrefs = {
  autoResume: true,
  rememberVolume: true,
  rememberPlaylists: true,
};

export const ResumeService = {
  getPreferences(): UserPrefs {
    return storage.get<UserPrefs>(PREF_KEY, defaultPrefs);
  },

  savePreferences(prefs: UserPrefs): void {
    storage.set<UserPrefs>(PREF_KEY, prefs);
  },

  getSavedState(): SavedPlayerState | null {
    return storage.get<SavedPlayerState | null>(STATE_KEY, null);
  },

  saveState(state: SavedPlayerState): void {
    storage.set<SavedPlayerState>(STATE_KEY, state);
  },

  clearSavedState(): void {
    storage.remove(STATE_KEY);
  },

  // Helper to resolve song by ID or fallback safely
  findSong(id: number | null): Song | null {
    if (!id) return null;
    const songs = songsData as Song[];
    return songs.find((s) => s.id === id) || null;
  },

  // Helper to resolve station by ID
  findStation(id: number | null): Station | null {
    if (!id) return null;
    const stations = stationsData as Station[];
    return stations.find((s) => s.id === id) || null;
  }
};

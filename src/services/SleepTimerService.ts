import { storage } from '@/utils/localStorage';

export type SleepTimerMode = 'preset' | 'endOfSong' | 'custom' | 'off';

export interface SleepTimerState {
  mode: SleepTimerMode;
  targetSeconds: number; // Total initial duration
  remainingSeconds: number;
  isActive: boolean;
}

export interface SleepTimerPrefs {
  fadeOutEnabled: boolean;
  timerNotifications: boolean;
  autoRestore: boolean;
}

const PREF_KEY = 'sleep_timer_prefs';
const STATE_KEY = 'sleep_timer_state';

const defaultPrefs: SleepTimerPrefs = {
  fadeOutEnabled: true,
  timerNotifications: true,
  autoRestore: true,
};

const defaultState: SleepTimerState = {
  mode: 'off',
  targetSeconds: 0,
  remainingSeconds: 0,
  isActive: false,
};

export const SleepTimerService = {
  getPreferences(): SleepTimerPrefs {
    return storage.get<SleepTimerPrefs>(PREF_KEY, defaultPrefs);
  },

  savePreferences(prefs: SleepTimerPrefs): void {
    storage.set<SleepTimerPrefs>(PREF_KEY, prefs);
  },

  getSavedState(): SleepTimerState {
    return storage.get<SleepTimerState>(STATE_KEY, defaultState);
  },

  saveState(state: SleepTimerState): void {
    storage.set<SleepTimerState>(STATE_KEY, state);
  },

  clearState(): void {
    storage.remove(STATE_KEY);
  }
};

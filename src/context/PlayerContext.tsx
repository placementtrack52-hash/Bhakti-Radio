'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Song, PlayerState, PlayerAction } from '@/types/song';
import { Station } from '@/types/station';
import { RadioService } from '@/services/RadioService';
import { StationService } from '@/services/StationService';

// Extended State to include Radio Station concepts
interface RadioPlayerState extends PlayerState {
  activeStation: Station;
  pendingStation: Station | null;
  upcomingQueue: Song[];
  allStations: Station[];
}

const radioCoordinator = new RadioService();

const initialRadioState: RadioPlayerState = {
  currentSong: radioCoordinator.getCurrentSong(),
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  duration: 0,
  shuffle: false,
  repeat: 'none',
  queue: radioCoordinator.getQueue(),
  currentIndex: radioCoordinator.getCurrentIndex(),
  activeStation: radioCoordinator.getActiveStation(),
  pendingStation: radioCoordinator.getPendingStation(),
  upcomingQueue: radioCoordinator.getQueue().slice(radioCoordinator.getCurrentIndex() + 1),
  allStations: StationService.getAllStations()
};

type RadioPlayerAction =
  | PlayerAction
  | { type: 'SYNC_RADIO'; payload: { activeStation: Station; queue: Song[]; currentIndex: number; pendingStation: Station | null; currentSong: Song | null } };

function radioPlayerReducer(state: RadioPlayerState, action: RadioPlayerAction): RadioPlayerState {
  switch (action.type) {
    case 'SYNC_RADIO':
      return {
        ...state,
        activeStation: action.payload.activeStation,
        queue: action.payload.queue,
        currentIndex: action.payload.currentIndex,
        currentSong: action.payload.currentSong,
        pendingStation: action.payload.pendingStation,
        upcomingQueue: action.payload.queue.slice(action.payload.currentIndex + 1),
        progress: 0,
        duration: 0
      };
    case 'SET_SONG':
      return {
        ...state,
        currentSong: action.payload.song,
        currentIndex: action.payload.index,
        upcomingQueue: state.queue.slice(action.payload.index + 1),
        progress: 0,
        duration: 0,
      };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle };
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        repeat:
          state.repeat === 'none'
            ? 'all'
            : state.repeat === 'all'
            ? 'one'
            : 'none',
      };
    case 'NEXT_SONG':
      // Handled through the coordinator now
      return state;
    case 'PREV_SONG':
      // Handled through the coordinator now
      return state;
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload,
        upcomingQueue: action.payload.slice(state.currentIndex + 1)
      };
    default:
      return state;
  }
}

interface PlayerContextType {
  state: RadioPlayerState;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  nextAudioRef: React.RefObject<HTMLAudioElement | null>;
  playSong: (song: Song, index?: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  selectStation: (station: Station) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(radioPlayerReducer, initialRadioState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Single-song preload reference to optimize resources (Preload only the next song)
  const nextAudioRef = useRef<HTMLAudioElement | null>(null);

  // Sync details from RadioService coordinator
  const syncWithCoordinator = useCallback(() => {
    dispatch({
      type: 'SYNC_RADIO',
      payload: {
        activeStation: radioCoordinator.getActiveStation(),
        queue: radioCoordinator.getQueue(),
        currentIndex: radioCoordinator.getCurrentIndex(),
        pendingStation: radioCoordinator.getPendingStation(),
        currentSong: radioCoordinator.getCurrentSong()
      }
    });
  }, []);

  // Preload only the next song url in the background
  const handlePreloadNext = useCallback(() => {
    const nextSong = radioCoordinator.getNextSong();
    if (nextSong && nextAudioRef.current) {
      nextAudioRef.current.src = nextSong.audio;
      nextAudioRef.current.load();
    }
  }, []);

  // Initialize audio elements once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = initialRadioState.volume;
      audioRef.current.preload = 'metadata';
    }
    if (!nextAudioRef.current) {
      nextAudioRef.current = new Audio();
      nextAudioRef.current.preload = 'auto'; // Load for next song
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_PROGRESS', payload: audio.currentTime });
    };

    const handleLoadedMetadata = () => {
      dispatch({ type: 'SET_DURATION', payload: audio.duration });
      handlePreloadNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Periodically poll the radio scheduling transitions every 30 seconds
    const interval = setInterval(() => {
      const changed = radioCoordinator.checkScheduleTransition();
      if (changed) {
        syncWithCoordinator();
      }
    }, 30000);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      clearInterval(interval);
    };
  }, [handlePreloadNext, syncWithCoordinator]);

  // Handle song ended -> auto-next with schedule awareness
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (state.repeat === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        // Advance current queue via radio coordinator
        radioCoordinator.advanceQueue();
        syncWithCoordinator();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [state.repeat, syncWithCoordinator]);

  // Load new song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentSong) return;

    // Direct swap audio src
    audio.src = state.currentSong.audio;
    audio.load();

    if (state.isPlaying) {
      audio.play().catch(() => dispatch({ type: 'SET_PLAYING', payload: false }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentSong]);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentSong) return;

    if (state.isPlaying) {
      audio.play().catch(() => dispatch({ type: 'SET_PLAYING', payload: false }));
    } else {
      audio.pause();
    }
  }, [state.isPlaying, state.currentSong]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = state.volume;
  }, [state.volume]);

  const playSong = useCallback((song: Song, index?: number) => {
    // If selecting explicitly inside active station
    if (index !== undefined) {
      radioCoordinator.advanceQueue(); // simple jump simulation
    }
    dispatch({ type: 'SET_SONG', payload: { song, index: index ?? 0 } });
    dispatch({ type: 'SET_PLAYING', payload: true });
  }, []);

  const togglePlay = useCallback(() => {
    if (!state.currentSong) {
      const firstSong = radioCoordinator.getCurrentSong();
      if (firstSong) {
        dispatch({ type: 'SET_SONG', payload: { song: firstSong, index: 0 } });
        dispatch({ type: 'SET_PLAYING', payload: true });
        return;
      }
    }
    dispatch({ type: 'TOGGLE_PLAY' });
  }, [state.currentSong]);

  const nextSong = useCallback(() => {
    radioCoordinator.advanceQueue();
    syncWithCoordinator();
  }, [syncWithCoordinator]);

  const prevSong = useCallback(() => {
    radioCoordinator.regressQueue();
    syncWithCoordinator();
  }, [syncWithCoordinator]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      dispatch({ type: 'SET_PROGRESS', payload: time });
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  }, []);

  const toggleShuffle = useCallback(() => dispatch({ type: 'TOGGLE_SHUFFLE' }), []);
  const toggleRepeat = useCallback(() => dispatch({ type: 'TOGGLE_REPEAT' }), []);

  const selectStation = useCallback((station: Station) => {
    radioCoordinator.switchStation(station);
    syncWithCoordinator();
    dispatch({ type: 'SET_PLAYING', payload: true });
  }, [syncWithCoordinator]);

  return (
    <PlayerContext.Provider
      value={{
        state,
        audioRef,
        nextAudioRef,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        selectStation,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayerContext must be used within PlayerProvider');
  return ctx;
}
export type { RadioPlayerState };
export default PlayerContext;

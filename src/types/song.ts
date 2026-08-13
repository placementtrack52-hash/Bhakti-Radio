export interface Song {
  id: number;
  title: string;
  artist: string;
  audio: string;
  cover: string;
  duration: string;
  deity?: string;
  tags?: string[];
  featured?: boolean;
  station?: string;
  category?: string;
  pdf?: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  queue: Song[];
  currentIndex: number;
}

export type PlayerAction =
  | { type: 'SET_SONG'; payload: { song: Song; index: number } }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'TOGGLE_REPEAT' }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' }
  | { type: 'SET_QUEUE'; payload: Song[] };

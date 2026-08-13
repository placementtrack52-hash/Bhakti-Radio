import { Song } from '@/types/song';
import songsData from '@/data/songs.json';

const songs: Song[] = songsData as Song[];

export class PlaylistService {
  /**
   * Filter and retrieve all songs matched to a specific station name.
   */
  static getSongsByStation(stationName: string): Song[] {
    return songs.filter(song => song.station === stationName);
  }

  /**
   * Generates a randomized playlist queue for a specific station.
   * If no songs are found, falls back to all songs.
   */
  static generateQueueForStation(stationName: string): Song[] {
    const stationSongs = this.getSongsByStation(stationName);
    const pool = stationSongs.length > 0 ? stationSongs : songs;
    
    // Simple modern shuffle algorithm (Fisher-Yates)
    const queue = [...pool];
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    return queue;
  }
}

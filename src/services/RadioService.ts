import { Song } from '@/types/song';
import { Station } from '@/types/station';
import { PlaylistService } from './PlaylistService';
import { StationService } from './StationService';

export class RadioService {
  private activeStation: Station;
  private currentQueue: Song[] = [];
  private history: Song[] = [];
  private pendingStation: Station | null = null;
  private currentIndex: number = -1;

  constructor() {
    this.activeStation = StationService.getActiveStation();
    this.initializeQueue();
  }

  private initializeQueue() {
    this.currentQueue = PlaylistService.generateQueueForStation(this.activeStation.name);
    this.currentIndex = this.currentQueue.length > 0 ? 0 : -1;
  }

  /**
   * Returns current active station
   */
  getActiveStation(): Station {
    return this.activeStation;
  }

  /**
   * Returns queue list
   */
  getQueue(): Song[] {
    return this.currentQueue;
  }

  /**
   * Returns current queue index
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Returns current song playing from queue
   */
  getCurrentSong(): Song | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.currentQueue.length) {
      return this.currentQueue[this.currentIndex];
    }
    return null;
  }

  /**
   * Look ahead for preloading target song
   */
  getNextSong(): Song | null {
    const nextIdx = this.currentIndex + 1;
    if (nextIdx < this.currentQueue.length) {
      return this.currentQueue[nextIdx];
    }
    // Loop back or pull from upcoming schedule station
    if (this.currentQueue.length > 0) {
      return this.currentQueue[0];
    }
    return null;
  }

  /**
   * Look back for history
   */
  getPrevSong(): Song | null {
    const prevIdx = this.currentIndex - 1;
    if (prevIdx >= 0) {
      return this.currentQueue[prevIdx];
    }
    return null;
  }

  /**
   * Periodically check time schedules. If scheduled station does not match active station,
   * queue a pending transition without stopping current playback.
   */
  checkScheduleTransition(): boolean {
    const scheduled = StationService.getActiveStation();
    if (scheduled.id !== this.activeStation.id) {
      this.pendingStation = scheduled;
      return true;
    }
    return false;
  }

  /**
   * Returns pending transition station, if any
   */
  getPendingStation(): Station | null {
    return this.pendingStation;
  }

  /**
   * Switch the station immediately
   */
  switchStation(station: Station) {
    this.activeStation = station;
    this.pendingStation = null;
    this.initializeQueue();
  }

  /**
   * Advances the play queue.
   * If there is a pending station change, apply it now at the end of the song!
   */
  advanceQueue(): Song | null {
    if (this.pendingStation) {
      this.switchStation(this.pendingStation);
      return this.getCurrentSong();
    }

    if (this.currentQueue.length === 0) return null;

    this.currentIndex = (this.currentIndex + 1) % this.currentQueue.length;
    return this.getCurrentSong();
  }

  /**
   * Backtrack queue
   */
  regressQueue(): Song | null {
    if (this.currentQueue.length === 0) return null;
    
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.currentQueue.length - 1;
    }
    return this.getCurrentSong();
  }
}

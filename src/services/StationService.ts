import { Station } from '@/types/station';
import stationsData from '@/data/stations.json';

const stations: Station[] = stationsData as Station[];

export class StationService {
  /**
   * Returns all available stations
   */
  static getAllStations(): Station[] {
    return stations;
  }

  /**
   * Helper to parse "HH:MM" into minutes from start of day (0 to 1439)
   */
  private static timeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Finds the currently active station based on system time or target hour/minute.
   * Leverages Asia/Kolkata timezone mapping if specified.
   */
  static getActiveStation(dateInput?: Date): Station {
    // Determine current hour & minute in IST
    const targetDate = dateInput || new Date();
    
    // Shift local time to IST (Asia/Kolkata) using Intl format parts
    let hour = targetDate.getHours();
    let minute = targetDate.getMinutes();

    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      });
      const parts = formatter.formatToParts(targetDate);
      const hourPart = parts.find(p => p.type === 'hour');
      const minPart = parts.find(p => p.type === 'minute');
      if (hourPart && minPart) {
        hour = parseInt(hourPart.value, 10);
        minute = parseInt(minPart.value, 10);
      }
    } catch (e) {
      console.warn("Intl format failed, falling back to local time zone config.", e);
    }

    const currentMinutes = hour * 60 + minute;

    // Check each station's window
    for (const station of stations) {
      const startMin = this.timeToMinutes(station.start);
      const endMin = this.timeToMinutes(station.end);

      if (startMin < endMin) {
        // Standard slot, e.g., 08:00 to 12:00
        if (currentMinutes >= startMin && currentMinutes < endMin) {
          return station;
        }
      } else {
        // Overnight slot, e.g., 21:00 to 05:00
        if (currentMinutes >= startMin || currentMinutes < endMin) {
          return station;
        }
      }
    }

    // Default fallback
    return stations[0];
  }

  /**
   * Get the station that matches a specific ID
   */
  static getStationById(id: number): Station | undefined {
    return stations.find(s => s.id === id);
  }
}

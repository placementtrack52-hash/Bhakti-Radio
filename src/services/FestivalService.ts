import { Festival } from '@/types/festival';
import festivalsData from '@/data/festivals.json';

const festivals = festivalsData as Festival[];

export class FestivalService {
  /**
   * Returns all available scheduled festivals
   */
  static getAllFestivals(): Festival[] {
    return festivals;
  }

  /**
   * Scans date schedules and returns the active festival.
   * Leverages activeOverride to allow easier manual preview of festival designs.
   */
  static getActiveFestival(dateInput?: Date): Festival | null {
    const targetDate = dateInput || new Date();
    
    // Check if any festival is explicitly forced/overridden for development
    const override = festivals.find(f => f.activeOverride === true);
    if (override) return override;

    // Convert targetDate to simple comparative format: "YYYY-MM-DD"
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    for (const festival of festivals) {
      if (todayStr >= festival.start && todayStr <= festival.end) {
        return festival;
      }
    }

    return null;
  }

  /**
   * Find a festival by slug
   */
  static getFestivalBySlug(slug: string): Festival | undefined {
    return festivals.find(f => f.slug === slug);
  }
}

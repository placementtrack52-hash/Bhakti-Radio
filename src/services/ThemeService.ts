import themesData from '@/data/themes.json';

export interface ThemeConfig {
  id: string;
  name: string;
  priority: number;
  ambientSound: string;
}

export const ThemeService = {
  getThemes(): ThemeConfig[] {
    return themesData.themes as ThemeConfig[];
  },

  resolveTheme(hour: number, activeStationId?: string, activeFestivalId?: string, activeDeityId?: string): string {
    // 1. Check Festival (Highest Priority 100)
    if (activeFestivalId) {
      return `festival_${activeFestivalId.toLowerCase()}`;
    }

    // 2. Check Deity (Medium Priority 50)
    if (activeDeityId) {
      return `deity_${activeDeityId.toLowerCase()}`;
    }

    // 3. Check Station (Fallback Priority 30)
    if (activeStationId) {
      return `station_${activeStationId.toLowerCase()}`;
    }

    // 4. Default to Time-based Theme (Lowest Priority 10)
    if (hour >= 5 && hour < 8) return 'morning';
    if (hour >= 8 && hour < 18) return 'day';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night'; // Night (21:00 to 05:00)
  }
};

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FestivalService } from '@/services/FestivalService';
import { StationService } from '@/services/StationService';

type ThemeMode = 'morning' | 'afternoon' | 'evening' | 'night' | 'shiva' | 'krishna' | 'ram' | 'hanuman' | 'devi' | 'ganesh' | 'diwali';

interface ThemeContextType {
  theme: ThemeMode;
  isFestivalActive: boolean;
  activeFestivalName: string | null;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('evening');
  const [isFestivalActive, setIsFestivalActive] = useState(false);
  const [activeFestivalName, setActiveFestivalName] = useState<string | null>(null);

  useEffect(() => {
    const updateTheme = () => {
      // Priority 1: Check Active Festival
      const activeFestival = FestivalService.getActiveFestival();
      if (activeFestival) {
        setTheme(activeFestival.theme as ThemeMode);
        setIsFestivalActive(true);
        setActiveFestivalName(activeFestival.name);
        return;
      }

      // Priority 2: Time-based Station Theme
      const activeStation = StationService.getActiveStation();
      const station = activeStation.name;
      setIsFestivalActive(false);
      setActiveFestivalName(null);

      if (station === 'Prabhat Bhakti') setTheme('morning');
      else if (station === 'Bhakti Dhara') setTheme('afternoon');
      else if (station === 'Madhyan Bhakti') setTheme('evening');
      else if (station === 'Sandhya Aarti') setTheme('evening');
      else if (station === 'Shanti Raat') setTheme('night');
    };

    updateTheme();
    const interval = setInterval(updateTheme, 30000); // Check schedules every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isFestivalActive, activeFestivalName }}>
      <div className={`theme-provider-wrapper transition-all duration-[5000ms] ease-in-out`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

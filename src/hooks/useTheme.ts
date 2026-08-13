'use client';

import { useState, useEffect } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import { ThemeService } from '@/services/ThemeService';

export function useTheme() {
  const { currentSong } = usePlayer();
  const [resolvedTheme, setResolvedTheme] = useState('night');

  useEffect(() => {
    const checkTheme = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Resolve deity override from playing song details if available
      const deityId = currentSong?.deity || undefined;
      
      // Resolve theme dynamically
      const activeTheme = ThemeService.resolveTheme(hour, undefined, undefined, deityId);
      setResolvedTheme(activeTheme);
    };

    checkTheme();
    const interval = setInterval(checkTheme, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentSong]);

  return { resolvedTheme };
}

'use client';

import { useSettings } from '@/context/SettingsContext';

export function useAnimation() {
  const { settings } = useSettings();
  
  // Checks if animation mode is enabled and respects reduced motion system flags
  const isReduced = settings.animationIntensity === 'reduced' || settings.animationIntensity === 'none';
  
  return {
    isReduced,
    animationIntensity: settings.animationIntensity,
    backgroundEffects: settings.backgroundEffects,
  };
}

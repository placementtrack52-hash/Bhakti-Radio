'use client';

import { useTheme } from '@/hooks/useTheme';
import { useAnimation } from '@/hooks/useAnimation';
import SunriseRenderer from '@/components/backgrounds/SunriseRenderer';
import DayRenderer from '@/components/backgrounds/DayRenderer';
import EveningAartiRenderer from '@/components/backgrounds/EveningAartiRenderer';
import NightRenderer from '@/components/backgrounds/NightRenderer';
import ShivaPeaceRenderer from '@/components/backgrounds/ShivaPeaceRenderer';
import CinematicEnvironment from '@/components/backgrounds/CinematicEnvironment';

export default function BackgroundManager({
  className = '',
  overlay = true,
  deityOverride,
}: {
  className?: string;
  overlay?: boolean;
  deityOverride?: string;
}) {
  const { resolvedTheme } = useTheme();
  const { isReduced, backgroundEffects } = useAnimation();

  // Pick resolved background component
  const themeKey = deityOverride ? deityOverride.toLowerCase() : resolvedTheme;

  const renderBackground = () => {
    // If background effects are disabled, fallback to simple static night gradient
    if (!backgroundEffects) {
      return <div className="absolute inset-0 bg-[#0d0808]" />;
    }

    switch (themeKey) {
      case 'cinematic':
        return <CinematicEnvironment isReduced={isReduced} />;
      case 'morning':
        return <SunriseRenderer isReduced={isReduced} />;
      case 'day':
      case 'afternoon':
        return <DayRenderer isReduced={isReduced} />;
      case 'evening':
        return <EveningAartiRenderer isReduced={isReduced} />;
      case 'night':
      case 'shiva':
      case 'deity_shiva':
      case 'festival_mahashivratri':
      default:
        // Render Cinematic Sacred World Environment
        return <CinematicEnvironment isReduced={isReduced} />;
    }
  };

  return (
    <div className={`absolute inset-0 -z-10 ${className}`} aria-hidden="true">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#0d0808]" />

      {/* Dynamic resolved render with transition fade effects */}
      <div className="absolute inset-0 transition-opacity duration-[6000ms] ease-in-out">
        {renderBackground()}
      </div>

      {/* Screen read helper overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,8,8,0.4) 0%, rgba(13,8,8,0.25) 50%, rgba(13,8,8,0.96) 100%)',
          }}
        />
      )}
    </div>
  );
}

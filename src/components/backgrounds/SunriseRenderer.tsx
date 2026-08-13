'use client';

import { useAnimation } from '@/hooks/useAnimation';

interface SunriseRendererProps {
  isReduced: boolean;
}

export default function SunriseRenderer({ isReduced }: SunriseRendererProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a0800] via-[#c84800] to-[#ffd080]">
      {/* Morning Sunlight rays */}
      <div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,208,128,0.3) 0%, rgba(200,72,0,0.1) 50%, transparent 80%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Floating Clouds */}
      <div 
        className={`absolute top-[15%] left-[-10%] w-[350px] h-[80px] bg-white/5 rounded-full blur-md ${
          isReduced ? '' : 'animate-[cloudDrift_25s_linear_infinite]'
        }`}
      />

      {/* Temple Silhouette */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200L80 200L80 120L100 80L120 120L120 200L200 200L200 140L220 100L240 60L260 100L280 140L280 200L400 200L400 150L420 110L440 150L440 200L600 200L600 160L620 130L640 100L660 130L680 160L680 200L800 200L800 140L820 100L840 80L860 100L880 140L880 200L1000 200L1000 150L1020 120L1040 150L1040 200L1200 200L1200 130L1220 90L1240 60L1260 90L1280 130L1280 200L1440 200Z"
          fill="rgba(13,8,8,0.7)"
        />
      </svg>
    </div>
  );
}

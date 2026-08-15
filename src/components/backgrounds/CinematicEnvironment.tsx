'use client';

import React from 'react';

interface CinematicEnvironmentProps {
  isReduced?: boolean;
}

export default function CinematicEnvironment({ isReduced = false }: CinematicEnvironmentProps) {
  // Star field generation
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: (i * 98.7) % 50, // Top half sky
    size: 1 + (i % 3),
    delay: (i * 0.3) % 4,
    duration: 2.5 + (i % 3),
    opacity: 0.3 + ((i % 5) * 0.15),
  }));

  // Floating river diyas
  const diyas = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 15 + i * 11,
    bottom: 8 + (i % 3) * 3,
    scale: 0.7 + (i % 3) * 0.15,
    delay: i * 0.6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      {/* 🌌 Peaceful Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03020A] via-[#09061A] to-[#120B24]" />

      {/* 🌟 Twinkling Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className={`absolute rounded-full bg-[#F0E8FF] ${
            isReduced ? '' : 'animate-[starTwinkle_4s_ease-in-out_infinite]'
          }`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* 🌙 Peaceful Glowing Moon */}
      <div
        className="absolute rounded-full animate-moon-glow"
        style={{
          top: '6%',
          right: '12%',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle at 35% 35%, #FFFDF8 0%, #F5E6C0 40%, #D4A843 70%, rgba(212,168,67,0.2) 100%)',
          boxShadow: '0 0 50px rgba(245,230,192,0.35), 0 0 100px rgba(212,168,67,0.15)',
        }}
      />

      {/* 🏔️ Distant Snow-Capped Kailash Peaks */}
      <svg
        className="absolute top-[18%] left-0 right-0 w-full h-[35vh]"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Background Range */}
        <path
          d="M0 320L120 220L260 270L400 150L540 230L680 120L820 210L960 140L1100 240L1240 170L1440 320Z"
          fill="url(#mountainsBackGrad)"
          opacity="0.6"
        />
        {/* Foreground Range */}
        <path
          d="M0 320L180 250L310 180L440 240L580 130L720 210L860 100L980 190L1140 130L1280 220L1440 320Z"
          fill="url(#mountainsFrontGrad)"
          opacity="0.9"
        />
        {/* Snow Peak Glow */}
        <path
          d="M848 108L860 100L872 108L860 122Z"
          fill="#F5E6C0"
          opacity="0.9"
        />
        <path
          d="M570 138L580 130L590 138L580 148Z"
          fill="#F5E6C0"
          opacity="0.75"
        />

        <defs>
          <linearGradient id="mountainsBackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A0D33" />
            <stop offset="100%" stopColor="#0B061A" />
          </linearGradient>
          <linearGradient id="mountainsFrontGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#130826" />
            <stop offset="100%" stopColor="#090414" />
          </linearGradient>
        </defs>
      </svg>

      {/* 🔱 DEITY MOTIF 1: SHIVA — Glowing Trishul & Crescent Aura Over Kailash Peak */}
      <div
        className="absolute"
        style={{
          top: '19%',
          left: '59.5%',
          transform: 'translateX(-50%)',
          filter: 'drop-shadow(0 0 16px rgba(212,168,67,0.7)) shadow(0 0 30px rgba(255,107,0,0.4))',
        }}
        aria-hidden="true"
      >
        <svg width="46" height="90" viewBox="0 0 50 100" fill="none">
          {/* Glowing Aura Ring */}
          <circle cx="25" cy="25" r="22" stroke="rgba(212,168,67,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          {/* Crescent Moon */}
          <path d="M 33,15 A 12,12 0 1,0 33,35 A 10,10 0 1,1 33,15 Z" fill="#F5E6C0" opacity="0.9" />
          {/* Trishul Center Pole */}
          <line x1="25" y1="12" x2="25" y2="90" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round" />
          {/* Outer Prongs */}
          <path d="M12 25 C12 40, 25 45, 25 45 C25 45, 38 40, 38 25" stroke="#D4A843" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M12 25 L12 18 L15 22 Z" fill="#D4A843" />
          <path d="M38 25 L38 18 L35 22 Z" fill="#D4A843" />
          <path d="M25 12 L21 20 L29 20 Z" fill="#D4A843" />
          {/* Damru */}
          <polygon points="17,50 33,50 21,62 29,62" fill="#FF8C38" stroke="#D4A843" strokeWidth="1" />
        </svg>
      </div>

      {/* 🌫️ Light Atmospheric Fog Layer 1 */}
      <div
        className={`absolute top-[42%] left-0 right-0 h-32 bg-gradient-to-r from-transparent via-[#D4A843]/10 to-transparent blur-xl ${
          isReduced ? '' : 'animate-[mistFloat_25s_ease-in-out_infinite]'
        }`}
      />

      {/* 🏛️ ANCIENT TEMPLE ARCHITECTURE & SHRINES */}
      <svg
        className="absolute bottom-[18%] left-0 right-0 w-full h-[45vh]"
        viewBox="0 0 1440 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Deep background temple silhouette */}
        <path
          d="M100 450 L100 320 L130 280 L160 320 L160 450 M1200 450 L1200 300 L1240 250 L1280 300 L1280 450"
          fill="#0D0717"
          opacity="0.8"
        />

        {/* Left Side Temple Structure */}
        <path
          d="M0 450 L0 260 L40 240 L80 260 L80 300 L180 300 L180 220 L220 180 L260 220 L260 300 L340 300 L340 450 Z"
          fill="url(#templeWallGrad)"
        />

        {/* Central Grand Mandap Arch */}
        <path
          d="M480 450 L480 280 Q720 180 960 280 L960 450 Z"
          fill="url(#mandapArchGrad)"
        />

        {/* Right Side Main Temple Tower (Shikhara) */}
        <path
          d="M1100 450 L1100 240 L1130 190 L1150 140 L1170 90 L1190 60 L1200 40 L1210 60 L1230 90 L1250 140 L1270 190 L1300 240 L1300 450 Z"
          fill="url(#shikharaGrad)"
        />

        {/* 🚩 DEITY MOTIF 2: SHRI RAM — Fluttering Saffron Ram Dhwaja Atop Main Shikhara Spire */}
        <g stroke="#FF6B00">
          {/* Flagpole Kalash */}
          <circle cx="1200" cy="35" r="5" fill="#D4A843" />
          <line x1="1200" y1="40" x2="1200" y2="10" stroke="#D4A843" strokeWidth="2" />
          {/* Triangular Saffron Flag */}
          <path d="M1200 10 L1245 22 L1200 34 Z" fill="url(#ramFlagGrad)" className="animate-pulse" />
        </g>

        {/* Temple Doorway Arch & Interior Glow */}
        <path d="M1170 450 L1170 340 C1170 300 1230 300 1230 340 L1230 450 Z" fill="#13081F" />
        <ellipse cx="1200" cy="390" rx="20" ry="40" fill="url(#interiorGlow)" />

        {/* Central Arch Pillar Illumination */}
        <path d="M520 450 L520 310 L540 310 L540 450 Z M900 450 L900 310 L920 310 L920 450 Z" fill="#D4A843" opacity="0.25" />

        <defs>
          <linearGradient id="templeWallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B0E2E" />
            <stop offset="100%" stopColor="#0B0514" />
          </linearGradient>
          <linearGradient id="mandapArchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#150B24" />
            <stop offset="100%" stopColor="#090412" />
          </linearGradient>
          <linearGradient id="shikharaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22113B" />
            <stop offset="100%" stopColor="#0D0619" />
          </linearGradient>
          <linearGradient id="ramFlagGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FF8C38" />
          </linearGradient>
          <radialGradient id="interiorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8C38" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#D4A843" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* 🌺 DEITY MOTIF 3: DURGA MAA — Sacred Festival Shrine Altar on Left Temple Courtyard */}
      <div
        className="absolute"
        style={{
          bottom: '22%',
          left: '12%',
          filter: 'drop-shadow(0 0 12px rgba(255,107,0,0.6))',
        }}
        aria-hidden="true"
      >
        <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
          {/* Shrine Arch */}
          <path d="M10 70 L10 30 Q30 10 50 30 L50 70 Z" fill="#180A28" stroke="#D4A843" strokeWidth="1.5" />
          {/* Marigold Garland Arch */}
          <path d="M14 34 Q30 20 46 34" stroke="#FF6B00" strokeWidth="4" strokeDasharray="5 3" />
          {/* Central Flaming Sacred Diya */}
          <ellipse cx="30" cy="54" rx="12" ry="5" fill="#D4A843" />
          <path d="M30 49 Q33 40 30 35 Q27 40 30 49 Z" fill="#FF8C38" className="animate-diva-flicker" />
          <circle cx="30" cy="42" r="3" fill="#FFFDF8" className="animate-pulse" />
        </svg>
      </div>

      {/* 🙏 DEITY MOTIF 4: HANUMAN — Gada (Mace) Silhouette & Akhand Pillar Lamp */}
      <div
        className="absolute"
        style={{
          bottom: '20%',
          right: '24%',
          filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.5))',
        }}
        aria-hidden="true"
      >
        <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
          {/* Pillar Lamp Base */}
          <rect x="15" y="45" width="10" height="35" fill="#120820" stroke="#D4A843" strokeWidth="1" />
          <ellipse cx="20" cy="45" rx="14" ry="4" fill="#D4A843" opacity="0.7" />
          {/* Akhand Diya Flame */}
          <path d="M20 44 Q24 32 20 25 Q16 32 20 44 Z" fill="#FF6B00" className="animate-diva-flicker" />
          {/* Hanuman Gada (Mace) Leaning */}
          <line x1="2" y1="78" x2="34" y2="20" stroke="#D4A843" strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="20" r="8" fill="#FF8C38" stroke="#D4A843" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 🌊 SACRED RIVER (Ganga / Yamuna Flow at Base) */}
      <div className="absolute bottom-0 left-0 right-0 h-[22vh] overflow-hidden">
        {/* Water Surface Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0518] via-[#081226] to-[#040814]" />

        {/* Water Flow Ripple Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 Q360 50 720 30 T1440 30 M0 70 Q360 90 720 70 T1440 70 M0 120 Q360 140 720 120 T1440 120"
            stroke="url(#waterRippleGrad)"
            strokeWidth="1.5"
            className={isReduced ? '' : 'animate-pulse'}
          />
          <defs>
            <linearGradient id="waterRippleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#D4A843" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>

        {/* 🦚 DEITY MOTIF 5: KRISHNA — Bamboo Flute (Bansuri) & Peacock Feather on River Bank */}
        <div
          className="absolute bottom-[35%] left-[32%]"
          style={{
            filter: 'drop-shadow(0 0 12px rgba(212,168,67,0.7))',
          }}
          aria-hidden="true"
        >
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            {/* Bamboo Flute */}
            <rect x="10" y="22" width="95" height="5" rx="2.5" fill="#D4A843" />
            <circle cx="30" cy="24.5" r="1" fill="#120820" />
            <circle cx="45" cy="24.5" r="1" fill="#120820" />
            <circle cx="60" cy="24.5" r="1" fill="#120820" />
            <circle cx="75" cy="24.5" r="1" fill="#120820" />
            {/* Peacock Feather (Mayur Pankh) */}
            <path d="M85 22 Q105 5 115 12 Q100 25 85 22 Z" fill="url(#peacockGrad)" />
            <ellipse cx="103" cy="14" rx="4" ry="6" fill="#00A896" />
            <ellipse cx="103" cy="14" rx="2" ry="3" fill="#028090" />
            <defs>
              <linearGradient id="peacockGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="50%" stopColor="#D4A843" />
                <stop offset="100%" stopColor="#00A896" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 🪔 FLOATING DIYAS ON SACRED RIVER */}
        {diyas.map((d) => (
          <div
            key={d.id}
            className={`absolute flex flex-col items-center ${
              isReduced ? '' : 'animate-float'
            }`}
            style={{
              left: `${d.left}%`,
              bottom: `${d.bottom}%`,
              transform: `scale(${d.scale})`,
              animationDelay: `${d.delay}s`,
            }}
            aria-hidden="true"
          >
            {/* Diya Flame */}
            <div
              className="w-2.5 h-4 rounded-full bg-gradient-to-t from-[#FF6B00] via-[#FF8C38] to-[#FFFDF8] animate-diva-flicker"
              style={{ boxShadow: '0 0 12px #FF6B00, 0 0 24px #D4A843' }}
            />
            {/* Diya Clay Base */}
            <div className="w-6 h-2.5 bg-gradient-to-r from-[#8B4513] via-[#D4A843] to-[#8B4513] rounded-b-full shadow-md" />
            {/* Water Reflection Ripple */}
            <div className="w-8 h-1 bg-[#FF6B00]/40 rounded-full blur-xs mt-0.5 animate-pulse" />
          </div>
        ))}
      </div>

      {/* 🌫️ Light Atmospheric Fog Layer 2 (Bottom River Mist) */}
      <div
        className={`absolute bottom-[10%] left-0 right-0 h-28 bg-gradient-to-r from-transparent via-[#F5E6C0]/5 to-transparent blur-2xl ${
          isReduced ? '' : 'animate-[mistFloat_35s_ease-in-out_infinite]'
        }`}
      />

      {/* 🔔 HANGING TEMPLE BELLS (TOP LEFT & TOP RIGHT) */}
      <div className="absolute top-0 left-[8%] md:left-[12%] flex gap-8 z-10" aria-hidden="true">
        <div className="flex flex-col items-center animate-float" style={{ animationDuration: '6s' }}>
          <div className="w-0.5 h-20 bg-gradient-to-b from-[#D4A843]/60 to-[#D4A843]" />
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
            <path d="M14 0 Q20 4 24 18 L4 18 Q8 4 14 0 Z" fill="url(#bellGoldGrad)" stroke="#D4A843" strokeWidth="1" />
            <rect x="2" y="18" width="24" height="4" rx="2" fill="#FF8C38" />
            <circle cx="14" cy="25" r="3" fill="#D4A843" />
          </svg>
        </div>
      </div>

      <div className="absolute top-0 right-[8%] md:right-[14%] flex gap-8 z-10" aria-hidden="true">
        <div className="flex flex-col items-center animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>
          <div className="w-0.5 h-28 bg-gradient-to-b from-[#D4A843]/60 to-[#D4A843]" />
          <svg width="34" height="38" viewBox="0 0 34 38" fill="none" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
            <path d="M17 0 Q24 5 29 22 L5 22 Q10 5 17 0 Z" fill="url(#bellGoldGrad)" stroke="#D4A843" strokeWidth="1" />
            <rect x="3" y="22" width="28" height="5" rx="2" fill="#FF8C38" />
            <circle cx="17" cy="30" r="3.5" fill="#D4A843" />
            <defs>
              <linearGradient id="bellGoldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFDF8" />
                <stop offset="40%" stopColor="#D4A843" />
                <stop offset="100%" stopColor="#8B4513" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Subtle Dark Gradient Overlay for optimal UI text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(13,8,8,0.2) 0%, rgba(13,8,8,0.65) 75%, rgba(13,8,8,0.92) 100%)',
        }}
      />
    </div>
  );
}

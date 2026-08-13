'use client';

interface ShivaPeaceRendererProps {
  isReduced: boolean;
}

export default function ShivaPeaceRenderer({ isReduced }: ShivaPeaceRendererProps) {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: ((i * 137.5) % 100),
    y: ((i * 98.7) % 55),
    size: 1 + (i % 3),
    delay: (i * 0.25) % 4,
    duration: 3 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#02020f] via-[#060618] to-[#120a2e]">
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${
            isReduced ? '' : 'animate-[starTwinkle_20s_ease-in-out_infinite]'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: isReduced ? '0s' : `${star.delay}s`,
            animationDuration: isReduced ? '0s' : `${star.duration}s`,
          }}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute animate-moon-glow rounded-full"
        style={{
          top: '8%',
          right: '15%',
          width: '75px',
          height: '75px',
          background: 'radial-gradient(circle at 35% 35%, #F0E8FF, #C8B4FF 60%, #8A6ACD)',
          boxShadow: '0 0 45px rgba(200,180,255,0.4)',
        }}
      />

      {/* Kailash Mountain range */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 380L200 380L300 230L380 280L460 160L560 260L640 130L720 180L800 110L880 190L960 150L1040 220L1120 140L1200 200L1300 260L1440 380Z"
          fill="rgba(8, 4, 25, 0.92)"
        />
        {/* Cap Cap cap */}
        <path
          d="M790 120L800 95L810 120Z"
          fill="rgba(240, 232, 255, 0.75)"
        />
      </svg>

      {/* Shiva Silhouette */}
      <div
        className="absolute"
        style={{
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <svg
          width="70"
          height="140"
          viewBox="0 0 80 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 15px rgba(200,180,255,0.25))' }}
        >
          <line x1="40" y1="5" x2="40" y2="55" stroke="rgba(212,168,67,0.7)" strokeWidth="1.5" />
          <ellipse cx="40" cy="65" rx="11" ry="13" fill="rgba(8,4,25,0.95)" />
          <path d="M28 78L25 125L35 120L40 135L45 120L55 125L52 78Z" fill="rgba(6,3,20,0.97)" />
          <path d="M35 135L20 158L35 153L40 148L45 153L60 158L45 135Z" fill="rgba(6,3,20,0.97)" />
        </svg>
      </div>

      {/* Mist layer */}
      <div
        className={`absolute bottom-[16%] left-0 right-0 h-20 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent blur-md ${
          isReduced ? '' : 'animate-[mistFloat_30s_ease-in-out_infinite]'
        }`}
      />

      {/* Temple lamps (diyas) */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ffcf40] to-[#ff6b00] shadow-[0_0_12px_#ff6b00] ${
            isReduced ? '' : 'animate-diva-flicker'
          }`}
          style={{
            bottom: '18%',
            left: `${35 + i * 15}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

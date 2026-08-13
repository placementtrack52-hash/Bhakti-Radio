'use client';

interface NightRendererProps {
  isReduced: boolean;
}

export default function NightRenderer({ isReduced }: NightRendererProps) {
  const stars = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: ((i * 137.5) % 100),
    y: ((i * 98.7) % 55),
    size: 1 + (i % 2),
    delay: (i * 0.35) % 4,
    duration: 2.5 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#02020f] via-[#120a2e] to-[#0a0520]">
      {/* Twinkling Stars */}
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

      {/* Crescent Moon */}
      <div
        className="absolute rounded-full animate-moon-glow"
        style={{
          top: '10%',
          right: '15%',
          width: '70px',
          height: '70px',
          background: 'radial-gradient(circle at 35% 35%, #F0E8FF, #C8B4FF 60%, #8A6ACD)',
          boxShadow: '0 0 40px rgba(200,180,255,0.3)',
        }}
      />

      {/* Mountain Silhouettes (Kailash) */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 300L150 300L250 180L330 220L420 120L520 210L600 110L680 160L760 90L840 170L920 130L1000 190L1080 120L1160 180L1250 220L1440 300Z"
          fill="rgba(5, 2, 20, 0.9)"
        />
      </svg>
    </div>
  );
}

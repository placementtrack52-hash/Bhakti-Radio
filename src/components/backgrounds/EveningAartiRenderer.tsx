'use client';

interface EveningAartiRendererProps {
  isReduced: boolean;
}

export default function EveningAartiRenderer({ isReduced }: EveningAartiRendererProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0d0808] via-[#6b1515] to-[#ff6b00]">
      {/* Horizon glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-56"
        style={{
          background: 'linear-gradient(to top, rgba(255,107,0,0.4), transparent)',
          filter: 'blur(20px)',
        }}
      />

      {/* Hanging/Floating Diyas */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-3.5 h-3.5 rounded-full bg-gradient-to-t from-[#ff6b00] to-[#ffcf40] shadow-[0_0_15px_#ff6b00] ${
            isReduced ? '' : 'animate-diva-flicker'
          }`}
          style={{
            left: `${15 + i * 16}%`,
            bottom: '22%',
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${1.8 + i * 0.25}s`,
          }}
        />
      ))}

      {/* Incense smoke lines simulation */}
      <div 
        className={`absolute bottom-[20%] left-[25%] w-0.5 h-24 bg-gradient-to-t from-white/10 to-transparent blur-[1px] ${
          isReduced ? '' : 'animate-[mistFloat_35s_ease-in-out_infinite]'
        }`}
      />
      <div 
        className={`absolute bottom-[20%] right-[30%] w-0.5 h-32 bg-gradient-to-t from-white/10 to-transparent blur-[2px] ${
          isReduced ? '' : 'animate-[mistFloat_35s_ease-in-out_infinite_reverse]'
        }`}
        style={{ animationDelay: '5s' }}
      />

      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200L80 200L80 120L100 80L120 120L120 200L200 200L200 140L220 100L240 60L260 100L280 140L280 200L400 200L400 150L420 110L440 150L440 200L600 200L600 160L620 130L640 100L660 130L680 160L680 200L800 200L800 140L820 100L840 80L860 100L880 140L880 200L1000 200L1000 150L1020 120L1040 150L1040 200L1200 200L1200 130L1220 90L1240 60L1260 90L1280 130L1280 200L1440 200Z"
          fill="rgba(10,5,5,0.75)"
        />
      </svg>
    </div>
  );
}

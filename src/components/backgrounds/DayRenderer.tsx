'use client';

interface DayRendererProps {
  isReduced: boolean;
}

export default function DayRenderer({ isReduced }: DayRendererProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#ffeaad] via-[#ffd080]/60 to-[#0d0808]">
      {/* Sunlight glow at top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255,234,173,0.3) 0%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}

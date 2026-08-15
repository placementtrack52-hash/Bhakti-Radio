'use client';

import Image from 'next/image';

export default function BackgroundManager({
  className = '',
  overlay = true,
  deityOverride,
}: {
  className?: string;
  overlay?: boolean;
  deityOverride?: string;
}) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`} aria-hidden="true">
      {/* 
        Using Next.js Image component for automatic optimization 
        object-cover and object-center ensure it is mobile responsive
      */}
      <Image
        src="/backgrounds/background.png"
        alt="Bhakti Radio Background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Screen read helper overlay to ensure text over the background is readable */}
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

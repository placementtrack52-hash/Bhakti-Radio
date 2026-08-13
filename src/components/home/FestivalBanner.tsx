'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { FestivalService } from '@/services/FestivalService';

export default function FestivalBanner() {
  const { isFestivalActive, activeFestivalName } = useTheme();
  
  if (!isFestivalActive || !activeFestivalName) return null;

  const activeFestival = FestivalService.getAllFestivals().find(f => f.name === activeFestivalName);

  if (!activeFestival) return null;

  return (
    <div className="py-6 px-4" role="region" aria-label="Festival Announcement">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl p-6 md:p-8 overflow-hidden border border-[rgba(212,168,67,0.3)] shadow-[0_0_30px_rgba(212,168,67,0.15)] flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(212,168,67,0.15) 0%, rgba(255,107,0,0.1) 100%)',
          }}
        >
          {/* Decorative halo */}
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#d4a843]/10 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <span className="text-5xl animate-float" aria-hidden="true">
              {activeFestival.icon}
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff6b00] bg-[#ff6b00]/10 px-2.5 py-1 rounded-full">
                Festival Mode Active
              </span>
              <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white mt-2">
                {activeFestival.name} Special
              </h3>
              <p className="text-xs text-[#a0896a] mt-1 max-w-lg">
                {activeFestival.description} Listen to curated collections matching this divine occasion.
              </p>
            </div>
          </div>

          <Link
            id={`explore-festival-${activeFestival.slug}`}
            href={`/festivals/${activeFestival.slug}`}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg text-center whitespace-nowrap"
          >
            Explore Special Playlist
          </Link>
        </div>
      </div>
    </div>
  );
}

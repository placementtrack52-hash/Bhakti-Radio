'use client';

import React from 'react';
import Link from 'next/link';
import { Festival } from '@/types/festival';
import { Song } from '@/types/song';
import SongCard from '@/components/ui/SongCard';
import BackgroundManager from '@/components/shared/BackgroundManager';
import Footer from '@/components/layout/Footer';

interface FestivalDetailClientProps {
  festival: Festival;
  festivalSongs: Song[];
}

export default function FestivalDetailClient({ festival, festivalSongs }: FestivalDetailClientProps) {
  return (
    <div className="min-h-screen relative overflow-hidden text-[#F5E6C0]">
      {/* Background Manager connected to festival visual theme */}
      <BackgroundManager overlay deityOverride={festival.theme} />

      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Festival Header Card */}
        <div className="glass-gold rounded-3xl p-6 md:p-10 mb-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="text-6xl p-5 bg-black/40 rounded-2xl animate-float" aria-hidden="true">
            {festival.icon}
          </div>
          <div>
            <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
              Festival Season
            </span>
            <h1 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-white mt-1">
              {festival.name}
            </h1>
            <p className="text-sm text-[#a0896a] mt-2 max-w-xl">{festival.description}</p>
          </div>
        </div>

        {/* Songs queue list matched to Festival */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white">
              Special Playlist ({festivalSongs.length})
            </h2>
            <Link href="/library" className="text-xs text-[#8a7258] hover:text-white transition-colors">
              Browse Library
            </Link>
          </div>

          {festivalSongs.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <span className="text-3xl block mb-2" aria-hidden="true">📿</span>
              <p className="text-[#8a7258] text-sm">No songs matched to this festival currently. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {festivalSongs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} compact showIndex />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

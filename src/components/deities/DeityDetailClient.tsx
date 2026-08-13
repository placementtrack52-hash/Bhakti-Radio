'use client';

import React from 'react';
import Link from 'next/link';
import { Deity } from '@/types/deity';
import { Song } from '@/types/song';
import SongCard from '@/components/ui/SongCard';
import BackgroundManager from '@/components/shared/BackgroundManager';
import Footer from '@/components/layout/Footer';

interface DeityDetailClientProps {
  deity: Deity;
  deitySongs: Song[];
  allSongs: Song[];
}

export default function DeityDetailClient({ deity, deitySongs, allSongs }: DeityDetailClientProps) {
  return (
    <div className="min-h-screen relative overflow-hidden text-[#F5E6C0]">
      {/* Background Manager connected to deitySpecific background theme */}
      <BackgroundManager overlay deityOverride={deity.name} />

      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Deity Header Card */}
        <div className="glass-gold rounded-3xl p-6 md:p-10 mb-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="text-6xl p-5 bg-black/40 rounded-2xl animate-float" aria-hidden="true">
            {deity.icon}
          </div>
          <div>
            <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
              Divine Collection
            </span>
            <h1 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-white mt-1">
              {deity.name}
            </h1>
            <p className="text-sm text-[#a0896a] mt-2 max-w-xl">{deity.description}</p>
          </div>
        </div>

        {/* Songs queue list matched to Deity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white">
              Sacred Collections ({deitySongs.length})
            </h2>
            <Link href="/library" className="text-xs text-[#8a7258] hover:text-white transition-colors">
              Browse Library
            </Link>
          </div>

          {deitySongs.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <span className="text-3xl block mb-2" aria-hidden="true">📿</span>
              <p className="text-[#8a7258] text-sm">No songs available for this deity currently.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {deitySongs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} compact showIndex />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Related recommendations segment */}
        {deitySongs.length > 0 && (
          <div className="mt-12">
            <h3 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#d4a843] mb-4">
              Recommended for Devotion
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {allSongs
                .filter((s) => s.deity !== deity.name)
                .slice(0, 4)
                .map((song, index) => (
                  <SongCard key={song.id} song={song} index={index} />
                ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

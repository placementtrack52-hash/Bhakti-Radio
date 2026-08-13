'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/deity';
import { Song } from '@/types/song';
import SongCard from '@/components/ui/SongCard';
import BackgroundManager from '@/components/shared/BackgroundManager';
import Footer from '@/components/layout/Footer';

interface CategoryDetailClientProps {
  category: Category;
  categorySongs: Song[];
}

export default function CategoryDetailClient({ category, categorySongs }: CategoryDetailClientProps) {
  return (
    <div className="min-h-screen relative overflow-hidden text-[#F5E6C0]">
      {/* Background Manager connected to active station theme */}
      <BackgroundManager overlay />

      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Category Header Card */}
        <div className="glass-gold rounded-3xl p-6 md:p-10 mb-8 flex items-center gap-6">
          <div className="text-5xl p-4 bg-black/40 rounded-2xl" aria-hidden="true">
            {category.icon}
          </div>
          <div>
            <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
              Devotional Category
            </span>
            <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-white mt-1">
              {category.name}
            </h1>
            <p className="text-xs text-[#a0896a] mt-1">
              Browse all sacred {category.name.toLowerCase()} collections.
            </p>
          </div>
        </div>

        {/* Songs queue list matched to Category */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white">
              Song Collection ({categorySongs.length})
            </h2>
            <Link href="/library" className="text-xs text-[#8a7258] hover:text-white transition-colors">
              Browse Library
            </Link>
          </div>

          {categorySongs.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <span className="text-3xl block mb-2" aria-hidden="true">📿</span>
              <p className="text-[#8a7258] text-sm">No songs available in this category currently.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categorySongs.map((song, index) => (
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

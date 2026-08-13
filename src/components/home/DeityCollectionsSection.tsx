'use client';

import React from 'react';
import Link from 'next/link';
import deitiesData from '@/data/deities.json';
import songsData from '@/data/songs.json';
import { Deity } from '@/types/deity';
import { Song } from '@/types/song';

const deities = deitiesData as Deity[];
const songs = songsData as Song[];

export default function DeityCollectionsSection() {
  return (
    <section className="py-12 px-4" aria-label="Deity Collections" role="region">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
              Devotional Focus
            </span>
            <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-gradient-gold mt-1">
              Deity Collections
            </h2>
          </div>
          <Link href="/deities" className="text-sm text-[#d4a843] hover:underline">
            All Deities →
          </Link>
        </div>

        {/* Horizontal scroll container on mobile, Grid layout on larger displays */}
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {deities.map((deity) => {
            const trackCount = songs.filter((s) => s.deity === deity.name).length;
            return (
              <Link
                key={deity.slug}
                id={`deity-card-home-${deity.slug}`}
                href={`/deities/${deity.slug}`}
                className="flex-shrink-0 w-44 md:w-auto snap-start glass-gold rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300 border border-[rgba(212,168,67,0.15)] group"
              >
                <div className="text-4xl block mb-2 group-hover:scale-110 transition-transform" aria-hidden="true">
                  {deity.icon}
                </div>
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-sm group-hover:text-[#d4a843] transition-colors">
                  {deity.name}
                </h3>
                <p className="text-[10px] text-[#8a7258] mt-1">{trackCount} Songs</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

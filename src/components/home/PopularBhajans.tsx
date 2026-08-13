'use client';

import { useRef } from 'react';
import songsData from '@/data/songs.json';
import { Song } from '@/types/song';
import SongCard from '@/components/ui/SongCard';

const songs = songsData as Song[];
const featured = songs.filter((s) => s.featured);

export default function PopularBhajans() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
  };

  return (
    <section
      className="py-20 px-4"
      aria-label="Popular Bhajans"
      role="region"
      id="popular-bhajans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase mb-2">
              <span className="w-6 h-px bg-[#d4a843]" />
              Curated
            </div>
            <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-gradient-gold">
              Popular Bhajans
            </h2>
          </div>
          {/* Scroll arrows (desktop) */}
          <div className="hidden sm:flex gap-2">
            <button
              id="scroll-left-btn"
              onClick={scrollLeft}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#d4a843] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              id="scroll-right-btn"
              onClick={scrollRight}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-[#d4a843] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="list"
          aria-label="Popular bhajans list"
        >
          {featured.map((song, index) => (
            <div
              key={song.id}
              className="flex-shrink-0 w-44 sm:w-48 md:w-auto snap-start"
              role="listitem"
            >
              <SongCard song={song} index={index} />
            </div>
          ))}
        </div>

        {/* All songs list */}
        <div className="mt-12">
          <h3 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold text-[#d4a843] mb-4">
            All Songs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" role="list">
            {songs.map((song, index) => (
              <div key={song.id} role="listitem">
                <SongCard song={song} index={index} compact showIndex />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

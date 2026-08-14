'use client';

import Link from 'next/link';
import categoriesData from '@/data/categories.json';
import songsData from '@/data/songs.json';
import { Category } from '@/types/deity';
import { Song } from '@/types/song';

const categories = categoriesData as Category[];
const songs = songsData as Song[];

export default function CategoriesIndexPage() {
  return (
    <div className="min-h-screen bg-[#0D0808] text-[#F5E6C0]">
      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase">
            Forms of Song
          </span>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl font-bold text-gradient-gold mt-2">
            Categories
          </h1>
          <p className="text-[#8a7258] mt-3 text-sm max-w-md mx-auto">
            Choose from aartis, bhajans, stotras, or mantras to refine your devotional atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => {
            const matchingSongs = songs.filter((s) => s.category === cat.name);
            return (
              <Link
                key={cat.slug}
                id={`category-card-${cat.slug}`}
                href={`/categories/${cat.slug}`}
                className="glass rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[rgba(212,168,67,0.15)]"
              >
                <div className="text-3xl mb-3" aria-hidden="true">{cat.icon}</div>
                <h2 className="font-bold text-white text-base">
                  {cat.name}
                </h2>
                <span className="inline-block text-[10px] uppercase font-bold text-[#d4a843] mt-2 bg-[#d4a843]/10 px-2 py-0.5 rounded-full">
                  {matchingSongs.length} Tracks
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

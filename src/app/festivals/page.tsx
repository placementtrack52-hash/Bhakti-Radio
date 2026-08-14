'use client';

import Link from 'next/link';
import festivalsData from '@/data/festivals.json';
import { Festival } from '@/types/festival';

const festivals = festivalsData as Festival[];

export default function FestivalsIndexPage() {
  return (
    <div className="min-h-screen bg-[#0D0808] text-[#F5E6C0]">
      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase">
            Devotional Calendar
          </span>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl font-bold text-gradient-gold mt-2">
            Festivals
          </h1>
          <p className="text-[#8a7258] mt-3 text-sm max-w-md mx-auto">
            Explore dedicated playlists and dynamic thematic visual atmospheres for sacred Indian festivals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((fest) => (
            <Link
              key={fest.slug}
              id={`festival-card-${fest.slug}`}
              href={`/festivals/${fest.slug}`}
              className="group relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl glass-gold border border-[rgba(212,168,67,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl" aria-hidden="true">{fest.icon}</span>
                  <span className="text-[10px] text-[#8a7258] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                    {fest.start}
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-xl group-hover:text-[#d4a843] transition-colors">
                  {fest.name}
                </h2>
                <p className="text-xs text-[#a0896a] mt-2 leading-relaxed">
                  {fest.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#d4a843] font-semibold">
                <span>View Playlist</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import deitiesData from '@/data/deities.json';
import songsData from '@/data/songs.json';
import { Deity } from '@/types/deity';
import { Song } from '@/types/song';

const deities = deitiesData as Deity[];
const songs = songsData as Song[];

export default function DeitiesIndexPage() {
  return (
    <div className="min-h-screen bg-[#0D0808] text-[#F5E6C0]">
      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase">
            Pantheon
          </span>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl font-bold text-gradient-gold mt-2">
            Deity Collections
          </h1>
          <p className="text-[#8a7258] mt-3 text-sm max-w-md mx-auto">
            Select a deity to listen to dedicated songs, chants, mantras, and collections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deities.map((deity) => {
            const matchingSongs = songs.filter((s) => s.deity === deity.name);
            return (
              <Link
                key={deity.slug}
                id={`deity-card-${deity.slug}`}
                href={`/deities/${deity.slug}`}
                className="group relative rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl glass-gold border border-[rgba(212,168,67,0.15)]"
              >
                <div className="text-4xl p-3 bg-black/40 rounded-xl group-hover:scale-110 transition-transform" aria-hidden="true">
                  {deity.icon}
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-xl group-hover:text-[#d4a843] transition-colors">
                    {deity.name}
                  </h2>
                  <p className="text-xs text-[#8a7258] mt-1 line-clamp-2">{deity.description}</p>
                  <span className="inline-block text-[10px] uppercase font-bold text-[#d4a843] mt-3 bg-[#d4a843]/10 px-2 py-0.5 rounded-full">
                    {matchingSongs.length} Songs Available
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

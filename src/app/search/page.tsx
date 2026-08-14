'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import songsData from '@/data/songs.json';
import deitiesData from '@/data/deities.json';
import festivalsData from '@/data/festivals.json';
import { Song } from '@/types/song';
import { Deity } from '@/types/deity';
import { Festival } from '@/types/festival';
import SongCard from '@/components/ui/SongCard';

const songs = songsData as Song[];
const deities = deitiesData as Deity[];
const festivals = festivalsData as Festival[];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const cleanQuery = query.toLowerCase().trim();

  // Cross-entity advanced search filtering
  const matchedSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(cleanQuery) ||
      s.artist.toLowerCase().includes(cleanQuery) ||
      (s.category && s.category.toLowerCase().includes(cleanQuery))
  );

  const matchedDeities = deities.filter(
    (d) =>
      d.name.toLowerCase().includes(cleanQuery) ||
      d.description.toLowerCase().includes(cleanQuery)
  );

  const matchedFestivals = festivals.filter(
    (f) =>
      f.name.toLowerCase().includes(cleanQuery) ||
      f.description.toLowerCase().includes(cleanQuery)
  );

  const matchedPDFs = songs.filter(
    (s) =>
      s.pdf &&
      (s.title.toLowerCase().includes(cleanQuery) ||
        s.artist.toLowerCase().includes(cleanQuery))
  );

  const hasResults =
    matchedSongs.length > 0 ||
    matchedDeities.length > 0 ||
    matchedFestivals.length > 0 ||
    matchedPDFs.length > 0;

  return (
    <div className="min-h-screen bg-[#0D0808] text-[#F5E6C0]">
      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-gradient-gold">
            Advanced Search
          </h1>
          <p className="text-xs text-[#8a7258] mt-1">
            Search cross-entities (songs, prayer books, deities, festivals) instantly.
          </p>
        </div>

        {/* Input box */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-lg" aria-hidden="true">
              🔍
            </span>
            <input
              id="advanced-search-input"
              type="text"
              placeholder="Search songs, books, gods, or festivals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-[rgba(212,168,67,0.3)] rounded-full py-4 pl-12 pr-6 text-white placeholder-[#8a7258] focus:outline-none focus:border-[#d4a843] transition-all"
              aria-label="Advanced Search"
            />
          </div>
        </div>

        {cleanQuery ? (
          <div>
            {!hasResults ? (
              <div className="text-center py-20 glass rounded-3xl">
                <span className="text-3xl block mb-2" aria-hidden="true">📿</span>
                <p className="text-[#8a7258] text-sm">No matched results. Try alternative terms.</p>
              </div>
            ) : (
              <div className="space-y-10 animate-fade-in-up">
                
                {/* 1. Songs */}
                {matchedSongs.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#d4a843] mb-4">
                      Matched Songs ({matchedSongs.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {matchedSongs.map((song, index) => (
                        <SongCard key={song.id} song={song} index={index} compact showIndex />
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. PDFs */}
                {matchedPDFs.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#d4a843] mb-4">
                      Prayer Books & PDFs ({matchedPDFs.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {matchedPDFs.map((song) => (
                        <Link
                          key={song.id}
                          id={`pdf-link-${song.id}`}
                          href={`/reader/${song.id}`}
                          className="glass p-4 rounded-2xl flex items-center gap-3 hover:bg-white/5 transition-all border border-transparent hover:border-[rgba(212,168,67,0.15)]"
                        >
                          <span className="text-3xl" aria-hidden="true">📄</span>
                          <div>
                            <h3 className="text-sm font-bold text-white truncate">{song.title} PDF</h3>
                            <p className="text-xs text-[#8a7258] truncate">{song.artist}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Deities */}
                {matchedDeities.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#d4a843] mb-4">
                      Deities ({matchedDeities.length})
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {matchedDeities.map((deity) => (
                        <Link
                          key={deity.slug}
                          href={`/deities/${deity.slug}`}
                          className="glass-gold p-4 rounded-2xl text-center hover:scale-105 transition-transform"
                        >
                          <span className="text-3xl block mb-2" aria-hidden="true">{deity.icon}</span>
                          <h3 className="text-sm font-bold text-white">{deity.name}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Festivals */}
                {matchedFestivals.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-[#d4a843] mb-4">
                      Festivals ({matchedFestivals.length})
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {matchedFestivals.map((fest) => (
                        <Link
                          key={fest.slug}
                          href={`/festivals/${fest.slug}`}
                          className="glass p-4 rounded-2xl text-center hover:scale-105 transition-transform"
                        >
                          <span className="text-3xl block mb-2" aria-hidden="true">{fest.icon}</span>
                          <h3 className="text-sm font-bold text-white">{fest.name}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-[#8a7258]">
            <span className="text-5xl block mb-4" aria-hidden="true">🕉️</span>
            <p className="text-sm">Type query above to search through songs, mantras, deities, and festivals instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

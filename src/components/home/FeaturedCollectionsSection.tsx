'use client';

import React from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import songsData from '@/data/songs.json';
import { Song } from '@/types/song';

const songs = songsData as Song[];

interface CollectionPreset {
  id: string;
  title: string;
  subtitle: string;
  deity?: string;
  category?: string;
  station?: string;
  icon: string;
  songs: Song[];
}

export default function FeaturedCollectionsSection() {
  const { playSong } = usePlayer();

  // Create collections for Shiva Mantras, Hanuman Chalisa, Krishna Bhajans, Evening Aarti
  const collections: CollectionPreset[] = [
    {
      id: 'shiva-mantras',
      title: 'Shiva Mantras',
      subtitle: 'Deep meditative chants',
      deity: 'Shiva',
      category: 'Mantra',
      icon: '🕉️',
      songs: songs.filter((s) => s.deity === 'Shiva' && s.category === 'Mantra'),
    },
    {
      id: 'hanuman-chalisa',
      title: 'Hanuman Chalisa',
      subtitle: 'Praises & protective hymns',
      deity: 'Hanuman',
      category: 'Chalisa',
      icon: '🙏',
      songs: songs.filter((s) => s.deity === 'Hanuman' && s.category === 'Chalisa'),
    },
    {
      id: 'krishna-bhajans',
      title: 'Krishna Bhajans',
      subtitle: 'Devotional love songs',
      deity: 'Krishna',
      category: 'Bhajan',
      icon: '🦚',
      songs: songs.filter((s) => s.deity === 'Krishna' && s.category === 'Bhajan'),
    },
    {
      id: 'evening-aarti',
      title: 'Evening Aarti',
      subtitle: 'Temple lamp prayers',
      station: 'Sandhya Aarti',
      icon: '🪔',
      songs: songs.filter((s) => s.station === 'Sandhya Aarti'),
    },
  ];

  const handlePlayCollection = (collection: CollectionPreset) => {
    if (collection.songs.length > 0) {
      playSong(collection.songs[0], 0);
    }
  };

  return (
    <section className="py-12 px-4" aria-label="Featured Collections" role="region">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
            Curated Sets
          </span>
          <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl font-bold text-gradient-gold mt-1">
            Featured Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              className="glass p-6 rounded-2xl border border-[rgba(212,168,67,0.15)] flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl block mb-4" aria-hidden="true">{col.icon}</span>
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-lg">
                  {col.title}
                </h3>
                <p className="text-xs text-[#8a7258] mt-1 mb-4">{col.subtitle}</p>
                <span className="text-xs bg-white/5 border border-white/10 text-[#a0896a] px-2.5 py-1 rounded-full inline-block">
                  {col.songs.length} Tracks
                </span>
              </div>
              <button
                id={`play-collection-${col.id}`}
                onClick={() => handlePlayCollection(col)}
                disabled={col.songs.length === 0}
                className="mt-6 w-full py-3 rounded-full font-semibold text-xs transition-all uppercase tracking-wider bg-[#d4a843]/10 border border-[#d4a843]/30 text-[#d4a843] hover:bg-[#d4a843] hover:text-black cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ▶ Play Collection
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import songsData from '@/data/songs.json';
import deitiesData from '@/data/deities.json';
import categoriesData from '@/data/categories.json';
import { Song } from '@/types/song';
import { Deity, Category } from '@/types/deity';
import SongCard from '@/components/ui/SongCard';

const songs = songsData as Song[];
const deities = deitiesData as Deity[];
const categories = categoriesData as Category[];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Song[]>([]);
  const [history, setHistory] = useState<Song[]>([]);

  // Load local storage bookmarks and viewing history
  useEffect(() => {
    try {
      const bookmarkedIds = JSON.parse(localStorage.getItem('bhakti_bookmarks') || '[]');
      const historyIds = JSON.parse(localStorage.getItem('bhakti_history') || '[]');

      setBookmarks(songs.filter((s) => bookmarkedIds.includes(s.id)));
      setHistory(songs.filter((s) => historyIds.includes(s.id)));
    } catch (e) {
      console.warn("Failed to load local storage lists", e);
    }
  }, []);

  // Instant filter matched results across titles, artists, deities, categories, tags, or stations
  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      (song.deity && song.deity.toLowerCase().includes(query)) ||
      (song.category && song.category.toLowerCase().includes(query)) ||
      (song.station && song.station.toLowerCase().includes(query)) ||
      (song.tags && song.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="min-h-screen bg-[#0D0808] text-[#F5E6C0]">
      {/* Header Spacer */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Instant Search Widget */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[#8a7258]" aria-hidden="true">
              🔍
            </span>
            <input
              id="library-search-input"
              type="text"
              placeholder="Search by song, deity, mantra, artist, tag, or station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-[rgba(212,168,67,0.3)] rounded-full py-4 pl-12 pr-6 text-white placeholder-[#8a7258] focus:outline-none focus:border-[#d4a843] focus:ring-1 focus:ring-[#d4a843] transition-all text-base"
              aria-label="Search the Devotional Library"
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-[#8a7258] mt-2 pl-4">
              Showing {filteredSongs.length} matching songs
            </p>
          )}
        </div>

        {/* Display normal category lists if search is empty */}
        {!searchQuery && (
          <>
            {/* Bookmarks Section */}
            {bookmarks.length > 0 && (
              <div className="mb-12">
                <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white mb-4">
                  ⭐ Bookmarked Prayers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {bookmarks.map((song, index) => (
                    <SongCard key={song.id} song={song} index={index} compact showIndex />
                  ))}
                </div>
              </div>
            )}

            {/* History Section */}
            {history.length > 0 && (
              <div className="mb-12">
                <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-white mb-4">
                  ⏳ Recently Read / Played
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {history.map((song, index) => (
                    <SongCard key={song.id} song={song} index={index} compact showIndex />
                  ))}
                </div>
              </div>
            )}

            {/* 1. Deities Collections (Horizontally Scrollable on Mobile) */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
                    Divine Presence
                  </span>
                  <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white mt-1">
                    Deities
                  </h2>
                </div>
                <Link href="/deities" className="text-sm text-[#d4a843] hover:underline">
                  All Deities →
                </Link>
              </div>

              {/* Horizontal Scroll on mobile, Grid on desktop */}
              <div className="flex gap-6 overflow-x-auto pb-4 scroll-snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {deities.map((deity) => {
                  const songCount = songs.filter(s => s.deity === deity.name).length;
                  return (
                    <Link
                      key={deity.slug}
                      href={`/deities/${deity.slug}`}
                      className="flex-shrink-0 w-52 md:w-auto snap-start glass-gold rounded-2xl p-4 text-center hover:-translate-y-1 transition-all duration-300 border border-[rgba(212,168,67,0.15)] group"
                    >
                      <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                        {deity.icon}
                      </span>
                      <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white group-hover:text-[#d4a843] transition-colors">
                        {deity.name}
                      </h3>
                      <p className="text-xs text-[#8a7258] mt-1">{songCount} Tracks</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2. Devotional Categories */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.2em] text-[#d4a843] uppercase">
                    Sacred Forms
                  </span>
                  <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white mt-1">
                    Categories
                  </h2>
                </div>
                <Link href="/categories" className="text-sm text-[#d4a843] hover:underline">
                  All Categories →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map((cat) => {
                  const songCount = songs.filter(s => s.category === cat.name).length;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="glass rounded-xl p-4 text-center hover:bg-white/5 transition-all border border-transparent hover:border-[rgba(212,168,67,0.15)]"
                    >
                      <span className="text-2xl block mb-2" aria-hidden="true">{cat.icon}</span>
                      <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                      <p className="text-[10px] text-[#8a7258] mt-1">{songCount} Songs</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* 3. Devotional Songs List */}
        <div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white mb-6">
            {searchQuery ? 'Search Results' : 'All Sacred Songs'}
          </h2>

          {filteredSongs.length === 0 ? (
            <div className="text-center py-20 glass rounded-3xl">
              <span className="text-4xl block mb-3" aria-hidden="true">📿</span>
              <p className="text-[#8a7258] text-sm">No songs match your search query. Try searching for deities or mantras.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSongs.map((song, index) => (
                <div key={song.id} className="relative group">
                  <SongCard song={song} index={index} compact showIndex />
                  {/* Dynamic side companion button shortcut */}
                  <Link
                    href={`/reader/${song.id}`}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-xs bg-[#d4a843]/15 text-[#d4a843] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Open Lyrics and PDF Reader"
                  >
                    📖 Read
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

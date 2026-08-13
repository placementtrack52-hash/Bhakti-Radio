'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Song } from '@/types/song';
import { usePlayer } from '@/hooks/usePlayer';
import lyricsData from '@/data/lyrics.json';
import Footer from '@/components/layout/Footer';

interface ReaderClientProps {
  song: Song;
}

interface LyricLine {
  time: number;
  text: string;
}

export default function ReaderClient({ song }: ReaderClientProps) {
  const { playSong, isPlaying, progress, togglePlay } = usePlayer();
  
  // Custom states
  const [zoom, setZoom] = useState(100);
  const [isNightMode, setIsNightMode] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);

  // Sync lyrics matching target song ID
  const songLyrics = (lyricsData.find((l) => l.songId === song.id)?.lyrics || []) as LyricLine[];

  // local storage bookmarks tracker
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('bhakti_bookmarks') || '[]');
    setIsBookmarked(list.includes(song.id));

    // Save to recently viewed list
    const history = JSON.parse(localStorage.getItem('bhakti_history') || '[]');
    const filtered = history.filter((id: number) => id !== song.id);
    localStorage.setItem('bhakti_history', JSON.stringify([song.id, ...filtered].slice(0, 10)));
  }, [song.id]);

  const toggleBookmark = () => {
    const list = JSON.parse(localStorage.getItem('bhakti_bookmarks') || '[]');
    let updated;
    if (list.includes(song.id)) {
      updated = list.filter((id: number) => id !== song.id);
      setIsBookmarked(false);
    } else {
      updated = [...list, song.id];
      setIsBookmarked(true);
    }
    localStorage.setItem('bhakti_bookmarks', JSON.stringify(updated));
  };

  // Find active verse matching timestamp playback progress
  const getActiveVerseIndex = () => {
    let activeIndex = -1;
    for (let i = 0; i < songLyrics.length; i++) {
      if (progress >= songLyrics[i].time) {
        activeIndex = i;
      }
    }
    return activeIndex;
  };

  const activeVerseIdx = getActiveVerseIndex();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isNightMode ? 'bg-[#050308] text-[#c8b8a0]' : 'bg-[#fcf8f2] text-[#4a3622]'}`}>
      {/* Header spacer */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Control Bar */}
        <div className={`glass rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border ${isNightMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-3">
            <Link href="/library" className="text-xs hover:underline">← Back</Link>
            <h1 className="font-[family-name:var(--font-cinzel)] font-bold text-lg text-white">
              {song.title} Companion
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Bookmarks */}
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                isBookmarked ? 'bg-[#d4a843]/20 border-[#d4a843] text-white' : 'bg-transparent border-transparent'
              }`}
            >
              {isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
            </button>

            {/* Reading mode toggles */}
            <button
              onClick={() => setIsReadingMode(!isReadingMode)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white"
            >
              {isReadingMode ? 'Normal View' : 'Reading Mode'}
            </button>

            {/* Contrast modes */}
            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="p-2 text-xs"
              aria-label="Toggle Night Contrast Mode"
            >
              {isNightMode ? '☀️ Day Mode' : '🌙 Night Mode'}
            </button>
          </div>
        </div>

        {/* Layout container */}
        <div className={`grid grid-cols-1 ${isReadingMode ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-8`}>
          
          {/* Left panel: Audio control + Synced Karaoke lyrics */}
          {!isReadingMode && (
            <div className="space-y-6">
              {/* Karaoke wrapper */}
              <div className="glass-gold rounded-3xl p-6 border border-[rgba(212,168,67,0.15)] shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={song.cover}
                      alt={song.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{song.title}</h3>
                    <p className="text-xs text-[#8a7258]">{song.artist}</p>
                  </div>
                  <button
                    onClick={() => playSong(song, 0)}
                    className="ml-auto w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white"
                    aria-label="Play Devotional Track"
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                </div>

                {/* Lyrics highlighter */}
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#d4a843] mb-4">
                    Karaoke Mode Synced Lyrics
                  </h4>
                  {songLyrics.length === 0 ? (
                    <p className="text-xs text-[#8a7258] italic py-6 text-center">Lyrics text sheet matches the PDF document below.</p>
                  ) : (
                    songLyrics.map((lyric, idx) => {
                      const isActive = idx === activeVerseIdx;
                      return (
                        <p
                          key={idx}
                          className={`text-sm md:text-base transition-all duration-300 leading-relaxed ${
                            isActive
                              ? 'text-[#ff6b00] font-bold scale-102 pl-2 border-l-2 border-[#ff6b00]'
                              : 'opacity-50 text-[#8a7258]'
                          }`}
                        >
                          {lyric.text}
                        </p>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right panel: Premium PDF Viewer */}
          <div className="space-y-4">
            <div className="glass rounded-3xl p-6 border border-white/10 flex flex-col h-[600px] justify-between">
              
              {/* PDF Header Zoom Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-semibold text-white">📖 Prayer Book Viewer</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="text-xs px-2 py-1 bg-white/5 rounded">-</button>
                  <span className="text-xs text-[#8a7258]">{zoom}%</span>
                  <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="text-xs px-2 py-1 bg-white/5 rounded">+</button>
                </div>
              </div>

              {/* PDF Container (iframe) */}
              <div className="flex-1 w-full bg-black/25 rounded-2xl overflow-hidden mt-4 relative">
                {song.pdf ? (
                  <iframe
                    src={`${song.pdf}#toolbar=0&navpanes=0`}
                    className="w-full h-full border-none transition-transform duration-300"
                    style={{
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'top center',
                      filter: isNightMode ? 'invert(90%) hue-rotate(180deg)' : 'none'
                    }}
                    title={`${song.title} PDF Document`}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 text-[#8a7258]">
                    <span className="text-4xl block mb-2" aria-hidden="true">📄</span>
                    <p className="text-xs">No PDF uploaded for this track. Use the synced lyrics panel on the left to follow along.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

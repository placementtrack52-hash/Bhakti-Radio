'use client';

import Image from 'next/image';
import { useRadio } from '@/hooks/useRadio';
import FullPlayer from '@/components/player/FullPlayer';
import BackgroundManager from '@/components/shared/BackgroundManager';

export default function RadioPage() {
  const {
    activeStation,
    pendingStation,
    upcomingQueue,
    allStations,
    currentSong,
    selectStation,
    isPlaying,
    togglePlay,
  } = useRadio();

  return (
    <div className="min-h-screen relative overflow-hidden text-[#F5E6C0]">
      {/* Background Manager connected to active station theme */}
      <BackgroundManager overlay />

      {/* Header padding */}
      <div className="pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        
        {/* Scheduled stations selector */}
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-[#d4a843] mb-4 text-center md:text-left">
            Radio Stations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {allStations.map((station) => {
              const isActive = activeStation.id === station.id;
              const isPending = pendingStation?.id === station.id;

              return (
                <button
                  key={station.id}
                  id={`station-select-${station.id}`}
                  onClick={() => selectStation(station)}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-br from-[rgba(255,107,0,0.15)] to-[rgba(212,168,67,0.1)] border border-[#d4a843] shadow-[0_0_15px_rgba(212,168,67,0.15)]'
                      : 'glass hover:bg-white/5 border-transparent'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform" aria-hidden="true">
                    {station.icon}
                  </span>
                  <p className="text-sm font-semibold text-white truncate">{station.name}</p>
                  <p className="text-xs text-[#8a7258] mt-1">{station.start} - {station.end}</p>
                  {isActive && (
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#ff6b00] px-2 py-0.5 rounded-full bg-[#ff6b00]/10">
                      Active
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-[#d4a843] px-2 py-0.5 rounded-full bg-[#d4a843]/10 animate-pulse">
                      Pending Switch
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Interactive Audio Player card */}
          <div className="lg:w-[420px] flex-shrink-0">
            <div className="glass-gold rounded-3xl p-6 relative overflow-hidden">
              <div className="pb-4 border-b border-[rgba(212,168,67,0.1)] mb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#d4a843] uppercase tracking-widest font-semibold">
                    Station Stream
                  </span>
                  <h3 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-white">
                    {activeStation.name}
                  </h3>
                </div>
                <span className="text-3xl" aria-hidden="true">{activeStation.icon}</span>
              </div>

              {pendingStation && (
                <div className="mb-4 bg-[#d4a843]/10 border border-[#d4a843]/30 rounded-xl p-3 text-xs text-[#d4a843] leading-relaxed">
                  📢 The station will automatically switch to <strong>{pendingStation.name}</strong> as soon as the current song ends.
                </div>
              )}

              <FullPlayer />
            </div>
          </div>

          {/* Right: Upcoming Station Queue & Metadata */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <span className="text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase">
                Devotional Stream
              </span>
              <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white mt-1">
                Upcoming Queue
              </h2>
              <p className="text-xs text-[#8a7258] mt-1">
                Continuous audio continuity is active. Below is the upcoming tracklist for this station:
              </p>
            </div>

            <div className="glass rounded-3xl p-6">
              {upcomingQueue.length === 0 ? (
                <p className="text-sm text-[#8a7258] text-center py-10">No upcoming songs scheduled in queue.</p>
              ) : (
                <div className="space-y-3" role="list" aria-label="Upcoming tracks">
                  {upcomingQueue.map((song, index) => (
                    <div
                      key={song.id}
                      role="listitem"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 border border-transparent"
                    >
                      <span className="text-xs text-[#8a7258] w-6 text-center">{index + 1}</span>
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={song.cover}
                          alt={`${song.title} cover art`}
                          fill
                          sizes="40px"
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/default-cover.webp';
                          }}
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-white truncate">{song.title}</h4>
                        <p className="text-xs text-[#8a7258] truncate">{song.artist}</p>
                      </div>
                      <span className="text-xs text-[#d4a843] bg-[#d4a843]/10 px-2 py-0.5 rounded-full uppercase text-[10px]">
                        {song.station}
                      </span>
                      <span className="text-xs text-[#8a7258]">{song.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

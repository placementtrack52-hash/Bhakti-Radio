'use client';

import React from 'react';
import { useRadio } from '@/hooks/useRadio';
import { useSleepTimer } from '@/hooks/useSleepTimer';
import SleepTimer from '@/components/SleepTimer';

export default function DevotionalSidebarRight() {
  const { activeStation, pendingStation, selectStation, allStations, isPlaying } = useRadio();
  const { timerState } = useSleepTimer();
  const isTimerActive = timerState.isActive;
  const minutesRemaining = Math.ceil(timerState.remainingSeconds / 60);

  return (
    <div className="space-y-6">
      {/* 📻 Station Mode Selector */}
      <div className="glass-gold border border-[rgba(212,168,67,0.25)] rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-sm tracking-wider flex items-center gap-2">
            <span>📻</span> Live Stations
          </h3>
          <span className="text-[10px] bg-[#D4A843]/20 text-[#D4A843] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            {allStations.length} Channels
          </span>
        </div>

        <div className="space-y-2">
          {allStations.map((station) => {
            const isSelected = activeStation.id === station.id;
            const isPending = pendingStation?.id === station.id;

            return (
              <button
                key={station.id}
                onClick={() => selectStation(station)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? 'glass-gold border-[#D4A843] shadow-[0_0_15px_rgba(212,168,67,0.2)] bg-[#D4A843]/15'
                    : 'glass border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl group-hover:scale-110 transition-transform" aria-hidden="true">
                    {station.icon}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-[#C8A870]'}`}>
                      {station.name}
                    </p>
                    <p className="text-[10px] text-[#8A7258] truncate">
                      {station.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                  {isSelected && isPlaying && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
                    </span>
                  )}
                  {isPending && (
                    <span className="text-[9px] bg-[#FF6B00] text-white px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse">
                      Pending
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌙 Sleep Timer Quick Panel */}
      <div className="glass border border-white/10 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-sm tracking-wider flex items-center gap-2">
            <span>🌙</span> Sleep Timer
          </h3>
          {isTimerActive && (
            <span className="text-xs text-[#FF8C38] font-mono font-bold animate-pulse">
              ⏱️ {minutesRemaining}m left
            </span>
          )}
        </div>
        <p className="text-xs text-[#A0896A] mb-3">
          Set a peaceful auto-stop timer for meditation or sleep.
        </p>
        <div className="flex items-center justify-center">
          <SleepTimer />
        </div>
      </div>

      {/* 🎵 Live Devotional Visualizer */}
      <div className="glass border border-[#D4A843]/20 rounded-2xl p-4 text-center relative overflow-hidden">
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4A843] mb-2">
          Devotional Atmosphere
        </p>
        <div className="flex items-center justify-center gap-1.5 h-8 my-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t from-[#FF6B00] to-[#D4A843] ${
                isPlaying ? 'animate-waveform' : 'h-2 opacity-40'
              }`}
              style={{
                height: isPlaying ? `${8 + (i % 5) * 4}px` : '6px',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
        <p className="text-[10px] text-[#8A7258]">
          {isPlaying ? 'Sacred frequency active' : 'Ready to stream'}
        </p>
      </div>
    </div>
  );
}

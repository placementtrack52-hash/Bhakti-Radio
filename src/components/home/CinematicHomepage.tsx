'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import DailySchedule from '@/components/home/DailySchedule';
import DevotionalSidebarRight from '@/components/home/DevotionalSidebarRight';
import NowPlayingSection from '@/components/home/NowPlayingSection';
import BackgroundManager from '@/components/shared/BackgroundManager';

export default function CinematicHomepage() {
  const [activeBottomSheet, setActiveBottomSheet] = useState<'schedule' | 'controls' | null>(null);

  return (
    <div className="relative min-h-screen text-[#F5E6C0] overflow-x-hidden pt-16 pb-28">
      {/* 🌌 Sacred Panoramic Background Scene */}
      <BackgroundManager deityOverride="cinematic" overlay={false} />

      {/* 🏛️ Main Panoramic 3-Column Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 relative z-10">
        
        {/* Desktop & Tablet 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 📅 LEFT SIDEBAR (Desktop lg:col-span-3, Hidden on Mobile/Tablet in favor of bottom sheet) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="glass-gold border border-[rgba(212,168,67,0.25)] rounded-2xl p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-sm tracking-wider flex items-center gap-2">
                  <span>📅</span> Today's Schedule
                </h3>
                <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF8C38] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#FF6B00]/30">
                  IST (Kolkata)
                </span>
              </div>
              <DailySchedule compact />
            </div>
          </aside>

          {/* 🪔 CENTER HERO & NOW PLAYING (Desktop lg:col-span-6) */}
          <main className="col-span-1 lg:col-span-6 space-y-8">
            {/* Center Hero Integrated into Background */}
            <div className="glass-gold border border-[rgba(212,168,67,0.2)] rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-md text-center relative overflow-hidden">
              <HeroSection embedded />
            </div>

            {/* Now Playing Live Card */}
            <div className="glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
              <NowPlayingSection />
            </div>
          </main>

          {/* 🎛️ RIGHT SIDEBAR (Desktop lg:col-span-3, Hidden on Mobile/Tablet in favor of bottom sheet) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="glass-dark border border-[rgba(212,168,67,0.2)] rounded-2xl p-5 shadow-2xl backdrop-blur-md">
              <DevotionalSidebarRight />
            </div>
          </aside>

        </div>
      </div>

      {/* 📱 MOBILE FLOATING SIDEBAR DRAWER TOGGLE BUTTONS (Visible on Mobile & Tablet < lg) */}
      <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-full glass-dark border border-[#D4A843]/40 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setActiveBottomSheet(activeBottomSheet === 'schedule' ? null : 'schedule')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeBottomSheet === 'schedule'
              ? 'bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white shadow-lg'
              : 'text-[#D4A843] hover:text-white'
          }`}
          aria-label="Toggle Today's Schedule bottom sheet"
        >
          <span>📅</span> Schedule
        </button>
        <span className="w-px h-4 bg-white/20" />
        <button
          onClick={() => setActiveBottomSheet(activeBottomSheet === 'controls' ? null : 'controls')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeBottomSheet === 'controls'
              ? 'bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white shadow-lg'
              : 'text-[#D4A843] hover:text-white'
          }`}
          aria-label="Toggle Controls bottom sheet"
        >
          <span>🎛️</span> Controls
        </button>
      </div>

      {/* 📜 MOBILE BOTTOM SHEET DRAWERS (< lg) */}
      {activeBottomSheet && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in-up">
          {/* Backdrop Click to Close */}
          <div
            className="flex-1"
            onClick={() => setActiveBottomSheet(null)}
            aria-label="Close bottom sheet"
          />

          {/* Bottom Sheet Drawer Content */}
          <div className="glass-dark border-t border-[rgba(212,168,67,0.4)] rounded-t-3xl p-6 max-h-[75vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-base flex items-center gap-2">
                {activeBottomSheet === 'schedule' ? '📅 Today\'s Devotional Schedule' : '🎛️ Sacred Controls & Stations'}
              </h3>
              <button
                onClick={() => setActiveBottomSheet(null)}
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-[#D4A843] hover:text-white"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>

            {activeBottomSheet === 'schedule' ? (
              <DailySchedule compact />
            ) : (
              <DevotionalSidebarRight />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

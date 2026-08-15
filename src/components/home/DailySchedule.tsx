'use client';

import { useEffect, useState, useRef } from 'react';
import scheduleData from '@/data/schedule.json';

interface ScheduleItem {
  id: number;
  name: string;
  icon: string;
  start: string; // "HH:MM"
  end: string;   // "HH:MM"
  description?: string;
}

// Convert "HH:MM" to minutes from midnight
function toMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Check if a time is within range, handles overnight ranges (e.g. 21:00 to 05:00)
function isTimeInProgram(nowMinutes: number, startStr: string, endStr: string): boolean {
  const start = toMinutes(startStr);
  const end = toMinutes(endStr);

  if (start < end) {
    return nowMinutes >= start && nowMinutes < end;
  } else {
    // Over midnight (e.g. 21:00 to 05:00)
    return nowMinutes >= start || nowMinutes < end;
  }
}

// Format "HH:MM" to "HH:MM AM/PM"
function formatAMPM(timeStr: string): string {
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // hour '0' should be '12'
  return `${h}:${mStr} ${ampm}`;
}

export default function DailySchedule() {
  const [currentTimeKolkata, setCurrentTimeKolkata] = useState<Date | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      // Calculate current date/time in Asia/Kolkata
      const now = new Date();
      const kolkataTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      setCurrentTimeKolkata(new Date(kolkataTimeStr));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (!currentTimeKolkata) {
    return (
      <section className="py-12 px-4" aria-label="Daily schedule loading">
        <div className="max-w-6xl mx-auto text-center">
          <div className="shimmer h-48 rounded-2xl w-full" />
        </div>
      </section>
    );
  }

  const currentMinutes = currentTimeKolkata.getHours() * 60 + currentTimeKolkata.getMinutes();

  // Find active program
  const activeProgramIndex = scheduleData.findIndex((item) =>
    isTimeInProgram(currentMinutes, item.start, item.end)
  );

  const activeProgram = activeProgramIndex !== -1 ? scheduleData[activeProgramIndex] : null;

  // Next program index
  const nextProgramIndex = activeProgramIndex !== -1 ? (activeProgramIndex + 1) % scheduleData.length : 0;
  const nextProgram = scheduleData[nextProgramIndex];

  // Calculate remaining time for the next program
  let minutesToNext = 0;
  if (activeProgram) {
    const activeEndMinutes = toMinutes(activeProgram.end);
    if (currentMinutes < activeEndMinutes) {
      minutesToNext = activeEndMinutes - currentMinutes;
    } else {
      // Overnight or wraps around
      minutesToNext = (1440 - currentMinutes) + activeEndMinutes;
      if (minutesToNext > 1440) minutesToNext -= 1440;
    }
  }

  // Auto scroll active card to view on mobile/tablet horizontal scroll
  const scrollActiveIntoView = () => {
    if (scrollContainerRef.current && activeProgramIndex !== -1) {
      const container = scrollContainerRef.current;
      const activeCard = container.children[activeProgramIndex] as HTMLElement;
      if (activeCard) {
        const containerWidth = container.clientWidth;
        const cardWidth = activeCard.clientWidth;
        const cardLeft = activeCard.offsetLeft;
        const scrollTarget = cardLeft - containerWidth / 2 + cardWidth / 2;
        container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className="py-16 px-4 relative max-w-7xl mx-auto"
      aria-label="Today's Devotional Schedule"
      role="region"
      id="schedule"
    >
      {/* Sacred Time Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase mb-2">
          <span className="w-4 h-px bg-[#d4a843]" />
          Today's Schedule
          <span className="w-4 h-px bg-[#d4a843]" />
        </div>
        <h2 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-gradient-gold">
          Daily Devotional Program
        </h2>
        <p className="text-[#8a7258] mt-2 text-xs">
          Synchronized to Indian Standard Time (IST) • Asia/Kolkata
        </p>
      </div>

      {/* Hero Active / Upcoming display */}
      {activeProgram && (
        <div className="max-w-3xl mx-auto mb-10 glass-gold border border-[rgba(212,168,67,0.3)] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#ff6b00] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Live Now
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl animate-float" aria-hidden="true">
                {activeProgram.icon}
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff8c38]">
                  Current Station Program
                </span>
                <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-white mt-0.5">
                  {activeProgram.name}
                </h3>
                <p className="text-xs text-[#a0896a] mt-1 font-semibold">
                  ⏱️ {formatAMPM(activeProgram.start)} → {formatAMPM(activeProgram.end)}
                </p>
              </div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8a7258]">
                Up Next Program
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl" aria-hidden="true">{nextProgram.icon}</span>
                <span className="text-sm font-bold text-white">{nextProgram.name}</span>
              </div>
              <p className="text-xs text-[#d4a843] font-semibold mt-1">
                Starts in {minutesToNext} minutes ({formatAMPM(nextProgram.start)})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Swipeable Cards on Mobile, flex layout on Desktop */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-x-visible md:pb-0"
          role="list"
        >
          {scheduleData.map((item, idx) => {
            const isLive = idx === activeProgramIndex;
            return (
              <div
                key={item.id}
                role="listitem"
                className={`min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center rounded-2xl p-5 border transition-all duration-300 flex-1 flex flex-col justify-between ${
                  isLive
                    ? 'glass-gold border-[#d4a843] shadow-[0_0_25px_rgba(212,168,67,0.15)] ring-1 ring-[#d4a843]/50 scale-[1.02] md:scale-100'
                    : 'glass border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl" aria-hidden="true">{item.icon}</span>
                    {isLive ? (
                      <span className="bg-[#ff6b00]/20 text-[#ff8c38] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-[#ff6b00]/30 tracking-wider">
                        Live Now
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#8a7258]">
                        Program {idx + 1}
                      </span>
                    )}
                  </div>

                  <h4 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#a0896a] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-bold text-[#d4a843]">
                    {formatAMPM(item.start)} - {formatAMPM(item.end)}
                  </span>
                  {isLive && (
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b00] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff6b00]"></span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll helper indicators for Mobile */}
        <div className="flex md:hidden justify-center gap-1.5 mt-2">
          {scheduleData.map((_, idx) => (
            <button
              key={idx}
              onClick={scrollActiveIntoView}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeProgramIndex ? 'bg-[#d4a843] w-4' : 'bg-white/20'
              }`}
              aria-label={`Scroll to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useSleepTimer } from '@/hooks/useSleepTimer';
import { formatCountdown } from '@/utils/timer';

const OPTIONS = [
  { label: 'Off', seconds: 0 },
  { label: '15 Min', seconds: 15 * 60 },
  { label: '30 Min', seconds: 30 * 60 },
  { label: '60 Min', seconds: 60 * 60 },
  { label: 'End of Song', seconds: -1 },
];

export default function SleepTimerControl() {
  const { timerState, setTimer, cancelTimer } = useSleepTimer();
  const [open, setOpen] = useState(false);

  const active = timerState.isActive;

  const handleSelect = (seconds: number) => {
    if (seconds === 0) {
      cancelTimer();
    } else if (seconds === -1) {
      setTimer('endOfSong', 0);
    } else {
      setTimer('preset', seconds);
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="sleep-timer-btn"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
          active
            ? 'bg-[#d4a843]/20 border-[#d4a843] text-[#d4a843]'
            : 'bg-white/5 border-white/10 text-[#8a7258] hover:text-white'
        }`}
        aria-label="Sleep timer settings"
      >
        🌙 {active ? (timerState.mode === 'endOfSong' ? 'End of Song' : formatCountdown(timerState.remainingSeconds)) : 'Sleep'}
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 right-0 glass-gold border border-[rgba(212,168,67,0.3)] rounded-2xl p-3 w-44 shadow-2xl z-50">
          <p className="text-[10px] text-[#8a7258] uppercase font-bold tracking-widest mb-2">Sleep Timer</p>
          {OPTIONS.map(opt => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.seconds)}
              className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all ${
                (opt.seconds === 0 && !active) ||
                (opt.seconds === -1 && active && timerState.mode === 'endOfSong') ||
                (opt.seconds > 0 && active && timerState.targetSeconds === opt.seconds)
                  ? 'bg-[#d4a843]/20 text-white font-bold'
                  : 'hover:bg-white/5 text-[#a0896a]'
              }`}
            >
              {opt.label === 'Off' ? '⭕ Off' : `🌙 ${opt.label}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

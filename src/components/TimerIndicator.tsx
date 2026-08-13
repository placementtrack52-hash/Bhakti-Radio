'use client';

import { useSleepTimer } from '@/hooks/useSleepTimer';
import { formatCountdown } from '@/utils/timer';

export default function TimerIndicator() {
  const { timerState } = useSleepTimer();

  if (!timerState.isActive) return null;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff6b00]/10 border border-[#ff6b00]/25 rounded-full text-xs text-[#ff8c38] font-bold tracking-wide animate-pulse"
      role="timer"
      aria-live="polite"
    >
      <span aria-hidden="true">😴</span>
      <span>
        {timerState.mode === 'endOfSong'
          ? 'End of song'
          : `Sleep in ${formatCountdown(timerState.remainingSeconds)}`}
      </span>
    </div>
  );
}

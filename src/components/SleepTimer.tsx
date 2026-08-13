'use client';

import { useState } from 'react';
import { usePlayer } from '@/hooks/usePlayer';
import TimerDialog from './TimerDialog';
import TimerIndicator from './TimerIndicator';

export default function SleepTimer() {
  const { currentSong } = usePlayer();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* Visual countdown indicator */}
        <TimerIndicator />

        {/* Action button */}
        <button
          id="sleep-timer-trigger"
          disabled={!currentSong}
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center p-2 bg-white/5 border border-white/10 hover:border-[#d4a843]/45 rounded-full hover:bg-[#d4a843]/10 text-white font-bold transition-all disabled:opacity-40 disabled:pointer-events-none min-w-[48px] min-h-[48px]"
          aria-label="Set sleep timer"
        >
          😴
        </button>
      </div>

      {isOpen && <TimerDialog onClose={() => setIsOpen(false)} />}
    </div>
  );
}

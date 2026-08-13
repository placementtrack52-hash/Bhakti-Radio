'use client';

import { useState } from 'react';
import { useSleepTimer } from '@/hooks/useSleepTimer';
import { usePlayer } from '@/hooks/usePlayer';

interface TimerDialogProps {
  onClose: () => void;
}

const PRESETS = [
  { label: '15 Minutes', seconds: 15 * 60 },
  { label: '30 Minutes', seconds: 30 * 60 },
  { label: '45 Minutes', seconds: 45 * 60 },
  { label: '1 Hour', seconds: 60 * 60 },
  { label: '90 Minutes', seconds: 90 * 60 },
];

export default function TimerDialog({ onClose }: TimerDialogProps) {
  const { timerState, setTimer, cancelTimer } = useSleepTimer();
  const { currentSong } = usePlayer();
  const [customValue, setCustomValue] = useState('');
  const [customError, setCustomError] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minutes = parseInt(customValue, 10);
    if (isNaN(minutes) || minutes <= 0 || minutes > 480) {
      setCustomError('Enter minutes between 1 and 480.');
      return;
    }
    setTimer('custom', minutes * 60);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="timer-dialog-title"
    >
      <div className="glass-gold border border-[rgba(212,168,67,0.35)] rounded-t-3xl sm:rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
          <h3
            id="timer-dialog-title"
            className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-gradient-gold flex items-center gap-2"
          >
            😴 Sleep Timer
          </h3>
          <button
            onClick={onClose}
            className="text-[#8a7258] hover:text-white transition-colors p-1"
            aria-label="Close sleep timer options"
          >
            ✕
          </button>
        </div>

        {/* Status */}
        {timerState.isActive && (
          <div className="bg-[#ff6b00]/10 border border-[#ff6b00]/25 rounded-2xl p-3 text-center">
            <p className="text-xs text-[#ff8c38] font-bold">Sleep Timer is Active</p>
            <button
              onClick={() => { cancelTimer(); onClose(); }}
              className="mt-2 text-xs text-white bg-red-500/20 border border-red-500/30 hover:bg-red-500/40 px-4 py-1.5 rounded-full font-bold transition-all"
            >
              Cancel Timer
            </button>
          </div>
        )}

        {/* Presets */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#8a7258] mb-1">
            Choose duration
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.seconds}
                onClick={() => { setTimer('preset', preset.seconds); onClose(); }}
                className="py-3 px-4 rounded-xl border border-white/5 hover:border-[#d4a843]/45 bg-white/5 hover:bg-[#d4a843]/10 text-xs font-semibold text-white transition-all text-center min-h-[48px] flex items-center justify-center"
              >
                {preset.label}
              </button>
            ))}
            
            {/* End of Song Mode */}
            <button
              disabled={!currentSong}
              onClick={() => { setTimer('endOfSong', 0); onClose(); }}
              className="col-span-2 py-3 px-4 rounded-xl border border-white/5 hover:border-[#d4a843]/45 bg-white/5 hover:bg-[#d4a843]/10 text-xs font-semibold text-white transition-all disabled:opacity-40 disabled:pointer-events-none text-center min-h-[48px] flex items-center justify-center gap-1.5"
            >
              🎵 End of Current Song
            </button>
          </div>
        </div>

        {/* Custom Timer Input */}
        <form onSubmit={handleCustomSubmit} className="space-y-2 pt-2 border-t border-white/5">
          <label htmlFor="custom-mins" className="text-[10px] uppercase font-bold tracking-widest text-[#8a7258]">
            Custom minutes
          </label>
          <div className="flex gap-2">
            <input
              id="custom-mins"
              type="number"
              placeholder="e.g. 25"
              value={customValue}
              onChange={(e) => { setCustomValue(e.target.value); setCustomError(''); }}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#d4a843] transition-colors"
              min="1"
              max="480"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Set
            </button>
          </div>
          {customError && (
            <p className="text-[11px] text-red-400 font-semibold">{customError}</p>
          )}
        </form>
      </div>
    </div>
  );
}

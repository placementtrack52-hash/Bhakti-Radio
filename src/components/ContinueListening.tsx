'use client';

import { useResume } from '@/hooks/useResume';
import ResumeDialog from './ResumeDialog';

export default function ContinueListening() {
  const {
    savedSession,
    isSongUnavailable,
    resume,
    startOver,
    playAlternative,
  } = useResume();

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Render unavailable dialog if song doesn't exist
  if (isSongUnavailable) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        role="alertdialog"
        aria-labelledby="err-title"
      >
        <div className="glass-gold border border-red-500/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
          <div className="text-3xl" aria-hidden="true">⚠️</div>
          <h2 id="err-title" className="text-base font-bold text-white">This song is unavailable.</h2>
          <p className="text-xs text-[#8a7258]">
            The song you were listening to could not be found in the current devotional library library.
          </p>
          <button
            onClick={playAlternative}
            className="w-full py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white rounded-full text-xs font-bold"
          >
            Play another song
          </button>
        </div>
      </div>
    );
  }

  // Render normal Resume Dialogue prompt
  if (savedSession) {
    return (
      <ResumeDialog
        songTitle={savedSession.song.title}
        currentTimeStr={formatTime(savedSession.state.currentTime)}
        onResume={resume}
        onStartOver={startOver}
      />
    );
  }

  return null;
}

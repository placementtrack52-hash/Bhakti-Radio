'use client';

interface ResumeDialogProps {
  songTitle: string;
  currentTimeStr: string;
  onResume: () => void;
  onStartOver: () => void;
}

export default function ResumeDialog({
  songTitle,
  currentTimeStr,
  onResume,
  onStartOver,
}: ResumeDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-dialog-title"
    >
      <div className="glass-gold border border-[rgba(212,168,67,0.4)] rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-6">
        <div className="text-4xl animate-float" aria-hidden="true">
          🪔
        </div>
        
        <div className="space-y-2">
          <h2
            id="resume-dialog-title"
            className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-gradient-gold"
          >
            Continue listening?
          </h2>
          <p className="text-sm font-bold text-white truncate px-2">
            🎵 {songTitle}
          </p>
          <p className="text-xs text-[#a0896a]">
            Resume from {currentTimeStr}?
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            id="resume-dialog-confirm"
            onClick={onResume}
            className="w-full py-3 bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white rounded-full text-sm font-extrabold shadow-lg hover:scale-[1.02] transition-transform active:scale-[0.98]"
          >
            Resume Playback
          </button>
          <button
            onClick={onStartOver}
            className="w-full py-3 bg-white/5 border border-white/10 text-[#8a7258] hover:text-white rounded-full text-sm font-semibold transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}

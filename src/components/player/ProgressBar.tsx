'use client';

interface ProgressBarProps {
  progress: number;
  duration: number;
  onSeek: (time: number) => void;
  formatTime: (seconds: number) => string;
  className?: string;
  mini?: boolean;
}

export default function ProgressBar({
  progress,
  duration,
  onSeek,
  formatTime,
  className = '',
  mini = false,
}: ProgressBarProps) {
  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  if (mini) {
    return (
      <div className={`w-full ${className}`}>
        <input
          id="mini-progress-slider"
          type="range"
          min={0}
          max={duration || 100}
          step={0.5}
          value={progress}
          onChange={handleChange}
          className="player-progress w-full"
          style={{ '--progress': `${percent}%` } as React.CSSProperties}
          aria-label="Song progress"
          aria-valuemin={0}
          aria-valuemax={duration || 100}
          aria-valuenow={Math.round(progress)}
          aria-valuetext={`${formatTime(progress)} of ${formatTime(duration)}`}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <input
        id="full-progress-slider"
        type="range"
        min={0}
        max={duration || 100}
        step={0.5}
        value={progress}
        onChange={handleChange}
        className="player-progress w-full"
        style={{ '--progress': `${percent}%` } as React.CSSProperties}
        aria-label="Song progress"
        aria-valuemin={0}
        aria-valuemax={duration || 100}
        aria-valuenow={Math.round(progress)}
        aria-valuetext={`${formatTime(progress)} of ${formatTime(duration)}`}
      />
      <div className="flex justify-between mt-1 text-xs text-[#8a7258]">
        <span aria-label="Current time">{formatTime(progress)}</span>
        <span aria-label="Total duration">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

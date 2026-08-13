export function SongCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-full aspect-square shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-3 rounded shimmer w-3/4" />
        <div className="h-2.5 rounded shimmer w-1/2" />
      </div>
    </div>
  );
}

export function SongListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
          <div className="w-10 h-10 rounded-lg shimmer flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 rounded shimmer w-3/4" />
            <div className="h-2.5 rounded shimmer w-1/2" />
          </div>
          <div className="h-2.5 w-10 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton({ variant = 'grid', count = 6 }: { variant?: 'grid' | 'list'; count?: number }) {
  if (variant === 'list') return <SongListSkeleton count={count} />;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <SongCardSkeleton key={i} />
      ))}
    </div>
  );
}

'use client';
// This is a minimal client wrapper to include the ContinueListeningBanner
// without making the entire homepage a Client Component.
import ContinueListeningBanner from '@/components/shared/ContinueListeningBanner';

export default function HomepageClientSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
      <ContinueListeningBanner />
    </div>
  );
}

import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import NowPlayingSection from '@/components/home/NowPlayingSection';

export const metadata: Metadata = {
  title: '🪔 Bhakti Radio — Sacred Devotional Music & Bhajans',
  description:
    'Stream sacred bhajans, mantras, and devotional music 24/7. Experience the divine through Hanuman Chalisa, Om Namah Shivaya, Gayatri Mantra, and more.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NowPlayingSection />
    </>
  );
}

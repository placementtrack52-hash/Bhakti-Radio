import type { Metadata } from 'next';
import { Cinzel, Inter, Noto_Serif } from 'next/font/google';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { TimerProvider } from '@/context/TimerContext';
import MiniPlayer from '@/components/player/MiniPlayer';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import AmbientSoundManager from '@/components/shared/AmbientSoundManager';
import MeditationMode from '@/components/shared/MeditationMode';
import PWAInstallPrompt from '@/components/shared/PWAInstallPrompt';
import ContinueListening from '@/components/ContinueListening';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '🪔 Bhakti Radio — Devotional Music & Bhajans',
  description:
    'Listen to sacred devotional music, bhajans, mantras, and spiritual chants. Experience divine peace through the timeless sounds of Indian devotional music.',
  keywords: [
    'bhajans',
    'devotional music',
    'mantras',
    'hanuman chalisa',
    'om namah shivaya',
    'gayatri mantra',
    'bhakti',
    'indian classical',
    'spiritual',
    'meditation music',
  ],
  openGraph: {
    title: 'Bhakti Radio — Discover Devotion, Listen in Peace',
    description:
      'Sacred devotional music streaming. Bhajans, mantras, and spiritual chants for your soul.',
    type: 'website',
  },
  manifest: '/manifest.json',
  themeColor: '#FF6B00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bhakti Radio" />
      </head>
      <body className="bg-[#0D0808] text-[#F5E6C0] antialiased overflow-x-hidden">
        <SettingsProvider>
          <TimerProvider>
            <ThemeProvider>
              <PlayerProvider>
                {/* Checkpoint Continue Listening resume popup */}
                <ContinueListening />
                {/* PWA install prompt (desktop only) */}
                <PWAInstallPrompt />
                {/* Meditation fullscreen overlay */}
                <MeditationMode />
                <Header />
                {/* main — extra bottom padding on mobile for bottom nav */}
                <main className="pb-[130px] md:pb-[80px]" role="main">
                  {children}
                </main>
                {/* Ambient looper button */}
                <AmbientSoundManager />
                {/* Persistent mini player */}
                <MiniPlayer />
                {/* Mobile bottom nav (hidden on md+) */}
                <BottomNav />
              </PlayerProvider>
            </ThemeProvider>
          </TimerProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

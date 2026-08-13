'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.warn);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  if (!deferredPrompt || dismissed) return null;

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-gold border border-[rgba(212,168,67,0.4)] rounded-2xl px-5 py-3 flex items-center gap-3 shadow-2xl text-sm"
      role="alert"
    >
      <span aria-hidden="true">🪔</span>
      <p className="text-white text-xs">Install Bhakti Radio as an app</p>
      <button
        id="pwa-install-btn"
        onClick={handleInstall}
        className="px-3 py-1 bg-gradient-to-r from-[#FF6B00] to-[#D4A843] text-white rounded-full text-xs font-bold"
      >
        Install
      </button>
      <button onClick={() => setDismissed(true)} className="text-[#8a7258] hover:text-white text-xs" aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}

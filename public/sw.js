// Bhakti Radio — Service Worker v1
const CACHE_NAME = 'bhakti-radio-v1';
const STATIC_ASSETS = [
  '/',
  '/radio',
  '/library',
  '/search',
  '/offline',
  '/images/default-cover.webp',
  '/manifest.json'
];

// On install: cache static shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// On activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch strategy: Cache-first for images and static, network-first for pages/audio
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET or cross-origin
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) return;

  // Images: cache-first
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, clone));
          return res;
        })
      )
    );
    return;
  }

  // Network-first for everything else
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

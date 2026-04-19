// public/sw.js
// ShopLite PWA – Service Worker
// ─────────────────────────────────────────────────────────────────
// Bump CACHE_NAME whenever you deploy a new build.
// The browser detects the change and triggers install → activate.
// ─────────────────────────────────────────────────────────────────

const CACHE_NAME = 'shoplite-v1';

// All assets to pre-cache during the install step.
// Add your real build output filenames here (CRA adds hashes).
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
];

// ── INSTALL ──────────────────────────────────────────────────────
// Open the cache and store all shell assets.
// waitUntil() keeps the SW in installing state until caching is done.
self.addEventListener('install', event => {
  console.log('[SW] Installing…');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching shell assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Skip waiting so the new SW activates immediately
        // instead of waiting for all old tabs to close.
        console.log('[SW] skipWaiting – will activate immediately');
        return self.skipWaiting();
      })
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────────
// Delete caches from old versions so stale assets don't linger.
// clients.claim() lets this SW control open tabs right away.
self.addEventListener('activate', event => {
  console.log('[SW] Activating…');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)   // keep only current
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming all clients');
        return self.clients.claim();  // take control of all tabs now
      })
  );
});

// ── FETCH ─────────────────────────────────────────────────────────
// Cache-First strategy:
//   1. Check the cache → return immediately if found.
//   2. If not cached, fetch from network.
//   3. Clone & store the network response for next time.
//
// API calls (/api/*) always go to the network (Network-First).
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (POST, PUT, DELETE, etc.)
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (analytics, CDN fonts, etc.)
  if (url.origin !== location.origin) return;

  // Network-First for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache-First for everything else (shell, static assets)
  event.respondWith(cacheFirst(request));
});

// ── Strategies ───────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }
  // Not in cache — fetch from network and store
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Offline fallback — return cached index.html for navigation
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    // No fallback available
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Offline — try cache as fallback
    const cached = await caches.match(request);
    return cached || new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ── PUSH NOTIFICATIONS (optional) ─────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'ShopLite';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: { url: data.url || '/' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// src/serviceWorkerRegistration.js
// ─────────────────────────────────────────────────────────────────
// Call register() from index.js to activate the PWA service worker.
// Fires onUpdate(registration) when a new version is waiting.
// Fires onSuccess(registration) when SW is activated and app is cached.
// ─────────────────────────────────────────────────────────────────

const SW_URL = `${process.env.PUBLIC_URL}/sw.js`;

export function register(config = {}) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[SW] Skipping registration in development mode');
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.warn('[SW] Service workers not supported in this browser');
    return;
  }

  window.addEventListener('load', () => {
    checkServiceWorker(config);
  });
}

async function checkServiceWorker(config) {
  try {
    const registration = await navigator.serviceWorker.register(SW_URL);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available — existing SW is still controlling
            console.log('[SW] New content available — will load on next reload');
            config.onUpdate?.(registration);
          } else {
            // First install — content is now cached for offline use
            console.log('[SW] Content cached for offline use');
            config.onSuccess?.(registration);
          }
        }
      };
    };

    console.log('[SW] Registered successfully:', registration.scope);
  } catch (error) {
    console.error('[SW] Registration failed:', error);
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => registration.unregister())
      .catch(error => console.error('[SW] Unregister error:', error));
  }
}

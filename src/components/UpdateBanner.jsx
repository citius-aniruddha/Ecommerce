// src/components/UpdateBanner.jsx
// ─────────────────────────────────────────────────────────────────
// Shows a banner at the bottom when a new service worker is waiting.
// User clicks "Reload" → sends SKIP_WAITING message → SW activates
// → page reloads with the latest version.
// ─────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { register } from '../serviceWorkerRegistration';

function UpdateBanner() {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [showBanner, setShowBanner]       = useState(false);
  const [showOffline, setShowOffline]     = useState(false);

  useEffect(() => {
    // Register the SW and listen for updates
    register({
      onUpdate: registration => {
        setWaitingWorker(registration.waiting);
        setShowBanner(true);
      },
      onSuccess: () => {
        console.log('[App] App is cached and ready for offline use');
      },
    });

    // Listen for online/offline status
    const handleOffline = () => setShowOffline(true);
    const handleOnline  = () => setShowOffline(false);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online',  handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online',  handleOnline);
    };
  }, []);

  // Tell the waiting SW to skip waiting and take control
  const handleReload = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    // Reload after the new SW activates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
    setShowBanner(false);
  };

  const bannerBase = {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      {/* Update available banner */}
      {showBanner && (
        <div style={{
          ...bannerBase,
          background: '#1a1a1a',
          color: '#fff',
        }}>
          <span>New version available</span>
          <button
            onClick={handleReload}
            style={{
              padding: '5px 12px',
              background: '#378ADD',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
          <button
            onClick={() => setShowBanner(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: 14,
              padding: '0 4px',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Offline indicator */}
      {showOffline && (
        <div style={{
          ...bannerBase,
          background: '#F59E0B',
          color: '#633806',
        }}>
          <span>You are offline — browsing cached content</span>
        </div>
      )}
    </>
  );
}

export default UpdateBanner;

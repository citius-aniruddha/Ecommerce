// src/index.js  ← replace your existing index.js with this
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add <UpdateBanner /> to App.jsx (see instructions below)
// Then register the SW here:
import { register } from './serviceWorkerRegistration';
register();   

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);

// ─── PWA Steps ───────────────────────────────────────────────────
// 1. Copy public/sw.js        →  your project's public/ folder
// 2. Copy serviceWorkerRegistration.js → your project's src/ folder
// 3. Copy UpdateBanner.jsx    →  src/components/
// 4. Add <UpdateBanner /> inside App.jsx (before the closing </div>)
// 5. Uncomment the two import/register lines above
// 6. Run: npm run build && npx serve -s build
//    (SW only runs in production build, not npm start)
// ─────────────────────────────────────────────────────────────────

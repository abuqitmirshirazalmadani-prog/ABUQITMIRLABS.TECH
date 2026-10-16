import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor.ts';

// Initialize Core Web Vitals performance tracking & local storage audit logger
initPerformanceMonitoring();

const container = document.getElementById('root')!;

if (container) {
  // Always use createRoot — never hydrateRoot.
  //
  // Reason: On non-homepage routes, the prerendered HTML inside #root is
  // hand-crafted static SEO markup (see vite.config.ts fallbackPrerenderHtml),
  // NOT the actual React render output. Hydrating against it causes a mismatch,
  // which breaks React's event system — dropdowns stop working, navigation
  // stops re-rendering, and the URL changes without the page updating.
  //
  // The static HTML still serves SEO crawlers in the raw HTML response.
  // Real users get a fresh React render immediately after.
  container.innerHTML = '';
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

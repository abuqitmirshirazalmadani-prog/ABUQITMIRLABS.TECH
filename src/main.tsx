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
  container.innerHTML = '';

  // Clean up SSR-rendered head tags marked with data-rh="true" and any pre-existing <title>
  // so client-side React 19 / React Helmet owns the single <title> element without duplicates
  const ssrHeadElements = document.querySelectorAll('head [data-rh="true"], head > title');
  ssrHeadElements.forEach(el => el.remove());

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

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

  // Clean up SSR-rendered head tags marked with data-rh="true" so client-side React Helmet
  // has exclusive control over <head> elements without creating duplicate DOM nodes
  const ssrHeadElements = document.querySelectorAll('head [data-rh="true"]');
  ssrHeadElements.forEach(el => el.remove());

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

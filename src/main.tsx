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

  // Remove any static <title> tag from <head> before mounting so that
  // only the dynamic React Helmet <title> is present in the DOM.
  const staticTitleElements = document.querySelectorAll('head > title');
  staticTitleElements.forEach((el) => el.remove());

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

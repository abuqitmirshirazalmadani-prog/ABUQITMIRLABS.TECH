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

  // Keep the primary <title> tag intact and only remove extra duplicate <title> tags if present
  const staticTitleElements = document.querySelectorAll('head > title');
  staticTitleElements.forEach((el, idx) => {
    if (idx > 0) el.remove();
  });

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

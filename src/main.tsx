import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor.ts';

// Guard React 19 DOM operations (e.g., Hoistable <head> tags & Helmet nodes) against NotFoundError during route transitions
if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child && child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return this.appendChild(newNode) as T;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

// Initialize Core Web Vitals performance tracking & local storage audit logger
initPerformanceMonitoring();

const container = document.getElementById('root')!;

if (container) {
  // Always use createRoot — never hydrateRoot.
  container.innerHTML = '';

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

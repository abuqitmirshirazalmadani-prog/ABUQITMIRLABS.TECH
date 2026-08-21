import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

if (container) {
  const renderedRoute = container.getAttribute('data-rendered-route');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const isMatchingRoute = Boolean(
    renderedRoute && (renderedRoute.replace(/\/$/, '') || '/') === currentPath
  );

  // Hydrate only if the pre-rendered HTML on the page strictly matches the current client route
  if (isMatchingRoute && container.hasChildNodes() && container.children.length > 0) {
    try {
      hydrateRoot(
        container,
        <StrictMode>
          <App />
        </StrictMode>,
        {
          onRecoverableError(error, errorInfo) {
            console.warn('[Hydration Notice]:', error, errorInfo);
          },
        }
      );
    } catch (e) {
      console.warn('[Hydration Fallback]: Mounting fresh root', e);
      container.innerHTML = '';
      createRoot(container).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    }
  } else {
    // If the route doesn't match the pre-rendered route or is a dynamic fallback, clear and mount cleanly
    container.innerHTML = '';
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}


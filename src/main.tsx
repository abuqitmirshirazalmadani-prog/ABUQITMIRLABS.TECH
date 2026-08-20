import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

// If server/pre-rendered HTML nodes exist inside #root, hydrate in-place to avoid visual DOM destroy & rebuild flash
if (container && container.hasChildNodes() && container.children.length > 0) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}


import { lazy, ComponentType } from 'react';

export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch(async (error) => {
      // Retry once after a short delay for transient network/Vite dev hiccups
      try {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return await factory();
      } catch (retryError) {
        const key = 'chunk-reload-ts';
        const last = sessionStorage.getItem(key);
        const now = Date.now();

        if (!last || now - parseInt(last, 10) > 10000) {
          sessionStorage.setItem(key, String(now));
          window.location.reload();
        }
        throw retryError || error;
      }
    })
  );
}

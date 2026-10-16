import { lazy, ComponentType } from 'react';

export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch((error) => {
      const key = 'chunk-reload-ts';
      const last = sessionStorage.getItem(key);
      const now = Date.now();

      // 10-second guard — infinite reload loop se bachne ke liye
      if (!last || now - parseInt(last) > 10000) {
        sessionStorage.setItem(key, String(now));
        window.location.reload();
        // Never-resolving promise: React ko render rok do jab tak reload na ho
        return new Promise<never>(() => {});
      }
      throw error;
    })
  );
}

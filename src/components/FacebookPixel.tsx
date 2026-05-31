import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    // Get the Pixel ID from environment variables, or fallback to a placeholder
    const rawPixelId = (import.meta as any).env?.VITE_FACEBOOK_PIXEL_ID;
    const isMock = !rawPixelId || rawPixelId === 'YOUR_FACEBOOK_PIXEL_ID';
    const pixelId = isMock ? '61583768706452' : rawPixelId;

    if (isMock) {
      console.log(
        `%c[Meta Pixel]%c Dynamic initialization using development fallback ID: ${pixelId}. Set VITE_FACEBOOK_PIXEL_ID in your environment to override.`,
        'color: #3b5998; font-weight: bold;',
        'color: inherit;'
      );
    }

    // Initialize Facebook Pixel if not already initialized
    if (!window.fbq) {
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
    }

    // Connect pixel ID to instance
    if (window.fbq) {
      window.fbq('init', pixelId);
    }
  }, []);

  // Track standard "PageView" on every route/location transition
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return null;
}

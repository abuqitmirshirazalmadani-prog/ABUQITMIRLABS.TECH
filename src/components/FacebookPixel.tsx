import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  evaluateAnalyticsBlockReason,
  isSuspiciousFacebookBotReferral,
  waitForVerifiedHumanEngagement,
} from '../utils/analyticsShield';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    // Do not load or fire Meta Pixel for Admin, Internal Team, Tag Assistant, or Spam/Bot traffic
    if (evaluateAnalyticsBlockReason(window.location.pathname)) {
      return;
    }

    const rawPixelId = (import.meta as any).env?.VITE_FACEBOOK_PIXEL_ID;
    const isMock = !rawPixelId || rawPixelId === 'YOUR_FACEBOOK_PIXEL_ID';
    const pixelId = isMock ? '61583768706452' : rawPixelId;

    const initPixel = async () => {
      if (evaluateAnalyticsBlockReason(window.location.pathname)) {
        return;
      }
      if (isSuspiciousFacebookBotReferral()) {
        const isHuman = await waitForVerifiedHumanEngagement(15000);
        if (!isHuman) return;
      }
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
          if (s && s.parentNode) {
            s.parentNode.insertBefore(t, s);
          } else if (b.head) {
            b.head.appendChild(t);
          }
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        /* eslint-enable */
      }

      if (window.fbq) {
        window.fbq('init', pixelId);
        window.fbq('track', 'PageView');
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setTimeout(initPixel, 1200);
      }, { timeout: 3000 });
    } else {
      setTimeout(initPixel, 1800);
    }
  }, []);

  useEffect(() => {
    if (evaluateAnalyticsBlockReason(location.pathname)) {
      return;
    }
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return null;
}

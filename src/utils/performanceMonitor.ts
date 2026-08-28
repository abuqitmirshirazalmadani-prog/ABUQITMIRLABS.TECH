/**
 * Core Web Vitals & Performance Monitoring Snippet
 * AbuQitmirLabs Internal Auditing & Telemetry
 * 
 * Tracks LCP, CLS, INP, FID, FCP, and TTFB via native browser PerformanceObserver APIs
 * and records metrics to a lightweight local storage logger for inspection and auditing.
 */

export type MetricName = 'LCP' | 'CLS' | 'INP' | 'FID' | 'FCP' | 'TTFB';
export type MetricRating = 'good' | 'needs-improvement' | 'poor';

export interface MetricLogEntry {
  id: string;
  name: MetricName;
  value: number;
  unit: 'ms' | 'score';
  rating: MetricRating;
  route: string;
  timestamp: string;
  element?: string;
  navigationType?: string;
}

export interface PerformanceAuditSummary {
  totalAudits: number;
  lastUpdated: string;
  metrics: {
    [key in MetricName]?: {
      avg: number;
      min: number;
      max: number;
      unit: 'ms' | 'score';
      goodPercent: number;
      totalSamples: number;
    };
  };
}

const STORAGE_KEY = 'aql_cwv_audit_logs';
const MAX_LOG_ENTRIES = 120;

// Standard Google Core Web Vitals thresholds
export const THRESHOLDS: Record<MetricName, { good: number; poor: number; unit: 'ms' | 'score' }> = {
  LCP: { good: 2500, poor: 4000, unit: 'ms' },
  CLS: { good: 0.1, poor: 0.25, unit: 'score' },
  INP: { good: 200, poor: 500, unit: 'ms' },
  FID: { good: 100, poor: 300, unit: 'ms' },
  FCP: { good: 1800, poor: 3000, unit: 'ms' },
  TTFB: { good: 800, poor: 1800, unit: 'ms' },
};

function getRating(name: MetricName, value: number): MetricRating {
  const threshold = THRESHOLDS[name];
  if (!threshold) return 'good';
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function getElementDescriptor(element: Element | Node | EventTarget | null | undefined): string | undefined {
  if (!element || typeof element !== 'object') return undefined;
  
  const el = element as any;
  const rawTag = typeof el.tagName === 'string' ? el.tagName : (typeof el.nodeName === 'string' ? el.nodeName : '');
  if (!rawTag) return undefined;
  
  const tag = rawTag.toLowerCase().replace(/^[#]/, '');
  const id = typeof el.id === 'string' && el.id ? `#${el.id}` : '';
  const classes = typeof el.className === 'string' && el.className
    ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
    : '';
  return `${tag}${id}${classes}`;
}

export const performanceLogger = {
  getLogs(): MetricLogEntry[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  log(name: MetricName, rawValue: number, extra: { element?: string; navigationType?: string } = {}) {
    if (typeof window === 'undefined') return;

    const unit = THRESHOLDS[name]?.unit || 'ms';
    const value = unit === 'score' ? Number(rawValue.toFixed(4)) : Math.round(rawValue);
    const rating = getRating(name, value);
    const currentPath = window.location.pathname || '/';

    const entry: MetricLogEntry = {
      id: `${name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      value,
      unit,
      rating,
      route: currentPath,
      timestamp: new Date().toISOString(),
      element: extra.element,
      navigationType: extra.navigationType,
    };

    try {
      const currentLogs = this.getLogs();
      const updatedLogs = [entry, ...currentLogs].slice(0, MAX_LOG_ENTRIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));

      // Dispatched custom event for live dashboard listeners if active
      window.dispatchEvent(new CustomEvent('aql:perf-metric', { detail: entry }));
    } catch {
      // Storage quota or sandboxing fallback
    }
  },

  clearLogs() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🧹 [CWV Audit] Performance logs cleared.');
    } catch {
      // Ignore
    }
  },

  getSummary(): PerformanceAuditSummary {
    const logs = this.getLogs();
    const grouped: { [key in MetricName]?: number[] } = {};

    for (const log of logs) {
      if (!grouped[log.name]) grouped[log.name] = [];
      grouped[log.name]!.push(log.value);
    }

    const metricsSummary: PerformanceAuditSummary['metrics'] = {};

    (Object.keys(grouped) as MetricName[]).forEach((metric) => {
      const values = grouped[metric]!;
      const total = values.length;
      if (total === 0) return;

      const sum = values.reduce((a, b) => a + b, 0);
      const avg = Number((sum / total).toFixed(metric === 'CLS' ? 4 : 1));
      const min = Math.min(...values);
      const max = Math.max(...values);
      const goodThreshold = THRESHOLDS[metric].good;
      const goodCount = values.filter((v) => v <= goodThreshold).length;

      metricsSummary[metric] = {
        avg,
        min,
        max,
        unit: THRESHOLDS[metric].unit,
        goodPercent: Math.round((goodCount / total) * 100),
        totalSamples: total,
      };
    });

    return {
      totalAudits: logs.length,
      lastUpdated: logs[0]?.timestamp || 'Never',
      metrics: metricsSummary,
    };
  },

  printAuditTable() {
    if (typeof window === 'undefined') return;
    const summary = this.getSummary();
    console.group('📊 [AbuQitmirLabs] Core Web Vitals Audit Report');
    console.log(`Total samples: ${summary.totalAudits} | Last recorded: ${summary.lastUpdated}`);
    console.table(summary.metrics);
    console.log('Recent 10 entries:');
    console.table(this.getLogs().slice(0, 10));
    console.groupEnd();
  },

  exportLogsJSON(): string {
    return JSON.stringify(this.getLogs(), null, 2);
  },
};

/**
 * Initializes Core Web Vitals Performance Observers
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Attach global devtools helper
  (window as any).__AQL_PERF__ = performanceLogger;

  // 1. Time to First Byte (TTFB) & Navigation Timing
  try {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0) {
      const nav = navEntries[0];
      const ttfb = nav.responseStart;
      if (ttfb > 0) {
        performanceLogger.log('TTFB', ttfb, { navigationType: nav.type });
      }
    } else {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceNavigationTiming[]) {
          if (entry.responseStart > 0) {
            performanceLogger.log('TTFB', entry.responseStart, { navigationType: entry.type });
          }
        }
      });
      navObserver.observe({ type: 'navigation', buffered: true });
    }
  } catch {
    // Navigation timing observer not supported
  }

  // 2. First Contentful Paint (FCP)
  try {
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          performanceLogger.log('FCP', entry.startTime);
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch {
    // Paint timing not supported
  }

  // 3. Largest Contentful Paint (LCP)
  try {
    let lastLcpCandidate: PerformanceEntry | null = null;
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        lastLcpCandidate = entries[entries.length - 1];
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Flush LCP on visibilitychange (when user switches tabs or backgrounded)
    const reportLCP = () => {
      if (lastLcpCandidate) {
        const element = (lastLcpCandidate as any).element as Element | undefined;
        performanceLogger.log('LCP', lastLcpCandidate.startTime, {
          element: getElementDescriptor(element),
        });
        lastLcpCandidate = null;
      }
    };

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportLCP();
      }
    }, { once: true });

    window.addEventListener('pagehide', reportLCP, { once: true });
  } catch {
    // LCP not supported
  }

  // 4. Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          // If the entry occurred less than 1 second after the previous entry
          // and less than 5 seconds after the first entry in the session, include it
          if (
            sessionValue &&
            entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
            entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
          }
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    const reportCLS = () => {
      if (clsValue > 0) {
        const topShiftElement = (clsEntries[0] as any)?.sources?.[0]?.node as Element | undefined;
        performanceLogger.log('CLS', clsValue, {
          element: getElementDescriptor(topShiftElement),
        });
      }
    };

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportCLS();
      }
    }, { once: true });

    window.addEventListener('pagehide', reportCLS, { once: true });
  } catch {
    // Layout Shift not supported
  }

  // 5. First Input Delay (FID)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        const fidDelay = entry.processingStart - entry.startTime;
        performanceLogger.log('FID', fidDelay, {
          element: getElementDescriptor(entry.target),
        });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {
    // FID not supported
  }

  // 6. Interaction to Next Paint (INP)
  try {
    let longestInteractionDuration = 0;
    let longestInteractionElement: Element | undefined = undefined;

    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (entry.interactionId && entry.duration > longestInteractionDuration) {
          longestInteractionDuration = entry.duration;
          longestInteractionElement = entry.target;
        }
      }
    });
    inpObserver.observe({
      type: 'event',
      durationThreshold: 16,
      buffered: true,
    } as any);

    const reportINP = () => {
      if (longestInteractionDuration > 0) {
        performanceLogger.log('INP', longestInteractionDuration, {
          element: getElementDescriptor(longestInteractionElement),
        });
        longestInteractionDuration = 0;
      }
    };

    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportINP();
      }
    });

    window.addEventListener('pagehide', reportINP);
  } catch {
    // INP/Event observer not supported
  }
}

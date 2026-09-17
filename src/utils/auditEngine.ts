import { AuditResult, CoreWebVitals, IssuePriority } from '../types/audit';

export function calculateGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#22c55e'; // Green
  if (score >= 75) return '#ccff00'; // Brand Neon Yellow-Green
  if (score >= 50) return '#f59e0b'; // Amber
  return '#ef4444'; // Red
}

export function getCwvStatus(metric: keyof CoreWebVitals, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (metric) {
    case 'lcp': // Largest Contentful Paint (seconds)
      if (value <= 2.5) return 'good';
      if (value <= 4.0) return 'needs-improvement';
      return 'poor';
    case 'cls': // Cumulative Layout Shift (unitless)
      if (value <= 0.1) return 'good';
      if (value <= 0.25) return 'needs-improvement';
      return 'poor';
    case 'inp': // Interaction to Next Paint (ms)
      if (value <= 200) return 'good';
      if (value <= 500) return 'needs-improvement';
      return 'poor';
    case 'fcp': // First Contentful Paint (seconds)
      if (value <= 1.8) return 'good';
      if (value <= 3.0) return 'needs-improvement';
      return 'poor';
    case 'ttfb': // Time to First Byte (ms)
      if (value <= 800) return 'good';
      if (value <= 1800) return 'needs-improvement';
      return 'poor';
    case 'speedIndex': // Speed Index (seconds)
      if (value <= 3.4) return 'good';
      if (value <= 5.8) return 'needs-improvement';
      return 'poor';
    default:
      return 'good';
  }
}

export function getCwvLabel(metric: keyof CoreWebVitals, value: number): string {
  const status = getCwvStatus(metric, value);
  if (status === 'good') return 'Good';
  if (status === 'needs-improvement') return 'Needs Work';
  return 'Poor';
}

export function stripHtml(str: string): string {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '').trim();
}

export const SAMPLE_AUDITS: Record<string, AuditResult> = {
  'abuqitmirlabs': {
    url: 'https://www.abuqitmirlabs.tech',
    device: 'mobile',
    overallScore: 94,
    grade: 'A+',
    categoryCount: 5,
    issueCount: 3,
    performance: 92,
    seo: 98,
    accessibility: 95,
    bestPractices: 96,
    security: 95,
    cwv: {
      lcp: 1.6,
      cls: 0.02,
      inp: 75,
      fcp: 1.1,
      ttfb: 180,
      speedIndex: 2.1
    },
    issues: [
      {
        title: 'Serve images in next-gen formats',
        description: 'A small number of legacy PNG assets can be served as WebP or AVIF for an additional ~45KB payload savings.',
        category: 'Performance',
        priority: 'low',
        impact: 'Low',
        effort: 'Quick fix',
        suggestedFix: 'Convert remaining PNG icons into optimized SVG or WebP formats.'
      },
      {
        title: 'Cache-Control Header duration extension',
        description: 'Static JS and font bundles have max-age of 7 days; recommend extending to 1 year with immutable hashing.',
        category: 'Best Practices',
        priority: 'low',
        impact: 'Low',
        effort: 'Quick fix',
        suggestedFix: 'Set Cache-Control: public, max-age=31536000, immutable on immutable assets.'
      },
      {
        title: 'Minor button contrast ratio on secondary badge',
        description: 'A secondary tag has a 4.2:1 contrast ratio against the background; WCAG AA requires 4.5:1 for body copy.',
        category: 'Accessibility',
        priority: 'low',
        impact: 'Low',
        effort: 'Quick fix',
        suggestedFix: 'Slightly adjust opacity of secondary text from 65% to 80%.'
      }
    ],
    recommendations: [
      {
        title: 'Enable Cloudflare Early Hints (103)',
        description: 'Preload key render-blocking CSS and fonts before the full HTML document finishes parsing.',
        scoreGain: 3,
        timeToFix: '1-2 hours',
        difficulty: 'Easy',
        category: 'Performance'
      },
      {
        title: 'Automated Image Optimization Pipeline',
        description: 'Deploy Sharp-based build script to automatically compress all public images into responsive WebP/AVIF variants.',
        scoreGain: 2,
        timeToFix: '2-3 hours',
        difficulty: 'Easy',
        category: 'Performance'
      },
      {
        title: 'Enforce Strict-Transport-Security (HSTS) with Preload',
        description: 'Add preload directive to HSTS header to qualify for the global browser HSTS preload list.',
        scoreGain: 2,
        timeToFix: '30 mins',
        difficulty: 'Easy',
        category: 'Security'
      },
      {
        title: 'Add Schema.org AggregateRating on Case Studies',
        description: 'Enhance organic click-through rates (CTR) in Google SERPs with rich golden review star snippets.',
        scoreGain: 2,
        timeToFix: '2 hours',
        difficulty: 'Moderate',
        category: 'SEO'
      },
      {
        title: 'Subresource Integrity (SRI) for CDN Scripts',
        description: 'Add sha384 cryptographic integrity hashes to all third-party external tracking scripts.',
        scoreGain: 1,
        timeToFix: '1 hour',
        difficulty: 'Easy',
        category: 'Security'
      }
    ],
    analyzedAt: new Date().toISOString(),
    engine: 'Google Lighthouse (PSI)'
  },
  'ecommerce': {
    url: 'https://demo-ecommerce-store.com',
    device: 'mobile',
    overallScore: 58,
    grade: 'D',
    categoryCount: 5,
    issueCount: 14,
    performance: 44,
    seo: 68,
    accessibility: 62,
    bestPractices: 65,
    security: 50,
    cwv: {
      lcp: 4.8,
      cls: 0.32,
      inp: 420,
      fcp: 2.9,
      ttfb: 1420,
      speedIndex: 5.4
    },
    issues: [
      {
        title: 'Largest Contentful Paint (LCP) takes 4.8 seconds',
        description: 'Hero product banner is 3.2MB uncompressed PNG with no fetchpriority="high" or preloading.',
        category: 'Performance',
        priority: 'critical',
        impact: 'High',
        effort: '1-2 days',
        suggestedFix: 'Compress banner to 120KB WebP, preload in <head>, and specify explicit width/height.'
      },
      {
        title: 'Cumulative Layout Shift (CLS) of 0.32 causes severe visual jump',
        description: 'Dynamic promo banners and font flashes push product grid down as page loads.',
        category: 'Performance',
        priority: 'critical',
        impact: 'High',
        effort: '1 day',
        suggestedFix: 'Add aspect-ratio containers for banners and font-display: optional or swap with fallback sizing.'
      },
      {
        title: 'Missing Content-Security-Policy (CSP) and HSTS',
        description: 'Store accepts customer credit card details without protective XSS and TLS downgrade headers.',
        category: 'Security',
        priority: 'critical',
        impact: 'High',
        effort: '3-4 hours',
        suggestedFix: 'Implement Strict-Transport-Security: max-age=31536000 and standard Content-Security-Policy.'
      },
      {
        title: 'Missing meta descriptions & broken canonical tags',
        description: 'Over 40 category pages lack meta descriptions and have duplicate content canonical warnings.',
        category: 'SEO',
        priority: 'high',
        impact: 'High',
        effort: '2-3 days',
        suggestedFix: 'Generate automated programmatic meta descriptions and normalize canonical URL parameters.'
      },
      {
        title: '72 Images missing alt attributes',
        description: 'Screen readers cannot describe product photography to visually impaired customers, violating ADA / WCAG.',
        category: 'Accessibility',
        priority: 'high',
        impact: 'Medium',
        effort: '1 day',
        suggestedFix: 'Add descriptive alt tags incorporating product title and colorway attributes.'
      }
    ],
    recommendations: [
      {
        title: 'Hero Image Optimization & WebP Conversion',
        description: 'Downscale hero sliders and convert to modern WebP format with fetchpriority="high".',
        scoreGain: 18,
        timeToFix: '2-4 hours',
        difficulty: 'Easy',
        category: 'Performance'
      },
      {
        title: 'Fix Cumulative Layout Shift with CSS aspect-ratio',
        description: 'Reserve layout dimensions for image wrappers and promotional announcement bars before render.',
        scoreGain: 14,
        timeToFix: '3-5 hours',
        difficulty: 'Moderate',
        category: 'Performance'
      },
      {
        title: 'Deploy Enterprise CDN (Cloudflare / Fastly)',
        description: 'Cache static pages and TTFB edge responses to cut server response time from 1420ms to under 200ms.',
        scoreGain: 12,
        timeToFix: '4-6 hours',
        difficulty: 'Moderate',
        category: 'Performance'
      },
      {
        title: 'Implement Security Headers & HSTS',
        description: 'Protect checkout flow against clickjacking and insecure HTTP downgrades.',
        scoreGain: 10,
        timeToFix: '2 hours',
        difficulty: 'Easy',
        category: 'Security'
      },
      {
        title: 'Add Automated Alt-Text Generator & ARIA Labels',
        description: 'Ensure all catalog images have descriptive text for WCAG 2.1 AA legal compliance.',
        scoreGain: 8,
        timeToFix: '1 day',
        difficulty: 'Moderate',
        category: 'Accessibility'
      }
    ],
    analyzedAt: new Date().toISOString(),
    engine: 'Google Lighthouse (PSI)'
  }
};

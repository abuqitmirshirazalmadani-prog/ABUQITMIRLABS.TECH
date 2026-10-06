/**
 * AbuQitmirLabs Master Canonical Redirects Map
 * 
 * Single source of truth for all slug redirects, legacy URLs, and alias mappings.
 * Ensures:
 * 1. 0 duplicate URLs indexed by Google Analytics, Google Search Console, or RSS feeds.
 * 2. Instant client-side and server-side 301/permanent redirection to canonical slugs.
 * 3. Prevention of duplicate posts being inserted in Firestore or markdown repositories.
 */

export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  'when-to-invest-in-an-ai-agent-in-2026-a-realistic-cost-benefit-analysis-for-founders': 'when-to-invest-in-ai-agent',
    '2026-static-site-comeback-jamstack-vs-dynamic-website': 'the-2026-static-site-comeback-why-jamstack-won-after-all',
  // SaaS Pricing Page Optimization
  'saas-pricing-page-optimization-7-decisions-backed-by-data': 'saas-pricing-page-optimization-7-structural-decisions',
  
  // AI Agents Cost Benefit Analysis
  'ai-agents-cost-benefit-analysis-when-they-actually-save-money-and-when-they-dont': 'ai-agents-cost-benefit-analysis',
  
  // Pakistan Offshore Advantage
  'pakistan-offshore-development-for-us-startups-2026': 'the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026',
  
  // AI Overviews Traffic Recovery
  'ai-overviews-killed-traffic-what-40-companies-did-next': 'ai-overviews-traffic-recovery-what-40-companies-did-next',
  
  // Mobile app stack & Agency guides
  'flutter-vs-react-native-choosing-your-mobile-app-stack-in-2026': 'flutter-vs-react-native-choosing-mobile-app-stack-2026',
  'app-development-agency-uk-what-to-ask-before-you-sign-2026-guide': 'app-development-agency-uk-what-to-ask-before-you-sign-2026',
  'how-to-choose-mobile-app-development-company': 'how-to-choose-mobile-app-development-company-2026',
  'how-to-choose-mobile-app-development-company-2026': 'how-to-choose-a-mobile-app-development-company-2026',
  
  // RAG and AI Agents Agency vs In-house
  'rag-ai-integration': 'rag-ai-integration-for-startups',
  'the-complete-guide-to-rag-ai-integration-for-startups': 'rag-ai-integration-for-startups',
  'rag-ai-integration-startups': 'rag-ai-integration-for-startups',
  'rag-ai-integration-for-startups-abuqitmirlabs': 'rag-ai-integration-for-startups',
  'the-go-to-guide-ai-agent-development-agency-vs-in-house': 'ai-agent-development-agency-vs-in-house',
  'the-go-to-guide-to-ai-agent-development-agency-vs-building-in-house': 'ai-agent-development-agency-vs-in-house',
  
  // Custom Software & Web Development
  'custom-software-development-company-karachi-pakistan-abuqitmirlabs': 'custom-software-development-company-karachi-pakistan',
  'custom-web-development-company-2026': 'custom-web-development-company',
  'custom-web-development-company-2026-built-in-visibility': 'custom-web-development-company',
  'custom-web-development-vs-templates': 'custom-web-development-vs-website-templates-2026-guide',
  'custom-web-development-vs': 'custom-web-development-vs-website-templates-2026-guide',
  'what-does-a-custom-web-development-company-do': 'what-does-a-custom-web-development-company-do-2026-guide',
  'why-custom-web-development-matters-2026': 'why-custom-web-development-matters-in-2026-build-vs-buy-guide',
  '5-step-web-development-lifecycle-2026': '5-step-web-development-lifecycle-2026-custom-web-development-process-guide',
  'custom-ai-solutions-for-corporate-events': 'custom-ai-solutions-for-corporate-events-2026-guide',
  'local-business-visibility': 'local-business-visibility-seo-geo-aio-aeo-sxo-2026',
  'what-seo-services-actually-means': 'what-seo-services-actually-means-2026',
  'what-are-healthcare-ai-agents': 'what-are-healthcare-ai-agents-complete-guide-2026',
  'custom-ai-solutions-for-fintech-2026': 'custom-ai-solutions-for-fintech-2026-fraud-detection-underwriting',
  'ai-integration-with-legacy-systems-2026': 'ai-integration-with-legacy-systems-the-complete-2026-guide',
  'url-fragmentation-headless-spa': 'fix-url-fragmentation-in-headless-spas-abuqitmirlabs'
};

/**
 * Resolves any raw slug to its canonical slug.
 */
export function getCanonicalSlug(rawSlug: string): string {
  if (!rawSlug) return '';
  const clean = rawSlug.trim().replace(/^\/+/, '').replace(/^blog\//, '').replace(/\/+$/, '');
  return BLOG_SLUG_REDIRECTS[clean] || clean;
}

/**
 * Resolves any full path (e.g. /blog/old-slug or /old-slug) to its canonical path.
 */
export function getCanonicalPath(pathname: string): string {
  if (!pathname) return '/';
  const clean = pathname.trim().replace(/\/+$/, '') || '/';
  if (clean.startsWith('/blog/')) {
    const slug = clean.slice('/blog/'.length);
    const canonicalSlug = getCanonicalSlug(slug);
    return `/blog/${canonicalSlug}`;
  }
  return clean;
}

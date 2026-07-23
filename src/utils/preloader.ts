/**
 * High-performance route preloading utility
 * Ensures instant page transitions by fetching dynamic imports on hover or in background.
 */

export const routeLoaders: Record<string, () => Promise<any>> = {
  '/about': () => import('../pages/AboutPage'),
  '/custom-software': () => import('../pages/CustomSoftwarePage'),
  '/mobile-app-development': () => import('../pages/MobileAppDevelopmentPage'),
  '/web-development': () => import('../pages/WebDevelopmentPage'),
  '/ai-agent-development': () => import('../pages/AIAgentDevelopmentPage'),
  '/seo-mastery': () => import('../pages/SEOPage'),
  '/local-seo-for-small-business': () => import('../pages/LocalSEOSmallBusinessPage'),
  '/local-seo-citation-building': () => import('../pages/LocalSEOCitationBuildingPage'),
  '/white-label-local-seo': () => import('../pages/WhiteLabelLocalSEOPage'),
  '/local-seo-audit': () => import('../pages/LocalSEOAuditPage'),
  '/graphics-design': () => import('../pages/GraphicsDesignPage'),
  '/content-writing': () => import('../pages/ContentWritingPage'),
  '/contact': () => import('../pages/ContactPage'),
  '/blog': () => import('../pages/BlogPage'),
  '/case-studies': () => import('../pages/CaseStudiesPage'),
  '/us-market': () => import('../pages/USMarketPage'),
  '/uk-market': () => import('../pages/UKMarketPage'),
  '/pakistan-market': () => import('../pages/PakistanMarketPage'),
  '/canada-market': () => import('../pages/CanadaMarketPage'),
  '/poland-market': () => import('../pages/PolandMarketPage'),
  '/australia-market': () => import('../pages/AustraliaMarketPage'),
  '/terms': () => import('../pages/TermsPage'),
  '/privacy': () => import('../pages/PrivacyPage'),
  '/website-contract': () => import('../pages/WebsiteContractPage'),
};

const preloadedSet = new Set<string>();

/**
 * Preloads a specific route's code bundle
 */
export function preloadRoute(path: string) {
  // Normalize path by stripping hashes
  const cleanPath = path.split('#')[0];
  if (!cleanPath || preloadedSet.has(cleanPath)) return;

  const loader = routeLoaders[cleanPath];
  if (loader) {
    preloadedSet.add(cleanPath);
    loader().catch(() => {
      preloadedSet.delete(cleanPath);
    });
  }
}

/**
 * Non-blocking, staggered background preloader for primary routes
 */
export function preloadAllRoutes() {
  const primaryRoutes = [
    '/custom-software',
    '/mobile-app-development',
    '/web-development',
    '/ai-agent-development',
    '/seo-mastery',
    '/about',
    '/contact',
    '/blog',
    '/case-studies',
    '/graphics-design',
    '/content-writing',
    '/us-market',
  ];

  if (typeof window === 'undefined') return;

  // Stagger imports sequentially (400ms gap) so main thread and network remain completely free
  let index = 0;
  const staggerPreload = () => {
    if (index >= primaryRoutes.length) return;
    const route = primaryRoutes[index];
    index++;
    preloadRoute(route);

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        setTimeout(staggerPreload, 400);
      }, { timeout: 1000 });
    } else {
      setTimeout(staggerPreload, 500);
    }
  };

  // Start staggered preloading 1.2s after initial mount
  setTimeout(staggerPreload, 1200);
}

/**
 * High-performance route preloading utility
 * Ensures instant page transitions by fetching dynamic imports on hover or in background.
 */

export const routeLoaders: Record<string, () => Promise<any>> = {
  '/about': () => import('../pages/AboutPage'),
  '/about/our-company': () => import('../pages/about/OurCompanyPage'),
  '/about/our-team': () => import('../pages/about/OurTeamPage'),
  '/about/our-process': () => import('../pages/about/OurProcessPage'),
  '/about/careers': () => import('../pages/about/CareersPage'),
  '/solutions/fintech': () => import('../pages/solutions/FintechSolutionsPage'),
  '/solutions/healthcare': () => import('../pages/solutions/HealthcarePlatformsPage'),
  '/solutions/ai-automation': () => import('../pages/solutions/AIAutomationPage'),
  '/solutions/e-commerce': () => import('../pages/solutions/ECommerceDevelopmentPage'),
  '/solutions/edtech': () => import('../pages/solutions/EdTechPlatformsPage'),
  '/news/latest': () => import('../pages/news/LatestNewsPage'),
  '/news/press-releases': () => import('../pages/news/PressReleasesPage'),
  '/news/industry-insights': () => import('../pages/news/IndustryInsightsPage'),
  '/news/all': () => import('../pages/news/AllNewsPage'),
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
 * Non-blocking, idle preloader for top primary routes only
 */
export function preloadAllRoutes() {
  if (typeof window === 'undefined') return;

  // Only prewarm top 3 most visited primary routes when the browser is completely idle
  const highPriorityRoutes = ['/custom-software', '/ai-agent-development', '/contact'];

  const prewarm = () => {
    highPriorityRoutes.forEach((route, idx) => {
      setTimeout(() => {
        preloadRoute(route);
      }, idx * 600);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(prewarm, { timeout: 3000 });
  } else {
    setTimeout(prewarm, 2000);
  }
}

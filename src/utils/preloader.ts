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
  '/saudi-arabia-market': () => import('../pages/SaudiArabiaMarketPage'),
  '/uae-market': () => import('../pages/UAEMarketPage'),
  '/qatar-market': () => import('../pages/QatarMarketPage'),
  '/kuwait-market': () => import('../pages/KuwaitMarketPage'),
  '/uk-market': () => import('../pages/UKMarketPage'),
  '/pakistan-market': () => import('../pages/PakistanMarketPage'),
  '/canada-market': () => import('../pages/CanadaMarketPage'),
  '/poland-market': () => import('../pages/PolandMarketPage'),
  '/australia-market': () => import('../pages/AustraliaMarketPage'),
  '/ai-video-creation': () => import('../pages/AIVideoCreator'),
  '/digital-marketing': () => import('../pages/DigitalMarketingPage'),
  '/guest-post-service': () => import('../pages/GuestPostServicePage'),
  '/editorial-policy': () => import('../pages/EditorialPolicyPage'),
  '/brand-assets': () => import('../pages/BrandAssetsPage'),
  '/tools': () => import('../pages/ToolsIndexPage'),
  '/terms': () => import('../pages/TermsPage'),
  '/privacy': () => import('../pages/PrivacyPage'),
  '/website-contract': () => import('../pages/WebsiteContractPage'),
  '/tools/project-cost-estimator': () => import('../pages/ProjectCostEstimatorPage'),
  '/tools/website-audit': () => import('../pages/WebsiteAuditPage'),
  '/tools/seo-checklist': () => import('../pages/SeoChecklistPage'),
  '/tools/ai-readiness-score': () => import('../pages/AiReadinessScorePage'),
  '/tools/tech-stack-recommender': () => import('../pages/TechStackRecommenderPage'),
  '/tools/website-authority-analyzer': () => import('../pages/WebsiteAuthorityAnalyzerPage'),
};

const preloadedSet = new Set<string>();

/**
 * Preloads a specific route's code bundle
 */
export function preloadRoute(path: string) {
  // Normalize path by stripping query params and hashes
  const cleanPath = path.split('?')[0].split('#')[0];
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
 * Global Instant Page Transitions
 * Detects pointer hover, focus, and touchstart on any internal link
 * and preloads the target route module immediately (~150-300ms before click).
 */
export function initInstantPageTransitions() {
  if (typeof window === 'undefined') return;

  const handlePointerInteraction = (e: Event) => {
    const target = (e.target as HTMLElement | null)?.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Only internal relative routes
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes(':')) {
      preloadRoute(href);
    }
  };

  // Passive listeners for instant responsiveness without scrolling lag
  document.addEventListener('mouseover', handlePointerInteraction, { passive: true });
  document.addEventListener('touchstart', handlePointerInteraction, { passive: true });
  document.addEventListener('focusin', handlePointerInteraction, { passive: true });
}

/**
 * Non-blocking, idle preloader for top primary routes
 */
export function preloadAllRoutes() {
  if (typeof window === 'undefined') return;

  // Initialize instant hover transitions globally
  initInstantPageTransitions();

  // Prewarm highest-traffic routes during browser idle time
  const highPriorityRoutes = [
    '/ai-video-creation',
    '/custom-software',
    '/ai-agent-development',
    '/web-development',
    '/mobile-app-development',
    '/case-studies',
    '/contact'
  ];

  const prewarm = () => {
    highPriorityRoutes.forEach((route, idx) => {
      setTimeout(() => {
        preloadRoute(route);
      }, idx * 300);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(prewarm, { timeout: 2000 });
  } else {
    setTimeout(prewarm, 1000);
  }
}

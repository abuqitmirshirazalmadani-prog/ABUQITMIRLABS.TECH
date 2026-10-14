/**
 * Lightweight, high-performance route preloading utility
 * Preloads dynamic page chunks on user intent (debounced hover or touch)
 * without flooding the network or freezing the Vite dev server / browser.
 */

export const routeLoaders: Record<string, () => Promise<any>> = {
  // Main Navigation & Primary Services
  '/custom-software': () => import('../pages/CustomSoftwarePage'),
  '/mobile-app-development': () => import('../pages/MobileAppDevelopmentPage'),
  '/web-development': () => import('../pages/WebDevelopmentPage'),
  '/ai-agent-development': () => import('../pages/AIAgentDevelopmentPage'),
  '/ai-video-creation': () => import('../pages/AIVideoCreator'),
  '/seo-mastery': () => import('../pages/SEOPage'),
  '/graphics-design': () => import('../pages/GraphicsDesignPage'),
  '/content-writing': () => import('../pages/ContentWritingPage'),
  '/digital-marketing': () => import('../pages/DigitalMarketingPage'),
  '/local-seo-for-small-business': () => import('../pages/LocalSEOSmallBusinessPage'),
  '/local-seo/small-business': () => import('../pages/LocalSEOSmallBusinessPage'),
  '/local-seo-citation-building': () => import('../pages/LocalSEOCitationBuildingPage'),
  '/white-label-local-seo': () => import('../pages/WhiteLabelLocalSEOPage'),
  '/local-seo-audit': () => import('../pages/LocalSEOAuditPage'),
  '/guest-post-service': () => import('../pages/GuestPostServicePage'),

  // Case Studies & Portfolio
  '/case-studies': () => import('../pages/CaseStudiesPage'),
  '/case-studies/tajweedpage': () => import('../pages/CaseStudyTajweedPage'),

  // Solutions
  '/solutions/fintech': () => import('../pages/solutions/FintechSolutionsPage'),
  '/solutions/healthcare': () => import('../pages/solutions/HealthcarePlatformsPage'),
  '/solutions/ai-automation': () => import('../pages/solutions/AIAutomationPage'),
  '/solutions/e-commerce': () => import('../pages/solutions/ECommerceDevelopmentPage'),
  '/solutions/edtech': () => import('../pages/solutions/EdTechPlatformsPage'),

  // Company, Contact & Resources
  '/about': () => import('../pages/AboutPage'),
  '/about/our-company': () => import('../pages/about/OurCompanyPage'),
  '/about/our-team': () => import('../pages/about/OurTeamPage'),
  '/about/our-process': () => import('../pages/about/OurProcessPage'),
  '/about/careers': () => import('../pages/about/CareersPage'),
  '/contact': () => import('../pages/ContactPage'),
  '/blog': () => import('../pages/BlogPage'),
  '/brand-assets': () => import('../pages/BrandAssetsPage'),
  '/website-contract': () => import('../pages/WebsiteContractPage'),

  // Tools
  '/tools': () => import('../pages/ToolsIndexPage'),
  '/tools/project-cost-estimator': () => import('../pages/ProjectCostEstimatorPage'),
  '/tools/website-audit': () => import('../pages/WebsiteAuditPage'),
  '/tools/seo-checklist': () => import('../pages/SeoChecklistPage'),
  '/tools/ai-readiness-score': () => import('../pages/AiReadinessScorePage'),
  '/tools/tech-stack-recommender': () => import('../pages/TechStackRecommenderPage'),
  '/tools/website-authority-analyzer': () => import('../pages/WebsiteAuthorityAnalyzerPage'),

  // Markets
  '/us-market': () => import('../pages/USMarketPage'),
  '/uk-market': () => import('../pages/UKMarketPage'),
  '/pakistan-market': () => import('../pages/PakistanMarketPage'),
  '/uae-market': () => import('../pages/UAEMarketPage'),
  '/saudi-arabia-market': () => import('../pages/SaudiArabiaMarketPage'),
  '/qatar-market': () => import('../pages/QatarMarketPage'),
  '/kuwait-market': () => import('../pages/KuwaitMarketPage'),
  '/canada-market': () => import('../pages/CanadaMarketPage'),
  '/poland-market': () => import('../pages/PolandMarketPage'),
  '/australia-market': () => import('../pages/AustraliaMarketPage'),

  // News
  '/news/latest': () => import('../pages/news/LatestNewsPage'),
  '/news/press-releases': () => import('../pages/news/PressReleasesPage'),
  '/news/industry-insights': () => import('../pages/news/IndustryInsightsPage'),
  '/news/all': () => import('../pages/news/AllNewsPage'),

  // Legal
  '/terms': () => import('../pages/TermsPage'),
  '/privacy': () => import('../pages/PrivacyPage'),
};

const preloadedSet = new Set<string>();

/**
 * Resolves the loader for standard or dynamic routes
 */
function resolveLoader(cleanPath: string): (() => Promise<any>) | null {
  if (routeLoaders[cleanPath]) {
    return routeLoaders[cleanPath];
  }
  // Dynamic blog posts
  if (cleanPath.startsWith('/blog/')) {
    return () => import('../pages/BlogPostPage');
  }
  // Dynamic news articles
  if (
    cleanPath.startsWith('/news/article/') ||
    cleanPath.startsWith('/news/read/') ||
    cleanPath.startsWith('/news/latest/') ||
    cleanPath.startsWith('/news/industry-insights/') ||
    cleanPath.startsWith('/news/press-releases/')
  ) {
    return () => import('../pages/news/NewsArticlePage');
  }
  return null;
}

/**
 * Preloads a specific route's code bundle safely
 */
export function preloadRoute(path: string) {
  if (!path) return;
  // Normalize path by stripping query params, hashes, and trailing slashes
  let cleanPath = path.split('?')[0].split('#')[0];
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  if (!cleanPath || cleanPath === '/' || preloadedSet.has(cleanPath)) return;

  const loader = resolveLoader(cleanPath);
  if (loader) {
    preloadedSet.add(cleanPath);
    loader().catch(() => {
      // Allow retry on future interaction if network temporarily failed
      preloadedSet.delete(cleanPath);
    });
  }
}

let isInitialized = false;

/**
 * Global Instant Page Transitions:
 * Intercepts debounced hover (pointerover) and touchstart on internal links.
 * No full-DOM scanning, no MutationObserver thrashing, no browser hangs.
 */
export function initInstantPageTransitions() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  const extractHref = (e: Event): string | null => {
    try {
      const rawTarget = e.target;
      if (!rawTarget) return null;

      const element =
        rawTarget instanceof Element
          ? rawTarget
          : (rawTarget as Node)?.parentElement instanceof Element
          ? (rawTarget as Node).parentElement
          : null;

      if (!element || typeof element.closest !== 'function') return null;

      const anchor = element.closest('a');
      if (!anchor) return null;

      const href = anchor.getAttribute('href');
      if (!href) return null;
      if (href.startsWith('/') && !href.startsWith('//') && !href.includes(':')) {
        return href;
      }
      return null;
    } catch {
      return null;
    }
  };

  let hoverTimer: any = null;
  let lastHoveredHref: string | null = null;

  const handlePointerOver = (e: Event) => {
    const href = extractHref(e);
    if (!href) {
      if (hoverTimer) clearTimeout(hoverTimer);
      lastHoveredHref = null;
      return;
    }
    if (href === lastHoveredHref) return;
    lastHoveredHref = href;
    if (hoverTimer) clearTimeout(hoverTimer);
    // 70ms debounce ensures intentional user hover before preloading
    hoverTimer = setTimeout(() => {
      preloadRoute(href);
    }, 70);
  };

  const handleTouchStart = (e: Event) => {
    const href = extractHref(e);
    if (href) {
      preloadRoute(href);
    }
  };

  document.addEventListener('pointerover', handlePointerOver, { passive: true });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
}

/**
 * Proactive preloader initialization on browser idle
 */
export function preloadAllRoutes() {
  if (typeof window === 'undefined') return;
  // Simply initialize instant transition listeners on idle without flooding imports
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(initInstantPageTransitions, { timeout: 1500 });
  } else {
    setTimeout(initInstantPageTransitions, 500);
  }
}

/**
 * High-performance route preloading utility
 * Ensures instant (0ms) page transitions by fetching dynamic imports on hover,
 * on viewport intersection, or proactively during idle background time.
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
  '/case-studies/tajweedpage': () => import('../pages/CaseStudyTajweedPage'),
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
 * Resolves the chunk loader for any static or dynamic route path.
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
 * Preloads a specific route's code bundle immediately and safely.
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
      preloadedSet.delete(cleanPath);
    });
  }
}

let isInitialized = false;

/**
 * Global Instant Page Transitions:
 * 1. Automatically intercepts pointerenter, mouseover, mousedown, touchstart, and focusin on all internal links.
 * 2. Uses IntersectionObserver to prefetch any link that appears in the viewport (Next.js/quicklink style).
 */
export function initInstantPageTransitions() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  const extractHref = (e: Event): string | null => {
    const target = (e.target as HTMLElement | null)?.closest('a');
    if (!target) return null;
    const href = target.getAttribute('href');
    if (!href) return null;
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes(':')) {
      return href;
    }
    return null;
  };

  const handlePointerInteraction = (e: Event) => {
    const href = extractHref(e);
    if (href) {
      preloadRoute(href);
    }
  };

  // Passive high-priority interaction listeners
  const events = ['pointerenter', 'mouseover', 'touchstart', 'mousedown', 'focusin'];
  events.forEach((evt) => {
    document.addEventListener(evt, handlePointerInteraction, { passive: true, capture: true });
  });

  // IntersectionObserver for viewport-based predictive prefetching
  if ('IntersectionObserver' in window) {
    const observedLinks = new WeakSet<Element>();
    const linkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anchor = entry.target as HTMLAnchorElement;
            linkObserver.unobserve(anchor);
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//') && !href.includes(':')) {
              preloadRoute(href);
            }
          }
        });
      },
      { rootMargin: '250px' } // Preload when link is within 250px of entering viewport
    );

    const observeAllInternalLinks = () => {
      const anchors = document.querySelectorAll('a[href^="/"]');
      anchors.forEach((a) => {
        if (!observedLinks.has(a)) {
          observedLinks.add(a);
          linkObserver.observe(a);
        }
      });
    };

    // Observe immediately and on DOM changes
    observeAllInternalLinks();
    if ('MutationObserver' in window) {
      let mutationTimeout: any = null;
      const mutationObs = new MutationObserver(() => {
        if (mutationTimeout) clearTimeout(mutationTimeout);
        mutationTimeout = setTimeout(observeAllInternalLinks, 200);
      });
      mutationObs.observe(document.body, { childList: true, subtree: true });
    }
  }
}

/**
 * Non-blocking, multi-tiered proactive preloader
 * Warms up almost all core routes during browser idle time so clicking is 100% instant (0ms).
 */
export function preloadAllRoutes() {
  if (typeof window === 'undefined') return;

  // Initialize instant interaction & viewport prefetchers
  initInstantPageTransitions();

  // Tier 1: Highest traffic conversion pages (Header, Primary Nav, Core Services)
  const tier1Routes = [
    '/custom-software',
    '/mobile-app-development',
    '/web-development',
    '/ai-agent-development',
    '/ai-video-creation',
    '/seo-mastery',
    '/contact',
    '/blog',
    '/case-studies',
    '/about/our-company'
  ];

  // Tier 2: Solutions, Tools & Secondary pages
  const tier2Routes = [
    '/solutions/fintech',
    '/solutions/healthcare',
    '/solutions/ai-automation',
    '/solutions/e-commerce',
    '/solutions/edtech',
    '/case-studies/tajweedpage',
    '/graphics-design',
    '/content-writing',
    '/tools',
    '/tools/project-cost-estimator',
    '/tools/website-audit',
    '/tools/seo-checklist',
    '/tools/ai-readiness-score',
    '/tools/tech-stack-recommender',
    '/tools/website-authority-analyzer',
    '/news/latest',
    '/news/all'
  ];

  // Tier 3: Market expansion pages
  const tier3Routes = [
    '/us-market',
    '/uk-market',
    '/pakistan-market',
    '/uae-market',
    '/saudi-arabia-market',
    '/qatar-market',
    '/kuwait-market',
    '/canada-market',
    '/poland-market',
    '/australia-market',
    '/terms',
    '/privacy'
  ];

  const schedulePreload = (routes: string[], delayBase: number, step: number) => {
    routes.forEach((route, idx) => {
      setTimeout(() => {
        preloadRoute(route);
      }, delayBase + idx * step);
    });
  };

  const executeWarmup = () => {
    schedulePreload(tier1Routes, 100, 40);
    schedulePreload(tier2Routes, 800, 60);
    schedulePreload(tier3Routes, 2000, 80);
    // Prewarm BlogPostPage chunk so all blog articles open in 0ms
    setTimeout(() => {
      preloadRoute('/blog/custom-software');
    }, 500);
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(executeWarmup, { timeout: 1500 });
  } else {
    setTimeout(executeWarmup, 400);
  }
}

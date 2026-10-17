/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { lazyWithRetry } from './utils/lazyWithRetry';
import FacebookPixel from './components/FacebookPixel';
import ErrorBoundary from './components/ErrorBoundary';

// Eager import landing page for immediate initial render
import HomePage from './pages/HomePage';

// Lazy load all secondary and service pages for ultra-fast initial bundle size
const SaudiArabiaMarketPage = lazyWithRetry(() => import('./pages/SaudiArabiaMarketPage'));
const UAEMarketPage = lazyWithRetry(() => import('./pages/UAEMarketPage'));
const QatarMarketPage = lazyWithRetry(() => import('./pages/QatarMarketPage'));
const KuwaitMarketPage = lazyWithRetry(() => import('./pages/KuwaitMarketPage'));

// Lazy load all secondary and service pages for fast initial bundle size
const CustomSoftwarePage = lazyWithRetry(() => import('./pages/CustomSoftwarePage'));
const MobileAppDevelopmentPage = lazyWithRetry(() => import('./pages/MobileAppDevelopmentPage'));
const WebDevelopmentPage = lazyWithRetry(() => import('./pages/WebDevelopmentPage'));
const AIAgentDevelopmentPage = lazyWithRetry(() => import('./pages/AIAgentDevelopmentPage'));
const AIVideoCreator = lazyWithRetry(() => import('./pages/AIVideoCreator'));
const SEOPage = lazyWithRetry(() => import('./pages/SEOPage'));
const DigitalMarketingPage = lazyWithRetry(() => import('./pages/DigitalMarketingPage'));
const LocalSEOSmallBusinessPage = lazyWithRetry(() => import('./pages/LocalSEOSmallBusinessPage'));
const LocalSEOCitationBuildingPage = lazyWithRetry(() => import('./pages/LocalSEOCitationBuildingPage'));
const WhiteLabelLocalSEOPage = lazyWithRetry(() => import('./pages/WhiteLabelLocalSEOPage'));
const LocalSEOAuditPage = lazyWithRetry(() => import('./pages/LocalSEOAuditPage'));
const GuestPostServicePage = lazyWithRetry(() => import('./pages/GuestPostServicePage'));
const GraphicsDesignPage = lazyWithRetry(() => import('./pages/GraphicsDesignPage'));
const ContentWritingPage = lazyWithRetry(() => import('./pages/ContentWritingPage'));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const BlogPage = lazyWithRetry(() => import('./pages/BlogPage'));
const CaseStudiesPage = lazyWithRetry(() => import('./pages/CaseStudiesPage'));

// Solutions Pages
const FintechSolutionsPage = lazyWithRetry(() => import('./pages/solutions/FintechSolutionsPage'));
const HealthcarePlatformsPage = lazyWithRetry(() => import('./pages/solutions/HealthcarePlatformsPage'));
const AIAutomationPage = lazyWithRetry(() => import('./pages/solutions/AIAutomationPage'));
const ECommerceDevelopmentPage = lazyWithRetry(() => import('./pages/solutions/ECommerceDevelopmentPage'));
const EdTechPlatformsPage = lazyWithRetry(() => import('./pages/solutions/EdTechPlatformsPage'));

// About Dropdown Pages
const OurCompanyPage = lazyWithRetry(() => import('./pages/about/OurCompanyPage'));
const OurTeamPage = lazyWithRetry(() => import('./pages/about/OurTeamPage'));
const OurProcessPage = lazyWithRetry(() => import('./pages/about/OurProcessPage'));
const CareersPage = lazyWithRetry(() => import('./pages/about/CareersPage'));

// News Dropdown Pages
const LatestNewsPage = lazyWithRetry(() => import('./pages/news/LatestNewsPage'));
const PressReleasesPage = lazyWithRetry(() => import('./pages/news/PressReleasesPage'));
const IndustryInsightsPage = lazyWithRetry(() => import('./pages/news/IndustryInsightsPage'));
const AllNewsPage = lazyWithRetry(() => import('./pages/news/AllNewsPage'));
const NewsArticlePage = lazyWithRetry(() => import('./pages/news/NewsArticlePage'));

// Secondary & administrative pages
const USMarketPage = lazyWithRetry(() => import('./pages/USMarketPage'));
const UKMarketPage = lazyWithRetry(() => import('./pages/UKMarketPage'));
const PakistanMarketPage = lazyWithRetry(() => import('./pages/PakistanMarketPage'));
const CanadaMarketPage = lazyWithRetry(() => import('./pages/CanadaMarketPage'));
const PolandMarketPage = lazyWithRetry(() => import('./pages/PolandMarketPage'));
const AustraliaMarketPage = lazyWithRetry(() => import('./pages/AustraliaMarketPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const PrivacyPage = lazyWithRetry(() => import('./pages/PrivacyPage'));
const EditorialPolicyPage = lazyWithRetry(() => import('./pages/EditorialPolicyPage'));
const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard'));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage'));
const CaseStudyTajweedPage = lazyWithRetry(() => import('./pages/CaseStudyTajweedPage'));
const WebsiteContractPage = lazyWithRetry(() => import('./pages/WebsiteContractPage'));
const BrandAssetsPage = lazyWithRetry(() => import('./pages/BrandAssetsPage'));
const ToolsIndexPage = lazyWithRetry(() => import('./pages/ToolsIndexPage'));
const ProjectCostEstimatorPage = lazyWithRetry(() => import('./pages/ProjectCostEstimatorPage'));
const WebsiteAuditPage = lazyWithRetry(() => import('./pages/WebsiteAuditPage'));
const SeoChecklistPage = lazyWithRetry(() => import('./pages/SeoChecklistPage'));
const AiReadinessScorePage = lazyWithRetry(() => import('./pages/AiReadinessScorePage'));
const TechStackRecommenderPage = lazyWithRetry(() => import('./pages/TechStackRecommenderPage'));
const WebsiteAuthorityAnalyzerPage = lazyWithRetry(() => import('./pages/WebsiteAuthorityAnalyzerPage'));
import TopLoadingBar from './components/TopLoadingBar';

// Loading fallback: Sleek, non-blocking page transition indicator
const PageLoader = () => (
    <div className="min-h-[60vh] bg-[#09090b] flex items-center justify-center py-24" role="status" aria-label="Loading page">
        <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#ccff00]/20 border-t-[#ccff00] rounded-full animate-spin"></div>
            <span className="text-[10px] font-mono tracking-widest text-[#ccff00]/70 uppercase">Instant Loading</span>
        </div>
    </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { getCanonicalPath } from './data/canonicalRedirects';
import { SEO_ROUTES_METADATA } from './data/seoRoutesMetadata';

function MetaHeadSanitizer() {
  const { pathname } = useLocation();
  useEffect(() => {
    const sanitize = () => {
      const canonicalPath = getCanonicalPath(pathname);
      const isNotHome = canonicalPath !== '/' && canonicalPath !== '';
      const expectedCanonicalUrl = `https://www.abuqitmirlabs.tech${canonicalPath}`;
      const routeSeo = SEO_ROUTES_METADATA[canonicalPath] || SEO_ROUTES_METADATA[pathname];

      // 1. Strictly guarantee exactly one <title> in document.head
      const titles = Array.from(document.querySelectorAll('title'));
      if (titles.length > 1) {
        if (isNotHome) {
          // Discard any residual homepage titles on inner pages
          const nonHomeTitles = titles.filter(t => {
            const text = (t.textContent || '').trim();
            return !text.includes('Custom Software Development &') && 
                   !text.includes('Custom Software & AI App Development Company') &&
                   !text.includes('Custom Software Development Company & AI Agency');
          });
          const keepTitle = nonHomeTitles.length > 0 ? nonHomeTitles[nonHomeTitles.length - 1] : titles[titles.length - 1];
          titles.forEach(t => {
            if (t !== keepTitle && t.parentNode) {
              t.parentNode.removeChild(t);
            }
          });
        } else {
          // On homepage, prefer the latest
          const keepTitle = titles[titles.length - 1];
          titles.forEach(t => {
            if (t !== keepTitle && t.parentNode) {
              t.parentNode.removeChild(t);
            }
          });
        }
      }

      // If on an inner page and title is still erroneously set to homepage title, rectify it
      if (isNotHome && routeSeo && routeSeo.title) {
        const curTitle = document.querySelector('title');
        if (curTitle) {
          const curText = (curTitle.textContent || '').trim();
          if (curText.includes('Custom Software Development & AI Agency | AbuQitmirLabs')) {
            curTitle.textContent = routeSeo.title;
          }
        }
      }

      // 2. Strictly guarantee exactly one meta[name="description"] in document.head
      const descs = Array.from(document.querySelectorAll('meta[name="description"]'));
      if (descs.length > 1) {
        if (isNotHome) {
          // Discard homepage meta descriptions
          const nonHomeDescs = descs.filter(d => {
            const content = (d.getAttribute('content') || '').trim();
            return !content.includes('AbuQitmirLabs is a custom software & AI development company') &&
                   !content.includes('AbuQitmirLabs engineers custom software, AI agents');
          });
          const keepDesc = nonHomeDescs.length > 0 ? nonHomeDescs[nonHomeDescs.length - 1] : descs[descs.length - 1];
          descs.forEach(d => {
            if (d !== keepDesc && d.parentNode) {
              d.parentNode.removeChild(d);
            }
          });
        } else {
          const keepDesc = descs[descs.length - 1];
          descs.forEach(d => {
            if (d !== keepDesc && d.parentNode) {
              d.parentNode.removeChild(d);
            }
          });
        }
      }

      // 2b. Strictly guarantee exactly one meta[name="robots"] in document.head
      const robots = Array.from(document.querySelectorAll('meta[name="robots"]'));
      if (robots.length > 1) {
        const keepRobot = robots[robots.length - 1];
        robots.forEach(r => {
          if (r !== keepRobot && r.parentNode) {
            r.parentNode.removeChild(r);
          }
        });
      }

      // 3. Guarantee strictly one canonical link matching current path
      const canonicals = Array.from(document.querySelectorAll('link[rel="canonical"]'));
      if (canonicals.length > 1) {
        if (isNotHome) {
          // Remove any canonical pointing to homepage
          const matchingCanonicals = canonicals.filter(c => {
            const href = (c.getAttribute('href') || '').trim();
            return href !== 'https://www.abuqitmirlabs.tech/' && href !== 'https://www.abuqitmirlabs.tech';
          });
          const targetKeep = matchingCanonicals.length > 0 ? matchingCanonicals[matchingCanonicals.length - 1] : canonicals[canonicals.length - 1];
          canonicals.forEach(c => {
            if (c !== targetKeep && c.parentNode) {
              c.parentNode.removeChild(c);
            }
          });
          if (targetKeep) {
            targetKeep.setAttribute('href', expectedCanonicalUrl);
          }
        } else {
          const targetKeep = canonicals[canonicals.length - 1];
          canonicals.forEach(c => {
            if (c !== targetKeep && c.parentNode) {
              c.parentNode.removeChild(c);
            }
          });
          if (targetKeep) {
            targetKeep.setAttribute('href', 'https://www.abuqitmirlabs.tech/');
          }
        }
      } else if (canonicals.length === 1 && isNotHome) {
        const curHref = (canonicals[0].getAttribute('href') || '').trim();
        if (curHref === 'https://www.abuqitmirlabs.tech/' || curHref === 'https://www.abuqitmirlabs.tech') {
          canonicals[0].setAttribute('href', expectedCanonicalUrl);
        }
      }

      // 4. Guarantee single og:url, og:title, og:description
      const ogUrls = Array.from(document.querySelectorAll('meta[property="og:url"]'));
      if (ogUrls.length > 1) {
        const keepOgUrl = ogUrls[ogUrls.length - 1];
        ogUrls.forEach(tag => {
          if (tag !== keepOgUrl && tag.parentNode) {
            tag.parentNode.removeChild(tag);
          }
        });
        if (keepOgUrl) {
          keepOgUrl.setAttribute('content', expectedCanonicalUrl);
        }
      } else if (ogUrls.length === 1 && isNotHome) {
        const curHref = (ogUrls[0].getAttribute('content') || '').trim();
        if (curHref === 'https://www.abuqitmirlabs.tech/' || curHref === 'https://www.abuqitmirlabs.tech') {
          ogUrls[0].setAttribute('content', expectedCanonicalUrl);
        }
      }

      ['og:title', 'og:description'].forEach(prop => {
        const ogTags = Array.from(document.querySelectorAll(`meta[property="${prop}"]`));
        if (ogTags.length > 1) {
          if (isNotHome) {
            const nonHomeTags = ogTags.filter(tag => {
              const content = (tag.getAttribute('content') || '').trim();
              return !content.includes('Custom Software Development &') && 
                     !content.includes('AbuQitmirLabs is a custom software & AI development company');
            });
            const keepTag = nonHomeTags.length > 0 ? nonHomeTags[nonHomeTags.length - 1] : ogTags[ogTags.length - 1];
            ogTags.forEach(tag => {
              if (tag !== keepTag && tag.parentNode) {
                tag.parentNode.removeChild(tag);
              }
            });
          } else {
            const keepTag = ogTags[ogTags.length - 1];
            ogTags.forEach(tag => {
              if (tag !== keepTag && tag.parentNode) {
                tag.parentNode.removeChild(tag);
              }
            });
          }
        }
      });

      // 5. Guarantee single twitter:title, twitter:description
      ['twitter:title', 'twitter:description'].forEach(name => {
        const twTags = Array.from(document.querySelectorAll(`meta[name="${name}"]`));
        if (twTags.length > 1) {
          if (isNotHome) {
            const nonHomeTags = twTags.filter(tag => {
              const content = (tag.getAttribute('content') || '').trim();
              return !content.includes('Custom Software Development &') && 
                     !content.includes('AbuQitmirLabs is a custom software & AI development company');
            });
            const keepTag = nonHomeTags.length > 0 ? nonHomeTags[nonHomeTags.length - 1] : twTags[twTags.length - 1];
            twTags.forEach(tag => {
              if (tag !== keepTag && tag.parentNode) {
                tag.parentNode.removeChild(tag);
              }
            });
          } else {
            const keepTag = twTags[twTags.length - 1];
            twTags.forEach(tag => {
              if (tag !== keepTag && tag.parentNode) {
                tag.parentNode.removeChild(tag);
              }
            });
          }
        }
      });

      // 6. Deduplicate JSON-LD script blocks
      const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      if (jsonLdScripts.length > 1) {
        const seenSchemas = new Set<string>();
        jsonLdScripts.forEach(script => {
          const text = (script.textContent || '').trim();
          if (seenSchemas.has(text) && script.parentNode) {
            script.parentNode.removeChild(script);
          } else {
            seenSchemas.add(text);
          }
        });
      }
    };

    sanitize();
  }, [pathname]);

  return null;
}

function GoogleAnalyticsTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        const canonicalPath = getCanonicalPath(pathname);
        const canonicalUrl = `https://www.abuqitmirlabs.tech${canonicalPath}`;
        (window as any).gtag('event', 'page_view', {
          page_title: document.title,
          page_location: canonicalUrl,
          page_path: canonicalPath,
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
}

const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/923233260859"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[9999] group"
    aria-label="Contact on WhatsApp"
  >
    {/* Floating label */}
    <div className="absolute right-full mr-4 bottom-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none border border-white/20 shadow-lg">
      Chat with us
    </div>

    {/* Brutalist Button Container */}
    <div className="relative w-16 h-16 flex items-center justify-center transform transition-all group-hover:scale-105 active:scale-95 group-hover:-rotate-3">
      {/* Brutalist Background Square */}
      <div className="absolute inset-0 bg-[#25D366] border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
      
      {/* Technical scanning lines (decorative) */}
      <div className="absolute inset-2 border-t border-black/10 animate-pulse pointer-events-none"></div>
      <div className="absolute inset-2 border-b border-black/10 animate-pulse delay-75 pointer-events-none"></div>

      {/* Notification Badge */}
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
        1
      </div>

      {/* WhatsApp Icon */}
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        fill="black"
        className="relative z-10"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.541 4.193 1.57 6.05L0 24l6.117-1.605a11.845 11.845 0 005.932 1.583h.005c6.627 0 12.032-5.403 12.035-12.039.001-3.207-1.246-6.222-3.504-8.48z" />
      </svg>
    </div>
  </a>
);

export default function App() {
  useEffect(() => {
    // Only dispatch in production/build time for pre-rendering
    const trigger = () => {
      setTimeout(() => {
        document.dispatchEvent(new Event('x-render-trigger'));
      }, 300);
    };
    
    trigger();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        {/* <TopLoadingBar /> */}
        <ScrollToTop />
        {/* <MetaHeadSanitizer /> */}
        <FacebookPixel />
        <GoogleAnalyticsTracker />
        <FloatingWhatsApp />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/our-company" element={<OurCompanyPage />} />
              <Route path="/about/our-team" element={<OurTeamPage />} />
              <Route path="/about/our-process" element={<OurProcessPage />} />
              <Route path="/about/careers" element={<CareersPage />} />
              <Route path="/our-company" element={<Navigate to="/about/our-company" replace />} />
              <Route path="/our-team" element={<Navigate to="/about/our-team" replace />} />
              <Route path="/our-process" element={<Navigate to="/about/our-process" replace />} />
              <Route path="/careers" element={<Navigate to="/about/careers" replace />} />

              {/* Solutions Routes */}
              <Route path="/solutions/fintech" element={<FintechSolutionsPage />} />
              <Route path="/solutions/healthcare" element={<HealthcarePlatformsPage />} />
              <Route path="/solutions/ai-automation" element={<AIAutomationPage />} />
              <Route path="/solutions/e-commerce" element={<ECommerceDevelopmentPage />} />
              <Route path="/solutions/edtech" element={<EdTechPlatformsPage />} />

              {/* News Routes */}
              <Route path="/news" element={<Navigate to="/news/latest" replace />} />
              <Route path="/news/latest" element={<LatestNewsPage />} />
              <Route path="/news/press-releases" element={<PressReleasesPage />} />
              <Route path="/news/industry-insights" element={<IndustryInsightsPage />} />
              <Route path="/news/all" element={<AllNewsPage />} />
              <Route path="/news/article/:id" element={<NewsArticlePage />} />
              <Route path="/news/read/:id" element={<NewsArticlePage />} />
              <Route path="/news/latest/:id" element={<NewsArticlePage />} />
              <Route path="/news/industry-insights/:id" element={<NewsArticlePage />} />
              <Route path="/news/press-releases/:id" element={<NewsArticlePage />} />

              <Route path="/custom-software" element={<CustomSoftwarePage />} />
              <Route path="/custom-software-development" element={<Navigate to="/custom-software" replace />} />
              <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
              <Route path="/web-development" element={<WebDevelopmentPage />} />
              <Route path="/ai-agent-development" element={<AIAgentDevelopmentPage />} />
              <Route path="/ai-video-creation" element={<AIVideoCreator />} />
              <Route path="/ai-video-creator" element={<Navigate to="/ai-video-creation" replace />} />
              <Route path="/seo-mastery" element={<SEOPage />} />
              <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
              <Route path="/local-seo-services" element={<Navigate to="/seo-mastery" replace />} />
              <Route path="/local-seo-for-small-business" element={<LocalSEOSmallBusinessPage />} />
              <Route path="/local-seo-small-business" element={<Navigate to="/local-seo-for-small-business" replace />} />
              <Route path="/local-seo-citation-building" element={<LocalSEOCitationBuildingPage />} />
              <Route path="/white-label-local-seo" element={<WhiteLabelLocalSEOPage />} />
              <Route path="/local-seo-audit" element={<LocalSEOAuditPage />} />
              <Route path="/guest-post-service" element={<GuestPostServicePage />} />
              <Route path="/guest-posting-service" element={<Navigate to="/guest-post-service" replace />} />
              <Route path="/guest-post-services" element={<Navigate to="/guest-post-service" replace />} />
              <Route path="/guest-posts" element={<Navigate to="/guest-post-service" replace />} />
              <Route path="/graphics-design" element={<GraphicsDesignPage />} />
              <Route path="/content-writing" element={<ContentWritingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/us-market" element={<USMarketPage />} />
              <Route path="/saudi-arabia-market" element={<SaudiArabiaMarketPage />} />
              <Route path="/uae-market" element={<UAEMarketPage />} />
              <Route path="/qatar-market" element={<QatarMarketPage />} />
              <Route path="/kuwait-market" element={<KuwaitMarketPage />} />
              <Route path="/uk-market" element={<UKMarketPage />} />
              <Route path="/pakistan-market" element={<PakistanMarketPage />} />
              <Route path="/canada-market" element={<CanadaMarketPage />} />
              <Route path="/poland-market" element={<PolandMarketPage />} />
              <Route path="/australia-market" element={<AustraliaMarketPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/rag-ai-integration-for-startups" element={<Navigate to="/blog/the-complete-guide-to-rag-ai-integration-for-startups" replace />} />
              <Route path="/blog/rag-ai-integration-for-startups" element={<Navigate to="/blog/the-complete-guide-to-rag-ai-integration-for-startups" replace />} />
              <Route path="/blog/rag-ai-integration-startups" element={<Navigate to="/blog/the-complete-guide-to-rag-ai-integration-for-startups" replace />} />
              <Route path="/blog/rag-ai-integration-for-startups-abuqitmirlabs" element={<Navigate to="/blog/the-complete-guide-to-rag-ai-integration-for-startups" replace />} />
              <Route path="/what-does-a-custom-web-development-company-do" element={<Navigate to="/blog/what-does-a-custom-web-development-company-do-2026-guide" replace />} />
              <Route path="/blog/what-does-a-custom-web-development-company-do" element={<Navigate to="/blog/what-does-a-custom-web-development-company-do-2026-guide" replace />} />
              <Route path="/custom-ai-solutions-for-corporate-events-2026-guide" element={<BlogPostPage overrideSlug="custom-ai-solutions-for-corporate-events-2026-guide" />} />
              <Route path="/blog/custom-ai-solutions-for-corporate-events-2026-guide" element={<BlogPostPage overrideSlug="custom-ai-solutions-for-corporate-events-2026-guide" />} />
              <Route path="/local-business-visibility-seo-geo-aio-aeo-sxo-2026" element={<Navigate to="/blog/local-business-visibility-2026-seo-geo-aio-aeo-sxo" replace />} />
              <Route path="/blog/local-business-visibility-seo-geo-aio-aeo-sxo-2026" element={<Navigate to="/blog/local-business-visibility-2026-seo-geo-aio-aeo-sxo" replace />} />
              <Route path="/what-seo-services-actually-means-2026" element={<Navigate to="/blog/what-seo-services-actually-mean-in-2026-abuqitmirlabs" replace />} />
              <Route path="/blog/what-seo-services-actually-means-2026" element={<Navigate to="/blog/what-seo-services-actually-mean-in-2026-abuqitmirlabs" replace />} />
              <Route path="/how-to-choose-mobile-app-development-company-2026" element={<Navigate to="/blog/how-to-choose-a-mobile-app-development-company-2026" replace />} />
              <Route path="/blog/how-to-choose-mobile-app-development-company-2026" element={<Navigate to="/blog/how-to-choose-a-mobile-app-development-company-2026" replace />} />
              <Route path="/custom-web-development-company-2026" element={<Navigate to="/blog/custom-web-development-company" replace />} />
              <Route path="/blog/custom-web-development-company-2026" element={<Navigate to="/blog/custom-web-development-company" replace />} />
              <Route path="/blog/custom-web-development-company-2026-built-in-visibility" element={<Navigate to="/blog/custom-web-development-company" replace />} />
              <Route path="/blog/custom-web-development-company" element={<BlogPostPage overrideSlug="custom-web-development-company" />} />
              <Route path="/custom-ai-solutions-for-fintech-2026" element={<Navigate to="/blog/custom-ai-solutions-for-fintech-2026-fraud-detection-underwriting" replace />} />
              <Route path="/blog/custom-ai-solutions-for-fintech-2026" element={<Navigate to="/blog/custom-ai-solutions-for-fintech-2026-fraud-detection-underwriting" replace />} />
              <Route path="/custom-web-development-vs-website-templates-2026-guide" element={<BlogPostPage overrideSlug="custom-web-development-vs-website-templates-2026-guide" />} />
              <Route path="/blog/custom-web-development-vs-website-templates-2026-guide" element={<BlogPostPage overrideSlug="custom-web-development-vs-website-templates-2026-guide" />} />
              <Route path="/custom-web-development-vs-templates" element={<Navigate to="/blog/custom-web-development-vs-website-templates-2026-guide" replace />} />
              <Route path="/blog/custom-web-development-vs-templates" element={<Navigate to="/blog/custom-web-development-vs-website-templates-2026-guide" replace />} />
              <Route path="/blog/custom-ai-solutions-for-corporate-events" element={<Navigate to="/blog/custom-ai-solutions-for-corporate-events-2026-guide" replace />} />
              <Route path="/blog/custom-software-development-company-karachi-pakistan-abuqitmirlabs" element={<Navigate to="/blog/custom-software-development-company-karachi-pakistan" replace />} />
              <Route path="/blog/healthcare-software-development-solutions-2026" element={<Navigate to="/blog/healthcare-software-development-solutions-2026-custom-ehr-clinical-software" replace />} />
              <Route path="/local-seo-citation-building-15-directory-checklist" element={<Navigate to="/blog/local-seo-citation-building-the-15-directory-checklist" replace />} />
              <Route path="/blog/local-seo-citation-building-15-directory-checklist" element={<Navigate to="/blog/local-seo-citation-building-the-15-directory-checklist" replace />} />
              <Route path="/blog/ai-agent-development-agency-vs-in-house" element={<Navigate to="/blog/the-go-to-guide-ai-agent-development-agency-vs-in-house" replace />} />
              <Route path="/ai-agent-development-agency-vs-in-house" element={<Navigate to="/blog/the-go-to-guide-ai-agent-development-agency-vs-in-house" replace />} />
              <Route path="/blog/generative-ai-chatbot-development-cost-2026" element={<Navigate to="/blog/generative-ai-chatbot-development-what-it-actually-costs-in-2026" replace />} />
              <Route path="/generative-ai-chatbot-development-cost-2026" element={<Navigate to="/blog/generative-ai-chatbot-development-what-it-actually-costs-in-2026" replace />} />
              <Route path="/ecommerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/e-commerce-platform-development-custom-build-vs-shopify-plus-2026" replace />} />
              <Route path="/e-commerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/e-commerce-platform-development-custom-build-vs-shopify-plus-2026" replace />} />
              <Route path="/blog/ecommerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/e-commerce-platform-development-custom-build-vs-shopify-plus-2026" replace />} />
              <Route path="/flutter-vs-native-mobile-app-development-2026" element={<Navigate to="/blog/flutter-vs-native-mobile-app-development-2026" replace />} />
              <Route path="/blog/flutter-vs-native-mobile-app-development-2026" element={<BlogPostPage overrideSlug="flutter-vs-native-mobile-app-development-2026" />} />
              <Route path="/enterprise-software-engineering-what-changes-at-scale" element={<Navigate to="/blog/enterprise-software-engineering-what-changes-at-scale" replace />} />
              <Route path="/blog/enterprise-software-engineering-what-changes-at-scale" element={<BlogPostPage overrideSlug="enterprise-software-engineering-what-changes-at-scale" />} />
              <Route path="/edtech-software-development-lms-features-every-platform-needs" element={<Navigate to="/blog/edtech-software-development-lms-features-every-platform-needs" replace />} />
              <Route path="/blog/edtech-software-development-lms-features-every-platform-needs" element={<BlogPostPage overrideSlug="edtech-software-development-lms-features-every-platform-needs" />} />
              <Route path="/flutter-vs-react-native-choosing-mobile-app-stack-2026" element={<Navigate to="/blog/flutter-vs-react-native-choosing-mobile-app-stack-2026" replace />} />
              <Route path="/blog/flutter-vs-react-native-choosing-mobile-app-stack-2026" element={<BlogPostPage overrideSlug="flutter-vs-react-native-choosing-mobile-app-stack-2026" />} />
              <Route path="/app-development-agency-uk-what-to-ask-before-you-sign-2026" element={<Navigate to="/blog/app-development-agency-uk-what-to-ask-before-you-sign-2026" replace />} />
              <Route path="/blog/app-development-agency-uk-what-to-ask-before-you-sign-2026" element={<BlogPostPage overrideSlug="app-development-agency-uk-what-to-ask-before-you-sign-2026" />} />
              <Route path="/high-performance-web-applications-12-engineering-decisions" element={<Navigate to="/blog/high-performance-web-applications-12-engineering-decisions" replace />} />
              <Route path="/blog/high-performance-web-applications-12-engineering-decisions" element={<BlogPostPage overrideSlug="high-performance-web-applications-12-engineering-decisions" />} />
              <Route path="/blog/ai-overviews-killed-traffic-what-40-companies-did-next" element={<Navigate to="/blog/ai-overviews-traffic-recovery-what-40-companies-did-next" replace />} />
              <Route path="/blog/ai-overviews-traffic-recovery-what-40-companies-did-next" element={<BlogPostPage overrideSlug="ai-overviews-traffic-recovery-what-40-companies-did-next" />} />
              <Route path="/ai-overviews-traffic-recovery-what-40-companies-did-next" element={<Navigate to="/blog/ai-overviews-traffic-recovery-what-40-companies-did-next" replace />} />
              <Route path="/blog/the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026" element={<BlogPostPage overrideSlug="the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026" />} />
              <Route path="/the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026" element={<Navigate to="/blog/the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026" replace />} />
              <Route path="/blog/pakistan-offshore-development-for-us-startups-2026" element={<Navigate to="/blog/the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026" replace />} />
              <Route path="/pakistan-offshore-development-for-us-startups-2026" element={<Navigate to="/blog/the-pakistan-advantage-why-us-startups-are-moving-dev-teams-offshore-2026" replace />} />
              <Route path="/blog/saas-pricing-page-optimization-7-structural-decisions" element={<BlogPostPage overrideSlug="saas-pricing-page-optimization-7-structural-decisions" />} />
              <Route path="/saas-pricing-page-optimization-7-structural-decisions" element={<Navigate to="/blog/saas-pricing-page-optimization-7-structural-decisions" replace />} />
              <Route path="/blog/saas-pricing-page-optimization-7-decisions-backed-by-data" element={<Navigate to="/blog/saas-pricing-page-optimization-7-structural-decisions" replace />} />
              <Route path="/saas-pricing-page-optimization-7-decisions-backed-by-data" element={<Navigate to="/blog/saas-pricing-page-optimization-7-structural-decisions" replace />} />
              <Route path="/blog/flutter-vs-react-native-choosing-your-mobile-app-stack-in-2026" element={<Navigate to="/blog/flutter-vs-react-native-choosing-mobile-app-stack-2026" replace />} />
              <Route path="/blog/app-development-agency-uk-what-to-ask-before-you-sign-2026-guide" element={<Navigate to="/blog/app-development-agency-uk-what-to-ask-before-you-sign-2026" replace />} />
              <Route path="/blog/ai-agents-cost-benefit-analysis" element={<BlogPostPage overrideSlug="ai-agents-cost-benefit-analysis" />} />
              <Route path="/ai-agents-cost-benefit-analysis" element={<Navigate to="/blog/ai-agents-cost-benefit-analysis" replace />} />
              <Route path="/blog/ai-agents-cost-benefit-analysis-when-they-actually-save-money-and-when-they-dont" element={<Navigate to="/blog/ai-agents-cost-benefit-analysis" replace />} />
              <Route path="/blog/guest-posting-in-2026-what-works-abuqitmirlabs" element={<BlogPostPage overrideSlug="guest-posting-in-2026-what-works-abuqitmirlabs" />} />
              <Route path="/blog/guest-posting-strategy-2026" element={<Navigate to="/blog/guest-posting-in-2026-what-works-abuqitmirlabs" replace />} />
              <Route path="/blog/measure-marketing-roi-without-tracking" element={<BlogPostPage overrideSlug="measure-marketing-roi-without-tracking" />} />
              <Route path="/measure-marketing-roi-without-tracking" element={<Navigate to="/blog/measure-marketing-roi-without-tracking" replace />} />
              <Route path="/blog/ai-is-quietly-stealing-your-ability-to-think" element={<BlogPostPage overrideSlug="ai-is-quietly-stealing-your-ability-to-think" />} />
              <Route path="/ai-is-quietly-stealing-your-ability-to-think" element={<Navigate to="/blog/ai-is-quietly-stealing-your-ability-to-think" replace />} />
              <Route path="/blog/brand-identity-vs-logo-design" element={<BlogPostPage overrideSlug="brand-identity-vs-logo-design" />} />
              <Route path="/brand-identity-vs-logo-design" element={<Navigate to="/blog/brand-identity-vs-logo-design" replace />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/tajweedpage" element={<CaseStudyTajweedPage />} />
              <Route path="/website-contract" element={<WebsiteContractPage />} />
              <Route path="/brand-assets" element={<BrandAssetsPage />} />
              <Route path="/brand-kit" element={<Navigate to="/brand-assets" replace />} />
              <Route path="/tools" element={<ToolsIndexPage />} />
              <Route path="/free-tools" element={<Navigate to="/tools" replace />} />
              <Route path="/tools/project-cost-estimator" element={<ProjectCostEstimatorPage />} />
              <Route path="/project-cost-estimator" element={<Navigate to="/tools/project-cost-estimator" replace />} />
              <Route path="/tools/website-audit" element={<WebsiteAuditPage />} />
              <Route path="/website-audit" element={<Navigate to="/tools/website-audit" replace />} />
              <Route path="/tools/seo-checklist" element={<SeoChecklistPage />} />
              <Route path="/seo-checklist" element={<Navigate to="/tools/seo-checklist" replace />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white">
                  <div className="text-center max-w-md px-6">
                    <p className="text-white/60 mb-8">Page not found.</p>
                    <a href="/" className="inline-block px-6 py-3 bg-[#ccff00] text-black font-bold rounded-lg">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
              <Route path="/tools/ai-readiness-score" element={<AiReadinessScorePage />} />
              <Route path="/ai-readiness-score" element={<Navigate to="/tools/ai-readiness-score" replace />} />
              <Route path="/tools/tech-stack-recommender" element={<TechStackRecommenderPage />} />
              <Route path="/tech-stack-recommender" element={<Navigate to="/tools/tech-stack-recommender" replace />} />
              <Route path="/tools/website-authority-analyzer" element={<WebsiteAuthorityAnalyzerPage />} />
              <Route path="/website-authority-analyzer" element={<Navigate to="/tools/website-authority-analyzer" replace />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

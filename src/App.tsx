/**
 * @license
 * @SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { lazyWithRetry } from './utils/lazyWithRetry';
import FacebookPixel from './components/FacebookPixel';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import TopLoadingBar from './components/TopLoadingBar';
import { getCanonicalPath } from './data/canonicalRedirects';
import { SEO_ROUTES_METADATA } from './data/seoRoutesMetadata';

// Eagerly loaded public pages for instant 0ms route transitions (zero lazy-chunk hang)
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import GrowthEngineeringPage from './pages/GrowthEngineeringPage';
import CustomSoftwarePage from './pages/CustomSoftwarePage';
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import AIAgentDevelopmentPage from './pages/AIAgentDevelopmentPage';
import AIVideoCreator from './pages/AIVideoCreator';
import SEOPage from './pages/SEOPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import LocalSEOSmallBusinessPage from './pages/LocalSEOSmallBusinessPage';
import LocalSEOCitationBuildingPage from './pages/LocalSEOCitationBuildingPage';
import WhiteLabelLocalSEOPage from './pages/WhiteLabelLocalSEOPage';
import LocalSEOAuditPage from './pages/LocalSEOAuditPage';
import GuestPostServicePage from './pages/GuestPostServicePage';
import GraphicsDesignPage from './pages/GraphicsDesignPage';
import ContentWritingPage from './pages/ContentWritingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyTajweedPage from './pages/CaseStudyTajweedPage';
import LuxuryBrandExperiencePage from './pages/LuxuryBrandExperiencePage';
import BrandBuildingPage from './pages/BrandBuildingPage';
import SkillsAcademyPage from './pages/SkillsAcademyPage';
import FintechSolutionsPage from './pages/solutions/FintechSolutionsPage';
import HealthcarePlatformsPage from './pages/solutions/HealthcarePlatformsPage';
import AIAutomationPage from './pages/solutions/AIAutomationPage';
import ECommerceDevelopmentPage from './pages/solutions/ECommerceDevelopmentPage';
import EdTechPlatformsPage from './pages/solutions/EdTechPlatformsPage';
import ProgrammaticSEOPage from './pages/ProgrammaticSEOPage';
import OurCompanyPage from './pages/about/OurCompanyPage';
import OurTeamPage from './pages/about/OurTeamPage';
import OurProcessPage from './pages/about/OurProcessPage';
import CareersPage from './pages/about/CareersPage';
import LatestNewsPage from './pages/news/LatestNewsPage';
import PressReleasesPage from './pages/news/PressReleasesPage';
import IndustryInsightsPage from './pages/news/IndustryInsightsPage';
import AllNewsPage from './pages/news/AllNewsPage';
import NewsArticlePage from './pages/news/NewsArticlePage';
import USMarketPage from './pages/USMarketPage';
import UKMarketPage from './pages/UKMarketPage';
import PakistanMarketPage from './pages/PakistanMarketPage';
import CanadaMarketPage from './pages/CanadaMarketPage';
import PolandMarketPage from './pages/PolandMarketPage';
import AustraliaMarketPage from './pages/AustraliaMarketPage';
import SaudiArabiaMarketPage from './pages/SaudiArabiaMarketPage';
import UAEMarketPage from './pages/UAEMarketPage';
import QatarMarketPage from './pages/QatarMarketPage';
import KuwaitMarketPage from './pages/KuwaitMarketPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import EditorialPolicyPage from './pages/EditorialPolicyPage';
import WebsiteContractPage from './pages/WebsiteContractPage';
import BrandAssetsPage from './pages/BrandAssetsPage';
import ToolsIndexPage from './pages/ToolsIndexPage';
import ProjectCostEstimatorPage from './pages/ProjectCostEstimatorPage';
import WebsiteAuditPage from './pages/WebsiteAuditPage';
import SeoChecklistPage from './pages/SeoChecklistPage';
import AiReadinessScorePage from './pages/AiReadinessScorePage';
import TechStackRecommenderPage from './pages/TechStackRecommenderPage';
import WebsiteAuthorityAnalyzerPage from './pages/WebsiteAuthorityAnalyzerPage';

const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard'));

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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

function RouteSEO() {
  const { pathname } = useLocation();
  const canonicalPath = getCanonicalPath(pathname);
  const normalizedPath =
    canonicalPath.endsWith('/') && canonicalPath !== '/'
      ? canonicalPath.slice(0, -1)
      : canonicalPath;

  const routeSeo =
    SEO_ROUTES_METADATA[canonicalPath] ||
    SEO_ROUTES_METADATA[normalizedPath] ||
    SEO_ROUTES_METADATA[pathname];

  return (
    <SEO
      title={routeSeo?.title}
      description={routeSeo?.description}
      canonical={routeSeo?.canonical}
      keywords={routeSeo?.keywords}
      ogTitle={routeSeo?.ogTitle}
      ogDescription={routeSeo?.ogDescription}
      ogImage={routeSeo?.ogImage}
      ogImageAlt={routeSeo?.ogImageAlt}
      ogType={routeSeo?.ogType}
      twitterCard={routeSeo?.twitterCard}
      twitterTitle={routeSeo?.twitterTitle}
      twitterDescription={routeSeo?.twitterDescription}
      twitterImage={routeSeo?.twitterImage}
      robots={routeSeo?.robots}
    />
  );
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
  <a href="https://wa.me/923233260859" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[9999] group" aria-label="Contact on WhatsApp">
    <div className="absolute right-full mr-4 bottom-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none border border-white/20 shadow-lg">
      Chat with us
    </div>
    <div className="relative w-16 h-16 flex items-center justify-center transform transition-all group-hover:scale-105 active:scale-95 group-hover:-rotate-3">
      <div className="absolute inset-0 bg-[#25D366] border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
      <div className="absolute inset-2 border-t border-black/10 animate-pulse pointer-events-none"></div>
      <div className="absolute inset-2 border-b border-black/10 animate-pulse delay-75 pointer-events-none"></div>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">1</div>
      <svg viewBox="0 0 24 24" width="32" height="32" fill="black" className="relative z-10">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.541 4.193 1.57 6.05L0 24l6.117-1.605a11.845 11.845 0 005.932 1.583h.005c6.627 0 12.032-5.403 12.035-12.039.001-3.207-1.246-6.222-3.504-8.48z" />
      </svg>
    </div>
  </a>
);

function AppRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary resetKey={location.pathname} key={`eb-${location.pathname}`}>
      <Suspense fallback={<PageLoader />} key={`suspense-${location.pathname}`}>
        <Routes location={location} key={location.pathname}>
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

          <Route path="/solutions/fintech" element={<FintechSolutionsPage />} />
          <Route path="/solutions/healthcare" element={<HealthcarePlatformsPage />} />
          <Route path="/solutions/ai-automation" element={<AIAutomationPage />} />
          <Route path="/solutions/e-commerce" element={<ECommerceDevelopmentPage />} />
          <Route path="/solutions/edtech" element={<EdTechPlatformsPage />} />
          <Route path="/solutions/:industry/:service" element={<ProgrammaticSEOPage />} />

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

          <Route path="/growth-engineering" element={<GrowthEngineeringPage />} />
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
          <Route path="/brand-building" element={<BrandBuildingPage />} />
          <Route path="/brand-building-services" element={<Navigate to="/brand-building" replace />} />
          <Route path="/brand-building-services-for-small-businesses" element={<Navigate to="/brand-building" replace />} />
          <Route path="/skills-academy" element={<SkillsAcademyPage />} />
          <Route path="/brand-banao-business-chalao" element={<Navigate to="/skills-academy" replace />} />
          <Route path="/course" element={<Navigate to="/skills-academy" replace />} />
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

          {/* Blog Redirects */}
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
          <Route path="/ecommerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/ecommerce-platform-development" replace />} />
          <Route path="/e-commerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/ecommerce-platform-development" replace />} />
          <Route path="/blog/ecommerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/ecommerce-platform-development" replace />} />
          <Route path="/blog/e-commerce-platform-development-custom-build-vs-shopify-plus-2026" element={<Navigate to="/blog/ecommerce-platform-development" replace />} />
          <Route path="/blog/ecommerce-platform-development" element={<BlogPostPage overrideSlug="ecommerce-platform-development" />} />
          <Route path="/flutter-vs-native-mobile-app-development-2026" element={<Navigate to="/blog/flutter-vs-native-mobile-app-development-2026" replace />} />
          <Route path="/blog/flutter-vs-native-mobile-app-development-2026" element={<BlogPostPage overrideSlug="flutter-vs-native-mobile-app-development-2026" />} />
          <Route path="/enterprise-software-engineering-what-changes-at-scale" element={<Navigate to="/blog/enterprise-software-engineering-what-changes-at-scale" replace />} />
          <Route path="/blog/enterprise-software-engineering-what-changes-at-scale" element={<BlogPostPage overrideSlug="enterprise-software-engineering-what-changes-at-scale" />} />
          <Route path="/edtech-software-development-lms-features-every-platform-needs" element={<Navigate to="/blog/edtech-software-development" replace />} />
          <Route path="/blog/edtech-software-development-lms-features-every-platform-needs" element={<Navigate to="/blog/edtech-software-development" replace />} />
          <Route path="/blog/edtech-software-development-9-features-every-lms-needs" element={<Navigate to="/blog/edtech-software-development" replace />} />
          <Route path="/blog/edtech-software-development" element={<BlogPostPage overrideSlug="edtech-software-development" />} />
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
          <Route path="/blog/brand-strategy-vs-logo-design-pakistan-sme" element={<BlogPostPage overrideSlug="brand-strategy-vs-logo-design-pakistan-sme" />} />
          <Route path="/brand-strategy-vs-logo-design-pakistan-sme" element={<Navigate to="/blog/brand-strategy-vs-logo-design-pakistan-sme" replace />} />
          <Route path="/blog/ai-content-vs-human-content" element={<BlogPostPage overrideSlug="ai-content-vs-human-content" />} />
          <Route path="/ai-content-vs-human-content" element={<Navigate to="/blog/ai-content-vs-human-content" replace />} />
          <Route path="/blog/content-calendar-strategy" element={<BlogPostPage overrideSlug="content-calendar-strategy" />} />
          <Route path="/content-calendar-strategy" element={<Navigate to="/blog/content-calendar-strategy" replace />} />
          <Route path="/blog/ui-ux-design-conversion" element={<BlogPostPage overrideSlug="ui-ux-design-conversion" />} />
          <Route path="/ui-ux-design-conversion" element={<Navigate to="/blog/ui-ux-design-conversion" replace />} />

          {/* Dynamic Blog Route */}
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
          <Route path="/luxury-brand-experience" element={<LuxuryBrandExperiencePage />} />
          <Route path="/atelier" element={<Navigate to="/luxury-brand-experience" replace />} />
          <Route path="/luxury-showcase" element={<Navigate to="/luxury-brand-experience" replace />} />
          <Route path="/tools/ai-readiness-score" element={<AiReadinessScorePage />} />
          <Route path="/ai-readiness-score" element={<Navigate to="/tools/ai-readiness-score" replace />} />
          <Route path="/tools/tech-stack-recommender" element={<TechStackRecommenderPage />} />
          <Route path="/tech-stack-recommender" element={<Navigate to="/tools/tech-stack-recommender" replace />} />
          <Route path="/tools/website-authority-analyzer" element={<WebsiteAuthorityAnalyzerPage />} />
          <Route path="/website-authority-analyzer" element={<Navigate to="/tools/website-authority-analyzer" replace />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  useEffect(() => {
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
        <TopLoadingBar />
        <RouteSEO />
        <ScrollToTop />
        <FacebookPixel />
        <GoogleAnalyticsTracker />
        <FloatingWhatsApp />
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
}

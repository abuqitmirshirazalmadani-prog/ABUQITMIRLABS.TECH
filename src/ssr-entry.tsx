import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, Navigate } from 'react-router-dom';

// Eagerly import the key pages for SSG pre-rendering
import HomePage from './pages/HomePage';
import CustomSoftwarePage from './pages/CustomSoftwarePage';
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import AIAgentDevelopmentPage from './pages/AIAgentDevelopmentPage';
import SEOPage from './pages/SEOPage';
import LocalSEOSmallBusinessPage from './pages/LocalSEOSmallBusinessPage';
import LocalSEOCitationBuildingPage from './pages/LocalSEOCitationBuildingPage';
import WhiteLabelLocalSEOPage from './pages/WhiteLabelLocalSEOPage';
import LocalSEOAuditPage from './pages/LocalSEOAuditPage';
import GraphicsDesignPage from './pages/GraphicsDesignPage';
import ContentWritingPage from './pages/ContentWritingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyTajweedPage from './pages/CaseStudyTajweedPage';
import BrandAssetsPage from './pages/BrandAssetsPage';
import WebsiteContractPage from './pages/WebsiteContractPage';
import FintechSolutionsPage from './pages/solutions/FintechSolutionsPage';
import HealthcarePlatformsPage from './pages/solutions/HealthcarePlatformsPage';
import AIAutomationPage from './pages/solutions/AIAutomationPage';
import ECommerceDevelopmentPage from './pages/solutions/ECommerceDevelopmentPage';
import EdTechPlatformsPage from './pages/solutions/EdTechPlatformsPage';
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
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPostPage from './pages/BlogPostPage';
import ErrorBoundary from './components/ErrorBoundary';

export { SEO_ROUTES_METADATA } from './data/seoRoutesMetadata';

const FloatingWhatsApp = () => (
  <a 
    href="https://wa.me/923233260859"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[9999] group"
    aria-label="Contact on WhatsApp"
  >
    <div className="absolute right-full mr-4 bottom-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none border border-white/20 shadow-lg">
      Chat with us
    </div>
    <div className="relative w-16 h-16 flex items-center justify-center transform transition-all group-hover:scale-105 active:scale-95 group-hover:-rotate-3">
      <div className="absolute inset-0 bg-[#25D366] border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
      <div className="absolute inset-2 border-t border-black/10 animate-pulse pointer-events-none"></div>
      <div className="absolute inset-2 border-b border-black/10 animate-pulse delay-75 pointer-events-none"></div>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 border-2 border-black rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
        1
      </div>
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

export function renderFullApp(url: string = '/') {
  const helmetContext: any = {};
  
  const rawHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <FloatingWhatsApp />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/our-company" element={<OurCompanyPage />} />
              <Route path="/about/our-team" element={<OurTeamPage />} />
              <Route path="/about/our-process" element={<OurProcessPage />} />
              <Route path="/about/careers" element={<CareersPage />} />
              <Route path="/solutions/fintech" element={<FintechSolutionsPage />} />
              <Route path="/solutions/healthcare" element={<HealthcarePlatformsPage />} />
              <Route path="/solutions/ai-automation" element={<AIAutomationPage />} />
              <Route path="/solutions/e-commerce" element={<ECommerceDevelopmentPage />} />
              <Route path="/solutions/edtech" element={<EdTechPlatformsPage />} />
              <Route path="/news" element={<Navigate to="/news/latest" replace />} />
              <Route path="/news/latest" element={<LatestNewsPage />} />
              <Route path="/news/press-releases" element={<PressReleasesPage />} />
              <Route path="/news/industry-insights" element={<IndustryInsightsPage />} />
              <Route path="/news/all" element={<AllNewsPage />} />
              <Route path="/custom-software" element={<CustomSoftwarePage />} />
              <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
              <Route path="/web-development" element={<WebDevelopmentPage />} />
              <Route path="/ai-agent-development" element={<AIAgentDevelopmentPage />} />
              <Route path="/seo-mastery" element={<SEOPage />} />
              <Route path="/local-seo-for-small-business" element={<LocalSEOSmallBusinessPage />} />
              <Route path="/local-seo-citation-building" element={<LocalSEOCitationBuildingPage />} />
              <Route path="/white-label-local-seo" element={<WhiteLabelLocalSEOPage />} />
              <Route path="/local-seo-audit" element={<LocalSEOAuditPage />} />
              <Route path="/graphics-design" element={<GraphicsDesignPage />} />
              <Route path="/content-writing" element={<ContentWritingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/us-market" element={<USMarketPage />} />
              <Route path="/uk-market" element={<UKMarketPage />} />
              <Route path="/pakistan-market" element={<PakistanMarketPage />} />
              <Route path="/canada-market" element={<CanadaMarketPage />} />
              <Route path="/poland-market" element={<PolandMarketPage />} />
              <Route path="/australia-market" element={<AustraliaMarketPage />} />
              <Route path="/brand-assets" element={<BrandAssetsPage />} />
              <Route path="/website-contract" element={<WebsiteContractPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/tajweedpage" element={<CaseStudyTajweedPage />} />
              <Route path="/news/article/:id" element={<NewsArticlePage />} />
              <Route path="/news/read/:id" element={<NewsArticlePage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </StaticRouter>
    </HelmetProvider>
  );

  // Extract all hoisted head tags (preloads, titles, meta tags hoisted by React / Helmet)
  let headTags = '';
  let bodyHtml = rawHtml;
  
  const headElementsRegex = /^(?:<link\b[^>]*\/?>|<meta\b[^>]*\/?>|<title\b[^>]*>[\s\S]*?<\/title>|<style\b[^>]*>[\s\S]*?<\/style>)+/i;
  const match = rawHtml.match(headElementsRegex);
  if (match) {
    headTags = match[0];
    bodyHtml = rawHtml.substring(match[0].length);
  }

  return {
    rawHtml,
    headTags,
    bodyHtml,
    helmet: helmetContext.helmet
  };
}

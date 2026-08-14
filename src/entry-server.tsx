import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Direct synchronous imports for SSR to avoid Suspense fallback during server rendering
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

// Solutions Pages
import FintechSolutionsPage from './pages/solutions/FintechSolutionsPage';
import HealthcarePlatformsPage from './pages/solutions/HealthcarePlatformsPage';
import AIAutomationPage from './pages/solutions/AIAutomationPage';
import ECommerceDevelopmentPage from './pages/solutions/ECommerceDevelopmentPage';
import EdTechPlatformsPage from './pages/solutions/EdTechPlatformsPage';

// About Pages
import OurCompanyPage from './pages/about/OurCompanyPage';
import OurTeamPage from './pages/about/OurTeamPage';
import OurProcessPage from './pages/about/OurProcessPage';
import CareersPage from './pages/about/CareersPage';

// News Pages
import LatestNewsPage from './pages/news/LatestNewsPage';
import PressReleasesPage from './pages/news/PressReleasesPage';
import IndustryInsightsPage from './pages/news/IndustryInsightsPage';
import AllNewsPage from './pages/news/AllNewsPage';
import NewsArticlePage from './pages/news/NewsArticlePage';

// Market & Legal Pages
import USMarketPage from './pages/USMarketPage';
import UKMarketPage from './pages/UKMarketPage';
import PakistanMarketPage from './pages/PakistanMarketPage';
import CanadaMarketPage from './pages/CanadaMarketPage';
import PolandMarketPage from './pages/PolandMarketPage';
import AustraliaMarketPage from './pages/AustraliaMarketPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPostPage from './pages/BlogPostPage';
import CaseStudyTajweedPage from './pages/CaseStudyTajweedPage';
import WebsiteContractPage from './pages/WebsiteContractPage';

export function render(url: string) {
  const helmetContext: any = {};

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
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

          {/* Service Pages */}
          <Route path="/custom-software" element={<CustomSoftwarePage />} />
          <Route path="/custom-software-development" element={<Navigate to="/custom-software" replace />} />
          <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
          <Route path="/web-development" element={<WebDevelopmentPage />} />
          <Route path="/ai-agent-development" element={<AIAgentDevelopmentPage />} />
          <Route path="/seo-mastery" element={<SEOPage />} />
          <Route path="/local-seo-services" element={<Navigate to="/seo-mastery" replace />} />
          <Route path="/local-seo-for-small-business" element={<LocalSEOSmallBusinessPage />} />
          <Route path="/local-seo-small-business" element={<Navigate to="/local-seo-for-small-business" replace />} />
          <Route path="/local-seo-citation-building" element={<LocalSEOCitationBuildingPage />} />
          <Route path="/white-label-local-seo" element={<WhiteLabelLocalSEOPage />} />
          <Route path="/local-seo-audit" element={<LocalSEOAuditPage />} />
          <Route path="/graphics-design" element={<GraphicsDesignPage />} />
          <Route path="/content-writing" element={<ContentWritingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Market Pages */}
          <Route path="/us-market" element={<USMarketPage />} />
          <Route path="/uk-market" element={<UKMarketPage />} />
          <Route path="/pakistan-market" element={<PakistanMarketPage />} />
          <Route path="/canada-market" element={<CanadaMarketPage />} />
          <Route path="/poland-market" element={<PolandMarketPage />} />
          <Route path="/australia-market" element={<AustraliaMarketPage />} />
          
          {/* Content Pages */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/agentic-ai-production-failures" element={<BlogPostPage overrideSlug="agentic-ai-production-failures" />} />
          <Route path="/blog/agentic-ai-production-failures" element={<BlogPostPage overrideSlug="agentic-ai-production-failures" />} />
          <Route path="/what-does-a-custom-web-development-company-do" element={<BlogPostPage overrideSlug="what-does-a-custom-web-development-company-do" />} />
          <Route path="/blog/what-does-a-custom-web-development-company-do" element={<BlogPostPage overrideSlug="what-does-a-custom-web-development-company-do" />} />
          <Route path="/custom-ai-solutions-for-corporate-events-2026-guide" element={<BlogPostPage overrideSlug="custom-ai-solutions-for-corporate-events-2026-guide" />} />
          <Route path="/blog/custom-ai-solutions-for-corporate-events-2026-guide" element={<BlogPostPage overrideSlug="custom-ai-solutions-for-corporate-events-2026-guide" />} />
          <Route path="/custom-web-development-vs-website-templates-2026-guide" element={<BlogPostPage overrideSlug="custom-web-development-vs-website-templates-2026-guide" />} />
          <Route path="/blog/custom-web-development-vs-website-templates-2026-guide" element={<BlogPostPage overrideSlug="custom-web-development-vs-website-templates-2026-guide" />} />
          <Route path="/custom-web-development-vs-templates" element={<Navigate to="/blog/custom-web-development-vs-website-templates-2026-guide" replace />} />
          <Route path="/blog/custom-web-development-vs-templates" element={<Navigate to="/blog/custom-web-development-vs-website-templates-2026-guide" replace />} />
          <Route path="/blog/custom-ai-solutions-for-corporate-events" element={<Navigate to="/blog/custom-ai-solutions-for-corporate-events-2026-guide" replace />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/tajweedpage" element={<CaseStudyTajweedPage />} />
          <Route path="/website-contract" element={<WebsiteContractPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet };
}

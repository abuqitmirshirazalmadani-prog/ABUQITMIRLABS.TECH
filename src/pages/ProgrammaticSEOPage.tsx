import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  Terminal, 
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Lock,
  Zap,
  Globe2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { getProgrammaticSEOPage, programmaticSEOPages } from '../data/programmatic-seo';

export default function ProgrammaticSEOPage() {
  const { industry, service } = useParams<{ industry?: string; service?: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pageData = getProgrammaticSEOPage(industry || '', service || '');

  if (!pageData) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-32 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-display font-bold">Solution Dossier Not Found</h1>
            <p className="text-neutral-400 text-sm">
              We could not find an engineering blueprint for <code className="text-[#ccff00]">/solutions/{industry}/{service}</code>.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                to="/solutions/fintech/web-development"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b8e600] transition-colors"
              >
                View Fintech Blueprint
              </Link>
              <Link 
                to="/contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-neutral-800 text-white font-medium text-sm hover:bg-neutral-900 transition-colors"
              >
                Custom Inquiries
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalUrl = `https://www.abuqitmirlabs.tech/solutions/${pageData.slug}`;

  // JSON-LD Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': `${pageData.service} for ${pageData.industry} in ${pageData.location}`,
    'serviceType': pageData.service,
    'description': pageData.description,
    'provider': {
      '@type': 'Organization',
      'name': 'AbuQitmirLabs',
      'url': 'https://www.abuqitmirlabs.tech',
      'logo': 'https://www.abuqitmirlabs.tech/logo.png',
      'sameAs': [
        'https://twitter.com/abuqitmirlabs',
        'https://linkedin.com/company/abuqitmirlabs'
      ]
    },
    'areaServed': {
      '@type': 'Place',
      'name': pageData.location
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${pageData.industry} Engineering Capabilities`,
      'itemListElement': pageData.techStack.map((tech, idx) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': tech
        },
        'position': idx + 1
      }))
    }
  };

  // JSON-LD FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': pageData.faq.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#ccff00]/30 selection:text-[#ccff00]">
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph Social Tags */}
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="AbuQitmirLabs" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.title} />
        <meta name="twitter:description" content={pageData.description} />

        {/* Structured Data: Service + FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
          <Breadcrumbs 
            customItems={[
              { name: 'Solutions', to: '/solutions' },
              { name: pageData.industry, to: `/solutions/${industry}` },
              { name: pageData.service, to: `/solutions/${pageData.slug}` }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative px-6 pt-6 pb-20 border-b border-neutral-900 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.06)_0%,_transparent_70%)] pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto space-y-8 animate-enter">
            {/* Meta Tags / Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30">
                <Sparkles className="w-3.5 h-3.5" />
                Specialized Solution
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800">
                <MapPin className="w-3 h-3 text-neutral-300" />
                {pageData.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800">
                <Globe2 className="w-3 h-3 text-neutral-300" />
                Industry: {pageData.industry}
              </span>
            </div>

            {/* H1 Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.08] text-white animate-enter-delay-1">
              {pageData.service} for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-neutral-400">
                {pageData.industry} in {pageData.location}
              </span>
            </h1>

            {/* Direct Answer Box (GEO / AI Overviews Grounding) */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-[#ccff00]/30 shadow-[0_0_30px_rgba(204,255,0,0.05)] animate-enter-delay-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ccff00] font-semibold">
                  Executive Briefing & AI Overview Grounding
                </span>
              </div>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                {pageData.directAnswer}
              </p>
            </div>

            {/* CTA Strip with Internal Linking */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold text-base hover:bg-[#b8e600] transition-transform duration-200 active:scale-[0.98] shadow-lg shadow-[#ccff00]/10"
              >
                <span>Schedule Architecture Scoping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-300 font-medium text-sm hover:text-white hover:border-neutral-700 transition-colors"
              >
                <span>Read Verified Case Studies (e.g. TajweedPage.com)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Compliance & Tech Stack Section */}
        <section className="px-6 py-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Regulatory & Security Compliance Card */}
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-colors space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Jurisdictional Compliance</h2>
                  <p className="text-xs font-mono text-neutral-400">Governance & Regulatory Standards</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-black/60 border border-neutral-800/60">
                <p className="text-sm font-mono text-[#ccff00] font-medium leading-relaxed">
                  {pageData.compliance}
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                  <span>Sovereign data residency & local encryption standards</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                  <span>Automated penetration test logging & audit trails</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                  <span>Role-based access security adhering to regional mandates</span>
                </li>
              </ul>
            </div>

            {/* Production Tech Stack Card */}
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-colors space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Battle-Tested Architecture</h2>
                  <p className="text-xs font-mono text-neutral-400">Core Modern Tech Stack</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pageData.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-black/60 border border-neutral-800 text-xs font-mono text-neutral-200"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                    <span className="truncate">{tech}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans pt-2">
                All software systems are built without low-code shortcuts, delivering full intellectual property ownership, zero vendor lock-in, and sub-100ms response performance.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="px-6 py-20 border-t border-neutral-900 bg-neutral-950/40">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800">
                <HelpCircle className="w-3.5 h-3.5 text-[#ccff00]" />
                Technical & Commercial Inquiries
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto">
                Detailed answers regarding {pageData.service.toLowerCase()} deployment, timelines, and compliance in {pageData.location}.
              </p>
            </div>

            <div className="space-y-4">
              {pageData.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-neutral-800 bg-neutral-900/30 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-900/60 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-medium text-white pr-4">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-800/40 font-light">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Solutions Cross-Links for PageRank Distribution */}
        <section className="px-6 py-20 max-w-6xl mx-auto border-t border-neutral-900">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">Explore Other Regional Blueprints</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  High-intent programmatic engineering blueprints across key technology hubs.
                </p>
              </div>
              <Link 
                to="/case-studies"
                className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1"
              >
                <span>View all client case studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {programmaticSEOPages
                .filter((p) => p.slug !== pageData.slug)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.slug}
                    to={`/solutions/${p.slug}`}
                    className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-900/30 hover:bg-neutral-900/70 hover:border-[#ccff00]/40 transition-all group"
                  >
                    <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-wider block mb-1">
                      {p.location}
                    </span>
                    <h4 className="text-base font-semibold text-white group-hover:text-[#ccff00] transition-colors">
                      {p.service} for {p.industry}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                      {p.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Global Conversion CTA */}
        <section className="px-6 py-24 bg-gradient-to-b from-[#050505] to-black border-t border-neutral-900 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#ccff00] uppercase font-semibold">
              Ready to Engineer Your System?
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              We Were Engineers First. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-neutral-400">
                Now We Engineer Growth.
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
              Most agencies deliver reports. We deliver systems with 98% client retention and zero fluff.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-bold text-sm hover:bg-[#b8e600] transition-all shadow-lg shadow-[#ccff00]/10"
              >
                Initiate Technical Consultation
              </Link>
              <Link
                to="/case-studies"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-neutral-800 text-white font-medium text-sm hover:bg-neutral-900 transition-colors"
              >
                Review Engineering Proof
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

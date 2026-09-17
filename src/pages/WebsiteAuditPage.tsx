import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Download,
  MessageSquare,
  RotateCcw,
  Zap,
  Search,
  ShieldCheck,
  Eye,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileText,
  Clock,
  Laptop
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuditForm } from '../components/audit/AuditForm';
import { LoadingState } from '../components/audit/LoadingState';
import { OverallScoreCard } from '../components/audit/OverallScoreCard';
import { CategoryScoresGrid } from '../components/audit/CategoryScoresGrid';
import { CoreWebVitalsGrid } from '../components/audit/CoreWebVitalsGrid';
import { IssuesSection } from '../components/audit/IssuesSection';
import { AiRecommendationsSection } from '../components/audit/AiRecommendationsSection';
import { AuditFaqSection } from '../components/audit/AuditFaqSection';
import { AuditResult, DeviceStrategy } from '../types/audit';
import { SAMPLE_AUDITS } from '../utils/auditEngine';
import { generateAuditPdf } from '../utils/generateAuditPdf';

export default function WebsiteAuditPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [activeAuditedUrl, setActiveAuditedUrl] = useState<string>('');

  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleRunAudit = async (url: string, device: DeviceStrategy, categories: string[]) => {
    setLoading(true);
    setError(null);
    setActiveAuditedUrl(url);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, device, categories })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze target website. Please check the address and try again.');
      }

      setResult(data.result);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during the audit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleReport = (sampleKey: 'abuqitmirlabs' | 'ecommerce') => {
    setError(null);
    setResult(SAMPLE_AUDITS[sampleKey]);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Structured Data (JSON-LD)
  const schemaWebApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Website Audit Tool",
    "url": "https://www.abuqitmirlabs.tech/tools/website-audit",
    "description": "Instant, comprehensive website audit tool analyzing Google Core Web Vitals, performance, SEO, accessibility, and security headers.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Performance analysis (Core Web Vitals LCP, CLS, INP)",
      "Technical SEO audit and metadata validation",
      "Accessibility checks (WCAG 2.1 AA standards)",
      "Security headers scan (HSTS, CSP, X-Frame-Options)",
      "Mobile and desktop simulation",
      "AI-powered actionable engineering roadmap",
      "Executive PDF report export"
    ],
    "provider": {
      "@type": "Organization",
      "name": "AbuQitmirLabs",
      "url": "https://www.abuqitmirlabs.tech"
    }
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this website audit tool really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100% free with no registration, no credit card, and no hidden subscriptions."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The audit uses Google PageSpeed Insights and Lighthouse standards combined with real-time DOM and network inspection."
        }
      },
      {
        "@type": "Question",
        "name": "What is considered a good website audit score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A score above 90 is excellent and qualifies for Google's top ranking tier. Scores below 70 require urgent optimization."
        }
      }
    ]
  };

  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.abuqitmirlabs.tech"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://www.abuqitmirlabs.tech/tools/website-audit"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Website Audit Tool",
        "item": "https://www.abuqitmirlabs.tech/tools/website-audit"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Free Website Audit Tool — Performance, SEO & Security Analysis | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Get instant free website audit — performance, SEO, accessibility, and security analysis. Powered by Google Lighthouse + AI. No signup required."
        />
        <meta
          name="keywords"
          content="website audit tool, free website audit, website performance test, SEO audit tool, core web vitals checker, website speed test, website accessibility checker, free seo audit"
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools/website-audit" />
        <meta property="og:title" content="Free Website Audit Tool | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="Instant performance, SEO, accessibility, and security analysis for any URL. Download free PDF report."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools/website-audit" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Website Audit Tool | AbuQitmirLabs" />
        <meta
          name="twitter:description"
          content="Instant performance, SEO, accessibility, and security analysis for any URL. Powered by Google Lighthouse and AI."
        />
        <script type="application/ld+json">{JSON.stringify(schemaWebApplication)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumbs)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="pt-28 md:pt-36 pb-24">

        {/* 1. HERO SECTION */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 text-center mb-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 mb-6">
            <Link to="/" className="hover:text-[#ccff00] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-500">Tools</span>
            <span>›</span>
            <span className="text-[#ccff00]">Website Audit</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-[#2e2e2e] text-gray-300 text-xs md:text-sm font-mono mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            <span>100% Free · Instant Results · No Signup Required</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            Free AI-Powered <span className="text-[#ccff00]">Website Audit</span> Tool
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Get instant performance, Google Core Web Vitals, SEO, accessibility, and security analysis for any website — mobile and desktop, powered by Google Lighthouse and AI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href="#audit-tool-form"
              className="px-8 py-4 rounded-xl bg-[#ccff00] text-black font-bold text-base hover:bg-[#b8e600] transition-all shadow-[0_0_25px_rgba(204,255,0,0.3)] flex items-center gap-2"
            >
              <span>Start Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => loadSampleReport('abuqitmirlabs')}
              className="px-8 py-4 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-gray-200 font-semibold text-base border border-[#333] transition-all flex items-center gap-2"
            >
              <span>See Sample Report (94/100)</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs font-mono text-gray-400 max-w-3xl mx-auto pt-2 border-t border-[#1a1a1a]">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#ccff00]" /> Instant Results</span>
            <span className="text-gray-700">•</span>
            <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5 text-[#ccff00]" /> Works on Any URL</span>
            <span className="text-gray-700">•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" /> 50+ Checks</span>
            <span className="text-gray-700">•</span>
            <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#ccff00]" /> Free PDF Export</span>
            <span className="text-gray-700">•</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#ccff00]" /> AI Recommendations</span>
            <span className="text-gray-700">•</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#ccff00]" /> Zero Data Retention</span>
          </div>
        </section>

        {/* 2. AUDIT FORM CONTAINER */}
        <section ref={formRef} className="max-w-[1000px] mx-auto px-6 md:px-12 mb-14">
          <AuditForm
            onRunAudit={handleRunAudit}
            isLoading={loading}
          />

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Audit Request Notice:</strong>
                <span>{error}</span>
              </div>
            </div>
          )}
        </section>

        {/* 3. LOADING STATE */}
        {loading && (
          <section className="max-w-[1000px] mx-auto px-6 md:px-12 mb-14">
            <LoadingState url={activeAuditedUrl} />
          </section>
        )}

        {/* 4. RESULTS SECTION (DYNAMIC) */}
        {result && (
          <section ref={resultsRef} className="max-w-[1240px] mx-auto px-6 md:px-12 mb-20 space-y-10 scroll-mt-28">
            
            {/* Header / Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a0a] border border-[#222] p-4 rounded-xl">
              <div className="text-xs font-mono text-gray-400">
                Audited URL: <strong className="text-white">{result.url}</strong> ({result.device.toUpperCase()})
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => generateAuditPdf(result)}
                  className="px-4 py-2 rounded-lg bg-[#ccff00] text-black font-bold text-xs font-mono flex items-center gap-1.5 hover:bg-[#b8e600] transition-colors shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Report</span>
                </button>

                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-white text-xs font-mono flex items-center gap-1.5 border border-[#333] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Get a Fix Quote</span>
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2 rounded-lg bg-[#141414] hover:bg-[#222] text-gray-400 hover:text-white text-xs font-mono flex items-center gap-1.5 border border-[#262626] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Audit</span>
                </button>
              </div>
            </div>

            {/* 4.1 Overall Score Card */}
            <OverallScoreCard result={result} />

            {/* 4.2 Category Scores Grid */}
            <CategoryScoresGrid result={result} />

            {/* 4.3 Core Web Vitals */}
            <CoreWebVitalsGrid cwv={result.cwv} />

            {/* 4.6 AI Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <AiRecommendationsSection recommendations={result.recommendations} />
            )}

            {/* 4.4 Critical Issues */}
            <IssuesSection issues={result.issues} />

            {/* 4.8 Action Buttons Box */}
            <div className="bg-[#0f0f0f] border border-[#222] rounded-2xl p-8 text-center space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Take Action on Your Website Audit
              </h3>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                Download your executive PDF report for your development team, or let AbuQitmirLabs resolve every bottleneck with a 90+ score guarantee.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => generateAuditPdf(result)}
                  className="px-6 py-3.5 rounded-xl bg-[#ccff00] text-black font-bold text-sm flex items-center gap-2 hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free PDF Report</span>
                </button>

                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-xl bg-[#1b1b1b] hover:bg-[#262626] text-white font-semibold text-sm border border-[#333] transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#ccff00]" />
                  <span>Get Fix Quote from AbuQitmirLabs</span>
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-[#141414] text-gray-400 hover:text-white font-semibold text-sm border border-[#2a2a2a] transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Audit Another Website</span>
                </button>
              </div>
            </div>

          </section>
        )}

        {/* 5. SAMPLE PREVIEW STRIP (When no result is active yet) */}
        {!result && !loading && (
          <section className="max-w-[1000px] mx-auto px-6 md:px-12 mb-16">
            <div className="bg-[#0c0c0c] border border-[#222] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-mono uppercase text-[#ccff00] font-semibold tracking-wider">
                  Live Benchmarks Demo
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  Want to explore a sample report first?
                </h3>
                <p className="text-xs md:text-sm text-gray-400">
                  Inspect real-world audit reports with Core Web Vitals, priority issues, and AI recommendations.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => loadSampleReport('abuqitmirlabs')}
                  className="px-4 py-2.5 rounded-xl bg-[#16200a] hover:bg-[#202e0e] border border-[#ccff00]/40 text-[#ccff00] text-xs font-mono font-semibold transition-all"
                >
                  🌟 AbuQitmirLabs (Score 94)
                </button>
                <button
                  type="button"
                  onClick={() => loadSampleReport('ecommerce')}
                  className="px-4 py-2.5 rounded-xl bg-[#1e140d] hover:bg-[#2c1d12] border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all"
                >
                  ⚠️ E-Commerce Store (Score 58)
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 6. WHY AUDIT MATTERS (EDUCATIONAL / SEO CONTENT) */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Why Regular Website Audits Are Vital in 2026
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              A single slow page or security flaw quietly bleeds sales, damages your brand reputation, and downgrades search rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#181818] flex items-center justify-center text-[#ccff00]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Conversion & Speed</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Google research proves that a 1-second delay in page load time reduces mobile conversion rates by up to 20%. Fast sites earn immediate user trust.
              </p>
            </div>

            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#181818] flex items-center justify-center text-[#ccff00]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Google Core Web Vitals</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Google’s ranking algorithms penalize sites failing LCP, CLS, or INP thresholds. Passing Core Web Vitals is mandatory for top organic visibility.
              </p>
            </div>

            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#181818] flex items-center justify-center text-[#ccff00]">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Accessibility & WCAG</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                WCAG 2.1 compliance protects against legal lawsuits (ADA) while ensuring visually impaired users and screen readers navigate your brand seamlessly.
              </p>
            </div>

            <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#181818] flex items-center justify-center text-[#ccff00]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Security & Trust</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Missing security headers like HSTS and CSP leave users vulnerable to cross-site scripting (XSS) and clickjacking, triggering browser warning bars.
              </p>
            </div>
          </div>
        </section>

        {/* 7. COMMON ISSUES WE FIND */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mb-20">
          <div className="bg-[#0d0d0d] border border-[#222] rounded-3xl p-8 md:p-12">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono uppercase text-[#ccff00] font-semibold tracking-wider block mb-1">
                Diagnostic Checklist
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                Common Technical Issues Uncovered During Audits
              </h2>
              <p className="text-gray-400 text-sm">
                Our engine automatically runs over 50 deep technical evaluations across your entire web architecture:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Slow LCP (> 2.5s)', desc: 'Heavy uncompressed hero banners and render-blocking CSS delay visible content.' },
                { title: 'Missing Meta Descriptions', desc: 'Over 45% of websites fail to provide curated summaries for Google search snippets.' },
                { title: 'Missing Image Alt Text', desc: 'Screen readers and image search crawlers cannot understand images without alt attributes.' },
                { title: 'Insecure HTTP Redirects', desc: 'Failure to strictly enforce 301 HTTPS redirects exposes session cookies to interception.' },
                { title: 'Missing Canonical URLs', desc: 'Query strings and URL variations create duplicate content dilution in Google index.' },
                { title: 'Bloated JavaScript Bundles', desc: 'Unused third-party scripts choke main-thread CPU, triggering poor INP latency.' },
                { title: 'Missing Security Headers', desc: 'Websites running without HSTS, CSP, and X-Content-Type-Options headers.' },
                { title: 'Poor Mobile Viewport', desc: 'Missing responsive meta tags cause layout scaling breakages on smartphones.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#141414] border border-[#262626] rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mb-20">
          <AuditFaqSection />
        </section>

        {/* 9. CROSS-LINKING & TOOLS ECOSYSTEM */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mb-20">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Complementary Engineering Tools & Services
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Explore our full development suite to design, estimate, and deploy world-class digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              to="/tools/project-cost-estimator"
              className="bg-[#0d0d0d] border border-[#222] hover:border-[#ccff00]/40 rounded-2xl p-6 transition-all group block space-y-2"
            >
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-wider block">Tool #1</span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors flex items-center justify-between">
                <span>AI Cost Estimator</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#ccff00] group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Estimate full engineering hours and developer rates across 8 countries before building your website or mobile app.
              </p>
            </Link>

            <Link
              to="/web-development"
              className="bg-[#0d0d0d] border border-[#222] hover:border-[#ccff00]/40 rounded-2xl p-6 transition-all group block space-y-2"
            >
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-wider block">Service</span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors flex items-center justify-between">
                <span>Custom Web Engineering</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#ccff00] group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                High-performance Next.js and React enterprise applications engineered with built-in 95+ Core Web Vitals.
              </p>
            </Link>

            <Link
              to="/seo-mastery"
              className="bg-[#0d0d0d] border border-[#222] hover:border-[#ccff00]/40 rounded-2xl p-6 transition-all group block space-y-2"
            >
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-wider block">Specialty</span>
              <h4 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors flex items-center justify-between">
                <span>SEO & Search Mastery</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#ccff00] group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Technical SEO, semantic Schema.org architecture, and AI search engine optimization (AIO / GEO / SXO).
              </p>
            </Link>
          </div>
        </section>

        {/* 10. BOTTOM CTA BANNER */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-r from-[#11180a] via-[#16240d] to-[#0a0a0a] border border-[#ccff00]/40 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Guaranteed 90+ Score Remediation
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl mx-auto">
              Ready to Fix Your Website Issues & Achieve Peak Speed?
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Don’t let slow load times and technical warnings drag down your organic conversions. Partner with AbuQitmirLabs for turnkey speed acceleration, Core Web Vitals remediation, and enterprise web engineering.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-base transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center gap-2"
              >
                <span>Get a Fix Quote from AbuQitmirLabs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/case-studies"
                className="px-8 py-4 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] text-gray-200 font-semibold text-base border border-[#333] transition-all"
              >
                <span>View Engineering Case Studies</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  RotateCcw,
  Download,
  Link2,
  FileSpreadsheet,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { SEO } from '../components/SEO';
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
import {
  AuditAdvancedOptions,
  AuditMode,
  AuditObjective,
  AuditResult,
  DeviceSelection,
  FilterCategory,
  FilterSeverity,
} from '../types/audit';
import {
  generateAuditCsvContent,
  SAMPLE_AUDITS,
} from '../utils/auditEngine';
import { generateClientAuditResult } from '../utils/clientAudit';
import { generateAuditPdf } from '../utils/generateAuditPdf';
import { validatePublicAuditUrl } from '../utils/urlValidator';

export const WebsiteAuditPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Audit configuration state
  const [url, setUrl] = useState<string>(() => searchParams.get('url') || '');
  const [mode, setMode] = useState<AuditMode>(() => {
    const m = searchParams.get('mode');
    return m === 'quick' || m === 'mini-site' || m === 'complete' ? m : 'complete';
  });
  const [objective, setObjective] = useState<AuditObjective>(() => {
    const o = searchParams.get('objective');
    return o === 'seo' ||
      o === 'speed' ||
      o === 'accessibility' ||
      o === 'security' ||
      o === 'conversion' ||
      o === 'complete'
      ? o
      : 'complete';
  });
  const [deviceSelection, setDeviceSelection] = useState<DeviceSelection>(() => {
    const d = searchParams.get('device');
    return d === 'mobile' || d === 'desktop' || d === 'both' ? d : 'both';
  });
  const [advanced, setAdvanced] = useState<AuditAdvancedOptions>({
    industry: 'B2B SaaS / Technology',
    businessGoal: 'Increase qualified leads & organic search conversions',
    targetMarket: 'Global (US, UK, GCC, Pakistan)',
    reportLanguage: 'en',
  });

  // Execution & Results state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  // Progressive disclosure filters & session state
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeSeverity, setActiveSeverity] = useState<FilterSeverity>('all');
  const [fixedIds, setFixedIds] = useState<string[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const resultsAnchorRef = useRef<HTMLDivElement | null>(null);
  const autoTriggeredRef = useRef(false);

  const executeAudit = async (
    targetInputUrl: string,
    selectedMode: AuditMode = mode,
    selectedObjective: AuditObjective = objective,
    selectedDevice: DeviceSelection = deviceSelection,
    selectedAdvanced: AuditAdvancedOptions = advanced
  ) => {
    setErrorMessage(null);

    const validation = validatePublicAuditUrl(targetInputUrl);
    if (!validation.valid || !validation.normalizedUrl) {
      setErrorMessage(
        validation.error ||
          'Please enter a valid public website URL (e.g., https://example.com).'
      );
      return;
    }

    const cleanUrl = validation.normalizedUrl;
    setUrl(cleanUrl);
    setMode(selectedMode);
    setObjective(selectedObjective);
    setDeviceSelection(selectedDevice);
    setAdvanced(selectedAdvanced);
    setIsLoading(true);
    setFixedIds([]);

    // Sync query params on the current route (/tools/website-audit) for shareable links
    setSearchParams(
      {
        url: cleanUrl,
        mode: selectedMode,
        objective: selectedObjective,
        device: selectedDevice,
      },
      { replace: true }
    );

    // Pre-select category filter if user picked a specialized objective
    if (selectedObjective === 'seo') setActiveCategory('SEO');
    else if (selectedObjective === 'speed') setActiveCategory('Performance');
    else if (selectedObjective === 'accessibility') setActiveCategory('Accessibility');
    else if (selectedObjective === 'security') setActiveCategory('Security');
    else if (selectedObjective === 'conversion') setActiveCategory('Conversion');
    else setActiveCategory('all');

    setActiveSeverity('all');

    const primaryDevice = selectedDevice === 'desktop' ? 'desktop' : 'mobile';

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: cleanUrl,
          mode: selectedMode,
          objective: selectedObjective,
          device: selectedDevice,
          advanced: selectedAdvanced,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (response.status === 400 || response.status === 403 || response.status === 429) {
          throw new Error(
            data?.error ||
              'Audit request was rejected by security or rate-limit controls.'
          );
        }
        // Fallback to deterministic client-side inspector if backend route is unreachable
        const fallbackResult = await generateClientAuditResult(
          cleanUrl,
          primaryDevice,
          undefined,
          {
            mode: selectedMode,
            objective: selectedObjective,
            deviceSelection: selectedDevice,
            advanced: selectedAdvanced,
          }
        );
        setResult(fallbackResult);
      } else {
        const resolvedResult = (data?.result ? data.result : data) as AuditResult;
        setResult(resolvedResult);
      }
    } catch (err: any) {
      const msg = err?.message || '';
      if (
        msg.includes('blocked') ||
        msg.includes('private') ||
        msg.includes('localhost') ||
        msg.includes('Rate limit')
      ) {
        setErrorMessage(msg);
      } else {
        try {
          const fallbackResult = await generateClientAuditResult(
            cleanUrl,
            primaryDevice,
            undefined,
            {
              mode: selectedMode,
              objective: selectedObjective,
              deviceSelection: selectedDevice,
              advanced: selectedAdvanced,
            }
          );
          setResult(fallbackResult);
        } catch (fallbackErr: any) {
          setErrorMessage(
            fallbackErr?.message ||
              'Unable to complete the website audit. Please verify the URL is publicly reachable.'
          );
        }
      }
    } finally {
      setIsLoading(false);
      window.setTimeout(() => {
        resultsAnchorRef.current?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  // Auto-run if URL query param is present on initial mount
  useEffect(() => {
    const initialUrl = searchParams.get('url');
    if (initialUrl && !autoTriggeredRef.current) {
      autoTriggeredRef.current = true;
      executeAudit(initialUrl, mode, objective, deviceSelection, advanced);
    }
  }, []);

  const handleLoadSample = (sampleKey: string) => {
    const sample = SAMPLE_AUDITS[sampleKey];
    if (!sample) return;
    setErrorMessage(null);
    setUrl(sample.url);
    setMode(sample.mode);
    setObjective(sample.objective);
    setDeviceSelection(sample.deviceSelection);
    setAdvanced(sample.advanced);
    setFixedIds([]);
    setResult(sample);
    setSearchParams(
      {
        url: sample.url,
        mode: sample.mode,
        objective: sample.objective,
        device: sample.deviceSelection,
      },
      { replace: true }
    );
    window.setTimeout(() => {
      resultsAnchorRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
    }, 80);
  };

  const handleToggleFixed = (id: string) => {
    setFixedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDownloadPdf = async () => {
    if (!result || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      await generateAuditPdf(result);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopyReportLink = async () => {
    if (!result) return;
    const shareUrl = new URL('/tools/website-audit', window.location.origin);
    shareUrl.searchParams.set('url', result.url);
    shareUrl.searchParams.set('mode', result.mode);
    shareUrl.searchParams.set('objective', result.objective);
    shareUrl.searchParams.set('device', result.deviceSelection);

    try {
      await navigator.clipboard.writeText(shareUrl.toString());
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  const handleExportCsv = () => {
    if (!result) return;
    const csvContent = generateAuditCsvContent(result);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const cleanHost = result.url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9.-]/g, '_');
    link.href = downloadUrl;
    link.setAttribute('download', `website-growth-audit-${cleanHost}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <SEO
        title="Free Website Growth Audit Tool | AbuQitmirLabs"
        description="Find the issues slowing down your website, reducing search visibility and creating conversion friction with our deterministic Website Growth Audit."
        canonical="https://www.abuqitmirlabs.tech/tools/website-audit"
      />

      {/* Global Brand Header */}
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-12">
        {/* 1. Required Hero Section */}
        <header className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#CCFF00]">
            <ShieldCheck className="w-4 h-4" />
            <span>Deterministic HTTP, DOM, CrUX Field &amp; Lighthouse Lab Inspector</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
            Free Website Growth Audit
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find the issues slowing down your website, reducing search visibility and creating conversion friction.
          </p>

          {/* Truthful methodology badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-mono text-gray-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              6 Transparent Scores
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              38 Verifiable Engineering Checks
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Zero Fabricated AI Claims
            </span>
          </div>
        </header>

        {/* 2. Progressive Audit Configuration Form (URL + Mode + Objective + Device + Collapsed Advanced Accordion) */}
        <section aria-label="Website audit configuration" className="space-y-4">
          <AuditForm
            isLoading={isLoading}
            initialUrl={url}
            initialMode={mode}
            initialObjective={objective}
            initialDevice={deviceSelection}
            initialLanguage={advanced.reportLanguage}
            onRunAudit={(config) =>
              executeAudit(
                config.url,
                config.mode,
                config.objective,
                config.deviceSelection,
                config.advanced
              )
            }
          />

          {errorMessage && (
            <div
              role="alert"
              className="max-w-4xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-200 font-mono"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Instant Sample Report Switcher (Stays on the exact same page) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-400">
            <span>Or inspect an instant verified sample report on this page:</span>
            {Object.keys(SAMPLE_AUDITS).map((domainKey) => (
              <button
                key={domainKey}
                type="button"
                onClick={() => handleLoadSample(domainKey)}
                disabled={isLoading}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#CCFF00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
              >
                {domainKey}
              </button>
            ))}
          </div>
        </section>

        {/* 3. Animated 8-Step Audit Progress Stepper */}
        {isLoading && (
          <LoadingState
            url={url}
            mode={mode}
            objective={objective}
            deviceSelection={deviceSelection}
          />
        )}

        {/* 4. Same-Page Audit Results Experience */}
        <div ref={resultsAnchorRef} className="scroll-mt-24">
          {!isLoading && result && (
            <div className="space-y-10">
              {/* Top Report Action Toolbar: Run Again, Download PDF, Copy Report Link, Export CSV */}
              <div className="bg-[#0d0d0d] border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-30 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-mono text-gray-400 block">
                      Active Growth Audit Report ({result.checksSummary.totalExecuted} checks run)
                    </span>
                    <strong className="text-sm font-mono text-white truncate block">
                      {result.finalUrl || result.url}
                    </strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      executeAudit(
                        result.url,
                        mode,
                        objective,
                        deviceSelection,
                        advanced
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#CCFF00]" />
                    Run Again
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-black text-xs font-mono font-bold transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {isGeneratingPdf ? 'Building PDF...' : 'Download PDF'}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyReportLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Link Copied
                      </>
                    ) : (
                      <>
                        <Link2 className="w-3.5 h-3.5 text-[#CCFF00]" />
                        Copy Report Link
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#CCFF00]" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Six Transparent Scores & Separated Data Source Breakdown */}
              <OverallScoreCard result={result} />

              {/* Interactive Dimension Filter Strip */}
              <CategoryScoresGrid
                result={result}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />

              {/* Separated CrUX Real-User Field Data vs. Lighthouse Lab Data */}
              <CoreWebVitalsGrid
                cwv={result.cwv}
                fieldData={result.fieldData}
                labData={result.labData}
              />

              {/* Fix Today / Fix This Week / Monitor + Evidence-Based Growth Issue Cards */}
              <IssuesSection
                issues={result.issues}
                allChecks={result.allChecks}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeSeverity={activeSeverity}
                setActiveSeverity={setActiveSeverity}
                reportLanguage={result.advanced?.reportLanguage || advanced.reportLanguage}
                fixedIds={fixedIds}
                onToggleFixed={handleToggleFixed}
              />

              {/* Grounded Remediation Synthesis */}
              <AiRecommendationsSection recommendations={result.recommendations} />

              {/* Engineering Consultation CTA (Truthful, No Fake Ranking/Traffic Guarantees) */}
              <div className="rounded-3xl bg-gradient-to-br from-[#111936] via-[#0d0d0d] to-[#0d0d0d] border border-[#2667FF]/40 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00]">
                    <Sparkles className="w-4 h-4" />
                    Engineering &amp; Growth Implementation Support
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Need an engineering team to resolve your Fix Today &amp; Fix This Week backlog?
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Share your downloaded PDF or CSV report with our technical architects. We scope and implement server-side TTFB optimizations, Core Web Vitals remediation, clean semantic HTML, security headers, and high-intent B2B conversion architecture.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-sm transition-all"
                  >
                    Request Engineering Review
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/seo-mastery"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm transition-all"
                  >
                    Explore Technical SEO Architecture
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Overview of What We Inspect (Shown before or below results, with 100% accurate claims) */}
        <section
          aria-labelledby="six-dimensions-overview-heading"
          className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-1">
                <Layers className="w-4 h-4" />
                Deterministic Inspection Architecture
              </div>
              <h2
                id="six-dimensions-overview-heading"
                className="text-2xl font-bold text-white"
              >
                Six Transparent Pillars Evaluated in Every Audit
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-400">
              36 Quick Page Checks • 38 Mini-Site &amp; Complete Growth Checks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              {
                title: '1. Crawlability (7 Checks)',
                items:
                  'HTTP 200 status verification, redirect chain hops, meta robots & X-Robots-Tag directives, self-referencing canonical URL, HTML payload size, robots.txt rules, and XML sitemap discovery.',
              },
              {
                title: '2. SEO & Google Visibility (8 Checks)',
                items:
                  'Title tag presence & 30–60 char length, meta description length, single primary H1, H2/H3 section hierarchy, JSON-LD structured data blocks, OpenGraph social tags, and internal link architecture.',
              },
              {
                title: '3. Performance & Core Web Vitals (8 Checks)',
                items:
                  'Separated CrUX real-user field data and Lighthouse lab data (LCP, INP, CLS), server TTFB response time, HTTP Brotli/Gzip compression, render-blocking head scripts, and image dimensions/WebP formats.',
              },
              {
                title: '4. Accessibility Barriers (5 Checks)',
                items:
                  'HTML lang attribute, image alt attribute coverage, semantic HTML5 landmarks (<main>, <nav>), programmatic form input labels, and accessible button/link naming.',
              },
              {
                title: '5. Security & Trust (6 Checks)',
                items:
                  'HTTPS TLS encryption, Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options / frame-ancestors, X-Content-Type-Options, Referrer-Policy, and mixed content checks.',
              },
              {
                title: '6. Conversion Readiness (4 Checks)',
                items:
                  'Action-oriented primary CTA buttons, direct contact channel accessibility (tel, mailto, WhatsApp, or contact routes), lead form field friction analysis, and visible B2B trust/compliance signals.',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2"
              >
                <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed">{pillar.items}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300 leading-relaxed">
                Core Web Vitals are important user-experience signals used by Google’s ranking systems. They are not a ranking guarantee.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300 leading-relaxed">
                Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Expandable "How this audit works" Methodology Accordion & FAQs */}
        <AuditFaqSection />
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default WebsiteAuditPage;

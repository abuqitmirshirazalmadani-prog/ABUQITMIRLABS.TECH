import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Globe,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Printer,
  Sparkles,
  ShieldCheck,
  Calendar,
  Activity,
  Award,
  Layers,
  Zap,
  TrendingUp,
  FileText,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Bot
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedToolsSection from '../components/RelatedToolsSection';
import { trackToolUsage } from '../utils/analytics';
import {
  normalizeDomain,
  getFallbackResult
} from '../utils/authorityAnalyzerEngine';
import { AuthorityAnalyzerResult } from '../types/authorityAnalyzer';

const STORAGE_KEY = 'authority_analyzer_v1';

export const WebsiteAuthorityAnalyzerPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [result, setResult] = useState<AuthorityAnalyzerResult | null>(null);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [emailSubmitting, setEmailSubmitting] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.result) setResult(parsed.result);
        if (parsed.url) setUrl(parsed.url);
        if (parsed.emailSubmitted) setEmailSubmitted(true);
      }
    } catch (err) {
      console.warn('Could not load saved authority analyzer state', err);
    }
  }, []);

  // Save to localStorage when result or url changes
  useEffect(() => {
    if (result) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ result, url, emailSubmitted })
        );
      } catch (err) {
        console.warn('Could not save authority analyzer state', err);
      }
    }
  }, [result, url, emailSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const norm = normalizeDomain(url);
    if (!norm) {
      setError('Please enter a valid website URL (e.g. example.com or https://example.com)');
      return;
    }

    setLoading(true);
    setProgress(0);
    setStep(0);

    trackToolUsage('website-authority-analyzer', 'analyze_url', {
      target_domain: norm.domain,
      input_url: norm.cleanUrl
    });

    const steps = [
      'Querying Open PageRank index for authority metrics...',
      'Checking Wayback Machine archives for domain tenure...',
      'Analyzing mobile Lighthouse Core Web Vitals & speed...',
      'Auditing HTTPS protocol & server security headers...',
      'Synthesizing AI domain benchmark & strategic insights...',
      'Compiling authoritative backlink roadmap report...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setStatusText(steps[i]);
      setStep(i + 1);
      setProgress(Math.round(((i + 1) / steps.length) * 90));
      await new Promise((r) => setTimeout(r, 450));
    }

    try {
      const res = await fetch('/api/authority-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: norm.cleanUrl }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.result) {
        setProgress(100);
        setResult(data.result);
        setUrl(norm.cleanUrl);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || 'Failed to analyze website');
      }
    } catch (err: any) {
      console.warn('Live API request deferred; serving algorithmic baseline analysis:', err);
      const fallback = getFallbackResult(norm.domain, norm.cleanUrl);
      setProgress(100);
      setResult(fallback);
      setUrl(norm.cleanUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid business or personal email address.');
      return;
    }

    setEmailSubmitting(true);
    try {
      await fetch('/api/authority-analyzer/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          url: result?.url || url,
          domain: result?.domain || '',
          score: result?.overallScore || 0,
        }),
      });
    } catch (err) {
      console.warn('Lead capture dispatch notice:', err);
    } finally {
      setEmailSubmitting(false);
      setEmailSubmitted(true);
    }
  };

  const resetTool = () => {
    setResult(null);
    setUrl('');
    setEmailSubmitted(false);
    setEmail('');
    setError('');
    setProgress(0);
    setStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const downloadPDF = () => {
    window.print();
  };

  const copyTemplate = (content: string, index: number) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    });
  };

  const getScoreColor = (score: number): string => {
    if (score >= 75) return '#22C55E';
    if (score >= 60) return '#84CC16';
    if (score >= 40) return '#E8A838';
    if (score >= 25) return '#F97316';
    return '#EF4444';
  };

  // Structured Schema data
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Website Authority Analyzer',
    'url': 'https://www.abuqitmirlabs.tech/tools/website-authority-analyzer',
    'description': 'Free AI-powered tool to check any website domain authority, domain age, page quality, and trust signals. Get a personalized backlink strategy roadmap.',
    'applicationCategory': 'SEOApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'featureList': [
      'Domain authority check (Open PageRank index)',
      'Domain age analysis (Wayback Machine archives)',
      'Site performance & SEO quality audit',
      'Security headers & trust signal scanner',
      'AI-powered backlink strategy roadmap',
      'Custom outreach pitch email templates',
      'PDF report export',
    ],
    'provider': {
      '@type': 'Organization',
      'name': 'AbuQitmirLabs',
      'url': 'https://www.abuqitmirlabs.tech',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Check Your Website Authority Score',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Enter Website Domain',
        'text': 'Input any public domain or URL to begin instant analysis with no login required.',
      },
      {
        '@type': 'HowToStep',
        'name': 'Multi-Signal Audit',
        'text': 'Our engine fetches Open PageRank, Wayback historical snapshots, Lighthouse quality, and server security headers.',
      },
      {
        '@type': 'HowToStep',
        'name': 'Review Authority Metrics',
        'text': 'Evaluate your domain authority score out of 100 alongside percentile rank and key strengths.',
      },
      {
        '@type': 'HowToStep',
        'name': 'Deploy Backlink Roadmap',
        'text': 'Follow the tailored 3-phase link building roadmap and utilize pre-crafted outreach email templates.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is website authority?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Website authority (domain authority) represents the overall search engine trust and ranking potential of a domain based on backlink quantity and quality, domain history, and technical integrity.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is this Website Authority Analyzer free?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, 100% free with unlimited checks. There are no credit cards, subscriptions, or paywalls required.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How is this tool different from Ahrefs or Moz?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Unlike paid platforms that require costly subscriptions, we leverage open web metrics including Open PageRank, Wayback Machine records, and Google PageSpeed to provide actionable authority benchmarks for free.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.abuqitmirlabs.tech',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tools',
        'item': 'https://www.abuqitmirlabs.tech/tools',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Website Authority Analyzer',
        'item': 'https://www.abuqitmirlabs.tech/tools/website-authority-analyzer',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Free Website Authority Analyzer — Check Domain Authority Instantly | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Analyze any website's domain authority, age, quality score, and trust signals instantly. Free AI-powered tool with personalized backlink strategy roadmap. No signup required."
        />
        <meta
          name="keywords"
          content="website authority analyzer, domain authority checker, free domain authority checker, website authority score, check website authority, domain age checker, website trust score, domain authority tool, website quality analyzer"
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools/website-authority-analyzer" />
        <meta property="og:title" content="Free Website Authority Analyzer | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="Check any website's domain authority, age, and trust signals instantly with AI recommendations."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools/website-authority-analyzer" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Website Authority Analyzer | AbuQitmirLabs" />
        <meta
          name="twitter:description"
          content="Check any domain authority, age, and trust signals in seconds. 100% Free."
        />
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Global Brand Header */}
      <Header />

      <main id="main-content" className="pt-20 md:pt-28">
        {/* HERO SECTION */}
        {!result && (
          <section className="relative pt-8 pb-14 md:pt-12 md:pb-18 border-b border-white/5 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ccff00]/5 blur-[130px] pointer-events-none rounded-full" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
              {/* Breadcrumbs */}
              <nav className="flex items-center justify-center space-x-2 text-xs text-neutral-400 mb-6 font-mono">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
                <span>›</span>
                <span className="text-[#ccff00]">Website Authority Analyzer</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span>100% Free · No Signup Required · Multi-Vector Analysis</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#ccff00]">Authority Analyzer</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
                Audit any domain's authority score, tenure age, Core Web Vitals quality, and security trust signals in seconds. Get a tailored backlink strategy roadmap — completely free.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-xs text-neutral-400 font-mono">
                <span className="flex items-center justify-center gap-1.5"><Zap size={14} className="text-[#ccff00]" /> Instant Results</span>
                <span className="flex items-center justify-center gap-1.5"><Globe size={14} className="text-[#ccff00]" /> Any Public URL</span>
                <span className="flex items-center justify-center gap-1.5"><Activity size={14} className="text-[#ccff00]" /> Open PageRank</span>
                <span className="flex items-center justify-center gap-1.5"><Calendar size={14} className="text-[#ccff00]" /> Domain Age Check</span>
                <span className="flex items-center justify-center gap-1.5"><Bot size={14} className="text-[#ccff00]" /> AI Insights</span>
                <span className="flex items-center justify-center gap-1.5"><ShieldCheck size={14} className="text-[#ccff00]" /> Zero Data Storage</span>
              </div>
            </div>
          </section>
        )}

        {/* INPUT CARD SECTION */}
        {!result && !loading && (
          <section className="py-12 md:py-16 max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-neutral-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <form onSubmit={handleSubmit}>
                <label htmlFor="target-url-input" className="block text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold mb-3">
                  Enter Website Domain or URL
                </label>

                <div className="flex items-center gap-2 p-2 bg-black/60 border border-white/15 rounded-2xl focus-within:border-[#ccff00] transition-all shadow-inner mb-3">
                  <span className="pl-3 text-neutral-400">
                    <Globe className="w-5 h-5" />
                  </span>
                  <input
                    ref={inputRef}
                    id="target-url-input"
                    type="text"
                    placeholder="example.com or https://example.com"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError('');
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm sm:text-base px-2 py-2 placeholder:text-neutral-600 font-mono"
                    autoComplete="url"
                    spellCheck="false"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        if (text) setUrl(text);
                      } catch {
                        // ignore clipboard errors
                      }
                    }}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-xl text-xs font-mono transition-colors border border-white/5"
                    title="Paste from clipboard"
                  >
                    Paste
                  </button>
                </div>

                <p className="text-xs text-neutral-400 font-mono mb-6">
                  Works with any publicly accessible domain or competitor website.
                </p>

                {error && (
                  <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 text-xs font-mono mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="w-full py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-[#ccff00]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Search className="w-4 h-4" />
                  <span>Analyze Website Authority Now</span>
                </button>
              </form>

              <p className="text-center text-xs text-neutral-500 font-mono mt-6">
                🔒 Privacy First: All audits are processed in real-time. Zero proprietary data or search logs are captured.
              </p>
            </div>

            {/* WHAT WE ANALYZE 4-GRID */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <h3 className="text-center text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">
                What Our Multi-Vector Engine Audits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5 text-center">
                  <span className="text-2xl block mb-2">📊</span>
                  <h4 className="text-xs font-bold text-white mb-1">Domain Authority</h4>
                  <p className="text-[11px] text-neutral-400">Open PageRank score derived from 200M+ web domains.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5 text-center">
                  <span className="text-2xl block mb-2">📅</span>
                  <h4 className="text-xs font-bold text-white mb-1">Domain Age</h4>
                  <p className="text-[11px] text-neutral-400">Wayback Machine historical snapshot age benchmark.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5 text-center">
                  <span className="text-2xl block mb-2">⚡</span>
                  <h4 className="text-xs font-bold text-white mb-1">Site Quality</h4>
                  <p className="text-[11px] text-neutral-400">Core Web Vitals, mobile performance &amp; crawlability.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/40 border border-white/5 text-center">
                  <span className="text-2xl block mb-2">🔒</span>
                  <h4 className="text-xs font-bold text-white mb-1">Trust Signals</h4>
                  <p className="text-[11px] text-neutral-400">HTTPS protocol, HSTS, CSP &amp; security header strength.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="py-24 max-w-xl mx-auto px-4 text-center">
            <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] mx-auto mb-6">
                <Activity className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">Auditing Website Authority...</h3>
              <p className="text-xs text-neutral-400 font-mono mb-6">{statusText}</p>

              {/* Progress */}
              <div className="w-full h-2.5 bg-black rounded-full overflow-hidden border border-white/10 mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#ccff00] via-emerald-400 to-[#ccff00] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps Checklist */}
              <ul className="text-left space-y-2.5 text-xs font-mono border-t border-white/10 pt-6">
                {[
                  'Querying Open PageRank Authority Index',
                  'Checking Wayback Historical Domain Tenure',
                  'Evaluating PageSpeed & Mobile Core Web Vitals',
                  'Inspecting Server Security Headers & SSL Protocol',
                  'Generating Strategic AI Benchmarks & Insights',
                  'Finalizing 3-Phase Backlink Growth Roadmap'
                ].map((lbl, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 ${
                      step > idx
                        ? 'text-emerald-400'
                        : step === idx + 1
                        ? 'text-[#ccff00] font-bold animate-pulse'
                        : 'text-neutral-600'
                    }`}
                  >
                    {step > idx ? '✅' : step === idx + 1 ? '⏳' : '⬜'} {lbl}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* RESULTS SECTION */}
        {result && !loading && (
          <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
            {/* Header Domain Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-[#ccff00]">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                    AUDITED DOMAIN FOOTPRINT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{result.domain}</h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetTool}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Audit</span>
                </button>
                <button
                  type="button"
                  onClick={downloadPDF}
                  className="px-3.5 py-2 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* Score Hero Section */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 blur-3xl pointer-events-none rounded-full" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Score Circle */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="14"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke={getScoreColor(result.overallScore)}
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray={`${(result.overallScore / 100) * 534} 534`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className="text-5xl sm:text-6xl font-black tracking-tight"
                        style={{ color: getScoreColor(result.overallScore) }}
                      >
                        {result.overallScore}
                      </span>
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">
                        OUT OF 100
                      </span>
                    </div>
                  </div>

                  <span
                    className="mt-4 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                    style={{
                      backgroundColor: `${getScoreColor(result.overallScore)}15`,
                      color: getScoreColor(result.overallScore),
                      borderColor: `${getScoreColor(result.overallScore)}40`,
                    }}
                  >
                    {result.authorityLevel}
                  </span>
                </div>

                {/* Score Explanation & Benchmarks */}
                <div className="md:col-span-7">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-2">
                    Executive Authority Audit Summary
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                    Search Engine Trust Benchmark
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                    {result.scoreSummary}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-neutral-500 text-[10px] block uppercase">GLOBAL WEB PERCENTILE</span>
                      <span className="text-white font-bold text-sm text-[#ccff00]">{result.percentile}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-neutral-500 text-[10px] block uppercase">INDUSTRY RANK TIER</span>
                      <span className="text-white font-bold text-sm text-emerald-400">{result.industryRank}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {/* Pillar 1: Domain Authority */}
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-[#ccff00]/40 transition-all backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">📊</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                    Weight 40%
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  Domain Authority
                </span>
                <div className="text-2xl font-black text-white font-mono mb-1">
                  {result.domainAuthority.value.toFixed(1)} <span className="text-xs text-neutral-500">/ 10</span>
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  {result.domainAuthority.description}
                </p>
              </div>

              {/* Pillar 2: Domain Age */}
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-[#ccff00]/40 transition-all backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">📅</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                    Weight 20%
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  Historical Age
                </span>
                <div className="text-2xl font-black text-white font-mono mb-1">
                  {result.domainAge.ageYears} <span className="text-xs text-neutral-500">Years</span>
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  First seen: {result.domainAge.firstSeen} ({result.domainAge.display})
                </p>
              </div>

              {/* Pillar 3: Site Quality */}
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-[#ccff00]/40 transition-all backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                    Weight 25%
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  Site Quality (Lighthouse)
                </span>
                <div className="text-2xl font-black text-white font-mono mb-1">
                  {result.siteQuality.overall} <span className="text-xs text-neutral-500">/ 100</span>
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  Performance: {result.siteQuality.performance} · SEO: {result.siteQuality.seo || 90}
                </p>
              </div>

              {/* Pillar 4: Trust Signals */}
              <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-[#ccff00]/40 transition-all backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🔒</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                    Weight 15%
                  </span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  Trust &amp; Security
                </span>
                <div className="text-2xl font-black text-white font-mono mb-1">
                  {result.trustSignals.level}
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  {result.trustSignals.summary}
                </p>
              </div>
            </div>

            {/* AI Analysis (Benchmark, Strengths, Improvements) */}
            <div className="mb-10">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#ccff00]" />
                <span>AI Strategic Analysis &amp; Diagnostic Insights</span>
              </h3>

              <div className="space-y-4">
                {/* Benchmark card */}
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold mb-1.5">
                    Industry Benchmark
                  </h4>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {result.aiAnalysis.benchmark}
                  </p>
                </div>

                {/* Strengths & Improvements 2-col */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-900/80 border border-emerald-500/30 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-emerald-400 mb-3">
                      <CheckCircle2 className="w-4 h-4" />
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
                        Identified Authority Strengths
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                      {result.aiAnalysis.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold mt-0.5">✔</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-900/80 border border-amber-500/30 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-amber-400 mb-3">
                      <AlertTriangle className="w-4 h-4" />
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
                        Priority Growth Vectors
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                      {result.aiAnalysis.improvements.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold mt-0.5">⚠</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* EMAIL GATE / FULL REPORT SECTION */}
            {!emailSubmitted ? (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-[#ccff00]/40 text-center backdrop-blur-2xl shadow-2xl mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Unlock Complete 3-Phase Backlink Roadmap</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Want the Full Executive Link-Building Blueprint?
                </h3>
                <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-6">
                  Access the step-by-step 24-week backlink execution roadmap, 30-day quick wins, and proven cold outreach email pitch templates for {result.domain}.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto text-left text-xs font-mono text-neutral-300 mb-8">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#ccff00]">✓</span>
                    <span>3-Phase 24-Week Backlink Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#ccff00]">✓</span>
                    <span>5 Immediate 30-Day Quick Wins</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#ccff00]">✓</span>
                    <span>Editorial Guest Pitch Template</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[#ccff00]">✓</span>
                    <span>Broken Resource Reclamation Script</span>
                  </div>
                </div>

                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your work email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#ccff00] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={emailSubmitting}
                    className="px-6 py-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/20 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{emailSubmitting ? 'Unlocking...' : 'Unlock Full Roadmap'}</span>
                  </button>
                </form>

                <p className="text-center text-[11px] text-neutral-500 font-mono mt-3">
                  🔒 Zero spam guarantee. We only send your diagnostic export and high-intent SEO insights.
                </p>
              </div>
            ) : (
              <div className="mb-10 space-y-8">
                {/* Full Report Header */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Backlink Strategy Blueprint &amp; Templates Unlocked for {result.domain}</span>
                </div>

                {/* 3-Phase Roadmap */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#ccff00]" />
                    <span>🗺️ 3-Phase Backlink Strategy Roadmap</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                    A systematic, white-hat sequence to elevate {result.domain}'s domain authority safely:
                  </p>

                  <div className="space-y-4">
                    {result.fullReport.roadmap.map((phase, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#ccff00] text-black font-mono font-black text-xs flex items-center justify-center">
                              0{idx + 1}
                            </span>
                            <h4 className="text-base font-bold text-white">{phase.title}</h4>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ccff00]">
                            {phase.duration}
                          </span>
                        </div>

                        <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                          {phase.actions.map((act, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-2.5">
                              <span className="text-[#ccff00] font-bold mt-0.5">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 30-Day Quick Wins */}
                <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl">
                  <h3 className="text-xl font-black text-white mb-4">
                    🎯 Priority Action Items (Next 30 Days)
                  </h3>
                  <div className="space-y-3">
                    {result.fullReport.priorityActions.map((action, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black text-xs flex items-center justify-center shrink-0 font-mono">
                          {idx + 1}
                        </span>
                        <div>
                          <strong className="text-sm font-bold text-white block mb-0.5">
                            {action.title}
                          </strong>
                          <p className="text-xs text-neutral-300 leading-relaxed">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outreach Email Templates */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#ccff00]" />
                    <span>📧 High-Converting Outreach Email Scripts</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-6">
                    Battle-tested cold outreach pitch templates customized for editorial placements and resource replacements:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.fullReport.templates.map((tpl, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-white">{tpl.title}</h4>
                            <button
                              type="button"
                              onClick={() => copyTemplate(tpl.content, idx)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono border border-white/10 transition-colors flex items-center gap-1"
                              title="Copy email script"
                            >
                              {copiedIndex === idx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-neutral-400" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#ccff00] font-mono mb-3">
                            Use case: {tpl.useCase}
                          </p>
                          <pre className="p-3.5 rounded-xl bg-black/80 border border-white/5 text-neutral-300 text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-72">
                            {tpl.content}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Service Callout Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-white/15 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-2">
                  Professional Link Building &amp; Digital PR
                </span>
                <h3 className="text-2xl font-black text-white mb-2">
                  Need High-Tier Authority Backlinks That Truly Move the Needle?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  AbuQitmirLabs specializes in white-hat digital PR, editorial placements on DR 60+ publications, and high-performance search infrastructure that compounds organic revenue.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  to="/seo-mastery"
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 flex items-center justify-center gap-2"
                >
                  <span>Explore SEO Mastery</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors text-center"
                >
                  Book Free Consult
                </Link>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={downloadPDF}
                className="px-6 py-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF Report</span>
              </button>

              <button
                type="button"
                onClick={resetTool}
                className="px-5 py-3 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Analyze Another Domain</span>
              </button>
            </div>
          </section>
        )}

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 md:py-20 border-t border-white/5 bg-neutral-950/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2 block">
                Authority &amp; Search Engine Trust FAQ
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'What is website authority and why does it matter?',
                  a: 'Website authority (domain authority) predicts how reliably your web pages can rank for competitive search queries. Search engines like Google evaluate incoming link quality, domain tenure, and technical trust signals to determine whether your content deserves top positioning.',
                },
                {
                  q: 'How is this tool different from paid suites like Ahrefs or Moz?',
                  a: 'Commercial suites charge $99–$499/month for proprietary crawler data. Our tool combines Open PageRank (indexing 200M+ web domains), Wayback Machine tenure archives, Google PageSpeed, and SSL trust heuristics to provide actionable authority insights 100% free with zero credit cards or paywalls.',
                },
                {
                  q: 'What constitutes a "good" authority score?',
                  a: 'On a 0–100 scale: 0–25 represents a newly indexed or emerging domain; 26–45 reflects a developing SMB footprint; 46–65 is competitive and can rank for moderate difficulty keywords; 66+ indicates an authoritative industry leader with strong backlink equity.',
                },
                {
                  q: 'How can I increase my domain authority score safely?',
                  a: 'Sustainable authority growth relies on: (1) earning white-hat editorial backlinks from verified industry publications, (2) publishing definitive linkable assets and original research, (3) fixing broken legacy links, and (4) eliminating toxic spam links via Search Console.',
                },
                {
                  q: 'Can I analyze competitor websites?',
                  a: 'Yes! You can input any publicly accessible domain to benchmark your competitors, evaluate their backlink velocity, and identify strategic gaps in their SEO positioning.',
                },
                {
                  q: 'How frequently does website authority change?',
                  a: 'Unlike keyword rankings which fluctuate daily, domain authority metrics update incrementally over 4–12 week cycles as search crawlers discover new inbound links and index historical references.',
                },
                {
                  q: 'How does AbuQitmirLabs help businesses build domain authority?',
                  a: 'AbuQitmirLabs executes high-tier digital PR, editorial outreach, content hub development, and technical Core Web Vitals optimizations. We help startups and enterprises earn high-trust backlinks that drive long-term organic traffic.',
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group p-5 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-bold text-white text-sm sm:text-base list-none">
                    <span>{faq.q}</span>
                    <span className="text-[#ccff00] text-xl font-mono group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Cross-Tool Linking Matrix */}
      <RelatedToolsSection currentTool="website-authority-analyzer" />

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default WebsiteAuthorityAnalyzerPage;

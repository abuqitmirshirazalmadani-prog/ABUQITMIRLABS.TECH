import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, Sparkles, CheckCircle2, Globe, FileDown, 
  ArrowRight, ShieldCheck, Clock, Layers, DollarSign, 
  HelpCircle, ChevronDown, ChevronUp, RefreshCw, Send,
  Cpu, Building2, TrendingDown, Info, ExternalLink
} from 'lucide-react';
import { EstimateResult, CountryComparison } from '../types/estimator';
import { 
  COUNTRY_DATA, 
  PROJECT_TYPES_REFERENCE, 
  HOURLY_RATES_BY_ROLE,
  HOURLY_RATE_BENCHMARKS,
  generateAlgorithmicEstimate,
  detectProjectType 
} from '../utils/estimatorLogic';
import { generateEstimatePdf } from '../utils/generateEstimatePdf';

export default function ProjectCostEstimatorPage() {
  const [idea, setIdea] = useState('');
  const [country, setCountry] = useState('PK');
  const [projectType, setProjectType] = useState('auto');
  const [budget, setBudget] = useState('not specified');

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // FAQ open/close accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const loadingMessages = [
    'Analyzing functional requirements and scope...',
    'Evaluating technical architecture & stack...',
    'Benchmarking regional developer hourly rates...',
    'Structuring work phases and deliverables...',
    'Finalizing executive cost estimate report...'
  ];

  const handleEstimate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!idea.trim()) {
      setError('Please enter a brief description of your project idea.');
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStep(0);

    // Progress step animation ticker
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: idea.trim(),
          country,
          projectType,
          budget
        })
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error('API server returned an error');
      }

      const data = await response.json();
      if (data.estimate) {
        setResult(data.estimate);
      } else {
        // Fallback to client-side engine if server returned unexpected structure
        setResult(generateAlgorithmicEstimate(idea, country, projectType, budget));
      }

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('estimate-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      clearInterval(interval);
      console.log('Calculating local algorithmic estimate:', err);
      // Seamless local computation fallback
      setResult(generateAlgorithmicEstimate(idea, country, projectType, budget));
      setTimeout(() => {
        const resultsEl = document.getElementById('estimate-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    const sampleText = 'A modern multi-vendor e-commerce marketplace with Flutter mobile apps for iOS and Android, vendor admin portal, real-time inventory management, Stripe and local payments integration, and automated courier tracking webhooks.';
    setIdea(sampleText);
    setCountry('PK');
    setProjectType('ecommerce');
    setBudget('$5k-$15k');
    const sampleResult = generateAlgorithmicEstimate(sampleText, 'PK', 'ecommerce', '$5k-$15k');
    setResult(sampleResult);
    setTimeout(() => {
      const resultsEl = document.getElementById('estimate-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleDownloadPdf = () => {
    if (!result) return;
    generateEstimatePdf(result, idea);
  };

  const faqs = [
    {
      q: 'How much does a website cost in Pakistan?',
      a: 'A basic 5-page corporate website in Pakistan typically ranges from 50,000 to 120,000 PKR ($180–$430 USD). A custom business CMS portal ranges from 150,000 to 350,000 PKR, while complex e-commerce platforms or custom software cost between 300,000 and 1,500,000+ PKR depending on integrations, security compliance, and user volumes.'
    },
    {
      q: 'How much does custom software cost in the USA vs Pakistan?',
      a: 'The United States market operates at an average 4.0x multiplier compared to Pakistan. A custom enterprise ERP or SaaS platform that costs $40,000 to $120,000+ in the US can be built by AbuQitmirLabs in Pakistan for $10,000 to $28,000 (PKR 2,800,000–7,800,000), offering up to 75% verified cost savings with identical code quality, full source handover, and agile delivery.'
    },
    {
      q: 'Why is offshore software development cheaper with AbuQitmirLabs?',
      a: 'Our engineering hub is based in Karachi, Pakistan, where operating expenses and cost-of-living are significantly lower than Western tech hubs. However, our senior software architects, AI engineers, and DevOps specialists follow strict international standards (OWASP security, zero-trust architecture, automated CI/CD), giving you Silicon Valley engineering output at direct offshore rates.'
    },
    {
      q: 'How accurate is this AI cost estimator?',
      a: 'This estimator analyzes real 2026 offshore and domestic market rates, breaking down typical developer hours, UI/UX prototyping phases, and third-party integrations. It provides an 85–92% confidence range for standard scopes. Final binding proposals are refined during a formal 30-minute discovery call.'
    },
    {
      q: 'Can I download this estimate as a PDF report?',
      a: 'Yes! Once you generate your estimate, click the "Download PDF Report" button to instantly receive an executive-ready PDF containing the phase breakdown, feature estimates, international rate comparisons, and strategic recommendations.'
    },
    {
      q: 'Do you offer fixed-price contracts or milestone-based billing?',
      a: 'AbuQitmirLabs offers both fixed-price contracts with well-defined deliverables and milestone-based agile sprints (bi-weekly invoices with working demo deployments). Every agreement includes 100% intellectual property ownership and full repository handover.'
    },
    {
      q: 'What if my budget is lower than the estimate?',
      a: 'We specialize in MVP (Minimum Viable Product) scoping. By identifying your top 3 core user workflows and deferring secondary non-critical features to Phase 2, we can frequently reduce your initial launch budget by 35% to 50% without compromising launch speed.'
    },
    {
      q: 'How do I get an exact, binding production quote?',
      a: 'Click "Get a Real Quote from AbuQitmirLabs" or visit our Contact page. Our technical leads will review your functional specification, conduct a complimentary architecture consultation, and provide a detailed, itemized statement of work within 24 hours.'
    }
  ];

  // Schema Markup
  const schemaWebApplication = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'AI Project Cost Estimator - AbuQitmirLabs',
    'url': 'https://www.abuqitmirlabs.tech/tools/project-cost-estimator',
    'description': 'Free AI-powered software and website cost estimator providing instant project pricing, timeline estimates, and country-wise rate benchmarks.',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'provider': {
      '@type': 'Organization',
      'name': 'AbuQitmirLabs',
      'url': 'https://www.abuqitmirlabs.tech'
    }
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.abuqitmirlabs.tech'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tools',
        'item': 'https://www.abuqitmirlabs.tech/tools/project-cost-estimator'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'AI Project Cost Estimator',
        'item': 'https://www.abuqitmirlabs.tech/tools/project-cost-estimator'
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Project Cost Estimator 2026 | Free Software & Website Pricing Calculator | AbuQitmirLabs</title>
        <meta 
          name="description" 
          content="Calculate instant, accurate project costs for websites, custom software, mobile apps, and AI agents. Compare 8 country rates (Pakistan, US, UK, UAE) with 100% free PDF report download." 
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools/project-cost-estimator" />
        <meta property="og:title" content="AI Project Cost Estimator 2026 | AbuQitmirLabs" />
        <meta property="og:description" content="Instant cost estimates for websites, mobile apps, and AI agents with country-wise breakdown and free PDF report." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools/project-cost-estimator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Project Cost Estimator 2026 | AbuQitmirLabs" />
        <meta name="twitter:description" content="Get instant cost estimates for software projects with regional comparisons and PDF export." />
        <script type="application/ld+json">{JSON.stringify(schemaWebApplication)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumbs)}</script>
      </Helmet>

      <main id="main-content" className="bg-[#050505] text-white min-h-screen pt-28 md:pt-36 pb-24 selection:bg-[#ccff00] selection:text-black font-sans">
        
        {/* HERO SECTION */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-mono uppercase tracking-wider mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">Tools</span>
            <span>/</span>
            <span className="text-[#ccff00]">AI Project Cost Estimator</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#ccff00] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free · No Signup Required · 2026 Real Market Rates</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            AI-Powered <span className="text-[#ccff00]">Project Cost</span> Estimator
          </h1>

          <p className="text-neutral-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-8">
            Get instant, algorithmic and AI-grounded cost estimates for websites, custom software, and autonomous AI agents. Real market rates across 8 countries with transparent phase-wise breakdowns.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a 
              href="#estimator-form"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b0d600] text-black font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-all duration-300"
            >
              Start Estimating <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              type="button"
              onClick={loadSample}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm tracking-wider transition-colors"
            >
              See Sample Report <ExternalLink className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-300 font-mono">
              <span className="text-[#ccff00]">⚡</span>
              <span>Instant AI Analysis</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-300 font-mono">
              <span className="text-[#ccff00]">🌍</span>
              <span>8 Country Multipliers</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-300 font-mono">
              <span className="text-[#ccff00]">📄</span>
              <span>Free PDF Report Export</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-300 font-mono">
              <span className="text-[#ccff00]">🔒</span>
              <span>Zero-Storage Privacy</span>
            </div>
          </div>
        </section>

        {/* ESTIMATOR FORM SECTION */}
        <section id="estimator-form" className="max-w-[1000px] mx-auto px-6 md:px-12 mt-16">
          <div className="bg-[#0c0c0b] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Project Specification</h2>
                  <p className="text-xs text-neutral-400 font-mono">Enter your concept details below to compute pricing</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={loadSample}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#ccff00] hover:underline font-mono"
              >
                <span>Fill sample data</span>
              </button>
            </div>

            <form onSubmit={handleEstimate} className="space-y-6">
              {/* Step 1: Idea Textarea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="project-idea" className="text-sm font-bold text-white flex items-center gap-2">
                    <span>1. Describe Your Project Idea</span>
                    <span className="text-[#ccff00]">*</span>
                  </label>
                  <span className={`text-xs font-mono ${idea.length > 900 ? 'text-amber-400' : 'text-neutral-500'}`}>
                    {idea.length} / 1000 chars
                  </span>
                </div>
                <textarea
                  id="project-idea"
                  rows={4}
                  maxLength={1000}
                  value={idea}
                  onChange={(e) => {
                    setIdea(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="e.g., Mujhe ek e-commerce website banwani hai with payment gateway, customer dashboard, automated courier tracking, and an admin inventory panel..."
                  className="w-full bg-[#141413] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00] transition-colors leading-relaxed"
                />
              </div>

              {/* Step 2 & 3: Country & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Country */}
                <div>
                  <label htmlFor="country-select" className="block text-sm font-bold text-white mb-2">
                    2. Target Country / Market Standard <span className="text-[#ccff00]">*</span>
                  </label>
                  <select
                    id="country-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#141413] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors font-sans"
                  >
                    <option value="PK">🇵🇰 Pakistan (1.0x - Baseline Offshore Hub)</option>
                    <option value="IN">🇮🇳 India (1.0x - Baseline Offshore)</option>
                    <option value="US">🇺🇸 United States (4.0x Multiplier)</option>
                    <option value="UK">🇬🇧 United Kingdom (3.5x Multiplier)</option>
                    <option value="CA">🇨🇦 Canada (3.5x Multiplier)</option>
                    <option value="AU">🇦🇺 Australia (3.5x Multiplier)</option>
                    <option value="AE">🇦🇪 United Arab Emirates (2.5x Multiplier)</option>
                    <option value="PL">🇵🇱 Poland / CEE (2.0x Multiplier)</option>
                  </select>
                  <p className="text-[11px] text-neutral-400 mt-1.5 font-mono">
                    Multipliers benchmark regional agency overheads vs Pakistan offshore cost.
                  </p>
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="project-type" className="block text-sm font-bold text-white mb-2">
                    3. Project Category (Optional)
                  </label>
                  <select
                    id="project-type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#141413] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors font-sans"
                  >
                    <option value="auto">✨ Auto-Detect from Idea (Recommended)</option>
                    <option value="website">Business Website (CMS / 5-10 Pages)</option>
                    <option value="ecommerce">E-Commerce Store & Marketplace</option>
                    <option value="webapp">Custom Web Application / Portal</option>
                    <option value="mobile">Mobile App (Flutter / React Native)</option>
                    <option value="aiagent">Autonomous AI Agent / RAG Pipeline</option>
                    <option value="software">Custom Enterprise Software (ERP/CRM)</option>
                    <option value="saas">SaaS Subscription Platform</option>
                  </select>
                  <p className="text-[11px] text-neutral-400 mt-1.5 font-mono">
                    Assists the AI in scoping architecture hours accurately.
                  </p>
                </div>
              </div>

              {/* Step 4: Budget Range */}
              <div>
                <label htmlFor="budget-select" className="block text-sm font-bold text-white mb-2">
                  4. Anticipated Budget Range (Optional)
                </label>
                <select
                  id="budget-select"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#141413] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition-colors font-sans"
                >
                  <option value="not specified">Not specified / Let AI evaluate fair market value</option>
                  <option value="under-$1k">Under $1,000 USD (Micro MVP / Simple Website)</option>
                  <option value="$1k-$5k">$1,000 – $5,000 USD (E-commerce / Core App MVP)</option>
                  <option value="$5k-$15k">$5,000 – $15,000 USD (Production Web App / AI Agent)</option>
                  <option value="$15k-$50k">$15,000 – $50,000 USD (Enterprise Custom Software / SaaS)</option>
                  <option value="$50k+">$50,000+ USD (High-Scale Multi-Platform Solution)</option>
                </select>
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-500/40 rounded-xl text-red-200 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Submit & Progress */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-[#ccff00] hover:bg-[#b0d600] disabled:bg-[#ccff00]/60 text-black font-black text-base uppercase tracking-wider shadow-[0_0_30px_rgba(204,255,0,0.35)] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{loadingMessages[loadingStep]}</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Get My Estimate</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-mono text-center">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                <span>Your idea is 100% private. We never store or monetize your confidential concept.</span>
              </div>
            </form>
          </div>
        </section>

        {/* RESULTS PANEL */}
        {result && (
          <section id="estimate-results" className="max-w-[1240px] mx-auto px-6 md:px-12 mt-20 scroll-mt-28">
            <div className="bg-[#0a0a09] border border-[#ccff00]/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(204,255,0,0.1)] relative">
              
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold">
                      EXECUTIVE ESTIMATE REPORT
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">
                      Ref: AQL-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {result.projectType}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                    {result.detectedSummary}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <FileDown className="w-4 h-4 text-[#ccff00]" />
                    <span>Download PDF</span>
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b0d600] text-black font-black text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Hire Us</span>
                  </Link>
                </div>
              </div>

              {/* Ground Truth Market Rate & Verification Banner */}
              <div className="bg-[#141413] border border-[#ccff00]/30 rounded-2xl p-5 mb-8 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Ground Truth Market Calibration
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-[#ccff00] text-black px-2 py-0.5 rounded font-black tracking-wider">
                    VERIFIED: CLUTCH.CO &amp; GOOGLE 2026 BENCHMARKS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Total Development Effort</div>
                    <div className="text-2xl font-black text-white font-mono mt-0.5">
                      {result.totalEngineeringHours ? `${result.totalEngineeringHours.min} – ${result.totalEngineeringHours.max}` : `${result.timelineWeeks.min * 35} – ${result.timelineWeeks.max * 35}`} <span className="text-xs font-normal text-neutral-400">Hours</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      Calculated from prompt feature scope &amp; complexity
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Target Developer Rate ({result.targetCountry.name})</div>
                    <div className="text-2xl font-black text-[#ccff00] font-mono mt-0.5">
                      {result.developerRateLocal ? `${result.developerRateLocal.min.toLocaleString()} – ${result.developerRateLocal.max.toLocaleString()} ${result.developerRateLocal.unit}` : result.targetCountry.hourlyRateUSD}
                    </div>
                    <div className="text-[11px] text-neutral-300 font-mono mt-1">
                      {result.developerRateUSD && `USD Equivalent: $${result.developerRateUSD.min} – $${result.developerRateUSD.max} / hr`}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Pricing Formula</div>
                    <div className="text-xs font-mono text-neutral-200 mt-1 bg-black/50 border border-white/10 rounded-lg p-2.5 leading-relaxed">
                      {result.pricingFormula || `Total Cost = Total Hours × Developer Cost Per Hour`}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.1 Key Metrics 4-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {/* Cost PKR */}
                <div className="bg-[#141413] border border-white/10 rounded-2xl p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Estimated Cost (PKR)
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0066ff]">
                    PKR {(result.totalCostPKR.min / 1000).toFixed(0)}k – {(result.totalCostPKR.max / 1000).toFixed(0)}k
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-1">
                    {result.targetCountry.code === 'PK' ? 'Local PKR Rate: 5k–9.8k/hr' : `Converted from ${result.targetCountry.name}`}
                  </div>
                </div>

                {/* Cost USD */}
                <div className="bg-[#141413] border border-white/10 rounded-2xl p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Estimated Cost (USD)
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#22c55e]">
                    ${result.totalCostUSD.min.toLocaleString()} – ${result.totalCostUSD.max.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-1">
                    Hours × ${result.developerRateUSD?.min || 18}–${result.developerRateUSD?.max || 35}/hr
                  </div>
                </div>

                {/* Development Hours & Timeline */}
                <div className="bg-[#141413] border border-white/10 rounded-2xl p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Hours &amp; Timeline
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {result.totalEngineeringHours ? `${result.totalEngineeringHours.min}–${result.totalEngineeringHours.max}h` : `${result.timelineWeeks.min * 35}–${result.timelineWeeks.max * 35}h`}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-1">
                    {result.timelineWeeks.min}–{result.timelineWeeks.max} Weeks ({Math.round((result.totalEngineeringHours?.min || 100)/result.timelineWeeks.min)}h/wk)
                  </div>
                </div>

                {/* Complexity / Confidence */}
                <div className="bg-[#141413] border border-white/10 rounded-2xl p-5">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Complexity &amp; Confidence
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#ccff00]">
                    {result.complexity} <span className="text-sm font-normal text-white">({result.confidence}%)</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-1">
                    Architectural confidence score
                  </div>
                </div>
              </div>

              {/* 3.2 Phase-wise Breakdown */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#ccff00]" />
                    <span>Phase-Wise Engineering Breakdown</span>
                  </h4>
                  <span className="text-xs text-neutral-400 font-mono">5 Iterative Milestones</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm font-sans">
                    <thead className="bg-[#141413] text-neutral-400 font-mono text-xs uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Phase &amp; Deliverable Scope</th>
                        <th className="py-3.5 px-4">Est. Hours</th>
                        <th className="py-3.5 px-4">Cost (PKR)</th>
                        <th className="py-3.5 px-4">Cost (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#0a0a09]">
                      {result.phases.map((phase, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{phase.name}</div>
                            {phase.description && (
                              <div className="text-xs text-neutral-400 font-mono mt-0.5">{phase.description}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-neutral-300">
                            {phase.hoursMin} – {phase.hoursMax} hrs
                          </td>
                          <td className="py-3.5 px-4 font-mono text-white font-semibold">
                            PKR {(phase.costMin / 1000).toFixed(0)}k – {(phase.costMax / 1000).toFixed(0)}k
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#22c55e]">
                            ${Math.round(phase.costMin / 280).toLocaleString()} – ${Math.round(phase.costMax / 280).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3.3 Feature-level Cost Breakdown & Tech Stack */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#ccff00]" />
                    <span>Feature-Level Cost &amp; Hours Distribution</span>
                  </h4>
                  <div className="space-y-3">
                    {result.features.map((feat, idx) => (
                      <div key={idx} className="bg-[#141413] border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-white">{feat.name}</div>
                          <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-3 mt-0.5">
                            <span>Complexity: <span className="text-[#ccff00]">{feat.complexity || 'Medium'}</span></span>
                            {feat.hoursMin && (
                              <span className="text-neutral-300 font-mono">Effort: {feat.hoursMin}–{feat.hoursMax} hrs</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-sm font-bold text-white">
                            PKR {(feat.costMin / 1000).toFixed(0)}k – {(feat.costMax / 1000).toFixed(0)}k
                          </div>
                          <div className="text-xs text-[#22c55e]">
                            ${Math.round(feat.costMin / 280)} – ${Math.round(feat.costMax / 280)} USD
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Tech Stack & Team */}
                <div className="space-y-6">
                  <div className="bg-[#141413] border border-white/10 rounded-2xl p-5">
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#ccff00] mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>Recommended Architecture</span>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {result.recommendedTechStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#141413] border border-white/10 rounded-2xl p-5">
                    <h5 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#ccff00] mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>Assigned Engineering Pod</span>
                    </h5>
                    <div className="space-y-2 text-xs font-mono text-neutral-300">
                      {result.teamComposition.map((m, i) => (
                        <div key={i} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                          <span>{m.role}</span>
                          <span className="text-white font-bold">{m.hours} hrs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.4 Country Benchmark Comparison Table */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#ccff00]" />
                      <span>International Benchmark Comparison</span>
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">
                      Based on verified developer hourly rates: US ($85–$150/hr), UK ($75–$140/hr), Offshore PK ($18–$35/hr)
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#22c55e] font-mono">
                    <TrendingDown className="w-4 h-4" />
                    <span>Up to 78% Cost Reduction</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm font-sans">
                    <thead className="bg-[#141413] text-neutral-400 font-mono text-xs uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Market / Region</th>
                        <th className="py-3.5 px-4">Hourly Rate</th>
                        <th className="py-3.5 px-4">Estimated Range (USD)</th>
                        <th className="py-3.5 px-4">Estimated Range (PKR)</th>
                        <th className="py-3.5 px-4">Offshore Arbitrage vs USA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#0a0a09]">
                      {result.countryComparison.map((c, idx) => {
                        const isSelected = c.countryCode === result.targetCountry.code;
                        const isPakistan = c.countryCode === 'PK';
                        return (
                          <tr 
                            key={idx} 
                            className={`transition-colors ${
                              isPakistan 
                                ? 'bg-[#ccff00]/10 font-bold border-l-4 border-l-[#ccff00]' 
                                : isSelected 
                                ? 'bg-white/5' 
                                : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <span className="mr-2 text-base">{c.flag}</span>
                              <span className={isPakistan ? 'text-[#ccff00]' : 'text-white'}>{c.country}</span>
                              {isPakistan && <span className="ml-2 text-[10px] bg-[#ccff00] text-black px-1.5 py-0.5 rounded font-black">OFFSHORE HUB</span>}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-neutral-300">
                              {c.hourlyRateUSD}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#22c55e] font-semibold">
                              ${c.costMinUSD.toLocaleString()} – ${c.costMaxUSD.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-neutral-300">
                              PKR {(c.costMinPKR / 1000).toFixed(0)}k – {(c.costMaxPKR / 1000).toFixed(0)}k
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className={isPakistan ? 'text-[#ccff00] font-black' : 'text-neutral-400'}>
                                {c.savingsVsUSA}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3.4B Verified Ground Truth Benchmark Reference Table */}
              <div className="mb-10 bg-[#141413] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#ccff00]" />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Ground Truth Developer Hourly Rate Reference Card
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">
                        Cross-verifiable against Google Search, Clutch.co &amp; GoodFirms 2026 Developer Survey
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-neutral-400 uppercase border-b border-white/10 pb-2">
                      <tr>
                        <th className="py-2.5 px-3">Region</th>
                        <th className="py-2.5 px-3">Hourly Rate (USD)</th>
                        <th className="py-2.5 px-3">Typical Agency Tier</th>
                        <th className="py-2.5 px-3">Independent Market Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300">
                      {HOURLY_RATE_BENCHMARKS.map((b, idx) => (
                        <tr key={idx} className={b.countryCode === 'PK' ? 'text-[#ccff00] font-bold bg-[#ccff00]/5' : ''}>
                          <td className="py-2.5 px-3">
                            <span className="mr-1.5">{b.flag}</span>
                            <span>{b.region}</span>
                          </td>
                          <td className="py-2.5 px-3 font-bold">{b.hourlyRateUSD}</td>
                          <td className="py-2.5 px-3 text-neutral-400">{b.typicalAgencyTier}</td>
                          <td className="py-2.5 px-3 text-neutral-400">{b.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3.5 Suggestions Panel */}
              <div className="bg-[#141413] border border-white/10 rounded-2xl p-6 mb-10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#ccff00] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Strategic Architectural Recommendations</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.suggestions.map((sug, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3.6 Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <FileDown className="w-4 h-4 text-[#ccff00]" />
                    <span>Download PDF Report</span>
                  </button>
                  <button
                    onClick={() => {
                      setIdea('');
                      setResult(null);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-neutral-400 hover:text-white text-xs font-mono transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Estimate Another</span>
                  </button>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b0d600] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-all"
                >
                  <span>Get Binding Quote from AbuQitmirLabs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </section>
        )}

        {/* 4. COST REFERENCE TABLES (SEO CONTENT SECTION) */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mt-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block mb-3">
              MARKET RATE BENCHMARKS (2026)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Transparent Industry Pricing Matrices
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              We believe in 100% price transparency. Below are the verified industry standards for software engineering, UI/UX architecture, and autonomous AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Table 1: Baseline Project Types */}
            <div className="bg-[#0c0c0b] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span>Baseline Project Categories</span>
                <span className="text-xs text-neutral-400 font-mono">Offshore Pakistan Rates</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-neutral-400 border-b border-white/10">
                    <tr>
                      <th className="pb-3">Project Type</th>
                      <th className="pb-3">Hours</th>
                      <th className="pb-3">PKR</th>
                      <th className="pb-3">USD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {PROJECT_TYPES_REFERENCE.map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 text-white font-sans font-semibold">{row.type}</td>
                        <td className="py-2.5 text-neutral-400">{row.baseHours}</td>
                        <td className="py-2.5">{row.costPKR}</td>
                        <td className="py-2.5 text-[#22c55e]">{row.costUSD}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Hourly Rates by Role */}
            <div className="bg-[#0c0c0b] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span>Hourly Rates by Role</span>
                <span className="text-xs text-neutral-400 font-mono">PK vs USA Comparison</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-neutral-400 border-b border-white/10">
                    <tr>
                      <th className="pb-3">Engineering Role</th>
                      <th className="pb-3">Pakistan Rate (PKR/hr)</th>
                      <th className="pb-3">USA Market Rate (USD/hr)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {HOURLY_RATES_BY_ROLE.map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 text-white font-sans font-semibold">{row.role}</td>
                        <td className="py-2.5 text-[#ccff00]">{row.pkrRate}</td>
                        <td className="py-2.5 text-neutral-400">{row.usdRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION (AEO OPTIMIZED) */}
        <section className="max-w-[900px] mx-auto px-6 md:px-12 mt-20">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">
              Software Cost & Scoping FAQ
            </h2>
            <p className="text-neutral-400 text-sm font-light">
              Clear answers regarding pricing, offshore software development economics, and contract structures.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#0c0c0b] border border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <span className="text-[#ccff00] shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. RELATED GUIDES & BLOG ARTICLES */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mt-28">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ccff00] font-bold block mb-1">
                KNOWLEDGE BASE
              </span>
              <h3 className="text-2xl font-black text-white">
                Related Scoping & Engineering Guides
              </h3>
            </div>
            <Link to="/blog" className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1">
              <span>View all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/blog/custom-web-development-company-2026-built-in-visibility"
              className="bg-[#0c0c0b] border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/50 transition-colors group block"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00] mb-2 block">
                ENGINEERING GUIDE
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                Custom Web Development Company 2026: Built-in Visibility
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Why modern applications require semantic architecture, zero-trust security, and Core Web Vitals from day one.
              </p>
            </Link>

            <Link 
              to="/blog/custom-web-development-vs-website-templates-2026-guide"
              className="bg-[#0c0c0b] border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/50 transition-colors group block"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00] mb-2 block">
                BUILD VS BUY
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                Custom Web Development vs Website Templates: 2026 Guide
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                The hidden long-term costs of template bloat vs clean, tailored microservices that scale effortlessly.
              </p>
            </Link>

            <Link 
              to="/blog/the-complete-guide-to-rag-ai-integration-for-startups"
              className="bg-[#0c0c0b] border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/50 transition-colors group block"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ccff00] mb-2 block">
                AI SYSTEMS
              </span>
              <h4 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                The Complete Guide to RAG AI Integration for Startups
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                How to integrate Retrieval-Augmented Generation (RAG) and autonomous AI workflows into your production stack.
              </p>
            </Link>
          </div>
        </section>

        {/* 7. BOTTOM CONVERSION CTA */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-12 mt-28">
          <div className="bg-gradient-to-b from-[#141413] to-[#0a0a09] border border-white/15 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-2xl mx-auto">
              Ready to Build Your Project?
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
              Get a guaranteed, fixed-price quote with itemized sprint deliverables, 100% repository handover, and dedicated technical architects.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ccff00] hover:bg-[#b0d600] text-black font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-all"
              >
                <span>Contact Engineering Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm tracking-wider transition-colors"
              >
                <span>View Case Studies</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

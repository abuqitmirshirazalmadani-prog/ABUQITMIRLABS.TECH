import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ChevronDown, 
  ExternalLink,
  Layers,
  Code2,
  Lock,
  Search,
  Activity,
  Award,
  Calculator,
  Bot,
  Wrench
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { preloadRoute } from '../utils/preloader';
import { ToolThemeIcon } from '../components/ToolThemeIcon';

// ─────────────────────────────────────────────────────────────
// TOOLS DATA
// ─────────────────────────────────────────────────────────────

export interface ToolItem {
  id: string;
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Planning' | 'Analysis' | 'Optimization' | 'Assessment' | 'Development';
  categoryColor: string;
  features: string[];
  audience: string;
  status: string;
  badge?: string | null;
  priority: number;
}

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'project-cost-estimator',
    slug: '/tools/project-cost-estimator',
    icon: '💰',
    name: 'AI Project Cost Estimator',
    tagline: 'Know your project cost before you build',
    description:
      'Get instant, AI-grounded cost estimates for websites, custom software, mobile apps, and AI agents. Compare costs across 8 countries with phase-wise breakdowns.',
    category: 'Planning',
    categoryColor: '#E8A838',
    features: [
      '8 country cost comparison',
      'Phase-wise engineering breakdown',
      'Feature-level cost allocations',
      'Professional PDF report export'
    ],
    audience: 'Founders, business owners, agencies',
    status: 'live',
    badge: null,
    priority: 1
  },
  {
    id: 'website-audit',
    slug: '/tools/website-audit',
    icon: '🚀',
    name: 'Website Audit Tool',
    tagline: 'Find every issue hurting your site',
    description:
      'Run a comprehensive audit on any URL — performance, SEO, accessibility, and security. Powered by Google Lighthouse + AI recommendations.',
    category: 'Analysis',
    categoryColor: '#3B82F6',
    features: [
      'Core Web Vitals diagnostic check',
      '50+ automated technical SEO checks',
      'AI-powered prioritized remediation',
      'Priority-based performance issues'
    ],
    audience: 'Site owners, developers, agencies',
    status: 'live',
    badge: null,
    priority: 2
  },
  {
    id: 'seo-checklist',
    slug: '/tools/seo-checklist',
    icon: '✅',
    name: 'SEO Checklist Generator',
    tagline: 'A personalized SEO action plan',
    description:
      'Get a custom, industry-specific SEO checklist tailored to your business type, goal, and website stage. Track progress and download as PDF.',
    category: 'Optimization',
    categoryColor: '#22C55E',
    features: [
      '50+ actionable technical tasks',
      'Industry-specific tailored audit',
      'Local browser progress persistence',
      'Downloadable PDF export'
    ],
    audience: 'Marketers, SEO specialists, business owners',
    status: 'live',
    badge: null,
    priority: 3
  },
  {
    id: 'ai-readiness-score',
    slug: '/tools/ai-readiness-score',
    icon: '🤖',
    name: 'AI Readiness Score',
    tagline: 'Is your business ready for AI?',
    description:
      'Assess your AI maturity across 6 dimensions — data, tech, team, processes, strategy, and culture. Get a personalized AI adoption roadmap.',
    category: 'Assessment',
    categoryColor: '#8B5CF6',
    features: [
      '6-category maturity evaluation',
      '0–100 composite strategic score',
      '3-phase implementation roadmap',
      'Industry peer benchmarks'
    ],
    audience: 'Executives, CTOs, transformation leads',
    status: 'live',
    badge: null,
    priority: 4
  },
  {
    id: 'tech-stack-recommender',
    slug: '/tools/tech-stack-recommender',
    icon: '⚙️',
    name: 'Tech Stack Recommender',
    tagline: 'Find your perfect tech stack',
    description:
      'Answer 6 questions and get a personalized technology recommendation — frontend, backend, database, hosting, and tools — with reasoning.',
    category: 'Development',
    categoryColor: '#F97316',
    features: [
      '12+ modular stack components',
      'Estimated monthly hosting costs',
      'Curated learning resources',
      'Step-by-step setup roadmap'
    ],
    audience: 'Developers, CTOs, startup founders',
    status: 'live',
    badge: null,
    priority: 5
  },
  {
    id: 'website-authority-analyzer',
    slug: '/tools/website-authority-analyzer',
    icon: '🔗',
    name: 'Website Authority Analyzer',
    tagline: 'Check your domain authority instantly',
    description:
      "Analyze any website's domain authority, age, quality score, and trust signals. Get a personalized backlink strategy roadmap.",
    category: 'Analysis',
    categoryColor: '#06B6D4',
    features: [
      'Open PageRank authority check',
      'Wayback Machine domain age lookup',
      'Competitive authority benchmark',
      'Actionable backlink strategy'
    ],
    audience: 'SEO professionals, marketers, site owners',
    status: 'live',
    badge: 'NEW',
    priority: 6
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Tools', icon: <Layers size={14} className="text-[#ccff00]" /> },
  { id: 'Planning', label: 'Planning', icon: <Calculator size={14} className="text-[#E8A838]" /> },
  { id: 'Analysis', label: 'Analysis', icon: <Search size={14} className="text-[#3B82F6]" /> },
  { id: 'Optimization', label: 'Optimization', icon: <Zap size={14} className="text-[#22C55E]" /> },
  { id: 'Assessment', label: 'Assessment', icon: <Bot size={14} className="text-[#c084fc]" /> },
  { id: 'Development', label: 'Development', icon: <Code2 size={14} className="text-[#fb923c]" /> }
];

const FAQS = [
  {
    q: 'Are these tools really free to use?',
    a: 'Yes, 100% free with zero paywalls. No signup, no credit card, and no hidden trial limits. You can generate unlimited estimates, audit unlimited URLs, and download high-resolution PDF reports anytime.'
  },
  {
    q: 'Do you store or sell my submitted data?',
    a: 'No. All tools operate in real-time. We never sell, log, or store your proprietary URLs, prompts, project scopes, or client information. State and checklist progress are saved strictly inside your browser local storage.'
  },
  {
    q: 'What powers these diagnostic and planning tools?',
    a: 'Each tool combines authoritative industry APIs (including Google Lighthouse PageSpeed, Open PageRank database, and the Wayback Machine) with Gemini AI reasoning to generate tailored, context-specific recommendations rather than static templates.'
  },
  {
    q: 'Are there any hidden usage limits or daily caps?',
    a: 'No artificial limits. You can generate unlimited project estimates, run multiple website audits, and download full PDF reports as frequently as needed for your workflows.'
  },
  {
    q: 'Can digital agencies and consultants use these tools for client work?',
    a: 'Absolutely. Agencies, freelancers, and enterprise consultants routinely rely on these tools for pre-sales scoping, client onboarding, technical proposals, and audit presentations.'
  },
  {
    q: 'Why does AbuQitmirLabs offer these tools for free?',
    a: 'We believe transparency builds the best partnerships. Providing rigorous planning tools helps founders and engineering leads make informed decisions. When you need custom software or dedicated AI development, we hope you consider working with us.'
  },
  {
    q: 'Can AbuQitmirLabs build a custom internal tool or calculator for my business?',
    a: 'Yes. Beyond our public utilities, AbuQitmirLabs engineers private enterprise ERPs, customer portals, custom ROI calculators, and bespoke AI workflows tailored to your exact operations.'
  },
  {
    q: 'How accurate are the cost estimates and technical recommendations?',
    a: 'Estimates are calibrated against real-world engineering benchmarks across 8 countries, verified developer rate cards, and Clutch market research. They provide an accurate baseline for commercial budgeting and sprint planning.'
  }
];

const ToolsIndexPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return TOOLS_DATA;
    return TOOLS_DATA.filter((tool) => tool.category === activeCategory);
  }, [activeCategory]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Structured Data (CollectionPage + ItemList + FAQPage)
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        'name': 'Free AI-Powered Engineering & Planning Tools by AbuQitmirLabs',
        'url': 'https://www.abuqitmirlabs.tech/tools',
        'description':
          'Six free AI-powered tools: project cost estimator, website audit, SEO checklist, AI readiness score, tech stack recommender, and website authority analyzer. No signup required.',
        'isPartOf': {
          '@type': 'WebSite',
          'name': 'AbuQitmirLabs',
          'url': 'https://www.abuqitmirlabs.tech'
        }
      },
      {
        '@type': 'ItemList',
        'name': 'Free Tools Suite',
        'description': 'A collection of free engineering tools for planning, auditing, and optimizing digital platforms.',
        'numberOfItems': TOOLS_DATA.length,
        'itemListElement': TOOLS_DATA.map((tool, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'url': `https://www.abuqitmirlabs.tech${tool.slug}`,
          'name': tool.name,
          'description': tool.description
        }))
      },
      {
        '@type': 'FAQPage',
        'mainEntity': FAQS.map((faq) => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#e5e5e5] font-sans selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Free AI-Powered Tools for Modern Businesses | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Six free AI-powered tools: project cost estimator, website audit, SEO checklist, AI readiness score, tech stack recommender, and website authority analyzer. 100% free, no signup required."
        />
        <meta
          name="keywords"
          content="free web development tools, free seo tools, free ai tools for business, website cost calculator, website audit tool, seo checklist generator, ai readiness assessment, tech stack recommender, website authority checker, free business tools 2026"
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools" />
        <meta property="og:title" content="Free AI-Powered Tools Suite | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="Plan smarter, audit faster, and optimize digital assets with 6 free utilities. Zero signup, no credit card required."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Global Brand Header */}
      <Header />

      <main id="main-content" className="pt-28 md:pt-36 pb-20">
        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
            <Link to="/" className="hover:text-[#ccff00] transition-colors">
              Home
            </Link>
            <span className="text-neutral-600">›</span>
            <span className="text-white font-bold">Tools</span>
          </nav>

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>6 Free Tools · 100% No Signup Required</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-white tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
            Free Engineering &amp; AI Tools <br className="hidden sm:inline" />
            <span className="not-italic font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
              for Modern Businesses
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-neutral-300 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Plan smarter, audit faster, and optimize better with our suite of free tools. Built by AbuQitmirLabs — no signup, no credit card, no artificial limits.
          </p>

          {/* Hero Quick Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap py-6 px-8 rounded-2xl bg-neutral-900/50 border border-white/10 max-w-2xl mx-auto mb-16 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#ccff00]">6</span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-1">Free Tools</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-mono font-black text-white">0</span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-1">Signups Required</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-mono font-black text-[#22C55E]">100%</span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mt-1">Privacy Safe</span>
            </div>
          </div>
        </section>

        {/* ═══════════════ CATEGORY FILTERS ═══════════════ */}
        <section aria-label="Tool Categories" className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? TOOLS_DATA.length 
                : TOOLS_DATA.filter((t) => t.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20 font-bold scale-105'
                      : 'bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/10'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ═══════════════ TOOLS GRID ═══════════════ */}
        <section aria-label="Free Tools Directory" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.slug}
                onMouseEnter={() => preloadRoute(tool.slug)}
                onTouchStart={() => preloadRoute(tool.slug)}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/90 border border-white/10 hover:border-[#ccff00]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ccff00]/5 overflow-hidden"
              >
                {/* Accent Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: tool.categoryColor }}
                />

                {/* Badge if present */}
                {tool.badge && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#ccff00] text-black text-[10px] font-mono font-black uppercase tracking-wider shadow-md">
                    {tool.badge}
                  </span>
                )}

                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <ToolThemeIcon tool={tool.id} size="lg" />
                    {!tool.badge && (
                      <span
                        className="text-[11px] font-mono uppercase tracking-widest font-bold"
                        style={{ color: tool.categoryColor }}
                      >
                        {tool.category}
                      </span>
                    )}
                  </div>

                  {/* Name & Tagline */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors mb-1">
                    {tool.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-serif italic text-neutral-400 mb-4">
                    {tool.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {tool.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Target Audience */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 pb-4 mb-5 border-b border-white/5">
                    <span className="text-neutral-500 uppercase">For:</span>
                    <span className="text-neutral-300">{tool.audience}</span>
                  </div>
                </div>

                {/* Footer / Launch CTA */}
                <div className="flex items-center justify-between pt-2">
                  <div className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">
                    <span>Launch Tool</span>
                    <ArrowRight className="w-4 h-4 text-[#ccff00] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#22C55E] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                    <span>Free</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-20 text-neutral-400 font-mono text-sm">
              No tools found in this category.
            </div>
          )}
        </section>

        {/* ═══════════════ WHY WE BUILD FREE TOOLS ═══════════════ */}
        <section aria-labelledby="why-free-tools-title" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-b from-neutral-900/60 to-black border border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 id="why-free-tools-title" className="text-2xl sm:text-4xl font-serif italic text-white tracking-tight mb-4">
                Why We Build Free Tools
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                We believe core planning and technical diagnostics shouldn't be locked behind opaque paywalls. Here is our engineering philosophy:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
                <div className="text-3xl">🎯</div>
                <h3 className="text-base font-bold text-white">Real Utility, Zero Cost</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Every tool delivers actionable, comprehensive data — never an artificial preview designed just to capture email addresses.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
                <div className="text-3xl">🔒</div>
                <h3 className="text-base font-bold text-white">Privacy First</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  We never store your proprietary URLs, prompts, or client details. Analysis is executed ephemerally with zero tracking.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
                <div className="text-3xl">🤖</div>
                <h3 className="text-base font-bold text-white">Grounded AI Analysis</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Powered by Gemini AI integrated with live APIs (PageSpeed, Open PageRank) for realistic, contextual outputs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
                <div className="text-3xl">⚡</div>
                <h3 className="text-base font-bold text-white">Instant Diagnostics</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Zero waiting, no sales callbacks, and no waiting in queue. Instant answers and downloadable PDFs on demand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ HOW IT WORKS / JOURNEY FLOW ═══════════════ */}
        <section aria-labelledby="journey-flow-title" className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-12">
            <h2 id="journey-flow-title" className="text-2xl sm:text-4xl font-serif italic text-white tracking-tight mb-3">
              How These Tools Fit Together
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              Each tool guides a distinct milestone along your digital engineering journey.
            </p>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#ccff00]/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#ccff00] text-black font-mono font-black flex items-center justify-center shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1">Idea, Feasibility &amp; Planning</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Benchmark your commercial investment with the{' '}
                  <Link to="/tools/project-cost-estimator" className="text-[#ccff00] underline hover:text-white">
                    AI Project Cost Estimator
                  </Link>{' '}
                  and select modern infrastructure using the{' '}
                  <Link to="/tools/tech-stack-recommender" className="text-[#ccff00] underline hover:text-white">
                    Tech Stack Recommender
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="text-center text-[#ccff00]/40 text-lg font-mono">↓</div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#ccff00]/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white text-black font-mono font-black flex items-center justify-center shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1">Architecture &amp; Engineering Sprints</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Engage AbuQitmirLabs to build high-performance web applications, custom enterprise platforms, mobile apps, or autonomous AI agents with full IP handover.
                </p>
              </div>
            </div>

            <div className="text-center text-[#ccff00]/40 text-lg font-mono">↓</div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#ccff00]/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#06B6D4] text-black font-mono font-black flex items-center justify-center shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1">Audit, Pre-Launch &amp; Optimization</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Validate Core Web Vitals with the{' '}
                  <Link to="/tools/website-audit" className="text-[#ccff00] underline hover:text-white">
                    Website Audit Tool
                  </Link>
                  , execute 45 launch tasks with the{' '}
                  <Link to="/tools/seo-checklist" className="text-[#ccff00] underline hover:text-white">
                    SEO Checklist Generator
                  </Link>
                  , and monitor trust using the{' '}
                  <Link to="/tools/website-authority-analyzer" className="text-[#ccff00] underline hover:text-white">
                    Website Authority Analyzer
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="text-center text-[#ccff00]/40 text-lg font-mono">↓</div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:border-[#ccff00]/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6] text-black font-mono font-black flex items-center justify-center shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white mb-1">Autonomous Scale &amp; AI Integration</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Evaluate your organizational readiness for enterprise AI agent integration using the{' '}
                  <Link to="/tools/ai-readiness-score" className="text-[#ccff00] underline hover:text-white">
                    AI Readiness Score
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ ACCORDION ═══════════════ */}
        <section aria-labelledby="faq-title" className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-12">
            <h2 id="faq-title" className="text-2xl sm:text-4xl font-serif italic text-white tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              Clear answers regarding privacy, licensing, usage limits, and methodology.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-neutral-900/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-white font-semibold text-sm sm:text-base hover:text-[#ccff00] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#ccff00]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════ FINAL CALL TO ACTION ═══════════════ */}
        <section aria-label="Start Your Custom Project" className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-neutral-900 via-black to-neutral-950 border border-white/10 text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>Custom Engineering &amp; AI Builds</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white tracking-tight">
                Need a Custom Tool or Dedicated Build Team?
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
                AbuQitmirLabs designs and deploys custom web applications, enterprise software, and autonomous AI agents for businesses worldwide. Full IP ownership and clean sprint handoffs.
              </p>

              <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
                <Link
                  to="/contact"
                  onMouseEnter={() => preloadRoute('/contact')}
                  onTouchStart={() => preloadRoute('/contact')}
                  className="px-8 py-4 bg-[#ccff00] text-black font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-[#ccff00]/20 inline-flex items-center gap-2"
                >
                  <span>Start a Project Discussion</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/case-studies"
                  onMouseEnter={() => preloadRoute('/case-studies')}
                  onTouchStart={() => preloadRoute('/case-studies')}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default ToolsIndexPage;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Printer,
  ChevronRight,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  Cpu,
  BrainCircuit,
  Building,
  Users,
  Compass,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  Clock,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedToolsSection from '../components/RelatedToolsSection';
import { trackToolUsage } from '../utils/analytics';
import {
  CATEGORIES,
  calculateScores,
  getReadinessLevel,
  getScoreColor,
  getFallbackResult
} from '../utils/aiReadinessEngine';
import {
  AiReadinessResult,
  BusinessFormState
} from '../types/aiReadiness';

const STORAGE_KEY = 'ai_readiness_v1';

export const AiReadinessScorePage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [result, setResult] = useState<AiReadinessResult | null>(null);
  const [error, setError] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [form, setForm] = useState<BusinessFormState>({
    companyName: '',
    industry: '',
    teamSize: '',
    currentAiUsage: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.result) {
          setResult(parsed.result);
        }
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.form) setForm(parsed.form);
      }
    } catch (err) {
      console.warn('Could not load saved AI readiness data', err);
    }
  }, []);

  // Save to localStorage whenever state updates
  useEffect(() => {
    if (result) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ result, answers, form })
        );
      } catch (err) {
        console.warn('Could not save data', err);
      }
    }
  }, [result, answers, form]);

  const totalQuestions = CATEGORIES.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const completionPercent = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError('');
  };

  const isCategoryComplete = (categoryIndex: number) => {
    const category = CATEGORIES[categoryIndex];
    return category.questions.every((q) => answers[q.id] !== undefined);
  };

  const nextCategory = () => {
    if (currentCategory < CATEGORIES.length - 1) {
      setCurrentCategory(currentCategory + 1);
      const element = document.getElementById('assessment-card');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const prevCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
      const element = document.getElementById('assessment-card');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!form.industry) {
      setError('Please select your business industry before submitting.');
      setCurrentCategory(0);
      return;
    }

    if (!form.teamSize) {
      setError('Please select your team size.');
      setCurrentCategory(0);
      return;
    }

    if (!form.currentAiUsage) {
      setError('Please select your current AI usage level.');
      setCurrentCategory(0);
      return;
    }

    if (answeredQuestions < totalQuestions) {
      setError(
        `Please complete all assessment questions (${answeredQuestions}/${totalQuestions} answered).`
      );
      // Find first incomplete category
      const firstIncomplete = CATEGORIES.findIndex((_, idx) => !isCategoryComplete(idx));
      if (firstIncomplete !== -1) {
        setCurrentCategory(firstIncomplete);
      }
      return;
    }

    setLoading(true);
    setProgress(0);
    setStep(0);

    trackToolUsage('ai-readiness-score', 'start_assessment', {
      industry: form.industry,
      team_size: form.teamSize,
      current_ai_usage: form.currentAiUsage
    });

    const steps = [
      'Analyzing your data infrastructure & pipelines...',
      'Evaluating cloud readiness and API architecture...',
      'Assessing workforce data literacy & AI skills...',
      'Scoring workflow repeatability and SOP clarity...',
      'Reviewing executive leadership strategy & budget...',
      'Synthesizing your personalized AI adoption roadmap...',
    ];

    // Smooth UI progress transition
    for (let i = 0; i < steps.length; i++) {
      setStatusText(steps[i]);
      setStep(i + 1);
      setProgress(Math.round(((i + 1) / steps.length) * 90));
      await new Promise((r) => setTimeout(r, 450));
    }

    try {
      const res = await fetch('/api/ai-readiness-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, form }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      if (data.success && data.result) {
        setProgress(100);
        setResult(data.result);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || 'Failed to generate AI score');
      }
    } catch (err: any) {
      console.warn('API call failed; calculating client-side algorithmic score:', err);
      // Resilient fallback: Compute deterministic score locally
      const localResult = getFallbackResult(answers, form);
      setProgress(100);
      setResult(localResult);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  const resetAssessment = () => {
    setResult(null);
    setAnswers({});
    setForm({
      companyName: '',
      industry: '',
      teamSize: '',
      currentAiUsage: '',
    });
    setCurrentCategory(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadPDF = () => {
    window.print();
  };

  // Schema structured data
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'AI Readiness Score',
    'url': 'https://www.abuqitmirlabs.tech/tools/ai-readiness-score',
    'description': 'Free AI Readiness Score for your business. Assess your data infrastructure, technology stack, team skills, processes, strategy, and culture. Get a personalized AI adoption roadmap.',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'AI readiness assessment',
      '6-category scoring',
      'Personalized AI roadmap',
      'Industry-specific recommendations',
      'PDF report export',
      'AI-powered insights'
    ],
    'provider': {
      '@type': 'Organization',
      'name': 'AbuQitmirLabs',
      'url': 'https://www.abuqitmirlabs.tech'
    }
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Assess Your AI Readiness',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Enter Business Details',
        'text': 'Provide your industry, team size, and current AI usage.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Answer 15 Questions',
        'text': 'Rate your capabilities across 6 categories: data, technology, team, processes, strategy, and culture.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Get Your Score',
        'text': 'Receive your AI Readiness Score (0-100) with category breakdown.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Follow Your Roadmap',
        'text': 'Get a personalized 3-phase roadmap to increase your AI readiness.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is an AI Readiness Score?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'An AI Readiness Score measures how prepared your organization is to adopt and benefit from AI. It evaluates six dimensions: data infrastructure, technology stack, team skills, processes, strategy, and culture.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long does the assessment take?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'About 3-5 minutes. There are 15 questions across 6 categories, and you can save progress.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is a good AI Readiness Score?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': '70+ is considered good. 50-69 means you need some foundational work. Below 50 means you should focus on fundamentals first: data, team skills, and process documentation.'
        }
      }
    ]
  };

  const breadcrumbSchema = {
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
        'item': 'https://www.abuqitmirlabs.tech/tools'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'AI Readiness Score',
        'item': 'https://www.abuqitmirlabs.tech/tools/ai-readiness-score'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Free AI Readiness Score — Assess Your Business AI Maturity | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Get a free AI Readiness Score for your business. Assess your data infrastructure, team skills, processes, and technology stack. Get a personalized AI adoption roadmap."
        />
        <meta
          name="keywords"
          content="ai readiness score, ai readiness assessment, ai maturity model, ai adoption readiness, business ai readiness, ai transformation score, ai readiness checklist, free ai assessment"
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools/ai-readiness-score" />
        <meta property="og:title" content="Free AI Readiness Score | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="Assess how ready your business is for AI adoption. Get a personalized score, category breakdown, and AI roadmap."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools/ai-readiness-score" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free AI Readiness Score | AbuQitmirLabs" />
        <meta
          name="twitter:description"
          content="Assess your business AI maturity across 6 dimensions in 3 minutes. Free roadmap and report."
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
          <section className="relative pt-8 pb-16 md:pt-12 md:pb-20 border-b border-white/5 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ccff00]/5 blur-[130px] pointer-events-none rounded-full" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center space-x-2 text-xs text-neutral-400 mb-6 font-mono">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
                <span>›</span>
                <span className="text-[#ccff00]">AI Readiness Score</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span>100% Free · No Signup Required · Instant Strategic Audit</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Free AI Readiness <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#ccff00]">Score</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
                Assess how ready your business is for custom AI agents and enterprise automation. Receive an authoritative score across 6 key pillars, prioritized gap analysis, and an actionable 3-phase roadmap.
              </p>

              {/* Hero CTA */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <a
                  href="#assessment-card"
                  className="px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#ccff00]/15 flex items-center gap-2"
                >
                  <span>Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-xs text-neutral-400 font-mono">
                <span className="flex items-center justify-center gap-1.5">⚡ 3-Min Audit</span>
                <span className="flex items-center justify-center gap-1.5">🎯 6 Pillars</span>
                <span className="flex items-center justify-center gap-1.5">📊 Instant Score</span>
                <span className="flex items-center justify-center gap-1.5">🗺️ Custom Roadmap</span>
                <span className="flex items-center justify-center gap-1.5">🤖 AI-Powered</span>
                <span className="flex items-center justify-center gap-1.5">🔒 Zero Data Storage</span>
              </div>
            </div>
          </section>
        )}

        {/* ASSESSMENT SECTION */}
        {!result && !loading && (
          <section id="assessment-card" className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6">
            {/* Step 1: Business Profile Form */}
            {currentCategory === 0 && (
              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">First, Tell Us About Your Business</h2>
                    <p className="text-xs text-neutral-400">This calibrates industry benchmarks and tailors your AI roadmap.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="e.g., Acme Innovations"
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Industry Vertical *
                      </label>
                      <select
                        value={form.industry}
                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                        required
                      >
                        <option value="">Select industry...</option>
                        <option value="healthcare">🏥 Healthcare & Biotech</option>
                        <option value="fintech">💰 Fintech, Banking & Insurance</option>
                        <option value="retail">🛍️ Retail & E-Commerce</option>
                        <option value="realestate">🏠 Real Estate & PropTech</option>
                        <option value="education">🎓 Education & EdTech</option>
                        <option value="hospitality">🍽️ Hospitality & Travel</option>
                        <option value="tech">⚙️ Technology & SaaS</option>
                        <option value="legal">⚖️ Legal & Compliance</option>
                        <option value="manufacturing">🏭 Manufacturing & Industrial</option>
                        <option value="logistics">🚚 Logistics & Supply Chain</option>
                        <option value="agency">📈 Agency & Professional Services</option>
                        <option value="other">📦 Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Team Size *
                      </label>
                      <select
                        value={form.teamSize}
                        onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                        required
                      >
                        <option value="">Select team size...</option>
                        <option value="solo">🧑 Solo Founder / Freelancer (1)</option>
                        <option value="small">👥 Small Team (2–10)</option>
                        <option value="medium">👥 Growing Scaleup (11–50)</option>
                        <option value="large">🏢 Mid-Market (51–200)</option>
                        <option value="enterprise">🏛️ Enterprise (200+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Current AI Adoption Status *
                    </label>
                    <select
                      value={form.currentAiUsage}
                      onChange={(e) => setForm({ ...form, currentAiUsage: e.target.value })}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ccff00] transition-colors text-sm"
                      required
                    >
                      <option value="">Select current stage...</option>
                      <option value="none">🚫 No active AI adoption yet</option>
                      <option value="experimenting">🧪 Individual staff experimenting with ChatGPT / Claude</option>
                      <option value="some">✅ Using AI tools for select marketing or coding tasks</option>
                      <option value="integrated">🔗 Custom APIs or automated agents integrated in core workflows</option>
                      <option value="advanced">🚀 Proprietary fine-tuned models & multi-agent swarms in production</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Assessment Progress Header */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 mb-6 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400">
                  Category {currentCategory + 1} of {CATEGORIES.length}: <strong className="text-white">{CATEGORIES[currentCategory].title}</strong>
                </span>
                <span className="text-[#ccff00] font-bold">
                  {completionPercent}% Completed ({answeredQuestions}/{totalQuestions})
                </span>
              </div>
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#ccff00] to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            {/* Category Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6">
              {CATEGORIES.map((cat, idx) => {
                const complete = isCategoryComplete(idx);
                const isActive = currentCategory === idx;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCurrentCategory(idx)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                        : complete
                        ? 'bg-neutral-900/70 border-emerald-500/40 text-neutral-300 hover:border-emerald-500/70'
                        : 'bg-neutral-900/40 border-white/10 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{cat.icon}</span>
                      {complete && (
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold leading-tight line-clamp-1">{cat.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Card & Questions */}
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="text-3xl sm:text-4xl p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {CATEGORIES[currentCategory].icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {CATEGORIES[currentCategory].title}
                    </h2>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#ccff00] border border-[#ccff00]/20">
                      Weight: {CATEGORIES[currentCategory].weight}%
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                    {CATEGORIES[currentCategory].description}
                  </p>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {CATEGORIES[currentCategory].questions.map((question, qIdx) => {
                  const selectedVal = answers[question.id];
                  return (
                    <div
                      key={question.id}
                      className="p-5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div className="flex items-start gap-2.5 mb-3.5">
                        <span className="px-2 py-0.5 rounded bg-[#ccff00] text-black font-mono text-[10px] font-black shrink-0 mt-0.5">
                          Q{qIdx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                          {question.label}
                        </h3>
                      </div>

                      <div className="space-y-2 mt-3">
                        {question.options.map((opt, oIdx) => {
                          const isSelected = selectedVal === opt.value;
                          return (
                            <label
                              key={oIdx}
                              onClick={() => handleAnswer(question.id, opt.value)}
                              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                                  : 'bg-neutral-900/40 border-white/5 hover:bg-neutral-900/80 hover:border-white/20 text-neutral-300'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'border-[#ccff00] bg-[#ccff00]'
                                    : 'border-neutral-500'
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                )}
                              </div>
                              <span className="text-xs sm:text-sm leading-relaxed">
                                {opt.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 text-xs font-mono mb-6 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Assessment Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevCategory}
                disabled={currentCategory === 0}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-xs rounded-xl border border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous Category
              </button>

              {currentCategory < CATEGORIES.length - 1 ? (
                <button
                  type="button"
                  onClick={nextCategory}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 flex items-center justify-center gap-2"
                >
                  <span>Next Category</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-[#ccff00]/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Compute My AI Readiness Score</span>
                </button>
              )}
            </div>

            <p className="text-center text-xs text-neutral-500 font-mono mt-8">
              🔒 Privacy Guaranteed: Your assessment answers are strictly processed in real-time. Zero personal data is sold or stored.
            </p>
          </section>
        )}

        {/* LOADING ANIMATION STATE */}
        {loading && (
          <div className="py-24 max-w-xl mx-auto px-4 text-center">
            <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] mx-auto mb-6">
                <BrainCircuit className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">Analyzing AI Maturity...</h3>
              <p className="text-xs text-neutral-400 font-mono mb-6">{statusText}</p>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-black rounded-full overflow-hidden border border-white/10 mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#ccff00] via-emerald-400 to-[#ccff00] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps List */}
              <ul className="text-left space-y-2.5 text-xs font-mono border-t border-white/10 pt-6">
                {[
                  'Auditing Data Infrastructure & Pipelines',
                  'Benchmarking Technology & Cloud APIs',
                  'Analyzing Team Literacy & Skills Matrix',
                  'Scoring Workflows & Process Determinism',
                  'Evaluating Executive Strategy & Budget',
                  'Synthesizing 3-Phase Adoption Roadmap'
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

        {/* RESULTS DASHBOARD */}
        {result && !loading && (
          <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6">
            {/* 1. Executive Score Hero Banner */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 blur-3xl pointer-events-none rounded-full" />

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                {/* SVG Gauge Circle */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="82"
                      fill="none"
                      stroke="#222"
                      strokeWidth="16"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="82"
                      fill="none"
                      stroke={getScoreColor(result.overallScore)}
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={`${(result.overallScore / 100) * 515} 515`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span
                      className="text-5xl sm:text-6xl font-black tracking-tight"
                      style={{ color: getScoreColor(result.overallScore) }}
                    >
                      {result.overallScore}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      out of 100
                    </span>
                  </div>
                </div>

                {/* Score Summary Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider mb-3"
                    style={{
                      borderColor: getScoreColor(result.overallScore),
                      color: getScoreColor(result.overallScore),
                      backgroundColor: `${getScoreColor(result.overallScore)}15`
                    }}
                  >
                    <span>{result.readinessLevel}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                    Your AI Readiness Assessment
                  </h2>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                    {result.scoreSummary}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono">
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                      Industry: <strong className="text-white capitalize">{form.industry || 'General'}</strong>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                      Team Size: <strong className="text-white capitalize">{form.teamSize || 'Unspecified'}</strong>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                      AI Adoption: <strong className="text-white capitalize">{form.currentAiUsage || 'Exploring'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Category Score Breakdown Grid */}
            <div className="mb-10">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                Pillar Breakdown & Category Scores
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.categoryScores.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{cat.icon}</span>
                          <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                        </div>
                        <span
                          className="text-xl font-black font-mono"
                          style={{ color: getScoreColor(cat.score) }}
                        >
                          {cat.score}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-black rounded-full overflow-hidden mb-3 border border-white/5">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${cat.score}%`,
                            backgroundColor: getScoreColor(cat.score)
                          }}
                        />
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                        {cat.feedback}
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider border-t border-white/5 pt-2 flex justify-between">
                      <span>Weight: {cat.weight}%</span>
                      <span>Target: &gt;75</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Strengths & Gaps Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Strengths */}
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-emerald-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h4 className="text-base font-bold uppercase tracking-wider text-white">
                    Key Organizational Strengths
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {result.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <span className="text-emerald-400 mt-0.5">✔</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-amber-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-4 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="text-base font-bold uppercase tracking-wider text-white">
                    Primary Areas for Improvement
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {result.gaps.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <span className="text-amber-400 mt-0.5">⚠</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Strategic 3-Phase Adoption Roadmap */}
            <div className="mb-10">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  🗺️ Your Personalized AI Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  A structured 3-phase execution timeline tailored to your readiness level and score:
                </p>
              </div>

              <div className="space-y-5">
                {result.roadmap.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#ccff00] text-black font-black text-xs flex items-center justify-center font-mono">
                          0{idx + 1}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-white">{phase.title}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold">
                        {phase.duration}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 italic mb-4">
                      "{phase.goal}"
                    </p>

                    <div className="space-y-2 mb-4">
                      {phase.actions.map((act, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <span className="text-[#ccff00] mt-0.5 font-bold">→</span>
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-3 text-xs text-neutral-400 font-mono">
                      <strong className="text-[#ccff00]">Success Metrics:</strong> {phase.metrics}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Recommended Tools & Technology Stack */}
            <div className="mb-10">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                🛠️ Recommended Tools for Your Readiness Tier
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {result.recommendedTools.map((grp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl"
                  >
                    <div className="text-2xl mb-2">{grp.icon}</div>
                    <h4 className="text-sm font-bold text-white mb-3">{grp.category}</h4>
                    <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                      {grp.tools.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Top 5 Next Immediate Steps */}
            <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-black text-white mb-4">
                ⚡ Immediate 30-Day Action Steps
              </h3>

              <div className="space-y-3">
                {result.nextSteps.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/50 border border-white/5 flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black text-xs flex items-center justify-center shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-sm font-bold text-white block mb-0.5">
                        {stepItem.title}
                      </strong>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={downloadPDF}
                className="px-6 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF Report</span>
              </button>

              <Link
                to="/ai-agent-development"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors flex items-center gap-2"
              >
                <BrainCircuit className="w-4 h-4 text-[#ccff00]" />
                <span>Build Custom AI with AbuQitmirLabs</span>
              </Link>

              <button
                type="button"
                onClick={resetAssessment}
                className="px-5 py-3.5 bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </section>
        )}

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 md:py-20 border-t border-white/5 bg-neutral-950/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2 block">
                Executive Knowledge Base
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'What is an AI Readiness Score?',
                  a: 'An AI Readiness Score measures how prepared your organization is to successfully adopt and benefit from AI technologies. It evaluates six core dimensions: data infrastructure, technology stack, team skills, business processes, leadership strategy, and innovation culture.'
                },
                {
                  q: 'How long does this assessment take?',
                  a: 'Approximately 3 to 5 minutes. There are 15 targeted questions across 6 categories. Your progress automatically persists in browser storage so you can pause and return at any time.'
                },
                {
                  q: 'Is this assessment really 100% free?',
                  a: 'Yes, completely free. No account signup, credit card, or paywall is required. You can retake the assessment unlimited times or evaluate multiple business units.'
                },
                {
                  q: 'What constitutes a "Good" AI Readiness Score?',
                  a: 'A score of 70+ indicates you are ready for production AI agent pilots. Scores between 50 and 69 indicate strong potential that requires preliminary data organization. Scores under 50 simply highlight that foundational documentation and data hygiene should be prioritized before deploying complex models.'
                },
                {
                  q: 'How accurate is the score?',
                  a: 'The assessment synthesizes established enterprise AI maturity frameworks (Gartner, Google Cloud AI Maturity, and MIT Sloan) combined with AbuQitmirLabs production deployment heuristics. It is designed to provide actionable strategic direction.'
                },
                {
                  q: 'What is the difference between this tool and a full technical AI audit?',
                  a: 'This is an executive self-assessment that computes instant scoring and a 3-phase strategic roadmap. A custom AbuQitmirLabs AI audit involves deep code-level repository reviews, vector latency benchmarking, and automated data pipeline profiling.'
                },
                {
                  q: 'Do you store or sell my assessment answers?',
                  a: 'No. All calculations are executed in memory and cached only within your local browser storage. We never sell, harvest, or transmit your proprietary answers to third parties.'
                },
                {
                  q: 'How does AbuQitmirLabs assist with enterprise AI implementation?',
                  a: 'AbuQitmirLabs specializes in building custom autonomous AI agents, multi-agent supervisor swarms, private enterprise RAG architectures, and custom Next.js/FastAPI full-stack platforms. We guide you from assessment to production-grade deployment.'
                }
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl bg-neutral-900/60 border border-white/10 p-5 backdrop-blur-xl transition-colors open:bg-neutral-900/90"
                >
                  <summary className="font-bold text-sm sm:text-base text-white cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <ChevronDown className="w-4 h-4 text-[#ccff00] transition-transform group-open:rotate-180 shrink-0" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-3">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="py-20 border-t border-white/10 bg-gradient-to-b from-neutral-950 to-black text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#ccff00]/5 blur-[140px] pointer-events-none rounded-full" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Ready to Deploy Production AI?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Turn Your AI Roadmap Into Proprietary Moats
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              AbuQitmirLabs designs and builds custom AI agents, automated RAG pipelines, and high-performance software systems for high-growth enterprises worldwide.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/ai-agent-development"
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold text-sm rounded-xl hover:bg-[#b8e600] transition-all shadow-xl shadow-[#ccff00]/15"
              >
                Explore AI Agent Development →
              </Link>
              <Link
                to="/contact"
                className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors"
              >
                Schedule Technical Architecture Call
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Cross-Tool Linking Matrix */}
      <RelatedToolsSection currentTool="ai-readiness-score" />

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default AiReadinessScorePage;

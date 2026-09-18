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
  AlertTriangle,
  HelpCircle,
  Clock,
  Briefcase,
  DollarSign,
  Boxes,
  Code2,
  ExternalLink,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  PROJECT_TYPES,
  TEAM_SIZES,
  EXPERIENCE_LEVELS,
  TIMELINE_OPTIONS,
  BUDGET_RANGES,
  SCALE_OPTIONS,
  FEATURES,
  PREFERENCES,
  getFallbackRecommendation
} from '../utils/techStackEngine';
import {
  TechStackFormData,
  TechStackResult
} from '../types/techStack';

const STORAGE_KEY = 'tech_stack_recommender_v1';

export const TechStackRecommenderPage: React.FC = () => {
  const [form, setForm] = useState<TechStackFormData>({
    projectType: '',
    teamSize: '',
    experience: '',
    timeline: '',
    budget: '',
    scale: '',
    features: [],
    preferences: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [result, setResult] = useState<TechStackResult | null>(null);
  const [error, setError] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.result) setResult(parsed.result);
        if (parsed.form) setForm(parsed.form);
      }
    } catch (err) {
      console.warn('Could not load saved tech stack data', err);
    }
  }, []);

  // Save to localStorage whenever result or form changes
  useEffect(() => {
    if (result) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ result, form }));
      } catch (err) {
        console.warn('Could not save tech stack data', err);
      }
    }
  }, [result, form]);

  const update = (field: keyof TechStackFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleFeature = (value: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(value)
        ? prev.features.filter((f) => f !== value)
        : [...prev.features, value],
    }));
    setError('');
  };

  const togglePreference = (value: string) => {
    setForm((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(value)
        ? prev.preferences.filter((p) => p !== value)
        : [...prev.preferences, value],
    }));
    setError('');
  };

  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return form.projectType !== '';
      case 1:
        return form.teamSize !== '' && form.experience !== '';
      case 2:
        return form.timeline !== '' && form.budget !== '';
      case 3:
        return form.scale !== '';
      case 4:
        return form.features.length > 0;
      case 5:
        return form.preferences.length > 0;
      default:
        return false;
    }
  };

  const allStepsComplete = (): boolean =>
    [0, 1, 2, 3, 4, 5].every((i) => isStepComplete(i));

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      const el = document.getElementById('wizard-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const el = document.getElementById('wizard-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async () => {
    setError('');

    if (!allStepsComplete()) {
      setError('Please review and complete all wizard steps before submitting.');
      return;
    }

    setLoading(true);
    setProgress(0);
    setStep(0);

    const steps = [
      'Analyzing project architecture & requirements...',
      'Evaluating team velocity & engineering experience...',
      'Matching battle-tested frontend & backend frameworks...',
      'Optimizing database schemas & cloud infrastructure...',
      'Benchmarking monthly operating costs & free tiers...',
      'Synthesizing your tailored 2026 tech stack roadmap...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setStatusText(steps[i]);
      setStep(i + 1);
      setProgress(Math.round(((i + 1) / steps.length) * 90));
      await new Promise((r) => setTimeout(r, 450));
    }

    try {
      const res = await fetch('/api/tech-stack-recommender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
        throw new Error(data.error || 'Failed to generate recommendation');
      }
    } catch (err: any) {
      console.warn('API call failed; serving algorithmic recommendation:', err);
      const localResult = getFallbackRecommendation(form);
      setProgress(100);
      setResult(localResult);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  const resetTool = () => {
    if (window.confirm('Reset the recommender? Your current selections will be cleared.')) {
      setResult(null);
      setForm({
        projectType: '',
        teamSize: '',
        experience: '',
        timeline: '',
        budget: '',
        scale: '',
        features: [],
        preferences: [],
      });
      setCurrentStep(0);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn(e);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  // Structured Schema data
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Tech Stack Recommender',
    'url': 'https://www.abuqitmirlabs.tech/tools/tech-stack-recommender',
    'description': 'Free Tech Stack Recommender by AbuQitmirLabs. AI-powered analysis of frontend, backend, database, hosting, and tools tailored to team size, timeline, and budget.',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'featureList': [
      'Personalized tech stack recommendation',
      'Frontend, backend, and database selection',
      'Hosting and deployment suggestions',
      'Learning curve & community indicators',
      'Cost breakdown & free tier guidance',
      'Alternative technologies & trade-offs',
      'Step-by-step setup roadmap',
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
    'name': 'How to Choose Your Ideal Tech Stack',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Describe Your Project',
        'text': 'Select your project type (SaaS, e-commerce, marketplace, AI agent, etc.).',
      },
      {
        '@type': 'HowToStep',
        'name': 'Tell Us About Your Team',
        'text': 'Provide team size and developer experience level.',
      },
      {
        '@type': 'HowToStep',
        'name': 'Set Timeline & Budget',
        'text': 'Choose your delivery deadline and infrastructure budget.',
      },
      {
        '@type': 'HowToStep',
        'name': 'Select Essential Features',
        'text': 'Pick required features like auth, payments, realtime, or AI.',
      },
      {
        '@type': 'HowToStep',
        'name': 'Receive Recommended Stack',
        'text': 'Get an authoritative tech stack blueprint with alternatives, setup roadmap, and cost estimates.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is a tech stack?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A tech stack is the complete combination of programming languages, frameworks, databases, and infrastructure tools used to build, deploy, and scale a web or mobile application.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How does this tech stack recommender work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The recommender evaluates 6 dimensions: project vertical, team composition, experience level, timeline, scale, and desired technical trade-offs to formulate an optimal architecture.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is the tech stack recommender really 100% free?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, completely free. No signup, email capture, or paywall is required. You can test unlimited project ideas.',
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
        'item': 'https://www.abuqitmirlabs.tech/tools/project-cost-estimator',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Tech Stack Recommender',
        'item': 'https://www.abuqitmirlabs.tech/tools/tech-stack-recommender',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Free Tech Stack Recommender — Best Stack for Your Project | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Get a personalized tech stack recommendation for your project. AI-powered analysis of frontend, backend, database, hosting, and tools — tailored to your team size, budget, and timeline."
        />
        <meta
          name="keywords"
          content="tech stack recommender, tech stack picker, best tech stack for project, technology stack recommendation, choose tech stack, tech stack for startup, tech stack 2026, free tech stack tool"
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools/tech-stack-recommender" />
        <meta property="og:title" content="Free Tech Stack Recommender | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="Get a personalized tech stack recommendation for your project in 2 minutes. Architecture, alternatives, and cost breakdown."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools/tech-stack-recommender" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Tech Stack Recommender | AbuQitmirLabs" />
        <meta
          name="twitter:description"
          content="Find the optimal tech stack for your startup or enterprise project in 2026. 100% Free."
        />
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Global Header */}
      <Header />

      <main id="main-content" className="pt-20 md:pt-28">
        {/* HERO SECTION */}
        {!result && (
          <section className="relative pt-8 pb-14 md:pt-12 md:pb-18 border-b border-white/5 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ccff00]/5 blur-[130px] pointer-events-none rounded-full" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center space-x-2 text-xs text-neutral-400 mb-6 font-mono">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <span className="text-neutral-500">Tools</span>
                <span>›</span>
                <span className="text-[#ccff00]">Tech Stack Recommender</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span>100% Free · No Signup Required · 2026 Architecture Blueprint</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#ccff00]">Tech Stack</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
                Answer 6 quick questions and receive an authoritative tech stack blueprint — frontend, backend, database, hosting, and AI tools — mathematically optimized for your team, timeline, and budget.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <a
                  href="#wizard-container"
                  className="px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-[#ccff00]/15 flex items-center gap-2"
                >
                  <span>Start Tech Stack Recommender</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-xs text-neutral-400 font-mono">
                <span className="flex items-center justify-center gap-1.5">⚡ 2-Min Flow</span>
                <span className="flex items-center justify-center gap-1.5">🎯 12+ Stack Layers</span>
                <span className="flex items-center justify-center gap-1.5">💡 Architectural Logic</span>
                <span className="flex items-center justify-center gap-1.5">🔄 Tested Alternatives</span>
                <span className="flex items-center justify-center gap-1.5">🤖 AI-Grounded</span>
                <span className="flex items-center justify-center gap-1.5">🔒 Zero Data Storage</span>
              </div>
            </div>
          </section>
        )}

        {/* WIZARD SECTION */}
        {!result && !loading && (
          <section id="wizard-container" className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6">
            {/* Progress Bar */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 mb-6 backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400">
                  Step {currentStep + 1} of 6: <strong className="text-white">
                    {['Project Type', 'Team & Experience', 'Timeline & Budget', 'Expected Scale', 'Core Features', 'Strategic Priorities'][currentStep]}
                  </strong>
                </span>
                <span className="text-[#ccff00] font-bold">
                  {Math.round(((currentStep + 1) / 6) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#ccff00] to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {['Project', 'Team', 'Timeline', 'Scale', 'Features', 'Priorities'].map((lbl, idx) => {
                const complete = isStepComplete(idx);
                const isActive = currentStep === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentStep(idx)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isActive
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                        : complete
                        ? 'bg-neutral-900/70 border-emerald-500/40 text-neutral-300'
                        : 'bg-neutral-900/40 border-white/10 text-neutral-500 hover:border-white/20'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                        complete
                          ? 'bg-emerald-500 text-black'
                          : isActive
                          ? 'bg-[#ccff00] text-black'
                          : 'bg-black/80 text-neutral-400 border border-white/10'
                      }`}
                    >
                      {complete ? '✓' : idx + 1}
                    </span>
                    <span className="text-[11px] font-bold leading-none">{lbl}</span>
                  </button>
                );
              })}
            </div>

            {/* Wizard Main Card */}
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-8 shadow-2xl">
              {/* STEP 0: Project Type */}
              {currentStep === 0 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-1">
                      Step 1 of 6
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      What are you building?
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Your project archetype dictates server requirements, data models, and caching strategies.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {PROJECT_TYPES.map((opt) => {
                      const isSelected = form.projectType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update('projectType', opt.value)}
                          className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#ccff00]/10 border-[#ccff00] shadow-lg shadow-[#ccff00]/10 text-white'
                              : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                          }`}
                        >
                          <span className="text-sm font-bold text-white block mb-1">{opt.label}</span>
                          <span className="text-xs text-neutral-400">{opt.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 1: Team & Experience */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-1">
                      Step 2 of 6
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Tell us about your team
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Avoid over-engineering: solo founders need unified frameworks, while large teams benefit from modular micro-frontends.
                    </p>
                  </div>

                  {/* Team Size */}
                  <div className="mb-8">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold mb-3">
                      Team Composition *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {TEAM_SIZES.map((opt) => {
                        const isSelected = form.teamSize === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => update('teamSize', opt.value)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                                : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                            }`}
                          >
                            <span className="text-sm font-bold text-white block mb-1">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold mb-3">
                      Core Engineering Experience Level *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {EXPERIENCE_LEVELS.map((opt) => {
                        const isSelected = form.experience === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => update('experience', opt.value)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                                : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                            }`}
                          >
                            <span className="text-sm font-bold text-white block mb-1">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Timeline & Budget */}
              {currentStep === 2 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-1">
                      Step 3 of 6
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Timeline & Infrastructure Budget
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      We match your stack to maximize velocity while ensuring infrastructure costs stay within bounds.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="mb-8">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold mb-3">
                      Launch Timeline *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {TIMELINE_OPTIONS.map((opt) => {
                        const isSelected = form.timeline === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => update('timeline', opt.value)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                                : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                            }`}
                          >
                            <span className="text-sm font-bold text-white block mb-1">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#ccff00] font-bold mb-3">
                      Development & Infrastructure Budget Range *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {BUDGET_RANGES.map((opt) => {
                        const isSelected = form.budget === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => update('budget', opt.value)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                                : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                            }`}
                          >
                            <span className="text-sm font-bold text-white block mb-1">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Expected Scale */}
              {currentStep === 3 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-1">
                      Step 4 of 6
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Anticipated Scale & User Concurrency
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      How many active users or queries do you expect in the next 12 to 24 months?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {SCALE_OPTIONS.map((opt) => {
                      const isSelected = form.scale === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update('scale', opt.value)}
                          className={`p-5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-lg shadow-[#ccff00]/10'
                              : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                          }`}
                        >
                          <div>
                            <span className="text-base font-bold text-white block mb-1.5">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Features Multi-Select */}
              {currentStep === 4 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-1">
                      Step 5 of 6
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Which capabilities do you need?
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Select all required modules. Each selection introduces dedicated database adapters and libraries.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {FEATURES.map((opt) => {
                      const isSelected = form.features.includes(opt.value);
                      return (
                        <div
                          key={opt.value}
                          onClick={() => toggleFeature(opt.value)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                              : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'bg-[#ccff00] border-[#ccff00] text-black font-bold'
                                : 'border-neutral-500'
                            }`}
                          >
                            {isSelected && '✓'}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block mb-0.5">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Strategic Preferences */}
              {currentStep === 5 && (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] block mb-1">
                      Step 6 of 6
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      What matters most to your team?
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Pick your primary architectural trade-offs (e.g. speed to market vs. lowest operating cost).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {PREFERENCES.map((opt) => {
                      const isSelected = form.preferences.includes(opt.value);
                      return (
                        <div
                          key={opt.value}
                          onClick={() => togglePreference(opt.value)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                              : 'bg-black/40 border-white/10 hover:bg-white/5 hover:border-white/20 text-neutral-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'bg-[#ccff00] border-[#ccff00] text-black font-bold'
                                : 'border-neutral-500'
                            }`}
                          >
                            {isSelected && '✓'}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block mb-0.5">{opt.label}</span>
                            <span className="text-xs text-neutral-400">{opt.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 text-xs font-mono mb-6 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-xs rounded-xl border border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous Step
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepComplete(currentStep)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!allStepsComplete()}
                  className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-[#ccff00]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Recommend My Tech Stack</span>
                </button>
              )}
            </div>

            <p className="text-center text-xs text-neutral-500 font-mono mt-8">
              🔒 100% Confidential: All inputs are evaluated in real-time. Zero proprietary project ideas or emails are sold.
            </p>
          </section>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="py-24 max-w-xl mx-auto px-4 text-center">
            <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] mx-auto mb-6">
                <Cpu className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">Architecting Your Tech Stack...</h3>
              <p className="text-xs text-neutral-400 font-mono mb-6">{statusText}</p>

              {/* Progress */}
              <div className="w-full h-2.5 bg-black rounded-full overflow-hidden border border-white/10 mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#ccff00] via-emerald-400 to-[#ccff00] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps */}
              <ul className="text-left space-y-2.5 text-xs font-mono border-t border-white/10 pt-6">
                {[
                  'Benchmarking Project Scale & Latency Requirements',
                  'Matching Frontend & UI Component Frameworks',
                  'Selecting Cloud Database & Storage Adapters',
                  'Configuring Auth, Payment & AI Model Tooling',
                  'Calculating Monthly Infrastructure Cost Ranges',
                  'Generating Production Setup Roadmap'
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
            {/* Header / Hero */}
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl mb-8 relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 blur-3xl pointer-events-none rounded-full" />

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended 2026 Production Blueprint</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {result.stackName}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
                {result.summary}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono">
                <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-neutral-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ccff00]" />
                  <span>Setup Time: <strong className="text-white">{result.estimatedSetupTime}</strong></span>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-neutral-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Difficulty: <strong className="text-white">{result.difficultyLevel}</strong></span>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-neutral-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Starting Infra: <strong className="text-white">{result.monthlyCostEstimate}</strong></span>
                </div>
              </div>
            </div>

            {/* Stack Components Layer by Layer */}
            <div className="mb-12">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  🛠️ Recommended Architecture, Component by Component
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Each layer is specifically matched to your team velocity, database needs, and project complexity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-[#ccff00]/40 transition-all backdrop-blur-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl p-2 rounded-xl bg-black/50 border border-white/5">{comp.icon}</span>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                              {comp.category}
                            </span>
                            <h4 className="text-base font-bold text-white">{comp.name}</h4>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#ccff00] border border-[#ccff00]/20">
                          {comp.costTier}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                        {comp.reason}
                      </p>

                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs font-mono mb-4">
                        <div>
                          <span className="text-neutral-500 text-[10px] block">LEARNING CURVE</span>
                          <span className={`font-bold capitalize ${
                            comp.learningCurve === 'low' ? 'text-emerald-400' : comp.learningCurve === 'medium' ? 'text-amber-400' : 'text-orange-400'
                          }`}>
                            {comp.learningCurve}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500 text-[10px] block">ECOSYSTEM / COMMUNITY</span>
                          <span className="text-neutral-200 font-bold">{comp.community}</span>
                        </div>
                      </div>
                    </div>

                    {/* Alternatives collapsible */}
                    {comp.alternatives && comp.alternatives.length > 0 && (
                      <details className="group text-xs border-t border-white/5 pt-3">
                        <summary className="cursor-pointer text-[#ccff00] font-bold list-none flex items-center justify-between">
                          <span>View Considered Alternatives</span>
                          <span className="group-open:rotate-180 transition-transform">▾</span>
                        </summary>
                        <ul className="mt-2.5 space-y-1.5 pl-2 border-l border-white/10 text-neutral-400">
                          {comp.alternatives.map((alt, aIdx) => (
                            <li key={aIdx} className="leading-snug">
                              <strong className="text-white">{alt.name}</strong> — {alt.reason}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Stack Grid */}
            <div className="mb-12">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
                💡 Why This Stack Fits Your Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.whyThisStack.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 border-l-4 border-l-[#ccff00] backdrop-blur-xl flex items-start gap-4"
                  >
                    <span className="text-2xl p-2 rounded-xl bg-black/40 border border-white/5">{reason.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{reason.title}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-emerald-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Primary Advantages & Synergies
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                  {result.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold mt-0.5">✔</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900/80 border border-amber-500/30 backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-4 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Trade-Offs & Points of Caution
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                  {result.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold mt-0.5">⚠</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Setup Roadmap */}
            <div className="mb-12">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  🗺️ Step-by-Step Setup Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Follow these ordered milestones to bootstrap your local environment and deploy your first production build:
                </p>
              </div>

              <div className="space-y-4">
                {result.setupSteps.map((stp, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#ccff00] text-black font-mono font-black text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white mb-1">{stp.title}</h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                        {stp.description}
                      </p>
                      {stp.resources && stp.resources.length > 0 && (
                        <div className="text-xs font-mono text-neutral-400 border-t border-white/5 pt-2 flex flex-wrap gap-2">
                          <span className="text-[#ccff00]">Docs & References:</span>
                          {stp.resources.map((res, rIdx) => (
                            <span key={rIdx} className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-white">
                              {res}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estimated Monthly Costs */}
            <div className="mb-12">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  💰 Estimated Monthly Infrastructure Costs
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Zero hidden bills: here is what you can expect to pay across your stack from MVP to growth:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {result.costBreakdown.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl">
                    <span className="text-2xl block mb-1">{c.icon}</span>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                      {c.category}
                    </span>
                    <strong className="text-base text-[#ccff00] font-mono block my-1">{c.range}</strong>
                    <p className="text-xs text-neutral-400">{c.note}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-[#ccff00]/40 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    TOTAL ESTIMATED RECURRING INFRASTRUCTURE COST (AT LAUNCH)
                  </span>
                  <span className="text-xs text-neutral-500">Free tiers cover initial prototype development</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#ccff00] font-mono">
                  {result.totalMonthlyCost} / month
                </div>
              </div>
            </div>

            {/* Curated Learning Resources */}
            <div className="mb-12">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
                📚 Curated Learning & Architecture Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {result.learningResources.map((res, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl">
                    <span className="text-2xl block mb-2">{res.icon}</span>
                    <h4 className="text-sm font-bold text-white mb-3">{res.category}</h4>
                    <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                      {res.resources.map((item, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Top 5 Immediate Next Steps */}
            <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-black text-white mb-4">
                ⚡ Immediate 30-Day Engineering Execution Steps
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

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={downloadPDF}
                className="px-6 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF Blueprint</span>
              </button>

              <Link
                to="/contact"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-[#ccff00]" />
                <span>Get Full-Stack Build Help from AbuQitmirLabs</span>
              </Link>

              <button
                type="button"
                onClick={resetTool}
                className="px-5 py-3.5 bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Another Project Idea</span>
              </button>
            </div>
          </section>
        )}

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 md:py-20 border-t border-white/5 bg-neutral-950/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2 block">
                Engineering Architecture FAQ
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'What is a tech stack?',
                  a: 'A tech stack is the complete combination of programming languages, frameworks, databases, and infrastructure tools used to build, deploy, and scale a web or mobile application. Your stack directly influences dev velocity, developer hiring, hosting expenses, and latency.',
                },
                {
                  q: 'How does this recommender work?',
                  a: 'The tool systematically cross-references your project archetype, team experience, target timeline, budget, and desired capabilities against modern 2026 production standards. It balances developer ergonomics with scalable performance.',
                },
                {
                  q: 'Is this tech stack recommender really 100% free?',
                  a: 'Yes, completely free. No account signup, credit card, or paywall is required. You can test unlimited configurations for client proposals or internal roadmaps.',
                },
                {
                  q: 'Should I always use the most hyped modern technologies?',
                  a: 'Not necessarily. While tools like Next.js, TypeScript, and Postgres represent battle-tested modern standards, solo founders on tight deadlines should avoid premature microservices or distributed event queues.',
                },
                {
                  q: 'Can this tool recommend stacks for high-compliance enterprise projects?',
                  a: 'Yes. By choosing Large Team, High Scale, or Healthcare/Fintech verticals, the recommendation automatically factors in HIPAA, PCI-DSS compliance, multi-region database failover, and audited cloud deployments.',
                },
                {
                  q: 'Do you store or log my proprietary startup idea?',
                  a: 'No. All inputs are evaluated in memory in real time. We do not store or sell your answers. Your progress is cached only in your personal browser local storage.',
                },
                {
                  q: 'How does AbuQitmirLabs help with tech stack implementation?',
                  a: 'AbuQitmirLabs specializes in building production-grade software: Next.js 15, TypeScript, Python FastAPI, Autonomous AI Agents, RAG pipelines, and cloud-native databases. We can design your architecture or build the entire application end-to-end.',
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

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default TechStackRecommenderPage;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  BusinessType,
  Industry,
  WebsiteStage,
  PrimaryGoal,
  TeamSize,
  TimeInvestment,
  SeoChecklist,
  ChecklistFormData
} from '../types/seoChecklist';
import {
  generateAlgorithmicChecklist,
  SAMPLE_CHECKLISTS
} from '../utils/seoChecklistGenerator';
import { generateSeoChecklistPdf, GeneratedPdfResult } from '../utils/generateSeoChecklistPdf';
import { db, collection, addDoc, serverTimestamp } from '../lib/firebase';
import { HeroSection } from '../components/seo-checklist/HeroSection';
import { BusinessForm } from '../components/seo-checklist/BusinessForm';
import { LoadingState } from '../components/seo-checklist/LoadingState';
import { SummaryCard } from '../components/seo-checklist/SummaryCard';
import { ProgressBar } from '../components/seo-checklist/ProgressBar';
import { ChecklistPhase } from '../components/seo-checklist/ChecklistPhase';
import { AIInsights } from '../components/seo-checklist/AIInsights';
import { CommonMistakesSection } from '../components/seo-checklist/CommonMistakesSection';
import { SeoResourcesSection } from '../components/seo-checklist/SeoResourcesSection';
import { ChecklistFaqSection } from '../components/seo-checklist/ChecklistFaqSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Download, Mail, ArrowRight, RotateCcw, Share2, Sparkles, Check, ExternalLink, Loader2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

const STORAGE_KEY = 'seo_checklist_progress';

export const SeoChecklistPage: React.FC = () => {
  const [formData, setFormData] = useState<ChecklistFormData>({
    businessType: 'ecommerce',
    industry: 'retail',
    stage: 'growing',
    goal: 'ecommerce',
    teamSize: 'small',
    time: 'moderate'
  });

  const [checklist, setChecklist] = useState<SeoChecklist | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [loading, setLoading] = useState<boolean>(false);
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pdfResult, setPdfResult] = useState<GeneratedPdfResult | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.checklist) {
          setChecklist(parsed.checklist);
        }
        if (parsed.completedTasks) {
          setCompletedTasks(parsed.completedTasks);
        }
      }
    } catch (e) {
      console.warn('Could not read saved SEO checklist progress', e);
    }
  }, []);

  // Save to localStorage whenever checklist or completedTasks change
  useEffect(() => {
    if (checklist) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            checklist,
            completedTasks
          })
        );
      } catch (e) {
        console.warn('Could not save SEO checklist progress', e);
      }
    }
  }, [checklist, completedTasks]);

  const scrollToForm = () => {
    const el = document.getElementById('generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToResults = () => {
    const el = document.getElementById('checklist-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt serverless / API route first
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('/api/seo-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data && data.checklist) {
          setChecklist(data.checklist);
          setCompletedTasks({});
          setOpenPhases({ 0: true, 1: true });
          setLoading(false);
          setTimeout(scrollToResults, 100);
          return;
        }
      }
    } catch (err) {
      console.info('Using high-performance algorithmic checklist engine fallback');
    }

    // High-performance algorithmic engine fallback
    const algoChecklist = generateAlgorithmicChecklist(
      formData.businessType,
      formData.industry,
      formData.stage,
      formData.goal,
      formData.teamSize || undefined,
      formData.time || undefined
    );

    setChecklist(algoChecklist);
    setCompletedTasks({});
    setOpenPhases({ 0: true, 1: true });
    setLoading(false);
    setTimeout(scrollToResults, 100);
  };

  const handleLoadSample = (sampleKey: string) => {
    const sample = SAMPLE_CHECKLISTS[sampleKey] || SAMPLE_CHECKLISTS.ecommerce;
    setChecklist(sample);
    setCompletedTasks({
      'f-gsc': true,
      'f-ssl': true,
      'o-meta': true
    });
    setOpenPhases({ 0: true, 1: true, 2: true });
    setTimeout(scrollToResults, 100);
  };

  const handleToggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleTogglePhase = (index: number) => {
    setOpenPhases((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your checked tasks?')) {
      setCompletedTasks({});
    }
  };

  const handleResetChecklist = () => {
    setChecklist(null);
    setCompletedTasks({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    scrollToForm();
  };

  const handleDownloadPdf = () => {
    const activeChecklist = checklist || generateAlgorithmicChecklist(
      formData.businessType,
      formData.industry,
      formData.stage,
      formData.goal,
      formData.teamSize,
      formData.time
    );
    if (!checklist) {
      setChecklist(activeChecklist);
    }
    const result = generateSeoChecklistPdf(activeChecklist, completedTasks);
    setPdfResult(result);
    result.download();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsSubmittingEmail(true);
    setEmailError(null);

    const activeChecklist = checklist || generateAlgorithmicChecklist(
      formData.businessType,
      formData.industry,
      formData.stage,
      formData.goal,
      formData.teamSize,
      formData.time
    );

    if (!checklist) {
      setChecklist(activeChecklist);
    }

    try {
      // 1. Generate high-quality branded PDF and build Object URL & download handler
      const result = generateSeoChecklistPdf(activeChecklist, completedTasks);
      setPdfResult(result);

      // 2. Trigger automatic download
      result.download();

      const totalDone = Object.values(completedTasks).filter(Boolean).length;
      const sanitizedEmail = trimmedEmail.toLowerCase();

      // 3. Save lead to Firestore inquiries collection (real persistent storage)
      try {
        await addDoc(collection(db, 'inquiries'), {
          name: sanitizedEmail.split('@')[0] || 'SEO Checklist Lead',
          email: sanitizedEmail,
          message: `Personalized SEO Action Plan requested for ${activeChecklist.industry.toUpperCase()} (${activeChecklist.businessType.toUpperCase()}). Stage: ${activeChecklist.stage}. Goal: ${activeChecklist.goal}. Tasks: ${totalDone}/${activeChecklist.totalTasks} completed. Timeline: ${activeChecklist.estimatedWeeks} weeks.`,
          status: 'pending',
          createdAt: serverTimestamp()
        });
      } catch (dbErr) {
        console.warn('Could not record lead in Firestore inquiries:', dbErr);
      }

      // 4. Dispatch request to backend API endpoint
      try {
        await fetch('/api/email-checklist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: sanitizedEmail,
            checklistTitle: `${activeChecklist.industry.toUpperCase()} ${activeChecklist.businessType.toUpperCase()} SEO Checklist`,
            industry: activeChecklist.industry,
            businessType: activeChecklist.businessType,
            stage: activeChecklist.stage,
            goal: activeChecklist.goal,
            totalTasks: activeChecklist.totalTasks,
            completedCount: totalDone,
            estimatedWeeks: activeChecklist.estimatedWeeks,
            topPriorities: activeChecklist.topPriorities,
            quickWins: activeChecklist.quickWins
          })
        });
      } catch (apiErr) {
        console.warn('Backend email API call notice:', apiErr);
      }

      setIsSubmittingEmail(false);
      setEmailSubmitted(true);
    } catch (err: any) {
      console.error('Error delivering SEO checklist PDF:', err);
      setIsSubmittingEmail(false);
      setEmailError(err?.message || 'Unable to generate action plan PDF. Please try again or download directly.');
    }
  };

  const totalCompleted = checklist
    ? Object.values(completedTasks).filter(Boolean).length
    : 0;

  // Schema Markup Objects
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'SEO Checklist Generator',
    'url': 'https://www.abuqitmirlabs.tech/tools/seo-checklist',
    'description': 'Generate a personalized, step-by-step SEO checklist tailored to your business type, industry, stage, and revenue goals.',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Personalized SEO Checklist',
      'Industry-specific ranking factors',
      'Interactive progress saving to localStorage',
      'Branded PDF export',
      'AI-powered priorities and quick wins'
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
    'name': 'How to Generate a Personalized SEO Checklist',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Enter Business Details',
        'text': 'Select your business type (e-commerce, SaaS, local service, blog) and industry.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Choose Your SEO Goal',
        'text': 'Select your primary objective: local visibility, national rankings, or e-commerce sales.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Generate Checklist',
        'text': 'Click Generate My Custom SEO Checklist to produce a 45+ task roadmap organized across 6 phases.'
      },
      {
        '@type': 'HowToStep',
        'name': 'Track Progress & Export PDF',
        'text': 'Check off completed items and download the executive PDF roadmap.'
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
        'item': 'https://www.abuqitmirlabs.tech/tools/project-cost-estimator'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'SEO Checklist Generator',
        'item': 'https://www.abuqitmirlabs.tech/tools/seo-checklist'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Free SEO Checklist Generator — Personalized Step-by-Step Guide | AbuQitmirLabs</title>
        <meta
          name="description"
          content="Generate a free, personalized SEO checklist for your business. 45+ actionable SEO tasks tailored to your industry, goals, and website stage. No signup required."
        />
        <meta
          name="keywords"
          content="seo checklist generator, free seo checklist, seo checklist 2026, personalized seo checklist, technical seo checklist, on-page seo checklist, local seo checklist, ecommerce seo checklist"
        />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/tools/seo-checklist" />
        <meta property="og:title" content="Free Personalized SEO Checklist Generator | AbuQitmirLabs" />
        <meta
          property="og:description"
          content="Get a custom SEO action plan for your business — 45+ actionable tasks tailored to your industry, goals, and stage."
        />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/tools/seo-checklist" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free SEO Checklist Generator | AbuQitmirLabs" />
        <meta
          name="twitter:description"
          content="Generate a customized 45+ point SEO action plan for your business in seconds. Free PDF export."
        />
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Global Brand Header & Navigation */}
      <Header />

      <main id="main-content" className="pt-20 md:pt-28">
        {/* Hero Section */}
        <HeroSection onScrollToForm={scrollToForm} onLoadSample={handleLoadSample} />

      {/* Business Input Form */}
      <BusinessForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleGenerate}
        loading={loading}
      />

      {/* Loading Animation */}
      {loading && <LoadingState industry={formData.industry} />}

      {/* Generated Checklist Panel */}
      {checklist && !loading && (
        <section id="checklist-results" className="py-12 md:py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Summary Card */}
            <SummaryCard checklist={checklist} onEdit={handleResetChecklist} />

            {/* Interactive Progress Bar */}
            <ProgressBar
              completedCount={totalCompleted}
              totalTasks={checklist.totalTasks}
              onResetProgress={handleResetProgress}
            />

            {/* AI Strategic Insights */}
            <AIInsights checklist={checklist} />

            {/* Quick Export & PDF Banner */}
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Receive Your Personalized PDF</h4>
                  <p className="text-xs text-neutral-400">
                    Save this complete {checklist.estimatedWeeks}-week roadmap with tasks, notes, and progress.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#ccff00]/10"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => {
                    setEmailModalOpen(true);
                    setEmailSubmitted(false);
                    setEmailError(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Receive via Email</span>
                </button>
              </div>
            </div>

            {/* Checklist Phases */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-white">
                  Actionable Phases & Tasks
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <button
                    onClick={() => {
                      const allOpen = Object.keys(openPhases).length === checklist.phases.length;
                      const nextState: Record<number, boolean> = {};
                      checklist.phases.forEach((_, idx) => {
                        nextState[idx] = !allOpen;
                      });
                      setOpenPhases(nextState);
                    }}
                    className="hover:text-white transition-colors underline"
                  >
                    Toggle All Phases
                  </button>
                </div>
              </div>

              {checklist.phases.map((phase, idx) => (
                <ChecklistPhase
                  key={phase.id || idx}
                  phase={phase}
                  isOpen={!!openPhases[idx]}
                  onToggle={() => handleTogglePhase(idx)}
                  completedTasks={completedTasks}
                  onToggleTask={handleToggleTask}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#ccff00] text-black font-extrabold text-xs sm:text-sm rounded-xl hover:bg-[#b8e600] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/10"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Checklist</span>
                </button>

                <button
                  onClick={() => {
                    setEmailModalOpen(true);
                    setEmailSubmitted(false);
                    setEmailError(null);
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#ccff00]" />
                  <span>Receive Personalized PDF</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-neutral-300" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Link
                  to="/seo-mastery"
                  className="w-full sm:w-auto text-center px-5 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Hire AbuQitmirLabs SEO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={handleResetChecklist}
                  title="Generate new checklist"
                  className="p-3.5 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-xl border border-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-white/15 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left">
            <button
              onClick={() => {
                setEmailModalOpen(false);
                setEmailSubmitted(false);
                setEmailError(null);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              ✕
            </button>

            {emailSubmitted ? (
              <div className="space-y-5 text-center pt-2">
                <div className="w-14 h-14 rounded-2xl bg-[#ccff00]/15 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] mx-auto shadow-lg shadow-[#ccff00]/10">
                  <CheckCircle2 className="w-7 h-7 text-[#ccff00]" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Personalized PDF Ready!
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    We have generated your customized SEO roadmap for{' '}
                    <span className="text-[#ccff00] font-mono font-medium">{emailInput}</span>.
                  </p>
                </div>

                {/* Plan Scope Summary */}
                <div className="bg-black/60 border border-white/10 rounded-xl p-4 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Target Industry:</span>
                    <span className="text-white font-semibold capitalize">
                      {checklist?.industry || formData.industry} ({checklist?.businessType || formData.businessType})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Roadmap Scope:</span>
                    <span className="text-[#ccff00] font-semibold">
                      6 Phases · {checklist?.totalTasks || 24} Tasks
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Target Timeline:</span>
                    <span className="text-white font-semibold">
                      {checklist?.estimatedWeeks || 12} Weeks
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-neutral-400">Current Progress:</span>
                    <span className="text-emerald-400 font-semibold">
                      {totalCompleted} completed ({checklist?.totalTasks ? Math.round((totalCompleted / checklist.totalTasks) * 100) : 0}%)
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons - Bypasses iframe sandbox download blocks */}
                <div className="space-y-2.5 pt-1">
                  {pdfResult?.blobUrl && (
                    <a
                      href={pdfResult.blobUrl}
                      download={pdfResult.filename}
                      className="w-full py-3.5 px-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/15"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF File Now</span>
                    </a>
                  )}

                  {pdfResult?.blobUrl && (
                    <a
                      href={pdfResult.blobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-neutral-400" />
                      <span>Preview / Print in New Tab</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setEmailModalOpen(false);
                      setEmailSubmitted(false);
                      setEmailInput('');
                      setEmailError(null);
                    }}
                    className="w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors block mt-2"
                  >
                    Done & Return to Checklist
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 leading-normal">
                  Note: If your browser popup blocker prevented automatic downloading, please click the yellow button above to save the PDF.
                </p>
              </div>
            ) : (
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00] mb-4">
                  <Mail className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Receive Your Personalized PDF
                </h3>
                <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                  Enter your email address to receive this customized SEO action plan directly, including progress tracking and priority notes.
                </p>

                {emailError && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{emailError}</span>
                  </div>
                )}

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (emailError) setEmailError(null);
                      }}
                      placeholder="you@company.com"
                      required
                      autoFocus
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingEmail}
                    className="w-full py-3.5 bg-[#ccff00] hover:bg-[#b8e600] disabled:opacity-50 text-black font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/10"
                  >
                    {isSubmittingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating & Preparing PDF...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Send & Download PDF</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3 text-[#ccff00]" /> Instant PDF download included
                    </span>
                    <span>100% Free · No spam</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Common Mistakes Section */}
      <CommonMistakesSection />

      {/* Curated Resources Section */}
      <SeoResourcesSection />

      {/* Related Blog Posts Section */}
      <section className="py-16 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ccff00] text-xs font-bold uppercase tracking-widest block mb-2">
              In-Depth Editorial Guides
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Essential SEO Reading for 2026
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
              Master the exact ranking methodologies implemented across our client portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/blog/what-seo-services-actually-mean-in-2026-abuqitmirlabs"
              className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/40 transition-all group"
            >
              <span className="text-[10px] font-bold text-[#ccff00] uppercase tracking-wider block mb-2">
                Industry Insights
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                What SEO Services Actually Mean in 2026
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                Demystifying technical architecture, programmatic indexing, and algorithmic E-E-A-T standards.
              </p>
            </Link>

            <Link
              to="/blog/local-business-visibility-2026-seo-geo-aio-aeo-sxo"
              className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/40 transition-all group"
            >
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-2">
                GEO & AIO Strategy
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                Local Business Visibility: SEO, GEO, AIO, AEO & SXO
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                How modern algorithms synthesize search engine answers and AI chat recommendations.
              </p>
            </Link>

            <Link
              to="/blog/semantic-seo-strategy-the-complete-2026-framework-abuqitmirlabs"
              className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/40 transition-all group"
            >
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                Semantic Architecture
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                Semantic SEO Framework: Entity Graphs & Topical Clusters
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                Step-by-step instructions for building topic clusters that dominate competitive search categories.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ChecklistFaqSection />

      {/* Bottom CTA Banner */}
      <section className="py-20 border-t border-white/10 bg-gradient-to-b from-neutral-950 to-black text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#ccff00]/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Ready to Dominate Your Niche?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Need Expert Execution of Your SEO Roadmap?
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            AbuQitmirLabs builds high-performance Next.js architectures, executes programmatic Schema data networks, and manages end-to-end technical optimization for high-growth brands.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/seo-mastery"
              className="px-8 py-4 bg-[#ccff00] text-black font-extrabold text-sm rounded-xl hover:bg-[#b8e600] transition-all shadow-xl shadow-[#ccff00]/15"
            >
              Explore SEO Mastery Services →
            </Link>
            <Link
              to="/contact"
              className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors"
            >
              Request Free Technical Consultation
            </Link>
          </div>
        </div>
      </section>

      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
};

export default SeoChecklistPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle, Shield, Zap, ArrowRight, Download, BrainCircuit } from 'lucide-react';

interface HeroSectionProps {
  onScrollToForm: () => void;
  onLoadSample: (key: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm, onLoadSample }) => {
  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 border-b border-white/5 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-neutral-400 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
          <span>›</span>
          <span className="text-[#ccff00]">SEO Checklist Generator</span>
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
          <span>100% Free · No Signup Required · Personalized Roadmap</span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
          Free AI-Powered <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#ccff00]">
            SEO Checklist Generator
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
          Get a personalized, step-by-step SEO action plan tailored specifically to your business type, industry, stage, and revenue goals. Track your progress interactively, export as a branded PDF, and outrank incumbents.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button
            onClick={onScrollToForm}
            className="px-8 py-4 bg-[#ccff00] text-black font-bold text-sm tracking-wide rounded-xl hover:bg-[#b8e600] transition-all duration-200 shadow-lg shadow-[#ccff00]/15 flex items-center gap-2"
          >
            <span>Generate My Checklist</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onLoadSample('ecommerce')}
            className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/10 transition-colors flex items-center gap-2"
          >
            <span>Preview Sample Checklist</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ccff00]" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#ccff00]" />
            <span>45+ Curated Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#ccff00]" />
            <span>PDF Export</span>
          </div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[#ccff00]" />
            <span>AI-Powered Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#ccff00]" />
            <span>Auto-Save Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#ccff00]" />
            <span>Zero Data Stored</span>
          </div>
        </div>
      </div>
    </section>
  );
};

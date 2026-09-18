import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, BookOpen, ExternalLink, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export const SeoResourcesSection: React.FC = () => {
  return (
    <section className="py-16 border-t border-white/5 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#ccff00] text-xs font-bold uppercase tracking-widest block mb-2">
            Free Tooling & Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Curated SEO Resources & Ecosystem
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mt-2">
            Complement your checklist with these enterprise utilities, guides, and engineering services from AbuQitmirLabs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool #1 Link */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00] mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Project Cost Estimator</h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Calculate realistic engineering budgets, timeline estimates, and staffing allocations for your web, mobile, and custom software builds.
              </p>
            </div>
            <Link
              to="/tools/project-cost-estimator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ccff00] hover:underline"
            >
              <span>Launch Estimator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Tool #2 Link */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Website Audit Tool</h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Scan your live website for Core Web Vitals bottlenecks, missing meta tags, canonical inconsistencies, and HTTP security headers.
              </p>
            </div>
            <Link
              to="/tools/website-audit"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline"
            >
              <span>Run Live Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service Link */}
          <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AbuQitmirLabs SEO Mastery</h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Done-for-you technical SEO architecture, local citation networks, Generative Engine Optimization (GEO), and programmatic content scaling.
              </p>
            </div>
            <Link
              to="/seo-mastery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
            >
              <span>Explore SEO Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { preloadRoute } from '../utils/preloader';
import { ToolThemeIcon } from './ToolThemeIcon';

interface ToolCardData {
  slug: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
  metric: string;
}

const FEATURED_TOOLS: ToolCardData[] = [
  {
    slug: '/tools/project-cost-estimator',
    icon: '💰',
    title: 'Project Cost Estimator',
    description: 'Know your custom software, app, or web build cost before development.',
    badge: '100% Free',
    metric: 'Real-time Budgeting'
  },
  {
    slug: '/tools/website-audit',
    icon: '🚀',
    title: 'Website Audit Tool',
    description: 'Full Core Web Vitals, mobile responsiveness, and SEO health check.',
    badge: 'Instant Report',
    metric: 'Performance & CWV'
  },
  {
    slug: '/tools/seo-checklist',
    icon: '📋',
    title: 'SEO Launch Checklist',
    description: 'Interactive 45-point pre and post-launch checklist for organic ranking.',
    badge: 'Interactive',
    metric: 'Technical SEO'
  },
  {
    slug: '/tools/ai-readiness-score',
    icon: '🤖',
    title: 'AI Readiness Score',
    description: 'Evaluate your business workflows and infrastructure for AI agents.',
    badge: 'Strategic Score',
    metric: 'Enterprise AI'
  },
  {
    slug: '/tools/tech-stack-recommender',
    icon: '⚙️',
    title: 'Tech Stack Recommender',
    description: 'Find the optimal architectural stack tailored to your exact constraints.',
    badge: 'Architect Engine',
    metric: 'Frontend & Cloud'
  },
  {
    slug: '/tools/website-authority-analyzer',
    icon: '🌐',
    title: 'Website Authority Analyzer',
    description: 'Measure Open PageRank score, Wayback domain tenure, and link assets.',
    badge: 'Domain Trust',
    metric: 'Backlinks & SSL'
  }
];

export const FeaturedToolsSection: React.FC = () => {
  return (
    <section
      id="featured-tools"
      aria-label="Six Free Tools for Modern Businesses"
      className="featured-tools-section py-20 md:py-28 bg-[#070707] border-y border-white/10 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#ccff00]/[0.02] blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="section-tag">🛠️ Free Tools</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight leading-tight">
            Six Free Tools for <br />
            <span className="text-neutral-400 font-sans not-italic font-light">
              Modern Digital Businesses.
            </span>
          </h2>

          <p className="text-neutral-300 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Plan, audit, and optimize — no signup required. Engineered to give founders, CTOs, and marketers instant clarity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" /> Instant Real-Time Results
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" /> 100% Free Forever
            </span>
          </div>
        </div>

        {/* 6-Tool Grid */}
        <div className="homepage-tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {FEATURED_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              to={tool.slug}
              onMouseEnter={() => preloadRoute(tool.slug)}
              onTouchStart={() => preloadRoute(tool.slug)}
              className="home-tool-card group p-7 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/90 border border-white/10 hover:border-[#ccff00]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#ccff00]/5 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <ToolThemeIcon tool={tool.slug} size="lg" />
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[#ccff00] text-[10px] font-mono uppercase tracking-widest border border-white/10">
                    {tool.badge}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
                  {tool.metric}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2.5">
                  {tool.title}
                </h3>

                <p className="text-sm text-neutral-400 font-sans leading-relaxed font-light">
                  {tool.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white">
                <span className="font-semibold text-neutral-300 group-hover:text-[#ccff00] transition-colors">
                  Launch Free Tool →
                </span>
                <ArrowRight className="w-4 h-4 text-[#ccff00] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="view-all-cta text-center">
          <Link
            to="/tools"
            onMouseEnter={() => preloadRoute('/tools')}
            onTouchStart={() => preloadRoute('/tools')}
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm font-mono tracking-wider transition-all duration-200 shadow-xl shadow-[#ccff00]/10 hover:scale-105 active:scale-95"
          >
            <span>View All Tools →</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;

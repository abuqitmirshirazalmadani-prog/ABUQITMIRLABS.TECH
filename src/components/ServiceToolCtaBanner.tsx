import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';
import { preloadRoute } from '../utils/preloader';
import { ToolKey } from './RelatedToolsSection';

interface ToolMeta {
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  badge: string;
}

const TOOL_DEFINITIONS: Record<ToolKey, ToolMeta> = {
  'project-cost-estimator': {
    title: 'Project Cost Estimator',
    slug: '/tools/project-cost-estimator',
    icon: '💰',
    shortDesc: 'Instant budget breakdown & international rate benchmarks.',
    badge: '100% Free'
  },
  'website-audit': {
    title: 'Website Audit Tool',
    slug: '/tools/website-audit',
    icon: '🚀',
    shortDesc: 'Core Web Vitals, speed, and UX/technical diagnostic score.',
    badge: 'Instant Report'
  },
  'seo-checklist': {
    title: 'SEO Launch Checklist',
    slug: '/tools/seo-checklist',
    icon: '📋',
    shortDesc: 'Interactive 45-point checklist before & after launch.',
    badge: 'Interactive'
  },
  'ai-readiness-score': {
    title: 'AI Readiness Assessment',
    slug: '/tools/ai-readiness-score',
    icon: '🤖',
    shortDesc: 'Evaluate enterprise workflows & data pipelines for AI.',
    badge: 'Strategic Score'
  },
  'tech-stack-recommender': {
    title: 'Tech Stack Recommender',
    slug: '/tools/tech-stack-recommender',
    icon: '⚙️',
    shortDesc: 'Find the optimal frontend, backend & cloud architecture.',
    badge: 'Architecture'
  },
  'website-authority-analyzer': {
    title: 'Website Authority Analyzer',
    slug: '/tools/website-authority-analyzer',
    icon: '🌐',
    shortDesc: 'Analyze Open PageRank, Wayback tenure, and link trust.',
    badge: 'Domain Trust'
  }
};

interface ServiceToolCtaBannerProps {
  toolKeys: ToolKey[];
  headline?: string;
  subheadline?: string;
  badgeText?: string;
  className?: string;
}

export const ServiceToolCtaBanner: React.FC<ServiceToolCtaBannerProps> = ({
  toolKeys,
  headline = 'Complementary Planning & Diagnostic Utilities',
  subheadline = 'Audit performance, project requirements, and cost projections before booking engineering sprints — no login required.',
  badgeText = 'Free Engineering Tools',
  className = ''
}) => {
  const tools = toolKeys.map((key) => TOOL_DEFINITIONS[key]).filter(Boolean);

  return (
    <section
      aria-label="Relevant Free Tools"
      className={`py-16 bg-[#080808] border-y border-white/10 relative overflow-hidden ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-[11px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>{badgeText}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-white tracking-tight">
            {headline}
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
            {subheadline}
          </p>
        </div>

        {/* Tools Cards */}
        <div
          className={`grid gap-5 ${
            tools.length === 1
              ? 'max-w-md mx-auto grid-cols-1'
              : tools.length === 2
              ? 'max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              to={tool.slug}
              onMouseEnter={() => preloadRoute(tool.slug)}
              onTouchStart={() => preloadRoute(tool.slug)}
              className="group p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-[#ccff00]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#ccff00]/5 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-[#ccff00] uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors mb-1.5">
                  {tool.title}
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
                  {tool.shortDesc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white">
                <span className="text-[#ccff00] font-semibold">Launch Tool Free</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ccff00] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Explore Hub Link */}
        <div className="text-center mt-8">
          <Link
            to="/tools"
            onMouseEnter={() => preloadRoute('/tools')}
            onTouchStart={() => preloadRoute('/tools')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#ccff00] transition-colors uppercase tracking-wider"
          >
            <span>Explore All Free Engineering Tools →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceToolCtaBanner;

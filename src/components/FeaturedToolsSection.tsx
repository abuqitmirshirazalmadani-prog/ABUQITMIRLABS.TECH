import React from 'react';
import { Link } from 'react-router-dom';
import { preloadRoute } from '../utils/preloader';

interface ToolCardData {
  slug: string;
  title: string;
  description: string;
  badge: string;
  metric: string;
}

const FEATURED_TOOLS: ToolCardData[] = [
  {
    slug: '/tools/project-cost-estimator',
    title: 'Project Cost Estimator.',
    description: 'Check your custom software, mobile app, or web build cost in under two minutes.',
    badge: '100% Free.',
    metric: 'Instant Budget Guide.'
  },
  {
    slug: '/tools/website-audit',
    title: 'Website Audit Tool.',
    description: 'Run a fast check on your page speed, mobile layout, and search health.',
    badge: 'Live Report.',
    metric: 'Speed & SEO Check.'
  },
  {
    slug: '/tools/seo-checklist',
    title: 'SEO Launch Checklist.',
    description: 'Use our 45-step checklist to fix your site before and after launch.',
    badge: 'Step-by-Step.',
    metric: 'Search Ranking Plan.'
  },
  {
    slug: '/tools/ai-readiness-score',
    title: 'AI Readiness Score.',
    description: 'See how ready your team and data are for custom AI agents and automation.',
    badge: 'Quick Score.',
    metric: 'AI Action Roadmap.'
  },
  {
    slug: '/tools/tech-stack-recommender',
    title: 'Tech Stack Recommender.',
    description: 'Pick the best front-end, back-end, and cloud tools for your next build.',
    badge: 'Smart Match.',
    metric: 'Web, App & Cloud.'
  },
  {
    slug: '/tools/website-authority-analyzer',
    title: 'Website Authority Analyzer.',
    description: 'Check your domain rank, site age, and security headers in seconds.',
    badge: 'Domain Trust.',
    metric: 'Rank & Trust Check.'
  }
];

export const FeaturedToolsSection: React.FC = () => {
  return (
    <section
      id="featured-tools"
      aria-label="Six Free Tools for Modern Businesses"
      className="featured-tools-section py-20 bg-[#070707] border-y border-white/10"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-[#ccff00] text-xs font-mono uppercase tracking-[0.2em] font-bold">
            Free Interactive Tools.
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight leading-tight">
            Six Free Tools for Modern Digital Businesses
          </h2>
          <p className="text-neutral-300 font-sans text-base sm:text-lg font-light leading-relaxed">
            Plan your budget, audit your website, and test your AI readiness for free. You do not need a credit card or login.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {FEATURED_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              to={tool.slug}
              onMouseEnter={() => preloadRoute(tool.slug)}
              onTouchStart={() => preloadRoute(tool.slug)}
              className="group p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/90 border border-white/10 hover:border-[#ccff00]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-neutral-400">{tool.metric}</span>
                  <span className="text-[#ccff00] font-bold">{tool.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-neutral-300 font-sans leading-relaxed font-light">
                  {tool.description}
                </p>
              </div>
              <p className="mt-5 pt-3 border-t border-white/5 text-xs font-mono font-bold text-[#ccff00]">
                Launch Free Tool →
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/tools"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-[#ccff00] hover:bg-white text-black font-extrabold text-sm font-mono tracking-wider transition-all"
          >
            View All 6 Free Tools →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedToolsSection;

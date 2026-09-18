import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { preloadRoute } from '../utils/preloader';
import { ToolThemeIcon } from './ToolThemeIcon';

export type ToolKey =
  | 'project-cost-estimator'
  | 'website-audit'
  | 'seo-checklist'
  | 'ai-readiness-score'
  | 'tech-stack-recommender'
  | 'website-authority-analyzer';

export interface RelatedToolItem {
  slug: string;
  title: string;
  icon: string;
  description: string;
  badge?: string;
  isService?: boolean;
}

const TOOLS_CATALOG: Record<string, RelatedToolItem> = {
  'project-cost-estimator': {
    slug: '/tools/project-cost-estimator',
    title: 'Project Cost Estimator',
    icon: '💰',
    description: 'Know your custom software or web development investment before writing a single line of code.',
    badge: 'Instant Estimate'
  },
  'website-audit': {
    slug: '/tools/website-audit',
    title: 'Website Audit Tool',
    icon: '🚀',
    description: 'Full Core Web Vitals, technical SEO, mobile accessibility, and page experience diagnostics.',
    badge: 'Full Diagnostic'
  },
  'seo-checklist': {
    slug: '/tools/seo-checklist',
    title: 'SEO Launch Checklist',
    icon: '📋',
    description: 'Interactive 45-point checklist covering pre-launch DNS, indexation rules, and structured data.',
    badge: 'Interactive Tool'
  },
  'ai-readiness-score': {
    slug: '/tools/ai-readiness-score',
    title: 'AI Readiness Assessment',
    icon: '🤖',
    description: 'Evaluate workflow readiness, data pipelines, and security controls for autonomous AI agent adoption.',
    badge: 'Strategic Score'
  },
  'tech-stack-recommender': {
    slug: '/tools/tech-stack-recommender',
    title: 'Tech Stack Recommender',
    icon: '⚙️',
    description: 'Find the optimal architectural stack (frontend, backend, database, cloud) tailored to your constraints.',
    badge: 'Architecture Engine'
  },
  'website-authority-analyzer': {
    slug: '/tools/website-authority-analyzer',
    title: 'Website Authority Analyzer',
    icon: '🌐',
    description: 'Measure Open PageRank score, Wayback domain tenure, and search trust heuristics for any URL.',
    badge: 'Domain Trust'
  },
  'ai-agent-service': {
    slug: '/ai-agent-development',
    title: 'AI Agent Engineering Service',
    icon: '🧠',
    description: 'Bespoke autonomous LLM agent systems, RAG pipelines, and multi-agent enterprise workflows.',
    badge: 'Enterprise Service',
    isService: true
  }
};

const LINKING_MATRIX: Record<ToolKey, string[]> = {
  'project-cost-estimator': [
    'tech-stack-recommender',
    'website-audit',
    'seo-checklist'
  ],
  'website-audit': [
    'website-authority-analyzer',
    'seo-checklist',
    'project-cost-estimator'
  ],
  'seo-checklist': [
    'website-authority-analyzer',
    'website-audit',
    'project-cost-estimator'
  ],
  'ai-readiness-score': [
    'project-cost-estimator',
    'tech-stack-recommender',
    'ai-agent-service'
  ],
  'tech-stack-recommender': [
    'project-cost-estimator',
    'website-audit',
    'ai-readiness-score'
  ],
  'website-authority-analyzer': [
    'website-audit',
    'seo-checklist',
    'project-cost-estimator'
  ]
};

interface RelatedToolsSectionProps {
  currentTool: ToolKey;
  className?: string;
}

export const RelatedToolsSection: React.FC<RelatedToolsSectionProps> = ({
  currentTool,
  className = ''
}) => {
  const relatedKeys = LINKING_MATRIX[currentTool] || [
    'project-cost-estimator',
    'website-audit',
    'seo-checklist'
  ];

  const items = relatedKeys
    .map((key) => TOOLS_CATALOG[key])
    .filter(Boolean);

  return (
    <section
      id="related-free-tools"
      aria-label="Related Engineering & Diagnostic Tools"
      className={`py-16 md:py-20 border-t border-white/10 bg-[#050505] relative overflow-hidden ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-[11px] font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />
              <span>Free Engineering Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>🛠️ Related Free Tools</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-1">
              Explore complementary audit utilities to plan, evaluate, and scale your digital assets.
            </p>
          </div>

          <Link
            to="/tools"
            onMouseEnter={() => preloadRoute('/tools')}
            onTouchStart={() => preloadRoute('/tools')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#ccff00] hover:text-white transition-colors self-start sm:self-auto uppercase tracking-wider"
          >
            <span>All 6 Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((tool) => (
            <Link
              key={tool.slug}
              to={tool.slug}
              onMouseEnter={() => preloadRoute(tool.slug)}
              onTouchStart={() => preloadRoute(tool.slug)}
              className="group p-6 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/10 hover:border-[#ccff00]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#ccff00]/5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <ToolThemeIcon tool={tool.slug} size="md" />
                  {tool.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-[#ccff00] uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors mb-2">
                  {tool.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white">
                <span className="font-semibold">
                  {tool.isService ? 'Explore Service' : 'Launch Free Tool'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#ccff00] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedToolsSection;

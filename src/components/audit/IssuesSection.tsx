import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  CalendarClock,
  Clock,
  ShieldAlert,
  UserCheck,
  Wrench,
  FileCode2,
  Sparkles,
  Info,
  Search,
} from 'lucide-react';
import {
  ActionHorizon,
  AuditIssue,
  DataSourceType,
  FilterCategory,
  FilterSeverity,
  ReportLanguage,
} from '../../types/audit';

interface IssuesSectionProps {
  issues: AuditIssue[];
  allChecks?: AuditIssue[];
  activeCategory: FilterCategory;
  setActiveCategory: (category: FilterCategory) => void;
  activeSeverity: FilterSeverity;
  setActiveSeverity: (severity: FilterSeverity) => void;
  reportLanguage?: ReportLanguage;
  fixedIds: string[];
  onToggleFixed: (id: string) => void;
}

const SEVERITY_FILTERS: { id: FilterSeverity; label: string }[] = [
  { id: 'all', label: 'All Issues' },
  { id: 'critical', label: 'Critical' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'passed', label: 'Passed' },
];

const CATEGORY_FILTERS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'SEO', label: 'SEO' },
  { id: 'Performance', label: 'Performance' },
  { id: 'Accessibility', label: 'Accessibility' },
  { id: 'Security', label: 'Security' },
  { id: 'Conversion', label: 'Conversion' },
];

const ACTION_HORIZONS: {
  id: 'ALL' | ActionHorizon;
  label: string;
  subtitle: string;
  badgeClass: string;
}[] = [
  {
    id: 'ALL',
    label: 'All Horizons',
    subtitle: 'Complete backlog',
    badgeClass: 'border-white/15 bg-white/5 text-white',
  },
  {
    id: 'Fix Today',
    label: 'Fix Today',
    subtitle: 'Critical crawl, security & conversion blockers',
    badgeClass: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
  },
  {
    id: 'Fix This Week',
    label: 'Fix This Week',
    subtitle: 'High-leverage SEO, speed & UX improvements',
    badgeClass: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  },
  {
    id: 'Monitor',
    label: 'Monitor',
    subtitle: 'Passed checks, manual reviews & ongoing governance',
    badgeClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
];

const getSeverityBadge = (priority: AuditIssue['priority'], passed: boolean) => {
  if (passed || priority === 'passed') {
    return {
      label: 'Passed',
      className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    };
  }
  switch (priority) {
    case 'critical':
      return {
        label: 'Critical',
        className: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      };
    case 'high':
      return {
        label: 'High',
        className: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      };
    case 'medium':
      return {
        label: 'Medium',
        className: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      };
    default:
      return {
        label: 'Low',
        className: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      };
  }
};

const getConfidenceBadge = (confidence: AuditIssue['confidence']) => {
  switch (confidence) {
    case 'Confirmed':
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    case 'Likely':
      return 'bg-[#2667FF]/20 text-blue-200 border-[#2667FF]/40';
    case 'Manual review required':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'Data unavailable':
    default:
      return 'bg-white/5 text-gray-300 border-white/15';
  }
};

export const IssuesSection: React.FC<IssuesSectionProps> = ({
  issues,
  allChecks,
  activeCategory,
  setActiveCategory,
  activeSeverity,
  setActiveSeverity,
  reportLanguage = 'en',
  fixedIds,
  onToggleFixed,
}) => {
  const [activeHorizon, setActiveHorizon] = useState<'ALL' | ActionHorizon>('ALL');
  const [activeDataSource, setActiveDataSource] = useState<'ALL' | DataSourceType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedEvidenceIds, setExpandedEvidenceIds] = useState<Record<string, boolean>>({});

  const isUrdu = reportLanguage === 'ur';

  // Combine issues and passed checks when allChecks is provided
  const fullPool: AuditIssue[] = useMemo(() => {
    if (allChecks && allChecks.length > 0) return allChecks;
    return issues;
  }, [allChecks, issues]);

  // Counts for the "Fix Today / Fix This Week / Monitor" prioritized action plan
  const horizonCounts = useMemo(() => {
    const counts: Record<ActionHorizon, number> = {
      'Fix Today': 0,
      'Fix This Week': 0,
      Monitor: 0,
    };
    for (const item of fullPool) {
      counts[item.actionHorizon] = (counts[item.actionHorizon] || 0) + 1;
    }
    return counts;
  }, [fullPool]);

  const filteredItems = useMemo(() => {
    return fullPool.filter((item) => {
      // Severity filter
      if (activeSeverity === 'all') {
        // "All Issues" shows non-passed issues by default unless searching or viewing Monitor
        if (activeHorizon !== 'Monitor' && item.passed) {
          return false;
        }
      } else if (activeSeverity === 'passed') {
        if (!item.passed && item.priority !== 'passed') return false;
      } else {
        if (item.passed || item.priority !== activeSeverity) return false;
      }

      // Category filter (SEO filter also includes Crawlability checks so crawl checks remain discoverable)
      if (activeCategory !== 'all') {
        if (activeCategory === 'SEO') {
          if (item.category !== 'SEO' && item.category !== 'Crawlability') return false;
        } else if (item.category !== activeCategory) {
          return false;
        }
      }

      // Horizon filter
      if (activeHorizon !== 'ALL' && item.actionHorizon !== activeHorizon) {
        return false;
      }

      // Data source filter
      if (activeDataSource !== 'ALL' && item.dataType !== activeDataSource) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${item.title} ${item.titleUr || ''} ${item.evidence} ${item.affectedTarget} ${item.suggestedFix} ${item.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [
    fullPool,
    activeSeverity,
    activeCategory,
    activeHorizon,
    activeDataSource,
    searchQuery,
  ]);

  const handleCopyFix = async (item: AuditIssue) => {
    const payload = [
      `Issue: ${item.title}`,
      `Severity: ${item.priority.toUpperCase()} | Confidence: ${item.confidence}`,
      `Affected Target: ${item.affectedTarget}`,
      `Evidence: ${item.evidence || 'Not enough data to confirm this issue. Manual review recommended.'}`,
      `Recommended Fix: ${item.suggestedFix}`,
      `Fix Owner: ${item.fixOwner} | Estimated Effort: ${item.effort}`,
      `Verification Step: ${item.verificationStep}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(payload);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback copy
    }
  };

  const toggleEvidence = (id: string) => {
    setExpandedEvidenceIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section aria-labelledby="growth-issues-heading" className="space-y-8">
      {/* 1. Prioritized Action Plan: Fix Today / Fix This Week / Monitor */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 md:p-8 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CCFF00] mb-1">
              <CalendarClock className="w-4 h-4" />
              Prioritized Execution Roadmap
            </div>
            <h3 className="text-xl font-bold text-white">
              Fix Today / Fix This Week / Monitor Action Plan
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Select a priority horizon below to focus your engineering, SEO, and CRO sprint.
            </p>
          </div>
          {fixedIds.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              {fixedIds.length} marked as fixed in this session
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACTION_HORIZONS.map((horizon) => {
            const isSelected = activeHorizon === horizon.id;
            const count =
              horizon.id === 'ALL'
                ? fullPool.length
                : horizonCounts[horizon.id as ActionHorizon] || 0;

            // Grab top 2 titles for preview
            const previewItems = fullPool
              .filter((i) =>
                horizon.id === 'ALL' ? !i.passed : i.actionHorizon === horizon.id
              )
              .slice(0, 2);

            return (
              <button
                key={horizon.id}
                type="button"
                onClick={() => {
                  setActiveHorizon(horizon.id);
                  if (horizon.id === 'Monitor') {
                    setActiveSeverity('passed');
                  } else if (activeSeverity === 'passed') {
                    setActiveSeverity('all');
                  }
                }}
                aria-pressed={isSelected}
                className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                  isSelected
                    ? 'bg-[#2667FF]/20 border-[#CCFF00] shadow-lg shadow-[#CCFF00]/10'
                    : 'bg-black/50 border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{horizon.label}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${horizon.badgeClass}`}
                    >
                      {count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{horizon.subtitle}</p>
                </div>

                {previewItems.length > 0 && (
                  <ul className="space-y-1 pt-2 border-t border-white/10 text-[11px] text-gray-300 font-mono">
                    {previewItems.map((p) => (
                      <li key={p.id} className="truncate">
                        • {p.title}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filter Bar: Result Filters + Category Filters + Data Source + Search */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 id="growth-issues-heading" className="text-lg font-bold text-white">
              Evidence-Based Growth Issue Cards ({filteredItems.length} shown)
            </h3>
            <p className="text-xs text-gray-400">
              Every card reports deterministic evidence, confidence level, business impact, fix owner, and verification steps.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search check, tag, or evidence..."
              aria-label="Filter audit findings by keyword"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#CCFF00]"
            />
          </div>
        </div>

        {/* Result Severity Filters: All Issues, Critical, High, Medium, Passed */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-white/10">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
              Result Filter
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by severity">
              {SEVERITY_FILTERS.map((sev) => {
                const active = activeSeverity === sev.id;
                return (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => setActiveSeverity(sev.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                      active
                        ? 'bg-[#CCFF00] text-black font-bold'
                        : 'bg-black/60 text-gray-300 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {sev.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filters: SEO, Performance, Accessibility, Security, Conversion */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
              Category Filter
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {CATEGORY_FILTERS.map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                      active
                        ? 'bg-[#2667FF] text-white font-bold border border-[#2667FF]'
                        : 'bg-black/60 text-gray-300 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Separated Data Type Filter Pills */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mr-1">
            Data Source Type:
          </span>
          {(
            [
              'ALL',
              'Real-user field data',
              'Lighthouse lab data',
              'HTML/static checks',
              'Heuristic conversion checks',
              'Manual review items',
            ] as const
          ).map((dt) => {
            const active = activeDataSource === dt;
            return (
              <button
                key={dt}
                type="button"
                onClick={() => setActiveDataSource(dt)}
                aria-pressed={active}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                  active
                    ? 'bg-white/20 text-white font-bold border border-[#CCFF00]'
                    : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:text-white'
                }`}
              >
                {dt === 'ALL' ? 'All Data Sources' : dt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Required Accessibility Truthful Disclaimer Banner (Requirement 21) */}
      {(activeCategory === 'all' || activeCategory === 'Accessibility') && (
        <div className="p-4 rounded-2xl bg-[#2667FF]/10 border border-[#2667FF]/30 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
          <p className="text-xs text-gray-200 leading-relaxed">
            Automated accessibility checks identify potential barriers but do not replace manual testing or legal advice.
          </p>
        </div>
      )}

      {/* 3. Evidence-Based Growth Issue Cards List */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl p-10 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">
            No findings match the current filter criteria
          </h4>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Switch to &ldquo;Passed&rdquo; or reset the Category / Horizon filters to inspect all verified checks.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setActiveSeverity('all');
              setActiveHorizon('ALL');
              setActiveDataSource('ALL');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-bold hover:bg-[#b8e600]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const sev = getSeverityBadge(item.priority, item.passed);
            const confClass = getConfidenceBadge(item.confidence);
            const isFixed = fixedIds.includes(item.id);
            const isEvidenceOpen = expandedEvidenceIds[item.id] ?? true;

            const evidenceText =
              item.confidence === 'Data unavailable' ||
              !item.evidence ||
              item.evidence.trim().length === 0
                ? 'Not enough data to confirm this issue. Manual review recommended.'
                : item.evidence;

            return (
              <article
                key={item.id}
                aria-label={item.title}
                className={`rounded-3xl border transition-all p-6 md:p-7 space-y-5 ${
                  isFixed
                    ? 'bg-emerald-950/10 border-emerald-500/40 opacity-80'
                    : item.passed
                    ? 'bg-[#0d0d0d] border-emerald-500/20'
                    : 'bg-[#0d0d0d] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top metadata & action bar */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* 2. Severity */}
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${sev.className}`}
                      >
                        Severity: {sev.label}
                      </span>

                      {/* 10. Confidence Level */}
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-mono border ${confClass}`}
                      >
                        Confidence: {item.confidence}
                      </span>

                      {/* Category & Action Horizon */}
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-white/5 text-gray-300 border border-white/10">
                        {item.category}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-[#2667FF]/15 text-[#CCFF00] border border-[#2667FF]/30">
                        {item.actionHorizon}
                      </span>

                      {/* Separated Data Type Badge */}
                      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-black text-gray-400 border border-white/10">
                        {item.dataType}
                      </span>

                      {isFixed && (
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                          ✓ Marked as Fixed
                        </span>
                      )}
                    </div>

                    {/* 1. Issue Title */}
                    <h4
                      className={`text-lg md:text-xl font-bold ${
                        isFixed ? 'line-through text-gray-400' : 'text-white'
                      }`}
                    >
                      {isUrdu && item.titleUr ? `${item.title} — ${item.titleUr}` : item.title}
                    </h4>
                  </div>

                  {/* Card Action Buttons: Copy Fix, Show Evidence, Mark as Fixed */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyFix(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied Fix
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#CCFF00]" />
                          Copy Fix
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleEvidence(item.id)}
                      aria-expanded={isEvidenceOpen}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
                    >
                      {isEvidenceOpen ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                          Hide Evidence
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-[#CCFF00]" />
                          Show Evidence
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFixed(item.id)}
                      aria-pressed={isFixed}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                        isFixed
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                          : 'bg-white/5 hover:bg-white/10 border-white/15 text-gray-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isFixed ? 'Fixed' : 'Mark as Fixed'}
                    </button>
                  </div>
                </div>

                {/* 3. Evidence & 4. Affected URL or element (Expandable/Visible panel) */}
                {isEvidenceOpen && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-xs">
                    <div className="lg:col-span-2 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#CCFF00] flex items-center gap-1.5">
                        <FileCode2 className="w-3.5 h-3.5" />
                        Deterministic Evidence
                      </span>
                      <p className="text-gray-200 break-words leading-relaxed">
                        {evidenceText}
                      </p>
                    </div>
                    <div className="space-y-1 lg:border-l lg:border-white/10 lg:pl-3">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                        Affected URL or Element
                      </span>
                      <p className="text-white break-all">{item.affectedTarget}</p>
                    </div>
                  </div>
                )}

                {/* 5. Why it matters & 6. Business impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Why It Matters
                    </span>
                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                      Business Impact
                    </span>
                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                      {item.businessImpact}
                    </p>
                  </div>
                </div>

                {/* 7. Recommended Fix & 11. Verification Step */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#2667FF]/10 border border-[#2667FF]/30 space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#CCFF00] flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      Recommended Fix
                    </span>
                    <p className="text-xs md:text-sm text-white leading-relaxed">
                      {item.suggestedFix}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Verification Step
                    </span>
                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                      {item.verificationStep}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata: 8. Fix owner, 9. Estimated effort, Check ID */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-gray-200">
                      <UserCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
                      Fix Owner: <strong>{item.fixOwner}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-gray-200">
                      <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                      Estimated Effort: <strong>{item.effort}</strong>
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500">
                    Check ID: {item.checkId}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import {
  Search,
  Smartphone,
  Monitor,
  Laptop,
  Clipboard,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  ShieldAlert,
  Lock
} from 'lucide-react';
import {
  AuditMode,
  AuditObjective,
  DeviceSelection,
  AuditAdvancedOptions,
  ReportLanguage
} from '../../types/audit';
import { validatePublicAuditUrl } from '../../utils/urlValidator';

export interface AuditSubmissionConfig {
  url: string;
  mode: AuditMode;
  objective: AuditObjective;
  deviceSelection: DeviceSelection;
  advanced: AuditAdvancedOptions;
}

interface AuditFormProps {
  onRunAudit: (config: AuditSubmissionConfig) => void;
  isLoading: boolean;
  initialUrl?: string;
  initialMode?: AuditMode;
  initialObjective?: AuditObjective;
  initialDevice?: DeviceSelection;
  initialLanguage?: ReportLanguage;
}

const AUDIT_MODES: Array<{ id: AuditMode; label: string; desc: string }> = [
  {
    id: 'quick',
    label: 'Quick Page Audit',
    desc: 'Single-URL HTML, metadata, security headers & speed check'
  },
  {
    id: 'mini-site',
    label: 'Mini Site Audit',
    desc: 'Page checks + /robots.txt, /sitemap.xml & internal link sampling'
  },
  {
    id: 'complete',
    label: 'Complete Growth Audit',
    desc: 'All 38 technical, CWV, accessibility, security & conversion checks'
  }
];

const AUDIT_OBJECTIVES: Array<{ id: AuditObjective; label: string }> = [
  { id: 'seo', label: 'SEO & Google Visibility' },
  { id: 'speed', label: 'Speed & Core Web Vitals' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'security', label: 'Security & Trust' },
  { id: 'conversion', label: 'Conversions & Lead Generation' },
  { id: 'complete', label: 'Complete Growth Audit' }
];

const INDUSTRIES = [
  'B2B SaaS & Software',
  'E-Commerce & Retail',
  'FinTech & Financial Services',
  'Healthcare & Clinics',
  'Agency & Professional Services',
  'Real Estate & Construction',
  'Education & EdTech',
  'General Business'
];

const BUSINESS_GOALS = [
  'Generate Qualified B2B Leads',
  'Increase Online Sales & Checkout Conversion',
  'Improve Google Search Visibility',
  'Reduce Paid Ad Landing Page Bounce Rate',
  'Technical & Security Hardening'
];

const TARGET_MARKETS = [
  'Global / International',
  'Pakistan',
  'United States',
  'United Kingdom',
  'Saudi Arabia (KSA)',
  'United Arab Emirates (UAE)',
  'Qatar',
  'Kuwait'
];

export const AuditForm: React.FC<AuditFormProps> = ({
  onRunAudit,
  isLoading,
  initialUrl = '',
  initialMode = 'complete',
  initialObjective = 'complete',
  initialDevice = 'both',
  initialLanguage = 'en'
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [mode, setMode] = useState<AuditMode>(initialMode);
  const [objective, setObjective] = useState<AuditObjective>(initialObjective);
  const [deviceSelection, setDeviceSelection] = useState<DeviceSelection>(initialDevice);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [pasted, setPasted] = useState(false);

  const [industry, setIndustry] = useState<string>(INDUSTRIES[0]);
  const [businessGoal, setBusinessGoal] = useState<string>(BUSINESS_GOALS[0]);
  const [targetMarket, setTargetMarket] = useState<string>(TARGET_MARKETS[0]);
  const [reportLanguage, setReportLanguage] = useState<ReportLanguage>(initialLanguage);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    if (validationError) {
      const check = validatePublicAuditUrl(val);
      if (check.valid) setValidationError(null);
    }
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          handleUrlChange(text.trim());
          setPasted(true);
          setTimeout(() => setPasted(false), 2000);
        }
      }
    } catch {
      // Clipboard permission denied
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const validation = validatePublicAuditUrl(url);
    if (!validation.valid) {
      setValidationError(validation.error || 'Please enter a valid public URL.');
      return;
    }

    setValidationError(null);
    onRunAudit({
      url: validation.normalizedUrl,
      mode,
      objective,
      deviceSelection,
      advanced: {
        industry,
        businessGoal,
        targetMarket,
        reportLanguage
      }
    });
  };

  const sampleUrls = [
    'https://www.abuqitmirlabs.tech',
    'https://example.com',
    'https://wikipedia.org'
  ];

  return (
    <div
      id="audit-tool-form"
      className="w-full bg-[#0a0a0c] border border-[#222] rounded-2xl p-6 md:p-8 shadow-2xl relative"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* 1. URL Input with Validation */}
        <div>
          <label
            htmlFor="target-url-input"
            className="block text-xs font-mono text-gray-300 mb-2"
          >
            Website URL to Audit <span className="text-[#ccff00]">*</span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-500 pointer-events-none" aria-hidden="true">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="target-url-input"
              type="url"
              required
              aria-invalid={Boolean(validationError)}
              aria-describedby={validationError ? 'url-validation-error' : 'url-helper-text'}
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://yourwebsite.com"
              className={`w-full bg-[#121215] border ${
                validationError
                  ? 'border-rose-500 focus:border-rose-400 focus:ring-rose-500'
                  : 'border-[#2e2e34] hover:border-[#484852] focus:border-[#ccff00] focus:ring-[#ccff00]'
              } rounded-xl pl-12 pr-28 py-4 text-white text-base md:text-lg placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors font-sans`}
            />
            <div className="absolute right-2.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePaste}
                aria-label="Paste URL from clipboard"
                className="px-3 py-2 bg-[#1e1e24] hover:bg-[#2a2a32] text-gray-300 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] whitespace-nowrap shrink-0"
              >
                {pasted ? (
                  <Check className="w-3.5 h-3.5 text-[#ccff00]" aria-hidden="true" />
                ) : (
                  <Clipboard className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                <span>{pasted ? 'Pasted' : 'Paste'}</span>
              </button>
            </div>
          </div>

          {validationError ? (
            <div
              id="url-validation-error"
              role="alert"
              className="mt-2.5 p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{validationError}</span>
            </div>
          ) : (
            <div
              id="url-helper-text"
              className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-gray-400"
            >
              <span>
                Public HTTP/HTTPS URLs only (localhost, private IPs & metadata endpoints are blocked).
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Quick fill:</span>
                {sampleUrls.map((sUrl) => (
                  <button
                    key={sUrl}
                    type="button"
                    onClick={() => handleUrlChange(sUrl)}
                    className="text-gray-300 hover:text-[#ccff00] underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded px-1"
                  >
                    {sUrl.replace('https://', '').replace('www.', '')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Audit Mode Selection */}
        <div className="pt-2 border-t border-[#1b1b20]">
          <label className="block text-xs font-mono text-gray-300 mb-2.5">
            1. Audit Mode
          </label>
          <div
            role="radiogroup"
            aria-label="Audit Mode Selection"
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {AUDIT_MODES.map((m) => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setMode(m.id)}
                  className={`text-left p-3.5 rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
                    active
                      ? 'bg-[#161f0a] border-[#ccff00] text-white'
                      : 'bg-[#121215] border-[#26262c] text-gray-300 hover:border-[#3c3c46]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-white whitespace-nowrap">
                      {m.label}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        active ? 'border-[#ccff00] bg-[#ccff00]' : 'border-gray-600'
                      }`}
                      aria-hidden="true"
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{m.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Audit Objective & 4. Device Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 border-t border-[#1b1b20]">
          {/* Audit Objective Selection */}
          <div className="lg:col-span-8">
            <label className="block text-xs font-mono text-gray-300 mb-2.5">
              2. Audit Objective Focus
            </label>
            <div
              role="radiogroup"
              aria-label="Audit Objective Selection"
              className="flex flex-wrap gap-2"
            >
              {AUDIT_OBJECTIVES.map((obj) => {
                const active = objective === obj.id;
                return (
                  <button
                    key={obj.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setObjective(obj.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
                      active
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-semibold'
                        : 'bg-[#121215] border-[#282830] text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {obj.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Device Selection */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-mono text-gray-300 mb-2.5">
              3. Test Device Profile
            </label>
            <div
              role="radiogroup"
              aria-label="Device Selection"
              className="grid grid-cols-3 gap-1.5 bg-[#121215] p-1.5 rounded-xl border border-[#26262c]"
            >
              {[
                { id: 'mobile' as DeviceSelection, label: 'Mobile', icon: Smartphone },
                { id: 'desktop' as DeviceSelection, label: 'Desktop', icon: Monitor },
                { id: 'both' as DeviceSelection, label: 'Both', icon: Laptop }
              ].map((dev) => {
                const Icon = dev.icon;
                const active = deviceSelection === dev.id;
                return (
                  <button
                    key={dev.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setDeviceSelection(dev.id)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
                      active
                        ? 'bg-[#ccff00] text-black font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-[#1c1c22]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{dev.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Collapsed Advanced Options Accordion */}
        <div className="border border-[#24242b] rounded-xl bg-[#0e0e12] overflow-hidden">
          <button
            type="button"
            aria-expanded={showAdvanced}
            aria-controls="audit-advanced-options-panel"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-mono text-gray-300 hover:text-white hover:bg-[#14141a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ccff00]" aria-hidden="true" />
              <span>Advanced Options (Industry, Business Goal, Target Market, Report Language: English / اردو)</span>
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span>{showAdvanced ? 'Hide' : 'Configure'}</span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-[#ccff00]" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              )}
            </span>
          </button>

          {showAdvanced && (
            <div
              id="audit-advanced-options-panel"
              className="p-4 pt-3 border-t border-[#1e1e24] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div>
                <label
                  htmlFor="audit-industry-select"
                  className="block text-xs text-gray-400 mb-1.5 font-mono"
                >
                  Industry
                </label>
                <select
                  id="audit-industry-select"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#16161c] border border-[#2c2c34] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="audit-goal-select"
                  className="block text-xs text-gray-400 mb-1.5 font-mono"
                >
                  Business Goal
                </label>
                <select
                  id="audit-goal-select"
                  value={businessGoal}
                  onChange={(e) => setBusinessGoal(e.target.value)}
                  className="w-full bg-[#16161c] border border-[#2c2c34] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                >
                  {BUSINESS_GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="audit-market-select"
                  className="block text-xs text-gray-400 mb-1.5 font-mono"
                >
                  Target Market
                </label>
                <select
                  id="audit-market-select"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full bg-[#16161c] border border-[#2c2c34] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                >
                  {TARGET_MARKETS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs text-gray-400 mb-1.5 font-mono">
                  Report Language
                </span>
                <div
                  role="radiogroup"
                  aria-label="Report Language"
                  className="grid grid-cols-2 gap-1.5 bg-[#16161c] p-1 rounded-lg border border-[#2c2c34]"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={reportLanguage === 'en'}
                    onClick={() => setReportLanguage('en')}
                    className={`py-1.5 px-2 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
                      reportLanguage === 'en'
                        ? 'bg-[#ccff00] text-black font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={reportLanguage === 'ur'}
                    onClick={() => setReportLanguage('ur')}
                    className={`py-1.5 px-2 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] ${
                      reportLanguage === 'ur'
                        ? 'bg-[#ccff00] text-black font-semibold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    اردو (Urdu)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            id="run-audit-submit-btn"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] disabled:opacity-50 disabled:pointer-events-none text-black font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isLoading ? (
              <>
                <span
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                <span>Running Deterministic Growth Audit...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" aria-hidden="true" />
                <span>
                  {reportLanguage === 'ur'
                    ? 'ویب سائٹ آڈٹ شروع کریں (Run Free Growth Audit)'
                    : 'Run Free Website Growth Audit'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="flex items-start justify-center gap-2 text-xs text-gray-400 pt-1 text-center">
          <Lock className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong>Privacy Guarantee:</strong> Submitted URLs are inspected transiently in real time and are never stored in any database or marketing list without your explicit consent.
          </span>
        </div>
      </form>
    </div>
  );
};

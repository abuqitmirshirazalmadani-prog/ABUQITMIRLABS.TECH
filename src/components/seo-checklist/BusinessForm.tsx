import React from 'react';
import {
  BusinessType,
  Industry,
  WebsiteStage,
  PrimaryGoal,
  TeamSize,
  TimeInvestment,
  ChecklistFormData
} from '../../types/seoChecklist';
import {
  BUSINESS_TYPE_LABELS,
  INDUSTRY_LABELS,
  STAGE_LABELS,
  GOAL_LABELS
} from '../../utils/seoChecklistGenerator';
import { Sparkles, Shield, ArrowRight, Check } from 'lucide-react';

interface BusinessFormProps {
  formData: ChecklistFormData;
  setFormData: React.Dispatch<React.SetStateAction<ChecklistFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  loading
}) => {
  return (
    <section id="generator" className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[#ccff00] text-xs font-bold uppercase tracking-widest block mb-2">
            Step 1 · Business Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Tell Us About Your Business
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Fill in the details below — our system will generate a custom, step-by-step SEO checklist tailored to your exact industry and growth stage.
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-neutral-900/70 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Step 1: Business Type */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-white mb-3">
              1. Business Type <span className="text-[#ccff00]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(BUSINESS_TYPE_LABELS) as BusinessType[]).map((key) => {
                const item = BUSINESS_TYPE_LABELS[key];
                const active = formData.businessType === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setFormData(prev => ({ ...prev, businessType: key }))}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      active
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white ring-1 ring-[#ccff00]'
                        : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{item.icon}</span>
                      {active && <Check className="w-4 h-4 text-[#ccff00]" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">{item.label}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Industry */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-white mb-2">
              2. Target Industry <span className="text-[#ccff00]">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.industry}
                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value as Industry }))}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-colors appearance-none cursor-pointer"
                required
              >
                {(Object.keys(INDUSTRY_LABELS) as Industry[]).map((key) => (
                  <option key={key} value={key} className="bg-neutral-900 text-white">
                    {INDUSTRY_LABELS[key].icon} {INDUSTRY_LABELS[key].label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                ▼
              </div>
            </div>
          </div>

          {/* Step 3: Website Stage */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-white mb-3">
              3. Current Website Stage <span className="text-[#ccff00]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {(Object.keys(STAGE_LABELS) as WebsiteStage[]).map((key) => {
                const stage = STAGE_LABELS[key];
                const active = formData.stage === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setFormData(prev => ({ ...prev, stage: key }))}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      active
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white ring-1 ring-[#ccff00]'
                        : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-sm font-bold text-white">
                      <span>{stage.icon}</span>
                      <span className="truncate">{stage.label}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">{stage.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Primary Goal */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-white mb-3">
              4. Primary Growth Goal <span className="text-[#ccff00]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(Object.keys(GOAL_LABELS) as PrimaryGoal[]).map((key) => {
                const goal = GOAL_LABELS[key];
                const active = formData.goal === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setFormData(prev => ({ ...prev, goal: key }))}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                      active
                        ? 'bg-[#ccff00]/10 border-[#ccff00] text-white ring-1 ring-[#ccff00]'
                        : 'bg-black/40 border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-base">{goal.icon}</span>
                    <span className="text-xs sm:text-sm font-semibold">{goal.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional fields: Team Size & Weekly Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                5. Team Execution Size (Optional)
              </label>
              <select
                value={formData.teamSize || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value as TeamSize }))}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-neutral-200 text-xs focus:outline-none focus:border-[#ccff00]"
              >
                <option value="">Prefer not to say</option>
                <option value="solo">🧑 Solo Founder / Freelancer</option>
                <option value="small">👥 Small Team (2 - 5)</option>
                <option value="medium">👥 Medium Team (6 - 20)</option>
                <option value="enterprise">🏢 Enterprise Organization (20+)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                6. Weekly Available Investment Time (Optional)
              </label>
              <select
                value={formData.time || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value as TimeInvestment }))}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-neutral-200 text-xs focus:outline-none focus:border-[#ccff00]"
              >
                <option value="">Prefer not to say</option>
                <option value="minimal">⏱️ Minimal (1 - 2 hours / week)</option>
                <option value="moderate">⏱️ Focused (5 - 10 hours / week)</option>
                <option value="aggressive">⏱️ Aggressive Sprint (20+ hours / week)</option>
              </select>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#ccff00] text-black font-extrabold text-sm sm:text-base rounded-xl hover:bg-[#b8e600] active:scale-[0.99] transition-all duration-200 shadow-xl shadow-[#ccff00]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Building Custom SEO Strategy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate My Custom SEO Checklist</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 mt-4 text-center">
            <Shield className="w-3.5 h-3.5 text-neutral-400" />
            <span>100% Privacy First · Zero data retention on remote servers</span>
          </p>
        </form>
      </div>
    </section>
  );
};

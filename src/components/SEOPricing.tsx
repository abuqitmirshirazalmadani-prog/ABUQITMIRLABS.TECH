import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  DollarSign, 
  Globe, 
  Compass, 
  Briefcase,
  Zap,
  HelpCircle,
  Award,
  BookOpen
} from 'lucide-react';

export default function SEOPricing() {
  const [activeTab, setActiveTab] = useState<'retainers' | 'structures'>('retainers');

  return (
    <section className="py-36 bg-[#0A0A0C] text-white relative border-t border-neutral-950 overflow-hidden" id="seo-pricing">
      
      {/* Background Radial Glowing Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-950/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Low-opacity technical mesh design */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-24 flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">
              [ USA SEARCH DISCOVERY VALUE MATRIX ]
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-none uppercase">
              SEO &amp; Map <br />
              <span className="text-transparent font-serif italic font-light" style={{ WebkitTextStroke: '1px #ffffff' }}>Mastery Pricing</span>
            </h2>
            <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
              The absolute minimum price for professional SEO services in the USA typically starts at <strong className="text-white">$250 to $500 per month</strong> for entry-level freelancers or basic local software packages, while the minimum entry point for a legitimate US-based agency starts at <strong className="text-white">$1,000 to $1,500 per month</strong>.
            </p>
          </div>

          {/* Interactive Switch Changer */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              // EVALUATE SCHEME CONFIGS
            </span>
            <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-full">
              <button
                id="seo-btn-retainers"
                onClick={() => setActiveTab('retainers')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'retainers'
                    ? 'bg-white text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Minimum Retainers
              </button>
              <button
                id="seo-btn-structures"
                onClick={() => setActiveTab('structures')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative ${
                  activeTab === 'structures'
                    ? 'bg-white text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Pricing Structures
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Minimum Retainers Layout */}
        <AnimatePresence mode="wait">
          {activeTab === 'retainers' && (
            <motion.div
              key="retainers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Three Grid Cards Design for Retainer Classes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                
                {/* Card 1: Local Setup */}
                <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/15 transition-all">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block">[ BASE_LOCAL_MAPS ]</span>
                      <h4 className="text-2xl font-black uppercase text-white mt-1">Local SEO Starter</h4>
                      <p className="text-xs font-serif italic text-neutral-400 mt-1">Google Maps Profile Optimizations</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-mono font-black text-white">$250</span>
                        <span className="text-neutral-500 font-serif italic text-sm">-$500 / mo</span>
                      </div>
                      <p className="text-[10px] text-[#ccff00] font-mono tracking-wider mt-1 uppercase">
                        Or One-time $300 – $750 Setup
                      </p>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Claim &amp; Verify Google Business Profile</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Core NAP directory syncing metadata</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>Local map keyword setup &amp; baseline citation push</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      id="seo-cta-local"
                      href="https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20the%20Local%20SEO%20Starter%20plan%20for%20my%20business.%20Let's%20discuss."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition duration-300"
                    >
                      <Zap size={12} />
                      <span>Initiate Discovery</span>
                    </a>
                  </div>
                </div>

                {/* Card 2: Healthy Small Biz - MOST POPULAR */}
                <div className="bg-[#09090c] border border-purple-500/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between ring-1 ring-purple-500/10 relative">
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-purple-400">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">[ GROWTH_ORGANIC ]</span>
                      <h4 className="text-2xl font-black uppercase text-white mt-1">Healthy Small Biz</h4>
                      <p className="text-xs font-serif italic text-neutral-400 mt-1">True local maps compounding authority</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-mono font-black text-white">$1,000</span>
                        <span className="text-neutral-500 font-serif italic text-sm">-$2,000 / mo</span>
                      </div>
                      <p className="text-[10px] text-purple-400 font-mono tracking-wider mt-1 uppercase">
                        Continuous citation &amp; reviews syncing
                      </p>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                        <span>Active monthly Google Business Profile management</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                        <span>Regular review responses &amp; local signal updates</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                        <span>Continuous geotagged posts &amp; authority citation build</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                        <span>Advanced localized copy and landing pages optimization</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      id="seo-cta-popular"
                      href="https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20the%20Healthy%20Small%20Biz%20SEO%20and%20Google%20Map%20plan.%20Let's%20talk."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#ccff00] text-black hover:bg-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-md"
                    >
                      <Zap size={12} className="fill-black" />
                      <span>Request Growth Strategy</span>
                    </a>
                  </div>
                </div>

                {/* Card 3: Enterprise Authority */}
                <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/15 transition-all">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-fuchsia-950/20 border border-fuchsia-500/20 text-fuchsia-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block">[ COMPREHENSIVE_DOMINANCE ]</span>
                      <h4 className="text-2xl font-black uppercase text-white mt-1">Enterprise Agency</h4>
                      <p className="text-xs font-serif italic text-neutral-400 mt-1">High-competition semantic optimization</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-mono font-black text-white">$1,500</span>
                        <span className="text-neutral-500 font-serif italic text-sm">-$5,000+ / mo</span>
                      </div>
                      <p className="text-[10px] text-fuchsia-400 font-mono tracking-wider mt-1 uppercase">
                        Full-scale content silos &amp; schema JSON-LD
                      </p>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-fuchsia-400 shrink-0 mt-0.5" />
                        <span>Thorough multi-page technical index reviews</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-fuchsia-400 shrink-0 mt-0.5" />
                        <span>Advanced JSON-LD structured organization schema</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-fuchsia-400 shrink-0 mt-0.5" />
                        <span>Manual white-hat high-tier PR editorial backlinks</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 size={14} className="text-fuchsia-400 shrink-0 mt-0.5" />
                        <span>Full on-page, off-page layout content writing coordination</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      id="seo-cta-enterprise"
                      href="https://wa.me/923233260859?text=Hello,%20I'm%20looking%20for%20enterprise%20grade%20Semantic%20SEO%20and%20E-E-A-T%20domain%20authority%20services.%20Let's%20coordinate."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition duration-300"
                    >
                      <Zap size={12} />
                      <span>Consult Enterprise</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* What a "Minimum Budget" Actually Buys Panel */}
              <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-950/20 blur-[100px] pointer-events-none animate-pulse" />
                
                <div className="max-w-4xl space-y-6">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                    [ SCOPE CLARITY IN MINIMUMS ]
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    What a "Minimum Budget" Actually Buys
                  </h3>
                  <p className="text-neutral-300 text-xs md:text-sm font-sans leading-relaxed">
                    When paying the bare minimum rate of <strong className="text-white">$250 – $500 monthly</strong>, the structural scope of organic work is highly restricted by automated license costs. It generally only covers these foundational baselines:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {[
                      "Basic tracking setup and keyword ranking monitoring.",
                      "Claiming and inputting primary schema updates on Google Business Profile.",
                      "Automated technical search console crawl error monitoring.",
                      "Extremely basic on-page localized descriptions; no heavy blogging content or high-quality author outreach."
                    ].map((scope, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/[0.01] border border-white/5 rounded-xl p-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-2" />
                        <p className="text-xs text-neutral-300 leading-normal font-sans">{scope}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'structures' && (
            <motion.div
              key="structures"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Detailed Structures Table for USA standard */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#070709]">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase font-mono text-[10px] tracking-widest">
                      <th className="p-6">Pricing Model</th>
                      <th className="p-6">Absolute Minimum</th>
                      <th className="p-6">Healthy Small Biz Budget</th>
                      <th className="p-6 hidden lg:table-cell">What is Typically Included</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300 font-sans">
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 font-bold text-white uppercase tracking-tight">Monthly Retainer</td>
                      <td className="p-6 font-mono text-[#ccff00] font-black">$250 – $500 / mo</td>
                      <td className="p-6 font-mono text-purple-400 font-bold">$1,000 – $2,000 / mo</td>
                      <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light">
                        Profile management, regular map reviews replies, new localized posts, continuous high-quality citation building.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 font-bold text-white uppercase tracking-tight">One-Time Project</td>
                      <td className="p-6 font-mono text-[#ccff00] font-black">$300 – $750 total</td>
                      <td className="p-6 font-mono text-purple-400 font-bold">$1,500 – $3,000 total</td>
                      <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light">
                        Initial local GSC code audits, Google Business Profile claim &amp; verification processes, foundational keyword setup, core NAP directory syncing.
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 font-bold text-white uppercase tracking-tight">Do-It-Yourself (DIY)</td>
                      <td className="p-6 font-mono text-[#ccff00] font-black">$20 – $50 / mo</td>
                      <td className="p-6 font-mono text-purple-400 font-bold">$100 – $200 / mo</td>
                      <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light">
                        Recurring software licensing costs (like Semrush Local, BrightLocal, or Yext) to push listings and map data records manually.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Model Billing Breakdown & Hourly Rates specification */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch bg-black border border-white/5 rounded-[3.5rem] p-8 md:p-12">
                
                {/* Structure Breakdown 1 */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-[0.2em] font-black">// MONTHLY RETENTION MODELS</span>
                  <h4 className="text-lg font-black text-white uppercase">Monthly Retainer Minimums</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Basic packages start around <strong className="text-[#ccff00] font-mono">$250 – $500 / mo</strong>. A recent Ahrefs Pricing survey highlights that 42% of local providers charge between $250 and $1,000 monthly for micro-businesses.
                  </p>
                </div>

                {/* Structure Breakdown 2 */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-[0.2em] font-black">// CONSULTING CARD SPECS</span>
                  <h4 className="text-lg font-black text-white uppercase">Hourly Rate Minimums</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Overseas freelancers on marketplaces can start around <strong className="text-cyan-400 font-mono">$25 / hr</strong>. Legitimate, established US-based local maps consultants and agencies verified by Clutch maintain billing baselines starting at <strong className="text-[#ccff00] font-mono">$100 – $149 / hr</strong>.
                  </p>
                </div>

                {/* Structure Breakdown 3 */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-[0.2em] font-black">// FIXED SCOPE RECOGNITION</span>
                  <h4 className="text-lg font-black text-white uppercase">Per-Project Minimums</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    One-time essential setups or basic technical site optimization fixes start at a minimum barrier of <strong className="text-[#ccff00] font-mono">$500</strong>. Advanced full-site technical SEO audits range upwards to <strong className="text-purple-400 font-mono">$5,000</strong>.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Structural Drivers */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch" id="seo-drivers">
          
          {/* Core Drivers Left Box */}
          <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.25em] font-bold block mb-4">
                // CRUCIAL COST MULTIPLIERS
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                Core Drivers of Local &amp; Map SEO Costs
              </h3>
              <p className="text-neutral-400 text-xs leading-normal font-sans pt-2">
                SEO operations are never static. Dynamic variables define how much time engineers must commit to outperform competitors:
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h5 className="text-sm font-black text-white uppercase">1) Niche Competitiveness</h5>
                <p className="text-xs text-neutral-400 font-sans leading-normal">
                  Ranking local residential cleaners in smaller regional populations is computationally less complex than out-ranking high-budget commercial roofers or personal injury law attorneys in saturated metropolitan centers.
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-black text-white uppercase">2) Target Locations Scale</h5>
                <p className="text-xs text-neutral-400 font-sans leading-normal">
                  Fulfillment fees almost universally scale per active physical address or storefront. Syncing and verification lists for a business with 5 distinct branches will cost proportionally more due to API loads.
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-black text-white uppercase">3) Delivery Scope (On-Page vs. Off-Page)</h5>
                <p className="text-xs text-neutral-400 font-sans leading-normal">
                  Basic map optimization setups cover profiles alone. Dominating saturated keywords necessitates schema writing optimization on actual code databases and organic local landing page copy setups.
                </p>
              </div>
            </div>
          </div>

          {/* Red Flags Caution Alert Card */}
          <div className="bg-gradient-to-b from-neutral-900 to-[#070709] border border-[#ff0099]/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-950/25 blur-[100px] pointer-events-none" />
            
            <div className="space-y-6">
              <div className="inline-flex py-1.5 px-3 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-black">RED FLAGS OF "CHEAP" SEO</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none pt-2">
                Algorithmic Risk Warning
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Budget map agencies offering ultra-low $100 contracts typically apply harmful automated bots. This triggers heavy domain penalties:
              </p>

              <div className="space-y-4 pt-4 divide-y divide-white/5">
                <div className="space-y-1.5 pb-4">
                  <div className="flex items-center gap-2 text-white">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold tracking-tight">Automated Spam &amp; Citation Bot Scams</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    Purchasing "1,000 map citations for $50" employs bots to inject low-quality links. Google monitors velocity alerts; this regularly triggers immediate, hard GBP suspensions.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4">
                  <div className="flex items-center gap-2 text-white">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold tracking-tight">Mock Content Ownership Tools</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    Cheap agencies simply monitor statistics. They do not optimize physical metadata files, build local backlink records, or resolve core crawl blockages.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5">
              <a
                id="seo-cta-flags-consult"
                href="https://wa.me/923233260859?text=Hello,%20I%20want%20to%20review%20my%20domain's%20SEO%20and%20Map%20citational%20integrity.%20Let's%20conduct%20an%20audit."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-950/60 hover:bg-neutral-900 border border-red-500/30 text-red-300 font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300"
              >
                <ShieldAlert size={14} />
                <span>Request Safe Domain Audit</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

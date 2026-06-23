import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Layers, 
  Cpu, 
  Sparkles, 
  Rocket, 
  Server,
  Database,
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Clock,
  Briefcase,
  HelpCircle as QuestionIcon
} from 'lucide-react';

export default function GraphicsDesignPricing() {
  const [activeTab, setActiveTab] = useState<'tiers' | 'hourly'>('tiers');

  return (
    <section className="py-36 bg-[#0A0A0C] text-white relative border-t border-neutral-950 overflow-hidden" id="design-pricing">
      
      {/* Background Radial Glowing Halos */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[155px] pointer-events-none" />

      {/* Cyber Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Cinematic Header Block */}
        <div className="mb-24 flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b border-white/10 pb-16">
          <div>
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">
              [ USA CREATIVE INVESTMENT METRICS ]
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-none uppercase">
              graphics design <br />
              <span className="text-transparent font-serif italic font-light" style={{ WebkitTextStroke: '1px #ffffff' }}>Pricing framework</span>
            </h2>
            <h3 className="mt-6 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-bold tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5">
              People from Pakistan, India, Bangladesh should contact us on WhatsApp, rates are different for them. I love these people, I love everyone.
            </h3>
            <h3 className="mt-4 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-medium tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5" style={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}>
              پاکستان، انڈیا، بنگلہ دیش کے لوگ ہم سے واٹس ایپ پر رابطہ کریں، ان کے لیے ریٹس مختلف ہیں۔ میں ان لوگوں سے پیار کرتا ہوں، میں سب سے پیار کرتا ہو۔
            </h3>
            <p className="mt-8 text-neutral-400 text-lg md:text-xl font-light max-w-4xl leading-relaxed">
              Price for logo and graphics design services in the USA typically starts between <strong className="text-white">$5 to $50</strong> if you utilize freelance marketplaces, while standard entry-level pricing for an independent local graphic designer generally starts around <strong className="text-white">$150 to $300</strong>. The total cost fluctuates drastically based on the designer's experience level, project complexity, and the platform or provider you choose.
            </p>
          </div>

          {/* Switch pill-shaped toggles */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
              // SWITCH VIEWPORT MODE
            </span>
            <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-full">
              <button
                id="design-btn-tiers"
                onClick={() => setActiveTab('tiers')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'tiers'
                    ? 'bg-[#ccff00] text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Project Scope Tiers
              </button>
              <button
                id="design-btn-hourly"
                onClick={() => setActiveTab('hourly')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'hourly'
                    ? 'bg-[#ccff00] text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Hourly Rate Cards
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Workspace Views */}
        <AnimatePresence mode="wait">
          {activeTab === 'tiers' ? (
            <motion.div
              key="tiers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* 3 Grid Cards Design with WhatsApp Links */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                
                {/* Card 1: MVP Setup */}
                <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/10 transition-all">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-400">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block">[ ASSETS_MVP_FLAT ]</span>
                      <h4 className="text-2xl font-black text-white uppercase mt-1">Small / MVP Build</h4>
                      <p className="text-xs font-serif italic text-neutral-400">Essential standalone layouts &amp; post creatives</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="text-4xl font-mono font-black text-white">$100 – $150+</div>
                      <span className="text-xs text-neutral-500 font-mono tracking-wider">[ HOURLY ESTIMATION MULTIPLIER ]</span>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Social Media Graphics ($10 – $15 per post, or $50 starter set)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Basic Logo Design ($50 – $150 for single vector icon)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Business Card Design ($20 layout with existing brand assets)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Flyer &amp; Print Design ($35 single-sided layout asset)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      id="design-cta-mvp"
                      href="https://wa.me/923233260859?text=Hello,%20I%20want%20to%20consult%20on%20and%20order%20the%20Small%20/%20MVP%20design%20package.%20Let's%20discuss."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition duration-300 text-center"
                    >
                      Consult MVP
                    </a>
                  </div>
                </div>

                {/* Card 2: Mid-Range (MOST POPULAR) */}
                <div className="bg-[#09090c] border border-purple-500/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between ring-1 ring-purple-500/15 relative">
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-purple-400">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase block">[ BRAND_SYSTEM_GROWTH ]</span>
                      <h4 className="text-2xl font-black text-white uppercase mt-1">Mid-Range System</h4>
                      <p className="text-xs font-serif italic text-neutral-400">Bespoke UI/UX Wireframes &amp; Brand Guides</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="text-4xl font-mono font-black text-white">$100 – $150+</div>
                      <span className="text-xs text-neutral-500 font-mono tracking-wider">[ HOURLY ESTIMATION MULTIPLIER ]</span>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Interactive UI/UX interfaces with custom structural grids</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Full Brand Identity Package ($1,000 – $3,000 at initial tier)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Core secondary logos, typography guides, and primary rules</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Includes high-fidelity vector source delivery (AI, SVG, Figma)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      id="design-cta-popular"
                      href="https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20the%20Mid-Range%20System%20graphics%20design%20plan%20to%20build%20a%20full%20brand%20identity.%20Let's%20initiate%20discovery."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#ccff00] text-black hover:bg-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-md text-center"
                    >
                      Initiate Discovery
                    </a>
                  </div>
                </div>

                {/* Card 3: Enterprise Solutions */}
                <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/10 transition-all">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-fuchsia-950/20 border border-fuchsia-500/20 text-fuchsia-400">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-fuchsia-400 tracking-widest uppercase block">[ AGENCY_DOMINANCE_STUDIO ]</span>
                      <h4 className="text-2xl font-black text-white uppercase mt-1">Enterprise Studio</h4>
                      <p className="text-xs font-serif italic text-neutral-400">Multi-branch corporate visual libraries</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="text-4xl font-mono font-black text-white">$150 – $250+</div>
                      <span className="text-xs text-neutral-500 font-mono tracking-wider">[ HOURLY ESTIMATION MULTIPLIER ]</span>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Complete vector and guidelines packaging with complete licensing</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Custom UI/UX application layouts with multi-screen mapping</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Direct art-direction and corporate consultation session cycles</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Dedicated digital layout rendering across web/mobile screens</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      id="design-cta-enterprise"
                      href="https://wa.me/923233260859?text=Hello,%20I%20am%20looking%20for%20Enterprise%20Studio%20design%20and%20branding%20solutions.%20Let's%20coordinate%20a%20consultation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition duration-300 text-center"
                    >
                      Consult Enterprise
                    </a>
                  </div>
                </div>

              </div>

              {/* Source-based Cost Breakdown Table Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">[ DECENTRALIZED_SOURCING_MATRIX ]</span>
                  <span className="text-xs text-neutral-400">USA Sourced Estimation Metrics</span>
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#070709]">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase font-mono text-[10px] tracking-widest">
                        <th className="p-6">Sourcing Platform / Type</th>
                        <th className="p-6">Absolute Minimum Cost</th>
                        <th className="p-6 hidden lg:table-cell">Details / Expectation Layer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300 font-sans">
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Fiverr Marketplaces</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$5 – $20 (New Sellers) / $50 – $100 (Highly-rated)</td>
                        <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light max-w-md">
                          Entry-level vector tracing or basic layout tasks from offshore freelancers. High-rated designers require standard investments.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Upwork Freelancers</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$15 – $50 flat baseline</td>
                        <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light max-w-md">
                          Simple flat minimalist logos or basic post graphics tailored by beginner freelancers.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Local US Freelancers</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$50 – $150 flat baseline</td>
                        <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light max-w-md">
                          Junior US-based graphic designers &amp; boutique tech lounges. Basic text logos or single-session consulting.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Crowdsourcing Sites</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$190 – $200 package tier</td>
                        <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light max-w-md">
                          DesignCrowd or 99designs options featuring custom graphical assets designed by multiple community contributors.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Professional Studios &amp; Agencies</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$800 – $1,500 total threshold</td>
                        <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light max-w-md">
                          Absolute baseline minimum for small US boutique design agencies. Rarely accept smaller single-asset contracts below this boundary.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hourly"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Wide layout local hourly rate specification sheet and maintenance sidecard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                
                {/* Left side: Wide specification sheet of roles */}
                <div className="lg:col-span-2 bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                      [ LOCAL_US_DESIGN_RATES ]
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                      Standard Hourly Rates in the USA
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed mt-2">
                      If your designer charges by the hour instead of a flat project fee, the minimum rates are closely tied to their experience:
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Role 1 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div>
                        <h5 className="font-bold text-white text-sm uppercase">Beginner / Freelancer (0–2 years)</h5>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Basic layout rendering, text positioning revisions</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$25 – $45</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>

                    {/* Role 2 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div>
                        <h5 className="font-bold text-white text-sm uppercase">Intermediate Freelancer (2–5 years)</h5>
                        <p className="text-[11px] text-neutral-400 mt-0.5">High-fidelity prototypes, brand identity alignment guidelines</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$50 – $85</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>

                    {/* Role 3 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div>
                        <h5 className="font-bold text-white text-sm uppercase">Expert / Agency Specialist</h5>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Dedicated comprehensive system design, UI/UX interaction architectures</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$90 – $250+</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 italic leading-relaxed">
                    Note: While the general average salary rate across standard US graphic design jobs hovers around $23.60 per hour, client-facing freelance rates must incorporate self-employment overhead, making client-side hourly minimums slightly higher.
                  </p>
                </div>

                {/* Right side: Maintenance Expectation Card */}
                <div className="bg-gradient-to-br from-neutral-900 via-[#070709] to-black border border-purple-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none" />
                  
                  <div className="space-y-6">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-black">
                      // LONG TERM BRAND STYLING Refreshes
                    </span>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">Styleguide Upkeep &amp; Annual Asset Refreshes</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      A brand is a living system. Moving markets require periodic style refreshes, landing page layout tweaks, graphic asset updates, and file-format migrations. Factoring in <strong className="text-neutral-200">15% to 20% of your build cost</strong> annually guarantees brand consistency across all mediums.
                    </p>

                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-purple-400" />
                        <span>Annual asset styleguide upkeep</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-purple-400" />
                        <span>Vector source configuration syncing</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-purple-400" />
                        <span>Continuous UI/UX style revisions</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Estimated Annual Retention Value</span>
                    <div className="text-xl font-mono text-[#ccff00] font-black mt-1">15% – 20% / annum</div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Risks and Quality Disclosures (Red Flags Panel) */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch" id="design-risks">
          
          {/* Quality Factors / Disclosures */}
          <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.25em] font-bold block mb-4">
                // COST COMPLEXITY FACTORS
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                What Dynamic Drivers Define the Cost?
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-2">
                Design services are not manufactured at a default baseline. Clear qualitative indicators define standard USA agency thresholds:
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <strong className="text-xs uppercase text-white font-black block">1) Designer's Deep Experience</strong>
                <p className="text-xs text-neutral-400 leading-normal font-sans">
                  Specialized visual architects understand how branding translates onto physical fabrics, store banners, high-contrast screens, and complex industrial materials without losing resolution fidelity.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-xs uppercase text-white font-black block">2) Overall Project Structural Complexity</strong>
                <p className="text-xs text-neutral-400 leading-normal font-sans">
                  Designing a basic flat flyer relies on single layout sheets. Engineering customized high-fidelity UI/UX component libraries for web/mobile interfaces requires intensive structural layout validation.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-xs uppercase text-white font-black block">3) Selected Delivery Mediums &amp; Outlets</strong>
                <p className="text-xs text-neutral-400 leading-normal font-sans">
                  Crowdsourced sites offer basic assets but bypass real agency consultations and research reviews. Boutique agencies manage entire typography rulesets for unified brand coordination.
                </p>
              </div>
            </div>
          </div>

          {/* Red Flags of "Cheap" SEO adapted to Logo & Graphics Designs */}
          <div className="bg-gradient-to-b from-neutral-900 to-[#070709] border border-[#ff0099]/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-950/25 blur-[100px] pointer-events-none" />
            
            <div className="space-y-6">
              <div className="inline-flex py-1.5 px-3 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-black">RISKS OF BOTTOM-TIER MINIMUM PRICING</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none pt-2">
                Trademark &amp; Quality Warning
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                While spending under $50 is highly budget-friendly, ultra-low pricing carries inherent structural and legal trade-offs:
              </p>

              <div className="space-y-4 pt-4 divide-y divide-white/5">
                <div className="space-y-1.5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold text-white">Template Use &amp; Non-Trademarkable Claims</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    Cheap structures often recycle stock visuals, meaning your logo may not be legally unique or protected by trademark policies.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold text-white">Highly Restrictive Revision Pools</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    The lowest pricing tiers typically lock down client feedback, limiting you to only one or two slight adjustment rounds before forcing cost spikes.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold text-white">Missing Source Vectors (.AI, .EPS, .SVG)</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    Low-cost offshore providers fail to supply crucial high-resolution vector assets needed for high-quality printing, billboard displays, or responsive styling coordinates.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5">
              <a
                id="design-cta-safety"
                href="https://wa.me/923233260859?text=Hello,%20I'd%20like%20to%20review%20my%20brand's%20visual%20assets%20for%20vector%20purity%20and%20design%20uniqueness.%20Please%20advise."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-950/60 hover:bg-neutral-900 border border-red-500/30 text-red-300 font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300"
              >
                <ShieldAlert size={14} />
                <span>Request Safe Asset Analysis</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

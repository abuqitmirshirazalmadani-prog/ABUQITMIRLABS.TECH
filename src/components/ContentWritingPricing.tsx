import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Layers, 
  Server, 
  CheckCircle2, 
  ShieldAlert, 
  PenTool, 
  DollarSign, 
  ChevronRight, 
  FileText, 
  MessageSquare,
  HelpCircle,
  HelpCircle as QuestionIcon,
  ChevronDown
} from 'lucide-react';

export default function ContentWritingPricing() {
  const [activeTab, setActiveTab] = useState<'tiers' | 'hourly'>('tiers');
  
  // Interactive estimator state
  const [contentType, setContentType] = useState('blog_post');
  const [wordCount, setWordCount] = useState<number>(1000);
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  const handleWhatsappRedirect = (planName: string, budgetDetails: string) => {
    const text = `Hello, I am reviewing the "${planName}" pricing option on your Content Writing Page. I am looking for professional, E-E-A-T compliant writing service. Details: ${budgetDetails}. Let's discuss starting this project.`;
    window.open(`https://wa.me/923233260859?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEstimatorSubmit = () => {
    const text = `Hello, I'd like to get a content writing quote:\n- Content Type: ${contentType.replace('_', ' ').toUpperCase()}\n- Target Word Count: ${wordCount} words\n- Additional Info: ${additionalInstructions || 'None'}\nPlease send me the pricing breakdown and availability.`;
    window.open(`https://wa.me/923233260859?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-36 bg-[#0A0A0C] text-white relative border-t border-white/5 overflow-hidden" id="content-pricing">
      
      {/* Background Radial Glowing Halos */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Cyber Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Cinematic Header Block */}
        <div className="mb-24 flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b border-white/10 pb-16">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">
              [ USA EDITORIAL EXPENDITURE BLUEPRINT ]
            </span>
            <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-none uppercase">
              Premium Content <br />
              <span className="text-transparent font-serif italic font-light" style={{ WebkitTextStroke: '1px #ffffff' }}>Pricing Metrics</span>
            </h2>
            <p className="mt-8 text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
              Price for logo, graphics, or premium content services in the USA typically starts at <strong className="text-white">$0.03 to $0.05 per word</strong> (roughly <strong className="text-white">$30 to $50 for a 1,000-word article</strong>) or <strong className="text-white">$15 per hour</strong> for absolute entry-level freelancers. Legit US-based agency thresholds begin as a premium standard.
            </p>
          </div>

          {/* Switch pill-shaped toggles */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
              // SWITCH VIEWPORT MODE
            </span>
            <div className="inline-flex p-1 bg-[#111111] border border-white/10 rounded-full">
              <button
                id="content-btn-tiers"
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
                id="content-btn-hourly"
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

        {/* Dynamic Workspace Panels */}
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
              
              {/* Grid Card Design - 3 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                
                {/* Card 1: Small/MVP */}
                <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/10 transition-all">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-400">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block">[ ASSIGNMENT_MVP_STARTER ]</span>
                      <h4 className="text-2xl font-black text-white uppercase mt-1">Small / MVP Build</h4>
                      <p className="text-xs font-serif italic text-neutral-400">Basic landing pages or single posts</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="text-4xl font-mono font-black text-white">$100 – $150+ <span className="text-xs text-neutral-500 font-sans block mt-1 hover:text-neutral-400">/ project baseline</span></div>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Basic 500-word blog post ($50 – $150 minimum)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Short email newsletter copy ($25 – $50)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>Beginner per-word drafts budget ($0.03 – $0.07/wd)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button
                      id="content-card-cta-mvp"
                      onClick={() => handleWhatsappRedirect('Small / MVP Build', 'Basic 500-word blog content or short landing newsletters')}
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl transition duration-300 text-center uppercase"
                    >
                      Consult MVP
                    </button>
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
                      <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase block">[ GROWTH_AUTHOR_AUTHORITY ]</span>
                      <h4 className="text-2xl font-black text-white uppercase mt-1">Mid-Range Strategy</h4>
                      <p className="text-xs font-serif italic text-neutral-400">Standard blog systems with advanced keyword tuning</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="text-4xl font-mono font-black text-white">$100 – $150+ <span className="text-xs text-neutral-500 font-sans block mt-1 hover:text-neutral-400">/ project baseline</span></div>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Standard 1,000-word article ($100 – $250 avg)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Intermediate per-word research ($0.10 – $0.25/wd)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Long newsletter sequencing layout ($150+ budget)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shrink-0 mt-1.5" />
                        <span>Plagiarism checking and basic SurferSEO scoring</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button
                      id="content-card-cta-popular"
                      onClick={() => handleWhatsappRedirect('Mid-Range Strategy', 'Standard 1,000-word SEO articles or Long newsletter structures')}
                      className="w-full py-4 bg-[#ccff00] text-black hover:bg-white text-[10px] font-black uppercase tracking-widest rounded-xl transition duration-300 shadow-md text-center"
                    >
                      Initiate Discovery
                    </button>
                  </div>
                </div>

                {/* Card 3: Enterprise Solutions */}
                <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/10 transition-all">
                  <div className="space-y-6">
                    <div className="inline-flex p-3 rounded-2xl bg-fuchsia-950/20 border border-fuchsia-500/20 text-fuchsia-400">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-fuchsia-400 tracking-widest uppercase block">[ ADVANCED_NICHE_SILO ]</span>
                      <h4 className="text-2xl font-black text-white uppercase mt-1">Enterprise Solutions</h4>
                      <p className="text-xs font-serif italic text-neutral-400">High-authority specialized whitepapers &amp; research</p>
                    </div>

                    <div className="border-y border-white/5 py-4">
                      <div className="text-4xl font-mono font-black text-white">$150 – $250+ <span className="text-xs text-neutral-500 font-sans block mt-1 hover:text-neutral-400">/ project baseline</span></div>
                    </div>

                    <ul className="space-y-3 pt-2">
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Advanced / Niche per-word limits ($0.30 – $1.00+ /word)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Highly authoritative domains (finance, medical, software)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shrink-0 mt-1.5" />
                        <span>Comprehensive whitepaper setups &amp; complete case studies</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button
                      id="content-card-cta-enterprise"
                      onClick={() => handleWhatsappRedirect('Enterprise Solutions', 'High-authority finance/medical/software whitepaper and custom case study')}
                      className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-xl transition duration-300 text-center uppercase"
                    >
                      Consult Enterprise
                    </button>
                  </div>
                </div>

              </div>

              {/* Dynamic Content Structure Table Grid */}
              <div className="space-y-6 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">// DETAILED CONTENT COST STRUCTS</span>
                  <span className="text-xs text-neutral-400">US Base Editorial Structures</span>
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#070709]">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase font-mono text-[10px] tracking-widest">
                        <th className="p-6">Pricing Model Format</th>
                        <th className="p-6">Absolute Minimum</th>
                        <th className="p-6">Experienced Specialist Tier</th>
                        <th className="p-6 hidden lg:table-cell">What is Typically Included</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-300 font-sans">
                      <tr className="hover:bg-white/[0.01] transition-colors animate-fade-in">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Per-Word Rates</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$0.03 – $0.07 / word</td>
                        <td className="p-6 font-mono text-purple-400 font-bold">$0.10 – $0.25 (Int) / $0.30 – $1.00+ (Adv)</td>
                        <td className="p-6 hidden lg:table-cell text-xs text-neutral-400 font-light max-w-sm">
                          Original, non-plagiarized text drafting. Advanced tiers cover high-competition niches like medicine, finance, and cloud software.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.01] transition-colors animate-fade-in">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Hourly Rates</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$15 – $30 / hour</td>
                        <td className="p-6 font-mono text-purple-400 font-bold">$50 – $100 / hour (Experienced)</td>
                        <td className="p-6 hidden lg:table-cell text-xs text-neutral-400 font-light max-w-sm">
                          Deep-dive custom interviews, semantic competitive brief construction, editing parameters alignment.
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.01] transition-colors animate-fade-in">
                        <td className="p-6 font-bold text-white uppercase tracking-tight">Flat Project Rates</td>
                        <td className="p-6 font-mono text-[#ccff00] font-black">$50 – $150 (Basic Blog)</td>
                        <td className="p-6 font-mono text-purple-400 font-bold">$100 – $250 (1,000-word)</td>
                        <td className="p-6 hidden lg:table-cell text-xs text-neutral-400 font-light max-w-sm">
                          Full layout setups for blog posts, optimized newsletters, schema-friendly structured lists, and complete deliverables.
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
                      [ LOCAL_US_ENGINEER_RATES ]
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                      Standard Hourly Rates in the USA
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed mt-2">
                      If your project charges by the hour instead of a flat project fee, the minimum rates are closely tied to team experience levels:
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Role 1 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                      <div>
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">Junior Engineer / Copywriter</h5>
                        <p className="text-[11px] text-neutral-400 mt-1">Basic layout configuration, initial keyword drafts, and content audits</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$70 – $100</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>

                    {/* Role 2 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                      <div>
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">UI/UX Designer &amp; Layout Artist</h5>
                        <p className="text-[11px] text-neutral-400 mt-1">High-fidelity schematic interfaces, custom brand identity manuals, and assets positioning</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$80 – $140</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>

                    {/* Role 3 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                      <div>
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">Mid-Level Engineer &amp; Specialist</h5>
                        <p className="text-[11px] text-neutral-400 mt-1">Complex database schema mapping, system pipeline writing, API integration layouts</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$100 – $150</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>

                    {/* Role 4 */}
                    <div className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                      <div>
                        <h5 className="font-bold text-white text-xs uppercase tracking-wider">Senior Consultant / Architect</h5>
                        <p className="text-[11px] text-neutral-400 mt-1">High-scale technical structures, enterprise data grounding audits, and editorial oversight</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-lg font-mono font-black text-[#ccff00]">$150 – $250+</span>
                        <span className="text-neutral-500 text-xs block">/ hour</span>
                      </div>
                    </div>

                  </div>

                  <p className="text-[11px] text-neutral-500 italic leading-relaxed">
                    Note: Hiring through platforms like Upwork Content Writers or standard agencies carries a higher baseline to account for platform fees, taxes, and self-employment overhead.
                  </p>
                </div>

                {/* Right side: Maintenance Expectation Card */}
                <div className="bg-gradient-to-br from-neutral-900 via-[#070709] to-black border border-purple-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none" />
                  
                  <div className="space-y-6">
                    <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-black">
                      // LONG TERM SYSTEM SECURITY
                    </span>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">System Upkeep &amp; Annual Maintenance</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Post-launch digital environments demand continuous support. Factoring in <strong className="text-white">15% to 20% of your build investment value</strong> annually covers system dependencies updating, regular database cleaning, and essential host security patches.
                    </p>

                    <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                        <span>Security patch container diagnostics</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                        <span>Database structural sync upkeep</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                        <span>Regular dependency version bumps</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase">Estimated Annual Maintenance</span>
                    <div className="text-xl font-mono text-[#ccff00] font-black mt-1">15% – 20% / annum</div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Cost Drivers and Red Flags Disclosure */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch" id="content-drivers">
          
          {/* Quality Drivers Left Box */}
          <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.25em] font-bold block mb-4">
                // COST COMPLEXITY FACTORS
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
                What Influences the Content Price?
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-2">
                Content is not built standardly. Several critical qualitative factors direct the baseline of standard US writers and agencies:
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <strong className="text-xs uppercase text-white font-black block">1) Writer's Deep Professional Experience</strong>
                <p className="text-xs text-neutral-400 leading-normal font-sans">
                  Specialized writers understand exactly how search engine entity mapping, indexing, and readability levels align without producing robotic boilerplate blocks.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-xs uppercase text-white font-black block">2) Overall Subject Complexity</strong>
                <p className="text-xs text-neutral-400 leading-normal font-sans">
                  Drafting casual retail content takes minimal verification cycles. Authoritative niches like medicine, legal policies, and API systems demand professional research audits.
                </p>
              </div>

              <div className="space-y-2">
                <strong className="text-xs uppercase text-white font-black block">3) Chosen Platform Fees &amp; Overhead Structures</strong>
                <p className="text-xs text-neutral-400 leading-normal font-sans">
                  Sourcing writers from freelance portals carries client-side charges, self-employment taxations, and high security checking overheads.
                </p>
              </div>
            </div>
          </div>

          {/* Risks of Bottom-Tier / Cheap Writing warning */}
          <div className="bg-gradient-to-b from-neutral-900 to-[#070709] border border-[#ff0099]/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-950/25 blur-[100px] pointer-events-none" />
            
            <div className="space-y-6">
              <div className="inline-flex py-1.5 px-3 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[9px] font-mono uppercase tracking-widest font-black">RISKS OF BOTTOM-TIER MINIMUM PRICING</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none pt-2">
                Google Indexation Penalty
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                While spending under $50 is highly budget-friendly, ultra-low pricing carries inherent structural and E-E-A-T trade-offs:
              </p>

              <div className="space-y-4 pt-4 divide-y divide-white/5">
                <div className="space-y-1.5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold text-white">Stock Templates &amp; Plagiarism Use</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    Cheap articles regularly recycle stock, spun blocks. If text fails copyscape parameters or is non-original, the Google Business domain gets flat penalized.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold text-white">Fewer Editorial Revisions Rounds</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    The lowest pricing tiers typically limit client input, leading to forced premium extra rates to modify inaccurate drafts or tone mismatches.
                  </p>
                </div>
                <div className="space-y-1.5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <strong className="text-xs uppercase font-extrabold text-white">Missing Search Metadata Blocks</strong>
                  </div>
                  <p className="text-xs text-neutral-400 leading-normal font-sans">
                    Low-cost copy fails to configure proper headers structuring (H2/H3 syntax), keyword mapping, schema marks, or high-converting meta descriptions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5">
              <a
                id="content-cta-safety-audit"
                href="https://wa.me/923233260859?text=Hello,%20I'd%20like%20to%20review%20my%20domain's%20existing%20content%20for%20originality%20and%20E-E-A-T%20compliance.%20Please%20advise."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-950/60 hover:bg-neutral-900 border border-red-500/30 text-red-300 font-bold uppercase tracking-widest text-[10px] py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300"
              >
                <ShieldAlert size={14} />
                <span>Request Core E-E-A-T Editorial Review</span>
              </a>
            </div>

          </div>

        </div>

        {/* Custom Interactive Estimate Form Card */}
        <div className="mt-24 bg-gradient-to-r from-neutral-900 to-[#070709] border border-[#ccff00]/20 p-8 md:p-16 rounded-[3rem] relative overflow-hidden" id="interactive-content-estimator">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 blur-[90px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-8">
            <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block">
              // INTERACTIVE ASSISTANCE ESTIMATOR
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Customize Your Content Budget
            </h3>
            <p className="text-neutral-300 text-sm md:text-md leading-relaxed font-light">
              Submit your specific editorial needs. Our estimators will immediately analyze context requirements, database storage layers, and word count multipliers to construct an accurate execution projection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              {/* Content Type dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  What type of content do you need?
                </label>
                <div className="relative">
                  <select
                    id="content-estimator-dropdown"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl bg-black border border-white/10 text-white text-xs tracking-wider uppercase font-bold appearance-none focus:outline-none focus:border-[#ccff00]"
                  >
                    <option value="blog_post">Blog Post / Organic Article</option>
                    <option value="landing_page">High-Converting Landing Page</option>
                    <option value="whitepaper">Technical Whitepaper / B2B Research</option>
                    <option value="newsletter">Email Newsletter campaign</option>
                    <option value="brand_identity">Full Brand Rules &amp; Copy Copy</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              {/* Word count slider/input */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                  What is your target word count per piece?
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    id="content-estimator-slider"
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={wordCount}
                    onChange={(e) => setWordCount(Number(e.target.value))}
                    className="flex-1 accent-[#ccff00]"
                  />
                  <span className="px-4 py-2 bg-black border border-white/10 rounded-xl font-mono text-[#ccff00] font-bold text-xs">
                    {wordCount} Words
                  </span>
                </div>
              </div>

            </div>

            {/* Additional info text input */}
            <div className="space-y-2">
              <label htmlFor="content-estimator-instructions" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                Enter target workflows &amp; special requirements...
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="content-estimator-instructions"
                  type="text"
                  placeholder="e.g., SaaS enterprise cybersecurity topics, require SurferSEO optimization..."
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl bg-black border border-white/10 text-white text-xs tracking-wider focus:outline-none focus:border-[#ccff00]"
                />
                
                <button
                  id="content-estimator-submit"
                  onClick={handleEstimatorSubmit}
                  className="bg-[#ccff00] hover:bg-white text-black font-sans font-black text-xs uppercase tracking-widest px-8 py-4 sm:py-0 rounded-xl flex items-center justify-center gap-2 transition duration-300 shrink-0"
                >
                  <span>Build Pricing Matrix</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

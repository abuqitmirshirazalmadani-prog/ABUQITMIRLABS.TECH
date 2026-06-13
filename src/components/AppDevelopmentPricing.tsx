import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Layers, 
  Server, 
  HelpCircle, 
  DollarSign, 
  Clock, 
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Info,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  hourlyRange: string;
  timeline: string;
  badge?: string;
  characteristics: string[];
  description: string;
  ctaText: string;
  icon: React.ReactNode;
  accentColor: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "simple",
    name: "Simple App",
    hourlyRange: "$40 - $100 / hr",
    timeline: "10 Days Est.",
    description: "Launch quick with optimized modules. Best suited for validated minimum viable concepts and straightforward utilities.",
    icon: <Rocket className="w-5 h-5" />,
    accentColor: "blue",
    characteristics: [
      "Single platform deployment (Android or iOS)",
      "Standard refined UI templates & clean animations",
      "Core CRUD operations and state memory",
      "Standard email, Google, or social media login",
      "Ideal for hyper-fast initial validation"
    ],
    ctaText: "Initiate Simple MVP"
  },
  {
    id: "mid-level",
    name: "Mid-Level App",
    hourlyRange: "$75 - $150 / hr",
    timeline: "20 Days Est.",
    badge: "MOST POPULAR",
    description: "Our signature configuration. High-fidelity dual-platform apps boasting custom digital styles and dynamic backend persistence.",
    icon: <Layers className="w-5 h-5" />,
    accentColor: "lime",
    characteristics: [
      "Custom prestige UI/UX architectures & guidelines",
      "Native fluid cross-platform code (iOS & Android)",
      "Bespoke RESTful/TSRPC API cloud integrations",
      "Fully secure digital payment gateways (Stripe/PayPal)",
      "Robust relational database persistence layers"
    ],
    ctaText: "Deploy Dedicated Build"
  },
  {
    id: "complex",
    name: "Complex App",
    hourlyRange: "$150 - $250 / hr",
    timeline: "40 Days Est.",
    description: "Enterprise grade engineering designed for severe scales. Implements advanced security layers, and offline-first reactive mechanisms.",
    icon: <Server className="w-5 h-5" />,
    accentColor: "fuchsia",
    characteristics: [
      "Multi-tier token authentication & military encryptions",
      "Sub-10ms real-time data sync queues & caching",
      "Deep customized AI integration & Fine-Tuned LLMs",
      "Highly scalable containerized microservices",
      "Optimized for high concurrency and massive reads"
    ],
    ctaText: "Launch Enterprise Engine"
  }
];

export default function AppDevelopmentPricing() {
  const [billingMode, setBillingMode] = useState<'hourly' | 'fixed'>('hourly');

  return (
    <section className="py-36 bg-[#0A0A0C] relative border-t border-neutral-900 overflow-hidden">
      
      {/* Background visual halo filters */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[600px] h-[600px] bg-fuchsia-950/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Minimal technical grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title Header Block */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
              [ TRANSPARENT CAPEX FORECASTS ]
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
              Investment <span className="font-serif italic text-neutral-400">Frameworks</span>
            </h2>
            <p className="mt-6 text-neutral-400 text-lg font-light max-w-2xl font-sans">
              No hidden numbers. Just precise engineering coupled with clear hour logs. We design software architectures to match both fast market validation and high-concurrency enterprise demands.
            </p>
          </div>

          {/* Interactive Pricing Toggle - Pill Shaped Control */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              // PREFERRED ENGAGEMENT MODEL
            </span>
            <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-full">
              <button
                id="billing-mode-hourly"
                onClick={() => setBillingMode('hourly')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  billingMode === 'hourly' 
                    ? 'bg-white text-black shadow-lg font-extrabold' 
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Hourly Rates
              </button>
              <button
                id="billing-mode-fixed"
                onClick={() => setBillingMode('fixed')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  billingMode === 'fixed' 
                    ? 'bg-white text-black shadow-lg font-extrabold' 
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Fixed Price Discuss
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Canvas Container using Framer Motion */}
        <AnimatePresence mode="wait">
          {billingMode === 'hourly' ? (
            <motion.div
              key="hourly-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {/* Core Pricing Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {pricingTiers.map((tier) => {
                  const isMid = tier.id === 'mid-level';
                  const isComplex = tier.id === 'complex';
                  
                  return (
                    <div
                      key={tier.id}
                      id={`pricing-card-${tier.id}`}
                      className={`relative bg-[#070709] border rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 shadow-2xl flex flex-col justify-between min-h-[640px] overflow-hidden ${
                        isMid 
                          ? 'border-[#ccff00]/40 bg-[#0a0a0c] ring-1 ring-[#ccff00]/10' 
                          : 'border-white/5 hover:border-white/15 hover:bg-[#0c0c0e]'
                      }`}
                    >
                      {/* Floating Indicator for Most Popular */}
                      {tier.badge && (
                        <div className="absolute top-6 right-6">
                          <span className="bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-lg">
                            {tier.badge}
                          </span>
                        </div>
                      )}

                      {/* Header Segment */}
                      <div className="space-y-6">
                        <div className={`inline-flex p-3 rounded-2xl border ${
                          isMid 
                            ? 'bg-[#ccff00]/5 border-[#ccff00]/20 text-[#ccff00]' 
                            : isComplex 
                              ? 'bg-fuchsia-950/20 border-fuchsia-500/20 text-fuchsia-400'
                              : 'bg-blue-950/20 border-blue-500/20 text-blue-400'
                        }`}>
                          {tier.icon}
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] block uppercase">
                            [ RANGE_TIER_{tier.id.toUpperCase()} ]
                          </span>
                          <h3 className="text-3xl font-bold uppercase tracking-tight text-white mt-1">
                            {tier.name}
                          </h3>
                        </div>

                        {/* Large pricing and timeline display */}
                        <div className="border-t border-b border-white/5 py-6 my-6 space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-tighter">
                              {tier.hourlyRange.split(' ')[0]}
                            </span>
                            <span className="text-lg font-serif italic text-neutral-400">
                              {tier.hourlyRange.substring(tier.hourlyRange.indexOf(' '))}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#ccff00] font-mono uppercase tracking-widest font-black">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{tier.timeline}</span>
                          </div>
                        </div>

                        <p className="text-neutral-400 text-sm leading-relaxed font-light font-sans">
                          {tier.description}
                        </p>

                        {/* Bullet Characteristics */}
                        <div className="space-y-3.5 pt-4">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                            // EXPECTED FEATURES
                          </span>
                          <ul className="space-y-2.5">
                            {tier.characteristics.map((char, ci) => (
                              <li key={ci} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  isMid ? 'text-[#ccff00]' : 'text-neutral-500'
                                }`} />
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Call to action element */}
                      <div className="mt-8 pt-6 border-t border-white/5">
                        <a
                          id={`cta-pricing-btn-${tier.id}`}
                          href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20discussing%20the%20${encodeURIComponent(tier.name)}%20model.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                            isMid 
                              ? 'bg-[#ccff00] text-black hover:bg-white hover:scale-[1.02]' 
                              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>{tier.ctaText}</span>
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Maintenance & Roles Details Subcard */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                
                {/* Hourly Role breakdowns (Occupies 7 columns) */}
                <div className="lg:col-span-7 bg-[#060608] border border-white/5 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-neutral-400" />
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] block font-black">
                          [ HOURLY RESOURCE BREAKDOWNS ]
                        </span>
                        <h4 className="text-xl font-bold uppercase tracking-wide text-white">
                          Standard Hourly Rates by Role
                        </h4>
                      </div>
                    </div>

                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                      Hourly pricing scales accurately based on technical resource seniority required during specific development sprints.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-white block uppercase">UI/UX Designer</span>
                          <span className="text-[10px] font-mono text-zinc-500">Atomic Interface Layouts</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-[#ccff00]">$80 - $140 / hr</span>
                      </div>
                      
                      <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-white block uppercase">Junior Engineer</span>
                          <span className="text-[10px] font-mono text-zinc-500">Component Construction</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-[#ccff00]">$70 - $100 / hr</span>
                      </div>

                      <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-white block uppercase">Mid-Level Engineer</span>
                          <span className="text-[10px] font-mono text-zinc-500">Full-Stack Modules</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-[#ccff00]">$100 - $150 / hr</span>
                      </div>

                      <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-white block uppercase">Senior Architect</span>
                          <span className="text-[10px] font-mono text-zinc-500">Logistics & Integrations</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-[#ccff00]">$150 - $250+ / hr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 mt-8 flex items-center gap-3">
                    <Info className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wide leading-relaxed">
                      All hours are logged with full transparency. Timesheets are audited weekly before billing cycles.
                    </span>
                  </div>
                </div>

                {/* Cloud & Maintenance costs subcard (Occupies 5 columns) */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#0c0a12] to-[#070709] border border-fuchsia-900/30 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5 text-fuchsia-400" />
                      <div>
                        <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-[0.2em] block font-bold">
                          ▲ ANNUAL MAINTENANCE GUIDES
                        </span>
                        <h4 className="text-xl font-bold uppercase tracking-wide text-white">
                          Post-Launch Expectations
                        </h4>
                      </div>
                    </div>

                    <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                      Standard industry metrics suggest setting aside <strong className="text-white">15% to 20%</strong> of the total initial software build expense on an annual basis.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs">
                        <span className="text-neutral-400 font-light">Server Hosting & Storage</span>
                        <span className="font-mono text-white">Scale-on-Demand</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs">
                        <span className="text-neutral-400 font-light">API Services & Tokens</span>
                        <span className="font-mono text-white">Pay-per-Usage</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400 font-light">Security Audits & Patching</span>
                        <span className="font-mono text-white">Quarterly Sprints</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-8 relative z-10">
                    <a 
                      href="https://wa.me/923233260859?text=Hello,%20I'd%20like%20to%20discuss%20maintenance%20plans%20and%20cloud%20costs."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#ccff00] hover:underline font-bold"
                    >
                      <span>Explore Dedicated SLAs</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            <motion.div
              key="fixed-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#070709] border border-white/10 rounded-[3rem] p-8 md:p-14 text-center max-w-4xl mx-auto space-y-8 relative overflow-hidden"
            >
              {/* Internal subtle highlights */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="inline-flex p-4 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-3xl text-[#ccff00] mb-2 shadow-2xl">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] font-black block">
                  [ BESPOKE FIXATION QUOTE ]
                </span>
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                  Discuss a <span className="font-serif italic text-neutral-300">Custom Fixed Price</span>
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
                  Have a crystal clear blueprint or product concept with specified functional limits? We can establish a binding, milestone-protected contract before typing a single line of code.
                </p>
              </div>

              <div className="max-w-xl mx-auto bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-200 leading-relaxed font-light">
                    If we discuss, we can tell you the correct price only after listening to the concept. We maintain absolute confidentiality through formal non-disclosure agreements before our initial strategic phone consult.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  id="cta-fixed-whatsapp-discuss"
                  href="https://wa.me/923233260859?text=Hello,%20I%20have%20an%20application%20idea%20and%20I'd%20like%20to%20discuss%20a%20fixed%20price%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-white text-black font-sans text-xs tracking-[0.14em] uppercase border border-transparent font-extrabold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-[1.02]"
                >
                  💬 Present Your Concept
                </a>
                <a
                  id="cta-fixed-email-discuss"
                  href="mailto:hello@abuqitmirlabs.tech?subject=Custom%20Fixed%20Price%20Quote%20Inquiry"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-300 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/10 px-8 py-4 rounded-full transition-all duration-300"
                >
                  📧 Email Scope Document
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

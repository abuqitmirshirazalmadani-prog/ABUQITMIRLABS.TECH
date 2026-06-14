import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  Layers, 
  Cpu, 
  Bot, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  MessagesSquare, 
  Workflow, 
  LineChart, 
  Terminal,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Server
} from 'lucide-react';

interface PricingCategory {
  category: string;
  cost: string;
  details: string;
}

const pricingGridData: PricingCategory[] = [
  {
    category: "Off-the-shelf SaaS Copilots",
    cost: "$20 – $55 / user / month",
    details: "Basic productivity assistants, embedded CRM tools, and standard text summaries."
  },
  {
    category: "Pay-As-You-Go Voice/Chat APIs",
    cost: "$0.05 – $0.25 / minute",
    details: "Infrastructure-layer voice bots. (Requires developer knowledge to stitch together)."
  },
  {
    category: "No-Code Platform Subscriptions",
    cost: "$100 – $500 / month",
    details: "Self-configured business workflows and basic automated customer service channels."
  },
  {
    category: "Freelance / Nearshore Custom Setup",
    cost: "$3,000 – $10,000 upfront",
    details: "A simple, single-workflow prototype or Minimum Viable Product (MVP)."
  },
  {
    category: "US Agency Custom Build",
    cost: "$10,000 – $35,000+ upfront",
    details: "Fully tailored, production-ready systems integrated with internal company data."
  }
];

export default function AIAgentPricing() {
  const [activePlanType, setActivePlanType] = useState<'subscription' | 'custom'>('custom');
  const [workflowInput, setWorkflowInput] = useState('');

  const handleConsultationRedirect = () => {
    const textBase = `Hello, I'm looking to automate a business workflow using an AI agent. Here is what I am trying to build: ${workflowInput || 'A custom AI agent workflow'}. I prefer a ${activePlanType === 'subscription' ? 'Pre-built Monthly Subscription solution' : 'Fully Custom Upfront solution'}. Please details estimated costs.`;
    const encoded = encodeURIComponent(textBase);
    window.open(`https://wa.me/923233260859?text=${encoded}`, '_blank');
  };

  return (
    <section className="py-36 bg-[#0A0A0C] relative border-t border-white/5 overflow-hidden" id="agent-pricing">
      {/* Absolute layout blurred colors resembling cybernetic ambient light highlights */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Cinematic Header Block */}
        <div className="mb-24 text-center md:text-left border-b border-white/10 pb-16">
          <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">
            [ CAPITAL EXPENDITURE CRITERIA ]
          </span>
          <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.9] mb-8">
            AI Agent <br />
            <span className="text-transparent font-serif italic font-light" style={{ WebkitTextStroke: '1px #ffffff' }}>Cost Structure</span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-light font-sans max-w-4xl leading-relaxed">
            Autonomous system investment depends entirely on whether you are acquiring a pre-built subscription platform or manufacturing a premium custom-engineered ecosystem.
          </p>
        </div>

        {/* Pricing Category Swapping Interface */}
        <div className="flex flex-col xl:flex-row gap-12 items-stretch mb-24">
          
          {/* Controls Side card */}
          <div className="xl:w-1/3 bg-[#070709] border border-white/5 p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black block">
                // SEGMENT SELECTION
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Model Delivery Formats
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Choose between subscription copilots to bypass development timelines, or custom software to absolute-own model IP rights.
              </p>

              {/* Toggle controls */}
              <div className="p-1 bg-black/60 border border-white/10 rounded-2xl flex flex-col gap-1">
                <button
                  id="agent-btn-prebuilt"
                  onClick={() => setActivePlanType('subscription')}
                  className={`w-full text-left p-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activePlanType === 'subscription' 
                      ? 'bg-[#ccff00] text-black shadow-lg font-black' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  Pre-Built Software (Subscription)
                </button>
                <button
                  id="agent-btn-custom"
                  onClick={() => setActivePlanType('custom')}
                  className={`w-full text-left p-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activePlanType === 'custom' 
                      ? 'bg-[#ccff00] text-black shadow-lg font-black' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  Custom Build (Upfront Dev)
                </button>
              </div>
            </div>

            {/* Price indicator card projection */}
            <div className="mt-8 pt-8 border-t border-white/5 bg-white/[0.01] p-4 rounded-xl">
              <span className="text-[9px] font-mono text-zinc-600 block">[ ESTIMATED STARTING THRESHOLD ]</span>
              <div className="text-2xl font-mono font-black text-white mt-1">
                {activePlanType === 'subscription' ? '$20 – $200 / mo' : '$3,000 – $40,000 upfront'}
              </div>
            </div>
          </div>

          {/* Interactive dynamic screen */}
          <div className="xl:w-2/3 bg-black border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 blur-[80px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activePlanType === 'subscription' ? (
                <motion.div
                  key="subscription-meta"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <span className="text-[#ccff00] font-mono text-[10px] uppercase tracking-[0.2em] font-black">[ OUT-OF-THE-BOX COPILOT CRITERIA ]</span>
                  <h4 className="text-3xl font-black text-white uppercase italic font-serif">Pre-Built Software Ecosystems</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light">
                    Minimum standard setup pricing starts from <strong className="text-white">$20 to $30 per user, per month</strong> for basic off-the-shelf copilots (such as Microsoft Copilot or HubSpot AI). Entry-level small business customer-service chatbots usually scale around <strong className="text-white">$50 to $200 per month</strong> with preset templated features.
                  </p>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <CheckCircle2 size={14} className="text-[#ccff00]" />
                      <span>Zero initial implementation delays</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <CheckCircle2 size={14} className="text-[#ccff00]" />
                      <span>Regular host-provided platform upgrades</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="custom-meta"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <span className="text-[#ccff00] font-mono text-[10px] uppercase tracking-[0.2em] font-black">[ TAILORED ENTERPRISE DECISION TRACE ]</span>
                  <h4 className="text-3xl font-black text-white uppercase italic font-serif">Bespoke Intelligent Agent Builds</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light">
                    Minimum custom build setup investments range from <strong className="text-white">$3,000 to $5,000</strong> for basic single-workflow pilots or foundational chatbots built by outsourced freelancers. High-scale, robust enterprise agent pipelines utilizing US-based specialized engineering teams generally begin at a baseline of <strong className="text-white">$15,000 to $40,000</strong> due to complex middleware, RAG grounding systems, and advanced fine-tuning models.
                  </p>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <CheckCircle2 size={14} className="text-[#ccff00]" />
                      <span>Complete intellectual property &amp; code ownership</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <CheckCircle2 size={14} className="text-[#ccff00]" />
                      <span>Zero recurring user seat SaaS licensing spikes</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8 border-t border-white/5 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                // COMPLIENCE GRADE SECURE ARCHITECTURE OVERWATCH
              </p>
              <a
                id="agent-cta-quick-discuss"
                href={`https://wa.me/923233260859?text=Hello,%20I'm%20discussing%20${activePlanType}%20AI%20agent%20builds.%20Please%20guide%20me.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-xl transition duration-300"
              >
                Discuss Plan Options
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Cost Grid Table Block */}
        <div className="mb-24">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">[ STACKET_MATRIX_EVALUATIONS ]</span>
            <span className="text-xs text-neutral-400 hidden sm:inline-block">USA Standard Estimations</span>
          </div>

          <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#070709]">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-zinc-400 uppercase font-mono text-[10px] tracking-widest">
                  <th className="p-6">Pricing Category</th>
                  <th className="p-6 text-center md:text-left">Typical Minimum Cost</th>
                  <th className="p-6 hidden lg:table-cell">What You Get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-neutral-300">
                {pricingGridData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-bold text-white uppercase tracking-tight">{row.category}</td>
                    <td className="p-6 text-center md:text-left font-mono text-[#ccff00] font-black">{row.cost}</td>
                    <td className="p-6 hidden lg:table-cell text-sm text-neutral-400 font-light max-w-md">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hidden Costs Grid Card Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          
          {/* Header metadata label helper */}
          <div className="lg:col-span-3 pb-4">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.25em] font-bold block mb-2">// INTELLECTUAL OVERHEAD</span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Crucial Ongoing Fees (The "Hidden" Minimums)</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl font-sans">
              Setting up custom code is only the initial layer. Factoring in unavoidable background API operational overhead keeps model models reliable.
            </p>
          </div>

          {/* Sub Fee 1 */}
          <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-indigo-400">[ API_TOKEN_USAGE_METRIC ]</div>
              <h4 className="text-lg font-bold text-white uppercase">Token &amp; API Usage Fees</h4>
              <p className="text-xs text-neutral-400 leading-normal font-light">
                Model processing relies heavily on direct calls. Standard workloads generally require <strong className="text-neutral-200">$500 to $1,000 per month</strong> paid directly to core model LLM providers (eg OpenAI, Anthropic, or Qdrant Cloud caches).
              </p>
            </div>
            <div className="text-xl font-mono text-[#ccff00] font-black pt-6 border-t border-white/5 mt-6">$500 – $1,000 /mo</div>
          </div>

          {/* Sub Fee 2 */}
          <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400">[ CLOUD_INFRASTRUCTURE ]</div>
              <h4 className="text-lg font-bold text-white uppercase">Hosting &amp; Compute</h4>
              <p className="text-xs text-neutral-400 leading-normal font-light">
                Secure enterprise pipelines necessitate resilient containers. Hosting setups with automated horizontal scaling and real-time database syncing require <strong className="text-neutral-200">$200 to $500 per month</strong>.
              </p>
            </div>
            <div className="text-xl font-mono text-[#ccff00] font-black pt-6 border-t border-white/5 mt-6">$200 – $500 /mo</div>
          </div>

          {/* Sub Fee 3 */}
          <div className="bg-[#070709] border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-fuchsia-400">[ AGENT_ALIGMENT_SUPPORT ]</div>
              <h4 className="text-lg font-bold text-white uppercase">System Maintenance</h4>
              <p className="text-xs text-neutral-400 leading-normal font-light">
                Prompts decay and vector parameters drift. Standard debugging, monitoring, and prompt updates generally consumes about <strong className="text-neutral-200">15% to 30% of the initial upfront build cost</strong> billed annually.
              </p>
            </div>
            <div className="text-xl font-mono text-[#ccff00] font-black pt-6 border-t border-white/5 mt-6">15% – 30% /annum</div>
          </div>

        </div>

        {/* Custom Estimate Workspace Form Card */}
        <div className="bg-gradient-to-r from-neutral-900 to-[#070709] border border-[#ccff00]/20 p-8 md:p-16 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 blur-[90px] pointer-events-none" />
          
          <div className="max-w-3xl space-y-8">
            <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block">
              // INTERACTIVE ASSISTANCE ESTIMATOR
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              What specific task or process are you looking to automate?
            </h3>
            <p className="text-neutral-300 text-sm md:text-md leading-relaxed font-light">
              Submit your workflow idea. Our systemic estimators will immediately analyze context requirements, database storage layers, and token multipliers to construct an accurate execution projection.
            </p>

            <div className="space-y-4">
              <label htmlFor="agent-estimator-input" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                Enter target workflows (e.g. "Automate lead extraction onto HubSpot CRM and sound voice calls")
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="agent-estimator-input"
                  type="text"
                  placeholder="Identify manual tasks to automate..."
                  value={workflowInput}
                  onChange={(e) => setWorkflowInput(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl bg-black border border-white/10 text-white text-xs tracking-wider focus:outline-none focus:border-[#ccff00]"
                />
                <button
                  id="agent-estimator-submit"
                  onClick={handleConsultationRedirect}
                  className="bg-[#ccff00] hover:bg-white text-black font-sans font-black text-xs uppercase tracking-widest px-8 py-4 sm:py-0 rounded-xl flex items-center justify-center gap-2 transition duration-300 shrink-0"
                >
                  <span>Build Pricing Matrix</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

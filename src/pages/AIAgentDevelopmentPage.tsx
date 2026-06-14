import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Cpu, 
  Bot, 
  Search, 
  Zap, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Terminal, 
  ShieldCheck,
  ChevronRight,
  Database,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';
import AIAgentPricing from '../components/AIAgentPricing';

export default function AIAgentDevelopmentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<'agent' | 'rag' | 'finetune'>('agent');

  const services = [
    {
      id: "01",
      title: "Autonomous AI Agents & Execution Loops",
      content: "We engineer self-directed AI agents capable of parsing dynamic tasks, planning workflows via ReAct patterns, calling internal APIs, and executing multi-step business transactions safely. Perfect for replacing manual operational bottlenecks with 24/7 intelligent processing.",
      icon: <Bot className="w-8 h-8 text-[#ccff00]" />,
    },
    {
      id: "02",
      title: "Enterprise RAG & Neural Ingestion Systems",
      content: "Break free from basic search. We construct multi-hop Retrieval-Augmented Generation (RAG) structures with semantic vector caches, sparse-dense hybrid retrieval, and real-time knowledge grounding. Your private databases become securely conversational with zero leakages.",
      icon: <Database className="w-8 h-8 text-[#ccff00]" />,
    },
    {
      id: "03",
      title: "Task-Specific LLM Fine-Tuning",
      content: "When pre-trained models fail, we build custom cognitive capabilities. We tune proprietary or open-source models (Llama, Gemma, Mistral, Claude) against your corporate manuals, codebases, and brand guidelines, dramatically boosting accuracy and domain proficiency.",
      icon: <Cpu className="w-8 h-8 text-[#ccff00]" />,
    },
    {
      id: "04",
      title: "AI Chatbots & Semantic Interfaces",
      content: "Elevate how users access information. We deploy intelligent chatbots with native memory states, complex guardrails, custom voice bindings, and advanced natural language comprehension (NLC) to transform customer support and user retention.",
      icon: <MessageSquare className="w-8 h-8 text-[#ccff00]" />,
    }
  ];

  const agentArchitecture = {
    agent: {
      title: 'Cognitive Reasoner',
      tagline: 'AUTONOMOUS STRATEGy PATTERNS WITH DYNAMIC SELF-CORRECTION.',
      p1: 'Our core reasoner architecture leverages advanced prompting loops, iterative correction, and state tree search.',
      p2: 'If an execution failure occurs in a nested tool call, the reasoner automatically rollbacks the transaction, reformulates the strategy, and executes an alternate route.',
      code: `// Cognitive loop initiation
const agent = new AutonomousAgent({
  model: "claude-3-5-sonnet",
  strategy: "ReAct-Loop",
  maxIterations: 12
});

await agent.execute("Optimize supply chain latency");`
    },
    rag: {
      title: 'Semantic Vector Rig',
      tagline: 'HYBRID NERUAL RETRIEVAL WITH MULTI-HOP GRAPH GROUNDING.',
      p1: 'A high-performance RAG pipeline utilizing neural search rerankers, semantic text chunking, and metadata pre-filtering.',
      p2: 'Bypasses standard vector lookup limitations by connecting knowledge nodes directly to graph DBs for full contextual awareness.',
      code: `// Ingest pipeline
const vectorStore = new QdrantVectorStore({
  collection: "corporate_playbooks",
  distance: "Cosine"
});

const pipeline = new IngestionPipeline();
await pipeline.processDoc("q2_forecast.pdf");`
    },
    finetune: {
      title: 'Model Fine-Tuning',
      tagline: 'PARAMETER-EFFICIENT LODR FINE-TUNING ON PRIVATE CORPORATE DATA.',
      p1: 'Boost specificity and alignment while maintaining strict data governance with tailored fine-tuning.',
      p2: 'Includes adversarial alignment, strict evaluation harnesses under direct supervision, and custom tokenizer weights.',
      code: `// PEFT Model configuration
const trainer = new LoRATrainer({
  baseModel: "meta-llama/Llama-2-13b",
  rank: 16,
  alpha: 32,
  dataset: "./compliance_logs"
});

await trainer.train();`
    }
  };

  const faqData = [
    {
      q: "What is an autonomous AI agent?",
      a: "An autonomous AI agent is a software program driven by large language models that doesn't just respond to static inputs, but actively devises its own plan, selects tools (such as search engines, API connectors, or databases), and executes tasks over multiple iterations to achieve a given objective with self-correcting logic."
    },
    {
      q: "How does Retrieval-Augmented Generation (RAG) guarantee accuracy?",
      a: "RAG retrieves relevant private company knowledge from a secure vector database before sending the user query to the language model. This context acts like an open-book reference, preventing the AI from fabricating or hallucinating information, ensuring that every answer is grounded in verifiable corporate documentation."
    },
    {
      q: "How secure is our company data when deploying AI systems?",
      a: "Data privacy is a core tier of our custom development. We build local, private hostings or utilize secure enterprise API endpoints with strict data retention zero-use rules. Your files, proprietary documents, and client queries are never used to train public base models."
    },
    {
      q: "Can custom AI agents integrate with our legacy enterprise software?",
      a: "Absolutely. We construct dedicated middleware and bespoke API connectors (REST, GraphQL, gRPC) to route data between our intelligent agent layers and your existing ERP, CRM, database, or internal proprietary systems with zero operational disruption."
    },
    {
      q: "What is the typical timeframe for deploying a custom RAG solution?",
      a: "An enterprise-grade, custom-tuned RAG system typically takes 6 to 10 weeks to map, build, connect, test, and safely deploy. We deliver in iterative milestone sprints, allowing your team to test and refine early versions of the tool."
    }
  ];

  return (
    <div className="bg-[#000000] text-slate-100 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-white">
      <Helmet>
        <title>Autonomous AI Agent & Custom GenAI Development Studio | AbuQitmirLabs</title>
        <meta name="description" content="Elite artificial intelligence development studio. We build custom autonomous AI agents, enterprise RAG systems, and task-specific model fine-tuning with total security control." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/ai-agent-development" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Autonomous AI Agent & Custom GenAI Development Studio | AbuQitmirLabs" />
        <meta property="og:description" content="Elite artificial intelligence development studio. Custom AI agents, enterprise RAG, and model fine-tuning." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/ai-agent-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Agent & AI App Development Studio | AbuQitmirLabs" />
        <meta name="twitter:description" content="Expert autonomous AI agent engineering and enterprise RAG solutions." />
        <meta name="twitter:image" content="https://abuqitmirlabs.tech/logo.png" />
        
        {/* Schema Markup */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://abuqitmirlabs.tech"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "AI Agent & App Development",
                    "item": "https://abuqitmirlabs.tech/ai-agent-development"
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Autonomous AI Agent & Custom GenAI Development",
                "serviceType": "AI Development Services",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech",
                  "logo": "https://abuqitmirlabs.tech/logo.png"
                },
                "description": "Custom autonomous AI agent engineering, private RAG pipelines, fine-tuning, and semantic intelligence for global enterprises.",
                "areaServed": "Global"
              }
            ])
          }}
        ></script>
      </Helmet>

      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px]" />
      </div>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-20 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[#ccff00] font-mono tracking-widest uppercase mb-10"
            >
              <Sparkles className="w-4 h-4 text-[#ccff00] animate-pulse" /> 
              COGNITIVE ENGINEERING LABS
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] text-white"
            >
              Autonomous <br />
              <span className="text-transparent font-serif italic font-light" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>AI Agents</span> <br />
              <span className="text-[#ccff00]">for High-Scale Ops.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mt-10 max-w-3xl text-xl md:text-2xl leading-relaxed text-slate-300 font-light"
            >
              Static web code is passive. We construct <strong>autonomous AI agents</strong> and secured private <strong>RAG architectures</strong> that plan, connect, reason, and transform raw organizational workflows into high-frequency execution cycles.
            </motion.p>

            {/* CTAs */}
            <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wrapper" 
                style={{ '--dot-size': '8px', '--line-weight': '1px', '--animation-speed': '0.35s', '--dot-color': '#fff', '--line-color': '#fff', '--grid-color': '#fff3' } as any}
              >
                <div className="line horizontal top"></div>
                <div className="line vertical right"></div>
                <div className="line horizontal bottom"></div>
                <div className="line vertical left"></div>
                <div className="dot top left"></div>
                <div className="dot top right"></div>
                <div className="dot bottom right"></div>
                <div className="dot bottom left"></div>
                <div className="btn flex flex-col items-center justify-center p-6 min-w-[260px] gap-2">
                  <ArrowRight className="btn-svg text-white w-6 h-6" />
                  <span className="btn-text text-white font-bold uppercase tracking-widest text-sm">Deploy AI Agent</span>
                </div>
              </a>
              
              <button 
                onClick={() => {
                  const el = document.getElementById('ai-capabilities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative inline-flex items-center gap-2 rounded-md bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-bold text-white/90 shadow-[0_0_15px_rgba(204,255,0,0.1)] ring-1 ring-white/10 transition-all duration-300 hover:scale-105 uppercase tracking-widest text-xs"
              >
                EXPLORE STACK
                <Terminal className="h-4 w-4 ml-2 text-[#ccff00]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Metric Section */}
      <section className="py-24 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {[
            { metric: "99.2%", label: "DECISION ACCURACY", sub: "Calculated across RAG multi-hop retrieval benchmarks" },
            { metric: "85%", label: "WORKFLOW LATENCY DECREASE", sub: "Operational execution speed improvement vs legacy processes" },
            { metric: "24/7/365", label: "AUTONOMOUS PROCESSING", sub: "No human oversight required for secure action transactions" }
          ].map((item, index) => (
            <div key={index} className="space-y-2 border-l-2 border-[#ccff00]/40 pl-6">
              <div className="text-4xl md:text-5xl font-black text-white tracking-widest font-mono">{item.metric}</div>
              <div className="text-xs font-bold tracking-widest text-slate-400 font-mono uppercase">{item.label}</div>
              <p className="text-slate-500 text-sm font-light mt-2 leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section (The Automation Chasm) */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-[#ccff00]/10 text-[#ccff00] font-bold px-4 py-1.5 rounded-full border border-[#ccff00]/20 mb-8 text-xs uppercase tracking-widest font-mono">
                THE AUTOMATION CHASM
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-10 leading-[0.9] uppercase">
                rule-based <br />
                <span className="text-transparent font-serif italic font-light" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>scripts break.</span> <br />
                agents adapt.
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-[0.4em]">
                <ShieldCheck className="text-emerald-500" size={16} />
                [ ZERO SEC RISK ARCHITECTURE ]
              </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="bg-white/[0.02] border border-white/10 p-10 md:p-14 rounded-[2.5rem] backdrop-blur-xl relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-[60px] pointer-events-none" />
              <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300">
                Most companies remain bound to rigid, brittle script automation. When a layout changes, an API variable is modified, or input data is noisy, script-based pipelines completely crash. Our cognitive architecture resolves this by employing <strong>self-correcting LLM execution loops</strong>. When a failure is detected, the AI agent dynamically audits the logs, reformulates its query payload, and bypasses the obstacle autonomously—ensuring smooth continuity for high-value business systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="ai-capabilities" className="py-32 bg-white/[0.01] border-y border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center md:text-left">
            <h2 className="text-xs font-mono text-[#ccff00] mb-6 uppercase tracking-[0.5em] font-bold">[ SYSTEM_CAPABILITIES ]</h2>
            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-8">
              Bespoke AI <span className="text-zinc-600">Cognitive Assets.</span>
            </h3>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
              We do not copy-paste OpenAI client calls. We engineer specialized frameworks designed to process and execute highly complex, secure, and accurate tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <motion.div 
                key={service.id} 
                whileHover={{ y: -8 }}
                className="bg-white/[0.03] border border-white/10 p-10 md:p-14 rounded-[3rem] group hover:bg-white/[0.06] transition-all duration-500 cursor-default relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#ccff00]/5 blur-[80px] group-hover:bg-[#ccff00]/10 transition-all pointer-events-none" />
                  <div className="mb-10 w-20 h-20 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-[#ccff00]/40 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-6 text-white leading-none">{service.title}</h3>
                  <p className="text-base text-slate-400 leading-relaxed font-light">{service.content}</p>
                </div>
                
                <div className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccff00] group-hover:gap-4 transition-all">
                  Initiate Strategic Blueprint <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Playbook / Architecture Tabs */}
      <section className="py-32 px-6 relative z-10 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase">COGNITIVE BLUEPRINTS</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/50 font-light leading-relaxed">Explore the low-level execution logic driving our high-performance autonomous agents.</p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 items-stretch rounded-[3rem] border border-white/10 bg-white/[0.02] overflow-hidden backdrop-blur-3xl">
            <div className="p-10 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-16">
                  {Object.keys(agentArchitecture).map((key) => (
                    <button 
                      key={key}
                      onClick={() => setActiveLayer(key as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeLayer === key ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]' : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                    >
                      {agentArchitecture[key as keyof typeof agentArchitecture].title}
                    </button>
                  ))}
                </div>

                <div className="max-w-xl">
                  <h3 className="mb-4 text-3xl font-black tracking-tight text-white uppercase italic">{agentArchitecture[activeLayer].title}</h3>
                  <p className="mb-8 text-[11px] uppercase tracking-[0.4em] text-[#ccff00] font-bold">{agentArchitecture[activeLayer].tagline}</p>
                  <p className="text-base leading-relaxed text-white/70 font-light mb-6">{agentArchitecture[activeLayer].p1}</p>
                  <p className="text-base leading-relaxed text-white/70 font-light mb-10">{agentArchitecture[activeLayer].p2}</p>
                </div>
              </div>

              <div>
                <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-8 text-sm font-bold text-black shadow-2xl transition hover:bg-slate-200 hover:scale-105 active:scale-95 uppercase tracking-wide"
                >
                  Consult an AI Architect
                  <ArrowRight className="h-5 w-5 text-black" />
                </a>
              </div>
            </div>
            
            <div className="p-10 lg:p-20 flex flex-col justify-center bg-black/40 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 blur-[100px] pointer-events-none" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500/60" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                    <span className="h-2 w-2 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                    {"// cognitive_architecture_run"}
                  </div>
                </div>
                <pre className="whitespace-pre-wrap p-8 font-mono text-[11px] md:text-[13px] leading-relaxed text-[#ccff00] overflow-x-auto">
                  {agentArchitecture[activeLayer].code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <CountryMarquee />

      {/* The 5-Step AI Agentic Lifecycle */}
      <section className="bg-[#000000] py-32 px-6 relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff00] mb-6 block font-mono">
              THE DEVELOPMENT LIFECYCLE
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase">
              Our 5-Step Agent <br /> 
              <span className="text-zinc-600">Deployment Blueprint</span>
            </h2>
            <p className="mt-8 text-lg text-slate-400 leading-relaxed font-light">
              Building bulletproof AI cognitive systems requires structural validation, guardrails, and secure API layers. Here is how we build agents that deploy successfully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", name: "COGNITIVE MAPPING", desc: "Define precise user boundaries, parse process logs, and structure custom data requirements." },
              { step: "02", name: "MEMORY RIGGING", desc: "Construct short-term chat states and secure hierarchical RAG vector models." },
              { step: "03", name: "TOOL CONNECTING", desc: "Expose secure internal APIs, web search widgets, and SQL interfaces via REST layers." },
              { step: "04", name: "GUARDRAIL HARNESS", desc: "Build alignment loops to completely intercept hallucinations and sensitive system leaks." },
              { step: "05", name: "PROACTIVE DEPLOY", desc: "Launch autonomous agents on custom channels, with comprehensive telemetry analytics." }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between">
                <div>
                  <div className="text-lg font-black font-mono text-[#ccff00] mb-6">{p.step} //</div>
                  <h4 className="text-sm font-bold tracking-wider text-white mb-3 uppercase">{p.name}</h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Contrast Technical Table */}
      <section className="py-32 bg-white/[0.01] border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff00] mb-3 block font-mono">COGNITIVE BENCHMARKS</span>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">AI Framework Specification Grid</h2>
          </div>
          
          <div className="overflow-x-auto border border-white/10 rounded-2xl bg-black">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400">
                  <th className="p-5 font-bold uppercase tracking-wider">SPECS</th>
                  <th className="p-5 font-bold uppercase tracking-wider">STANDARD API CRON</th>
                  <th className="p-5 font-bold uppercase tracking-wider bg-[#ccff00]/5 text-white">OUR AUTONOMOUS AGENTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="p-5 font-bold text-white uppercase">REASONING TREE</td>
                  <td className="p-5">Linear Scripts Only</td>
                  <td className="p-5 bg-[#ccff00]/5 text-white font-bold">Dynamic Iterative Reasoning Patterns</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white uppercase">HALLUCINATION LEVEL</td>
                  <td className="p-5">Variable (10% - 15%)</td>
                  <td className="p-5 bg-[#ccff00]/5 text-white font-bold">Insignificant (&lt; 0.5% guarded by RAG pipelines)</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white uppercase">INTEGRATED MEMORY</td>
                  <td className="p-5">Short-Term String Stacks</td>
                  <td className="p-5 bg-[#ccff00]/5 text-white font-bold">Long-Term Deep Vector Semantics</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white uppercase">EXECUTION AUDITING</td>
                  <td className="p-5 font-mono">Simple Console Error Logs</td>
                  <td className="p-5 bg-[#ccff00]/5 text-white font-bold">Step-by-Step State Trace Logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Strategic AI Agent Pricing Framework */}
      <AIAgentPricing />

      {/* FAQ Accordion Section */}
      <section className="py-32 px-6 bg-black z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.5em] font-bold">[ SYSTEM_SUPPORT ]</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">General Operational FAQs</h3>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/10 rounded-2xl bg-white/[0.01] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-base md:text-lg font-bold uppercase text-white tracking-tight">{faq.q}</span>
                  <span className={`ml-4 text-[#ccff00] transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}>
                    <Plus className="w-5 h-5 pointer-events-none" />
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-4 text-slate-400 text-sm md:text-base leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Cinematic CTA */}
      <section className="bg-black py-40 border-t border-white/10 relative overflow-hidden text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#ccff00] font-black block mb-6">[ PROTCOL_INIT_REQUEST ]</span>
          <h2 className="text-4xl md:text-7xl font-sans font-black uppercase text-white leading-none tracking-tighter mb-8">
            REDUCE LATENCY. <br />
            AUTO ROUTE SUCCESS.
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Partner with AbuQitmirLabs to deploy custom artificial intelligence assets designed to transform manual bottlenecks into automated growth loops.
          </p>

          <div className="flex flex-col gap-6 items-center max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
              <a
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-3 h-16 bg-[#25D366] hover:bg-[#20ba56] text-black font-black uppercase rounded-2xl tracking-wider text-xs transition active:scale-95"
              >
                💬 LAUNCH ON WHATSAPP
              </a>
              <a
                href="mailto:hello@abuqitmirlabs.tech"
                className="flex-1 inline-flex items-center justify-center gap-3 h-16 bg-white hover:bg-slate-200 text-black font-black uppercase rounded-2xl tracking-wider text-xs transition active:scale-95"
              >
                📧 DEPLOY VIA EMAIL
              </a>
            </div>
            <div className="flex flex-col items-center gap-1 mt-2">
              <span className="font-mono text-xs text-[#ccff00] uppercase tracking-widest font-bold">Contact Email Channels:</span>
              <a 
                href="mailto:hello@abuqitmirlabs.tech" 
                className="hover:underline transition font-mono text-sm font-semibold text-white/90 normal-case"
              >
                hello@abuqitmirlabs.tech
              </a>
              <a 
                href="mailto:abuqitmirshirazalmadani@gmail.com" 
                className="hover:underline transition font-mono text-xs text-slate-400 normal-case"
              >
                abuqitmirshirazalmadani@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

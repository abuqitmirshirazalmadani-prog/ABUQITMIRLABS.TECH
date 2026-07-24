import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Cpu, 
  Zap, 
  Database, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Layers, 
  Code2, 
  Sparkles, 
  BrainCircuit, 
  Workflow,
  BarChart3
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const AIAutomationPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is AI-powered automation?",
      a: "AI-powered automation combines artificial intelligence (such as Large Language Models, Retrieval-Augmented Generation, and computer vision) with workflow orchestrations to automate complex, decision-heavy business tasks with minimal human supervision."
    },
    {
      q: "How do custom AI agents work?",
      a: "Custom AI agents are autonomous software entities programmed with specific goals, memory stores, tool-calling capabilities, and domain knowledge. They can read emails, query internal databases, summarize unstructured files, execute API actions, and resolve multi-step workflows."
    },
    {
      q: "How long does it take to build a custom AI agent or RAG system?",
      a: "A production-grade RAG knowledge system or task-specific AI agent MVP can be developed and deployed in 3 to 6 weeks. Enterprise multi-agent systems with deep ERP/CRM integrations take 8 to 12 weeks."
    },
    {
      q: "How much does custom AI development cost?",
      a: "Custom AI agent development ranges from $10,000 for targeted workflow bots (e.g. customer support RAG or automated data extraction) to $35,000+ for enterprise multi-agent platforms."
    },
    {
      q: "Can custom AI agents integrate with our legacy software?",
      a: "Yes. Our AI agents interface cleanly via REST/GraphQL APIs, webhook triggers, database connectors, or browser RPA scripts, ensuring zero disruption to existing legacy systems."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI-Powered Automation & RAG Development",
    "provider": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "url": "https://abuqitmirlabs.tech"
    },
    "description": "Enterprise AI-powered automation solutions including custom AI agents, RAG enterprise search, LLM fine-tuning, and intelligent process automation.",
    "serviceType": "AI Automation Engineering"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>AI-Powered Automation — Custom AI Agents & RAG Systems | AbuQitmirLabs</title>
        <meta name="description" content="Custom AI-powered automation solutions by AbuQitmirLabs. We engineer autonomous AI agents, Retrieval-Augmented Generation (RAG) platforms, and intelligent workflow automation." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/ai-automation" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'AI-Powered Automation', path: '/solutions/ai-automation' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.08),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Bot className="w-4 h-4 text-[#ccff00]" /> Autonomous Business Intelligence
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              AI-Powered Automation — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Custom AI Agents for Business Transformation</span>
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> AI-powered automation uses artificial intelligence to automate complex business processes, reduce manual work, and improve decision-making. AbuQitmirLabs builds custom AI agents and RAG (Retrieval-Augmented Generation) systems that integrate with your existing infrastructure to deliver measurable ROI.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Manual tasks waste thousands of human hours each month. We replace slow manual data entry, repetitive support handling, and complex document analysis with hyper-accurate, autonomous AI agents.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Schedule AI Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/ai-agent-development" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Custom AI agents for your business
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Automation Challenge */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                The Operational Efficiency Gap
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Traditional software rules break down when dealing with unstructured text, PDFs, customer intent, or dynamic decision matrices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Process Complexity",
                  desc: "Traditional RPA scripts fail when document layouts change or when human judgment is required for edge cases.",
                  icon: Workflow
                },
                {
                  title: "Legacy Integration",
                  desc: "Siloed enterprise software platforms that don't communicate natively with modern cloud applications.",
                  icon: Layers
                },
                {
                  title: "Unstructured Data",
                  desc: "Over 80% of enterprise data sits trapped inside PDFs, emails, call transcripts, and support tickets.",
                  icon: Database
                },
                {
                  title: "Hallucination Risks",
                  desc: "Off-the-shelf AI models hallucinate facts without verified domain-specific Retrieval-Augmented Generation (RAG).",
                  icon: BrainCircuit
                }
              ].map((c, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-[#ccff00]/50 transition-all group">
                  <c.icon className="w-10 h-10 text-[#ccff00] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Automation Solutions */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Autonomous Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our AI Automation Solutions
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Engineered with vector search, multi-agent frameworks, and strict guardrails.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom AI Agent Development",
                desc: "Task-specific autonomous agents capable of research, decision execution, API tool calling, and multi-step workflow completion.",
                tag: "Autonomous Agents",
                icon: Bot
              },
              {
                title: "RAG Knowledge Systems",
                desc: "Connecting LLMs to your private vector databases (Pinecone/Weaviate) for hallucination-free enterprise knowledge retrieval.",
                tag: "Vector Search",
                icon: Search
              },
              {
                title: "LLM Fine-Tuning & Integration",
                desc: "Fine-tuning open models (Llama 3, Mistral) or integrating OpenAI, Anthropic, and Gemini via custom prompt engineering pipelines.",
                tag: "Model Optimization",
                icon: Cpu
              },
              {
                title: "Intelligent Process Automation (IPA)",
                desc: "Replacing repetitive manual back-office tasks with intelligent self-healing AI workflow pipelines.",
                tag: "Workflow Automation",
                icon: Workflow
              },
              {
                title: "Natural Language Processing (NLP)",
                desc: "Extracting structured JSON metrics, sentiment data, and entities from raw emails, contracts, and call logs.",
                tag: "Text Intelligence",
                icon: Code2
              },
              {
                title: "Predictive Analytics & Forecasting",
                desc: "Machine learning models for inventory forecasting, customer churn prediction, and real-time operational optimization.",
                tag: "Predictive AI",
                icon: BarChart3
              }
            ].map((sol, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full">
                      {sol.tag}
                    </span>
                    <sol.icon className="w-8 h-8 text-gray-400 group-hover:text-[#ccff00] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{sol.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{sol.desc}</p>
                </div>
                <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 mt-4">
                  Custom AI agents for your business <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">AI Engine Stack</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">AI & ML Technology Stack</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: "AI Frameworks", techs: "LangChain, LlamaIndex, AutoGen, CrewAI" },
                { category: "LLM Providers", techs: "OpenAI GPT-4o, Anthropic Claude, Gemini 1.5, Llama 3" },
                { category: "Vector Databases", techs: "Pinecone, Weaviate, Qdrant, PGVector" },
                { category: "Execution Cloud", techs: "Python FastAPI, Docker, AWS Bedrock, GCP Vertex AI" }
              ].map((stack, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                  <span className="text-[#ccff00] text-xs font-mono uppercase block mb-2">{stack.category}</span>
                  <p className="text-white font-bold text-sm">{stack.techs}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Measurable ROI</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">AI Case Studies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Autonomous Customer Support AI Agent",
                metric: "60% Support Ticket Reduction",
                detail: "Deployed a multi-lingual RAG support agent resolving 60% of incoming user tickets instantly with zero human agent escalation."
              },
              {
                title: "Enterprise Knowledge RAG Search Engine",
                metric: "10,000+ Documents Processed",
                detail: "Engineered a vector search system allowing legal and compliance teams to retrieve accurate policy answers in under 2 seconds."
              },
              {
                title: "Predictive Demand Forecasting Model",
                metric: "35% Accuracy Improvement",
                detail: "Built a custom machine learning time-series forecasting engine cutting inventory stock-outs by 35% for an e-commerce retail group."
              }
            ].map((cs, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[#ccff00] font-mono text-2xl font-extrabold block mb-3">{cs.metric}</span>
                  <h3 className="text-xl font-bold mb-3">{cs.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{cs.detail}</p>
                </div>
                <Link to="/case-studies" className="mt-6 text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1">
                  Read Case Study <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                  <button 
                    className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <Plus className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform ${activeFaq === idx ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 font-mono"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to Automate with AI?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a technical briefing with our lead AI engineer to evaluate your workflows and estimate implementation timelines.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Book Free AI Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIAutomationPage;

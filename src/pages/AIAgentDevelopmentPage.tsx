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
  Plus,
  HelpCircle,
  Clock,
  Layers,
  Award,
  Lock,
  Globe,
  DollarSign
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import CountryMarquee from '../components/CountryMarquee';

export default function AIAgentDevelopmentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeComponentId, setActiveComponentId] = useState<string>('brain');

  const faqData = [
    {
      q: "What is an AI agent, and how is it different from a chatbot?",
      a: "An AI agent is an autonomous system that can understand context, make decisions, and execute tasks—not just answer predefined questions. It's like a junior employee who can reason, learn, and take action, whereas a chatbot simply follows scripts."
    },
    {
      q: "Which industries can benefit from AI agents?",
      a: "AI agents are versatile and can benefit almost any industry. We have developed AI automation solutions for fintech (fraud detection, customer support), healthcare (patient triage, medical record analysis), retail (recommendation engines, virtual assistants), and logistics (route optimization, inventory management)."
    },
    {
      q: "How much does AI agent development cost?",
      a: "Starter AI agents typically cost $5,000+, advanced solutions $15,000+, and enterprise platforms $40,000+. We provide fixed-price quotes after a detailed discovery phase."
    },
    {
      q: "Can I integrate an AI agent with my existing CRM and tools?",
      a: "Yes! We build agents that integrate seamlessly with Salesforce, HubSpot, Slack, Microsoft Teams, and other major platforms via APIs and webhooks."
    },
    {
      q: "Will my AI agent adhere to data privacy and compliance standards?",
      a: "Absolutely. We adhere to strict data privacy standards and can architect agents that are GDPR and HIPAA compliant. We never train models on your business data without explicit permission and robust anonymization."
    }
  ];

  const coreComponents = [
    {
      id: 'brain',
      icon: <Brain className="w-8 h-8 text-[#ccff00]" />,
      title: "Foundation Model (The Brain)",
      subtitle: "🧠 COGNITIVE FOUNDATION ENGINE",
      desc: "The large language model (LLM) provides natural language understanding, reasoning, and generation capabilities. We work with leading providers including OpenAI, Anthropic, Google Gemini, and Azure OpenAI, as well as open-source models like Llama.",
      included: [
        "Model Selection: Choosing the optimal LLM based on cost, speed, and capability requirements",
        "API Integration: Configuring endpoints, managing rate limits, and handling authentication",
        "Fine-Tuning: Optional but recommended for domain-specific accuracy and performance",
        "Parameter Management: Adjusting temperature, top_p, max_tokens, and other model settings"
      ],
      required: "Model API access, API keys, model configurations, and cost management."
    },
    {
      id: 'orchestrator',
      icon: <Cpu className="w-8 h-8 text-[#ccff00]" />,
      title: "Core-Agent (The Orchestrator)",
      subtitle: "🎯 BEHAVIOR & FLOW COORDINATOR",
      desc: "The central coordinator manages the agent's behavior, decides when to retrieve knowledge, invoke skills, or escalate to a human. This is the 'brains' behind the operation.",
      included: [
        "Planning Module: Breaks down complex tasks into sub-steps and sequences",
        "Memory Module: Retains context across interactions (short-term and long-term)",
        "Action Module: Executes decisions and calls external tools",
        "Security Module: Validates actions, manages access control, and ensures compliance"
      ],
      required: "Orchestration framework (LangChain, LlamaIndex, CrewAI, AutoGen), workflow logic, state management, decision-making algorithms, and error handling."
    },
    {
      id: 'actions',
      icon: <Zap className="w-8 h-8 text-[#ccff00]" />,
      title: "Skills & Tools (The Actions)",
      subtitle: "🔧 PLUGINS AND FUNCTION CALLS",
      desc: "These are the actions, capabilities, and workflows the agent can take—like sending messages, querying databases, or triggering automated workflows. This is what makes the agent useful.",
      included: [
        "Tool Definitions: APIs, plugins, and services the agent can invoke",
        "Integration Code: Middleware to connect to external systems",
        "Authentication: API keys, OAuth 2.0 tokens, or other credentials for each service"
      ],
      required: "API integrations (CRM, ERP, email, Slack, databases), webhooks, event-driven triggers, structured tool schemas, and credential management."
    },
    {
      id: 'memory',
      icon: <Database className="w-8 h-8 text-[#ccff00]" />,
      title: "Knowledge & Data Infrastructure (The Memory)",
      subtitle: "📚 REAL-TIME GROUNDING COMPONENT",
      desc: "The information an agent uses to understand its environment and make decisions. This is the 'source of truth' for the agent.",
      included: [
        "Knowledge Bases: Structured data, unstructured content, documents, databases, and real-time inputs",
        "RAG (Retrieval-Augmented Generation): System to fetch relevant information from knowledge sources",
        "Data Pipeline: ETL processes to prepare and update data"
      ],
      required: "Vector database (for semantic search), document processing, indexing, data cleaning, preparation, and schema definition."
    },
    {
      id: 'security',
      icon: <ShieldCheck className="w-8 h-8 text-[#ccff00]" />,
      title: "Security & Compliance (The Guardrails)",
      subtitle: "🔐 ENTERPRISE DEFENSE LAYER",
      desc: "Essential components to protect your agent and its users. This is non-negotiable for enterprise deployments.",
      included: [
        "Identity & Access Management (IAM): Unique identities for each agent",
        "Token Vault: Secure storage for API keys, OAuth tokens, and credentials",
        "Audit Logging: Track every action for compliance and debugging",
        "Guardrails: Prevent harmful actions, prompt injection, and data leaks"
      ],
      required: "OAuth 2.0 flow support, encryption (at rest and in transit), role-based access control, and compliance frameworks (GDPR, HIPAA, SOC2)."
    },
    {
      id: 'foundation',
      icon: <Bot className="w-8 h-8 text-[#ccff00]" />,
      title: "Infrastructure & Deployment (The Foundation)",
      subtitle: "☁️ HIGH-SCALE INFRASTRUCTURE",
      desc: "The hosting and scaling layer that ensures your agent performs reliably under any load.",
      included: [
        "Cloud Services: AWS, Azure, or GCP for compute and storage",
        "Containerization: Docker and Kubernetes for deployment and scaling",
        "Monitoring: Prometheus, Grafana, or similar for performance tracking",
        "CI/CD: Automated testing and deployment pipelines"
      ],
      required: "Cloud account, compute resources, storage, networking, and monitoring setup."
    }
  ];

  return (
    <div id="ai-agent-development-root" className="bg-[#000000] text-slate-100 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-white">
      <Helmet>
        <title>AI Agent Development Company | Custom AI Automation Solutions | AbuQitmirLabs</title>
        <meta name="description" content="At AbuQitmirLabs, we architect custom AI agent development solutions that transform operations, automate workflows, and enhance customer journeys globally." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/ai-agent-development" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Agent Development Company | Custom AI Automation Solutions | AbuQitmirLabs" />
        <meta property="og:description" content="At AbuQitmirLabs, we architect custom AI agent development solutions that transform operations, automate workflows, and enhance customer journeys globally." />
        <meta property="og:url" content="https://abuqitmirlabs.tech/ai-agent-development" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Agent Development Company | Custom AI Automation Solutions | AbuQitmirLabs" />
        <meta name="twitter:description" content="At AbuQitmirLabs, we architect custom AI agent development solutions that transform operations, automate workflows, and enhance customer journeys globally." />
        <meta name="twitter:image" content="https://abuqitmirlabs.tech/logo.png" />
        
        {/* Schema Markup with Organization, LocalBusiness, and Service */}
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
                "@type": "Organization",
                "name": "AbuQitmirLabs",
                "url": "https://abuqitmirlabs.tech",
                "logo": "https://abuqitmirlabs.tech/logo.png",
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61583768706452",
                  "https://x.com/AbuQitmir",
                  "https://www.linkedin.com/in/abu-qitmir-697423390/",
                  "https://www.instagram.com/abuqitmirshirazalmadani/",
                  "https://www.youtube.com/@AbuQitmir",
                  "https://www.pinterest.com/abuqitmir",
                  "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani",
                  "https://www.goodfirms.co/company/abuqitmirlabs-tech",
                  "https://clutch.co/profile/abuqitmirlabstech"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "AbuQitmirLabs",
                "image": "https://abuqitmirlabs.tech/logo.png",
                "telePhone": "+923233260859",
                "email": "hello@abuqitmirlabs.tech",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Karachi",
                  "addressCountry": "PK"
                },
                "priceRange": "$$"
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "AI Agent Development Services",
                "serviceType": "AI Automation and Agent Engineering",
                "provider": {
                  "@type": "Organization",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech"
                },
                "description": "Bespoke custom autonomous AI agent solutions, private vector databases, and custom API-driven cognitive orchestrations globally.",
                "areaServed": ["US", "GB", "Europe", "Global"]
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map(item => ({
                  "@type": "Question",
                  "name": item.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                  }
                }))
              }
            ])
          }}
        ></script>
      </Helmet>

      {/* Decorative Blur Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[160px]" />
      </div>

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section id="ai-agent-hero" className="relative pt-24 md:pt-32 pb-20 z-10">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-white text-center mb-8 leading-[1.1]"
            >
              AI Agents: <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-4 font-sans font-bold tracking-tight text-zinc-300 uppercase italic">
                Intelligent Automation for Modern Enterprises
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mt-10 max-w-4xl text-lg md:text-xl leading-relaxed text-slate-300 font-light font-sans text-center"
            >
              At AbuQitmirLabs, we architect AI agent development solutions that transform your operations—automating complex workflows, enhancing customer engagement, and unlocking new revenue streams.
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
                  const el = document.getElementById('core-architecture-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative inline-flex items-center gap-2 rounded-md bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-bold text-white/90 shadow-[0_0_15px_rgba(204,255,0,0.1)] ring-1 ring-white/10 transition-all duration-300 hover:scale-105 uppercase tracking-widest text-xs"
              >
                EXPLORE ARCHITECTURE
                <Terminal className="h-4 w-4 ml-2 text-[#ccff00]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Introduction */}
      <section id="ai-agent-intro" className="py-24 border-t border-b border-white/10 bg-white/[0.01] relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">[ COGNITIVE OVERVIEW ]</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-10 leading-tight">
            Next-Gen Autonomous systems vs. <span className="font-serif italic text-neutral-400">Static Chatbots</span>
          </h2>
          <div className="space-y-6 text-zinc-350 text-base md:text-lg font-light leading-relaxed font-sans text-justify">
            <p>
              At AbuQitmirLabs, we architect <strong className="text-white font-bold">AI agent development solutions</strong> that transform your operations—automating complex workflows, enhancing customer engagement, and unlocking new revenue streams. As a leading <strong className="text-white font-bold">AI agent development company</strong>, we design and deploy custom AI agents that think, learn, and act on your behalf. Our AI automation solutions are tailored to your specific industry—whether you're in fintech, healthcare, retail, or logistics—ensuring seamless integration and measurable ROI.
            </p>
            <p>
              Our AI agents are not chatbots—they are autonomous systems capable of task execution, contextual understanding, continuous learning, and seamless integration with your existing CRM, ERP, and communication tools. Whether you need a customer support agent, an AI sales representative, or an intelligent data analyst, we build custom AI agents that deliver results.
            </p>
          </div>
        </div>
      </section>

      {/* Cinematic Case Study Video Section (requested 16:9 aspect ratio widescreen layout) */}
      <section id="ai-agent-case-study" className="py-24 bg-zinc-950/40 border-b border-white/10 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
              [ CASE STUDY ]
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight leading-zero">
              AI Agent Architecture: <span className="italic text-[#ccff00] font-serif font-normal">Technical Demonstration</span>
            </h2>
            <p className="mt-4 text-zinc-400 font-light font-sans max-w-2xl mx-auto text-sm md:text-base">
              Watch a deep dive session of complex workflows in action, highlighting native execution speeds and self-learning loops.
            </p>
          </div>
          
          <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_50px_rgba(204,255,0,0.05)] relative group">
            <iframe 
              className="w-full h-full opacity-85 group-hover:opacity-100 transition-opacity duration-500"
              src="https://www.youtube.com/embed/B31EXmt5LrQ"
              title="AbuQitmirLabs AI Agent Case Study"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Visual Hover Indicator Component */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Components & Infrastructure */}
      <section id="core-architecture-section" className="py-32 bg-[#000000] relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.5em] font-bold block">[ SECTION 2: TECHNICAL ARCHITECTURE ]</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight uppercase leading-[0.9] mb-8">
              Core Components & <span className="font-serif italic text-zinc-400 font-normal">Infrastructure</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto font-light leading-relaxed font-sans">
              Building a robust AI agent requires careful orchestration of multiple interconnected systems. Here is the technical architecture that powers every enterprise AI agent we deploy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreComponents.map((comp) => (
              <div 
                key={comp.id}
                onClick={() => setActiveComponentId(comp.id)}
                className={`border rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 cursor-pointer overflow-hidden relative flex flex-col justify-between group ${
                  activeComponentId === comp.id 
                    ? 'bg-white/[0.04] border-[#ccff00]/40 shadow-[0_0_30px_rgba(204,255,0,0.05)]' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-[60px] pointer-events-none" />
                  <div className="mb-8 w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    {comp.icon}
                  </div>
                  
                  <h3 className="text-xs font-mono text-[#ccff00] mb-2 uppercase tracking-widest font-bold">
                    {comp.subtitle}
                  </h3>
                  <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                    {comp.title}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm font-light font-sans leading-relaxed mb-6">
                    {comp.desc}
                  </p>

                  <div className="border-t border-white/10 pt-4 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mb-2 font-bold">What's Included //</span>
                    <ul className="space-y-2">
                      {comp.included.map((inc, i) => (
                        <li key={i} className="text-xs text-slate-300 font-sans font-light flex gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[#ccff00] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-4">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mb-1 font-bold">Required Elements //</span>
                  <p className="text-[11px] font-mono text-[#ccff00]/90 leading-relaxed">
                    {comp.required}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Platform Technologies & Tools */}
      <section id="tech-stack-platforms" className="py-32 bg-white/[0.01] border-y border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.5em] font-bold block">[ SECTION 3: PLATFORM STACK ]</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-6 uppercase">
              Platform Technologies & <span className="font-serif italic text-zinc-400">Tools</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-white/50 font-light leading-relaxed font-sans">
              Our AI agent development services leverage a modern technology stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "LLM Integration & Orchestration",
                techs: ["LangChain", "LlamaIndex", "CrewAI", "AutoGen"],
                customStyle: "border-l-2 border-[#ccff00]/40"
              },
              {
                category: "Models & Frameworks",
                techs: ["OpenAI", "Anthropic Claude", "Google Gemini", "Azure OpenAI", "Llama"],
                customStyle: "border-l-2 border-slate-500"
              },
              {
                category: "Knowledge Management",
                techs: ["Vector Databases", "RAG", "ETL Pipelines"],
                customStyle: "border-l-2 border-blue-500"
              },
              {
                category: "Security & Compliance",
                techs: ["OAuth 2.0", "Zero-trust security", "Prompt injection protection", "Token vaults"],
                customStyle: "border-l-2 border-emerald-500"
              }
            ].map((techGroup, index) => (
              <div 
                key={index} 
                className={`bg-white/[0.02] border border-white/5 p-8 rounded-3xl relative overflow-hidden backdrop-blur-xl ${techGroup.customStyle}`}
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#ccff00] mb-6 font-mono font-black border-b border-white/5 pb-2">
                  {techGroup.category}
                </h3>
                <ul className="space-y-3">
                  {techGroup.techs.map((tech, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-300 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose AbuQitmirLabs */}
      <section id="why-choose-us" className="py-32 bg-[#000000] relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ SECTION 4: GLOBAL EXCELLENCE ]</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white uppercase">
              Why Choose <span className="font-serif italic text-blue-400">AbuQitmirLabs</span>
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-base text-slate-400 font-light leading-relaxed font-sans">
              As a premier software development company headquartered in Karachi, Pakistan, with a global footprint, AbuQitmirLabs combines technical excellence with deep domain expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Elite Engineering Talent",
                desc: "Our team includes PhD-level AI researchers, ML engineers, and software architects with experience at leading AI labs and Fortune 500 companies."
              },
              {
                title: "Industry-Specific Expertise",
                desc: "We have built custom AI agents for fintech, healthcare, retail, and logistics—each with unique compliance and performance requirements."
              },
              {
                title: "Security-First Mentality",
                desc: "ISO 27001-aligned security practices, OWASP-compliant AI development, and regular vulnerability assessments protect your data and your users."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 blur-[60px] pointer-events-none" />
                <span className="text-[#ccff00]/60 font-mono text-xs block mb-4 font-bold">[ 0{idx + 1} ]</span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Investment Framework */}
      <section id="investment-framework" className="py-32 bg-[#000000] border-t border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.4em] font-bold block">[ SECTION 5: CAPEX CRITERIA ]</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white uppercase mb-4">
              Investment <span className="font-serif italic text-neutral-400">Framework</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base text-slate-400 font-light leading-relaxed font-sans">
              Sovereign intellectual property and customized agent intelligence pricing models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                tier: "Starter AI Agent",
                cost: "$5,000+",
                timeline: "4–6 Weeks",
                features: ["Single-purpose agent", "1–2 platform integrations", "Basic analytics"]
              },
              {
                tier: "Advanced AI Agent",
                cost: "$15,000+",
                timeline: "8–12 Weeks",
                features: ["Multi-purpose agent", "RAG implementation", "3+ integrations", "Fine-tuning"]
              },
              {
                tier: "Enterprise Platform",
                cost: "$40,000+",
                timeline: "3–6 Months",
                features: ["Multi-agent system", "Proprietary LLM fine-tuning", "Full data pipeline", "Dedicated team"]
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 relative flex flex-col justify-between group hover:border-[#ccff00]/40 transition-colors">
                <div>
                  <div className="text-xs font-mono text-[#ccff00] font-bold mb-4 uppercase tracking-widest">[ {p.tier.toUpperCase()} ]</div>
                  <div className="text-4xl font-extrabold tracking-tight text-white mb-2">{p.cost}</div>
                  <div className="text-xs text-slate-400 font-mono mb-8 uppercase">TIMELINE: {p.timeline}</div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, fi) => (
                      <li key={fi} className="text-sm text-slate-300 font-sans flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12">
            <h3 className="text-lg font-bold uppercase text-white mb-6 font-mono tracking-wider">[ HOURLY RATES BY ROLE ]</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { role: "Junior AI Engineer", rate: "$80 – $120/hr" },
                { role: "Mid-Level AI Engineer", rate: "$120 – $180/hr" },
                { role: "Senior AI Architect/Researcher", rate: "$180 – $250+/hr" }
              ].map((roleGroup, ri) => (
                <div key={ri} className="flex justify-between items-center border-b border-white/5 pb-4 md:border-b-0 md:pb-0 font-mono text-sm">
                  <span className="text-slate-400">{roleGroup.role}</span>
                  <span className="text-white font-bold">{roleGroup.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Frequently Asked Questions */}
      <section id="operational-faqs" className="py-32 px-6 bg-[#000000] z-10 relative border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono text-[#ccff00] mb-4 uppercase tracking-[0.5em] font-bold block">[ SECTION 6: FAQ ]</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white uppercase">
              Frequently Asked <span className="font-serif italic text-blue-400">Questions</span>
            </h2>
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
                  <span className="text-base md:text-lg font-bold text-white tracking-tight font-sans">{faq.q}</span>
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
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-4 text-slate-400 text-sm md:text-base leading-relaxed font-light font-sans">
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

      {/* Section 7: Call to Action */}
      <section id="cta-collaboration" className="bg-black py-40 border-t border-white/10 relative overflow-hidden text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ccff00]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#ccff00] font-black block mb-6">[ SECTION 7: COLLABORATION ]</span>
          
          <h2 className="text-4xl md:text-6xl font-serif font-light uppercase text-white leading-tight mb-8">
            Ready to Build Your <span className="font-serif italic text-blue-400 font-normal">Intelligent AI Agent?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed font-sans">
            Stop settling for generic automation that fails to deliver ROI. Partner with AbuQitmirLabs to architect custom AI agents that drive efficiency, growth, and competitive advantage.
          </p>

          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 mb-16 max-w-2xl mx-auto text-left">
            <h3 className="text-xl font-bold uppercase text-white mb-2 font-mono tracking-wide">
              Request a Free AI Strategy Session
            </h3>
            <p className="text-slate-400 text-sm font-sans font-light leading-relaxed mb-6">
              Our team will analyze your business processes and identify the most high-impact opportunities for AI automation—at no cost.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#ccff00] tracking-widest uppercase font-bold">
              <span>Avg. Discovery Phase: 2 Weeks</span>
              <span>·</span>
              <span>Current Lead Time: 6 Weeks</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-350 font-light font-sans max-w-lg mx-auto mb-10 leading-relaxed">
            Let's discuss your next intelligent project. Our initial technical consultation and AI audit are completely free.
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

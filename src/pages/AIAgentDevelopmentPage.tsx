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
  DollarSign,
  Heart,
  Truck,
  Home,
  HeartPulse,
  Scale,
  Calendar,
  GraduationCap,
  Activity,
  Code2,
  Smartphone,
  Palette,
  PenTool
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
        
        {/* Schema Markup with BreadcrumbList, Service, FAQPage, and HowTo */}
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
                "@type": "ProfessionalService",
                "name": "AbuQitmirLabs",
                "url": "https://abuqitmirlabs.tech",
                "logo": "https://abuqitmirlabs.tech/logo.png",
                "image": "https://abuqitmirlabs.tech/logo.png",
                "telephone": "+923233260859",
                "priceRange": "$$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "8/15, 3 37A Rd, Shah Khalid Colony",
                  "addressLocality": "Landhi Town, Karachi",
                  "addressRegion": "Sindh",
                  "postalCode": "75160",
                  "addressCountry": "PK"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "24.842691448838718",
                  "longitude": "67.1862014846566"
                },
                "sameAs": [
                  "https://wa.me/923233260859",
                  "https://github.com/abuqitmir"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "AI Agent Development Services",
                "serviceType": "AI Automation and Agent Engineering",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "AbuQitmirLabs",
                  "url": "https://abuqitmirlabs.tech",
                  "logo": "https://abuqitmirlabs.tech/logo.png",
                  "image": "https://abuqitmirlabs.tech/logo.png",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Karachi",
                    "addressCountry": "PK"
                  }
                },
                "description": "At AbuQitmirLabs, we build AI agents that do more than answer questions—they automate workflows, enhance decision-making, and transform how businesses operate globally across Non-Profit, Logistics, Real Estate, Healthcare, Law, Events, and Education sectors.",
                "areaServed": ["US", "UK", "CA", "AU", "PL", "PK"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "AI Agent Development Solutions",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Non-Profit Organizations",
                        "description": "Non-profits need intelligent systems that maximize their impact without draining limited resources. Our AI agents for non-profit organizations automate donor engagement, track program outcomes, and streamline volunteer coordination—all while maintaining the highest standards of data privacy."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Logistics",
                        "description": "In logistics, every second counts. Our AI agents for logistics optimize routes in real-time, predict delivery delays before they happen, and automate exception handling—reducing operational friction and improving customer satisfaction."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Real Estate",
                        "description": "Real estate professionals need intelligent tools that qualify leads, schedule viewings, and provide market insights at a glance. Our AI agents for real estate automate lead scoring, personalize property recommendations, and handle initial client interactions—freeing your agents to focus on closing deals."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Healthcare",
                        "description": "Healthcare demands the highest standards of security, accuracy, and compliance. Our AI agents for healthcare assist with patient triage, appointment scheduling, and clinical documentation—all while maintaining full HIPAA compliance."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Small Law Firms",
                        "description": "Small law firms need AI tools that help them practice law, not manage technology. Our AI agents for small law firms automate document review, legal research, and client intake—allowing you to focus on your cases."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Corporate Events",
                        "description": "Corporate events demand intelligent systems that manage registrations, schedule speakers, and engage attendees. Our AI agents for corporate events automate ticketing, provide real-time agenda updates, and answer attendee questions instantly."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "AI Agent Development for Educational Institutions",
                        "description": "Educational institutions need AI tools that support both teachers and students. Our AI agents for educational institutions provide personalized tutoring, automate administrative tasks, and deliver real-time feedback to learners."
                      }
                    }
                  ]
                }
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
              },
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Our AI Agent Development Process",
                "description": "Our 3-step rigorous technical methodology to engineer intelligent, secure, and autonomous cognitive assets.",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Symptom & Workflow Audit",
                    "text": "We map your existing administrative pipelines, trace workflow blockages, and draft model orchestration designs."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Cognitive Prototyping & Sprint Builds",
                    "text": "Development of cognitive loops in agile 2-week milestones, integrating custom RAG datasets and testing performance values."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Guardrail Security & Live Deployment",
                    "text": "Establishing prompt injection defenses, validating GDPR/HIPAA standards, and launching clean production deployments."
                  }
                ]
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
              We build AI agents that handle real tasks, not just chatbots that answer FAQs. Using Retrieval-Augmented Generation (RAG), our agents stay grounded in your actual business data, reducing hallucinations and giving accurate, context-aware responses.
            </motion.p>

            {/* Core Capabilities Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mx-auto mt-12 max-w-4xl border-y border-white/5 py-8 px-6 bg-white/[0.01] backdrop-blur-sm rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-left">
                {[
                  "Custom RAG-Based AI Agents & Chatbots",
                  "Voice & Speech Recognition Integration",
                  "Workflow Automation Agents (Internal Ops)",
                  "LLM Integration (OpenAI, Anthropic, Open-Source Models)",
                  "Domain-Specific Knowledge Base Training"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300" />
                    <span className="text-sm font-sans font-light text-slate-300 tracking-tight leading-relaxed group-hover:text-white transition-colors duration-300">{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>

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
              Our AI agents are not chatbots—they are autonomous systems capable of task execution, contextual understanding, continuous learning, and seamless integration with your existing CRM, ERP, and communication tools. Whether you need a customer support agent, an AI sales representative, or an intelligent data analyst, we build custom AI agents that deliver results. Aap hamare AI Agent systems ko apne <a href="/custom-software" className="text-blue-400 hover:underline">Custom Software</a> ya <a href="/web-development" className="text-blue-400 hover:underline">Web Development</a> products ke sath connect kar ke business operations ko complete automate kar sakte hain. Headquartered in Karachi, Pakistan, we serve a global clientele.
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

      {/* AI Agent Development — Industry-Focused Solutions for Every Sector */}
      <section className="py-32 lg:py-48 bg-black relative z-10 px-6 border-t border-b border-white/5" id="agent-industry-solutions">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <span className="text-xs font-mono text-blue-500 mb-6 uppercase tracking-[0.5em] font-bold block">[ COGNITIVE_VERTICALS ]</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight mb-8">
              AI Agent Development — <br />
              <span className="font-serif italic text-blue-400">Industry-Focused Solutions for Every Sector</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed font-sans">
              At AbuQitmirLabs, we build AI agents that do more than answer questions—they automate workflows, enhance decision-making, and transform how businesses operate. Our approach begins with understanding your industry's unique challenges, data structures, and compliance requirements before we design a single agent. Whether you need a customer support assistant, a logistics optimizer, or an educational tutor, we build AI systems that fit your business, not the other way around.
            </p>
          </div>

          {/* Grid of 7 Sectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Non-Profit Organizations",
                icon: <Heart className="w-8 h-8 text-rose-400" />,
                tagline: "AI Agent Development for Non-Profit Organizations",
                description: "Non-profits need intelligent systems that maximize their impact without draining limited resources. Our AI agents for non-profit organizations automate donor engagement, track program outcomes, and streamline volunteer coordination—all while maintaining the highest standards of data privacy. From personalized donation appeals to real-time impact reporting, our AI agent development for non-profit solutions help you focus on your mission, not your admin."
              },
              {
                title: "Logistics",
                icon: <Truck className="w-8 h-8 text-amber-400" />,
                tagline: "AI Agent Development for Logistics",
                description: "In logistics, every second counts. Our AI agents for logistics optimize routes in real-time, predict delivery delays before they happen, and automate exception handling—reducing operational friction and improving customer satisfaction. Whether you manage local fleets or international supply chains, our AI agent development for logistics solutions keep your operations running smoothly."
              },
              {
                title: "Real Estate",
                icon: <Home className="w-8 h-8 text-sky-400" />,
                tagline: "AI Agent Development for Real Estate",
                description: "Real estate professionals need intelligent tools that qualify leads, schedule viewings, and provide market insights at a glance. Our AI agents for real estate automate lead scoring, personalize property recommendations, and handle initial client interactions—freeing your agents to focus on closing deals. Our AI agent development for real estate solutions turn your website into a 24/7 lead generation engine."
              },
              {
                title: "Healthcare",
                icon: <HeartPulse className="w-8 h-8 text-emerald-400" />,
                tagline: "AI Agent Development for Healthcare",
                description: "Healthcare demands the highest standards of security, accuracy, and compliance. Our AI agents for healthcare assist with patient triage, appointment scheduling, and clinical documentation—all while maintaining full HIPAA compliance. We build AI agent development for healthcare solutions that support clinical staff, reduce administrative burden, and improve patient outcomes."
              },
              {
                title: "Small Law Firms",
                icon: <Scale className="w-8 h-8 text-indigo-400" />,
                tagline: "AI Agent Development for Small Law Firms",
                description: "Small law firms need AI tools that help them practice law, not manage technology. Our AI agents for small law firms automate document review, legal research, and client intake—allowing you to focus on your cases. Our AI agent development for small law firms solutions are secure, confidential, and tailored to your practice area."
              },
              {
                title: "Corporate Events",
                icon: <Calendar className="w-8 h-8 text-purple-400" />,
                tagline: "AI Agent Development for Corporate Events",
                description: "Corporate events demand intelligent systems that manage registrations, schedule speakers, and engage attendees. Our AI agents for corporate events automate ticketing, provide real-time agenda updates, and answer attendee questions instantly. Our AI agent development for corporate events solutions create seamless experiences for organizers and participants alike."
              },
              {
                title: "Educational Institutions",
                icon: <GraduationCap className="w-8 h-8 text-blue-400" />,
                tagline: "AI Agent Development for Educational Institutions",
                description: "Educational institutions need AI tools that support both teachers and students. Our AI agents for educational institutions provide personalized tutoring, automate administrative tasks, and deliver real-time feedback to learners. From K-12 to higher education, our AI agent development for educational institutions solutions enhance learning outcomes and reduce teacher workload."
              }
            ].map((sector, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.01] border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] pointer-events-none" />
                <div>
                  <div className="mb-6 w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{sector.title}</h3>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-4">
                    {sector.tagline}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-400 font-light font-sans">{sector.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium AI Agent Development Services Narrative Section */}
      <section id="autonomous-agent-services" className="py-32 px-6 relative overflow-hidden bg-black border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.02] rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full uppercase font-mono tracking-[0.25em] font-bold">
                Premium Narrative
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight leading-tight font-serif">
                AI Agent Development Services
              </h2>
              <p className="text-xl md:text-2xl font-sans font-light text-neutral-400 tracking-wide uppercase max-w-2xl">
                Autonomous AI Agents Built for Real Business Workflows
              </p>
              
              <div className="h-[1px] w-20 bg-[#ccff00] my-8" />
              
              <div className="space-y-6 text-neutral-300 font-light leading-relaxed font-sans text-lg max-w-3xl">
                <p>
                  AI agents have moved well beyond chatbots that answer FAQs. Modern AI agents can take actions, make decisions, retrieve information from your business systems, and complete multi-step tasks with minimal human oversight. As an <strong className="text-white font-medium">AI agent development company</strong>, AbuQitmirLabs designs and builds custom agents that plug directly into your operations — not generic wrappers around a public API.
                </p>
              </div>
            </motion.div>
          </div>

          {/* What Our AI Agents Actually Do Grid */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] font-bold mb-3">[ FUNCTIONAL_BOUNDARIES ]</h3>
              <h4 className="text-3xl font-bold text-white uppercase tracking-tight">What Our AI Agents Actually Do</h4>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Task Automation Agents",
                  desc: "Agents that handle repetitive, multi-step workflows — processing orders, updating records, generating reports, or managing routine customer requests — without constant human intervention.",
                  icon: <Cpu className="text-blue-400" size={24} />
                },
                {
                  title: "Customer-Facing Support Agents",
                  desc: "Intelligent agents trained on your product, policies, and documentation that can resolve customer questions accurately, escalate appropriately, and reduce support ticket volume.",
                  icon: <MessageSquare className="text-[#ccff00]" size={24} />
                },
                {
                  title: "Internal Knowledge Agents (RAG-Based)",
                  desc: "Agents built with Retrieval-Augmented Generation (RAG) that search your internal documents, wikis, and databases to give employees accurate, sourced answers instantly — instead of digging through folders and outdated documentation.",
                  icon: <Database className="text-violet-400" size={24} />
                },
                {
                  title: "Workflow Orchestration Agents",
                  desc: "Agents that coordinate across multiple tools and systems — CRM, email, calendars, project management platforms — to complete tasks that would otherwise require manual work across several apps.",
                  icon: <Layers className="text-indigo-400" size={24} />
                },
                {
                  title: "Industry-Specific Agents",
                  desc: "Custom-built agents tailored to your sector's specific terminology, compliance needs, and operational patterns — whether that's fintech, healthcare, retail, or logistics.",
                  icon: <Brain className="text-emerald-400" size={24} />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/10 rounded-3xl p-8 transition-all hover:bg-white/[0.01] flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h5 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Development Process */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] font-bold mb-3">[ TECHNICAL_METHODOLOGY ]</h3>
              <h4 className="text-3xl font-bold text-white uppercase tracking-tight">Our AI Agent Development Process</h4>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Use Case Discovery",
                  desc: "We identify where an agent creates real operational value, rather than deploying AI for its own sake."
                },
                {
                  step: "02",
                  title: "Data & Systems Mapping",
                  desc: "We determine what internal data, documents, and systems the agent needs access to, and how it should securely connect to them."
                },
                {
                  step: "03",
                  title: "Agent Architecture & Prompt Engineering",
                  desc: "We design the agent's reasoning process, tool access, and guardrails to ensure reliable, predictable behavior."
                },
                {
                  step: "04",
                  title: "Integration",
                  desc: "The agent is connected to your actual business systems — CRMs, databases, internal APIs — so it can take real action, not just generate text."
                },
                {
                  step: "05",
                  title: "Testing & Guardrails",
                  desc: "Rigorous testing ensures the agent handles edge cases safely and escalates to humans when it should."
                },
                {
                  step: "06",
                  title: "Deployment & Monitoring",
                  desc: "Ongoing monitoring and refinement based on real usage patterns and feedback."
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/20 transition-all"
                >
                  <span className="absolute right-6 top-6 text-5xl font-mono font-black text-white/5 group-hover:text-blue-500/10 transition-colors">
                    {step.step}
                  </span>
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-white uppercase tracking-tight">
                      {step.title}
                    </h5>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Infrastructure & Privacy Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            {/* Infrastructure Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#080808] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-blue-500/15 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/[0.01] rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-bold">[ SYSTEM_INFRASTRUCTURE ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Built on Modern AI Infrastructure
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed font-sans">
                  We build agents using leading large language model providers and modern agentic frameworks, combined with retrieval systems, vector databases, and secure API integrations — chosen based on your specific accuracy, cost, and data privacy requirements, not a fixed template.
                </p>
              </div>
            </motion.div>

            {/* Privacy Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#080808] border border-[#ccff00]/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-[#ccff00]/15 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/[0.01] rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-[#ccff00] tracking-wider uppercase font-bold">[ SECURITY_BOUNDARIES ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Security & Data Privacy Come First
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed font-sans">
                  AI agents that touch your business data need to be built with the same security discipline as any enterprise software. We design agent architectures with proper access controls, data handling policies, and human-in-the-loop checkpoints for sensitive actions — so automation never comes at the cost of control.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Value Pitch & Who This Is For Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-blue-500/10 transition-colors"
            >
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-bold">[ BESPOKE_DIFFERENTIATOR ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Why Businesses Choose Our AI Agent Development Services
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed font-sans">
                  Among agencies offering <strong className="text-white font-medium">AI agent development services</strong>, the difference usually comes down to depth: whether an agent is stitched together from a template in an afternoon, or actually designed around your workflows, your data, and your risk tolerance. We build the latter — agents that survive contact with real usage rather than getting quietly abandoned after week one.
                </p>
              </div>
            </motion.div>

            {/* Who This Is For */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between hover:border-blue-500/10 transition-colors"
            >
              <div className="space-y-6">
                <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase font-bold">[ TARGET_SEGMENTS ]</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                  Who This Is For
                </h4>
                <ul className="space-y-4 not-italic font-sans text-neutral-400 font-light list-none pl-0">
                  {[
                    "Businesses drowning in repetitive manual workflows that follow predictable patterns",
                    "Support teams looking to reduce ticket volume without sacrificing accuracy",
                    "Enterprises with large internal knowledge bases that employees struggle to search effectively",
                    "Companies looking to integrate AI meaningfully into existing software rather than bolting on a chatbot widget"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* From Idea to Deployed Agent Narrative CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-[#0A0A0A] p-8 md:p-16 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/[0.03] rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl space-y-8">
              <span className="text-[10px] bg-[#ccff00]/10 text-[#ccff00] px-3 py-1 rounded-full uppercase font-mono tracking-[0.2em] font-bold">
                Operational Alignment
              </span>
              <h4 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight leading-tight">
                From Idea to Deployed Agent
              </h4>
              <p className="text-neutral-400 text-lg leading-relaxed font-light font-sans">
                Building a genuinely useful AI agent takes more than plugging into an API — it requires understanding your workflows deeply enough to know where automation actually helps versus where it introduces risk. That's the difference between an agent that gets used and one that gets abandoned after week one.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed font-light font-sans">
                If AI agents are part of a broader software modernization effort, our <Link to="/custom-software" className="text-blue-400 hover:underline font-normal">custom software development</Link> team can help you map out where agents fit alongside the rest of your systems. And if your agent needs a customer-facing interface, our <Link to="/web-development" className="text-blue-400 hover:underline font-normal">web development</Link> team can build the front-end experience around it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link
                  to="/custom-software"
                  className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all text-center inline-flex items-center justify-center gap-2 group"
                >
                  Consult Custom Software
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/web-development"
                  className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 text-white hover:bg-white/5 transition-all text-center inline-flex items-center justify-center gap-2 group"
                >
                  Explore Web Development
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* AI Agent Development Across Global Markets */}
      <section className="py-32 lg:py-48 bg-white/[0.01] border-b border-white/10 relative z-10 px-6" id="agent-global-markets">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono text-blue-500 mb-6 uppercase tracking-[0.5em] font-bold block">[ GLOBAL_COGNITIVE_REACH ]</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight mb-8">
                AI Agent Development <br />
                <span className="font-serif italic text-blue-400">Across Global Markets</span>
              </h2>
              <p className="text-base text-slate-300 font-light leading-relaxed mb-10 font-sans">
                While our engineering headquarters is in Karachi, Pakistan, our AI solutions are built for a global stage. We understand the unique demands of different markets and adapt our approach accordingly:
              </p>

              <div className="space-y-6">
                {[
                  {
                    market: "United States",
                    text: "AI agent development in the United States for businesses that require high-performance, high-security, and premium AI solutions to compete in one of the world's most competitive digital landscapes."
                  },
                  {
                    market: "United Kingdom",
                    text: "AI agent development in the United Kingdom aligned with UK data protection standards and user expectations, ensuring your brand resonates with British audiences."
                  },
                  {
                    market: "Canada",
                    text: "AI agent development in Canada that reflects the country's bilingual and multicultural landscape, with compliance to Canadian accessibility standards."
                  },
                  {
                    market: "Australia",
                    text: "AI agent development in Australia for businesses ready to dominate the Australian market with fast, scalable, and user-friendly AI platforms."
                  },
                  {
                    market: "Poland",
                    text: "AI agent development in Poland that bridges the gap between global standards and local market needs, helping Polish businesses expand their digital footprint."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l border-white/10 pl-6 py-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{item.market}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none" />
              <span className="text-xs font-mono text-[#ccff00] mb-6 uppercase tracking-[0.5em] font-bold block">[ WHY_ABUQITMIRLABS ]</span>
              <h3 className="text-3xl font-serif font-light text-white leading-tight mb-6">
                Why Partner with <span className="font-serif italic text-blue-400">AbuQitmirLabs?</span>
              </h3>
              <p className="text-base text-slate-300 leading-relaxed font-light mb-8 font-sans">
                Our team in Karachi, Pakistan, combines global-grade AI expertise with cost-effective delivery. We serve clients across the United States, United Kingdom, Canada, Poland, and Australia—building AI agents that are secure, scalable, and fully owned by you. Whether you need a RAG-based chatbot, a workflow automation agent, or a custom LLM integration, we deliver AI solutions that solve real problems.
              </p>
              
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Let's build your AI advantage.</h4>
                  <p className="text-xs text-slate-400 font-sans">Bespoke engineering from Karachi, Pakistan to international production.</p>
                </div>
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

      {/* Related Services / Internal Siloing */}
      <section className="py-24 bg-black border-t border-white/10 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xs font-mono text-slate-500 mb-12 uppercase tracking-[0.4em] font-bold">[ RELATED_SYSTEMS ]</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Custom Software", path: "/custom-software", icon: <Code2 className="w-5 h-5" /> },
              { title: "Web Development", path: "/web-development", icon: <Globe className="w-5 h-5" /> },
              { title: "Mobile Apps", path: "/mobile-app-development", icon: <Smartphone className="w-5 h-5" /> },
              { title: "SEO Mastery", path: "/seo-mastery", icon: <Cpu className="w-5 h-5" /> },
              { title: "Creative Graphics", path: "/graphics-design", icon: <Palette className="w-5 h-5" /> },
              { title: "Content Writing", path: "/content-writing", icon: <PenTool className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                className="group flex items-center justify-between p-8 bg-white/[0.01] border border-white/5 rounded-2xl transition-all hover:-translate-y-1 hover:bg-white/[0.04] hover:border-[#ccff00]/40"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#ccff00] bg-white/5 border border-white/10 p-3 rounded-lg group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold uppercase tracking-tight text-white">{link.title}</span>
                </div>
                <ArrowUpRight className="text-slate-500 group-hover:text-[#ccff00] transition-colors" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

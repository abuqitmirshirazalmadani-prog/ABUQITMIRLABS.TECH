import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Coins, 
  Lock, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Building2, 
  Cpu, 
  Scale, 
  TrendingUp, 
  CreditCard, 
  FileText, 
  Sparkles,
  Award,
  Globe,
  Layers,
  Database,
  Terminal,
  Activity,
  UserCheck,
  Receipt,
  Server
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';
import { fintechSchema } from '../../utils/fintechStaticHtml';

const FintechSolutionsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are FinTech solutions?",
      a: "FinTech solutions are specialized software applications, API integrations, and digital platforms that automate and enhance financial services. These include digital banking portals, multi-rail payment gateways, automated lending engines, real-time accounting ledgers, and financial analytics dashboards engineered to handle secure monetary transactions and fiscal data workflows."
    },
    {
      q: "What does a FinTech development company do?",
      a: "A FinTech development company designs, architects, and builds bespoke financial technology platforms. Responsibilities include engineering secure user interfaces, integrating payment processors, architecting immutable transactional databases, building automated workflow engines, and ensuring software meets rigorous performance and security benchmarks."
    },
    {
      q: "How much does FinTech software development cost?",
      a: "The cost of building a custom FinTech platform depends on functional scope, system complexity, and third-party integrations. Targeted financial tools or custom payment connectors typically range between $10,000 and $25,000, while comprehensive digital banking platforms, lending suites, or multi-tenant financial SaaS applications range from $35,000 to $80,000+."
    },
    {
      q: "How long does it take to build a FinTech platform?",
      a: "A functional FinTech minimum viable product (MVP) typically takes 8 to 12 weeks to design, engineer, and launch. More extensive enterprise financial applications, custom multi-currency payment platforms, or neobanking suites generally require 16 to 24 weeks depending on third-party API dependencies and QA testing cycles."
    },
    {
      q: "Can you build custom FinTech applications for web and mobile?",
      a: "Yes. We engineer responsive web applications using React, Next.js, and TypeScript alongside cross-platform mobile apps for iOS and Android. Our multi-platform FinTech apps feature synchronized transaction states, biometric authentication, push notifications, and high-performance financial data visualizations."
    },
    {
      q: "Can FinTech platforms integrate with third-party payment gateways and banking APIs?",
      a: "Yes. We engineer secure API bridges and webhook event handlers to integrate with leading payment gateways (such as Stripe, PayPal, and Adyen), core banking providers, identity verification services (KYC/AML), and accounting software like QuickBooks and Xero."
    },
    {
      q: "Can FinTech software include AI automation and fraud prevention?",
      a: "Yes. We integrate machine learning algorithms and autonomous AI workflows into FinTech architectures for automated risk scoring, real-time transaction anomaly detection, conversational customer support agents, and intelligent document parsing for loan or invoice processing."
    },
    {
      q: "What technologies are used to build modern FinTech applications?",
      a: "Our FinTech technology stack leverages modern, battle-tested tools: TypeScript, React, and Next.js for high-speed frontends; Node.js, Go, and Python for concurrent backend APIs; PostgreSQL, TimescaleDB, and Redis for high-integrity ledgers and caching; and containerized cloud infrastructure on AWS and Cloudflare."
    },
    {
      q: "How do FinTech solutions improve financial workflows for businesses?",
      a: "FinTech solutions replace manual spreadsheets and paper-based processes with automated, real-time digital systems. They reduce transactional errors, accelerate invoice settlements from days to seconds, automate reconciliation across multiple accounts, and provide executive teams with instant visibility into cash flow and financial KPIs."
    },
    {
      q: "Do I retain full ownership of the FinTech code and intellectual property?",
      a: "Yes. You maintain 100% complete ownership of all custom source code, database architectures, UI/UX design assets, and API configurations. We deliver all assets upon project completion without proprietary vendor lock-in or recurring software licensing fees."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>FinTech Solutions for Digital Finance | AbuQitmirLabs</title>
        <meta name="description" content="Build secure FinTech platforms, payment systems and digital finance experiences with AbuQitmirLabs for startups and growing businesses." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/fintech" />

        {/* Open Graph */}
        <meta property="og:title" content="FinTech Solutions for Digital Finance | AbuQitmirLabs" />
        <meta property="og:description" content="Build secure FinTech platforms, payment systems and digital finance experiences with AbuQitmirLabs for startups and growing businesses." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/fintech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FinTech Solutions for Digital Finance | AbuQitmirLabs" />
        <meta name="twitter:description" content="Build secure FinTech platforms, payment systems and digital finance experiences with AbuQitmirLabs for startups and growing businesses." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        <script type="application/ld+json">{JSON.stringify(fintechSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'FinTech Solutions', path: '/solutions/fintech' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10" id="hero-section">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Coins className="w-4 h-4" /> Financial Technology Engineering & Architecture
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8 max-w-5xl">
              FinTech Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Secure Digital Financial Products</span>
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 md:p-8 rounded-r-2xl max-w-4xl mb-10 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> FinTech solutions are specialized software applications, API integrations, and digital platforms that automate and secure financial workflows. AbuQitmirLabs engineers high-performance FinTech systems—including digital banking interfaces, multi-currency payment gateways, automated lending engines, and real-time financial dashboards—built with modern web architectures and zero vendor lock-in.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              We help startups, financial service providers, and growing businesses engineer secure, scalable digital finance platforms that simplify transactions, automate fiscal operations, and elevate customer trust.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Start Your FinTech Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Explore Custom Software
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Section 1: What Are FinTech Solutions? */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10" id="what-are-fintech-solutions">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Foundational Architecture</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6">
                What Are FinTech Solutions?
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Financial technology solutions represent the intersection of high-security software engineering and modern commercial workflows. They transform traditional monetary operations into real-time, automated digital experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Core Pillars of Financial Technology Systems</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  At their foundation, modern FinTech solutions rely on four immutable architectural pillars: deterministic ledger integrity, friction-free transactional user experience, multi-layered data encryption, and resilient API connectivity with payment rails and banking networks.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unlike generic consumer web applications where minor errors cause simple reload issues, financial applications require absolute data consistency, sub-second settlement calculations, and comprehensive auditability for every fiscal transaction.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Why Modern Businesses Adopt Specialized FinTech Architectures</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Businesses integrate dedicated FinTech systems to eliminate manual billing friction, shorten payout turnaround times, mitigate unauthorized chargebacks, and provide customers with seamless self-service financial portals.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  By combining bespoke frontend interfaces with high-concurrency microservices, businesses can scale their payment volumes without multiplying operational overhead. Learn how our <Link to="/web-development" className="text-[#ccff00] hover:underline font-medium">high-performance web development</Link> powers these high-throughput financial portals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: FinTech Product Development for Modern Businesses */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" id="fintech-product-development">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">End-To-End Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              FinTech Product Development for Modern Businesses
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We engineer purpose-built digital finance products tailored to your operational model and market requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Banking Platforms",
                desc: "Full-featured neobanking platforms featuring virtual card issuance, multi-currency account management, instant domestic and cross-border transfers, and real-time transaction histories.",
                tag: "Core Banking",
                icon: Building2,
                linkPath: "/custom-software",
                linkText: "Custom Software Solutions"
              },
              {
                title: "Payment & Transaction Systems",
                desc: "Custom multi-rail payment gateways with intelligent routing engines, recurring subscription management, automated merchant payouts, and instant webhook notifications.",
                tag: "Payment Processing",
                icon: CreditCard,
                linkPath: "/contact",
                linkText: "Integrate Payment Rails"
              },
              {
                title: "Financial Dashboards",
                desc: "High-clarity executive telemetry interfaces providing instant visibility into cash flow, revenue run-rates, customer churn, settlement reconciliations, and fiscal forecasting.",
                tag: "Telemetry & Reporting",
                icon: TrendingUp,
                linkPath: "/graphics-design",
                linkText: "UI/UX & Graphic Design"
              },
              {
                title: "FinTech Mobile Applications",
                desc: "Ergonomic mobile applications for iOS and Android featuring biometric login, push notifications, rapid card controls, peer-to-peer transfers, and offline balance caching.",
                tag: "Mobile Engineering",
                icon: Globe,
                linkPath: "/mobile-app-development",
                linkText: "Mobile App Development"
              },
              {
                title: "Financial Automation",
                desc: "Automated invoice generation, multi-account reconciliation engines, payroll distribution schedules, and automated dispute resolution workflows that eliminate manual entry.",
                tag: "Automation & Rules",
                icon: Zap,
                linkPath: "/ai-agent-development",
                linkText: "AI Agent Automation"
              },
              {
                title: "Customer Finance Portals",
                desc: "Branded self-service hubs where end-users manage statements, update payment methods, submit loan applications, monitor investments, and access tax documents securely.",
                tag: "Self-Service Portals",
                icon: FileText,
                linkPath: "/contact",
                linkText: "Request Architecture Brief"
              }
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full">
                      {sol.tag}
                    </span>
                    <sol.icon className="w-8 h-8 text-gray-400 group-hover:text-[#ccff00] group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#ccff00] transition-colors">{sol.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{sol.desc}</p>
                </div>
                <Link to={sol.linkPath} className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 mt-4 font-semibold">
                  {sol.linkText} <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Our FinTech Technology Services */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" id="fintech-technology-services">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Specialized Service Matrix</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Our FinTech Technology Services
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                From frontend user interfaces to resilient transaction ledgers, our cross-disciplinary engineers provide modular and full-lifecycle FinTech development services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "FinTech Web Applications",
                  desc: "High-speed single-page applications and web dashboards built with Next.js and React, delivering sub-second interactive data loading and real-time state synchronization.",
                  icon: Globe
                },
                {
                  title: "FinTech Mobile Apps",
                  desc: "Native and cross-platform iOS and Android apps engineered with React Native, incorporating biometric authentication, device keychain security, and push notifications.",
                  icon: Cpu
                },
                {
                  title: "Payment Solutions",
                  desc: "Integration and custom orchestration of payment processors, ACH rails, virtual card issuance, credit card acquiring, and multi-currency conversions.",
                  icon: CreditCard
                },
                {
                  title: "Financial Dashboards",
                  desc: "Custom data visualization suites rendering high-density charts, transaction telemetry, audit trails, and multi-tiered role-based analytics.",
                  icon: TrendingUp
                },
                {
                  title: "API & System Integrations",
                  desc: "Secure REST and GraphQL connectors bridging third-party financial data providers, accounting suites (QuickBooks, Xero), and enterprise ERP databases.",
                  icon: Server
                },
                {
                  title: "AI-Powered Workflows",
                  desc: "Autonomous AI agents for intelligent document parsing, automated credit decisioning, customer support triage, and real-time transaction risk scoring.",
                  icon: Sparkles
                },
                {
                  title: "Secure Financial Interfaces",
                  desc: "High-trust UI design engineered according to strict accessibility benchmarks, clear typography hierarchy, and friction-minimized checkout flows.",
                  icon: Lock
                },
                {
                  title: "Data & Reporting Systems",
                  desc: "Automated fiscal reporting engines generating auditable CSV, PDF, and JSON statements with cryptographic checksums and automated reconciliation.",
                  icon: FileText
                }
              ].map((service, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ccff00] mb-4">
                    <service.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: FinTech Solutions by Business Need */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" id="solutions-by-business-need">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Market Alignment</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              FinTech Solutions by Business Need
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you are an early-stage founder validating a disruptive finance MVP or an established enterprise modernizing payment pipelines, we tailor system architecture to your exact growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] font-mono text-sm font-bold">01</span>
                <h3 className="text-2xl font-bold text-white">Startups & Early-Stage Founders</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Launch investor-ready FinTech MVPs in 8 to 12 weeks with core transaction engines, secure user authentication, and compliant third-party payment rails that validate product-market fit rapidly.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-400">
                <li className="flex items-center gap-2"><span className="text-[#ccff00]">&bull;</span> Rapid prototyping & clickable Figma design systems</li>
                <li className="flex items-center gap-2"><span className="text-[#ccff00]">&bull;</span> Pre-integrated Stripe, Plaid, or custom payment connectors</li>
                <li className="flex items-center gap-2"><span className="text-[#ccff00]">&bull;</span> Clean codebase ready for investor technical due diligence</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-sm font-bold">02</span>
                <h3 className="text-2xl font-bold text-white">SMEs & Mid-Market Companies</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Modernize internal financial operations by replacing error-prone spreadsheets with automated billing portals, automated payroll workflows, and consolidated multi-account financial reporting.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-400">
                <li className="flex items-center gap-2"><span className="text-blue-400">&bull;</span> Automated accounts receivable and accounts payable pipelines</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">&bull;</span> Multi-entity accounting consolidation & currency conversion</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">&bull;</span> Role-based access control (RBAC) for finance teams</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-sm font-bold">03</span>
                <h3 className="text-2xl font-bold text-white">Financial Service Providers & Brokers</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Deliver bespoke digital client portals, automated KYC verification pipelines, interactive investment calculators, and instant quote engines that convert high-intent prospective investors.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-400">
                <li className="flex items-center gap-2"><span className="text-purple-400">&bull;</span> Client self-service document vaults & statement portals</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">&bull;</span> Automated identity verification & sanction screening</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">&bull;</span> Integration with <Link to="/content-writing" className="text-purple-300 hover:underline">technical financial content writing</Link></li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold">04</span>
                <h3 className="text-2xl font-bold text-white">Digital Scaleups & High-Volume Platforms</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Scale transaction throughput with resilient microservices architectures, double-entry ledger databases, real-time fraud mitigation, and high-concurrency cloud infrastructure.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-400">
                <li className="flex items-center gap-2"><span className="text-emerald-400">&bull;</span> Sub-100ms API response latency under heavy transaction surges</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">&bull;</span> Double-entry ledger architecture with zero floating point errors</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">&bull;</span> Automated multi-cloud failover & continuous observability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: High-Impact FinTech Use Cases */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" id="fintech-use-cases">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Real-World Applications</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                High-Impact FinTech Use Cases
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Explore practical implementations where custom financial technology drives operational velocity and measurable business outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Multi-Currency Global Payment Processing",
                  desc: "Enable cross-border customer settlements with automated dynamic currency conversion, transparent FX fee calculation, and multi-rail payment fallback."
                },
                {
                  title: "Automated Loan Origination & Credit Scoring",
                  desc: "Accelerate borrower evaluation from days to minutes using automated document analysis, credit scoring algorithms, and instant disbursement schedules."
                },
                {
                  title: "Real-Time Double-Entry Ledger Management",
                  desc: "Maintain immutable, transaction-level double-entry accounting records with zero lock contention across high-concurrency microservices."
                },
                {
                  title: "Automated Financial Reporting & Reconciliation",
                  desc: "Instantly match bank statements with internal ledger records, flag reconciliation anomalies, and export tax-ready financial statements automatically."
                },
                {
                  title: "Customer KYC Verification & Identity Onboarding",
                  desc: "Streamline user registration with optical character recognition (OCR) ID scanning, facial liveness verification, and real-time AML watchlist checks."
                },
                {
                  title: "Automated Invoice Processing & Billing Portals",
                  desc: "Generate recurring subscription invoices, automate dunning emails for failed payments, and provide clients with seamless self-service payment links."
                }
              ].map((useCase, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Secure & Scalable FinTech Architecture */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" id="secure-fintech-architecture">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Engineering Rigor</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Secure & Scalable FinTech Architecture
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Security and scalability in financial engineering are structural commitments built into every database query, API contract, and deployment pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Zero-Trust Authentication & Role-Based Access (RBAC)</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                We implement granular authorization matrices ensuring that every user, administrator, and background service operates strictly with least-privilege permissions. All authentication flows utilize secure JSON Web Tokens (JWT) with rotating secrets, multi-factor authentication (MFA), and session timeout safeguards.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sensitive financial data is never exposed in client-side bundles or unencrypted logs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Event-Driven Microservices & High-Throughput Ledgers</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                By separating transaction intake, ledger updates, and notification services through message queues (such as Redis and Kafka), our FinTech platforms handle peak transaction surges with deterministic consistency and zero database lockups.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every monetary event is recorded as an immutable ledger transaction, ensuring complete historical replayability and audit integrity.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">End-to-End Encryption & Secure API Key Management</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Data in transit is protected using TLS 1.3 encryption, while sensitive database fields (such as bank account numbers and tax IDs) are encrypted at rest using industry-standard AES-256 protocols.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Third-party API credentials and webhook secrets are stored exclusively in isolated server-side key vaults, preventing browser credential leakage.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Audit Logging, Observability & Continuous Monitoring</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Every critical action—from balance transfers and credential changes to permission updates—is recorded in an append-only audit trail with exact timestamps, IP hashes, and user identifiers.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time alerting systems notify engineering teams immediately upon detecting unexpected traffic anomalies or payment gateway latency spikes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: FinTech UI/UX for High-Trust Financial Experiences */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" id="fintech-ui-ux-design">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Interface Craft</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                FinTech UI/UX for High-Trust Financial Experiences
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Financial interfaces must balance visual sophistication with instant cognitive clarity. When money is on the line, user trust is determined by the clarity of every transaction confirmation, input field, and data visualization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Information Hierarchy & Frictionless Flows</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We design structured step-by-step transaction forms with real-time field validation, explicit confirmation dialogues, and clear fee breakdowns that eliminate user anxiety and payment abandonment. Explore our <Link to="/graphics-design" className="text-[#ccff00] hover:underline">brand identity and UI design services</Link> for details on visual hierarchy.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Clarity in Financial Data Visualization</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our dashboards present dense fiscal telemetry—such as historical yield, cash burn, and transaction volume trends—through clean, interactive SVG charting components engineered for instant executive scanning.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Mobile-First Ergonomics & Accessibility</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every financial interface is crafted to exceed WCAG AA contrast standards, with touch targets sized at 44px+ and one-thumb reachable action bars for rapid on-the-go financial management on mobile devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Our 8-Step FinTech Development Process */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" id="development-process">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Methodology</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our 8-Step FinTech Development Process
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              A predictable, transparent engineering roadmap designed to deliver secure, production-ready financial applications on schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Discovery & Alignment", desc: "Audit business models, target transaction volumes, user flows, and technical integration requirements." },
              { num: "02", title: "Workflow Analysis", desc: "Map ledger structures, entity relationships, currency handling, and payment connector specifications." },
              { num: "03", title: "UX Architecture", desc: "Design high-fidelity interactive prototypes in Figma with precise typography and transaction confirmation dialogs." },
              { num: "04", title: "Technical Architecture", desc: "Establish database schemas, API contracts, encryption keys, and microservices topologies for maximum resilience." },
              { num: "05", title: "Core Engineering", desc: "Build frontend interfaces, backend APIs, double-entry ledger logic, and real-time state sync." },
              { num: "06", title: "Integrations & QA", desc: "Connect payment rails, banking webhooks, and identity verification tools with comprehensive unit and stress testing." },
              { num: "07", title: "Security Review", desc: "Conduct zero-trust permission audits, data sanitization checks, load testing, and Core Web Vitals optimization." },
              { num: "08", title: "Deployment & Scaling", desc: "Deploy to isolated cloud infrastructure with automated CI/CD pipelines, live observability, and 100% IP handoff." }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-zinc-900/50 border border-white/10 relative">
                <span className="text-2xl font-extrabold font-mono text-[#ccff00] block mb-2">{step.num}</span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Our FinTech Technology Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" id="fintech-technology-stack">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Battle-Tested Tools</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Our FinTech Technology Stack
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                We build financial technology using modern, highly maintainable technologies chosen for computational speed, type safety, and operational reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                <span className="text-[#ccff00] text-xs font-mono uppercase block mb-3 font-semibold">Modern Frontend</span>
                <h3 className="text-lg font-bold text-white mb-2">React & Next.js</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  TypeScript, React 19, Next.js App Router, Tailwind CSS, Motion animations, and Vite for sub-second client-side hydration and fluid interfaces.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                <span className="text-blue-400 text-xs font-mono uppercase block mb-3 font-semibold">Scalable Backend Rails</span>
                <h3 className="text-lg font-bold text-white mb-2">Node.js, Go & Python</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Express, Fastify, Go microservices, Python AI pipelines, and GraphQL/REST gateways architected for high-concurrency transaction throughput.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                <span className="text-purple-400 text-xs font-mono uppercase block mb-3 font-semibold">Resilient Databases</span>
                <h3 className="text-lg font-bold text-white mb-2">PostgreSQL & Ledgers</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  PostgreSQL for relational transactional consistency, TimescaleDB for time-series fiscal telemetry, and Redis for low-latency session caching.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                <span className="text-emerald-400 text-xs font-mono uppercase block mb-3 font-semibold">Cloud & Security</span>
                <h3 className="text-lg font-bold text-white mb-2">AWS & Cloudflare</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  AWS ECS/EKS containerization, Cloudflare edge security, automated SSL/TLS termination, and isolated VPC networks for maximum data privacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: How Much Do FinTech Solutions Cost? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" id="fintech-cost">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Pricing Transparency</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              How Much Do FinTech Solutions Cost?
            </h2>
            
            {/* AEO Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl mb-8 shadow-xl">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Cost Summary:</strong> Custom FinTech software development typically ranges from $10,000 to $25,000 for focused integrations or MVP applications, and between $35,000 and $80,000+ for enterprise-grade digital banking suites, automated lending platforms, or custom payment processing ecosystems.
              </p>
            </div>

            <p className="text-gray-400 text-base leading-relaxed">
              The total investment for a FinTech project is determined by functional complexity rather than arbitrary hourly billing. Major cost drivers include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">System Scope & User Roles</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platforms requiring multi-tenant architectures, customer portals, merchant management consoles, and granular administrative permissions require additional database modeling and role testing.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Third-Party Payment & Banking APIs</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Integrating pre-built payment APIs (like Stripe) is faster and more cost-effective than bridging legacy core banking mainframes or building custom ISO 20022 payment switches.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">AI & Real-Time Automation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adding autonomous AI document parsing, automated credit decisioning rules, and real-time fraud scoring models involves dedicated model calibration and pipeline integration.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11: How Long Does FinTech Product Development Take? */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10" id="fintech-timeline">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Delivery Expectations</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                How Long Does FinTech Product Development Take?
              </h2>
              
              {/* AEO Direct Answer Block */}
              <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl mb-8 shadow-xl">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                  <strong className="text-[#ccff00]">Timeline Summary:</strong> A focused FinTech MVP typically takes 8 to 12 weeks from initial technical discovery to production deployment. Full-scale digital banking suites or multi-currency payment platforms generally require 16 to 24 weeks depending on third-party API dependencies and compliance validation cycles.
                </p>
              </div>

              <p className="text-gray-400 text-base leading-relaxed">
                Development timelines are governed by architectural scope, integration dependencies, and QA validation cycles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">FinTech MVP (8–12 Weeks)</h3>
                  <span className="text-xs font-mono uppercase text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20">Fast-to-Market</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Ideal for startups validating market traction, securing seed investment, or digitizing a specific manual financial workflow.
                </p>
                <ul className="space-y-2 text-xs font-mono text-gray-400">
                  <li className="flex items-center gap-2"><span className="text-[#ccff00]">&bull;</span> Weeks 1–3: Discovery, UX architecture, & database schema design</li>
                  <li className="flex items-center gap-2"><span className="text-[#ccff00]">&bull;</span> Weeks 4–8: Core UI development, payment API rails, & ledger logic</li>
                  <li className="flex items-center gap-2"><span className="text-[#ccff00]">&bull;</span> Weeks 9–12: Integration testing, security audit, & cloud launch</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">Enterprise FinTech Suite (16–24 Weeks)</h3>
                  <span className="text-xs font-mono uppercase text-blue-400 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">Full-Scale</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Designed for established financial institutions, scaleups, and multi-tenant platforms requiring custom ledgers and multi-tier integrations.
                </p>
                <ul className="space-y-2 text-xs font-mono text-gray-400">
                  <li className="flex items-center gap-2"><span className="text-blue-400">&bull;</span> Weeks 1–5: Architecture blueprint, legacy analysis, & Figma systems</li>
                  <li className="flex items-center gap-2"><span className="text-blue-400">&bull;</span> Weeks 6–16: Multi-service engineering, banking bridges, & mobile apps</li>
                  <li className="flex items-center gap-2"><span className="text-blue-400">&bull;</span> Weeks 17–24: Stress testing, penetration simulations, & staged rollout</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Why Choose AbuQitmirLabs for FinTech Development? */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-b border-white/10" id="why-choose-abuqitmirlabs">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Engineering Advantage</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Why Choose AbuQitmirLabs for FinTech Development?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We combine senior software engineering, high-trust UI/UX design, and autonomous AI capabilities under one unified development roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Unified Engineering & Design Synergy</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                We eliminate the gap between design and code. Our software architects and UI designers collaborate in shared Figma repositories to ensure your financial platform is visually stunning, accessible, and mathematically sound in production.
              </p>
              <Link to="/about/our-company" className="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">
                About Our Company &rarr;
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">Autonomous AI & Workflow Synergy</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                We don't just build static dashboards; we embed intelligent AI automation into your financial workflows. From real-time risk scoring to automated invoice data extraction, we help you reduce operational overhead.
              </p>
              <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">
                Explore AI Agent Solutions &rarr;
              </Link>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00]/40 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">100% Code & Intellectual Property Ownership</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                You maintain complete, unencumbered ownership of all source code, API keys, database architectures, and design files upon delivery. Zero recurring agency licensing fees, zero vendor lock-in.
              </p>
              <Link to="/contact" className="text-xs font-mono uppercase text-[#ccff00] hover:underline font-semibold">
                Request Technical Consultation &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-Disciplinary Integration Banner */}
        <section className="py-12 bg-zinc-950 border-b border-white/10" id="cross-disciplinary-links">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Cross-Disciplinary Capabilities</span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1">Explore Related Technology & Healthcare Solutions</h3>
              <p className="text-gray-400 text-xs mt-1">Discover how our engineering frameworks support regulated industries including healthcare and enterprise software.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/solutions/healthcare" className="px-5 py-2.5 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:border-[#ccff00] transition-all">
                Healthcare Solutions
              </Link>
              <Link to="/seo-mastery" className="px-5 py-2.5 bg-zinc-900 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:border-[#ccff00] transition-all">
                SEO & AEO Services
              </Link>
            </div>
          </div>
        </section>

        {/* Section 13: Frequently Asked Questions */}
        <section className="py-20 md:py-28 bg-zinc-950/90 border-t border-white/10" id="faq-section">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Direct Answers</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-4">Frequently Asked Questions About FinTech Solutions</h2>
              <p className="text-gray-400 text-base">Clear, authoritative answers to essential questions regarding financial software engineering.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-2xl bg-zinc-900/50 overflow-hidden">
                  <button 
                    className="w-full p-6 text-left font-bold text-lg flex items-center justify-between gap-4 hover:text-[#ccff00] transition-colors"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    aria-expanded={activeFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <Plus className={`w-5 h-5 text-[#ccff00] shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 pt-0 text-gray-300 text-sm leading-relaxed border-t border-white/5 font-mono"
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

        {/* Section 14: Ready to Build Your FinTech Platform? */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10" id="cta-section">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to Build Your <span className="text-[#ccff00]">FinTech Platform?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a technical consultation with our software architects to discuss system requirements, security matrices, and delivery roadmaps.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
              >
                Book Free Technical Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-10 py-5 border border-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-white/5 transition-all"
              >
                Explore Software Capabilities
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FintechSolutionsPage;

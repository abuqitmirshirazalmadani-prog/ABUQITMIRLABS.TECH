import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Smartphone, 
  Zap, 
  Globe, 
  CreditCard, 
  Boxes, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Store, 
  Layers, 
  TrendingUp, 
  Repeat,
  ShieldCheck,
  Cpu,
  Database,
  Lock,
  Search,
  Truck,
  Percent,
  Star,
  BarChart3,
  Users,
  Bot,
  Workflow,
  Sparkles,
  Server,
  FileCheck,
  Code2,
  Terminal,
  HelpCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';
import { eCommerceSchema } from '../../utils/eCommerceStaticHtml';

const ECommerceDevelopmentPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is e-commerce web development?",
      a: "E-commerce web development is the end-to-end technical engineering of digital storefronts, transactional web applications, and backend commerce engines. It encompasses responsive user interface design, product catalog databases, dynamic shopping carts, secure multi-currency payment gateway integrations, and automated order fulfillment pipelines built for speed, search visibility, and conversion optimization."
    },
    {
      q: "What is custom e-commerce development?",
      a: "Custom e-commerce development is the creation of bespoke digital commerce platforms tailored specifically to an organization's distinct operational workflows, catalog structures, and pricing models. Unlike rigid off-the-shelf templates, custom platforms provide complete source code ownership, sub-second load times, flexible API integrations, zero recurring third-party plugin fees, and total architectural freedom."
    },
    {
      q: "How much does custom e-commerce development cost?",
      a: "Custom e-commerce development costs typically range from $5,000+ for focused direct-to-consumer storefronts, $10,000 to $25,000+ for growing multi-system commerce platforms, $25,000 to $50,000+ for advanced multi-vendor marketplaces or wholesale portals with ERP integrations, and $50,000+ for large-scale enterprise commerce ecosystems. Total investment depends on feature complexity, integrations, and mobile requirements."
    },
    {
      q: "What technologies are used for e-commerce development?",
      a: "Modern e-commerce platforms utilize Next.js, React, and TypeScript for high-performance frontends, paired with Node.js, Go, or Python for backend commerce services. Relational databases like PostgreSQL handle transactional orders and catalogs, Redis manages in-memory cart states and caching, and GraphQL or REST APIs connect payment gateways, ERP systems, and headless CMS providers."
    },
    {
      q: "What is headless e-commerce?",
      a: "Headless e-commerce is an architectural approach that decouples the frontend presentation layer from the backend commerce database and business logic. The user interface communicates with backend systems via high-speed APIs. This separation enables sub-second page performance, complete visual design freedom, seamless omnichannel publishing across web and mobile apps, and independent system scaling."
    },
    {
      q: "How do you build a multi-vendor marketplace?",
      a: "Building a multi-vendor marketplace involves engineering self-service seller onboarding portals, automated vendor commission splits, split escrow checkout workflows, unified product search, vendor payout scheduling, merchant rating systems, and centralized administrative moderation dashboards that allow platform operators to manage compliance and resolve disputes efficiently."
    },
    {
      q: "Can an e-commerce platform have a mobile app?",
      a: "Yes. Custom commerce architectures are designed API-first, allowing native iOS, native Android, or cross-platform React Native and Flutter mobile applications to connect directly to the central catalog, inventory, and order management engine. Mobile shopping apps provide personalized push notifications, biometric one-tap checkout, and seamless offline browsing capabilities."
    },
    {
      q: "What security standards are required for e-commerce?",
      a: "E-commerce platforms require defense-in-depth security including TLS 1.3 data encryption in transit, AES-256 encryption for sensitive stored data, tokenized payment processing to minimize PCI DSS compliance scope, granular role-based access control (RBAC), multi-factor authentication for administrators, automated API rate limiting, and regular security vulnerability audits."
    },
    {
      q: "How can AI improve an e-commerce business?",
      a: "Artificial intelligence improves e-commerce by powering 24/7 conversational customer support agents, semantic natural-language product search, personalized dynamic product recommendation algorithms, automated catalog metadata enrichment, predictive demand forecasting, and real-time transaction fraud anomaly detection, leading to higher average order values and reduced operational costs."
    },
    {
      q: "How do I choose an e-commerce development company?",
      a: "When choosing an e-commerce development company, evaluate their technical experience with modern headless stacks, API-driven integrations with ERP and CRM platforms, security and payment compliance knowledge, transparent milestone pricing models, source code ownership policies, and their ability to provide long-term maintenance and cloud performance optimization."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>E-commerce Software Solutions | Custom E-commerce Development</title>
        <meta name="description" content="Engineer high-performance e-commerce software solutions, custom online stores, B2B wholesale portals, mobile shopping apps & multi-vendor marketplaces." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/e-commerce" />

        {/* Open Graph */}
        <meta property="og:title" content="E-commerce Software Solutions | Custom E-commerce Development" />
        <meta property="og:description" content="Engineer high-performance e-commerce software solutions, custom online stores, B2B wholesale portals, mobile shopping apps & multi-vendor marketplaces." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/solutions/e-commerce" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E-commerce Software Solutions | Custom E-commerce Development" />
        <meta name="twitter:description" content="Engineer high-performance e-commerce software solutions, custom online stores, B2B wholesale portals, mobile shopping apps & multi-vendor marketplaces." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(eCommerceSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'E-commerce Software Solutions', path: '/solutions/e-commerce' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8"
            >
              <ShoppingBag className="w-4 h-4 text-[#ccff00]" /> HIGH-PERFORMANCE DIGITAL COMMERCE ARCHITECTURE
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl"
            >
              E-commerce Software Solutions for Modern Businesses
            </motion.h1>

            {/* Direct Answer Box (AEO Direct Answer 01) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-10 shadow-2xl backdrop-blur-md"
            >
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                <strong className="text-[#ccff00]">E-commerce software solutions</strong> are purpose-built digital commerce platforms, transactional web applications, and mobile shopping systems engineered to process transactions, manage product catalogs, synchronize multi-warehouse inventory, and automate order fulfillment. They provide secure payment gateways, direct API connectivity to enterprise ERP and CRM systems, and headless scalability for online stores and multi-vendor marketplaces.
              </p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light"
            >
              Generic off-the-shelf templates limit commercial growth, introduce database latency during peak traffic, and lock growing brands into compounding plugin fees. We engineer bespoke, high-performance commerce platforms, B2B wholesale portals, and multi-vendor marketplaces that scale smoothly past millions in transaction volume.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Discuss Your E-commerce Platform <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Custom Software Architecture
              </Link>
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/5">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">100%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Source Code &amp; IP Ownership</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">&lt; 0.8s</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Sub-Second Storefront Speed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">0%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Third-Party Transaction Penalties</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-[#ccff00] font-mono">24/7</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Enterprise Reliability &amp; Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: What Are E-commerce Software Solutions? */}
        <section id="what-are-e-commerce-software-solutions" className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-12">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ TECHNICAL DEFINITIONS &amp; FOUNDATIONS ]</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                What Are E-commerce Software Solutions?
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Modern e-commerce software is an interconnected ecosystem of frontend presentation layers, transactional databases, shopping cart state machines, payment orchestration engines, inventory synchronization ledgers, and fulfillment automation pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#ccff00]" /> Custom Architecture vs. Template-Based Monoliths
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  Template-based monoliths combine database queries, business logic, and presentation markup into tightly coupled servers. As traffic scales, database locks cause checkout delays and cart abandonment. In contrast, custom commerce architectures decouple presentation from backend logic, enabling lightning-fast <Link to="/web-development" className="text-[#ccff00] hover:underline">modern web development</Link> and independent horizontal server scaling.
                </p>
                <div className="text-xs font-mono text-[#ccff00]">Outcome: Sub-second page performance &amp; zero plugin conflicts</div>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-[#ccff00]" /> API Middleware &amp; Enterprise Synchronization
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  A bespoke API integration layer serves as the central nervous system connecting digital storefronts to warehouse management systems (WMS), enterprise resource planning (ERP) databases, accounting tools, and carrier shipping APIs via secure, rate-limited REST and GraphQL endpoints.
                </p>
                <div className="text-xs font-mono text-[#ccff00]">Outcome: Real-time inventory reconciliation without manual data entry</div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Core Components of a Bespoke Commerce Platform</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-300 font-light">
                <div className="border-l-2 border-[#ccff00]/40 pl-4">
                  <strong className="text-white block mb-1">Presentation Layer:</strong> Responsive Next.js/React storefronts optimized for Core Web Vitals and organic search discoverability.
                </div>
                <div className="border-l-2 border-[#ccff00]/40 pl-4">
                  <strong className="text-white block mb-1">Transactional Database:</strong> Relational PostgreSQL clusters handling ACID-compliant order transactions and catalog indexes.
                </div>
                <div className="border-l-2 border-[#ccff00]/40 pl-4">
                  <strong className="text-white block mb-1">Cart State Engine:</strong> Redis in-memory caching ensuring persistent, instant cart updates across multiple customer devices.
                </div>
                <div className="border-l-2 border-[#ccff00]/40 pl-4">
                  <strong className="text-white block mb-1">Payment Tokenization:</strong> Direct payment rail integrations routing transactions securely while reducing PCI DSS scope.
                </div>
                <div className="border-l-2 border-[#ccff00]/40 pl-4">
                  <strong className="text-white block mb-1">Inventory Management:</strong> Multi-warehouse stock deduction with automated low-stock alerts and backorder handling.
                </div>
                <div className="border-l-2 border-[#ccff00]/40 pl-4">
                  <strong className="text-white block mb-1">Fulfillment Webhooks:</strong> Automated order status updates triggering carrier shipping labels and tracking notifications.
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4">
                <Link to="/custom-software" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                  Explore Custom Software Solutions <ChevronRight className="w-3 h-3" />
                </Link>
                <Link to="/about/our-company" className="text-xs font-mono uppercase text-gray-400 hover:text-white flex items-center gap-1 font-semibold">
                  Learn About Our Engineering Team <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Custom E-commerce Development Services */}
        <section id="custom-e-commerce-services" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ CORE ENGINEERING DISCIPLINES ]</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Custom E-commerce Development Services
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We engineer tailor-made commerce software platforms, responsive web applications, and mobile shopping solutions designed to deliver superior conversion rates and operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Web Storefronts</span>
                <h3 className="text-2xl font-bold mb-4 text-white">Custom E-commerce Web Development</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Engineering bespoke online retail storefronts utilizing Next.js, React, and TypeScript. We craft lightning-fast product catalogs, faceted attribute filters, seamless slide-out shopping carts, and single-page checkout funnels optimized for maximum search rankings and conversion rates.
                </p>
              </div>
              <Link to="/web-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Modern Web Development <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Commerce Engines</span>
                <h3 className="text-2xl font-bold mb-4 text-white">E-commerce Platform Development</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Architecting full-scale, proprietary digital commerce platforms capable of handling multi-store operations, complex category hierarchies, custom pricing algorithms, high-concurrency cart states, and centralized merchant management portals.
                </p>
              </div>
              <Link to="/custom-software" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Custom Software Architecture <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Decoupled Architecture</span>
                <h3 className="text-2xl font-bold mb-4 text-white">Headless E-commerce Development</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Decoupling the frontend presentation layer from the backend database via high-speed GraphQL and REST APIs. Connect headless CMS systems, mobile apps, and IoT devices to a unified commerce engine for unmatched page speed, flexibility, and omnichannel reach.
                </p>
              </div>
              <Link to="/custom-software" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Custom Backend Engineering <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 4 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Marketplaces</span>
                <h3 className="text-2xl font-bold mb-4 text-white">Multi-Vendor E-commerce Development</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Engineering scalable marketplace platforms with automated vendor onboarding, custom commission splits, merchant analytics portals, unified marketplace search, split escrow checkouts, and centralized administrative dispute mediation.
                </p>
              </div>
              <Link to="/custom-software" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Marketplace Platform Engineering <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 5 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Mobile Retail</span>
                <h3 className="text-2xl font-bold mb-4 text-white">E-commerce Mobile App Development</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Building native iOS, native Android, and cross-platform mobile shopping apps and marketplace mobile applications. Featuring personalized push notification campaigns, biometric authentication, Apple Pay and Google Pay integration, and offline product browsing.
                </p>
              </div>
              <Link to="/mobile-app-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Mobile Commerce Applications <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 6 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">AI Agents</span>
                <h3 className="text-2xl font-bold mb-4 text-white">E-commerce AI Agent Development</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Developing autonomous AI shopping assistants and conversational commerce agents. These intelligent agents assist shoppers with semantic product discovery, answer inventory inquiries, guide checkout decisions, and handle order status tracking autonomously.
                </p>
              </div>
              <Link to="/ai-agent-development" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                AI Agent Development <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 7 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Personalization</span>
                <h3 className="text-2xl font-bold mb-4 text-white">AI Product Recommendation Engine</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Building real-time dynamic recommendation engines powered by vector embeddings and customer behavioral telemetry. Deliver hyper-personalized product bundles, cross-sells, and upsells based on past purchases, browsing history, and semantic intent.
                </p>
              </div>
              <Link to="/solutions/ai-automation" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                AI Workflow Automation <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 8 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Support Automation</span>
                <h3 className="text-2xl font-bold mb-4 text-white">E-commerce AI Chatbot</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Deploying 24/7 intelligent customer support chatbots integrated with your order database and help desk. Resolve return requests, tracking queries, and sizing questions instantly while routing high-priority cases to human support staff.
                </p>
              </div>
              <Link to="/solutions/ai-automation" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Customer Support Automation <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>

            {/* Service 9 */}
            <motion.div 
              whileHover={{ y: -5 }} 
              className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-4 inline-block">Fintech Rails</span>
                <h3 className="text-2xl font-bold mb-4 text-white">Payment &amp; Checkout Integration</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Engineering secure, tokenized checkout funnels with multi-rail payment processors including Stripe, PayPal, Adyen, and Klarna. Minimize cart abandonment with 3D Secure 2.0 verification and automated recurring subscription billing.
                </p>
              </div>
              <Link to="/solutions/fintech" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                Fintech Infrastructure <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 3: E-commerce Solutions by Business Model */}
        <section id="solutions-by-business-model" className="py-20 md:py-28 bg-zinc-950/80 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ TAILORED ARCHITECTURES ]</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                E-commerce Solutions by Business Model
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Every business model demands a distinct software architecture. We tailor our engineering strategies to match your specific commercial operational requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Startups &amp; Emerging Brands</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  Startups require agile market entry, minimal infrastructure overhead, and an intuitive storefront that converts early visitors into loyal customers. We build lightweight, sub-second headless commerce solutions with complete intellectual property ownership.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; Next.js frontend with sub-second page loads</li>
                  <li>&bull; Streamlined Stripe and PayPal checkout flows</li>
                  <li>&bull; 100% full source code and data ownership</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Direct-to-Consumer (D2C) Brands</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  D2C brands need immersive visual storytelling, frictionless one-click checkouts, subscription billing, and personalized cross-sells. We engineer custom storefronts that elevate average order value (AOV) and customer lifetime value (LTV).
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; Dynamic bundle builders and subscription logic</li>
                  <li>&bull; Cart cross-sell and automated upsell prompts</li>
                  <li>&bull; Real-time customer event streaming to CDPs</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">B2B Wholesalers &amp; Distributors</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  Wholesale commerce involves tiered volume pricing, customer-specific contract terms, net-30 credit approvals, quote generation, and bulk order uploads. We build automated B2B portals that eliminate manual order entry.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; Corporate account hierarchies &amp; approval flows</li>
                  <li>&bull; Custom contracted wholesale pricing matrices</li>
                  <li>&bull; Bidirectional synchronization with backend ERPs</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Growing E-commerce Businesses</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  Growing brands outgrowing monolithic platforms like Shopify or WooCommerce face slow page loads and expensive plugin fees. We migrate growing retailers to high-speed headless architectures with automated operational workflows.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; Elimination of recurring plugin subscription fees</li>
                  <li>&bull; Multi-location warehouse inventory tracking</li>
                  <li>&bull; Automated email and SMS marketing pipelines</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Enterprise Organizations</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  Enterprise retail operations require high-concurrency cloud infrastructure, multi-region database clustering, strict role-based access control, and bidirectional integrations with SAP, Oracle NetSuite, and Microsoft Dynamics.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; High-throughput microservices architecture</li>
                  <li>&bull; Zero-downtime rolling deployments and failover</li>
                  <li>&bull; Enterprise SOC-aligned security and compliance</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Multi-Vendor Marketplaces</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  Marketplace operators need seamless vendor onboarding, automated commission splitting, multi-seller cart management, escrow payouts, and dispute resolution workflows that scale effortlessly with transaction volume.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; Automated merchant payout and tax reporting</li>
                  <li>&bull; Split fulfillment routing across sellers</li>
                  <li>&bull; Centralized platform moderation dashboards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: E-commerce Features We Build */}
        <section id="features-we-build" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ MODULAR PLATFORM CAPABILITIES ]</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              E-commerce Features We Build
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Every feature is engineered modularly with clean, performant code, ensuring rapid customer journeys and seamless transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#ccff00]" /> Product Catalog Management
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Dynamic multi-category taxonomy, variant matrixes (size, color, material), bundle configurations, digital download delivery, and automated SEO metadata generation.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#ccff00]" /> Faceted Search &amp; Filtering
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Sub-50ms search query response times, typo-tolerant indexing, dynamic price range sliders, multi-attribute filtering, and real-time stock status flags.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ccff00]" /> Customer Accounts &amp; Guest Checkout
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Passwordless magic link logins, OAuth social sign-in, self-service order history, saved addresses, wishlist curation, and frictionless guest checkouts.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#ccff00]" /> Cart State Management
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Persistent cross-device cart synchronization, slide-out drawer carts, free shipping progress bars, dynamic cross-sell recommendations, and abandoned cart recovery.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ccff00]" /> Frictionless Single-Page Checkout
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Streamlined one-page checkout workflows, Google Address autocomplete, tokenized payment fields, instant Apple Pay/Google Pay, and clear fee breakdowns.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#ccff00]" /> Multi-Rail Payment Processing
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Direct payment gateway routing (Stripe, PayPal, Adyen), Buy Now Pay Later (Klarna, Afterpay), cryptocurrency options, and automated fraud score evaluation.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#ccff00]" /> Order Management &amp; Tracking
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Automated order lifecycle state machines (pending, paid, fulfilled, refunded), real-time courier tracking pages, and automated transactional email alerts.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Repeat className="w-4 h-4 text-[#ccff00]" /> Multi-Location Inventory Sync
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Automated stock deduction across multiple fulfillment centers, low-stock threshold alerts, backorder allocation, and automated purchase order generation.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ccff00]" /> Carrier &amp; Shipping Integration
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Real-time shipping rate calculation from FedEx, UPS, DHL, and USPS, automated shipping label generation, split fulfillment, and customs document generation.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#ccff00]" /> Discount &amp; Promotion Engines
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Custom coupon rules, automatic cart discounts, tiered buy-one-get-one (BOGO) logic, customer group discounts, and time-limited flash sale countdowns.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#ccff00]" /> Verified Reviews &amp; Social Proof
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">User rating systems with verified buyer badges, customer photo/video uploads, Q&amp;A widgets, and rich snippet schema markup for Google Search results.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Store className="w-4 h-4 text-[#ccff00]" /> Vendor Management &amp; Payouts
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Self-service seller onboarding portals, automated vendor commission splitting, automated payout schedules, merchant analytics, and dispute mediation flows.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#ccff00]" /> Analytics &amp; Executive Dashboards
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Real-time sales velocity metrics, average order value (AOV) tracking, customer acquisition cost (CAC) analytics, cohort retention reports, and inventory turn analysis.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ccff00]" /> Real-Time Notifications
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Automated transactional email, SMS, and WhatsApp alerts for order confirmations, shipping tracking updates, back-in-stock alerts, and delivery notifications.</p>
            </div>
            <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-[#ccff00]" /> Merchant Admin Portals
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">Intuitive administrative dashboards with role-based staff permissions, bulk product updates, customer support lookup tools, and exportable financial audit logs.</p>
            </div>
          </div>
        </section>

        {/* Section 5: E-commerce Integrations */}
        <section id="e-commerce-integrations" className="py-20 md:py-28 bg-zinc-950/80 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ ECOSYSTEM CONNECTIVITY ]</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                E-commerce Integrations
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                A custom commerce platform connects seamlessly with your entire operational ecosystem, preventing manual data silos and maintaining flawless synchronization across departments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-2">PAYMENT GATEWAYS</span>
                <h3 className="text-base font-bold text-white mb-2">Payment Processors</h3>
                <p className="text-xs text-gray-400 font-light mb-4">Stripe, PayPal, Adyen, Apple Pay, Google Pay, Klarna, Afterpay, and direct ACH payment rails.</p>
                <Link to="/solutions/fintech" className="text-xs font-mono text-[#ccff00] hover:underline">Fintech infrastructure &rarr;</Link>
              </div>

              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-2">ERP &amp; ACCOUNTING</span>
                <h3 className="text-base font-bold text-white mb-2">Enterprise Back-Office</h3>
                <p className="text-xs text-gray-400 font-light mb-4">SAP, Oracle NetSuite, Microsoft Dynamics, Odoo, QuickBooks Online, Xero, and custom SQL databases.</p>
                <Link to="/custom-software" className="text-xs font-mono text-[#ccff00] hover:underline">Custom backend systems &rarr;</Link>
              </div>

              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-2">CRM &amp; MARKETING</span>
                <h3 className="text-base font-bold text-white mb-2">Customer Data Platforms</h3>
                <p className="text-xs text-gray-400 font-light mb-4">Salesforce, HubSpot, Klaviyo, Mailchimp, Segment, and real-time customer event streaming pipelines.</p>
                <Link to="/solutions/ai-automation" className="text-xs font-mono text-[#ccff00] hover:underline">Marketing automation &rarr;</Link>
              </div>

              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-2">SHIPPING &amp; 3PL</span>
                <h3 className="text-base font-bold text-white mb-2">Fulfillment Logistics</h3>
                <p className="text-xs text-gray-400 font-light mb-4">Shippo, EasyPost, ShipStation, FedEx, UPS, DHL Express, USPS, and automated 3PL warehouse webhooks.</p>
                <Link to="/contact" className="text-xs font-mono text-[#ccff00] hover:underline">Technical consultation &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: E-commerce Technology Stack */}
        <section id="technology-stack" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ MODERN ARCHITECTURE ]</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              E-commerce Technology Stack
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              There is no single "universally best" tech stack for all businesses; the optimal architecture depends entirely on your catalog scale, transactional concurrency, integration requirements, and internal development capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#ccff00]" /> Frontend Presentation Layer
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                We utilize <strong>Next.js</strong>, <strong>React</strong>, and <strong>TypeScript</strong> paired with <strong>Tailwind CSS</strong> to engineer responsive storefronts with sub-second page rendering, automatic static optimization, and superior Core Web Vitals.
              </p>
              <div className="text-xs font-mono text-[#ccff00]">Tech: Next.js, React 19, TypeScript, Tailwind CSS</div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#ccff00]" /> Backend Commerce &amp; APIs
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                High-throughput commerce engines built with <strong>Node.js</strong>, <strong>Go</strong>, or <strong>Python</strong> providing secure REST and GraphQL endpoints, rate-limited middleware, and asynchronous background worker queues.
              </p>
              <div className="text-xs font-mono text-[#ccff00]">Tech: Node.js, Express, Go, GraphQL, REST APIs</div>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-[#ccff00]" /> Databases &amp; Caching
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                Relational <strong>PostgreSQL</strong> clusters for ACID-compliant order transactions and catalog data, combined with in-memory <strong>Redis</strong> caching for instant cart states and global Edge CDN caching.
              </p>
              <div className="text-xs font-mono text-[#ccff00]">Tech: PostgreSQL, Redis, Edge CDN, Docker, AWS/GCP</div>
            </div>
          </div>
        </section>

        {/* Section 7: E-commerce Security */}
        <section id="security-and-compliance" className="py-20 md:py-28 bg-zinc-950/80 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ ENTERPRISE HARDENING ]</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                E-commerce Security &amp; Compliance Standards
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Protecting customer financial data and ensuring uninterrupted commercial availability requires multi-layered defense-in-depth engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#ccff00]" /> Payment Tokenization &amp; PCI DSS Scope Reduction
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  By utilizing client-side tokenized card vaults provided by certified payment processors like Stripe and Adyen, sensitive credit card numbers never touch or store on your application servers. This dramatically simplifies your PCI DSS compliance scope while protecting your business from data liability.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; End-to-end TLS 1.3 encryption in transit</li>
                  <li>&bull; AES-256 encryption for stored user records at rest</li>
                  <li>&bull; Tokenized card verification with 3D Secure 2.0</li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#ccff00]" /> Access Control &amp; Threat Mitigation
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                  We apply strict OWASP secure coding practices across every endpoint. Administrative portals are guarded with granular role-based access control (RBAC), multi-factor authentication (MFA), automated IP rate limiting, and immutable audit logs that record all administrative actions.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 font-mono">
                  <li>&bull; Multi-Factor Authentication (MFA) on merchant portals</li>
                  <li>&bull; Automated API rate limiting &amp; DDoS protection</li>
                  <li>&bull; Immutable audit logging for order adjustments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: AI in E-commerce */}
        <section id="ai-in-e-commerce" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ INTELLIGENT COMMERCE ]</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              AI in E-commerce
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Artificial intelligence transforms online retail from static catalogs into dynamic, personalized shopping experiences. Through our specialized <Link to="/solutions/ai-automation" className="text-[#ccff00] underline">AI automation solutions</Link> and <Link to="/ai-agent-development" className="text-[#ccff00] underline">AI agent development</Link>, we help digital brands automate operations and elevate customer lifetime value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#ccff00]" /> AI Shopping Assistants
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Autonomous conversational agents that assist buyers in discovering items, comparing product specifications, checking real-time stock, and completing checkouts.
              </p>
              <Link to="/ai-agent-development" className="text-xs font-mono text-[#ccff00] hover:underline">Explore AI agents &rarr;</Link>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#ccff00]" /> Semantic Vector Search
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Natural-language search engines that understand complex shopper intent (e.g., "breathable running shoes for marathon training") and match catalog items accurately.
              </p>
              <Link to="/solutions/ai-automation" className="text-xs font-mono text-[#ccff00] hover:underline">Vector search systems &rarr;</Link>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#ccff00]" /> Automated Catalog Enrichment
              </h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                Automate product categorization, generate descriptive SEO metadata, extract structured attributes from supplier PDFs, and optimize search tags at scale.
              </p>
              <Link to="/solutions/ai-automation" className="text-xs font-mono text-[#ccff00] hover:underline">Catalog automation &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Section 9: How to Build an E-commerce Platform (12 Steps) */}
        <section id="how-to-build-an-e-commerce-platform" className="py-20 md:py-28 bg-zinc-950/80 border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ 12-STEP METHODOLOGY ]</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                How to Build an E-commerce Platform
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                A structured, rigorous engineering lifecycle ensuring predictable delivery, zero data loss, and seamless transition to production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 01</span>
                <h3 className="text-base font-bold text-white mb-2">Business Discovery</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Analyze market dynamics, commercial business models, product catalog taxonomy, user personas, and core revenue objectives.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 02</span>
                <h3 className="text-base font-bold text-white mb-2">Commerce Workflow Analysis</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Map customer shopping journeys, multi-step checkout funnels, inventory allocation logic, payment routing pathways, and fulfillment rules.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 03</span>
                <h3 className="text-base font-bold text-white mb-2">Architecture Planning</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Define system architecture, select frontend and backend technologies, design relational database schemas, and establish API integration contracts.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 04</span>
                <h3 className="text-base font-bold text-white mb-2">UX/UI Design</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Create responsive, accessibility-tested digital storefront wireframes and interactive prototypes in Figma focusing on conversion rate optimization.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 05</span>
                <h3 className="text-base font-bold text-white mb-2">Frontend Development</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Build high-speed, SEO-friendly storefronts with Next.js, React, and Tailwind CSS delivering sub-second page loads and smooth mobile interactions.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 06</span>
                <h3 className="text-base font-bold text-white mb-2">Backend/API Development</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Engineer core commerce engines, catalog database queries, persistent shopping cart state machines, customer authentication, and merchant admin portals.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 07</span>
                <h3 className="text-base font-bold text-white mb-2">Payment &amp; ERP Integrations</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Connect payment gateways, shipping couriers, enterprise ERP backends (SAP, NetSuite), CRM pipelines, tax engines, and third-party webhooks.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 08</span>
                <h3 className="text-base font-bold text-white mb-2">Security Testing</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Conduct vulnerability scans, tokenized payment security verification, role-based access validation, and penetration tests to protect customer data.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 09</span>
                <h3 className="text-base font-bold text-white mb-2">Performance Testing</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Perform high-concurrency load testing, database query profiling, and caching stress tests to ensure system stability during peak flash-sale surges.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 10</span>
                <h3 className="text-base font-bold text-white mb-2">Deployment</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Deploy the commerce platform to scalable cloud infrastructure with global Edge CDN caching and automated CI/CD deployment pipelines.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 11</span>
                <h3 className="text-base font-bold text-white mb-2">Analytics &amp; Funnel Tracking</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Configure conversion tracking, sales velocity telemetry, customer lifetime value metrics, and error logging dashboards.</p>
              </div>
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-[#ccff00] block mb-1 font-bold">STEP 12</span>
                <h3 className="text-base font-bold text-white mb-2">Continuous Optimization</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">Provide 24/7 uptime monitoring, security patching, A/B testing on checkout flows, and continuous feature enhancements based on customer data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Pricing & Timelines */}
        <section id="pricing-and-timelines" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing */}
            <div className="p-8 bg-zinc-900/40 rounded-2xl border border-white/10">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ ESTIMATION GUIDELINES ]</span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#ccff00]" /> How Much Does E-commerce Software Development Cost?
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                E-commerce software development costs vary depending on architecture complexity, third-party integrations, catalog size, and custom functionality requirements:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm">Simple Custom Storefront</span>
                    <span className="text-[#ccff00] font-mono font-bold text-sm">$5,000+</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light">Custom headless storefront, Stripe/PayPal checkout, essential catalog taxonomy, and mobile optimization.</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm">Growing Business Platform</span>
                    <span className="text-[#ccff00] font-mono font-bold text-sm">$10,000 – $25,000+</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light">Multi-location inventory sync, subscription billing, custom promotion engines, and CRM integrations.</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm">Advanced Marketplace / B2B Platform</span>
                    <span className="text-[#ccff00] font-mono font-bold text-sm">$25,000 – $50,000+</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light">Multi-vendor split escrow, seller portals, B2B wholesale contracted pricing, and ERP synchronization.</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm">Enterprise Commerce Ecosystem</span>
                    <span className="text-[#ccff00] font-mono font-bold text-sm">$50,000+</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light">Multi-tier microservices, native mobile shopping apps, legacy ERP bridges (SAP/NetSuite), and AI shopping agents.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 italic font-light">
                Note: Figures represent realistic project estimation baselines. Exact project investment depends on specific scope, integrations, and architectural requirements.
              </p>
            </div>

            {/* Timelines */}
            <div className="p-8 bg-zinc-900/40 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ DELIVERY SCHEDULES ]</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#ccff00]" /> How Long Does It Take to Build an E-commerce Platform?
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                  Engineering timelines are dictated by workflow complexity, catalog volume, and API connection scope:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-sm">Basic Custom Storefront</span>
                      <span className="text-[#ccff00] font-mono font-bold text-sm">4 – 8 Weeks</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light">Discovery, UI design in Figma, Next.js storefront development, payment integration, and launch.</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-sm">Integrated Commerce Platform</span>
                      <span className="text-[#ccff00] font-mono font-bold text-sm">8 – 16 Weeks</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light">Full commerce engine, multi-warehouse sync, accounting and ERP connectors, and staging testing.</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-sm">Marketplace / Complex Platform</span>
                      <span className="text-[#ccff00] font-mono font-bold text-sm">12 – 24+ Weeks</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light">Multi-vendor onboarding, split payment processing, mobile shopping apps, security audits, and load testing.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link to="/contact" className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 font-semibold">
                  Request a Detailed Timeline &amp; Cost Estimation <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Frequently Asked Questions (10 FAQs) */}
        <section id="faqs" className="py-20 md:py-28 bg-zinc-950/80 border-t border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-2 font-bold">[ FREQUENTLY ASKED QUESTIONS ]</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-base md:text-lg">
                Direct, transparent technical answers to common questions about e-commerce software development, pricing, architectures, and security.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-base md:text-lg text-white">{faq.q}</span>
                    <div className={`p-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] transition-transform duration-200 ${activeFaq === index ? 'rotate-45' : ''}`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4 font-light">
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

        {/* Global Client Reach Marquee */}
        <CountryMarquee />

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.08),transparent_60%)] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Ready to Engineer Your High-Performance E-commerce Platform?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Consult directly with our technical commerce architects to design a bespoke e-commerce platform engineered for sub-second speeds, zero plugin fees, and seamless scale.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Schedule Technical Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/about/our-company" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                About AbuQitmirLabs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ECommerceDevelopmentPage;

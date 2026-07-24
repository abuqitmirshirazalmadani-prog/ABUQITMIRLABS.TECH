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
  Globe
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const FintechSolutionsPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is fintech software development?",
      a: "Fintech software development is the engineering of secure, compliant financial technologies including payment processing rails, digital banking applications, automated underwriting systems, trading platforms, and KYC/AML identity verification pipelines."
    },
    {
      q: "How long does it take to build a custom fintech platform?",
      a: "An MVP fintech application typically takes 8 to 12 weeks to design, engineer, and pass compliance audits. Enterprise-grade core banking platforms or custom payment gateways usually take 16 to 24 weeks depending on third-party banking API integrations."
    },
    {
      q: "What compliance and regulatory standards do you follow?",
      a: "We build all fintech architectures strictly adhering to PCI-DSS Level 1 compliance, SOC 2 Type II controls, GDPR, CCPA, ISO 27001, AML5/AML6 directives, and local financial authority guidelines (SEC, FCA, SBP)."
    },
    {
      q: "How much does custom fintech software development cost?",
      a: "Custom fintech solutions range from $15,000 for targeted modules (such as automated KYC pipelines or payment gateway connectors) to $60,000+ for end-to-end digital banking or lending ecosystems."
    },
    {
      q: "Can you integrate with legacy banking systems and core processors?",
      a: "Yes. We specialize in bridging modern GraphQL/REST microservices with legacy core banking systems (Fiserv, FIS, Jack Henry, Temenos) using secure middleware and ISO 20022 messaging standards."
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
    "name": "Fintech Software Development Solutions",
    "provider": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "url": "https://abuqitmirlabs.tech"
    },
    "description": "High-frequency, PCI-DSS compliant fintech software development services for digital banking, lending portals, payment gateways, and AI fraud detection.",
    "serviceType": "Fintech Software Engineering"
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Fintech Software Development — Custom Banking & Payment Solutions | AbuQitmirLabs</title>
        <meta name="description" content="Custom fintech software development solutions by AbuQitmirLabs. Build PCI-DSS compliant payment gateways, neobanks, lending portals, and AI fraud detection systems." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/solutions/fintech" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'Solutions', path: '/#services' },
            { label: 'Fintech Solutions', path: '/solutions/fintech' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Coins className="w-4 h-4" /> Financial Technology Engineering
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Fintech Software Development — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Custom Solutions for Financial Services</span>
            </h1>

            {/* Direct Answer Block for AEO/GEO */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> Custom fintech software development involves engineering secure, PCI-DSS compliant digital banking platforms, multi-currency payment gateways, automated lending engines, and AI-powered fraud prevention pipelines. AbuQitmirLabs builds zero-proprietary-lock-in fintech platforms serving 350+ global clients with 3x faster ROI.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Fintech software fails differently than generic consumer apps. A standard web bug produces a 404 page; a fintech engineering bug produces compliance violations, SEC reviews, and front-page news stories.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Request Fintech Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/custom-software" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Build Your Fintech Platform
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* The Fintech Challenge */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                The Financial Engineering Challenge
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Modern fintech platforms must balance zero-latency transaction speed with strict multi-jurisdictional compliance and impenetrable security matrices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Strict Compliance",
                  desc: "Navigating PCI-DSS Level 1, SOC 2, GDPR, and country-specific banking mandates without dragging user experience.",
                  icon: Scale
                },
                {
                  title: "Complex Rails",
                  desc: "Integrating legacy core banking systems, FedNow, SWIFT, SEPA, and instant settlement crypto bridges into cohesive APIs.",
                  icon: Building2
                },
                {
                  title: "Real-time Fraud",
                  desc: "Intercepting account takeover, synthetic identity fraud, and credit risk within sub-100 millisecond authorization windows.",
                  icon: ShieldCheck
                },
                {
                  title: "High Scalability",
                  desc: "Architecting double-entry ledger systems capable of handling 50,000+ concurrent transactions per second without lock contention.",
                  icon: TrendingUp
                }
              ].map((challenge, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] mb-6">
                    <challenge.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">{challenge.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{challenge.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Solutions Grid */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">End-To-End Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our Custom Fintech Solutions
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Engineered with microservices, event-driven ledgers, and zero-trust authentication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Payment Gateway Development",
                desc: "Custom multi-currency payment processing platforms with smart routing engines, automated chargeback resolution, and instant merchant settlements.",
                tag: "Processing Engine",
                icon: CreditCard
              },
              {
                title: "Digital Banking & Neobanks",
                desc: "Mobile-first digital banking suites complete with virtual cards, ACH transfers, budgeting tools, and real-time ledger accounting.",
                tag: "Core Banking",
                icon: Building2
              },
              {
                title: "Lending & Loan Servicing",
                desc: "Automated underwriting platforms leveraging alternative data sources, automated credit scoring, and automated servicing schedules.",
                tag: "Automated Credit",
                icon: FileText
              },
              {
                title: "KYC & AML Compliance Pipelines",
                desc: "Automated identity verification, facial liveness detection, PEP sanction screening, and continuous transaction monitoring.",
                tag: "Regulatory Tech",
                icon: ShieldCheck
              },
              {
                title: "Investment & Wealth Tech",
                desc: "Robo-advisory platforms, portfolio rebalancing algorithms, fractional stock trading engines, and real-time market telemetry feeds.",
                tag: "Wealth Systems",
                icon: Coins
              },
              {
                title: "AI-Powered Fraud Prevention",
                desc: "Deploying machine learning models for anomaly detection, real-time risk scoring, and zero-day fraud vector mitigation.",
                tag: "AI Security",
                icon: Cpu,
                linkText: "AI-powered fraud detection",
                linkPath: "/ai-agent-development"
              }
            ].map((sol, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                      {sol.tag}
                    </span>
                    <sol.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">{sol.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{sol.desc}</p>
                </div>
                {sol.linkPath ? (
                  <Link to={sol.linkPath} className="text-xs font-mono uppercase text-[#ccff00] hover:underline flex items-center gap-1 mt-4 font-semibold">
                    {sol.linkText} <ChevronRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <Link to="/custom-software" className="text-xs font-mono uppercase text-blue-400 hover:text-white flex items-center gap-1 mt-4 transition-colors font-semibold">
                    Build your fintech platform <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Internal Link Strategy Callout Banner */}
        <section className="py-12 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Cross-Disciplinary Technology</span>
              <h3 className="text-2xl md:text-3xl font-extrabold mt-2">Looking to automate loan processing with autonomous AI agents?</h3>
              <p className="text-gray-400 text-sm mt-1">Explore our custom intelligent agents or build your bespoke financial architecture with our core teams.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link to="/custom-software" className="px-6 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#ccff00] transition-all">
                Build your fintech platform
              </Link>
              <Link to="/ai-agent-development" className="px-6 py-3 border border-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all">
                AI-powered fraud detection
              </Link>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">High-Speed Stack</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Fintech Technology Stack</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: "Frontend", techs: "React, Next.js, React Native, Angular" },
                { category: "Backend Rails", techs: "Node.js, Go, Python, Java Spring Boot" },
                { category: "Databases & Ledgers", techs: "PostgreSQL, TimescaleDB, Redis, DynamoDB" },
                { category: "Cloud & Compliance", techs: "AWS Financial Services, Azure Gov, Cloudflare" }
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
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Proven Track Record</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Fintech Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Payment Processing Platform",
                metric: "50,000+ Active Users",
                detail: "Engineered a multi-currency payment gateway handling $40M monthly volume with sub-150ms processing latency and zero security breaches."
              },
              {
                title: "Automated Lending Underwriting Engine",
                metric: "$100M+ Processed",
                detail: "Built an AI-driven loan decisioning engine reducing underwriting approval time from 48 hours to under 3 minutes while cutting default rates by 22%."
              },
              {
                title: "Next-Gen Neobank Launch",
                metric: "Launched in 90 Days",
                detail: "Delivered a complete digital banking web and mobile app suite with virtual card issuing, automated budgeting, and biometric authentication."
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
              Ready to Build Your Fintech Platform?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule a technical briefing with our chief fintech architect to discuss compliance, system architecture, and project timelines.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Book Free Technical Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FintechSolutionsPage;

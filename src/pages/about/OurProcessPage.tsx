import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Cpu,
  RefreshCw,
  Workflow
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const OurProcessPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We dissect your business goals, target user personas, technical constraints, and competitive landscapes to blueprint an unambiguous product roadmap.",
      icon: Search,
      details: ["Requirements gathering & scoping", "Competitor & keyword research", "Security & compliance roadmap", "Architecture feasibility report"]
    },
    {
      num: "02",
      title: "Architecture & Design",
      desc: "Our lead architects map microservice data flows while our visual designers build interactive, high-contrast UI/UX prototypes.",
      icon: Layers,
      details: ["Database schema & ERD design", "Interactive Figma prototypes", "API contract definitions", "Design system establishment"]
    },
    {
      num: "03",
      title: "Development & Engineering",
      desc: "We write clean, typed, modular code in 1-week agile sprints with continuous integration, unit testing, and live preview links.",
      icon: Code2,
      details: ["Weekly production preview demos", "Clean TypeScript & Node/Go code", "Real-time Slack/WhatsApp sync", "Strict version control discipline"]
    },
    {
      num: "04",
      title: "Testing & Quality Assurance",
      desc: "Rigorous automated unit testing, end-to-end Cypress workflows, security penetration audits, and load stress testing.",
      icon: ShieldCheck,
      details: ["Automated regression suites", "Penetration & vulnerability scans", "Cross-browser mobile testing", "WCAG accessibility auditing"]
    },
    {
      num: "05",
      title: "Deployment & Launch",
      desc: "Executing zero-downtime blue/green cloud deployments, setting up CDN edge caches, and configuring real-time telemetry analytics.",
      icon: Rocket,
      details: ["Zero-downtime cloud migration", "CDN edge cache warming", "Core Web Vitals tuning", "Production launch monitoring"]
    },
    {
      num: "06",
      title: "Ongoing Support & Scale",
      desc: "Proactive server monitoring, automated security patching, performance optimization, and iterative feature expansion.",
      icon: RefreshCw,
      details: ["24/7 uptime monitoring", "SLA security maintenance", "Iterative feature additions", "Database indexing & scaling"]
    }
  ];

  const faqs = [
    {
      q: "How long does your typical software development process take?",
      a: "Depending on scope, MVP web applications take 6 to 10 weeks, while enterprise multi-module platforms or AI pipelines take 12 to 20 weeks from initial discovery to production launch."
    },
    {
      q: "How involved will I be in the development process?",
      a: "You will have full visibility into our weekly sprint demos, direct access to developers on Slack/WhatsApp, and live staging URLs updated every Friday."
    },
    {
      q: "Do you follow Agile sprint methodology?",
      a: "Yes. We operate in 1-week or 2-week Agile sprints with clear backlog prioritization, sprint planning, and weekly deliverable demos."
    },
    {
      q: "What happens after our application goes live?",
      a: "We provide 30 days of post-launch hypercare support included in every contract, along with optional ongoing SLA maintenance agreements for continuous updates and cloud scaling."
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

  const processSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Software Engineering Process at AbuQitmirLabs",
    "description": "Six-step agile software engineering process from discovery and architecture to development, testing, launch, and scaling.",
    "step": steps.map(s => ({
      "@type": "HowToStep",
      "name": s.title,
      "text": s.desc
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Our Process — Agile Software Engineering & Delivery | AbuQitmirLabs</title>
        <meta name="description" content="Discover our 6-step agile software engineering process at AbuQitmirLabs .TECH. From technical discovery to architecture, 1-week sprints, QA testing, and launch." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/about/our-process" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(processSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'About Us', path: '/about' },
            { label: 'Our Process', path: '/about/our-process' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Workflow className="w-4 h-4" /> Agile Engineering Lifecycle
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Our Process — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">How We Build Digital Excellence</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> AbuQitmirLabs .TECH follows a disciplined 6-step software engineering process: Discovery & Strategy, System Architecture & Design, Agile Sprint Development, Automated QA Testing, Zero-Downtime Launch, and Ongoing Maintenance. This structured process guarantees sub-second page performance, 3x faster ROI, and zero project delays.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              We eliminate technical uncertainty through clear architectural planning, weekly production demos, and mathematical quality controls.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Start Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Step-by-step Process */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Execution Blueprint</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              The 6-Step Engineering Method
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Structured discipline delivering predictable results for over 410+ projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
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
                    <span className="text-3xl font-extrabold text-[#ccff00] font-mono">{step.num}</span>
                    <step.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{step.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Our Process Works */}
        <section className="py-20 md:py-28 bg-zinc-950/80 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Competitive Advantage</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                  Why Our Process Guarantees 3x Faster ROI
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6 font-light">
                  Most agency projects stall due to bloated scope, vague specifications, and poor communication. Our methodology eliminates these friction points through centralized architect controls and direct weekly deliverables.
                </p>
                <div className="space-y-4">
                  {[
                    "Zero scope creep through upfront technical mapping",
                    "Weekly working staging builds you can test on live devices",
                    "Sub-second Web Vitals performance built into early code",
                    "98% client retention rate across 350+ worldwide accounts"
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
                      </div>
                      <span className="text-gray-300 text-sm font-mono">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 text-center">
                <span className="text-5xl font-extrabold text-[#ccff00] font-mono block mb-2">98%</span>
                <span className="text-white text-lg font-bold block mb-4">Client Satisfaction & Retention</span>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Our structured process ensures predictable timelines, clear communication, and production software that scales cleanly from day one.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#ccff00] hover:underline">
                  Initiate a Project Review <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-zinc-950/90">
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
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Schedule an architecture call with our lead team to convert your product ideas into a structured project blueprint.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Request Free Discovery Call <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurProcessPage;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Code2, 
  Bot, 
  Palette, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Heart, 
  Zap,
  Award,
  Send,
  ExternalLink
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const CareersPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const openPositions = [
    {
      title: "Senior Full-Stack Architect",
      dept: "Engineering",
      location: "Karachi, Pakistan (On-site / Hybrid)",
      type: "Full-Time",
      desc: "Lead backend and frontend architecture for international client applications utilizing React, Next.js, Node.js, Go, and PostgreSQL.",
      requirements: ["5+ years full-stack engineering experience", "Deep mastery of TypeScript, Node.js, and React/Next.js", "Experience with microservices & database performance tuning", "Passion for sub-second page performance"]
    },
    {
      title: "AI & RAG Systems Engineer",
      dept: "Artificial Intelligence",
      location: "Karachi, Pakistan (On-site / Hybrid)",
      type: "Full-Time",
      desc: "Engineer autonomous AI agents, multi-agent frameworks, vector search indexing (Pinecone/Weaviate), and LLM fine-tuning pipelines.",
      requirements: ["3+ years Python & ML engineering background", "Hands-on experience with LangChain, LlamaIndex, and OpenAI/Gemini APIs", "Knowledge of vector databases and embedding models", "Strong understanding of API design and security"]
    },
    {
      title: "UI/UX & Motion Designer",
      dept: "Design Studio",
      location: "Karachi, Pakistan (On-site / Hybrid)",
      type: "Full-Time",
      desc: "Design high-contrast, brutalist digital interfaces, design systems, and responsive motion animations using Figma and Tailwind CSS.",
      requirements: ["3+ years UI/UX design experience for web & mobile", "Strong portfolio showcasing interactive web prototypes", "Deep understanding of typography, grid systems, and dark-mode optics", "Familiarity with Tailwind CSS and Framer Motion"]
    },
    {
      title: "Technical SEO & AEO Strategist",
      dept: "Growth & Search",
      location: "Karachi, Pakistan (On-site / Hybrid)",
      type: "Full-Time",
      desc: "Drive Generative Engine Optimization (GEO), AI Optimization (AIO), schema JSON-LD structuring, and international search growth.",
      requirements: ["3+ years technical SEO and content optimization experience", "Proficiency in Core Web Vitals tuning and structured data", "Familiarity with Google AI Overviews and answer engine optimization", "Data-driven analytical mindset"]
    }
  ];

  const faqs = [
    {
      q: "Where is the AbuQitmirLabs office located?",
      a: "Our core engineering studio is located at R-10, Block 16, F.B. Area, Karachi, Pakistan (75950)."
    },
    {
      q: "What is the hiring process like?",
      a: "Our process consists of 3 stages: 1) Initial application and portfolio review, 2) Technical interview & practical coding benchmark, 3) Culture fit call with Founder Abu Qitmir."
    },
    {
      q: "Do you offer remote or hybrid work options?",
      a: "Yes. While our primary hub is in Karachi for co-located collaboration, we offer flexible hybrid working arrangements for senior engineering roles."
    },
    {
      q: "How do I apply for an open position?",
      a: "You can apply directly by emailing your CV, GitHub profile, or design portfolio to info@abuqitmirlabs.tech or contacting us on WhatsApp at +92 323 3260859."
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

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Careers at AbuQitmirLabs | Join Our In-House Studio | AbuQitmirLabs</title>
        <meta name="description" content="Join AbuQitmirLabs — we're hiring senior full-stack architects, AI/RAG engineers, UI/UX designers, and SEO strategists in Karachi. Build global software that matters." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/about/careers" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Careers at AbuQitmirLabs | Join Our In-House Studio | AbuQitmirLabs" />
        <meta property="og:description" content="Join AbuQitmirLabs — we're hiring senior full-stack architects, AI/RAG engineers, UI/UX designers, and SEO strategists in Karachi. Build global software that matters." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/about/careers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at AbuQitmirLabs | Join Our In-House Studio | AbuQitmirLabs" />
        <meta name="twitter:description" content="Join AbuQitmirLabs — we're hiring senior full-stack architects, AI/RAG engineers, UI/UX designers, and SEO strategists in Karachi. Build global software that matters." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'About Us', path: '/about' },
            { label: 'Careers', path: '/about/careers' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Briefcase className="w-4 h-4" /> Join Our Studio Collective
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Careers at AbuQitmirLabs — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">Build Software That Matters</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> AbuQitmirLabs .TECH is actively seeking senior full-stack architects, AI & RAG engineers, UI/UX motion designers, and technical SEO strategists to join our in-house collective in Karachi, Pakistan. We build high-speed, custom software solutions for international clients across the US, UK, Canada, Australia, and Europe.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              We don't build generic template websites or manage boring maintenance code. We craft bespoke, high-frequency digital platforms that shape industries.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a 
                href="#positions" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                View Open Positions <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Culture & Perks */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Why Work With Us</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                Engineered for High Performers
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                An environment designed to foster deep work, continuous learning, and direct impact on real global products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Competitive Compensation",
                  desc: "Top-market salary structures in Karachi, performance bonuses, and quarterly profit-sharing rewards.",
                  icon: Award
                },
                {
                  title: "Modern Tech Stack",
                  desc: "Work on Next.js 15, Python AI RAG engines, Tailwind CSS, TypeScript, and high-performance serverless clouds.",
                  icon: Code2
                },
                {
                  title: "Direct Mentorship",
                  desc: "Collaborate directly with Founder & Lead Architect Abu Qitmir and senior systems engineers on every build.",
                  icon: Zap
                },
                {
                  title: "Zero Freelancer Bloat",
                  desc: "A tight-knit, highly disciplined team where every member's contribution directly shapes client outcomes.",
                  icon: Heart
                }
              ].map((perk, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-[#ccff00]/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)] transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] group-hover:scale-110 group-hover:bg-[#ccff00] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.2)] mb-6">
                    <perk.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ccff00] transition-colors">{perk.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions List */}
        <section id="positions" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Active Hiring</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Current Opportunities</h2>
          </div>

          <div className="space-y-6">
            {openPositions.map((pos, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20">
                        {pos.dept}
                      </span>
                      <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#ccff00]" /> {pos.location}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold">{pos.title}</h3>
                  </div>
                  <a 
                    href={`mailto:info@abuqitmirlabs.tech?subject=Application for ${encodeURIComponent(pos.title)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-all self-start lg:self-center shrink-0"
                  >
                    Apply Now <Send className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{pos.desc}</p>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-mono uppercase text-[#ccff00] block mb-3">Key Qualifications:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pos.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
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

        {/* Application CTA */}
        <section className="py-20 md:py-28 text-center bg-gradient-to-b from-zinc-900 to-black border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Don't See Your Exact Role?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              We are always open to exceptional engineers and creative minds. Send us an open application with your GitHub or portfolio.
            </p>
            <a 
              href="mailto:info@abuqitmirlabs.tech?subject=General Career Application" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Send Open Application <Send className="w-5 h-5" />
            </a>

            {/* Related Services & Company Hub Internal Links */}
            <div className="mt-20 pt-12 border-t border-white/10 space-y-8 text-left max-w-7xl mx-auto">
              <div>
                <h4 className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold mb-4">// EXPLORE STUDIO SERVICES & COMPANY HUB</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <Link to="/about/our-company" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Our Company</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/about/our-team" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Our Team</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/about/our-process" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Engineering Process</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/custom-software" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Custom Software</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/web-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Web Development</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/mobile-app-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Mobile Apps</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/ai-agent-development" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>AI Agent Systems</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/seo-mastery" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>SEO Mastery</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/case-studies" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Case Studies</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/blog" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Tech Journal</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/website-contract" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Contract Template</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                  <Link to="/contact" className="p-3 bg-[#0b0b0b] hover:bg-white/5 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                    <span>Get In Touch</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                  </Link>
                </div>
              </div>

              {/* External Stack & Developer Ecosystem Links */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
                <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Core Stack & Developer Ecosystem:</span>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                    Next.js React Framework <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a href="https://www.langchain.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                    LangChain AI Framework <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                    Tailwind CSS <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                    GitHub Platform <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;

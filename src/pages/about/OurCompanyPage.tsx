import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Award, 
  Globe, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  ChevronRight, 
  Users, 
  Target, 
  Heart, 
  Sparkles,
  MapPin,
  GraduationCap
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import CountryMarquee from '../../components/CountryMarquee';

const OurCompanyPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is AbuQitmirLabs .TECH?",
      a: "AbuQitmirLabs .TECH is a high-performance software boutique and digital strategy firm headquartered in Karachi, Pakistan. We specialize in custom software engineering, mobile app development, high-speed web platforms, AI agent pipelines, and technical SEO for international clients."
    },
    {
      q: "Where is AbuQitmirLabs located?",
      a: "Our central engineering studio is located at R-10, Block 16, F.B. Area, Karachi, Pakistan (75950). From this hub, we manage full-cycle digital delivery for clients across the US, UK, Canada, Australia, Poland, and Europe."
    },
    {
      q: "How many projects has AbuQitmirLabs completed?",
      a: "Since founding in 2021, we have successfully delivered 410+ custom software and digital strategy projects for over 350 satisfied enterprise and mid-market clients worldwide."
    },
    {
      q: "What industries do you specialize in?",
      a: "We build tailored software solutions across Fintech & Banking, Healthcare & MedTech, AI & Automation, E-Commerce, EdTech & LMS, Logistics, and Real Estate."
    },
    {
      q: "Do you outsource any software engineering work?",
      a: "No. 100% of our code, system architecture, design systems, and SEO strategies are produced internally by our in-house collective of senior software architects, systems engineers, and designers in Karachi."
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

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Our Company — AbuQitmirLabs .TECH",
    "mainEntity": {
      "@type": "Organization",
      "name": "AbuQitmirLabs .TECH",
      "url": "https://abuqitmirlabs.tech",
      "founder": {
        "@type": "Person",
        "name": "Abu Qitmir Mohammad Shiraz Al-Madani",
        "jobTitle": "Founder & Lead Systems Architect",
        "alumniOf": "University of Karachi"
      },
      "foundingDate": "2021",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "R-10, Block 16, F.B. Area",
        "addressLocality": "Karachi",
        "addressCountry": "Pakistan",
        "postalCode": "75950"
      },
      "description": "Bespoke software engineering boutique specializing in low-latency custom software, mobile apps, AI agent platforms, and international technical SEO."
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ccff00] selection:text-black font-sans">
      <Helmet>
        <title>Our Company — AbuQitmirLabs .TECH | Custom Software Boutique</title>
        <meta name="description" content="Discover AbuQitmirLabs .TECH. Founded in Karachi in 2021 by Abu Qitmir Mohammad Shiraz Al-Madani. 410+ projects, 350+ clients, bespoke software & AI engineering." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/about/our-company" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32">
        {/* Breadcrumb Section */}
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: 'About Us', path: '/about' },
            { label: 'Our Company', path: '/about/our-company' }
          ]} />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ccff00] text-xs font-mono uppercase tracking-widest mb-8">
              <Building2 className="w-4 h-4" /> Company Overview
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-5xl">
              Our Company — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#88a800]">AbuQitmirLabs .TECH</span>
            </h1>

            {/* Direct Answer Block */}
            <div className="bg-zinc-900/90 border-l-4 border-[#ccff00] p-6 rounded-r-2xl max-w-4xl mb-12 shadow-2xl backdrop-blur-md">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-mono">
                <strong className="text-[#ccff00]">Direct Answer:</strong> AbuQitmirLabs .TECH is a premium software boutique and digital strategy firm founded in Karachi, Pakistan in 2021 by Abu Qitmir Mohammad Shiraz Al-Madani (M.B.A. Commerce, 2010). Having completed 410+ custom software, web app, and AI projects for 350+ global clients across the US, UK, Canada, Australia, and Europe, AbuQitmirLabs delivers 3x faster ROI with zero proprietary lock-in.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-light">
              Generic templates are strictly forbidden. We engineer bespoke, lightning-fast digital pipelines configured to convert international leads into permanent digital brand loyalty.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12 border-y border-white/10 py-8">
              {[
                { label: "Projects Completed", value: "410+" },
                { label: "Global Clients", value: "350+" },
                { label: "Average Client ROI", value: "3x Faster" },
                { label: "In-House Talent", value: "100%" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <span className="text-3xl md:text-5xl font-extrabold text-[#ccff00] block mb-1 font-mono">{stat.value}</span>
                  <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-[#ccff00] text-black font-extrabold rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                Start a Conversation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/about/our-team" 
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm uppercase tracking-wider"
              >
                Meet Our Leadership Team
              </Link>
            </div>
          </div>
        </section>

        <CountryMarquee />

        {/* Our Origin & Story */}
        <section className="py-20 md:py-28 bg-zinc-950/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Our Origin</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
                  From Karachi Studio to Global Delivery
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6 font-light">
                  AbuQitmirLabs .TECH was established in 2021 by <strong>Abu Qitmir Mohammad Shiraz Al-Madani</strong>. Holding an M.B.A. in Commerce from the University of Karachi (2010), Abu Qitmir recognized a critical flaw in the global software industry: agency bloat, copy-pasted WordPress templates, and hidden third-party lock-ins.
                </p>
                <p className="text-gray-400 text-base leading-relaxed mb-6 font-light">
                  We set out to build an elite, highly disciplined software boutique in Karachi operating on strict architectural principles: sub-second response times, zero unnecessary code bloat, impenetrable security matrices, and multi-market search optimization.
                </p>
                <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10">
                  <p className="text-sm font-mono text-[#ccff00] italic">
                    "Our mantra is uncompromising: Software must solve real business problems with mathematical speed and visual elegance."
                  </p>
                  <p className="text-xs text-gray-400 mt-3 font-mono">
                    — Abu Qitmir Mohammad Shiraz Al-Madani, Founder & Lead Architect
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">Central Studio Headquarters</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    R-10, Block 16, Federal B Area, Karachi, Pakistan (Postal Code 75950). Fully equipped dev labs and high-speed cloud testing environments.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">Global Market Reach</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    Active delivery pipelines serving enterprise and mid-market clients across the United States, United Kingdom, Canada, Australia, Poland, and Europe.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative overflow-hidden p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] mb-4">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">Certifications & Credentials</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    DigiSkills Certified (2021–2025), IDM Pakistan Certified, M.B.A. Commerce (University of Karachi, 2010), Clutch & GoodFirms Recognized.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Core Values */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest">Guiding Principles</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 mb-6">
              Our Mission & Core Values
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Built on transparency, architectural rigor, and customer longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Engineering Excellence",
                desc: "Every line of code is clean, typed, modular, and optimized for maximum speed and sub-second load times.",
                icon: Rocket
              },
              {
                title: "Client-First Transparency",
                desc: "Clear milestone pricing, daily/weekly sprint updates, and direct developer access without agency gatekeepers.",
                icon: Target
              },
              {
                title: "Zero Proprietary Lock-In",
                desc: "You own 100% of your source code, deployment scripts, database schemas, and intellectual property.",
                icon: ShieldCheck
              },
              {
                title: "In-House Studio Model",
                desc: "No outsourced freelancers or low-quality offshore handoffs. 100% internal talent in Karachi.",
                icon: Users
              }
            ].map((v, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#ccff00] transition-all group">
                <v.icon className="w-10 h-10 text-[#ccff00] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
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
              Ready to Build Something Great?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Connect directly with our founding architect and senior engineers in Karachi for a technical project briefing.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(204,255,0,0.4)]"
            >
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OurCompanyPage;

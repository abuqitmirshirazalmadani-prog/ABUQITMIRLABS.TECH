import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, ShieldCheck, Scale, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const TermsPage = () => {
  return (
    <div className="bg-[#050505] text-zinc-400 min-h-screen font-sans selection:bg-white/10 selection:text-white">
      <Helmet>
        <title>Terms of Service | Client Agreement & IP Policy | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs terms of service: agreement, IP, payment terms, and liability. Learn about client responsibilities and termination protocols for our software services." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/terms" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | Client Agreement & IP Policy | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs terms of service: agreement, IP, payment terms, and liability. Learn about client responsibilities and termination protocols for our software services." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service | Client Agreement & IP Policy | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs terms of service: agreement, IP, payment terms, and liability. Learn about client responsibilities and termination protocols for our software services." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />
      </Helmet>

      <Header />
      <Breadcrumbs />

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/5 p-10 md:p-16 rounded-[3rem] shadow-2xl"
        >
          <div className="flex items-center gap-3 text-[#ccff00] font-mono text-xs uppercase tracking-[0.3em] mb-4">
            <Scale className="w-4 h-4" />
            <span>Legal Governance & Service Agreement</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12 leading-none">
            Terms of <br />
            <span className="text-zinc-600">Service.</span>
          </h1>

          <div className="space-y-12 text-lg leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">1. Agreement to Terms</h2>
              <p>
                By accessing or using the engineering services provided by AbuQitmirLabs ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our platforms or commission custom engineering work. Learn more about <Link to="/about/our-company" className="text-[#ccff00] hover:underline font-normal">our company history</Link> and <Link to="/about/our-process" className="text-[#ccff00] hover:underline font-normal">agile software process</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">2. Services Scope</h2>
              <p>
                AbuQitmirLabs delivers enterprise-grade software solutions including <Link to="/custom-software" className="text-[#ccff00] hover:underline font-normal">custom software development</Link>, <Link to="/web-development" className="text-[#ccff00] hover:underline font-normal">web application engineering</Link>, <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline font-normal">mobile app development</Link>, <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-normal">autonomous AI agents</Link>, and <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-normal">technical SEO optimization</Link>. Detailed deliverables for each client engagement are defined in a mutually executed Statement of Work (SOW).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">3. Intellectual Property Rights</h2>
              <p>
                Unless explicitly agreed otherwise in writing, all bespoke source code, UI designs, and database schemas developed specifically for a client become the full intellectual property of the client upon complete fee settlement. AbuQitmirLabs retains rights to core boilerplate architecture, open-source modules, and general software utilities developed prior to or during the engagement.
              </p>
              <div className="mt-4 p-4 bg-zinc-950/80 border border-white/10 rounded-xl space-y-2 text-sm font-mono text-gray-300">
                <div className="flex items-center justify-between">
                  <span>World Intellectual Property Organization (WIPO) Standards</span>
                  <a href="https://www.wipo.int/about-ip/en/" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] hover:underline inline-flex items-center gap-1">
                    WIPO Framework <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span>Open Source Licensing Principles (OSI)</span>
                  <a href="https://opensource.org/" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] hover:underline inline-flex items-center gap-1">
                    OSI Guidelines <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">4. Client Responsibilities & Asset Protection</h2>
              <p>
                Clients are responsible for providing clear business requirements, timely feedback during sprint reviews, and required credentials for deployment environments. You can inspect our free <Link to="/website-contract" className="text-[#ccff00] hover:underline font-normal">Website Contract Template & SLA</Link> for standard domain ownership protection and exit terms. Explore our real-world execution in our <Link to="/case-studies" className="text-[#ccff00] hover:underline font-normal">engineering case studies</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">5. Payment Schedules & Milestones</h2>
              <p>
                Engineering sprints are typically initiated upon receipt of the initial milestone deposit. Final deployment or repository access is handed over upon complete settlement of invoices. Payments are non-refundable once engineering sprints have commenced and resources have been committed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">6. Limitation of Liability & Third-Party Services</h2>
              <p>
                AbuQitmirLabs is not liable for indirect, incidental, or consequential damages resulting from platform downtime or third-party API changes. We adhere to strict data privacy protocols detailed in our <Link to="/privacy" className="text-[#ccff00] hover:underline font-normal">Privacy Policy</Link>. Read tech insights on our <Link to="/blog" className="text-[#ccff00] hover:underline font-normal">Tech Journal</Link> regarding resilient architecture.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">7. Termination Protocols & Contact</h2>
              <p>
                Either party may terminate an engagement if the other breaches a material condition of the contract. Unused deposit balances for uninitiated sprints will be handled according to the governing SOW. For legal inquiries or contract clarifications, please <Link to="/contact" className="text-[#ccff00] hover:underline font-normal">contact our legal desk</Link>.
              </p>
            </section>

            <section className="pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm font-mono text-zinc-500">
              <span className="uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                Last Modified: August 2026 // Version 1.3 Active
              </span>
              <Link to="/contact" className="text-[#ccff00] hover:underline">
                Contact Legal Desk →
              </Link>
            </section>
          </div>
        </motion.div>

        {/* Related Studio Services & Internal Navigation Hub */}
        <section className="p-8 bg-zinc-950 border border-white/10 rounded-3xl">
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs text-[#ccff00] mb-4 tracking-[0.4em] uppercase">// EXPLORE STUDIO CAPABILITIES & HUB</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Studio Home</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/about/our-company" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Our Company</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/about/our-team" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Our Team</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/about/our-process" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Engineering Process</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/about/careers" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Careers & Roles</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/custom-software" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/blog" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Tech Journal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/privacy" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Privacy Policy</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/website-contract" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Website Contract SLA</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/contact" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between col-span-2 sm:col-span-1">
                  <span>Contact Us</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
              </div>
            </div>

            {/* External Governance & Verification References */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <span className="uppercase tracking-widest text-[11px] font-bold text-gray-300">Legal Governance & References:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://www.wipo.int/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                  WIPO Portal <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://opensource.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                  Open Source Initiative <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://clutch.co/profile/abuqitmirlabstech" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                  Clutch Verified <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.goodfirms.co/company/abuqitmirlabs-tech" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                  GoodFirms Profile <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, ShieldCheck, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPage = () => {
  return (
    <div className="bg-[#050505] text-zinc-400 min-h-screen font-sans selection:bg-white/10 selection:text-white">
      <Helmet>
        <title>Privacy Policy | Data Protection & Compliance | AbuQitmirLabs</title>
        <meta name="description" content="AbuQitmirLabs privacy policy: how we collect, use, and protect your data. Learn about our security measures, cookie use, and GDPR/APP compliance." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/privacy" />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | Data Protection & Compliance | AbuQitmirLabs" />
        <meta property="og:description" content="AbuQitmirLabs privacy policy: how we collect, use, and protect your data. Learn about our security measures, cookie use, and GDPR/APP compliance." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Data Protection & Compliance | AbuQitmirLabs" />
        <meta name="twitter:description" content="AbuQitmirLabs privacy policy: how we collect, use, and protect your data. Learn about our security measures, cookie use, and GDPR/APP compliance." />
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
            <Lock className="w-4 h-4" />
            <span>Data Protection Framework</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12 leading-none">
            Privacy <br />
            <span className="text-zinc-600">Policy.</span>
          </h1>

          <div className="space-y-12 text-lg leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">1. Information Collection</h2>
              <p>
                We collect information that you provide directly to us through contact forms, WhatsApp communications, and email inquiries. This may include your name, email address, phone number, and project details. We also collect non-identifiable technical data through cookies to improve our website performance. Learn more about <Link to="/about/our-company" className="text-[#ccff00] hover:underline font-normal">our company standards</Link> and <Link to="/about/our-process" className="text-[#ccff00] hover:underline font-normal">engineering workflows</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">2. Use of Information</h2>
              <p>
                The information we collect is used strictly to:
              </p>
              <ul className="list-disc pl-8 mt-4 space-y-3">
                <li>Communicate with you regarding project inquiries and architecture planning.</li>
                <li>Deliver and customize our <Link to="/custom-software" className="text-[#ccff00] hover:underline font-normal">custom software development</Link>, <Link to="/web-development" className="text-[#ccff00] hover:underline font-normal">web development</Link>, <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline font-normal">mobile apps</Link>, and <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-normal">AI agent deployment</Link> services.</li>
                <li>Provide technical support, SLA maintenance, and security updates.</li>
                <li>Improve our localized <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-normal">SEO strategies</Link> and client technical experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">3. Data Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share data with trusted infrastructure providers (like cloud hosting or CRM platforms) only to the extent necessary to fulfill our service obligations to you, under strict confidentiality agreements. Review our <Link to="/terms" className="text-[#ccff00] hover:underline font-normal">Terms of Service</Link> and <Link to="/website-contract" className="text-[#ccff00] hover:underline font-normal">Website Contract SLA</Link> for complete governance details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">4. Security Measures</h2>
              <p>
                We implement industrial-grade security protocols, including SSL encryption, zero-trust server environments, and secure API key isolation to protect your data. Explore our <Link to="/case-studies" className="text-[#ccff00] hover:underline font-normal">engineering case studies</Link> to see how we architect high-concurrency, privacy-first software platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">5. Global Compliance (GDPR, APP)</h2>
              <p>
                We respect international data privacy laws. If you are accessing our services from the UK, EU, or Australia, we ensure our data handling processes align with global standards.
              </p>
              <div className="mt-4 p-4 bg-zinc-950/80 border border-white/10 rounded-xl space-y-2 text-sm font-mono text-gray-300">
                <div className="flex items-center justify-between">
                  <span>EU/UK General Data Protection Regulation (GDPR)</span>
                  <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] hover:underline inline-flex items-center gap-1">
                    ICO Guidelines <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span>Australian Privacy Principles (OAIC APP)</span>
                  <a href="https://www.oaic.gov.au/privacy/australian-privacy-principles" target="_blank" rel="noopener noreferrer" className="text-[#ccff00] hover:underline inline-flex items-center gap-1">
                    OAIC Framework <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">6. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience, remember session state, and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect the functionality of certain interactive tools. Read technical articles on our <Link to="/blog" className="text-[#ccff00] hover:underline font-normal">Tech Journal</Link> for insights on web performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-6">7. Subject Data Requests & Updates</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data. For any privacy requests or questions regarding this policy, please <Link to="/contact" className="text-[#ccff00] hover:underline font-normal">contact our compliance team directly</Link>.
              </p>
            </section>

            <section className="pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm font-mono text-zinc-500">
              <span className="uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                Last Modified: August 2026 // Privacy Shield Active
              </span>
              <Link to="/contact" className="text-[#ccff00] hover:underline">
                Submit Privacy Inquiry →
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
                <Link to="/terms" className="p-3 bg-zinc-900 hover:bg-[#ccff00]/10 rounded-lg text-gray-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                  <span>Terms of Service</span>
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

            {/* External Data Privacy Authorities & Recognition */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <span className="uppercase tracking-widest text-[11px] font-bold text-gray-300">Privacy Authorities & Verification:</span>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                  UK ICO Portal <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href="https://www.oaic.gov.au/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                  OAIC Australia <ExternalLink className="w-3 h-3" />
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

export default PrivacyPage;


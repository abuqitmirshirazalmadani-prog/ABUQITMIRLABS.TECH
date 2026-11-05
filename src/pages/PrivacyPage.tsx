import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, ShieldCheck, Lock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const PrivacyPage = () => {
  return (
    <div className="bg-[#050505] text-zinc-400 min-h-screen font-sans selection:bg-white/10 selection:text-white">
      <SEO
        title="Privacy Policy & Data Protection | AbuQitmirLabs"
        description="AbuQitmirLabs privacy policy: data controller identity, personal data categories, GDPR/PDPL/APP legal basis, retention periods, and data subject rights."
        canonical="https://www.abuqitmirlabs.tech/privacy"
        ogType="website"
      />

      <Header />
      <Breadcrumbs />

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto space-y-16 animate-enter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/5 p-10 md:p-16 rounded-[3rem] shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-[#ccff00] font-mono text-xs uppercase tracking-[0.3em]">
              <Lock className="w-4 h-4" />
              <span>Data Protection & Privacy Governance</span>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-black/50 border border-white/10 px-3 py-1.5 rounded-lg">
              Effective Date: 1 January 2026 | Last Updated: 5 November 2026
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
            Privacy Policy & Data Protection
          </h1>

          <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-12 border-l-2 border-[#ccff00] pl-5">
            This Privacy Policy explains how <strong>AbuQitmirLabs</strong> ("we," "us," or "our") collects, processes, stores, transfers, and protects personal data when you visit <code className="text-[#ccff00]">https://www.abuqitmirlabs.tech</code>, use our interactive engineering tools, or engage us for software, AI, and digital growth services.
          </p>

          <div className="space-y-12 text-base md:text-lg leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">1. Data Controller Identity & Contact Details</h2>
              <p>
                For the purposes of the EU/UK General Data Protection Regulation (GDPR), the Saudi Personal Data Protection Law (PDPL), the Australian Privacy Principles (APP), and applicable international privacy frameworks, the Data Controller is:
              </p>
              <div className="mt-4 p-5 bg-zinc-950/90 border border-white/10 rounded-2xl text-sm font-mono text-zinc-300 space-y-1.5">
                <p><strong className="text-white">Legal Entity / Studio Name:</strong> AbuQitmirLabs</p>
                <p><strong className="text-white">Registered Engineering Office:</strong> Plot B-19,20,21,22, Sector 16-A, Buffer Zone, Karachi, 75850, Sindh, Pakistan</p>
                <p><strong className="text-white">Privacy & Compliance Email:</strong> <a href="mailto:hello@abuqitmirlabs.tech" className="text-[#ccff00] hover:underline">hello@abuqitmirlabs.tech</a></p>
                <p><strong className="text-white">Direct Telephone / WhatsApp:</strong> <a href="tel:+923190373822" className="text-[#ccff00] hover:underline">+92 319 0373822</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">2. Categories of Personal Data We Collect</h2>
              <p>
                We minimize data collection to what is strictly necessary to deliver our services and operate this website:
              </p>
              <ul className="list-disc pl-8 mt-4 space-y-2.5">
                <li><strong className="text-white font-medium">Identity & Business Contact Data:</strong> Full name, work email address, company or organization name, job title, and telephone/WhatsApp number submitted via our <Link to="/contact" className="text-[#ccff00] hover:underline font-normal">contact and discovery forms</Link>.</li>
                <li><strong className="text-white font-medium">Project & Commercial Scoping Data:</strong> Project type, estimated budget range, target timeline, technical architecture requirements, and documents you voluntarily share with us.</li>
                <li><strong className="text-white font-medium">Technical & Usage Telemetry:</strong> IP address (anonymized where supported), browser type and version, operating system, referring URL, pages viewed, and interaction timestamps collected via server logs and analytics.</li>
                <li><strong className="text-white font-medium">Client Engagement Records:</strong> Statements of Work (SOW), billing and tax invoices, milestone acceptance records, and project communications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">3. Purposes of Processing & Legal Basis</h2>
              <p>
                We process your personal data only when a valid legal basis applies under GDPR (Article 6), Saudi PDPL, or equivalent laws:
              </p>
              <ul className="list-disc pl-8 mt-4 space-y-2.5">
                <li><strong className="text-white font-medium">Pre-Contractual & Contractual Performance:</strong> Responding to your discovery requests, preparing technical proposals, and delivering <Link to="/custom-software" className="text-[#ccff00] hover:underline font-normal">custom software development</Link>, <Link to="/web-development" className="text-[#ccff00] hover:underline font-normal">web applications</Link>, <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline font-normal">mobile apps</Link>, <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-normal">AI agent systems</Link>, and <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-normal">technical SEO services</Link>.</li>
                <li><strong className="text-white font-medium">Explicit Consent:</strong> When you check our privacy consent box on inquiry forms or opt in to receive technical engineering updates (which you may withdraw at any time).</li>
                <li><strong className="text-white font-medium">Legitimate Interests:</strong> Maintaining website security, preventing automated abuse, debugging application errors, and improving our <Link to="/about/our-process" className="text-[#ccff00] hover:underline font-normal">5-step engineering workflow</Link>.</li>
                <li><strong className="text-white font-medium">Legal & Tax Compliance:</strong> Retaining corporate invoices, tax withholding documentation, and audit logs required by applicable financial laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">4. Data Retention Periods</h2>
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-8 mt-4 space-y-2.5">
                <li><strong className="text-white font-medium">Prospective Client Inquiries (No Contract Signed):</strong> Retained for up to <strong>24 months</strong> from the last substantive communication, unless earlier deletion is requested.</li>
                <li><strong className="text-white font-medium">Active Client Project & Contract Records:</strong> Retained for the duration of the engagement plus <strong>7 years</strong> following contract completion to comply with tax, audit, and legal limitation requirements.</li>
                <li><strong className="text-white font-medium">Server Security Logs & Analytics Telemetry:</strong> Retained in identifiable form for up to <strong>90 days</strong> and in aggregated, non-identifiable form for up to <strong>14 months</strong>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">5. Third-Party Sub-Processors & International Transfers</h2>
              <p>
                We do <strong>not</strong> sell, rent, or broker your personal data to third parties. We share limited data only with vetted infrastructure sub-processors required to operate our website and client communication channels:
              </p>
              <ul className="list-disc pl-8 mt-4 space-y-2.5">
                <li><strong className="text-white font-medium">Cloud Hosting & Edge Delivery:</strong> Vercel Inc. and Google Cloud Platform / Firebase (application hosting, database storage, and TLS/CDN delivery).</li>
                <li><strong className="text-white font-medium">Communication & Productivity:</strong> Google Workspace (encrypted corporate email and document collaboration) and WhatsApp Business API (only when initiated directly by you).</li>
              </ul>
              <p className="mt-4">
                Because our engineering studio operates from Karachi, Pakistan and utilizes global cloud infrastructure, your data may be processed outside your country of residence. For clients in the UK/EU, GCC (Saudi Arabia PDPL / UAE), and Australia, we rely on Standard Contractual Clauses (SCCs), Data Processing Agreements (DPAs), and regional cloud residency (such as AWS Bahrain <code className="text-zinc-300">me-south-1</code> or Google Cloud Dammam <code className="text-zinc-300">me-central2</code> for client applications) to safeguard cross-border data flows.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">6. Cookies & Analytics Technologies</h2>
              <p>
                Our website uses strictly necessary session storage and lightweight performance analytics to measure page load speed, navigation flows, and error rates. We do not use invasive cross-site behavioral advertising trackers. You can block or delete cookies at any time through your browser settings without losing access to our public engineering guides and <Link to="/case-studies" className="text-[#ccff00] hover:underline font-normal">case studies</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">7. Your Data Subject Rights</h2>
              <p>
                Depending on your jurisdiction (including GDPR, UK GDPR, Saudi PDPL, CCPA, and Australian Privacy Act), you have the right to:
              </p>
              <ul className="list-disc pl-8 mt-4 space-y-2">
                <li>Request access to a copy of the personal data we hold about you.</li>
                <li>Request rectification of inaccurate or incomplete personal data.</li>
                <li>Request erasure ("right to be forgotten") of your personal data where no overriding legal obligation requires retention.</li>
                <li>Object to or request restriction of processing, and request data portability in a structured, machine-readable format.</li>
                <li>Withdraw consent at any time where processing is based on consent.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, email <a href="mailto:hello@abuqitmirlabs.tech" className="text-[#ccff00] hover:underline font-normal">hello@abuqitmirlabs.tech</a> with the subject line <em>"Data Subject Request"</em>. We verify identity and respond to all legitimate requests within <strong>30 calendar days</strong>.
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
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">8. Security Controls & Incident Notification</h2>
              <p>
                We protect data using TLS 1.3 encryption in transit, AES-256 encryption at rest on cloud databases, strict role-based access control (RBAC), multi-factor authentication (MFA) across all studio accounts, and isolated staging environments. In the event of a confirmed personal data breach affecting your rights, we will notify affected controllers/individuals within <strong>72 hours</strong> of discovery in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">9. Children's Privacy</h2>
              <p>
                Our website and B2B engineering services are directed exclusively at business professionals and organizations. We do not knowingly collect personal data from children under 16 years of age.
              </p>
            </section>

            <section className="pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm font-mono text-zinc-500">
              <span className="uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                Last Updated: 5 November 2026 // Data Protection Policy v2.1
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
              <p className="font-mono text-xs text-[#ccff00] mb-4 tracking-[0.4em] uppercase">// EXPLORE STUDIO CAPABILITIES & GOVERNANCE HUB</p>
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
              <span className="uppercase tracking-widest text-[11px] font-bold text-gray-300">Privacy Authorities & Directories:</span>
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
                  Listed on Clutch <ExternalLink className="w-3 h-3" />
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

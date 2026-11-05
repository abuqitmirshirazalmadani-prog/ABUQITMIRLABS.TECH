import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, ShieldCheck, Scale } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="bg-[#050505] text-zinc-400 min-h-screen font-sans selection:bg-white/10 selection:text-white">
      <SEO
        title="Terms of Service & IP Ownership | AbuQitmirLabs"
        description="AbuQitmirLabs terms of service: SOW deliverables, 100% IP ownership transfer, milestone billing, acceptance testing, warranties, and governing law."
        canonical="https://www.abuqitmirlabs.tech/terms"
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
              <Scale className="w-4 h-4" />
              <span>Commercial Governance & Client Service Agreement</span>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-black/50 border border-white/10 px-3 py-1.5 rounded-lg">
              Effective Date: 1 January 2026 | Last Updated: 5 November 2026
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
            Terms of Service & IP Policy
          </h1>

          <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-12 border-l-2 border-[#ccff00] pl-5">
            These Terms of Service ("Terms") govern your access to <code className="text-[#ccff00]">https://www.abuqitmirlabs.tech</code> and form the baseline commercial framework when you commission software engineering, AI automation, or digital growth services from <strong>AbuQitmirLabs</strong> ("Studio," "we," "us," or "our").
          </p>

          <div className="space-y-12 text-base md:text-lg leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">1. Scope of Services & Statements of Work (SOW)</h2>
              <p>
                AbuQitmirLabs provides software engineering and growth services including <Link to="/custom-software" className="text-[#ccff00] hover:underline font-normal">custom software development</Link>, <Link to="/web-development" className="text-[#ccff00] hover:underline font-normal">web application engineering</Link>, <Link to="/mobile-app-development" className="text-[#ccff00] hover:underline font-normal">mobile app development</Link>, <Link to="/ai-agent-development" className="text-[#ccff00] hover:underline font-normal">AI agent and RAG systems</Link>, and <Link to="/seo-mastery" className="text-[#ccff00] hover:underline font-normal">technical SEO and content engineering</Link>.
              </p>
              <p className="mt-3">
                Every client engagement is governed by a mutually signed Statement of Work (SOW) or Master Services Agreement (MSA) that specifies exact functional deliverables, target cloud architecture, sprint milestones, acceptance criteria, and fee schedules. In the event of a conflict between these website Terms and an executed SOW, the executed SOW prevails. Learn more about our <Link to="/about/our-process" className="text-[#ccff00] hover:underline font-normal">5-step delivery methodology</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">2. Intellectual Property Ownership & Open-Source Components</h2>
              <p>
                <strong className="text-white font-medium">100% Client IP Assignment:</strong> Upon full payment of the applicable milestone invoice, AbuQitmirLabs assigns to the Client 100% of all right, title, and interest (including worldwide copyright and intellectual property rights) in the bespoke source code, database schemas, custom UI/UX designs, and technical documentation created specifically for the Client under the SOW.
              </p>
              <p className="mt-3">
                <strong className="text-white font-medium">Pre-Existing Utilities & Open Source:</strong> AbuQitmirLabs retains ownership of generic, non-project-specific developer utilities, build scripts, and pre-existing framework templates, granting the Client a perpetual, irrevocable, royalty-free, worldwide license to use, modify, and distribute them as part of the delivered software. Third-party open-source packages (such as React, Next.js, Node.js, or PostgreSQL libraries) remain governed by their respective permissive open-source licenses (e.g., MIT, Apache 2.0).
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
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">3. Payment Terms, Milestone Billing & Taxes</h2>
              <ul className="list-disc pl-8 space-y-2.5">
                <li><strong className="text-white font-medium">Milestone & Retainer Billing:</strong> Fixed-scope projects are billed against verified milestone gates (typically an initial commencement deposit followed by sprint delivery milestones). Dedicated engineering pods are billed monthly in advance.</li>
                <li><strong className="text-white font-medium">Invoice Settlement:</strong> Unless otherwise stated in the SOW, invoices are due within <strong>7 calendar days</strong> of issuance. Late payments exceeding 14 days may pause active sprint work until the account is brought current.</li>
                <li><strong className="text-white font-medium">Cross-Border Taxes & Withholding:</strong> Quoted fees are net of local sales taxes, VAT, or cross-border withholding taxes (such as Saudi ZATCA withholding tax or corporate reverse-charge VAT), which remain the responsibility of the Client entity unless explicitly included in the SOW.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">4. Acceptance Testing & 30-Day Bug-Fix Warranty</h2>
              <p>
                Upon delivery of each milestone, the Client has a <strong>7-business-day Acceptance Review Period</strong> to test the deliverables against the written specifications in the SOW and report any reproducible defects.
              </p>
              <p className="mt-3">
                Following final production launch, AbuQitmirLabs provides a complimentary <strong>30-day warranty period</strong> during which any reproducible software bugs or regressions that deviate from the agreed SOW specifications are remediated at no additional cost. Enhancements, new features, or issues caused by third-party API changes or Client code modifications outside the SOW are scoped separately. You can also review our <Link to="/website-contract" className="text-[#ccff00] hover:underline font-normal">Website Contract Template & SLA</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">5. Confidentiality & Non-Disclosure (NDA)</h2>
              <p>
                Both parties agree to hold all non-public business strategies, proprietary algorithms, customer data, cloud credentials, and source code in strict confidence and not disclose them to any third party without prior written consent. We routinely execute mutual Non-Disclosure Agreements (NDAs) prior to technical discovery sessions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, neither party shall be liable for any indirect, incidental, consequential, special, or punitive damages (including lost profits, business interruption, or third-party cloud provider outages). AbuQitmirLabs' aggregate liability under any SOW shall not exceed the total fees actually paid by the Client to AbuQitmirLabs under the applicable SOW during the <strong>three (3) months</strong> immediately preceding the event giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">7. Termination & Repository Handover Protocol</h2>
              <p>
                Either party may terminate an engagement for convenience upon <strong>14 days' written notice</strong> (or immediately for an uncured material breach after 10 business days' written notice). Upon termination, the Client pays only for completed milestones and pro-rated work performed up to the effective termination date, and AbuQitmirLabs immediately delivers all paid source code, database migration scripts, and deployment documentation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">8. Governing Law & Dispute Resolution</h2>
              <p>
                Unless an alternative jurisdiction (such as England & Wales, Delaware, or DIFC/ADGM) is expressly agreed in a signed enterprise MSA, these Terms are governed by the laws of the Islamic Republic of Pakistan. Any commercial dispute that cannot be resolved through good-faith executive mediation within 30 days shall be referred to confidential arbitration seated in <strong>Karachi, Sindh, Pakistan</strong>. For legal or contract inquiries, contact <a href="mailto:hello@abuqitmirlabs.tech" className="text-[#ccff00] hover:underline font-normal">hello@abuqitmirlabs.tech</a> or visit our <Link to="/contact" className="text-[#ccff00] hover:underline font-normal">Contact page</Link>.
              </p>
            </section>

            <section className="pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm font-mono text-zinc-500">
              <span className="uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                Last Updated: 5 November 2026 // Terms of Service v2.1
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
              <span className="uppercase tracking-widest text-[11px] font-bold text-gray-300">Legal Governance & Directories:</span>
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

export default TermsPage;

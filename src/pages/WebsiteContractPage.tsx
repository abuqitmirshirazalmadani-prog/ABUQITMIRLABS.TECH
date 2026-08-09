"use client";

import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, ShieldCheck, HelpCircle, 
  ChevronRight, ArrowRight, Download, Check, 
  X, AlertTriangle, Sparkles, Send, Phone, Lock, Eye, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatedDownload } from '../components/AnimatedDownload';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';

export default function WebsiteContractPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleInstantDownload = () => {
    scrollToForm();
    setIsDownloading(true);
    setFormSubmitted(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      // Record contract request in Firestore
      await addDoc(collection(db, 'contractRequests'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        downloadedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Firestore persistence failed for contract request: ", error);
      try {
        handleFirestoreError(error, OperationType.CREATE, 'contractRequests');
      } catch (err) {
        // Safe fallback
      }
    }

    // Start animated download state
    setIsDownloading(true);
    setFormSubmitted(true);
  };

  const triggerRealDownload = () => {
    // Generate a simple text configuration of the agreement as a file download representing the contract template
    const contractContent = `===========================================================
ABUQITMIR LABS — PROFESSIONAL WEB DEVELOPMENT AGREEMENT
===========================================================
[FREE TEMPLATE COPY — OWNERSHIP PROTECTED BLUEPRINT]

This agreement is entered into as of today, between the CLIENT and the DEVELOPER.

1. INTELLECTUAL PROPERTY & OWNERSHIP
-----------------------------------
Upon full payment of the project fees, all intellectual property, source files, asset keys, code modules, databases, search optimization indices, and systems developed for this project transfer 100% and completely to the CLIENT. 
The DEVELOPER retains NO passive claim, licensing barriers, or structural restrictions.

2. HOSTING & DOMAIN ROOT OWNERSHIP
----------------------------------
All registration accounts, including domains (DNS controls) and cloud runtime ecosystems (e.g. AWS, Vercel, Supabase, Cloudflare, GitHub repositories, or GCP), shall be registered strictly under the CLIENT'S legal name and credentials. 
The DEVELOPER shall act solely as authorized technical support, never as absolute proprietary gatekeepers.

3. POST-LAUNCH TECHNICAL WARRANTY
--------------------------------
The DEVELOPER warrants a structured 30-day "Intense Support Block" beginning immediately upon site launch, covering:
- Absolute package dependency stabilization
- Server runtime anomaly fixes
- Critical broken-link checks
- Content management interface adjustments

4. SPECIFIED PRODUCT STACK DISCLOSURE
-------------------------------------
The technology stack used to execute this digital platform consists of:
- Full-Stack React Engine [Vite / Next.js Framework]
- Styling Layout System: Tailwind CSS
- State-Engine & Interactive Animation: Framer Motion / GSAP
- Serverless Cloud Persistence Engine: Google Cloud Platform / Firebase

5. PROGRESS TERMINATION & EXIT TERMS
-----------------------------------
If for any reason the CLIENT wishes to cancel development progress, they may issue an unconditional exit order. All work-in-progress materials developed up to that milestone shall be compiled and delivered instantly, billed on a prorated basis matching the tier output.

===========================================================
AbuQitmirLabs.tech — We build platforms that command authority. 
Do not sign a website contract without these protective legal terms.
===========================================================`;

    const blob = new Blob([contractContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AbuQitmirLabs_Ownership_Protected_Contract_Template.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onDownloadFinished = () => {
    setIsDownloading(false);
    setDownloadCompleted(true);
    // Auto-trigger contract download file
    triggerRealDownload();
  };

  // Plain CSS watermark contract preview content
  const previewContractLines = [
    "AGREEMENT FOR DIGITAL PLATFORM DEVELOPMENT & INTELLECTUAL SAFEGUARDS",
    "Section 1.1: Transfer of Intellectual Assets and Source Repositories...",
    "Upon final milestone sign-off, Developer transfers absolute, perpetual, global ownership of...",
    "Section 1.2: Domain Registration, API Configurations, and Third-Party API keys...",
    "All accounts shall be managed in the Client's direct name. Developer shall possess zero...",
    "Section 2.1: Post-Launch Support SLA and Performance Baseline guarantees...",
    "Developer commits to immediate bug resolution within 24-hours for severe production issues...",
    "Section 3.1: Complete Software Architecture Declarations...",
    "No hidden legacy codebases or unsupported proprietary plugins of Developer will be utilized...",
  ];

  return (
    <div className="bg-[#050505] text-zinc-400 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/10 selection:text-white">
      <Helmet>
        <title>Free Website Contract Template | Ownership Protection | AbuQitmirLabs</title>
        <meta name="description" content="Download a free, ownership-protected website contract template. Includes domain ownership, support SLAs, tech stack disclosure, and exit terms. No strings attached." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/website-contract" />
        
        {/* OG Tags */}
        <meta property="og:title" content="Free Website Contract Template | Ownership Protection | AbuQitmirLabs" />
        <meta property="og:description" content="Download a free, ownership-protected website contract template. Includes domain ownership, support SLAs, tech stack disclosure, and exit terms. No strings attached." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/website-contract" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Website Contract Template | Ownership Protection | AbuQitmirLabs" />
        <meta name="twitter:description" content="Download a free, ownership-protected website contract template. Includes domain ownership, support SLAs, tech stack disclosure, and exit terms. No strings attached." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "name": "Free Ownership-Protected Website Contract Template",
            "description": "A comprehensive, client-first website development contract template guaranteeing 100% intellectual property transfer, hosting root control, clear SLAs, and exit terms.",
            "url": "https://www.abuqitmirlabs.tech/website-contract",
            "publisher": {
              "@type": "Organization",
              "name": "AbuQitmirLabs .TECH",
              "url": "https://www.abuqitmirlabs.tech"
            }
          })}
        </script>
      </Helmet>

      {/* Navigation Header */}
      <Header />

      {/* Spacer for Fixed Header */}
      <div className="h-20 md:h-24" />

      {/* Grid Overlay Pattern (Matches main style) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-[12.5%] w-px bg-white/[0.02]"></div>
        <div className="absolute inset-y-0 left-[50%] w-px bg-white/[0.04]"></div>
        <div className="absolute inset-y-0 left-[87.5%] w-px bg-white/[0.02]"></div>
        <div className="absolute inset-x-0 top-[20%] h-px bg-white/[0.02]"></div>
        <div className="absolute inset-x-0 top-[60%] h-px bg-white/[0.02]"></div>
      </div>

      {/* Section 1: Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-16 md:pb-24 border-b border-white/5 z-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl">
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-[#ccff00] ring-1 ring-white/10 mb-6 uppercase tracking-[0.2em]"
            >
              <Sparkles className="w-4 h-4 text-[#ccff00]" />
              Free Ad Campaign Resource
            </motion.div>

            {/* Headline H1 */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6"
            >
              Don't Sign a Website <br />
              <span className="text-[#ccff00]">Contract Without This</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed mb-8"
            >
              Download the same ownership-protected contract template AbuQitmirLabs uses on every project — free, no obligation.
            </motion.p>

            {/* Primary CTA button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={handleInstantDownload}
                className="px-8 py-5 bg-[#ccff00] hover:bg-[#b5e000] text-black font-black text-base uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] cursor-pointer"
                style={{ color: '#000000' }}
              >
                <span className="text-black font-black" style={{ color: '#000000' }}>Get the Free Contract Template</span>
                <ArrowRight className="w-5 h-5 font-black text-black" style={{ color: '#000000' }} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Problem agitation */}
      <section className="py-20 bg-black/40 border-b border-white/5 relative z-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">// THE PITFALLS OF TYPICAL AGENCY DEALS</h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Why 84% of website buyers regret their agency choice within 12 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <X className="w-6 h-6 text-red-500 font-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Agency Disappearances</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Agency disappears after launch, leaving you with no operational support, system keys, or technical explanation.
              </p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <X className="w-6 h-6 text-red-500 font-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hostage Domains</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                You don't actually own your host, domain registries, or SaaS integrations, forcing monthly ransom fees.
              </p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <X className="w-6 h-6 text-red-500 font-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">"Vague" Support SLAs</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Vague "post-launch support" contracts turn out to guarantee absolutely nothing when critical server runtime failures crash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The solution — contract preview */}
      <section className="py-20 md:py-28 border-b border-white/5 relative z-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box: Contract Document Preview Mockup */}
            <div className="lg:col-span-6 relative">
              <div 
                onClick={handleInstantDownload}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleInstantDownload();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Instant contract download template preview"
                className="relative bg-[#0d0d0d] border border-white/10 hover:border-[#ccff00]/40 focus:border-[#ccff00]/100 focus:outline-none rounded-2xl overflow-hidden shadow-2xl p-8 aspect-[4/5] flex flex-col justify-between cursor-pointer group transition-all duration-300"
              >
                
                {/* Decorative Elements */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#ccff00]" />
                    <span className="font-mono text-xs tracking-wider text-gray-500">CONTRACT_BLUEPRINT_2026.docx</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#ccff00] animate-pulse" />
                </div>

                {/* Blurring & Watermark overlay */}
                <div className="absolute inset-x-0 bottom-0 top-36 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="px-6 py-3 bg-red-500/20 border-2 border-red-500/40 rounded-xl text-red-400 font-serif italic text-lg uppercase tracking-widest mb-4 transform -rotate-12 select-none">
                    DRAFT PREVIEW WATERMARK
                  </div>
                  <p className="text-sm text-[#ccff00] max-w-sm font-semibold group-hover:scale-105 transition-transform duration-300 mt-2 block">
                    Click anywhere on this preview document to instantly compile & download the contract template!
                  </p>
                </div>

                {/* Mimic contract lines */}
                <div className="flex-1 space-y-4">
                  {previewContractLines.map((line, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="h-3 bg-white/20 rounded w-1/4" />
                      <div className="h-2.5 bg-white/5 rounded w-full" />
                      <div className="h-2.5 bg-white/5 rounded w-5/6" />
                    </div>
                  ))}
                </div>

                {/* Footer seal */}
                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center relative z-20">
                  <div className="text-[10px] font-mono text-gray-600">CONFIDENTIAL TEMPLATE</div>
                  <div className="text-[10px] font-mono text-gray-600">PAGE 1 of 8</div>
                </div>
              </div>
            </div>

            {/* Right Box: Specifications list */}
            <div className="lg:col-span-6 lg:pl-10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block mb-2">// LEGAL PROTECTION GUARANTEED</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-8">
                This free contract template includes:
              </h2>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Clear Domain & Hosting Ownership</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">All core credentials, DNS namespaces, and cloud accounts must remain registered solely under Client control.</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Defined Post-Launch Support Window</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">Guarantees an intense, designated stabilization loop immediately following release to squash runtime anomalies.</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Named Technology Stack Disclosure</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">Complete, transparent index of code dependencies, libraries, and hosting architectures so there are no black-box dependencies.</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Tiered Response Time Commitments</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">Concrete response SLAs categorizing severity issues so emergency server downtime is handled within hours.</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">Unconditional Exit Terms</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">Explicit terms detailing termination options. If things go sideways, you own whatever portion has been billed and developed.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Lead capture form */}
      <section ref={formRef} className="py-20 md:py-28 bg-[#090909] border-b border-white/5 relative z-10 px-6 md:px-12">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ccff00]/10 text-[#ccff00] px-3 py-1 text-xs font-mono mb-6 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> Direct Safe Access
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Secure Your Assets Now
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light mb-12 max-w-xl mx-auto">
            Get instant, unconditional access. We never sell your credentials. Keep contracts clear and client ownership safe.
          </p>

          <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 sm:p-12 text-left shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="space-y-2">
                    <label htmlFor="contract-form-name" className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Your Name <span className="text-[#ccff00]">*</span></label>
                    <input 
                      id="contract-form-name"
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe" 
                      className="w-full px-4 py-4 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contract-form-email" className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Email Address <span className="text-[#ccff00]">*</span></label>
                    <input 
                      id="contract-form-email"
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com" 
                      className="w-full px-4 py-4 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contract-form-phone" className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">Phone Number <span className="text-gray-600">(Optional)</span></label>
                    <input 
                      id="contract-form-phone"
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000" 
                      className="w-full px-4 py-4 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#ccff00] hover:bg-[#b5e000] text-black text-sm uppercase tracking-widest font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-3 mt-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.05)]"
                    style={{ color: '#000000' }}
                  >
                    <span className="text-black font-black" style={{ color: '#000000' }}>Send Me the Free Contract</span>
                    <Send className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                  </button>
                </motion.form>
              ) : isDownloading ? (
                <motion.div 
                  key="downloading"
                  className="py-12 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AnimatedDownload 
                    isAnimating={true} 
                    onAnimationComplete={onDownloadFinished} 
                  />
                  <p className="text-xs font-mono text-gray-500 mt-6 tracking-widest text-center animate-pulse">
                    COMPILING CUSTOM CLIENT SAFEGUARDS AGREEMENT...
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="completed"
                  className="py-8 text-center space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#ccff00]" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Your File is Ready</h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    Check your downloads list. If your browser blocked the automatic trigger, please use the direct transmission button layout below.
                  </p>

                  <div className="pt-4 space-y-4">
                    <button 
                      onClick={triggerRealDownload}
                      className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest rounded-xl transition-all border border-white/10 inline-flex items-center gap-3 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#ccff00]" />
                      Manual PDF/Text Template Download
                    </button>

                    <div className="h-px bg-white/5 w-full my-6" />

                    <div className="bg-[#050505] border border-white/5 rounded-xl p-6 text-left">
                      <span className="text-[10px] font-bold text-[#ccff00] uppercase tracking-wider block mb-2">★ SOFT CONSULTATION OFFER</span>
                      <h4 className="text-white font-bold mb-2">Want to customize this draft for a specific contract?</h4>
                      <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        If you have active negotiation variables, target stacks, or support details to adjust, let our senior specialist review it entirely for free.
                      </p>
                      <a 
                        href="https://wa.me/923233260859"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-white hover:text-[#ccff00] transition-colors inline-flex items-center gap-2 group border-b border-white hover:border-[#ccff00] pb-0.5"
                      >
                        Initiate WhatsApp Project Review
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Section 5: Why AbuQitmirLabs.tech */}
      <section className="py-20 border-b border-white/5 relative z-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-16 border border-white/5 bg-gradient-to-br from-[#0c0c0c] to-[#050505]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
              <div className="lg:col-span-8 space-y-6">
                <span className="text-[#ccff00]/60 text-xs font-mono uppercase tracking-[0.2em] font-bold block">// STUDIO CORE INTENT</span>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  Transparent agreements make elite systems.
                </h3>
                <p className="text-gray-400 text-base leading-relaxed font-light">
                  AbuQitmirLabs builds custom software, websites, mobile apps, and AI agent systems — and we use this exact contract structure on every client engagement, because ownership disputes shouldn't happen to anyone.
                </p>
              </div>

              <div className="lg:col-span-4 lg:text-right">
                <a 
                  href="https://wa.me/923233260859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 border border-white/20 hover:border-[#ccff00] text-white hover:text-[#ccff00] text-xs font-mono uppercase tracking-widest rounded-xl transition-all inline-flex items-center gap-3 backdrop-blur-sm shadow-2xl"
                >
                  Contact Senior Partner
                  <Send className="w-4 h-4 text-[#ccff00]" />
                </a>
              </div>
            </div>

            {/* Contextual Internal Links Grid */}
            <div className="border-t border-white/10 pt-8 mt-8">
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold mb-4">Explore Our Full-Stack Engineering Services:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <Link to="/custom-software" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Custom Software</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/web-development" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Web Development</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/mobile-app-development" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Mobile Apps</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/ai-agent-development" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>AI Agent Systems</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/seo-mastery" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>SEO Mastery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/case-studies" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Case Studies</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/blog" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Tech Journal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
                <Link to="/contact" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-[#ccff00] transition-colors border border-white/5 flex items-center justify-between">
                  <span>Book Audit</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                </Link>
              </div>

              {/* External Authoritative Legal & Standards Links */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
                <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">Industry Legal & Licensing References:</span>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="https://creativecommons.org/licenses/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                    Creative Commons Licenses <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a href="https://www.w3.org/Consortium/Legal/2002/copyright-software-20021231" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                    W3C Software Notice <ExternalLink className="w-3 h-3" />
                  </a>
                  <span>•</span>
                  <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                    Google Technical Guidelines <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ (3-4 short Qs) */}
      <section className="py-20 md:py-28 border-b border-white/5 bg-black/20 relative z-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ccff00] text-xs font-mono uppercase tracking-widest block mb-3">★ RESOLVING DOUBTS</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8">
              <div className="w-10 h-10 bg-[#ccff00]/10 rounded-lg flex items-center justify-center mb-6">
                <HelpCircle className="w-5 h-5 text-[#ccff00]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Is this template really free?</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Yes. Absolutely. No credit card hooks, subscription loops, or surprise charges. We believe true tech studio authority begins by publishing transparent safeguards before signed bills.
              </p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8">
              <div className="w-10 h-10 bg-[#ccff00]/10 rounded-lg flex items-center justify-center mb-6">
                <HelpCircle className="w-5 h-5 text-[#ccff00]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Do I have to hire AbuQitmirLabs?</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                No contract strings whatsoever. Feel free to download and use this template with arbitrary freelancer providers, internal specialists, or third-party agencies. It belongs to you.
              </p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8">
              <div className="w-10 h-10 bg-[#ccff00]/10 rounded-lg flex items-center justify-center mb-6">
                <HelpCircle className="w-5 h-5 text-[#ccff00]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Can I edit this contract?</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Yes. The contract draft is served as clear structured plain text modules. You can edit lists, add milestones, modify timeline SLAs, and adjust clauses matching your exact scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Secondary CTA — consultation offer */}
      <section className="py-20 md:py-28 relative z-10 px-6 md:px-12 bg-gradient-to-t from-black to-[#050505]">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Already have a contract & <br />
              want a second opinion?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
              Get a free 15-minute raw contract review checklist with our team. Zero sales pitch, absolute blueprint clarity.
            </p>

            <div className="pt-6">
              <a 
                href="https://wa.me/923233260859"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 bg-white hover:bg-gray-100 text-black font-black text-sm uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(204,255,0,0.3)] active:translate-y-0.5"
                style={{ color: '#000000' }}
              >
                <span className="text-black font-black" style={{ color: '#000000' }}>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 font-black text-black" style={{ color: '#000000' }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

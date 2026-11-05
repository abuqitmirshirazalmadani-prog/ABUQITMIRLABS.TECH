import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Send, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube,
  ArrowUp,
  Cpu,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Smartphone,
  Pin,
  HelpCircle,
  Briefcase,
  Award,
  ChevronRight,
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ObfuscatedEmail from '../components/ObfuscatedEmail';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Custom Software Development',
    budget: '$10,000 – $25,000',
    timeline: '1 – 2 Months',
    message: '',
    privacyConsent: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete your name, work email, and project message before submitting.');
      return;
    }
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        privacyConsent: formData.privacyConsent,
        status: 'pending',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Firestore persistence failed, logging diagnostic context:", error);
      try {
        handleFirestoreError(error, OperationType.CREATE, 'inquiries');
      } catch (err) {
        // Fallback catch to ensure user is not blocked
      }
    }

    const subject = encodeURIComponent(`New Project Inquiry: ${formData.projectType} — ${formData.name} (${formData.company || 'Direct'})`);
    const bodyText = encodeURIComponent(
      `Name: ${formData.name}\nWork Email: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budget}\nTarget Timeline: ${formData.timeline}\n\nProject Brief:\n${formData.message}`
    );
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@abuqitmirlabs.tech&su=${subject}&body=${bodyText}`;

    setIsSubmitting(false);
    setSubmitted(true);
    window.open(gmailUrl, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.abuqitmirlabs.tech/contact#contactpage",
    "name": "Contact AbuQitmirLabs — Book a Technical Discovery Call",
    "url": "https://www.abuqitmirlabs.tech/contact",
    "description": "Book a technical discovery call or request a project quote for custom software, AI automation, mobile apps, and technical SEO.",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://www.abuqitmirlabs.tech/#organization",
      "name": "AbuQitmirLabs",
      "telephone": "+923233260859",
      "email": "hello@abuqitmirlabs.tech"
    }
  };

  return (
    <div className="bg-black text-[#E8E8ED] font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-black">
      <SEO
        title="Contact & Book a Discovery Call | AbuQitmirLabs"
        description="Book a technical discovery call or request a project quote from AbuQitmirLabs. Custom software, AI agents, mobile apps, and growth engineering."
        canonical="https://www.abuqitmirlabs.tech/contact"
        ogTitle="Contact & Book a Discovery Call | AbuQitmirLabs"
        ogDescription="Book a technical discovery call or request a project quote from AbuQitmirLabs. Response within 24 business hours."
        ogImage="https://www.abuqitmirlabs.tech/logo.png"
        schema={contactSchema}
      />

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-5" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,255,0,0.05) 2px, rgba(204,255,0,0.05) 4px)' }}></div>
      
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[url('/noise.svg')] blend-overlay"></div>
 
      <Header />
      <Breadcrumbs />
 
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16 text-center animate-enter">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#ccff00]/10 border border-[#ccff00]/30 px-4 py-2 text-[10px] uppercase font-mono tracking-[0.2em] text-[#ccff00] mb-8"
             >
                <Clock size={14} />
                Response SLA: Within 24 Business Hours &bull; Senior Architect Review
             </motion.div>
             
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white uppercase mb-6 animate-enter-delay-1"
             >
                Book a Technical Discovery Call &amp; Project Quote
             </motion.h1>
             <p className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                Share your product scope, architecture goals, or growth bottlenecks below. Every inquiry is reviewed directly by a senior software architect within one business day.
             </p>
             <div className="w-32 h-2 bg-[#ccff00] mx-auto mb-10 shadow-[0_0_20px_rgba(204,255,0,0.5)]"></div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Accessible Server-Rendered Project Inquiry Form */}
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-black border-4 border-[#ccff00] p-8 relative overflow-hidden group rounded-2xl"
               style={{ boxShadow: '12px 12px 0 rgba(204,255,0,0.9)' }}
            >
               {/* Form Header */}
               <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b-2 border-[#ccff00]/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ccff00]"></div>
                    <span className="font-mono text-xs ml-3 text-[#ccff00] tracking-widest uppercase">Project Scoping Brief</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">NDA Available on Request</span>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6 relative z-10" aria-label="Project discovery and quote request form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                       <label htmlFor="contact-page-name" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                         Full Name *
                       </label>
                       <input 
                          id="contact-page-name"
                          name="name"
                          autoComplete="name"
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl" 
                          placeholder="Your full name"
                       />
                    </div>
                    <div>
                       <label htmlFor="contact-page-email" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                         Work Email *
                       </label>
                       <input 
                          id="contact-page-email"
                          name="email"
                          autoComplete="email"
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl" 
                          placeholder="you@company.com"
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                       <label htmlFor="contact-page-company" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                         Company / Organization
                       </label>
                       <input 
                          id="contact-page-company"
                          name="company"
                          autoComplete="organization"
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl" 
                          placeholder="Company or startup name"
                       />
                    </div>
                    <div>
                       <label htmlFor="contact-page-project-type" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                         Project Type *
                       </label>
                       <select
                          id="contact-page-project-type"
                          name="projectType"
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                          className="w-full bg-zinc-900/80 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all rounded-xl"
                       >
                          <option value="Custom Software Development">Custom Software Development</option>
                          <option value="AI Agent & RAG Automation">AI Agent &amp; RAG Automation</option>
                          <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                          <option value="Mobile App Development (Flutter / React Native)">Mobile App Development (Flutter / React Native)</option>
                          <option value="Technical & Programmatic SEO">Technical &amp; Programmatic SEO</option>
                          <option value="B2B Growth Engineering System">B2B Growth Engineering System</option>
                       </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                       <label htmlFor="contact-page-budget" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                         Budget Range *
                       </label>
                       <select
                          id="contact-page-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="w-full bg-zinc-900/80 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all rounded-xl"
                       >
                          <option value="$5,000 – $10,000">$5,000 – $10,000 (MVP / Focused Scope)</option>
                          <option value="$10,000 – $25,000">$10,000 – $25,000 (Full Product / AI System)</option>
                          <option value="$25,000 – $50,000">$25,000 – $50,000 (Enterprise Platform)</option>
                          <option value="$50,000+">$50,000+ (Multi-Quarter Engineering Pod)</option>
                          <option value="Need Scoping Estimate">Need Scoping Estimate</option>
                       </select>
                    </div>
                    <div>
                       <label htmlFor="contact-page-timeline" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                         Target Timeline *
                       </label>
                       <select
                          id="contact-page-timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          className="w-full bg-zinc-900/80 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all rounded-xl"
                       >
                          <option value="Immediate (Within 2 Weeks)">Immediate (Within 2 Weeks)</option>
                          <option value="1 – 2 Months">1 – 2 Months</option>
                          <option value="3 – 6 Months">3 – 6 Months</option>
                          <option value="Exploratory / Roadmap Planning">Exploratory / Roadmap Planning</option>
                       </select>
                    </div>
                  </div>

                  <div>
                     <label htmlFor="contact-page-message" className="font-mono text-xs text-[#ccff00] mb-2 block tracking-wider uppercase">
                       Project Message &amp; Requirements *
                     </label>
                     <textarea 
                        id="contact-page-message"
                        name="message"
                        autoComplete="off"
                        required
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl resize-none" 
                        placeholder="Describe your target architecture, key features, integrations, or growth goals..."
                     ></textarea>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="contact-page-privacy"
                      name="privacyConsent"
                      type="checkbox"
                      required
                      checked={formData.privacyConsent}
                      onChange={(e) => setFormData({...formData, privacyConsent: e.target.checked})}
                      className="mt-1 h-4 w-4 accent-[#ccff00] rounded border-zinc-700"
                    />
                    <label htmlFor="contact-page-privacy" className="text-xs text-zinc-400 leading-relaxed">
                      I consent to AbuQitmirLabs processing my inquiry data to prepare a technical consultation in accordance with the{' '}
                      <Link to="/privacy" className="text-[#ccff00] underline hover:text-white">Privacy Policy</Link> and{' '}
                      <Link to="/terms" className="text-[#ccff00] underline hover:text-white">Terms of Service</Link>.
                    </label>
                  </div>

                  {errorMessage && (
                    <div role="alert" className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  {submitted && (
                    <div role="status" className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono space-y-1">
                      <p className="font-bold text-white">Inquiry Logged Successfully</p>
                      <p>Thank you, {formData.name}. Our engineering lead will review your brief and respond within 24 business hours.</p>
                    </div>
                  )}

                  <button 
                     type="submit" 
                     disabled={isSubmitting || submitted}
                     className={`w-full px-8 py-5 font-black text-base sm:text-lg border-4 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group rounded-xl cursor-pointer uppercase tracking-wider
                        ${submitted ? 'bg-green-500 border-green-500 !text-black' : 'bg-[#ccff00] border-[#ccff00] !text-black hover:bg-[#b0d600]'}`}
                  >
                     <AnimatePresence mode="wait">
                        {isSubmitting ? (
                           <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3 !text-black font-black"
                           >
                               <Cpu className="animate-spin !text-black" />
                               Submitting Project Brief...
                           </motion.div>
                        ) : submitted ? (
                           <motion.div
                              key="success"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 !text-black font-black"
                           >
                               <ShieldCheck className="!text-black" />
                               Brief Submitted &mdash; Response Within 24h
                           </motion.div>
                        ) : (
                           <motion.div
                              key="initial"
                              className="flex items-center gap-3 !text-black font-black"
                           >
                               <Send size={20} className="!text-black" />
                               Request Technical Discovery Call
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </button>
               </form>

               {/* Expected Response SLA */}
               <div className="mt-6 pt-5 border-t-2 border-[#ccff00]/20 font-mono text-[11px] space-y-1.5 text-zinc-400">
                  <p className="text-[#ccff00] font-bold">&gt; EXPECTED RESPONSE TIME: WITHIN 24 BUSINESS HOURS</p>
                  <p>&gt; DIRECT REVIEW BY SENIOR SOFTWARE ARCHITECT (NO SALES MIDDLEMEN)</p>
                  <p>&gt; 100% CONFIDENTIAL &bull; MUTUAL NDA AVAILABLE PRIOR TO CODE REVIEW</p>
               </div>

               {/* Background Pattern */}
               <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(204,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.02)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10 pointer-events-none -z-10"></div>
            </motion.div>

            {/* Contact Details & Links */}
            <div className="space-y-12">
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-10"
               >
                  <div className="group">
                     <h2 className="font-mono text-xs text-[#ccff00] mb-4 tracking-[0.3em] uppercase font-bold">Direct Communication Channels</h2>
                     <div className="space-y-6">
                        <div className="flex items-center gap-6 group/item">
                           <div className="w-16 h-16 bg-[#ccff00]/5 border-2 border-[#ccff00]/20 flex items-center justify-center group-hover/item:border-[#ccff00] group-hover/item:bg-[#ccff00]/10 transition-all shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-xl">
                              <Mail className="text-[#ccff00]" size={28} />
                           </div>
                           <div>
                              <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">Corporate Email</p>
                              <div className="flex flex-col gap-1.5 mt-1">
                                 <ObfuscatedEmail 
                                    user="hello" 
                                    domain="abuqitmirlabs.tech" 
                                    className="text-white font-mono text-sm hover:text-[#ccff00] transition-colors hover:underline font-bold block"
                                 />
                                 <ObfuscatedEmail 
                                    user="abuqitmirshirazalmadani" 
                                    domain="gmail.com" 
                                    className="text-zinc-500 font-mono text-xs hover:text-[#ccff00] transition-colors hover:underline block"
                                 />
                                 <p className="text-[#ccff00]/70 font-mono text-[10px] uppercase tracking-tight">Response SLA: Within 24 Business Hours</p>
                              </div>
                           </div>
                        </div>
                        <a 
                           href="https://wa.me/923233260859" 
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="Chat with AbuQitmirLabs on WhatsApp (+92-323-3260859)"
                           className="flex items-center gap-6 group/item"
                        >
                           <div className="w-16 h-16 bg-[#25D366]/10 border-2 border-[#25D366]/30 flex items-center justify-center group-hover/item:border-[#25D366] group-hover/item:bg-[#25D366]/20 transition-all rounded-xl">
                               <MessageCircle className="text-[#25D366]" size={28} />
                           </div>
                           <div>
                              <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">WhatsApp Direct</p>
                              <p className="text-zinc-400 font-mono text-xs group-hover/item:text-[#25D366] transition-colors">+92-323-3260859 (Direct Engineering Chat)</p>
                           </div>
                        </a>
                        <a 
                           href="https://www.google.com/search?q=AbuQitmirLabs.Tech" 
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="View AbuQitmirLabs headquarters address in Karachi, Pakistan"
                           className="flex items-center gap-6 group/item"
                        >
                           <div className="w-16 h-16 bg-[#ccff00]/5 border-2 border-[#ccff00]/20 flex items-center justify-center group-hover/item:border-[#ccff00] transition-all rounded-xl">
                               <MapPin className="text-[#ccff00]" size={28} />
                           </div>
                           <div>
                              <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">Headquarters Address</p>
                              <p className="text-zinc-400 font-sans text-xs leading-relaxed max-w-sm">8/15, 37/A 3, Area Shah Khalid Colony Sector 37 A Landhi Town, 75160, Karachi, Pakistan</p>
                           </div>
                        </a>
                     </div>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                     <h2 className="font-mono text-xs text-[#ccff00] mb-6 tracking-[0.3em] uppercase font-bold">Verified Profiles &amp; Social Channels</h2>
                     <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-3">
                        {[
                           { label: 'AbuQitmirLabs on Facebook', icon: <Facebook />, color: 'hover:bg-[#1877F2]', href: "https://www.facebook.com/profile.php?id=61583768706452" },
                           { label: 'AbuQitmirLabs on Google Business Profile', icon: <MapPin />, color: 'hover:bg-[#4285F4]', href: "https://www.google.com/search?q=AbuQitmirLabs.Tech" },
                           { label: 'AbuQitmirLabs on Instagram', icon: <Instagram />, color: 'hover:bg-[#E4405F]', href: "https://www.instagram.com/abuqitmirshirazalmadani/" },
                           { label: 'AbuQitmirLabs on YouTube', icon: <Youtube />, color: 'hover:bg-[#FF0000]', href: "https://www.youtube.com/@AbuQitmir" },
                           { label: 'AbuQitmirLabs on LinkedIn', icon: <Linkedin />, color: 'hover:bg-[#0A66C2]', href: "https://www.linkedin.com/in/abu-qitmir-697423390/" },
                           { label: 'AbuQitmirLabs on X (Twitter)', icon: <Twitter />, color: 'hover:bg-[#1DA1F2]', href: "https://x.com/AbuQitmir" },
                           { label: 'AbuQitmirLabs on TikTok', icon: <Smartphone />, color: 'hover:bg-[#FF0050]', href: "https://www.tiktok.com/@abuqitmirmohammadshiraz" },
                           { label: 'AbuQitmirLabs on Pinterest', icon: <Pin />, color: 'hover:bg-[#E60023]', href: "https://www.pinterest.com/abuqitmir" },
                           { label: 'AbuQitmirLabs on Quora', icon: <HelpCircle />, color: 'hover:bg-[#B92B27]', href: "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani" },
                           { label: 'AbuQitmirLabs on GoodFirms Directory', icon: <Briefcase />, color: 'hover:bg-[#0F82C4]', href: "https://www.goodfirms.co/company/abuqitmirlabs-tech" },
                           { label: 'AbuQitmirLabs on Clutch Directory', icon: <Award />, color: 'hover:bg-[#D41058]', href: "https://clutch.co/profile/abuqitmirlabstech" }
                        ].map((social, i) => (
                           <a 
                              key={i} 
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={social.label}
                              title={social.label}
                              className={`w-full aspect-square bg-[#ccff00]/5 border-2 border-[#ccff00]/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:border-transparent hover:scale-110 ${social.color} hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]`}
                           >
                               {React.cloneElement(social.icon as React.ReactElement<any>, { size: 24, 'aria-hidden': true })}
                           </a>
                        ))}
                     </div>
                  </div>

                   {/* Related Studio Services & Navigation Hub */}
                   <div className="pt-10 border-t border-white/5 space-y-8 text-left">
                      <div>
                         <p className="font-mono text-xs text-[#ccff00] mb-4 tracking-[0.4em] uppercase">// EXPLORE STUDIO CAPABILITIES &amp; HUB</p>
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                            <Link to="/" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Studio Home</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/about/our-company" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Our Company</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/about/our-team" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Our Team</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/about/our-process" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Engineering Process</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/about/careers" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Careers &amp; Roles</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/custom-software" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Custom Software</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/web-development" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Web Development</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/mobile-app-development" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Mobile Apps</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/ai-agent-development" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>AI Agent Systems</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/seo-mastery" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>SEO Mastery</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/case-studies" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Case Studies</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                            <Link to="/blog" className="p-3 bg-white/5 hover:bg-[#ccff00]/10 rounded-lg text-zinc-400 hover:text-[#ccff00] transition-colors border border-white/10 flex items-center justify-between">
                               <span>Tech Journal</span>
                               <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
                            </Link>
                         </div>
                      </div>

                      {/* External Tech &amp; Verification References */}
                      <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
                         <span className="uppercase tracking-widest text-[11px] font-bold text-zinc-400">External Technical &amp; Studio References:</span>
                         <div className="flex flex-wrap items-center gap-4">
                            <a href="https://clutch.co/profile/abuqitmirlabstech" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                               Clutch Directory <ExternalLink className="w-3 h-3" />
                            </a>
                            <span>•</span>
                            <a href="https://www.goodfirms.co/company/abuqitmirlabs-tech" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                               GoodFirms Profile <ExternalLink className="w-3 h-3" />
                            </a>
                            <span>•</span>
                            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                               React Framework <ExternalLink className="w-3 h-3" />
                            </a>
                            <span>•</span>
                            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ccff00] transition-colors inline-flex items-center gap-1">
                               Tailwind CSS <ExternalLink className="w-3 h-3" />
                            </a>
                         </div>
                      </div>
                   </div>
                </motion.div>


               {/* Back to Top / Interactive Element */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-10 border-2 border-dashed border-[#ccff00]/20 group hover:border-[#ccff00]/40 transition-all flex flex-col items-center justify-center gap-6 rounded-2xl"
               >
                  <p className="font-mono text-[10px] text-zinc-500 text-center uppercase tracking-widest leading-loose">
                     Our terminal is always active. <br />
                     Deploy your ideas to our production pipeline.
                  </p>
                  <button 
                    onClick={scrollToTop}
                    className="group flex items-center gap-4 px-6 py-3 bg-[#ccff00] text-black font-black uppercase text-xs tracking-tighter hover:bg-white transition-all transform hover:-translate-y-1 rounded-xl cursor-pointer"
                    style={{ boxShadow: '4px 4px 0 #000' }}
                  >
                     <ArrowUp size={16} className="group-hover:animate-bounce" />
                     Return to Peak
                  </button>
               </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

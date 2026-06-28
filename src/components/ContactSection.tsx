"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Cpu, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  FileText, 
  ArrowUpRight, 
  Sparkles,
  Bot
} from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    requestAudit: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`${formData.requestAudit ? '[AUDIT REQUEST] ' : ''}Inquiry from ${formData.name}`);
    const bodyText = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nRequest Free Tech Audit: ${formData.requestAudit ? 'YES' : 'NO'}\n\nMessage:\n${formData.message}`
    );
    
    // Direct Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@abuqitmirlabs.tech&su=${subject}&body=${bodyText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(gmailUrl, '_blank');
    }, 1200);
  };

  return (
    <section id="contact-hub" className="py-24 md:py-36 bg-[#030303] text-white relative overflow-hidden border-t-8 border-black">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,255,0,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#7000ff]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 border border-[#ccff00]/20 px-4 py-2 rounded-full text-[10px] uppercase font-mono tracking-[0.2em] text-[#ccff00] mb-6">
            <Cpu size={12} className="animate-spin text-[#ccff00]" />
            LEAD GENERATION PROTOCOL ACTIVE
          </div>
          
          <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9] text-white">
            Secure Your <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-[#ffff99]">Digital Superiority</span>
          </h2>
          <div className="w-24 h-2 bg-[#ccff00] mt-8 mb-6 rounded-sm"></div>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed lowercase">
            ready to automate operations with autonomous ai or build sub-second speed products? book a call or submit the tactical briefing form below to trigger your launch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Direct Action & Audits */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div className="space-y-8">
              {/* Free Audit Card */}
              <div className="p-8 bg-zinc-950/80 border-4 border-[#ccff00] rounded-2xl relative overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#ccff00]/10 text-[#ccff00] rounded-lg">
                    <Sparkles size={20} />
                  </div>
                  <span className="font-mono text-xs text-[#ccff00] font-black uppercase tracking-widest">[ COMPLIMENTARY SERVICE ]</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">FREE Technical & SEO Audit</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Get a comprehensive, 45-point live audit of your current site&apos;s Core Web Vitals, semantic schema tagging, conversion traps, and search index coverage.
                </p>
                <button
                  onClick={() => setFormData({ ...formData, requestAudit: true })}
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00] uppercase font-black tracking-wider hover:underline"
                >
                  <span>Toggle Audit Form Below</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Direct Connect Elements */}
              <div className="space-y-6">
                <h4 className="font-mono text-xs font-black uppercase tracking-[0.3em] text-zinc-600">[ CONTACT DIRECTORY ]</h4>
                
                {/* Mail Link */}
                <div className="flex items-start gap-4 p-5 bg-zinc-950/40 border-2 border-zinc-800 rounded-xl transition-all">
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block">SEND INTEL EMAIL</span>
                    <a 
                      href="mailto:hello@abuqitmirlabs.tech" 
                      className="font-bold text-white tracking-tight hover:text-[#ccff00] hover:underline"
                    >
                      hello@abuqitmirlabs.tech
                    </a>
                    <a 
                      href="mailto:abuqitmirshirazalmadani@gmail.com" target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-mono text-zinc-400 hover:text-[#ccff00] hover:underline block"
                    >
                      abuqitmirshirazalmadani@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp Link */}
                <a 
                  href="https://wa.me/923233260859" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-5 bg-zinc-950/40 border-2 border-[#25D366]/20 hover:border-[#25D366] rounded-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-[#25D366] block">WHATSAPP ENCRYPTED RELAY</span>
                    <span className="font-bold text-white tracking-tight group-hover:underline">+92 323 3260859</span>
                  </div>
                </a>

                {/* Phone Call Link */}
                <a 
                  href="tel:+923233260859" 
                  className="flex items-center gap-4 p-5 bg-zinc-950/40 border-2 border-zinc-800 rounded-xl hover:border-white transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-[#ccff00]/10 group-hover:text-[#ccff00] transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block">TELEPHONE SUPPORT</span>
                    <span className="font-bold text-white tracking-tight group-hover:underline">+92-323-3260859</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Geographical details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5"><MapPin size={12} /> Karachi, Pakistan</span>
            </div>
          </div>

          {/* Right Column: Interactive Brutalist Form */}
          <div className="lg:col-span-7">
            <div 
              className="bg-zinc-950 border-4 border-white p-8 md:p-10 relative overflow-hidden h-full flex flex-col justify-between"
              style={{ boxShadow: '12px 12px 0 rgba(204,255,0,0.9)' }}
            >
              {/* Form Terminal Header */}
              <div className="flex items-center gap-3 mb-10 pb-4 border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-mono text-xs text-zinc-500 ml-4 tracking-widest">TRANSMISSION_PROTOCOL.EXE</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Form Checkbox for Free Audit Hook */}
                <div className="flex items-start gap-3 p-4 bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-xl relative overflow-hidden group">
                  <input 
                    type="checkbox" 
                    id="requestAudit"
                    checked={formData.requestAudit}
                    onChange={(e) => setFormData({ ...formData, requestAudit: e.target.checked })}
                    className="w-5 h-5 accent-[#ccff00] rounded border-2 border-[#ccff00]/50 bg-transparent mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="requestAudit" className="text-sm font-bold text-white cursor-pointer select-none">
                    Yes! Send me a Compeltely Free Technical, SEO & Performance Audit report of my website.
                  </label>
                </div>

                <div>
                  <label htmlFor="contact-section-name" className="font-mono text-xs text-[#ccff00] mb-3 block tracking-wider">YOUR NAME / ORGANIZATION_</label>
                  <input 
                    id="contact-section-name"
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-6 py-4 text-white font-mono focus:outline-none focus:border-[#ccff00] transition-all rounded-xl" 
                    placeholder="ENTER YOUR NAME..."
                  />
                </div>

                <div>
                  <label htmlFor="contact-section-email" className="font-mono text-xs text-[#ccff00] mb-3 block tracking-wider">YOUR EMAIL ADDRESS_</label>
                  <input 
                    id="contact-section-email"
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-6 py-4 text-white font-mono focus:outline-none focus:border-[#ccff00] transition-all rounded-xl" 
                    placeholder="EMAIL_ADDRESS@DOMAIN.COM"
                  />
                </div>

                <div>
                  <label htmlFor="contact-section-message" className="font-mono text-xs text-[#ccff00] mb-3 block tracking-wider">PROJECT BRIEF / LOGISTICS DETAILS_</label>
                  <textarea 
                    id="contact-section-message"
                    required
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-6 py-4 text-white font-mono focus:outline-none focus:border-[#ccff00] transition-all rounded-xl resize-none" 
                    placeholder="DESCRIBE YOUR GOAL (E.G. LAUNCH AN E-COMMERCE MOBILE APP / REVAMP SEO STRATEGY / DEVELOP AN AUTONOMOUS SUPPORT AGENT)..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className={`w-full px-10 py-6 border-4 font-black uppercase text-lg transition-all duration-300 flex items-center justify-center gap-4 rounded-xl cursor-pointer
                    ${submitted ? 'bg-green-500 border-green-500 text-black' : 'bg-[#ccff00] border-black text-black hover:bg-white hover:text-black hover:border-white'}`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <Cpu className="animate-spin" />
                        TRANSMITTING BATTLE PLAN...
                      </motion.div>
                    ) : submitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3"
                      >
                        <ShieldCheck />
                        TRANSMISSION SECURED IN GMAIL
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ready"
                        className="flex items-center gap-3"
                      >
                        <Send size={20} />
                        DEPLOY TACTICAL BRIEFING
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

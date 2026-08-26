import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube,
  ArrowUp,
  Monitor,
  Terminal as TerminalIcon,
  Cpu,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Smartphone,
  Pin,
  HelpCircle,
  Briefcase,
  Award,
  ChevronRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ObfuscatedEmail from '../components/ObfuscatedEmail';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../lib/firebase';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Persist inquiry to Firestore
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
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

    const subject = encodeURIComponent(`New Inquiry from ${formData.name}`);
    const bodyText = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    // Direct Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@abuqitmirlabs.tech&su=${subject}&body=${bodyText}`;

    // Complete processing
    setIsSubmitting(false);
    setSubmitted(true);
    // Open Gmail directly
    window.open(gmailUrl, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-[#E8E8ED] font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00]/30 selection:text-black">
      <Helmet>
        <title>Contact Us | Free Project Quote &amp; Consultation | AbuQitmirLabs</title>
        <meta name="description" content="Contact AbuQitmirLabs for a free project quote. Get a free technical consultation and digital audit. Build custom software, mobile apps, AI agents, and web solutions." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Free Project Quote &amp; Consultation | AbuQitmirLabs" />
        <meta property="og:description" content="Contact AbuQitmirLabs for a free project quote. Get a free technical consultation and digital audit. Build custom software, mobile apps, AI agents, and web solutions." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/logo.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Free Project Quote &amp; Consultation | AbuQitmirLabs" />
        <meta name="twitter:description" content="Contact AbuQitmirLabs for a free project quote. Get a free technical consultation and digital audit. Build custom software, mobile apps, AI agents, and web solutions." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/logo.png" />
        
        {/* Schema Markup */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.abuqitmirlabs.tech"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact",
                  "item": "https://www.abuqitmirlabs.tech/contact"
                }
              ]
            })
          }}
        ></script>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact AbuQitmirLabs",
              "description": "Get in touch for custom software development, AI agent consultation, and mobile app inquiries.",
              "mainEntity": {
                "@type": "Organization",
                "name": "AbuQitmirLabs",
                "telephone": "+923233260859",
                "email": "abuqitmirshirazalmadani@gmail.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+923233260859",
                  "contactType": "customer service"
                }
              }
            })
          }}
        ></script>
      </Helmet>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-5" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,255,0,0.05) 2px, rgba(204,255,0,0.05) 4px)' }}></div>
      
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[url('/noise.svg')] blend-overlay"></div>
 
      <Header />
      <Breadcrumbs />
 
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-24 text-center">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#ccff00]/10 border border-[#ccff00]/30 px-4 py-2 text-[10px] uppercase font-mono tracking-[0.2em] text-[#ccff00] mb-10"
             >
                <Cpu size={14} className="animate-pulse" />
                Connectivity Established
             </motion.div>
             
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-white uppercase mb-8"
             >
                Contact App Developer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ccff00]">| Get Free Project Quote</span>
             </motion.h1>
             <div className="w-32 h-2 bg-[#ccff00] mx-auto mb-12 shadow-[0_0_20px_rgba(204,255,0,0.5)]"></div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Terminal Style Form */}
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-black border-4 border-[#ccff00] p-8 relative overflow-hidden group rounded-2xl"
               style={{ boxShadow: '12px 12px 0 rgba(204,255,0,0.9)' }}
            >
               {/* Terminal Header */}
               <div className="flex items-center gap-2 mb-8 pb-4 border-b-2 border-[#ccff00]/30">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ccff00]"></div>
                  <span className="font-mono text-xs ml-4 text-[#ccff00] tracking-widest">CONTACT_PROTOCOL.SYS</span>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div>
                     <label htmlFor="contact-page-name" className="font-mono text-xs text-[#ccff00] mb-3 block tracking-widest">USER_ID / NAME_</label>
                     <input 
                        id="contact-page-name"
                        name="name"
                        autoComplete="name"
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-6 py-4 text-white font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl" 
                        placeholder="IDENTIFY YOURSELF..."
                     />
                  </div>
                  <div>
                     <label htmlFor="contact-page-email" className="font-mono text-xs text-[#ccff00] mb-3 block tracking-widest">COMMUNICATION_RELAY / EMAIL_</label>
                     <input 
                        id="contact-page-email"
                        name="email"
                        autoComplete="email"
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-6 py-4 text-white font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl" 
                        placeholder="SECURE RELAY ADDRESS..."
                     />
                  </div>
                  <div>
                     <label htmlFor="contact-page-message" className="font-mono text-xs text-[#ccff00] mb-3 block tracking-widest">TRANSMISSION_PAYLOAD / MESSAGE_</label>
                     <textarea 
                        id="contact-page-message"
                        name="message"
                        autoComplete="off"
                        required
                        rows={6} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-zinc-900/60 border-2 border-zinc-800 px-6 py-4 text-white font-mono focus:outline-none focus:border-[#ccff00] transition-all hover:bg-zinc-900 rounded-xl resize-none" 
                        placeholder="DECODE YOUR THOUGHTS..."
                     ></textarea>
                  </div>
                  <button 
                     type="submit" 
                     disabled={isSubmitting || submitted}
                     className={`w-full px-10 py-6 font-black text-xl border-4 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden group rounded-xl cursor-pointer
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
                               PROCESSING...
                           </motion.div>
                        ) : submitted ? (
                           <motion.div
                              key="success"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-3 !text-black font-black"
                           >
                               <ShieldCheck className="!text-black" />
                               TRANSMISSION SUCCESSFUL
                           </motion.div>
                        ) : (
                           <motion.div
                              key="initial"
                              className="flex items-center gap-3 !text-black font-black"
                           >
                               <Send size={24} className="!text-black" />
                               INITIATE TRANSMISSION
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </button>
               </form>

               {/* Terminal Output */}
               <div className="mt-8 pt-6 border-t-2 border-[#ccff00]/20 font-mono text-[10px] space-y-2">
                  <p className="text-[#ccff00]/70">&gt; STATUS: STANDBY</p>
                  <p className="text-[#ccff00]/70">&gt; ENCRYPTION: AES-256 ACTIVE</p>
                  <p className="text-[#ccff00]">&gt; {submitted ? 'READY FOR NEXT INPUT' : 'AWAITING USER INPUT'}<span className="animate-pulse">_</span></p>
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
                     <p className="font-mono text-xs text-[#ccff00] mb-4 tracking-[0.4em] uppercase">Communication_Relays</p>
                     <div className="space-y-6">
                        <div className="flex items-center gap-6 group/item">
                           <div className="w-16 h-16 bg-[#ccff00]/5 border-2 border-[#ccff00]/20 flex items-center justify-center group-hover/item:border-[#ccff00] group-hover/item:bg-[#ccff00]/10 transition-all shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded-xl">
                              <Mail className="text-[#ccff00]" size={28} />
                           </div>
                           <div>
                              <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">Email Protocol</p>
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
                                 <p className="text-[#ccff00]/50 font-mono text-[9px] uppercase tracking-tighter">Direct Relay Enabled &bull; Updated: August 2026</p>
                              </div>
                           </div>
                        </div>
                        <a 
                           href="https://wa.me/923233260859" 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-6 group/item"
                        >
                           <div className="w-16 h-16 bg-[#25D366]/10 border-2 border-[#25D366]/30 flex items-center justify-center group-hover/item:border-[#25D366] group-hover/item:bg-[#25D366]/20 transition-all rounded-xl">
                               <MessageCircle className="text-[#25D366]" size={28} />
                           </div>
                           <div>
                              <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">WhatsApp Relay</p>
                              <p className="text-zinc-400 font-mono text-xs group-hover/item:text-[#25D366] transition-colors">+92-323-3260859 (Direct Chat)</p>
                           </div>
                        </a>
                        <a 
                           href="https://www.google.com/search?q=AbuQitmirLabs.Tech&stick=H4sIAAAAAAAA_-NgU1I1qEg0SUwyMkw2MzIySUkyTba0MqhITUtOMUgztzRLTTM2TjI3XMQq5JhUGphZkptZ5JOYVKwXkpqcAQAWzgp1PgAAAA&hl=en&mat=CZLYxD3dn4-XElYBTVDHnmXmYtE_z1-ukd4W15_4xSOvjTxlQ1o8WZE3DhyScxz25ZkTwHN99aYAJPksPmWrBMFOl-sP_YDLnxLlKt51TeOkcb_wt2bWebGPkDFcieVKmA&authuser=0" 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-6 group/item"
                        >
                           <div className="w-16 h-16 bg-[#ccff00]/5 border-2 border-[#ccff00]/20 flex items-center justify-center group-hover/item:border-[#ccff00] transition-all rounded-xl">
                               <MapPin className="text-[#ccff00]" size={28} />
                           </div>
                           <div>
                              <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">Base Coordinates</p>
                              <p className="text-zinc-400 font-sans text-xs leading-relaxed max-w-sm">8/15, 37/A 3, Area Shah Khalid Colony Sector 37 A Landhi Town, 75160, Karachi, Pakistan</p>
                           </div>
                        </a>
                     </div>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                     <p className="font-mono text-xs text-[#ccff00] mb-8 tracking-[0.4em] uppercase">Social_Matrix</p>
                     <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-3">
                        {[
                           { icon: <Facebook />, color: 'hover:bg-[#1877F2]', href: "https://www.facebook.com/profile.php?id=61583768706452" },
                           { icon: <MapPin />, color: 'hover:bg-[#4285F4]', href: "https://www.google.com/search?q=AbuQitmirLabs.Tech&stick=H4sIAAAAAAAA_-NgU1I1qEg0SUwyMkw2MzIySUkyTba0MqhITUtOMUgztzRLTTM2TjI3XMQq5JhUGphZkptZ5JOYVKwXkpqcAQAWzgp1PgAAAA&hl=en&mat=CZLYxD3dn4-XElYBTVDHnmXmYtE_z1-ukd4W15_4xSOvjTxlQ1o8WZE3DhyScxz25ZkTwHN99aYAJPksPmWrBMFOl-sP_YDLnxLlKt51TeOkcb_wt2bWebGPkDFcieVKmA&authuser=0" },
                           { icon: <Instagram />, color: 'hover:bg-[#E4405F]', href: "https://www.instagram.com/abuqitmirshirazalmadani/" },
                           { icon: <Youtube />, color: 'hover:bg-[#FF0000]', href: "https://www.youtube.com/@AbuQitmir" },
                           { icon: <Linkedin />, color: 'hover:bg-[#0A66C2]', href: "https://www.linkedin.com/in/abu-qitmir-697423390/" },
                           { icon: <Twitter />, color: 'hover:bg-[#1DA1F2]', href: "https://x.com/AbuQitmir" },
                           { icon: <Smartphone />, color: 'hover:bg-[#FF0050]', href: "https://www.tiktok.com/@abuqitmirmohammadshiraz" },
                           { icon: <Pin />, color: 'hover:bg-[#E60023]', href: "https://www.pinterest.com/abuqitmir" },
                           { icon: <HelpCircle />, color: 'hover:bg-[#B92B27]', href: "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani" },
                           { icon: <Briefcase />, color: 'hover:bg-[#0F82C4]', href: "https://www.goodfirms.co/company/abuqitmirlabs-tech" },
                           { icon: <Award />, color: 'hover:bg-[#D41058]', href: "https://clutch.co/profile/abuqitmirlabstech?_gl=1*1notqlc*_gcl_au*Nzg0MzYyMjI0LjE3Nzg1MzM3NjkuMjA3OTQ5MjcxNC4xNzc4NTMzODc1LjE3Nzg1MzQzNTA.*FPAU*Nzg0MzYyMjI0LjE3Nzg1MzM3Njk.*_ga*NzczMDM5MTg3LjE3Nzg1MzM3Njk.*_ga_D0WFGX8X3V*czE3ODIzMzYxNTAkbzUkZzEkdDE3ODIzMzYxNTAkbzUkZzEkdDE3ODIzMzYxODEkajI5JGwwJGgxMDQ0NTQyMjU.*_fplc*TnJmYjRHNWsxYTk2R1olMkZZOVVyd2VMU21OUjZiQ1RkRyUyRk1uVjMlMkJSb2JDMkh4RjVFNFBnbmFHeWNDWmZjTWY1YzhMJTJGdXpoZ0VYQWo0bDlHbHRUQzFHcHc3d3JSUndXck5VWEtBRGhWTHN1c2VuOGg4dkgzN1Vha2EzM2xNTlElM0QlM0Q." }
                        ].map((social, i) => (
                           <a 
                              key={i} 
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full aspect-square bg-[#ccff00]/5 border-2 border-[#ccff00]/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:border-transparent hover:scale-110 ${social.color} hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]`}
                           >
                               {React.cloneElement(social.icon as React.ReactElement<any>, { size: 24 })}
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

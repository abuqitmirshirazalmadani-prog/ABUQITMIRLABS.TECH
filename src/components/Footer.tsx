"use client";

import React from 'react';
import { motion } from 'motion/react';
import { 
    Rocket, 
    Mail, 
    Phone, 
    Linkedin, 
    Twitter, 
    Github, 
    Facebook, 
    Instagram, 
    Youtube,
    MapPin,
    Star,
    ArrowRight,
    ExternalLink,
    MessageCircle,
    Pin,
    HelpCircle,
    Briefcase,
    Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import { MagicText } from './ui/magic-text';
import { AnimatedBreathingText } from './ui/animated-breathing-text';
import { preloadRoute } from '../utils/preloader';

const Footer = () => {
    return (
        <section id="contact" className="bg-[#ccff00] border-t-[8px] border-black w-full py-24 relative overflow-hidden text-black font-display">
            {/* Schema Markup LocalBusiness */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "AbuQitmirLabs",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "8/15, 37A Rd, Shah Khalid Colony, Sector 37A",
                            "addressLocality": "Landhi Town, Karachi",
                            "postalCode": "75160",
                            "addressCountry": "PK"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 24.842681712798612,
                            "longitude": 67.1862014846566
                        }
                    })
                }}
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Top Label */}
                <div className="flex items-center justify-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] border-2 border-black rounded-full px-4 py-1.5 text-black font-black bg-white/10"
                    >
                        <Rocket className="h-4 w-4" />
                        Start Your Transformation
                    </motion.span>
                </div>

                {/* Main Heading Area */}
                <div className="text-center max-w-4xl mt-12 mx-auto">
                    <AnimatedShinyText 
                        text="Ready to Dominate Your Digital Landscape?" 
                        textClassName="md:text-8xl text-5xl text-black"
                    />
                    
                    <MagicText 
                        text="The digital landscape waits for no one. Stop settling for mediocre solutions that drain your budget without delivering ROI. Partner with AbuQitmirLabs to build secure, fast, and highly intelligent digital assets that propel your business forward."
                        className="mt-10 text-xl md:text-2xl text-black max-w-3xl mx-auto leading-tight font-bold lowercase"
                    />
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="mt-6 text-black font-black text-sm uppercase tracking-widest bg-white/20 inline-block px-4 py-2 border-2 border-black rounded-lg"
                    >
                        Let's discuss your next big project. Our initial technical consultation and digital audit are completely free.
                    </motion.p>

                    {/* CTA Button */}
                    <div className="relative inline-block group mt-12">
                        <Link 
                            to="/contact"
                            className="relative z-10 px-10 py-6 bg-black text-[#ccff00] font-black text-2xl rounded-2xl brutalist-shadow border-4 border-black flex items-center gap-4 transition-all duration-300 uppercase tracking-tighter hover:bg-white hover:text-black hover:scale-105 active:scale-95"
                            style={{ color: '#ccff00' }}
                        >
                            <span className="text-[#ccff00] font-black group-hover:text-black transition-colors" style={{ color: 'inherit' }}>Start Your Project</span>
                            <ArrowRight className="w-8 h-8 text-[#ccff00] group-hover:text-black transition-colors" style={{ color: 'inherit' }} />
                        </Link>
                    </div>

                    {/* Contact info Bar */}
                    <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-lg text-black border-y-4 border-black py-10 font-black uppercase tracking-tighter">
                        <div className="flex flex-col items-center gap-1 group">
                            <div className="flex flex-col items-center gap-1">
                                <a 
                                    href="mailto:hello@abuqitmirlabs.tech" 
                                    className="hover:underline transition items-center gap-2 flex normal-case font-mono font-medium tracking-tight text-base"
                                >
                                    <Mail className="h-5 w-5 shrink-0" />
                                    hello@abuqitmirlabs.tech
                                </a>
                                <a 
                                    href="mailto:abuqitmirshirazalmadani@gmail.com" target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline transition items-center gap-2 flex normal-case font-mono font-medium tracking-tight text-sm text-zinc-700"
                                >
                                    abuqitmirshirazalmadani@gmail.com
                                </a>
                            </div>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">Connect via Email</p>
                        </div>
                        <span className="hidden md:block h-6 w-1 bg-black"></span>
                        <a href="https://wa.me/923233260859" target="_blank" rel="noopener noreferrer" className="group hover:underline transition flex items-center gap-2">
                            <MessageCircle className="h-6 w-6" />
                            <span className="normal-case font-mono font-medium tracking-tight text-base">+92-323-3260859</span> <span className="text-xs tracking-wider normal-case">(Tap to Chat)</span>
                        </a>
                    </div>
                </div>

                {/* Footer Bottom */}
                <footer role="contentinfo" aria-label="Site Footer" className="pt-20">
                    <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                        {/* Brand */}
                        <div className="flex flex-col gap-2 origin-left">
                            <Logo />
                            <p className="text-[10px] text-black font-black mt-2 uppercase tracking-[0.2em]">POWERED BY ADVANCED AI TECHNOLOGY</p>
                        </div>

                        {/* Socials */}
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 max-w-full md:max-w-3xl">
                            {[
                                { name: "Facebook", label: "Visit AbuQitmirLabs on Facebook", icon: <Facebook className="w-6 h-6 outline-none" />, href: "https://www.facebook.com/profile.php?id=61583768706452" },
                                { name: "Google Reviews", label: "View AbuQitmirLabs Google Reviews", icon: <Star className="w-6 h-6 fill-[#ccff00]" />, href: "https://www.google.com/search?q=ABUQITMIRLABS.TECH&hl=en#lrd=0x3eb33ba408e04b4d:0xc40a6b7e6b772099,1,,,," },
                                { name: "Google Maps", label: "Find AbuQitmirLabs on Google Maps", icon: <MapPin className="w-6 h-6" />, href: "https://www.google.com/search?q=AbuQitmirLabs.Tech&stick=H4sIAAAAAAAA_-NgU1I1qEg0SUwyMkw2MzIySUkyTba0MqhITUtOMUgztzRLTTM2TjI3XMQq5JhUGphZkptZ5JOYVKwXkpqcAQAWzgp1PgAAAA&hl=en&mat=CZLYxD3dn4-XElYBTVDHnmXmYtE_z1-ukd4W15_4xSOvjTxlQ1o8WZE3DhyScxz25ZkTwHN99aYAJPksPmWrBMFOl-sP_YDLnxLlKt51TeOkcb_wt2bWebGPkDFcieVKmA&authuser=0" },
                                { name: "Instagram", label: "Visit AbuQitmirLabs on Instagram", icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/abuqitmirshirazalmadani/" },
                                { name: "YouTube", label: "Watch AbuQitmirLabs on YouTube", icon: <Youtube className="w-6 h-6" />, href: "https://www.youtube.com/@AbuQitmir" },
                                { name: "LinkedIn", label: "Connect with AbuQitmirLabs on LinkedIn", icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/abu-qitmir-697423390/" },
                                { name: "Twitter", label: "Follow AbuQitmirLabs on Twitter", icon: <Twitter className="w-6 h-6" />, href: "https://x.com/AbuQitmir" },
                                { name: "Pinterest", label: "View AbuQitmirLabs on Pinterest", icon: <Pin className="w-6 h-6" />, href: "https://www.pinterest.com/abuqitmir" },
                                { name: "Quora", label: "Visit AbuQitmirLabs on Quora", icon: <HelpCircle className="w-6 h-6" />, href: "https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani" },
                                { name: "GoodFirms", label: "View AbuQitmirLabs profile on GoodFirms", icon: <Briefcase className="w-6 h-6" />, href: "https://www.goodfirms.co/company/abuqitmirlabs-tech" },
                                { name: "Clutch", label: "View AbuQitmirLabs profile on Clutch", icon: <Award className="w-6 h-6" />, href: "https://clutch.co/profile/abuqitmirlabstech?_gl=1*1notqlc*_gcl_au*Nzg0MzYyMjI0LjE3Nzg1MzM3NjkuMjA3OTQ5MjcxNC4xNzc4NTMzODc1LjE3Nzg1MzQzNTA.*FPAU*Nzg0MzYyMjI0LjE3Nzg1MzM3Njk.*_ga*NzczMDM5MTg3LjE3Nzg1MzM3Njk.*_ga_D0WFGX8X3V*czE3ODIzMzYxNTAkbzUkZzEkdDE3ODIzMzYxNTAkbzUkZzEkdDE3ODIzMzYxODEkajI5JGwwJGgxMDQ0NTQyMjU.*_fplc*TnJmYjRHNWsxYTk2R1olMkZZOVVyd2VMU21OUjZiQ1RkRyUyRk1uVjMlMkJSb2JDMkh4RjVFNFBnbmFHeWNDWmZjTWY1YzhMJTJGdXpoZ0VYQWo0bDlHbHRUQzFHcHc3d3JSUndXck5VWEtBRGhWTHN1c2VuOGg4dkgzN1Vha2EzM2xNTlElM0QlM0Q." }
                            ].map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.href} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-12 h-12 rounded-2xl border-4 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-[#ccff00] transition-all brutalist-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Secondary Nav Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 pt-12 border-t-4 border-black uppercase text-xs font-black tracking-widest leading-relaxed">
                        
                        {/* Column 1: Core Services */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Core Services</h3>
                            <ul className="space-y-3">
                                <li><Link to="/custom-software" onMouseEnter={() => preloadRoute('/custom-software')} onTouchStart={() => preloadRoute('/custom-software')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Custom Software Dev</Link></li>
                                <li><Link to="/mobile-app-development" onMouseEnter={() => preloadRoute('/mobile-app-development')} onTouchStart={() => preloadRoute('/mobile-app-development')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Mobile App Development</Link></li>
                                <li><Link to="/web-development" onMouseEnter={() => preloadRoute('/web-development')} onTouchStart={() => preloadRoute('/web-development')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">High-Performance Web</Link></li>
                                <li><Link to="/ai-agent-development" onMouseEnter={() => preloadRoute('/ai-agent-development')} onTouchStart={() => preloadRoute('/ai-agent-development')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">AI Agent Automations</Link></li>
                                <li><Link to="/seo-mastery" onMouseEnter={() => preloadRoute('/seo-mastery')} onTouchStart={() => preloadRoute('/seo-mastery')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">SEO Mastery</Link></li>
                                <li><Link to="/graphics-design" onMouseEnter={() => preloadRoute('/graphics-design')} onTouchStart={() => preloadRoute('/graphics-design')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Branding &amp; Graphics</Link></li>
                                <li><Link to="/content-writing" onMouseEnter={() => preloadRoute('/content-writing')} onTouchStart={() => preloadRoute('/content-writing')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Technical Content</Link></li>
                            </ul>
                        </div>

                        {/* Column 2: Global Markets */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Target Markets</h3>
                            <ul className="space-y-3">
                                <li><Link to="/us-market" onMouseEnter={() => preloadRoute('/us-market')} onTouchStart={() => preloadRoute('/us-market')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">United States (US)</Link></li>
                                <li><Link to="/uk-market" onMouseEnter={() => preloadRoute('/uk-market')} onTouchStart={() => preloadRoute('/uk-market')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">United Kingdom (UK)</Link></li>
                                <li><Link to="/canada-market" onMouseEnter={() => preloadRoute('/canada-market')} onTouchStart={() => preloadRoute('/canada-market')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Canada (CA)</Link></li>
                                <li><Link to="/poland-market" onMouseEnter={() => preloadRoute('/poland-market')} onTouchStart={() => preloadRoute('/poland-market')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Poland (PL)</Link></li>
                                <li><Link to="/australia-market" onMouseEnter={() => preloadRoute('/australia-market')} onTouchStart={() => preloadRoute('/australia-market')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Australia (AU)</Link></li>
                                <li><Link to="/pakistan-market" onMouseEnter={() => preloadRoute('/pakistan-market')} onTouchStart={() => preloadRoute('/pakistan-market')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Pakistan (PK)</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Legal & Sitemaps */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Legal &amp; Sitemaps</h3>
                            <ul className="space-y-3">
                                <li><Link to="/privacy" onMouseEnter={() => preloadRoute('/privacy')} onTouchStart={() => preloadRoute('/privacy')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Privacy Policy</Link></li>
                                <li><Link to="/terms" onMouseEnter={() => preloadRoute('/terms')} onTouchStart={() => preloadRoute('/terms')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Terms of Service</Link></li>
                                <li><Link to="/blog" onMouseEnter={() => preloadRoute('/blog')} onTouchStart={() => preloadRoute('/blog')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Tech Blog</Link></li>
                                <li><Link to="/case-studies" onMouseEnter={() => preloadRoute('/case-studies')} onTouchStart={() => preloadRoute('/case-studies')} className="text-black font-extrabold hover:underline hover:opacity-80 transition-all">Case Studies</Link></li>
                                <li><a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="text-black font-extrabold hover:underline hover:opacity-80 transition-all flex items-center gap-1">RSS News Feed <ExternalLink size={10} className="text-black" /></a></li>
                                <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-black font-extrabold hover:underline hover:opacity-80 transition-all flex items-center gap-1">Dynamic Sitemap <ExternalLink size={10} className="text-black" /></a></li>
                                <li><a href="/pages-sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-black font-extrabold hover:underline hover:opacity-80 transition-all flex items-center gap-1">Pages Index <ExternalLink size={10} className="text-black" /></a></li>
                                <li><a href="/image-sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-black font-extrabold hover:underline hover:opacity-80 transition-all flex items-center gap-1">Image Asset Index <ExternalLink size={10} className="text-black" /></a></li>
                                <li><a href="/video-sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-black font-extrabold hover:underline hover:opacity-80 transition-all flex items-center gap-1">Video Index <ExternalLink size={10} className="text-black" /></a></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact & Access */}
                        <div className="space-y-4" itemScope itemType="https://schema.org/LocalBusiness">
                            <span itemProp="name" className="hidden">AbuQitmirLabs</span>
                            <h3 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Headquarters Info</h3>
                            <ul className="space-y-3 not-italic normal-case font-bold tracking-tight text-black flex flex-col gap-1.5 list-none">
                                <li className="flex items-start gap-2 text-xs" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                    <MapPin size={14} className="min-w-[14px] mt-0.5 text-black" />
                                    <span className="text-black font-bold">
                                        <span itemProp="streetAddress">8/15, 3 37A Rd, Shah Khalid Colony, Sector 37A</span>, <br />
                                        <span itemProp="addressLocality">Landhi Town, Karachi</span>, <br />
                                        <span itemProp="postalCode">75160</span>, <span itemProp="addressCountry">Pakistan</span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-2 text-xs">
                                    <Phone size={14} className="min-w-[14px] mt-0.5 text-black" />
                                    <span itemProp="telephone" className="text-black font-black">+92 323 3260859</span>
                                </li>
                                <li className="flex flex-col gap-1 text-xs">
                                    <div className="flex items-start gap-2">
                                        <Mail size={14} className="min-w-[14px] mt-0.5 text-black" />
                                        <a href="mailto:hello@abuqitmirlabs.tech" className="break-all font-mono font-black text-xs text-black normal-case hover:underline">hello@abuqitmirlabs.tech</a>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="min-w-[14px]" />
                                        <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="break-all font-mono font-bold text-[10px] text-black/90 normal-case hover:underline">abuqitmirshirazalmadani@gmail.com</a>
                                    </div>
                                </li>
                            </ul>
                            <div className="pt-4 flex flex-col gap-3">
                                <button 
                                    onClick={() => window.location.href = '/admin'}
                                    className="px-4 py-3 bg-black text-[#ccff00] rounded-xl hover:bg-zinc-800 transition-all font-black text-[10px] brutalist-shadow border-2 border-black cursor-pointer uppercase tracking-widest self-start w-full"
                                >
                                    ADMIN ACCESS SYSTEM
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Technical Core & Copyright footer bottom info */}
                    <div className="mt-16 pt-8 border-t-2 border-black/10 flex flex-col lg:flex-row items-center justify-between gap-6 uppercase text-[10px] font-black tracking-widest text-black/60">
                        <div className="max-w-xl text-center lg:text-left leading-relaxed">
                            Expertise Core: LLMOps, Generative AI Agents, Flutter & React Native Architecture, Cloud-Native SaaS, Headless Commerce, Semantic Entity SEO, and High-ROI Technical Content Strategy.
                        </div>
                        <div className="flex flex-col lg:items-end gap-2 text-center lg:text-right text-black font-black">
                            <div className="flex items-center justify-center lg:justify-end gap-3">
                                <a href="https://www.google.com/search?q=AbuQitmirLabs.Tech" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                                    <ExternalLink size={10} /> Find us on Google Maps
                                </a>
                                <span>•</span>
                                <span>Headquarters: 8/15, abuqitmirlabs.tech, 3 37A Rd, Shah Khalid Colony Sector 37 A Landhi Town, Karachi, 75160</span>
                            </div>
                            <div className="mt-1">
                                © 2026 AbuQitmirLabs. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Footer;


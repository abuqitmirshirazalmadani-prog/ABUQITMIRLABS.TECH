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
    MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import { MagicText } from './ui/magic-text';
import { AnimatedBreathingText } from './ui/animated-breathing-text';

const Footer = () => {
    return (
        <section id="contact" className="bg-[#ccff00] border-t-[8px] border-black w-full py-24 relative overflow-hidden text-black font-display">
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
                        text="The digital landscape waits for no one. Stop settling for mediocre solutions that drain your budget without delivering ROI. Partner with ABUQITMIRLABS.TECH to build secure, fast, and highly intelligent digital assets that propel your business forward."
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
                            className="relative z-10 px-10 py-6 bg-black text-[#ccff00] font-black text-2xl rounded-2xl brutalist-shadow border-4 border-black flex items-center gap-4 transition-transform uppercase tracking-tighter hover:bg-[#ccff00] hover:text-black"
                        >
                            Start Your Project
                            <ArrowRight className="w-8 h-8" />
                        </Link>
                    </div>

                    {/* Contact info Bar */}
                    <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-lg text-black border-y-4 border-black py-10 font-black uppercase tracking-tighter">
                        <div className="flex flex-col items-center gap-2 group">
                            <a 
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=abuqitmirshirazalmadani@gmail.com" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline transition items-center gap-2 flex normal-case font-mono font-medium tracking-tight text-base"
                            >
                                <Mail className="h-6 w-6" />
                                abuqitmirshirazalmadani@gmail.com
                            </a>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Connect via Gmail</p>
                        </div>
                        <span className="hidden md:block h-6 w-1 bg-black"></span>
                        <a href="https://wa.me/923233260859" target="_blank" rel="noreferrer" className="group hover:underline transition flex items-center gap-2">
                            <MessageCircle className="h-6 w-6" />
                            <span className="normal-case font-mono font-medium tracking-tight text-base">+92-323-3260859</span> <span className="text-xs tracking-wider normal-case">(Tap to Chat)</span>
                        </a>
                    </div>
                </div>

                {/* Footer Bottom */}
                <footer className="pt-20">
                    <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                        {/* Brand */}
                        <div className="flex flex-col gap-2 origin-left">
                            <Logo />
                            <p className="text-[10px] text-black font-black mt-2 uppercase tracking-[0.2em]">POWERED BY ADVANCED AI TECHNOLOGY</p>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center gap-4">
                            {[
                                { icon: <Facebook className="w-6 h-6 outline-none" />, href: "https://www.facebook.com/profile.php?id=61583768706452" },
                                { icon: <Star className="w-6 h-6 fill-[#ccff00]" />, href: "https://www.google.com/search?q=ABUQITMIRLABS.TECH&hl=en#lrd=0x3eb33ba408e04b4d:0xc40a6b7e6b772099,1,,,," },
                                { icon: <MapPin className="w-6 h-6" />, href: "https://www.google.com/search?q=AbuQitmirLabs.Tech&stick=H4sIAAAAAAAA_-NgU1I1qEg0SUwyMkw2MzIySUkyTba0MqhITUtOMUgztzRLTTM2TjI3XMQq5JhUGphZkptZ5JOYVKwXkpqcAQAWzgp1PgAAAA&hl=en&mat=CZLYxD3dn4-XElYBTVDHnmXmYtE_z1-ukd4W15_4xSOvjTxlQ1o8WZE3DhyScxz25ZkTwHN99aYAJPksPmWrBMFOl-sP_YDLnxLlKt51TeOkcb_wt2bWebGPkDFcieVKmA&authuser=0" },
                                { icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/abuqitmirshirazalmadani/" },
                                { icon: <Youtube className="w-6 h-6" />, href: "https://www.youtube.com/@AbuQitmir" },
                                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/abu-qitmir-697423390/" },
                                { icon: <Twitter className="w-6 h-6" />, href: "https://x.com/AbuQitmir" }
                            ].map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.href} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-2xl border-4 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-[#ccff00] transition-all brutalist-shadow"
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
                            <h4 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Core Services</h4>
                            <ul className="space-y-3">
                                <li><Link to="/custom-software" className="hover:underline hover:text-white transition-colors">Custom Software Dev</Link></li>
                                <li><Link to="/mobile-app-development" className="hover:underline hover:text-white transition-colors">Mobile App Dev</Link></li>
                                <li><Link to="/web-development" className="hover:underline hover:text-white transition-colors">High-Performance Web</Link></li>
                                <li><Link to="/ai-agent-development" className="hover:underline hover:text-white transition-colors">AI Agent Automations</Link></li>
                                <li><Link to="/seo-mastery" className="hover:underline hover:text-white transition-colors">SEO Mastery</Link></li>
                                <li><Link to="/graphics-design" className="hover:underline hover:text-white transition-colors">Branding & Graphics</Link></li>
                                <li><Link to="/content-writing" className="hover:underline hover:text-white transition-colors">Technical Content</Link></li>
                            </ul>
                        </div>

                        {/* Column 2: Global Markets */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Target Markets</h4>
                            <ul className="space-y-3">
                                <li><Link to="/us-market" className="hover:underline hover:text-white transition-colors">United States (US)</Link></li>
                                <li><Link to="/uk-market" className="hover:underline hover:text-white transition-colors">United Kingdom (UK)</Link></li>
                                <li><Link to="/canada-market" className="hover:underline hover:text-white transition-colors">Canada (CA)</Link></li>
                                <li><Link to="/poland-market" className="hover:underline hover:text-white transition-colors">Poland (PL)</Link></li>
                                <li><Link to="/australia-market" className="hover:underline hover:text-white transition-colors">Australia (AU)</Link></li>
                                <li><Link to="/pakistan-market" className="hover:underline hover:text-white transition-colors">Pakistan (PK)</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Legal & Sitemaps */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Legal & Sitemaps</h4>
                            <ul className="space-y-3">
                                <li><Link to="/privacy" className="hover:underline hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:underline hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link to="/blog" className="hover:underline hover:text-white transition-colors">Tech Blog</Link></li>
                                <li><Link to="/case-studies" className="hover:underline hover:text-white transition-colors">Case Studies</Link></li>
                                <li><a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors flex items-center gap-1">RSS News Feed <ExternalLink size={10} /></a></li>
                                <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors flex items-center gap-1">Dynamic Sitemap <ExternalLink size={10} /></a></li>
                                <li><a href="/pages-sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors flex items-center gap-1">Pages Index <ExternalLink size={10} /></a></li>
                                <li><a href="/image-sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors flex items-center gap-1">Image Asset Index <ExternalLink size={10} /></a></li>
                                <li><a href="/video-sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-colors flex items-center gap-1">Video Index <ExternalLink size={10} /></a></li>
                            </ul>
                        </div>

                        {/* Column 4: Contact & Access */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-black text-black border-b-2 border-black pb-2 mb-4 tracking-wider">Headquarters Info</h4>
                            <ul className="space-y-3 not-italic normal-case font-bold tracking-tight text-black flex flex-col gap-1.5 list-none">
                                <li className="flex items-start gap-2 text-xs">
                                    <MapPin size={14} className="min-w-[14px] mt-0.5 text-zinc-900" />
                                    <span>8/15, shah khalid colony, landhi town, karachi, pk</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs">
                                    <Phone size={14} className="min-w-[14px] mt-0.5 text-zinc-900" />
                                    <span>+92 323 3260859</span>
                                </li>
                                <li className="flex items-start gap-2 text-xs">
                                    <Mail size={14} className="min-w-[14px] mt-0.5 text-zinc-900" />
                                    <span className="break-all font-mono font-black text-[10px] normal-case">shiraz@abuqitmirlabs.tech</span>
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
                                <span>Headquarters: Karachi, PK • Dubai, AE • London, UK</span>
                            </div>
                            <div className="mt-1">
                                © 2026 ABUQITMIRLABS.TECH. All rights reserved. Developed by AbuQitmirLabs.tech
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Footer;


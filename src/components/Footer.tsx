"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { preloadRoute } from '../utils/preloader';
import ObfuscatedEmail from './ObfuscatedEmail';
import NewsletterSubscriptionForm from './NewsletterSubscriptionForm';

const Footer = () => {
    return (
        <footer id="contact" role="contentinfo" aria-label="Site Footer" className="bg-[#ccff00] border-t-[6px] border-black w-full py-16 relative overflow-hidden text-black font-display">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="inline-block text-xs uppercase tracking-widest border-2 border-black rounded-full px-4 py-1 text-black font-black bg-white/20">
                        Start Your Project Today.
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black text-black mt-4 tracking-tight">
                        Ready to Build Your Next Software or AI System?
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-black font-medium leading-relaxed">
                        Work with AbuQitmirLabs to build fast web apps, smart AI agents, and steady search traffic. Your first 30-minute technical call and site audit are free.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-[#ccff00] font-black text-lg rounded-xl border-2 border-black uppercase hover:bg-white hover:text-black transition-all"
                        >
                            Start Your Project →
                        </Link>
                    </div>
                </div>

                {/* Secondary Nav Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-14 pt-10 border-t-2 border-black text-xs font-bold leading-relaxed">
                    {/* Column 1: Core Services */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black text-black border-b-2 border-black pb-1.5 uppercase">Core Services</h3>
                        <ul className="space-y-2">
                            <li><Link to="/growth-engineering" onMouseEnter={() => preloadRoute('/growth-engineering')} className="text-black hover:underline">Growth Engineering.</Link></li>
                            <li><Link to="/custom-software" onMouseEnter={() => preloadRoute('/custom-software')} className="text-black hover:underline">Custom Software Dev.</Link></li>
                            <li><Link to="/mobile-app-development" onMouseEnter={() => preloadRoute('/mobile-app-development')} className="text-black hover:underline">Mobile App Development.</Link></li>
                            <li><Link to="/web-development" onMouseEnter={() => preloadRoute('/web-development')} className="text-black hover:underline">Web Application Dev.</Link></li>
                            <li><Link to="/ai-agent-development" onMouseEnter={() => preloadRoute('/ai-agent-development')} className="text-black hover:underline">AI Agent Automation.</Link></li>
                            <li><Link to="/ai-video-creation" onMouseEnter={() => preloadRoute('/ai-video-creation')} className="text-black hover:underline">AI Video Creation.</Link></li>
                            <li><Link to="/seo-mastery" onMouseEnter={() => preloadRoute('/seo-mastery')} className="text-black hover:underline">Technical SEO Mastery.</Link></li>
                            <li><Link to="/guest-post-service" onMouseEnter={() => preloadRoute('/guest-post-service')} className="text-black hover:underline">Guest Post Service.</Link></li>
                            <li><Link to="/brand-building" onMouseEnter={() => preloadRoute('/brand-building')} className="text-black hover:underline">Brand Building.</Link></li>
                            <li><Link to="/skills-academy" onMouseEnter={() => preloadRoute('/skills-academy')} className="text-black hover:underline">Skills Academy Course.</Link></li>
                            <li><Link to="/graphics-design" onMouseEnter={() => preloadRoute('/graphics-design')} className="text-black hover:underline">Graphics &amp; UI Design.</Link></li>
                            <li><Link to="/content-writing" onMouseEnter={() => preloadRoute('/content-writing')} className="text-black hover:underline">Technical Content Writing.</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Global Markets */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black text-black border-b-2 border-black pb-1.5 uppercase">Target Markets</h3>
                        <ul className="space-y-2">
                            <li><Link to="/us-market" className="text-black hover:underline">United States (US).</Link></li>
                            <li><Link to="/uk-market" className="text-black hover:underline">United Kingdom (UK).</Link></li>
                            <li><Link to="/saudi-arabia-market" className="text-black hover:underline">Saudi Arabia (KSA).</Link></li>
                            <li><Link to="/uae-market" className="text-black hover:underline">United Arab Emirates (UAE).</Link></li>
                            <li><Link to="/canada-market" className="text-black hover:underline">Canada (CA).</Link></li>
                            <li><Link to="/australia-market" className="text-black hover:underline">Australia (AU).</Link></li>
                            <li><Link to="/poland-market" className="text-black hover:underline">Poland (PL).</Link></li>
                            <li><Link to="/pakistan-market" className="text-black hover:underline">Pakistan (PK).</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Free Tools */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black text-black border-b-2 border-black pb-1.5 uppercase">Free Tools</h3>
                        <ul className="space-y-2">
                            <li><Link to="/tools" className="text-black hover:underline">All 6 Free Tools Hub.</Link></li>
                            <li><Link to="/tools/project-cost-estimator" className="text-black hover:underline">Project Cost Estimator.</Link></li>
                            <li><Link to="/tools/website-audit" className="text-black hover:underline">Website Audit Tool.</Link></li>
                            <li><Link to="/tools/seo-checklist" className="text-black hover:underline">SEO Launch Checklist.</Link></li>
                            <li><Link to="/tools/ai-readiness-score" className="text-black hover:underline">AI Readiness Score.</Link></li>
                            <li><Link to="/tools/tech-stack-recommender" className="text-black hover:underline">Tech Stack Recommender.</Link></li>
                            <li><Link to="/tools/website-authority-analyzer" className="text-black hover:underline">Website Authority Analyzer.</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Sitemaps */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-black text-black border-b-2 border-black pb-1.5 uppercase">Company &amp; Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about/our-company" className="text-black hover:underline">About Our Studio.</Link></li>
                            <li><Link to="/about/our-team" className="text-black hover:underline">Our Engineering Team.</Link></li>
                            <li><Link to="/about/our-process" className="text-black hover:underline">Our 5-Step Process.</Link></li>
                            <li><Link to="/editorial-policy" className="text-black hover:underline">Editorial Policy.</Link></li>
                            <li><Link to="/privacy" className="text-black hover:underline">Privacy Policy.</Link></li>
                            <li><Link to="/terms" className="text-black hover:underline">Terms of Service.</Link></li>
                            <li><Link to="/blog" className="text-black hover:underline">Engineering Blog.</Link></li>
                            <li><Link to="/case-studies" className="text-black hover:underline">Client Case Studies.</Link></li>
                            <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">XML Sitemap.</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Contact & Headquarters */}
                    <div className="space-y-3" itemScope itemType="https://schema.org/LocalBusiness">
                        <span itemProp="name" className="hidden">AbuQitmirLabs</span>
                        <h3 className="text-sm font-black text-black border-b-2 border-black pb-1.5 uppercase">Headquarters</h3>
                        <p className="text-xs text-black" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                            <span itemProp="streetAddress">Shahrah-e-Faisal, PECHS</span>,{' '}
                            <span itemProp="addressLocality">Karachi</span>,{' '}
                            <span itemProp="postalCode">75400</span>,{' '}
                            <span itemProp="addressCountry">Pakistan</span>.
                        </p>
                        <p className="text-xs text-black">
                            Phone: <span itemProp="telephone" className="font-black">+92 323 3260859</span>.
                        </p>
                        <div className="text-xs text-black">
                            Email: <ObfuscatedEmail user="hello" domain="abuqitmirlabs.tech" className="font-mono font-black hover:underline" />
                        </div>
                        <div className="pt-2 flex flex-wrap gap-2 text-xs">
                            <a href="https://www.linkedin.com/in/abu-qitmir-697423390/" target="_blank" rel="noopener noreferrer" className="underline font-black">LinkedIn</a>
                            <span>•</span>
                            <a href="https://clutch.co/profile/abuqitmirlabstech" target="_blank" rel="noopener noreferrer" className="underline font-black">Clutch</a>
                            <span>•</span>
                            <a href="https://www.goodfirms.co/company/abuqitmirlabs-tech" target="_blank" rel="noopener noreferrer" className="underline font-black">GoodFirms</a>
                            <span>•</span>
                            <Link to="/admin" className="underline font-black">Admin</Link>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription Section */}
                <div className="mt-10">
                    <NewsletterSubscriptionForm variant="footer" source="footer" />
                </div>

                {/* Sitewide E-E-A-T Attribution & YMYL Disclaimer */}
                <div className="mt-10 pt-6 border-t-2 border-black/20 text-xs text-black/90 leading-relaxed space-y-2">
                    <p className="author-byline">
                        <strong>Lead Architect &amp; Reviewer:</strong>{' '}
                        <a href="https://www.linkedin.com/in/abu-qitmir-697423390/" rel="author noopener noreferrer" target="_blank" className="underline font-bold">
                            Abu Qitmir Mohammad Shiraz Al-Madani
                        </a>{' '}
                        (Founder &amp; Lead Systems Architect, B.S. Software Engineering, +5 Years Experience). Verified 4.9/5 rating on Google, Clutch, and GoodFirms.
                    </p>
                    <p className="disclaimer">
                        <strong>Disclaimer:</strong> All cost estimates, timelines, and case study metrics on this site are for general informational purposes only and do not constitute legal, financial, or regulatory advice. Project results vary by scope and market conditions.
                    </p>
                </div>

                <div className="mt-6 pt-6 border-t border-black/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-black">
                    <div className="flex items-center gap-3">
                        <Logo />
                        <span>Engineered by AbuQitmirLabs in Karachi, Pakistan.</span>
                    </div>
                    <div>
                        © 2026 AbuQitmirLabs. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

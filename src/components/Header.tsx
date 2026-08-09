import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Menu, X, ChevronDown, ChevronRight, Phone, Mail, Search, 
    Facebook, Twitter, Linkedin, Youtube, Pin, HelpCircle, Briefcase, Award 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { preloadRoute } from '../utils/preloader';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { 
            name: 'Services', 
            href: '/#services',
            dropdown: [
                { name: 'Custom Software Development', href: '/custom-software' },
                { name: 'Mobile App Development', href: '/mobile-app-development' },
                { name: 'High-Performance Web Development', href: '/web-development' },
                { name: 'Intelligent AI Agent Development', href: '/ai-agent-development' },
                { name: 'SEO & Local SEO Mastery', href: '/seo-mastery' },
                { name: 'Local SEO for Small Business', href: '/local-seo-for-small-business' },
                { name: '  ↳ Citation Building', href: '/local-seo-citation-building' },
                { name: '  ↳ White Label Local SEO', href: '/white-label-local-seo' },
                { name: '  ↳ Free Local SEO Audit', href: '/local-seo-audit' },
                { name: 'Premium Graphics Designing', href: '/graphics-design' },
                { name: 'Professional Content Writing', href: '/content-writing' },
            ]
        },
        {
            name: 'Solutions',
            href: '/solutions/fintech',
            dropdown: [
                { name: 'Fintech Solutions', href: '/solutions/fintech' },
                { name: 'Healthcare Platforms', href: '/solutions/healthcare' },
                { name: 'AI-Powered Automation', href: '/solutions/ai-automation' },
                { name: 'E-Commerce Development', href: '/solutions/e-commerce' },
                { name: 'EdTech & Learning Platforms', href: '/solutions/edtech' },
            ]
        },
        {
            name: 'World',
            href: '#',
            dropdown: [
                { name: 'United States Market', href: '/us-market' },
                { name: 'United Kingdom Market', href: '/uk-market' },
                { name: 'Pakistan Market', href: '/pakistan-market' },
                { name: 'Canada Market', href: '/canada-market' },
                { name: 'Poland Market', href: '/poland-market' },
                { name: 'Australia Market', href: '/australia-market' },
            ]
        },
        { 
            name: 'News', 
            href: '/news/all',
            dropdown: [
                { name: 'Latest News', href: '/news/latest' },
                { name: 'Press Releases', href: '/news/press-releases' },
                { name: 'Industry Insights', href: '/news/industry-insights' },
                { name: 'All News Archive', href: '/news/all' },
            ]
        },
        {
            name: 'About',
            href: '/about/our-company',
            dropdown: [
                { name: 'Our Company', href: '/about/our-company' },
                { name: 'Our Team', href: '/about/our-team' },
                { name: 'Our Process', href: '/about/our-process' },
                { name: 'Careers', href: '/about/careers' },
            ]
        },
        { 
            name: 'Case Studies', 
            href: '/case-studies',
            dropdown: [
                { name: 'All Case Studies', href: '/case-studies' },
                { name: 'Website Contract Form', href: '/website-contract' },
            ]
        },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <>
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#ccff00] focus:text-black focus:font-bold focus:rounded-md focus:shadow-2xl focus:outline-none"
            >
                Skip to main content
            </a>

            <header 
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-20 md:h-24 flex items-center ${
                    scrolled || isOpen ? 'bg-black/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
                    <Logo />

                    {/* Desktop Nav */}
                    <nav role="navigation" aria-label="Main Navigation" className="hidden xl:flex items-center gap-4 2xl:gap-7">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.dropdown ? (
                                    <div 
                                        className="flex items-center gap-1 cursor-pointer py-4"
                                        onMouseEnter={() => setActiveDropdown(link.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                        role="button"
                                        tabIndex={0}
                                        aria-haspopup="true"
                                        aria-expanded={activeDropdown === link.name}
                                        aria-label={`${link.name} Submenu`}
                                    >
                                        <span className="text-xs xl:text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap">
                                            {link.name}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                                        
                                        <AnimatePresence>
                                            {activeDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl py-2 mt-[-5px] z-50"
                                                >
                                                    {link.dropdown.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            to={sub.href}
                                                            className="block px-4 py-2.5 text-xs xl:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                                            onMouseEnter={() => preloadRoute(sub.href)}
                                                            onTouchStart={() => preloadRoute(sub.href)}
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link 
                                        to={link.href} 
                                        onMouseEnter={() => preloadRoute(link.href)}
                                        onTouchStart={() => preloadRoute(link.href)}
                                        className={`text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap ${
                                            location.pathname === link.href 
                                            ? 'text-[#ccff00]' 
                                            : 'text-gray-300 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Header Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link 
                            to="/contact"
                            onMouseEnter={() => preloadRoute('/contact')}
                            onTouchStart={() => preloadRoute('/contact')}
                            aria-label="Book a Consultation"
                            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#ccff00] hover:bg-[#b0d600] text-black font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(204,255,0,0.35)] hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-all duration-300 active:scale-95 shrink-0 whitespace-nowrap"
                            style={{ color: '#000000' }}
                        >
                            <span style={{ color: '#000000' }} className="text-black font-black text-xs uppercase tracking-wider whitespace-nowrap">
                                Contact Now
                            </span>
                        </Link>

                        {/* Mobile / Tablet Menu Toggle */}
                        <button 
                            className="xl:hidden p-2.5 text-white hover:text-[#ccff00] focus:outline-none transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav Sidebar - Moved outside of restricted height header */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[110] xl:hidden"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[85%] max-w-[340px] bg-[#050505] z-[120] xl:hidden shadow-2xl flex flex-col border-l border-white/10"
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
                                <Logo />
                                <button 
                                    className="p-2 text-white focus:outline-none"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close Navigation Menu"
                                >
                                    <X className="h-7 w-7" />
                                </button>
                            </div>

                            <nav role="navigation" aria-label="Mobile Navigation" className="flex-1 overflow-y-auto hide-scrollbar px-6 py-8 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col border-b border-white/5 last:border-0">
                                        {link.dropdown ? (
                                            <div className="flex flex-col">
                                                <button 
                                                    className="flex items-center justify-between w-full py-4 text-lg font-bold text-white text-left group"
                                                    onClick={() => activeDropdown === link.name ? setActiveDropdown(null) : setActiveDropdown(link.name)}
                                                    aria-expanded={activeDropdown === link.name}
                                                    aria-label={`Toggle ${link.name} Submenu`}
                                                >
                                                    {link.name}
                                                    <ChevronDown 
                                                        className={`w-5 h-5 transition-transform duration-300 ${
                                                            activeDropdown === link.name ? 'rotate-180' : ''
                                                        }`} 
                                                    />
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {activeDropdown === link.name && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden flex flex-col gap-3 pl-4 pb-4"
                                                        >
                                                            {link.dropdown.map((sub) => (
                                                                <Link 
                                                                    key={sub.name} 
                                                                    to={sub.href} 
                                                                    className="py-2 text-sm text-gray-400 hover:text-[#ccff00] transition-colors flex items-center justify-between pr-4"
                                                                    onTouchStart={() => preloadRoute(sub.href)}
                                                                    onMouseEnter={() => preloadRoute(sub.href)}
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {sub.name}
                                                                    <ChevronRight className="w-3 h-3 opacity-30" />
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link 
                                                to={link.href} 
                                                onTouchStart={() => preloadRoute(link.href)}
                                                onMouseEnter={() => preloadRoute(link.href)}
                                                className={`py-4 text-lg font-bold transition-colors flex items-center justify-between ${
                                                    location.pathname === link.href 
                                                    ? 'text-[#ccff00]' 
                                                    : 'text-white'
                                                }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                                <ChevronRight className="w-4 h-4 opacity-30" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                
                                <div className="mt-8 flex flex-col gap-4">
                                    <Link 
                                        to="/contact"
                                        onTouchStart={() => preloadRoute('/contact')}
                                        onMouseEnter={() => preloadRoute('/contact')}
                                        className="w-full py-4 bg-[#ccff00] hover:bg-[#b0d600] text-black font-black text-center rounded-xl text-base uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.35)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center shrink-0"
                                        style={{ color: '#000000' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-black font-black text-base uppercase tracking-wider text-center" style={{ color: '#000000' }}>
                                            Contact Now
                                        </span>
                                    </Link>
                                    <Link 
                                        to="/admin"
                                        className="w-full py-4 border border-white/15 bg-white/5 hover:bg-white/10 text-white font-extrabold text-center rounded-xl text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center"
                                        style={{ color: '#ffffff' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-white font-extrabold text-xs uppercase tracking-[0.2em]" style={{ color: '#ffffff' }}>
                                            Admin Access
                                        </span>
                                    </Link>
                                </div>
                            </nav>

                            {/* Mobile Menu Footer */}
                            <div className="p-8 border-t border-white/5 bg-zinc-950/50 mt-auto">
                                <div className="flex flex-wrap justify-center gap-4 text-gray-500 mb-6">
                                    <a href="https://www.facebook.com/profile.php?id=61583768706452" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                                    <a href="https://x.com/AbuQitmir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                    <a href="https://www.linkedin.com/in/abu-qitmir-697423390/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                    <a href="https://www.youtube.com/@AbuQitmir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
                                    <a href="https://www.pinterest.com/abuqitmir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Pin className="w-5 h-5" /></a>
                                    <a href="https://www.quora.com/profile/Abu-Qitmir-Mohammad-Shiraz-Al-Madani" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><HelpCircle className="w-5 h-5" /></a>
                                    <a href="https://www.goodfirms.co/company/abuqitmirlabs-tech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Briefcase className="w-5 h-5" /></a>
                                    <a href="https://clutch.co/profile/abuqitmirlabstech?_gl=1*1notqlc*_gcl_au*Nzg0MzYyMjI0LjE3Nzg1MzM3NjkuMjA3OTQ5MjcxNC4xNzc4NTMzODc1LjE3Nzg1MzQzNTA.*FPAU*Nzg0MzYyMjI0LjE3Nzg1MzM3Njk.*_ga*NzczMDM5MTg3LjE3Nzg1MzM3Njk.*_ga_D0WFGX8X3V*czE3ODIzMzYxNTAkbzUkZzEkdDE3ODIzMzYxNTAkbzUkZzEkdDE3ODIzMzYxODEkajI5JGwwJGgxMDQ0NTQyMjU.*_fplc*TnJmYjRHNWsxYTk2R1olMkZZOVVyd2VMU21OUjZiQ1RkRyUyRk1uVjMlMkJSb2JDMkh4RjVFNFBnbmFHeWNDWmZjTWY1YzhMJTJGdXpoZ0VYQWo0bDlHbHRUQzFHcHc3d3JSUndXck5VWEtBRGhWTHN1c2VuOGg4dkgzN1Vha2EzM2xNTlElM0QlM0Q." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Award className="w-5 h-5" /></a>
                                </div>
                                <p className="text-gray-600 text-[10px] text-center uppercase tracking-widest">
                                    © 2026 AbuQitmir Labs
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;

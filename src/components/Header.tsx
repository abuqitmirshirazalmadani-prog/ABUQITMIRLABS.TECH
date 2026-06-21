import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Menu, X, ChevronDown, ChevronRight, Phone, Mail, Search, 
    Facebook, Twitter, Linkedin, Youtube 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

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
                { name: 'Premium Graphics Designing', href: '/graphics-design' },
                { name: 'Professional Content Writing', href: '/content-writing' },
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
        { name: 'About Us', href: '/about' },
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
            <header 
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-20 md:h-24 flex items-center ${
                    scrolled || isOpen ? 'bg-black/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
                    <Logo />

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.dropdown ? (
                                    <div 
                                        className="flex items-center gap-1 cursor-pointer py-4"
                                        onMouseEnter={() => setActiveDropdown(link.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <span className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                            {link.name}
                                        </span>
                                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                        
                                        <AnimatePresence>
                                            {activeDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 w-72 bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl py-2 mt-[-5px]"
                                                >
                                                    {link.dropdown.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            to={sub.href}
                                                            className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
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
                                        className={`text-sm font-medium transition-colors ${
                                            location.pathname === link.href 
                                            ? 'text-white' 
                                            : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link 
                            to="/contact"
                            className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-100 transition-colors"
                        >
                            Contact Now
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button 
                        className="md:hidden p-2 text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
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
                            className="fixed inset-0 bg-black/60 z-[110] md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[85%] max-w-[340px] bg-[#050505] z-[120] md:hidden shadow-2xl flex flex-col border-l border-white/10"
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
                                <Logo />
                                <button 
                                    className="p-2 text-white focus:outline-none"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-7 w-7" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-8 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col border-b border-white/5 last:border-0">
                                        {link.dropdown ? (
                                            <div className="flex flex-col">
                                                <button 
                                                    className="flex items-center justify-between w-full py-4 text-lg font-bold text-white text-left group"
                                                    onClick={() => activeDropdown === link.name ? setActiveDropdown(null) : setActiveDropdown(link.name)}
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
                                        className="w-full py-4 bg-[#ccff00] text-black font-black text-center rounded-xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contact Now
                                    </Link>
                                    <Link 
                                        to="/admin"
                                        className="w-full py-4 border border-white/10 text-gray-400 font-bold text-center rounded-xl text-xs uppercase tracking-[0.2em]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Access
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Menu Footer */}
                            <div className="p-8 border-t border-white/5 bg-zinc-950/50 mt-auto">
                                <div className="flex justify-center gap-6 text-gray-500 mb-6">
                                    <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
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

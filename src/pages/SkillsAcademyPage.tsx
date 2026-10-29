import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  X, 
  CheckCircle2, 
  Video, 
  Radio, 
  Users, 
  School, 
  Bot, 
  Laptop, 
  BookOpen, 
  Flame, 
  Layers, 
  Calendar, 
  CreditCard, 
  Award, 
  Building2, 
  Briefcase, 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Clock, 
  GraduationCap,
  Compass,
  PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceToolCtaBanner from '../components/ServiceToolCtaBanner';

const SkillsAcademyPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('early-bird');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'enroll' | 'waitlist'>('enroll');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Karachi',
    plan: 'Early Bird (Rs. 12,000)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openEnrollModal = (planName?: string) => {
    if (planName) {
      setFormData(prev => ({ ...prev, plan: planName }));
    }
    setModalMode('enroll');
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const openWaitlistModal = () => {
    setModalMode('waitlist');
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const scrollToForm = (mode: 'enroll' | 'waitlist', planName?: string) => {
    setModalMode(mode);
    setSubmitted(false);
    if (planName) {
      setFormData(prev => ({ ...prev, plan: planName }));
    }
    const el = document.getElementById('enrollment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (mode === 'enroll') openEnrollModal(planName);
      else openWaitlistModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Track conversion event if analytics available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', modalMode === 'enroll' ? 'course_enroll_request' : 'waitlist_signup', {
        plan: formData.plan,
        city: formData.city
      });
    }
  };

  const curriculum = [
    {
      period: 'Weeks 1–3',
      title: 'Strategy & Brand Foundation',
      badge: 'Foundation & AI Setup',
      desc: 'AI tools setup (ChatGPT, Claude, Gemini, DeepSeek), identifying core business goals, competitive intelligence research, brand naming, vector logo concepts, palette systems, sitemap structure, aur conversion-ready content planning — sab kuch modern AI se.',
      highlights: [
        'AI Prompt Engineering for Market Research',
        'Brand Positioning Matrix & Customer Archetypes',
        'Logo Design & Visual Identity Systems in Figma',
        'Website Architecture & Sitemap Planning'
      ]
    },
    {
      period: 'Weeks 4–5',
      title: 'Development Setup & Modern UI',
      badge: 'Code Architecture',
      desc: 'Next.js project setup, GitHub version control, Vercel production deployment, responsive UI components, Tailwind CSS styling, aur mobile-first speed optimization bina kisi convoluted technical jargon ke.',
      highlights: [
        'Next.js 15 & React Modern Project Setup',
        'GitHub Collaboration & Vercel Auto-Deployment',
        'Tailwind CSS Styling & Micro-interactions',
        'Mobile Viewport & Performance Best Practices'
      ]
    },
    {
      period: 'Weeks 6–7',
      title: 'Complete Website Build',
      badge: 'Full Production Build',
      desc: 'Brand identity apply karna, global header/footer, high-impact hero sections, about story, service pages, dynamic contact forms, lead capture funnels, aur full markdown blog setup — sab Next.js mein.',
      highlights: [
        'Modular Component Hierarchy & Navigation',
        'Conversion-Focused Homepage & Service Pages',
        'Interactive Contact Forms & Formspree Integration',
        'High-Velocity Static Blog System'
      ]
    },
    {
      period: 'Week 8',
      title: 'E-Commerce Engineering (Optional Track)',
      badge: 'Monetization Engine',
      desc: 'Agar aapko online physical ya digital products bechne hain, to product catalog layout, cart state management, aur JazzCash / EasyPaisa / Stripe payment gateways integrate karna seekhein.',
      highlights: [
        'Product Cards, Grid Layouts & Filter Systems',
        'Client-side Cart & Checkout State Flow',
        'Local Pakistani (JazzCash/EasyPaisa) Gateways',
        'International Stripe Checkout Infrastructure'
      ]
    },
    {
      period: 'Week 9',
      title: 'SEO Mastery & Local Visibility',
      badge: 'Search Authority',
      desc: 'Pakistani aur international market ke liye high-intent keyword research, on-page optimization, technical SEO audit, Google Business Profile local SEO Karachi focus — sab AI ki taqat se automate karna.',
      highlights: [
        'Commercial Keyword Mapping & Intent Silos',
        'Meta Tags, Open Graph & Canonical Tag Rules',
        'JSON-LD Structured Schemas for Rich Results',
        'Google Search Console & GA4 Verification'
      ]
    },
    {
      period: 'Weeks 10–11',
      title: 'Testing, Hardening & Public Launch',
      badge: 'Quality Assurance',
      desc: 'Cross-device mobile testing, Google PageSpeed 95+ score optimization, Lighthouse audits, custom domain DNS mapping, SSL certification, aur Google indexation verification.',
      highlights: [
        'Google PageSpeed & Core Web Vitals Optimization',
        'Cross-Browser & Multi-Device Responsive Testing',
        'Custom Domain DNS Connect & Free SSL Lock',
        'Sitemap Submission & Fast Google Indexation'
      ]
    },
    {
      period: 'Week 12',
      title: 'Client Acquisition & Career Launch',
      badge: 'Revenue Generation',
      desc: 'Local Pakistani aur overseas diaspora client outreach, winning proposal templates, pricing strategy (per-project vs retainer), portfolio presentation, aur first paying client secure karna.',
      highlights: [
        'High-Converting Cold Outreach & LinkedIn Strategy',
        'Agency-Grade Client Proposal & Scope Templates',
        'Value-Based Pricing: Stop Charging Peanuts',
        'Contract Signing, Invoicing & Delivery Process'
      ]
    }
  ];

  const targetAudience = [
    {
      title: 'Students Without Coding Experience',
      desc: 'Jinhe coding ka koi background nahi. Yeh course zero se shuru hota hai. AI tools code generation aur debugging handle karte hain, aap architecture aur strategy seekhte ho.',
      icon: <GraduationCap className="w-6 h-6 text-[#ccff00]" />
    },
    {
      title: 'Graduates Entering Freelancing',
      desc: 'Jo Upwork, Fiverr, ya direct LinkedIn clients ke liye $500–$2,000 ke high-ticket projects deliver karna chahte hain bajaye $10 ke low-quality gigs ke.',
      icon: <Briefcase className="w-6 h-6 text-[#8b5cf6]" />
    },
    {
      title: 'Small Business Owners',
      desc: 'Jo apna brand online lana chahte hain aur lakhoon rupay agency commissions bachana chahte hain apne business ka direct control rakh kar.',
      icon: <Building2 className="w-6 h-6 text-[#3b82f6]" />
    },
    {
      title: 'Professionals Seeking Career Pivot',
      desc: 'Jo traditional marketing ya sales se modern AI-driven digital product engineering aur agency leadership mein jump karna chahte hain.',
      icon: <Layers className="w-6 h-6 text-[#10b981]" />
    },
    {
      title: 'AI Enthusiasts & Creators',
      desc: 'Jo log ChatGPT, Claude, aur Cursor ko sirf chat ke bajaye real cash-generating digital businesses aur scalable brands banane ke liye use karna chahte hain.',
      icon: <Bot className="w-6 h-6 text-[#f59e0b]" />
    }
  ];

  const courseFormat = [
    {
      icon: <Video className="w-6 h-6 text-[#ccff00]" />,
      title: '36 Recorded HD Masterclasses',
      desc: 'Apni speed se dekho, jab chaho dekho, baar baar pause karke implement karo. Lifetime access.'
    },
    {
      icon: <Radio className="w-6 h-6 text-[#ef4444]" />,
      title: '12 Sunday Live Q&A Sessions',
      desc: 'Har Sunday interactive live session jahan har student ke screen-share aur questions ka direct jawab milega.'
    },
    {
      icon: <Users className="w-6 h-6 text-[#8b5cf6]" />,
      title: 'Collaborative Study Circles',
      desc: '4 se 5 friends mil kar ek jagah cohort bana kar seekho, ek doosre ke projects review karo aur accountability rakho.'
    },
    {
      icon: <School className="w-6 h-6 text-[#3b82f6]" />,
      title: 'In-Person Karachi Sessions',
      desc: 'Jab 10+ students ek area ya institute mein arrange hote hain, to senior agency instructor khud physically aakar guide karega.'
    },
    {
      icon: <Bot className="w-6 h-6 text-[#10b981]" />,
      title: 'AI-Powered Applied Workflows',
      desc: 'ChatGPT, Claude 3.5 Sonnet, Gemini Pro, aur DeepSeek har step par code, copy aur visual prompts automate karte hain.'
    }
  ];

  const pricingPlans = [
    {
      id: 'early-bird',
      name: 'Early Bird Special',
      badge: '⚡ Limited: Pehle 20 Students',
      price: 'Rs. 12,000',
      regularPrice: 'Rs. 18,000',
      desc: 'Maximum discount for early action-takers. Complete 12-week curriculum with agency backing.',
      popular: true,
      accent: '#ccff00',
      features: [
        'Complete 12-Week AI Brand Course',
        'All 36 HD Recorded Video Modules',
        '12 Sunday Live Q&A Sessions',
        'Real Agency Capstone Project',
        'Official AbuQitmirLabs Certificate',
        'Private Discord/WhatsApp Study Community',
        'Client Pitch & Proposal Templates Kit'
      ]
    },
    {
      id: 'online-standard',
      name: 'Online Full Access',
      badge: 'Individual Learners',
      price: 'Rs. 18,000',
      regularPrice: null,
      desc: 'Standard one-time payment for self-paced online access with full mentorship and code reviews.',
      popular: false,
      accent: '#8b5cf6',
      features: [
        'Complete 12-Week AI Brand Course',
        'All 36 HD Recorded Video Modules',
        '12 Sunday Live Q&A Sessions',
        'Real Agency Capstone Project',
        'Official AbuQitmirLabs Certificate',
        'Direct Mentor Code Reviews',
        'Lifetime Video Access & Updates'
      ]
    },
    {
      id: 'installments',
      name: 'Easy Installment Plan',
      badge: '2 Flexible Payments',
      price: 'Rs. 10,000 + Rs. 10,000',
      regularPrice: null,
      desc: 'Unke liye jo ek sath full fees pay nahi karna chahte. 1st installment enrollment par, 2nd Week 6 par.',
      popular: false,
      accent: '#3b82f6',
      features: [
        'Pehli installment Rs. 10,000 at enrollment',
        'Doosri installment Rs. 10,000 at Week 6',
        'No interest or hidden penalty fees',
        'All 36 HD Recorded Masterclasses',
        '12 Sunday Live Mentorship Sessions',
        'Real Client Capstone Project',
        'Verified AbuQitmirLabs Certificate'
      ]
    },
    {
      id: 'in-person',
      name: 'In-Person Karachi Cohort',
      badge: '10+ Students Group',
      price: 'Rs. 18,000 + Conveyance',
      regularPrice: null,
      desc: 'Karachi mein physical classroom/office training. Minimum 10 students ka group arrange karein, instructor physically aayega.',
      popular: false,
      accent: '#f59e0b',
      features: [
        'Physical Classroom / In-Person Mentorship',
        'Live Code Debugging & Screen Guidance',
        'Includes All 36 HD Recorded Lessons',
        'Weekly Physical Milestone Checkpoints',
        'Direct Agency Office Experience',
        'Custom Batch Scheduling for Institutes',
        'Institutional Certificate Handover'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Kya mujhe coding ya programming ka pehle se experience chahiye?',
      a: 'Bilkul nahi! Yeh course zero experience se shuru hota hai. Hum 2026 ka modern software development workflow seekhate hain — jahan AI tools (ChatGPT, Claude, Cursor) se code generate hota hai, aur aap architecture, brand strategy aur deployment ko guide karte hain.'
    },
    {
      q: 'Course ke liye laptop hona zaroori hai ya mobile se ho sakta hai?',
      a: 'Laptop ya desktop computer zaroori hai (minimum Core i3 / 8GB RAM). Mobile phone se coding, Figma UI design, aur Next.js deployment manage karna feasible nahi hai.'
    },
    {
      q: 'Next.js aur React beginners ke liye mushkil to nahi hongi?',
      a: 'Purana tareeqa mushkil tha jahan syntax ratna parta tha. Modern tareeqe mein AI tools aapko exact boilerplate, components aur debug scripts de dete hain. Hamara kaam aapko logic, UI design systems aur brand thinking sikhana hai.'
    },
    {
      q: 'Course complete karne ke baad certificate milega?',
      a: 'Haan! Har student jo apna capstone project submit karega aur live website deploy karega, usay verified AbuQitmirLabs Agency Certificate of Brand Engineering diya jayega jo LinkedIn aur portfolio par share kiya ja sakta hai.'
    },
    {
      q: 'Installment ka procedure kya hai?',
      a: 'Installment plan mein pehli payment Rs. 10,000 enrollment ke waqt hoti hai jisse aapko access mil jata hai. Doosri payment Rs. 10,000 Week 6 (mid-course milestone) par hoti hai.'
    },
    {
      q: 'In-person physical session kahan hoga aur requirements kya hain?',
      a: 'In-person sessions Karachi ke liye hain. Agar aapka 10+ students ka group hai (jaise institute, college, ya friends circle), to hamara agency instructor aapki location par aakar physical classes conduct karega.'
    },
    {
      q: 'Agar classes miss ho jayein to kya hoga?',
      a: 'Sabhi classes high-definition format mein recorded available hain. Aap jab chahein, apni speed se login karke dekh sakte hain aur Sunday live session mein questions pooch sakte hain.'
    },
    {
      q: 'Payment kaise karni hogi?',
      a: 'Pakistan ke students direct Bank Account Transfer (Meezan/HBL/Faysal), JazzCash, ya EasyPaisa ke zariye fees jama karwa sakte hain. International students ke liye Wise aur Stripe options available hain.'
    }
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": "https://www.abuqitmirlabs.tech/skills-academy#course",
        "name": "Brand Banao Business Chalao: AI-Powered Brand & Web Building Course",
        "description": "Pakistan's premier AI-powered course in Urdu teaching complete brand building and online business development. Real agency client projects, Next.js portfolio, and client acquisition.",
        "provider": {
          "@type": "Organization",
          "name": "AbuQitmirLabs",
          "url": "https://www.abuqitmirlabs.tech",
          "logo": "https://www.abuqitmirlabs.tech/logo.png"
        },
        "educationalCredentialAwarded": "AbuQitmirLabs Certificate in Brand Engineering",
        "inLanguage": ["ur", "en"],
        "courseCode": "AQL-BBBC-2026",
        "timeToComplete": "P12W",
        "offers": [
          {
            "@type": "Offer",
            "name": "Early Bird Registration",
            "price": "12000",
            "priceCurrency": "PKR",
            "availability": "https://schema.org/LimitedAvailability"
          },
          {
            "@type": "Offer",
            "name": "Standard Online Course",
            "price": "18000",
            "priceCurrency": "PKR",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.abuqitmirlabs.tech/skills-academy#faq",
        "mainEntity": faqs.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.abuqitmirlabs.tech/skills-academy#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.abuqitmirlabs.tech/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Skills Academy",
            "item": "https://www.abuqitmirlabs.tech/skills-academy"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-neutral-300 font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Learn to Build a Brand &amp; Business Online — AI Course in Urdu | AbuQitmirLabs</title>
        <meta name="description" content="Pakistan's premier AI-powered course in Urdu teaching complete brand building and online business development. Real agency client projects, Next.js portfolio, and client acquisition." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/skills-academy" />

        {/* Open Graph */}
        <meta property="og:title" content="Learn to Build a Brand &amp; Business Online — AI Course in Urdu | AbuQitmirLabs" />
        <meta property="og:description" content="Pakistan's premier AI-powered course in Urdu teaching complete brand building and online business development. Real agency client projects, Next.js portfolio, and client acquisition." />
        <meta property="og:url" content="https://www.abuqitmirlabs.tech/skills-academy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AbuQitmirLabs" />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/og-skills-academy.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AbuQitmirLabs Skills Academy - Brand Banao Business Chalao AI Course" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AbuQitmir" />
        <meta name="twitter:title" content="Learn to Build a Brand &amp; Business Online — AI Course in Urdu | AbuQitmirLabs" />
        <meta name="twitter:description" content="Pakistan's premier AI-powered course in Urdu teaching complete brand building and online business development. Real agency client projects, Next.js portfolio, and client acquisition." />
        <meta name="twitter:image" content="https://www.abuqitmirlabs.tech/twitter-skills-academy.jpg" />

        {/* Structured Data Graph */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseSchema)
          }}
        />
      </Helmet>

      <Header />
      <Breadcrumbs disableSchema={true} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] w-full flex items-center pt-28 md:pt-36 pb-20 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-[#ccff00]/5 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-[#8b5cf6]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10 animate-enter">
          <div className="max-w-4xl mx-auto text-center">
            {/* Live Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-300">
                AbuQitmirLabs Skills Academy · Urdu Track
              </span>
            </motion.div>

            {/* H1 Main Keyword Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white leading-[1.08] mb-8 animate-enter animate-enter-delay-1"
            >
              Learn to Build a Brand &amp; Business Online —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-white to-[#a78bfa]">
                AI-Powered Course in Urdu
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl font-light text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-10 animate-enter animate-enter-delay-2"
            >
              Pakistan ka pehla AI-powered course jahan tum sirf website nahi — poora brand aur online business banana seekhte ho.{' '}
              <span className="text-[#ccff00] font-medium">Real projects. Real agency. Real income.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <button 
                onClick={() => scrollToForm('enroll', 'Early Bird (Rs. 12,000)')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold tracking-wide text-sm uppercase transition-all duration-300 hover:bg-[#b8e600] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Enroll Now — Rs. 18,000
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToForm('waitlist')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] text-white border border-[#3b82f6]/40 hover:border-[#3b82f6] hover:bg-[#3b82f6]/10 font-semibold tracking-wide text-sm uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Join Waiting List (Free)
                <Sparkles className="w-4 h-4 text-[#3b82f6]" />
              </button>
            </motion.div>

            {/* Early bird alert */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-4 py-1.5 rounded-full mb-12"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Early Bird: Pehle 20 students sirf Rs. 12,000 mein — Limited spots available</span>
            </motion.div>

            {/* Trust Highlights Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">12 Weeks</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Structured Track</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-[#ccff00] font-mono">Real Capstone</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Live Agency Client</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">Karachi + Online</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Hybrid Format</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-[#a78bfa] font-mono">Zero Code</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1">AI-Assisted Workflow</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHAT MAKES THIS DIFFERENT: The Contrast Matrix */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              The Fundamental Contrast
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Why “Brand Banao Business Chalao” Is Unlike Any Course in Pakistan
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Pakistan ke 95% courses sirf superficial theory sikhate hain. Hum working software agency hain jo real clients ke projects par kaam karwate hain.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 overflow-hidden bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-5xl mx-auto">
            <div className="grid grid-cols-12 p-5 sm:p-6 bg-white/[0.04] border-b border-white/10 font-mono text-xs uppercase tracking-wider">
              <div className="col-span-5 sm:col-span-4 text-neutral-400">Parameter</div>
              <div className="col-span-3 sm:col-span-4 text-red-400 flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" />
                <span>Baaki Traditional Courses</span>
              </div>
              <div className="col-span-4 sm:col-span-4 text-[#ccff00] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Yeh AI-Powered Course</span>
              </div>
            </div>

            {[
              {
                parameter: 'Syllabus & Focus',
                others: 'Sirf dry theory aur textbook slides',
                course: 'Real client projects, authentic live code, real monetization'
              },
              {
                parameter: 'Course Outcome',
                others: 'Sirf ek useless paper certificate',
                course: 'Live deployed Next.js website + demonstrable brand portfolio'
              },
              {
                parameter: 'Student Support',
                others: 'Koi peer community nahi; recording dekh ke bhool jao',
                course: '4-5 friends ke study circles + Karachi in-person sessions'
              },
              {
                parameter: 'Modern Tooling',
                others: 'Zero AI tools; 10 saal purana obsolete syntax',
                course: 'ChatGPT, Claude 3.5, Gemini Pro, DeepSeek har step par'
              },
              {
                parameter: 'Instructor Background',
                others: 'Theorist teacher jisne kabhi real client nahi lia',
                course: 'Karachi software agency owner with active international clients'
              }
            ].map((row, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-12 p-5 sm:p-6 border-b border-white/5 items-center gap-2 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-5 sm:col-span-4 font-serif text-white text-base sm:text-lg font-medium">
                  {row.parameter}
                </div>
                <div className="col-span-3 sm:col-span-4 text-neutral-400 text-xs sm:text-sm flex items-start gap-2">
                  <span className="hidden sm:inline text-red-400">✕</span>
                  <span>{row.others}</span>
                </div>
                <div className="col-span-4 sm:col-span-4 text-neutral-200 text-xs sm:text-sm flex items-start gap-2 bg-[#ccff00]/[0.03] p-2.5 sm:p-3 rounded-xl border border-[#ccff00]/15">
                  <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                  <span className="font-medium text-white">{row.course}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO IS THIS FOR: Target Audience */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Eligibility &amp; Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Is Course Ke Liye Kaun Hai? (Target Audience)
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Yeh course har us Pakistani ke liye design kiya gaya hai jo digital economy mein dignity aur competence ke sath kamana chahta hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((aud, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-neutral-950 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 w-fit mb-5">
                    {aud.icon}
                  </div>
                  <h3 className="text-xl font-serif text-white font-medium mb-3">
                    {aud.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {aud.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2 text-xs font-mono text-[#ccff00]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Recommended Fit</span>
                </div>
              </div>
            ))}

            {/* Sixth Advisory Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#ccff00]/10 via-neutral-950 to-neutral-950 border border-[#ccff00]/30 flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#ccff00]/20 border border-[#ccff00]/30 w-fit mb-5">
                  <Sparkles className="w-6 h-6 text-[#ccff00]" />
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-3">
                  Unsure If You Qualify?
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Agar aapko shak hai ke aapka laptop ya English level kafi hai ya nahi, to humse seedha WhatsApp par baat karein.
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black bg-[#ccff00] px-4 py-2.5 rounded-lg hover:bg-[#b8e600] transition-colors w-fit"
              >
                Ask on WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU WILL LEARN: 12-Week Curriculum */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              The Step-by-Step Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Complete 12-Week Curriculum &amp; Capstone Roadmap
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Zero coding background se lekar live client website deployment aur client acquisition tak ka step-by-step roadmap.
            </p>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {curriculum.map((curr, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-white/5 hover:border-white/15 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-[#ccff00] bg-[#ccff00]/10 px-3 py-1 rounded-full border border-[#ccff00]/20">
                      {curr.period}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {curr.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-600">Module 0{idx + 1}</span>
                </div>

                <h3 className="text-2xl font-serif text-white font-medium mb-3">
                  {curr.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                  {curr.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/5">
                  {curr.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                      <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Capstone Star Banner */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#ccff00]/10 to-transparent border border-amber-500/40 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 shrink-0">
                  <Award className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-amber-400 block mb-1">
                    Graduation Capstone Project
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium mb-3">
                    AbuQitmirLabs Ke Real Client Ke Liye Poora Brand + Website Banao
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                    Kisi dummy textbook scenario par time zaya nahi hoga. Aap hamari working software agency ke actual client ke liye brand identity design karoge, Next.js site deploy karoge aur unke live review se graduate hoge.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> Live Production URL
                    </span>
                    <span className="flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> Client Testimonial on Portfolio
                    </span>
                    <span className="flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> 100% Freelance Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COURSE FORMAT: How This Course Works */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              High-Touch Hybrid Pedagogy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              How This Course Works: 5 Learning Pillars
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Sirf video dekhna kafi nahi hota. Hum recorded flexibility, live Sunday coaching, aur physical study circles ko blend karte hain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courseFormat.map((fmt, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-neutral-950 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 w-fit mb-5">
                    {fmt.icon}
                  </div>
                  <h3 className="text-xl font-serif text-white font-medium mb-3">
                    {fmt.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {fmt.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-[#ccff00]">Active Feature</span>
                </div>
              </div>
            ))}

            {/* Sixth Interactive Study Circle Box */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-[#8b5cf6]/30 flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 w-fit mb-5">
                  <Laptop className="w-6 h-6 text-[#a78bfa]" />
                </div>
                <h3 className="text-xl font-serif text-white font-medium mb-3">
                  Pehle Se 3-4 Dost Hain?
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Apne doston ke sath mil kar Study Circle banayein. Group enrollment par special mentor guidance aur cohort monitoring milti hai.
                </p>
              </div>
              <button
                onClick={() => openEnrollModal('Study Circle Group')}
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#8b5cf6] px-4 py-2.5 rounded-lg hover:bg-[#7c3aed] transition-colors w-fit cursor-pointer"
              >
                Register Group Circle
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION: Simple & Transparent Pricing */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Simple &amp; Transparent Pricing Plans
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              No hidden fees. No sneaky upgrades. Ek dafa ki fees mein 12 hafte ki intensive agency training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'bg-neutral-950 border-2 border-[#ccff00] shadow-[0_0_40px_rgba(204,255,0,0.15)] -translate-y-2'
                    : 'bg-neutral-950/70 border border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#ccff00] text-black font-mono text-[11px] font-black uppercase tracking-wider">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 bg-white/[0.05] inline-block mb-3">
                    {plan.badge}
                  </span>
                  <h3 className="text-xl font-serif text-white font-medium mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                      {plan.price}
                    </div>
                    {plan.regularPrice && (
                      <div className="text-xs font-mono text-neutral-500 line-through">
                        Regular: {plan.regularPrice}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {plan.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5 mb-8">
                    {plan.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => scrollToForm('enroll', `${plan.name} (${plan.price})`)}
                  className={`w-full py-3.5 rounded-xl font-semibold text-center text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    plan.popular
                      ? 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
                      : 'bg-white/[0.05] text-white border border-white/10 hover:bg-white/[0.1]'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Early Bird Callout Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#ccff00] shrink-0 hidden sm:block" />
              <div>
                <div className="text-sm font-bold text-white uppercase font-mono">
                  Early Bird Offer: First 20 Students Only
                </div>
                <div className="text-xs text-neutral-300">
                  Rs. 18,000 ke bajaye sirf Rs. 12,000 mein apna slot reserve karein.
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToForm('enroll', 'Early Bird (Rs. 12,000)')}
              className="px-6 py-2.5 rounded-xl bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600] shrink-0 cursor-pointer"
            >
              Claim Rs. 12,000 Spot
            </button>
          </div>
        </div>
      </section>

      {/* 6.5 EMBEDDED ON-PAGE ENROLLMENT & WAITING LIST SECTION */}
      <section id="enrollment-section" className="py-20 md:py-28 relative border-b border-white/5 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-3 block">
              Direct Application Portal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-4">
              Direct Enrollment &amp; Priority Waiting List Application
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
              Apna slot book karein ya upcoming batch ki free waiting list join karein. Form submit karne ke baad hamari team WhatsApp par 2 ghante mein rabta karegi.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 blur-3xl rounded-full pointer-events-none" />

            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md mx-auto mb-10">
              <button
                type="button"
                onClick={() => { setModalMode('enroll'); setSubmitted(false); }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  modalMode === 'enroll'
                    ? 'bg-[#ccff00] text-black shadow-lg'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Enroll in Batch 2026
              </button>
              <button
                type="button"
                onClick={() => { setModalMode('waitlist'); setSubmitted(false); }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  modalMode === 'waitlist'
                    ? 'bg-[#3b82f6] text-white shadow-lg'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Join Free Waiting List
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-[#ccff00]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                  {modalMode === 'enroll' ? 'Enrollment Application Received!' : 'Added to Waiting List!'}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 mb-8 max-w-lg mx-auto leading-relaxed">
                  Shukriya <strong className="text-white">{formData.name}</strong>! Hamara team lead aap se agle 2–4 ghanton ke andar WhatsApp (<strong className="text-[#ccff00]">{formData.phone}</strong>) par direct rabta karega aur orientation guide share karega.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/923233260859?text=Assalam%20o%20Alaikum%20AbuQitmirLabs!%20Maine%20Skills%20Academy%20ke%20liye%20form%20submit%20kiya%20hai%20(${encodeURIComponent(formData.name)}).%20Pls%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90"
                  >
                    <MessageSquare className="w-4 h-4" /> Message Direct on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/[0.1]"
                  >
                    Submit Another Response
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mohammad Ali"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      WhatsApp / Mobile Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0323 3260859"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@gmail.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      City of Residence
                    </label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Karachi, Lahore, Islamabad, etc."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                </div>

                {modalMode === 'enroll' && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Select Preferred Payment / Learning Plan
                    </label>
                    <select
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00]"
                    >
                      <option value="Early Bird (Rs. 12,000)">⚡ Early Bird Special — Rs. 12,000 (Pehle 20 Students)</option>
                      <option value="Online Full (Rs. 18,000)">Online Full Access — Rs. 18,000 (One-Time)</option>
                      <option value="Installments (Rs. 10k + 10k)">Easy Installment Plan — Rs. 10,000 + Rs. 10,000</option>
                      <option value="In-Person Karachi Cohort">In-Person Karachi Cohort — Rs. 18,000 + Conveyance</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Questions or Specific Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Koi sawaal ya specific business idea jo aap course mein build karna chahte hain..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {modalMode === 'enroll' ? 'Submit Enrollment Application' : 'Join Priority Waiting List'}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://wa.me/923233260859?text=Assalam%20o%20Alaikum%20AbuQitmirLabs!%20Mujhe%20Skills%20Academy%20Course%20ke%20bare%20mein%20poochna%20hai."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.04] text-neutral-300 border border-white/10 text-xs font-mono uppercase tracking-wider hover:bg-white/[0.08] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    Direct WhatsApp: 0323 3260859
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                  <span>100% Privacy. Zero spam. Directly connected with AbuQitmirLabs admissions team.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. INSTRUCTOR SECTION: Practitioner, Not Just Teacher */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 border border-white/10 relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 blur-3xl rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-3 block">
                  Authentic Pedagogy
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-6">
                  Learn From a Practitioner, Not Just a Teacher
                </h2>
                <div className="space-y-4 text-neutral-300 text-base leading-relaxed">
                  <p>
                    AbuQitmirLabs ek working software agency hai — Karachi mein 2021 se. Hum wahi seekhate hain jo hum rozana khud karte hain — real clients ke liye, high-stakes international projects pe.
                  </p>
                  <p>
                    Tumhare instructor sirf classroom teacher nahi — <strong className="text-white">woh active agency owner hain</strong> jinke paas live client projects, live servers aur live payrolls hain. Tumhara capstone project kisi textbook ka dummy assignment nahi — ek <strong className="text-[#ccff00]">real client ka production kaam</strong> hoga.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-8 text-xs font-mono uppercase tracking-wider">
                  <Link to="/about/our-team" className="text-[#ccff00] hover:underline flex items-center gap-1.5">
                    Hamare Baare Mein Aur Janiye &rarr;
                  </Link>
                  <span className="text-neutral-700">·</span>
                  <Link to="/case-studies" className="text-neutral-300 hover:text-white flex items-center gap-1.5">
                    Humara Kaam Dekho &rarr;
                  </Link>
                  <span className="text-neutral-700">·</span>
                  <Link to="/about/our-company" className="text-neutral-400 hover:text-white">
                    Full Company Info
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-neutral-500 uppercase mb-2">Agency Track Record</div>
                  <div className="text-3xl font-mono font-bold text-white mb-1">Since 2021</div>
                  <div className="text-xs text-neutral-400 mb-6">Active Karachi Engineering Studio</div>
                  
                  <div className="space-y-3 border-t border-white/5 pt-4 text-xs font-mono text-neutral-300">
                    <div>✓ 10+ Global Markets Served</div>
                    <div>✓ Next.js &amp; Modern TypeScript</div>
                    <div>✓ Real Revenue-Generating Output</div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 w-full py-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-center text-xs font-mono uppercase text-white transition-colors"
                >
                  Direct Rabta Karein
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CAPSTONE PROJECT SHOWCASE */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Verifiable Proof
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Graduate With a Real Portfolio, Not Just a Certificate
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Course ke end mein jab aap client ya employer ke samne bethenge, to aapke paas dikhane ke liye live working URL hoga.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                num: '01',
                title: 'Complete Brand Identity',
                desc: 'Strategy document, vector logo lockups, color palettes aur font hierarchies jo professionally formatted honge.'
              },
              {
                num: '02',
                title: 'Live Next.js Website',
                desc: 'Vercel par deployed custom domain ke sath live website jo mobile par 95+ PageSpeed par load hogi.'
              },
              {
                num: '03',
                title: 'Actual Agency Client Work',
                desc: 'AbuQitmirLabs ke live client ecosystem ke liye genuine deliverable jo aapke resume ka benchmark banegi.'
              },
              {
                num: '04',
                title: 'First Client Ready',
                desc: 'Client proposal template, pricing calculator aur outreach strategy ke sath market mein enter hone ki tayari.'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-neutral-950 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#ccff00] mb-4 block">DELIVERABLE {item.num}</span>
                  <h3 className="text-xl font-serif text-white font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 mt-6 flex items-center gap-1.5 text-xs text-[#ccff00] font-mono">
                  <Check className="w-3.5 h-3.5" /> Guaranteed Milestone
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Real Project Reference: TajweedPage */}
          <div className="mt-12 p-8 rounded-3xl bg-neutral-950 border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase text-[#ccff00] mb-1">Authentic Agency Case Study</div>
              <h4 className="text-xl font-serif text-white mb-2">See How We Built TajweedPage from Scratch</h4>
              <p className="text-xs text-neutral-400 max-w-xl">
                Strategy se lekar visual identity, Next.js code aur SEO setup tak — wahi exact framework jo aap course mein seekhte hain.
              </p>
            </div>
            <Link
              to="/case-studies/tajweedpage"
              className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-xs font-mono uppercase text-white shrink-0"
            >
              Inspect Case Study &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION: Accordion */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Clear Doubts
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-4">
              Frequently Asked Questions About Skills Academy
            </h2>
            <p className="text-neutral-400 text-base">
              Coding experience, laptop requirements, installments, aur in-person sessions ke bare mein aam sawalat.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-white/10 bg-neutral-950/60 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-serif text-base sm:text-lg text-white font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      activeFaq === index ? 'rotate-180 text-[#ccff00]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-neutral-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-neutral-950 border-b border-white/5">
        <div className="absolute inset-0 bg-radial-gradient from-[#ccff00]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
            Begin Your Transformation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight leading-tight mb-8">
            Ready to Build Your Brand &amp; Business Online?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Pakistan mein AI-powered brand building ka pehla course — agency backing ke saath, real projects ke saath, community ke saath.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => scrollToForm('enroll', 'Early Bird (Rs. 12,000)')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold tracking-wide text-sm uppercase hover:bg-[#b8e600] transition-all duration-300 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Enroll Now — Rs. 18,000
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToForm('waitlist')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] text-white border border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 font-semibold tracking-wide text-sm uppercase hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Join Free Waiting List
              <Sparkles className="w-4 h-4 text-[#3b82f6]" />
            </button>
          </div>

          <div className="text-xs font-mono text-[#ccff00]">
            ⚡ Early Bird: Pehle 20 students ko Rs. 12,000 mein — limited spots
          </div>
        </div>
      </section>

      {/* 11. INSTITUTE & NGO PARTNERSHIP SECTION */}
      <section className="py-24 md:py-32 relative border-b border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-950 border border-[#8b5cf6]/30 relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#8b5cf6]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="max-w-3xl mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#a78bfa] mb-3 block">
                Institutional Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-4">
                Bring This Course to Your Institute or NGO
              </h2>
              <p className="text-neutral-300 text-base leading-relaxed">
                Kya aap ek school, college, university ya NGO chalate hain aur apne students ko AI-powered brand building sikhana chahte hain? AbuQitmirLabs aapke institution mein yeh course deliver kar sakta hai.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { title: 'In-Person Delivery', desc: 'Hamare agency instructors aapke institution mein aayenge.' },
                { title: 'Full 12-Week Curriculum', desc: 'Aapke semester ya academic schedule ke mutabiq custom pacing.' },
                { title: 'Verified Certification', desc: 'AbuQitmirLabs Certified — har successful student ke liye.' },
                { title: 'Real Agency Projects', desc: 'Students authentic commercial projects par live hands-on kaam karenge.' },
                { title: 'Custom Batch Pricing', desc: 'Batch size aur facilities ke mutabiq subsidized non-profit rates.' }
              ].map((p, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-serif font-medium text-white mb-1.5">{p.title}</div>
                  <div className="text-xs text-neutral-400">{p.desc}</div>
                </div>
              ))}

              <div className="p-5 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#a78bfa] uppercase mb-1">Pricing Format</div>
                  <div className="text-sm font-medium text-white">Custom Institutional Quote</div>
                </div>
                <Link
                  to="/contact"
                  className="mt-3 text-xs font-mono font-bold text-[#ccff00] hover:underline"
                >
                  Request Institution Quote &rarr;
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400 pt-6 border-t border-white/5">
              <Link to="/about/our-process" className="hover:text-[#ccff00] transition-colors">
                Humara Kaam Karne Ka Tarika &rarr;
              </Link>
              <span className="text-neutral-700">·</span>
              <Link to="/case-studies" className="hover:text-[#ccff00] transition-colors">
                Humara Kaam Dekho &rarr;
              </Link>
              <span className="text-neutral-700">·</span>
              <Link to="/contact" className="hover:text-[#ccff00] transition-colors">
                Partnership Rabta Karo &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. WANT TO BUILD YOUR OWN BRAND? (Service vs Course) */}
      <section className="py-24 md:py-32 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
              Decision Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
              Brand Building Seekhna Chahte Ho Ya Banwana?
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Har banda course nahi karna chahta — kuch founders ko direct <strong className="text-white">ready-made brand</strong> chahiye hota hai. Aapke liye do wazeh raste hain:
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 overflow-hidden bg-neutral-950 max-w-4xl mx-auto mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-12 p-5 bg-white/[0.04] border-b border-white/10 font-mono text-xs uppercase tracking-wider">
              <div className="col-span-4 text-neutral-400">Parameter</div>
              <div className="col-span-4 text-[#a78bfa]">Option A: Course</div>
              <div className="col-span-4 text-[#ccff00] font-bold">Option B: Done-For-You Service</div>
            </div>

            {[
              { param: 'Kya Hai', course: 'Khud seekho aur banao', service: 'Hum banate hain aapke liye' },
              { param: 'Time Required', course: '12 hafte', service: '2 se 4 hafte' },
              { param: 'Best For', course: 'Jo seekhna aur earn karna chahte hain', service: 'Jo seedha rapid commercial result chahte hain' },
              { param: 'Fee', course: 'Rs. 18,000 (Early Bird: 12,000)', service: 'Custom Project Quote' },
              { param: 'Primary Output', course: 'Lifelong Skill + Live Brand', service: 'Agency-Grade Professional Brand' }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-5 border-b border-white/5 items-center text-xs sm:text-sm">
                <div className="col-span-4 font-serif text-white font-medium">{row.param}</div>
                <div className="col-span-4 text-neutral-300">{row.course}</div>
                <div className="col-span-4 text-[#ccff00] font-medium">{row.service}</div>
              </div>
            ))}
          </div>

          {/* Pro Tip Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase text-[#ccff00] mb-1">💡 Pro Tip for Founders</div>
              <p className="text-sm text-neutral-300">
                Brand building ke liye basic knowledge hona zaroori hai — chahe aap course karein ya hamari service lein, pehle hamare Brand Building framework ko review karein.
              </p>
            </div>
            <Link
              to="/brand-building"
              className="px-6 py-3 rounded-xl bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600] shrink-0"
            >
              Inspect Brand Building Service &rarr;
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400 mt-8">
            <Link to="/web-development" className="hover:text-white transition-colors">Website Service</Link>
            <span className="text-neutral-700">·</span>
            <Link to="/graphics-design" className="hover:text-white transition-colors">Logo &amp; Visuals</Link>
            <span className="text-neutral-700">·</span>
            <Link to="/seo-mastery" className="hover:text-white transition-colors">SEO Mastery</Link>
            <span className="text-neutral-700">·</span>
            <Link to="/contact" className="hover:text-white transition-colors">Rabta Karo</Link>
          </div>
        </div>
      </section>

      {/* 13. NOT SURE WHERE TO START? Free Consultation */}
      <section className="py-24 md:py-32 relative bg-[#070707] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#ccff00] mb-4 block">
            Zero Obligation Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
            Confused? Hum Help Karenge — Free Consultation
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Koi sawaal hai? Samajh nahi aa raha kaunsa option aapke liye sahi hai?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-neutral-950 border border-white/5">
              <span className="text-xs font-mono text-[#ccff00] block mb-1">Doubt 01</span>
              <span className="text-sm text-white font-medium">Course karna chahiye ya direct freelancing?</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-white/5">
              <span className="text-xs font-mono text-[#a78bfa] block mb-1">Doubt 02</span>
              <span className="text-sm text-white font-medium">Institute ya NGO partnership karni chahiye?</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-white/5">
              <span className="text-xs font-mono text-[#3b82f6] block mb-1">Doubt 03</span>
              <span className="text-sm text-white font-medium">Apne business ka brand banwana chahiye?</span>
            </div>
          </div>

          <p className="text-sm font-mono text-neutral-400 mb-8">
            Ek free 15-minute call pe sab clear ho jayega. Koi sales pitch nahi, sirf honest mashwara.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-semibold text-sm uppercase tracking-wide hover:bg-[#b8e600] transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            Book Free Consultation Call
          </Link>
        </div>
      </section>

      {/* Interactive Modal for Enrollment & Waiting List */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#ccff00]" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {modalMode === 'enroll' ? 'Registration Received!' : 'Added to Waiting List!'}
                  </h3>
                  <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                    Shukriya {formData.name}! Hamari team aap se agle 2–4 ghanton mein WhatsApp ({formData.phone}) par direct rabta karegi aur payment / orientation details share karegi.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600]"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ccff00] mb-1 block">
                      {modalMode === 'enroll' ? 'Direct Enrollment Form' : 'Priority Waiting List'}
                    </span>
                    <h3 className="text-2xl font-serif text-white font-medium">
                      {modalMode === 'enroll' ? 'Join Brand Banao Business Chalao' : 'Reserve Free Waiting List Slot'}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {modalMode === 'enroll' 
                        ? 'Selected: ' + formData.plan
                        : 'Batch 2026 ke launch notifications aur free workshop invites ke liye.'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Apna poora naam likhein"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">WhatsApp / Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0300-1234567"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">City</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Karachi / Lahore etc."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ccff00]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Selected Plan</label>
                        <select
                          value={formData.plan}
                          onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                        >
                          <option value="Early Bird (Rs. 12,000)">Early Bird (Rs. 12,000)</option>
                          <option value="Online Full (Rs. 18,000)">Online Full (Rs. 18,000)</option>
                          <option value="Installments (Rs. 10k + 10k)">Installments (Rs. 10k + 10k)</option>
                          <option value="In-Person Karachi Cohort">In-Person Karachi Cohort</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 rounded-xl bg-[#ccff00] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors cursor-pointer"
                    >
                      {modalMode === 'enroll' ? 'Submit Enrollment Application' : 'Join Priority Waiting List'}
                    </button>

                    <div className="text-[11px] text-center text-neutral-500 font-mono mt-2">
                      🔒 Zero spam. Hamari team directly WhatsApp par payment details degi.
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ServiceToolCtaBanner toolKeys={['project-cost-estimator', 'website-audit']} />
      <Footer />
    </div>
  );
};

export default SkillsAcademyPage;

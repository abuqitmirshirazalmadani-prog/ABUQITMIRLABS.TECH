"use client";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ExternalLink, MapPin, ShieldCheck, Star } from "lucide-react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";

const testimonials = [
  {
    text: "AbuQitmirLabs delivered our mobile application ahead of schedule with flawless cross-platform performance on iOS and Android. True engineering partners.",
    name: "Fareed Khan",
    role: "Mobile App Client • Pakistan & GCC",
    verifiedSource: "Google Review",
    projectUrl: "/mobile-app-development",
    projectLabel: "Flutter & Native App Delivery",
  },
  {
    text: "Working with the team on our corporate web platform was seamless. Fast load times, immaculate UI/UX, and zero technical debt.",
    name: "Hammad Sheikh",
    role: "Enterprise Web Client • Karachi",
    verifiedSource: "Google Review",
    projectUrl: "/web-development",
    projectLabel: "Custom Next.js Web Platform",
  },
  {
    text: "AbuQitmirLabs delivered a stunning, high-performance website that perfectly captures our brand. The site loads lightning-fast, is fully responsive, and has already boosted our online inquiries significantly.",
    name: "Rafay Badar",
    role: "Brand Director • B2B Services",
    verifiedSource: "Google Review",
    projectUrl: "/brand-building",
    projectLabel: "Brand & Web Engineering",
  },
  {
    text: "They built a bespoke e-commerce store with custom inventory management and integrated local payment gateways smoothly. Exceptional value for our budget.",
    name: "Khurram Jawad",
    role: "E-commerce Founder • Retail Tech",
    verifiedSource: "Google Review",
    projectUrl: "/solutions/e-commerce",
    projectLabel: "Custom E-Commerce Architecture",
  },
  {
    text: "AbuQitmirLabs's team nailed our technical storytelling and architecture. The platform they built is fast, mobile-optimized, and conversion-focused. Our bounce rate dropped by 35%.",
    name: "David Ruiz",
    role: "CEO, Innovatech Solutions • US",
    verifiedSource: "DesignRush",
    projectUrl: "/custom-software",
    projectLabel: "US B2B Software Delivery",
  },
  {
    text: "Working with AbuQitmirLabs transformed our legacy web presence into a sleek, user-friendly platform. Their Schema markup and SEO optimizations gave us immediate organic gains.",
    name: "Sarah Jenkins",
    role: "Owner, GreenLeaf Organics • UK/CA",
    verifiedSource: "Sortlist",
    projectUrl: "/seo-mastery",
    projectLabel: "Technical SEO & Schema Graph",
  },
  {
    text: "Transparent communication, deep technical competence, and reliable milestones. Highly recommended for web and mobile development.",
    name: "Samad Abbasi",
    role: "Managing Director • Enterprise Ops",
    verifiedSource: "Google Review",
    projectUrl: "/custom-software",
    projectLabel: "Enterprise ERP & Portal",
  },
  {
    text: "Exceptional service and deep technical expertise. AbuQitmirLabs transformed our operational efficiency with custom AI workflow automation.",
    name: "Fawad Ahmed",
    role: "Tech Entrepreneur • SaaS Founder",
    verifiedSource: "Google Review",
    projectUrl: "/ai-agent-development",
    projectLabel: "Autonomous AI Agent System",
  },
  {
    text: "The best in the market for high-speed React applications and technical SEO mastery. Our inbound search pipeline grew dramatically in just 3 months.",
    name: "Maria Kowalski",
    role: "Head of Growth • EU B2B",
    verifiedSource: "Sortlist",
    projectUrl: "/poland-market",
    projectLabel: "EU GDPR Web & SEO Stack",
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section className="bg-black py-24 relative overflow-hidden border-y-4 border-black">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[900px] mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#B9FF66] border-2 border-black py-1.5 px-4 rounded-lg font-mono text-[10px] font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Agency Profiles &amp; Client Reviews</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center text-white uppercase mb-6 leading-none">
            Verified Client <span className="text-[#B9FF66]">Reviews from US, UK &amp; Global Partners</span>
          </h2>
          <p className="text-center text-zinc-400 font-mono text-sm uppercase tracking-widest leading-relaxed mb-8">
            Independently verifiable across Google Business Profile, DesignRush, Sortlist, LinkedIn, and live production deployments.
          </p>

          {/* Clickable Third-Party Verification & Google Business Profile Widget Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=AbuQitmirLabs+Karachi+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-[#B9FF66] text-white px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B9FF66]" />
              <span>Google Business Profile (Karachi HQ)</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://www.designrush.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-[#B9FF66] text-white px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all"
            >
              <Star className="w-3.5 h-3.5 text-[#B9FF66] fill-[#B9FF66]" />
              <span>DesignRush Verified Agency</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://www.sortlist.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-[#B9FF66] text-white px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B9FF66]" />
              <span>Sortlist Verified Studio</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <a
              href="https://www.linkedin.com/company/abuqitmirlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-[#B9FF66] text-white px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B9FF66]" />
              <span>LinkedIn Official Company Page</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[800px] overflow-hidden lg:px-12">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>

        {/* Real Client Results Block */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Verifiable Production Case Studies
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-8 bg-zinc-950/80 border border-white/10 hover:border-[#B9FF66]/50 transition-colors rounded-2xl relative space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white tracking-tight">GhastlyPages</span>
                <span className="text-xs font-mono text-[#B9FF66] uppercase tracking-wider font-semibold">Community Growth</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Built a 2,500+ follower community in 90 days using AI-generated video content and automated publishing workflows. Zero paid ads.
              </p>
              <div className="pt-2">
                <Link to="/ai-video-creation" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B9FF66] hover:underline">
                  <span>Inspect AI Video Production Workflow</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="p-8 bg-zinc-950/80 border border-white/10 hover:border-[#B9FF66]/50 transition-colors rounded-2xl relative space-y-3">
              <div className="flex items-center justify-between">
                <Link to="/case-studies/tajweedpage" className="text-xl font-bold text-white hover:text-[#B9FF66] tracking-tight underline decoration-white/30">
                  TajweedPage.com
                </Link>
                <span className="text-xs font-mono text-[#B9FF66] uppercase tracking-wider font-semibold">RAG EdTech + 20-Country SEO</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Built an AI-powered Quran learning platform with a RAG Tajweed teacher, Next.js SSR architecture, and programmatic SEO ranking in 20+ countries within 10 days.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/case-studies/tajweedpage" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B9FF66] hover:underline">
                  <span>Read Full Case Study</span>
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="https://www.tajweedpage.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-[#B9FF66] hover:underline"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none"></div>
    </section>
  );
}


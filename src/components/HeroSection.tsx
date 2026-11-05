import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Mail, SendHorizonal } from "lucide-react";
import Image from "./ui/Image";

interface HeroSectionProps {
  onTrialClick?: () => void;
  onDemoClick?: () => void;
}

const teamAvatars = [
  {
    initials: "SD",
    src: "/images/avatar-software-development.webp",
    alt: "Custom software development and scalable cloud systems engineered by AbuQitmirLabs.",
  },
  {
    initials: "MD",
    src: "/images/avatar-mobile-app-development.webp",
    alt: "Cross-platform mobile app development for iOS and Android built by AbuQitmirLabs studio.",
  },
  {
    initials: "WD",
    src: "/images/avatar-web-development.webp",
    alt: "Modern full-stack web development with Next.js and cloud infrastructure by AbuQitmirLabs.",
  },
  {
    initials: "AI",
    src: "/images/avatar-ai-agent-development.webp",
    alt: "Autonomous AI agent development and intelligent RAG systems engineered by AbuQitmirLabs.",
  },
  {
    initials: "SEO",
    src: "/images/avatar-seo-local-seo.webp",
    alt: "Technical SEO and organic growth marketing strategies engineered by AbuQitmirLabs agency.",
  },
];

const stats = [
  { label: "Full Repository & IP Transfer", value: "100% IP & Source Code Ownership" },
  { label: "Scoping to Launch Governance", value: "Structured 5-Step Delivery Process" },
  { label: "Direct Architect Collaboration", value: "Senior-Led Engineering" },
  { label: "US, UK, Europe & GCC", value: "Global Remote Delivery" },
  { label: "Encrypted Pipelines & RBAC", value: "Security-First Architecture" },
  { label: "Founded in 2021", value: "5+ Years Engineering Experience" },
];

export function HeroSection({ onTrialClick, onDemoClick }: HeroSectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        window.open(
          `https://wa.me/923233260859?text=${encodeURIComponent(
            `Hello AbuQitmirLabs team, I would like a consultation for my project. My email/details: ${email}`
          )}`,
          "_blank"
        );
      }, 300);
    }
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen w-full flex flex-col justify-end pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#020202] border-b border-white/10"
      aria-label="Hero Section"
    >
      {/* Background Image with Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-abuqitmirlabs.webp"
          alt="AbuQitmirLabs custom software, AI automation, and growth engineering architecture"
          width={1200}
          height={630}
          priority
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12 animate-enter">
        {/* Avatar stack + Directory Listing + Ticker stats */}
        <div className="space-y-4">
          <div className="flex -space-x-3 items-center">
            {teamAvatars.map((member, i) => (
              <div
                key={i}
                className="size-11 sm:size-13 rounded-full border-2 border-[#C8EB5F] overflow-hidden bg-neutral-800 shrink-0 relative shadow-lg"
                style={{ zIndex: teamAvatars.length - i }}
              >
                <Image
                  alt={member.alt}
                  src={member.src}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            <div className="pl-6 flex flex-col justify-center">
              <span className="text-xs font-mono font-bold text-[#C8EB5F] uppercase tracking-wider">
                Founded in 2021 &bull; 5+ Years Engineering Experience
              </span>
              <span className="text-[10px] tracking-wider text-neutral-400 font-mono uppercase block mt-0.5">
                SENIOR-LED ENGINEERING &bull; LISTED ON CLUTCH &amp; GOODFIRMS
              </span>
            </div>
          </div>

          {/* Scrolling Stats Marquee */}
          <div className="relative overflow-hidden w-full max-w-4xl py-3 border-y border-white/10 bg-black/40 backdrop-blur-sm [--gap:2.5rem] [--duration:25s]">
            <div className="flex animate-marquee gap-[var(--gap)] whitespace-nowrap">
              {stats.map((stat, idx) => (
                <div className="flex items-center gap-3 shrink-0" key={idx}>
                  <span className="font-bold text-[#C8EB5F] text-sm tracking-wider font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
              {stats.map((stat, idx) => (
                <div className="flex items-center gap-3 shrink-0" key={`dup-${idx}`}>
                  <span className="font-bold text-[#C8EB5F] text-sm tracking-wider font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Headline & Call To Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Title & Buttons */}
          <div className="lg:col-span-8 space-y-6 animate-enter-delay-1">
            <span className="text-[#C8EB5F] text-[11px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase block">
              AbuQitmirLabs &bull; Build Software &bull; Automate with AI &bull; Grow Demand
            </span>

            <h1 className="font-serif text-white font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
              Custom Software, AI Automation &amp; Growth Engineering
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#C8EB5F] font-mono tracking-wide font-medium">
              We build revenue systems, not just software.
            </p>

            <div className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light space-y-4 animate-enter-delay-2">
              <p>
                Growth engineering firm for B2B companies. Custom software, AI automation &amp; performance marketing engineered as one revenue system — uniting bespoke product architecture, autonomous AI agents, and search authority under one roof.
              </p>
              <p>
                Serving founders and engineering leaders across the US, UK, Canada, Australia, Poland, Saudi Arabia, UAE, Qatar, and Kuwait with 100% IP ownership and direct senior architect access.
              </p>
              <p>
                Delivered a 2,500+ organic community for GhastlyPages in 90 days and built the AI-assisted Quran education platform for <Link to="/case-studies/tajweedpage" className="text-[#C8EB5F] underline hover:text-white">TajweedPage.com</Link>.
              </p>
            </div>

            {/* Quick Email / Project Input Form */}
            <form onSubmit={handleConsultationSubmit} className="max-w-md pt-2">
              <div className="bg-zinc-950/90 has-[input:focus]:ring-[#C8EB5F]/50 relative grid grid-cols-[1fr_auto] items-center rounded-none border border-white/15 pr-1.5 shadow-2xl has-[input:focus]:ring-2 transition-all">
                <div className="relative flex items-center">
                  <label htmlFor="hero-email-input" className="sr-only">
                    Enter work email for a technical discovery call
                  </label>
                  <Mail className="text-gray-400 pointer-events-none absolute left-4 size-5" />
                  <input
                    id="hero-email-input"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email for discovery call..."
                    className="h-12 w-full bg-transparent pl-12 pr-3 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none font-mono"
                    type="email"
                    required
                    aria-label="Enter work email for a technical discovery call"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    aria-label="Submit email for technical consultation"
                    className="bg-[#C8EB5F] hover:bg-white text-black font-bold h-9 px-4 rounded-none transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
                  >
                    <span>{submitted ? "Sending..." : "Start"}</span>
                    <SendHorizonal className="size-3.5 text-black" />
                  </button>
                </div>
              </div>
            </form>

            {/* Clear Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {onTrialClick ? (
                <button
                  onClick={onTrialClick}
                  className="bg-[#C8EB5F] text-black hover:bg-white text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-all duration-300 shadow-[0_0_30px_rgba(200,235,95,0.2)] flex items-center gap-3 group cursor-pointer"
                >
                  Book a Technical Discovery Call
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1.5 transition-transform"
                  />
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="bg-[#C8EB5F] text-black hover:bg-white text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-all duration-300 shadow-[0_0_30px_rgba(200,235,95,0.2)] flex items-center gap-3 group"
                >
                  Book a Technical Discovery Call
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1.5 transition-transform"
                  />
                </Link>
              )}

              {onDemoClick ? (
                <button
                  onClick={onDemoClick}
                  className="border border-white/20 hover:border-[#C8EB5F] text-white hover:text-[#C8EB5F] text-xs sm:text-sm font-bold tracking-wider px-6 py-4 font-mono uppercase rounded-none transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  View Case Studies
                </button>
              ) : (
                <Link
                  to="/case-studies"
                  className="border border-white/20 hover:border-[#C8EB5F] text-white hover:text-[#C8EB5F] text-xs sm:text-sm font-bold tracking-wider px-6 py-4 font-mono uppercase rounded-none transition-colors duration-300 flex items-center gap-2"
                >
                  View Case Studies
                </Link>
              )}

              <Link
                to="/tools/project-cost-estimator"
                className="border border-white/20 hover:border-[#C8EB5F] text-neutral-300 hover:text-[#C8EB5F] text-xs sm:text-sm font-bold tracking-wider px-6 py-4 font-mono uppercase rounded-none transition-colors duration-300 flex items-center gap-2"
              >
                Estimate Project Cost
              </Link>
            </div>
          </div>

          {/* Right Subtitle & Description */}
          <div className="lg:col-span-4 lg:pl-6 pt-4 lg:pt-0">
            <div className="p-4 sm:p-5 rounded-none border-l-2 border-[#C8EB5F]/40 bg-zinc-950/40 backdrop-blur-sm">
              <p className="text-xs sm:text-sm md:text-base text-neutral-300 italic font-serif leading-relaxed font-light">
                &ldquo;AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

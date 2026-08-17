import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Mail, SendHorizonal } from "lucide-react";

interface HeroSectionProps {
  onTrialClick?: () => void;
  onDemoClick?: () => void;
}

const teamAvatars = [
  {
    initials: "SD",
    src: "https://i.postimg.cc/gktVScfQ/software-development.jpg",
    alt: "Custom software development and full-stack engineering team delivering bespoke enterprise web applications and scalable cloud systems at AbuQitmirLabs.",
  },
  {
    initials: "MD",
    src: "https://i.postimg.cc/nzxBjXDf/mobile-app-develpment-abuqitmirlabs.jpg",
    alt: "Cross-platform mobile app development for iOS and Android platforms built using Flutter, React Native, and native architectures at AbuQitmirLabs studio.",
  },
  {
    initials: "WD",
    src: "https://i.postimg.cc/hPYm8yd5/web-development-abuqitmirlabs.jpg",
    alt: "Modern full-stack web development services utilizing Next.js, React, Node.js, and cloud infrastructure for fast, SEO-optimized apps at AbuQitmirLabs.",
  },
  {
    initials: "AI",
    src: "https://i.postimg.cc/85wJ7tGm/ai-agent-development-abuqitmirlabs.jpg",
    alt: "Autonomous AI agent development, custom LLM integration, workflow automation, and intelligent RAG systems engineered for enterprises by AbuQitmirLabs.",
  },
  {
    initials: "SEO",
    src: "https://i.postimg.cc/NGJ2YJp9/seo-local-seo.jpg",
    alt: "Technical SEO, semantic optimization, AEO AI search visibility, and organic growth marketing strategies engineered for brands by AbuQitmirLabs agency.",
  },
];

const stats = [
  { emoji: "⚡", label: "Full-Stack Web & Next.js", value: "High Performance" },
  { emoji: "🤖", label: "Autonomous AI Agents & RAG", value: "Enterprise AI" },
  { emoji: "🌍", label: "Clients Across US, UK & Europe", value: "Global Delivery" },
  { emoji: "🛡️", label: "Zero-Trust Architecture", value: "99.9% Uptime" },
  { emoji: "🚀", label: "Core Web Vitals Optimized", value: "<0.8s Load Times" },
  { emoji: "⭐", label: "Clutch & GoodFirms Verified", value: "5.0 Rating" },
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

  const handleTrial = () => {
    if (onTrialClick) {
      onTrialClick();
    } else {
      window.open(
        `https://wa.me/923233260859?text=${encodeURIComponent(
          "Hello AbuQitmirLabs team, I would like to discuss building my custom software or AI project."
        )}`,
        "_blank"
      );
    }
  };

  const handleDemo = () => {
    if (onDemoClick) {
      onDemoClick();
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
        <img
          src="https://i.postimg.cc/t4D5HtZr/abuqitmirlabs-tech.jpg"
          alt="AbuQitmirLabs custom software studio delivering AI apps, enterprise web systems, and high-performance digital solutions across US, UK, and Europe."
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter contrast-125"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        {/* Avatar stack + Ratings + Ticker stats */}
        <div className="space-y-4">
          <div className="flex -space-x-3 items-center">
            {teamAvatars.map((member, i) => (
              <div
                key={i}
                className="size-11 sm:size-13 rounded-full border-2 border-[#C8EB5F] overflow-hidden bg-neutral-800 shrink-0 relative shadow-lg"
                style={{ zIndex: teamAvatars.length - i }}
              >
                <img
                  alt={member.alt}
                  src={member.src}
                  width={56}
                  height={56}
                  decoding="async"
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
            ))}
            <div className="pl-6 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[#C8EB5F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-current" />
                ))}
              </div>
              <span className="text-[10px] tracking-wider text-neutral-400 font-mono uppercase block mt-0.5">
                COMMITTED TO ENGINEERING EXCELLENCE &bull; TOP RATED
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
                  <span className="text-xs">{stat.emoji}</span>
                </div>
              ))}
              {/* Duplicate array for continuous infinite marquee loop */}
              {stats.map((stat, idx) => (
                <div className="flex items-center gap-3 shrink-0" key={`dup-${idx}`}>
                  <span className="font-bold text-[#C8EB5F] text-sm tracking-wider font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-white/70 uppercase tracking-[0.15em] font-mono">
                    {stat.label}
                  </span>
                  <span className="text-xs">{stat.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Headline & Call To Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Title & Buttons */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[#C8EB5F] text-[11px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase block">
              ✦ Full-Service Digital Agency &amp; Custom Software Studio ✦
            </h2>

            <h1 className="font-serif text-white font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight uppercase">
              Full-Service Digital Agency &amp; <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">
                Custom Software Studio
              </span>
            </h1>

            {/* Quick Email / Project Input Form */}
            <form onSubmit={handleConsultationSubmit} className="max-w-md pt-2">
              <div className="bg-zinc-950/90 has-[input:focus]:ring-[#C8EB5F]/50 relative grid grid-cols-[1fr_auto] items-center rounded-none border border-white/15 pr-1.5 shadow-2xl has-[input:focus]:ring-2 transition-all">
                <div className="relative flex items-center">
                  <Mail className="text-gray-400 pointer-events-none absolute left-4 size-5" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or project idea..."
                    className="h-12 w-full bg-transparent pl-12 pr-3 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none font-mono"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    aria-label="Submit project idea"
                    className="bg-[#C8EB5F] hover:bg-white text-black font-bold h-9 px-4 rounded-none transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
                  >
                    <span>{submitted ? "Sending..." : "Submit"}</span>
                    <SendHorizonal className="size-3.5 text-black" />
                  </button>
                </div>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleTrial}
                className="bg-[#C8EB5F] text-black hover:bg-white text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-all duration-300 shadow-[0_0_30px_rgba(200,235,95,0.2)] flex items-center gap-3 group cursor-pointer"
              >
                Build Your AI App
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </button>

              {onDemoClick ? (
                <button
                  onClick={handleDemo}
                  className="border border-white/20 hover:border-[#C8EB5F] text-white hover:text-[#C8EB5F] text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  Get Free Consultation
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="border border-white/20 hover:border-[#C8EB5F] text-white hover:text-[#C8EB5F] text-xs sm:text-sm font-bold tracking-wider px-8 py-4 font-mono uppercase rounded-none transition-colors duration-300 flex items-center gap-2"
                >
                  Get Free Consultation
                </Link>
              )}
            </div>
          </div>

          {/* Right Subtitle & Description */}
          <div className="lg:col-span-4 lg:pl-6">
            <p className="text-sm md:text-base lg:text-lg text-neutral-300 italic font-serif leading-relaxed font-light text-left lg:text-right">
              &ldquo;AbuQitmirLabs is a premier custom software development company delivering AI app development services, custom website development services and enterprise software solutions to clients across the United States, United Kingdom, and Europe.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

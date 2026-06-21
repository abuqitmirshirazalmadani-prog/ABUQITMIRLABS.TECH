import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Globe, Layers, CheckCircle, Lightbulb, BookOpen } from 'lucide-react';

export default function HomeCaseStudiesSection() {
  return (
    <section className="bg-black text-white py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      {/* Luxurious Abstract Ambient Emerald-Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-[#B9FF66]/3 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center md:text-left space-y-4 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] text-[#ccff00] font-black uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            PROVEN RESULTS
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-tight"
          >
            Our Work. <span className="text-[#ccff00]">Their Growth.</span>
          </motion.h2>
        </div>

        {/* Major Single Featured Case Study Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950 backdrop-blur-md p-8 md:p-12 lg:p-14 transition-all hover:border-[#ccff00]/20 hover:shadow-[0_0_50px_rgba(185,255,102,0.05)] shadow-2xl"
        >
          {/* Subtle Accent Stripe */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-[#ccff00] to-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badges and Labels */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-4 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] font-mono text-[9px] font-black uppercase tracking-wider">
                  FEATURED PROJECT
                </span>
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-widest font-mono">
                  EdTech Platform + AI Integration + SEO
                </span>
              </div>

              {/* Headline & Project Name */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-serif italic text-3xl sm:text-4xl text-white tracking-tight">
                    TajweedPage.com
                  </h3>
                  <span className="text-zinc-600 text-xs">| Pakistan to Worldwide</span>
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-[#ccff00]">
                  "World's First AI-Powered Quran Learning Platform"
                </h4>
              </div>

              {/* Description Body */}
              <p className="text-[#a1a1aa] text-sm md:text-base font-light leading-relaxed">
                Built a complete Next.js EdTech platform for TajweedPage Online Academy — 15+ pages, 7 dedicated course landing pages, geo-targeted pages for 20+ countries, and the world's first RAG-based AI Tajweed Teacher trained on authentic Islamic scholarly sources.
              </p>

              {/* Grid of 4 Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-black border border-white/5 text-left">
                {[
                  { value: "10 Days", label: "Launch Timeline" },
                  { value: "20+ Countries", label: "Markets Targeted" },
                  { value: "400+ Families", label: "Active Students" },
                  { value: "World's 1st", label: "AI Tajweed Teacher" }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="block font-mono text-xl text-white font-black">{stat.value}</span>
                    <span className="block text-[8px] uppercase tracking-widest text-[#B9FF66] font-extrabold">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Small Tech Pills */}
              <div className="flex flex-wrap gap-2">
                {["Next.js", "RAG AI", "TypeScript", "Tailwind", "Vercel", "SEO", "Firebase"].map((tech, tIdx) => (
                  <span key={tIdx} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] uppercase tracking-widest text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Two buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/case-studies/tajweedpage"
                  className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all transform active:scale-95"
                >
                  View Case Study <ChevronRight size={14} />
                </Link>
                <a
                  href="https://www.tajweedpage.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/5 text-white border border-white/15 px-8 py-4 rounded-full hover:bg-white/10 transition-all font-bold text-xs tracking-widest uppercase"
                >
                  <Globe size={14} /> Visit Live Site <ArrowUpRight size={14} />
                </a>
              </div>

            </div>

            {/* Right Side Image / Graphic Mockup Column */}
            <div className="lg:col-span-5 h-[320px] md:h-[400px] lg:h-[480px] relative rounded-3xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center p-6 group-hover:border-[#ccff00]/10 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-transparent z-10" />
              
              {/* Photo representation of Islamic Quran edtech design */}
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000"
                alt="TajweedPage EdTech Quran Platform Display Illustration"
                className="absolute inset-0 w-full h-full object-cover opacity-50 filter grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Inner floating mockup UI panel overlay to project high technical elegance */}
              <div className="relative z-20 bg-zinc-950/80 backdrop-blur-lg border border-white/10 p-6 rounded-2xl w-full max-w-sm space-y-4 shadow-3xl text-left scale-95 group-hover:scale-100 transition-transform duration-700">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">Interactive System Status</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[8px] font-mono font-black text-emerald-400 uppercase">RAG ACTIVE</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-[#B9FF66]" />
                    <span className="text-[10px] font-bold tracking-wider text-white uppercase">Tajweed Evaluation Engine</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                    Retrieved authority answers on Ahkam-un-Noon-as-Sakinah dynamically, utilizing high-accuracy vector contextual match hooks.
                  </p>
                </div>

                <div className="p-3 bg-black/50 border border-white/5 rounded-lg text-[9px] font-mono text-[#B9FF66] leading-relaxed">
                  [RAG Prompt] Explain Idghaam rules...
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Bottom subtle message and CTA */}
        <div className="mt-16 md:mt-24 text-center space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-xs tracking-widest uppercase font-mono"
          >
            More case studies coming soon.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 bg-white/5 text-xs text-[#ccff00] font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black hover:border-white transition-all transform active:scale-95"
            >
              Start Your Project <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

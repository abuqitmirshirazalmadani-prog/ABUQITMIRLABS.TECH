import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, PhoneCall, HelpCircle, Check, ArrowRight } from 'lucide-react';

export default function WebCustomCTA() {
  return (
    <section className="py-32 bg-[#060608] relative border-t border-neutral-950 overflow-hidden" id="custom-cta">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-950/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Decorative Top Accent */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-[#ccff00]" />
          <span className="text-[9px] font-mono text-[#ccff00] uppercase tracking-[0.25em] font-black">
            BESPOKE ENGINEERING ON DEMAND
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-6 max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-none uppercase">
            Need Something <span className="font-serif italic text-neutral-400 normal-case">Custom?</span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-light font-sans">
            Let's discuss your unique project requirements.
          </p>
        </div>

        {/* Main CTA Button & Bullet Lists wrapper */}
        <div className="max-w-xl mx-auto space-y-8">
          
          {/* Elite WhatsApp Consultation trigger */}
          <div>
            <a
              id="cta-custom-specs-whatsapp"
              href="https://wa.me/923233260859?text=Hello,%20I'm%20looking%20for%20a%20highly%20customized%20web%20solution.%20Let's%20discuss%20my%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ccff00] hover:bg-white text-black font-sans text-xs tracking-[0.14em] uppercase font-black px-10 py-5 rounded-full transition-all duration-300 shadow-2xl hover:scale-[1.02]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Value Propositions Grid list */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
              <span>Free consultation included</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
              <span>Flexible payment plans</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

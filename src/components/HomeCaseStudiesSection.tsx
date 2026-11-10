import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeCaseStudiesSection() {
  return (
    <section className="bg-black text-white py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center md:text-left space-y-3 mb-12">
          <p className="text-xs text-[#ccff00] font-mono font-bold uppercase tracking-[0.2em]">
            Proven Client Results.
          </p>
          <h2 className="font-serif italic font-light text-3xl sm:text-5xl text-white tracking-tight">
            Case Studies: <span className="text-[#ccff00]">Custom Software &amp; AI Development Results</span>
          </h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs text-[#ccff00] font-mono uppercase tracking-wider font-bold">
                Featured Project &bull; EdTech Platform, RAG AI &amp; Global SEO.
              </p>

              <div className="space-y-2">
                <h3 className="font-serif italic text-3xl sm:text-4xl text-white tracking-tight">
                  TajweedPage.com — Pakistan to 20+ Countries
                </h3>
                <p className="text-xl font-bold text-[#ccff00]">
                  World&apos;s First AI-Powered Quran Learning Platform.
                </p>
              </div>

              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed">
                We built a fast Next.js learning platform for TajweedPage Online Academy. The build includes 15 core pages, 7 course pages, local landing pages for over 20 countries, and an AI Tajweed Teacher trained on trusted Islamic books.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-black border border-white/10">
                <div>
                  <p className="font-mono text-xl text-white font-black">10 Days.</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B9FF66] font-bold">Launch Time.</p>
                </div>
                <div>
                  <p className="font-mono text-xl text-white font-black">20+ Markets.</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B9FF66] font-bold">Countries Reached.</p>
                </div>
                <div>
                  <p className="font-mono text-xl text-white font-black">400+ Homes.</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B9FF66] font-bold">Active Students.</p>
                </div>
                <div>
                  <p className="font-mono text-xl text-white font-black">RAG AI.</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#B9FF66] font-bold">24/7 AI Tutor.</p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-[#ccff00]">Verified Live Platform:</strong> Built and maintained by AbuQitmirLabs. Stack: Next.js, RAG AI, TypeScript, Tailwind CSS, Vercel, and Firebase.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/case-studies/tajweedpage"
                  className="inline-flex items-center bg-[#ccff00] text-black font-black uppercase text-xs tracking-widest px-7 py-3.5 rounded-full hover:bg-white transition-all"
                >
                  Read Full Case Study →
                </Link>
                <a
                  href="https://www.tajweedpage.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit TajweedPage live website"
                  className="inline-flex items-center bg-white/5 text-white border border-white/15 px-7 py-3.5 rounded-full hover:bg-white/10 transition-all font-bold text-xs tracking-widest uppercase"
                >
                  Visit Live Site ↗
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src="/images/case-study-tajweedpage.webp"
                alt="TajweedPage AI Recitation & Voice Diagnostics Platform by AbuQitmirLabs"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

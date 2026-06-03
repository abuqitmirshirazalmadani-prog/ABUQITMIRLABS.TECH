import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles } from 'lucide-react';

export default function MobileAppDevelopment() {
  return (
    <div className="bg-[#030303] text-[#f8f8f8] min-h-screen selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Flutter & Native Mobile App Development | AbuQitmirLabs</title>
        <meta name="description" content="Expert Flutter & Native mobile app development for iOS and Android. AbuQitmirLabs builds high-performance apps for global businesses." />
        <link rel="canonical" href="https://abuqitmirlabs.tech/mobile-app-development" />
        
        {/* Playfair Display / Cormorant Garamond */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        <style>{`
          .font-display {
            font-family: 'Cormorant Garamond', serif !important;
          }
          .font-sans {
            font-family: 'Space Grotesk', sans-serif !important;
          }
        `}</style>
      </Helmet>

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#ccff00]/20 rounded-full text-[10px] tracking-[0.3em] font-sans text-[#ccff00] uppercase bg-[#ccff00]/5 mb-8">
          <Sparkles size={10} className="text-[#ccff00] animate-pulse" />
          MOBILITY LABS
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 lowercase">
          Flutter & Native <span className="italic font-light text-zinc-400">Mobile App Development</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 font-sans font-light mb-12 lowercase leading-relaxed">
          At AbuQitmirLabs .TECH, we build high-performance mobile apps for iOS and Android
          using Flutter and native technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-display font-medium text-white mb-6 lowercase border-b border-zinc-800 pb-2">
              What We Build
            </h2>
            <ul className="space-y-3 font-sans text-sm text-zinc-400 font-light lowercase">
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>Cross-platform Flutter apps (iOS + Android)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>Native Android (Kotlin) & iOS (Swift) apps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>SaaS mobile applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>E-commerce & marketplace apps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>AI-powered mobile experiences</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-medium text-white mb-6 lowercase border-b border-zinc-800 pb-2">
              Our Process
            </h2>
            <ul className="space-y-3 font-sans text-sm text-zinc-400 font-light lowercase">
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>Free consultation & requirement gathering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>UI/UX design & prototyping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>Agile development & testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ccff00]">•</span>
                <span>Deployment & ongoing support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-zinc-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 rounded-full blur-2xl pointer-events-none"></div>
          <h2 className="text-3xl font-display font-medium text-white mb-3 lowercase">Apna App Banwayein</h2>
          <p className="text-zinc-500 font-sans text-sm font-light mb-8 max-w-md mx-auto lowercase">
            Free consultation available — aaj hi contact karein. Reach out through WhatsApp or Email to discuss your architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/923233260859"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366]/10 text-green-400 hover:bg-[#25d366]/20 font-sans text-xs tracking-widest uppercase border border-[#25d366]/30 px-8 py-4 rounded-xl transition"
            >
              💬 WhatsApp
            </a>
            <a
              href="mailto:shiraz@abuqitmirlabs.tech"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 text-white hover:bg-white/10 font-sans text-xs tracking-widest uppercase border border-white/10 px-8 py-4 rounded-xl transition"
            >
              📧 Email Karen
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  FileText, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  HelpCircle,
  PhoneCall,
  Info 
} from 'lucide-react';

interface AddonCard {
  id: string;
  category: string;
  caption: string;
  price: string;
  note: string;
  hasPlus?: boolean;
  isPopular?: boolean;
  features: string[];
  featuresWithCustomPrice?: { name: string; price?: string; description?: string }[];
  icon: React.ReactNode;
  themeColor: string;
}

const addonCards: AddonCard[] = [
  {
    id: "branding",
    category: "Branding",
    caption: "Make your brand unforgettable",
    price: "$400",
    note: "Special discount for new customers, free for creating a new website",
    hasPlus: true,
    icon: <Palette className="w-5 h-5 text-[#ccff00]" />,
    themeColor: "lime",
    features: [
      "Logo Design – from $400",
      "Brand color palette",
      "Typography selection",
      "Brand guidelines document"
    ]
  },
  {
    id: "content",
    category: "Content",
    caption: "Professional copy that converts",
    price: "$350",
    note: "Special discount for new customers, free for creating a new website",
    hasPlus: true,
    isPopular: true,
    icon: <FileText className="w-5 h-5 text-cyan-400" />,
    themeColor: "cyan",
    features: [
      "Copywriting (Home + About + Services) – $350",
      "Product descriptions",
      "SEO-optimized content",
      "Call-to-action optimization"
    ]
  },
  {
    id: "integrations",
    category: "Integrations",
    caption: "Connect your tools and automate",
    price: "$100",
    note: "Configure standard automation bridges and APIs",
    hasPlus: true,
    icon: <Cpu className="w-5 h-5 text-fuchsia-400" />,
    themeColor: "fuchsia",
    features: [],
    featuresWithCustomPrice: [
      { name: "Email Setup (Google/WorkMail)", price: "$150" },
      { name: "Custom Forms + Automations", price: "$200+" },
      { name: "Instagram Feed Embed", price: "$100" },
      { name: "Chatbot or Live Chat", price: "$200" },
      { name: "Google Business Profile", price: "$200" },
      { 
        name: "RAG (Retrieval-Augmented Generation) AI Setup", 
        price: "$500", 
        description: "An AI system that connects a Large Language Model (LLM) to external, private, or real-time data sources." 
      }
    ]
  }
];

export default function WebUpsellsPricing() {
  return (
    <section className="py-36 bg-[#060608] relative border-t border-neutral-950 overflow-hidden" id="addons">
      {/* Background ambient light effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-24 text-center md:text-left border-b border-white/10 pb-12 max-w-4xl">
          <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-black block mb-4">
            [ PREMIUM VELOCITY ADD-ONS ]
          </span>
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
            Upsells <span className="font-serif italic text-neutral-400">&amp; Add-ons</span>
          </h2>
          <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light leading-relaxed font-sans">
            Enhance your project with premium extras. Select from specialized visual guidelines, high-conversion copy schemes, or advanced computational setups.
          </p>
        </div>

        {/* Grid Box Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {addonCards.map((card) => {
            const isLime = card.themeColor === 'lime';
            const isCyan = card.themeColor === 'cyan';
            
            return (
              <div
                key={card.id}
                id={`addon-card-${card.id}`}
                className={`relative bg-[#09090b] border rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 shadow-3xl flex flex-col justify-between min-h-[580px] overflow-hidden ${
                  card.isPopular
                    ? 'border-cyan-500/40 bg-zinc-950/50 ring-1 ring-cyan-500/10' 
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                {/* Popular Badge */}
                {card.isPopular && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Category icon header */}
                  <div className={`inline-flex p-3 rounded-2xl border ${
                    isLime ? 'bg-lime-950/20 border-lime-500/20 text-[#ccff00]' :
                    isCyan ? 'bg-cyan-950/20 border-cyan-500/20 text-cyan-400' :
                    'bg-fuchsia-950/20 border-fuchsia-500/20 text-fuchsia-400'
                  }`}>
                    {card.icon}
                  </div>

                  {/* Title metadata */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] block uppercase">
                      [ SEC_{card.category.toUpperCase()} ]
                    </span>
                    <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white mt-1">
                      {card.category}
                    </h3>
                    <p className="text-xs font-serif italic text-neutral-400 mt-1">
                      {card.caption}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="border-y border-white/5 py-5 my-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-mono font-black text-white tracking-widest leading-none">
                        {card.price}
                      </span>
                      {card.hasPlus && <span className="text-white font-mono text-2xl font-black">+</span>}
                    </div>
                    {/* Note details */}
                    <p className="text-[10px] font-mono text-neutral-400 mt-2 leading-relaxed uppercase bg-white/[0.02] border border-white/5 py-1.5 px-3 rounded-lg inline-block">
                      {card.note}
                    </p>
                  </div>

                  {/* Plain text custom features */}
                  {card.features.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                        // INCLUDED CAPABILITIES
                      </span>
                      <ul className="space-y-2.5">
                        {card.features.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              card.isPopular ? 'text-cyan-400' : 'text-[#ccff00]'
                            }`} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Custom pricing list e.g Integrations */}
                  {card.featuresWithCustomPrice && card.featuresWithCustomPrice.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                        // API INTEGRATION LIST
                      </span>
                      <div className="space-y-3">
                        {card.featuresWithCustomPrice.map((item, index) => (
                          <div 
                            key={index} 
                            className="bg-white/[0.01] border border-white/5 rounded-xl p-3 space-y-1"
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-neutral-200 font-medium tracking-tight uppercase select-none">{item.name}</span>
                              <span className="font-mono text-[#ccff00] font-bold shrink-0">{item.price}</span>
                            </div>
                            {item.description && (
                              <p className="text-[10px] text-zinc-500 leading-normal font-light">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Call to action anchor list */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    id={`addon-cta-btn-${card.id}`}
                    href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20adding%20the%20${encodeURIComponent(card.category)}%20Addon%20to%20my%20website%20plan.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      card.isPopular
                        ? 'bg-cyan-400 text-black hover:bg-white hover:scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Get Started</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  HelpCircle, 
  DollarSign, 
  Layers, 
  Sparkles, 
  Briefcase, 
  ShoppingBag, 
  Crown, 
  ArrowRight,
  PhoneCall,
  Info,
  ChevronDown
} from 'lucide-react';

interface WebPackage {
  id: string;
  name: string;
  subtitle: string;
  priceMin: string;
  priceMax: string;
  isPopular?: boolean;
  tagline: string;
  features: string[];
  ctaText: string;
  icon: React.ReactNode;
  themeColor: string;
}

const webPackages: WebPackage[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "Perfect for personal brands & small projects",
    priceMin: "$500",
    priceMax: "$1000",
    tagline: "Speedy entry into high-performance web ecosystems.",
    icon: <Sparkles className="w-5 h-5 text-sky-400" />,
    themeColor: "sky",
    features: [
      "Up to 3 custom-designed pages",
      "Mobile responsive layout",
      "Clean, modern design",
      "Contact form integration",
      "Google indexing + sitemap",
      "Secure HTTPS setup",
      "Deployed via AWS, Vercel, or preferred hosting"
    ],
    ctaText: "Choose Starter Plan"
  },
  {
    id: "business",
    name: "Business",
    subtitle: "Ideal for growing businesses ready to scale",
    priceMin: "$1000",
    priceMax: "$1500",
    isPopular: true,
    tagline: "Our high-engagement flagship cms build.",
    icon: <Briefcase className="w-5 h-5 text-[#ccff00]" />,
    themeColor: "lime",
    features: [
      "Everything in Starter",
      "Up to 8 custom pages",
      "Headless CMS (Sanity, Payload, WordPress)",
      "Blog or portfolio section",
      "Google Analytics setup",
      "SEO meta tags + social previews",
      "Facebook Pixel or Google Tag Manager",
      "Free domain guidance"
    ],
    ctaText: "Launch Business Build"
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    subtitle: "Full-featured online stores that sell",
    priceMin: "$1500",
    priceMax: "$2000",
    tagline: "Maximize checkout conversion with no database limits.",
    icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />,
    themeColor: "cyan",
    features: [
      "Custom e-commerce solution",
      "Up to 10 product pages",
      "Custom checkout experience",
      "Product catalog with CMS or Shopify",
      "Secure checkout (Stripe, PayPal)",
      "Inventory and order tracking",
      "Sales tax & shipping setup",
      "Abandoned cart recovery"
    ],
    ctaText: "Initiate Store Build"
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "Enterprise-grade websites with advanced features",
    priceMin: "$2500",
    priceMax: "+",
    tagline: "Bespoke high-end digital design optimized for search authority.",
    icon: <Crown className="w-5 h-5 text-fuchsia-400" />,
    themeColor: "fuchsia",
    features: [
      "Everything in Business",
      "Up to 15 custom pages",
      "Advanced CMS features",
      "Custom animations (Framer Motion, Lottie)",
      "Advanced SEO + Schema.org markup",
      "Accessibility & performance tuning",
      "Walkthrough training video"
    ],
    ctaText: "Acquire Enterprise Pro"
  }
];

export default function WebDevelopmentPricing() {
  const [currencyMode, setCurrencyMode] = useState<'tier' | 'fixed'>('tier');

  return (
    <section className="py-36 bg-[#08080A] relative border-t border-neutral-900 overflow-hidden" id="packages">
      {/* Background circular glowing elements */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle technical background grid dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with elegant Cormorant style spacing */}
        <div className="mb-24 flex flex-col xl:flex-row xl:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold block mb-4">
              [ WEBSITE PACKAGES ]
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
              Strategic Website <span className="font-serif italic text-neutral-400">Packages</span>
            </h2>
            <h3 className="mt-6 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-bold tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5">
              People from Pakistan, India, Bangladesh should contact us on WhatsApp, rates are different for them. I love these people, I love everyone.
            </h3>
            <h3 className="mt-4 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-medium tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5" style={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}>
              پاکستان، انڈیا، بنگلہ دیش کے لوگ ہم سے واٹس ایپ پر رابطہ کریں، ان کے لیے ریٹس مختلف ہیں۔ میں ان لوگوں سے پیار کرتا ہوں، میں سب سے پیار کرتا ہوں۔
            </h3>
            <p className="mt-4 text-neutral-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
              Custom-built React & Next.js websites designed strictly to transform traffic and maximize daily sales funnels. Select the appropriate blueprint.
            </p>
          </div>

          {/* Interactive Pricing Pill Toggle Switcher */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              // PREFERRED FINANCIAL MODEL
            </span>
            <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-full">
              <button
                id="web-btn-tier"
                onClick={() => setCurrencyMode('tier')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  currencyMode === 'tier' 
                    ? 'bg-white text-black shadow-lg font-extrabold' 
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Package Rates
              </button>
              <button
                id="web-btn-fixed"
                onClick={() => setCurrencyMode('fixed')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  currencyMode === 'fixed' 
                    ? 'bg-white text-black shadow-lg font-extrabold' 
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Fixed Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {currencyMode === 'tier' ? (
            <motion.div
              key="tier-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {webPackages.map((pkg) => {
                const isPopular = pkg.isPopular === true;
                return (
                  <div
                    key={pkg.id}
                    id={`web-pricing-card-${pkg.id}`}
                    className={`relative bg-[#060608] border rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-1 shadow-3xl flex flex-col justify-between min-h-[660px] overflow-hidden ${
                      isPopular 
                        ? 'border-cyan-500/40 bg-zinc-950/40 ring-1 ring-cyan-500/10' 
                        : 'border-white/5 hover:border-white/15 hover:bg-[#0c0c10]'
                    }`}
                  >
                    {/* Floating popular marker tag */}
                    {isPopular && (
                      <div className="absolute top-6 right-6">
                        <span className="bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-lg">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {/* Content Top */}
                    <div className="space-y-6">
                      
                      <div className={`inline-flex p-3 rounded-2xl border ${
                        pkg.themeColor === 'sky' ? 'bg-sky-950/20 border-sky-500/20 text-sky-400' :
                        pkg.themeColor === 'lime' ? 'bg-lime-950/20 border-lime-500/20 text-[#ccff00]' :
                        pkg.themeColor === 'cyan' ? 'bg-cyan-950/20 border-cyan-500/20 text-cyan-400' :
                        'bg-fuchsia-950/20 border-fuchsia-500/20 text-fuchsia-400'
                      }`}>
                        {pkg.icon}
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] block uppercase">
                          [ PACKAGE_{pkg.name.toUpperCase()} ]
                        </span>
                        <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white mt-1">
                          {pkg.name}
                        </h3>
                        <p className="text-xs font-serif italic text-neutral-400 mt-1">
                          {pkg.subtitle}
                        </p>
                      </div>

                      {/* Display Range Cost block */}
                      <div className="border-y border-white/5 py-5 my-5 flex flex-col justify-center">
                        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block font-bold mb-1">
                          // DEVELOPMENT INVESTMENTS
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-mono font-black text-white tracking-widest leading-none">
                            {pkg.priceMin}
                          </span>
                          {pkg.priceMax !== '+' && (
                            <>
                              <span className="text-neutral-500 font-serif italic text-sm">to</span>
                              <span className="text-4xl font-mono font-black text-white tracking-widest leading-none">
                                {pkg.priceMax}
                              </span>
                            </>
                          )}
                          {pkg.priceMax === '+' && (
                            <span className="text-neutral-400 font-mono text-3xl font-black">+</span>
                          )}
                        </div>
                      </div>

                      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                        {pkg.tagline}
                      </p>

                      {/* Feature Bullet Layouts */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                          // INCLUDED DELIVERABLES & FEATURES
                        </span>
                        <ul className="space-y-2">
                          {pkg.features.map((feat, fi) => (
                            <li key={fi} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isPopular ? 'text-cyan-400' : 'text-neutral-600'
                              }`} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Bottom Redraw button */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <a
                        id={`web-pricing-btn-${pkg.id}`}
                        href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20Website%20Package.%20Let's%20discuss.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                          isPopular 
                            ? 'bg-cyan-400 text-black hover:bg-white hover:scale-[1.02]' 
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{pkg.ctaText}</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="fixed-consult-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#060608] border border-white/10 rounded-[3rem] p-8 md:p-14 text-center max-w-4xl mx-auto space-y-8 relative overflow-hidden"
            >
              {/* Internal decorative radial rings */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="inline-flex p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-3xl text-cyan-400 shadow-xl">
                <Layers className="w-8 h-8" />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] font-black block">
                  [ CUSTOM ENGAGEMENT PARAMETERS ]
                </span>
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  Flexible Fixed-Price <span className="font-serif italic text-neutral-300">Consultation</span>
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
                  Have an existing website structure or detailed design layout you want faithfully converted? We discuss the specific pages, feature integrations, and server parameters to deliver a binding, milestone-protected cost statement.
                </p>
              </div>

              <div className="max-w-xl mx-auto bg-white/[0.01] border border-white/5 rounded-xl p-5 text-left flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  <strong>Important Notice:</strong> If we discuss, we can tell you the correct price only after listening to the concept and analyzing the visual assets. NDA contracts are generated promptly to keep your intelligence fully protected.
                </p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  id="web-cta-fixed-whatsapp"
                  href="https://wa.me/923233260859?text=Hello,%20I'd%20like%20to%20discuss%20a%20fixed-price%20quote%20for%20my%20website%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-white text-black font-sans text-xs tracking-[0.14em] uppercase font-black px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:scale-[1.02]"
                >
                  💬 Chat App Blueprint
                </a>
                <a
                  id="web-cta-fixed-email"
                  href="mailto:hello@abuqitmirlabs.tech?subject=Bespoke%20Web%20Consultation%20Inquiry"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 text-zinc-300 hover:bg-white/10 font-sans text-xs tracking-[0.14em] uppercase border border-white/10 px-8 py-4 rounded-full transition-all duration-300"
                >
                  📧 Email Technical Specs
                </a>
              </div>

              <div className="flex flex-col items-center gap-1 font-mono text-xs pt-4">
                <span className="text-zinc-500 uppercase tracking-widest font-black">// DIRECT CHANNEL INQUIRIES:</span>
                <a href="mailto:hello@abuqitmirlabs.tech" className="hover:underline text-white font-medium">hello@abuqitmirlabs.tech</a>
                <a href="mailto:abuqitmirshirazalmadani@gmail.com" className="hover:underline text-slate-400">abuqitmirshirazalmadani@gmail.com</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

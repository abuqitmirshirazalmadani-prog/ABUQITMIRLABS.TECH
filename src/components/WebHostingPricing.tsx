import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Info,
  Server,
  Zap,
  Check
} from 'lucide-react';

interface HostingPkg {
  id: string;
  name: string;
  caption: string;
  monthlyPrice: number;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  icon: React.ReactNode;
  themeColor: string;
}

const hostingPackages: HostingPkg[] = [
  {
    id: "starter",
    name: "Starter",
    caption: "For simple static or branding sites",
    monthlyPrice: 29,
    icon: <Cloud className="w-5 h-5 text-sky-400" />,
    themeColor: "sky",
    features: [
      "CDN-backed hosting (Vercel / AWS)",
      "SSL certificate and HTTPS setup",
      "Uptime monitoring and alerts",
      "Monthly automated backups",
      "99.9% uptime SLA"
    ],
    ctaText: "Get Started"
  },
  {
    id: "business",
    name: "Business",
    caption: "For dynamic sites with CMS, forms, or analytics",
    monthlyPrice: 49,
    isPopular: true,
    icon: <Zap className="w-5 h-5 text-[#ccff00]" />,
    themeColor: "lime",
    features: [
      "Everything in Starter",
      "Daily automated backups",
      "DNS management & configuration",
      "Domain renewal reminders",
      "CDN cache optimization",
      "Google Analytics integration"
    ],
    ctaText: "Get Started"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    caption: "For full-stack apps with databases and integrations",
    monthlyPrice: 79,
    icon: <Server className="w-5 h-5 text-fuchsia-400" />,
    themeColor: "fuchsia",
    features: [
      "Everything in Business",
      "Database hosting (Supabase / AWS RDS)",
      "Auto-scaling infrastructure",
      "Staging environment setup",
      "Priority incident response (4-hr SLA)"
    ],
    ctaText: "Get Started"
  }
];

export default function WebHostingPricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  const discountMultiplier = 0.8; // 20% off for annual subscription

  return (
    <section className="py-36 bg-[#0A0A0C] relative border-t border-neutral-900 overflow-hidden" id="hosting">
      {/* Background radial glow visual halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-fuchsia-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle technical background grid dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with Old Money styling */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-fuchsia-400 uppercase tracking-[0.3em] font-bold block mb-4">
              [ HIGH-AVAILABILITY CLOUD REGISTRY ]
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
              Hosting <span className="font-serif italic text-neutral-400">Plans</span>
            </h2>
            <h3 className="mt-6 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-bold tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5">
              People from Pakistan, India, Bangladesh should contact us on WhatsApp, rates are different for them. I love these people, I love everyone.
            </h3>
            <h3 className="mt-4 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-medium tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5" style={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}>
              پاکستان، انڈیا، بنگلہ دیش کے لوگ ہم سے واٹس ایپ پر رابطہ کریں، ان کے لیے ریٹس مختلف ہیں۔ میں ان لوگوں سے پیار کرتا ہوں، میں سب سے پیار کرتا ہو۔
            </h3>
            <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
              Fast, secure hosting on Vercel and AWS, engineered specifically for the dynamic digital sites we ship. Zero maintenance stress.
            </p>
          </div>

          {/* Interactive Toggle Switch for Monthly vs Annual */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              // CHOOSE BILLING FREQUENCY
            </span>
            <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-full">
              <button
                id="hosting-btn-monthly"
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Monthly
              </button>
              <button
                id="hosting-btn-annually"
                onClick={() => setBillingPeriod('annually')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative ${
                  billingPeriod === 'annually'
                    ? 'bg-white text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Annually
                <span className="absolute -top-3.5 -right-2 bg-fuchsia-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                  -20% Save
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Hosting Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {hostingPackages.map((pkg) => {
            const isPopular = pkg.isPopular === true;
            const finalPrice = billingPeriod === 'annually' 
              ? Math.floor(pkg.monthlyPrice * discountMultiplier) 
              : pkg.monthlyPrice;

            return (
              <div
                key={pkg.id}
                id={`hosting-card-${pkg.id}`}
                className={`relative bg-[#070709] border rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 shadow-3xl flex flex-col justify-between min-h-[560px] overflow-hidden ${
                  isPopular 
                    ? 'border-fuchsia-500/40 bg-zinc-950/45 ring-1 ring-fuchsia-500/10' 
                    : 'border-white/5 hover:border-white/15 hover:bg-[#0c0c10]'
                }`}
              >
                {/* Popular floating badge tag */}
                {isPopular && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Icon Frame */}
                  <div className={`inline-flex p-3 rounded-2xl border ${
                    pkg.themeColor === 'sky' ? 'bg-sky-950/20 border-sky-500/20 text-sky-400' :
                    pkg.themeColor === 'fuchsia' ? 'bg-fuchsia-950/20 border-fuchsia-500/20 text-fuchsia-400' :
                    'bg-lime-950/20 border-lime-500/20 text-[#ccff00]'
                  }`}>
                    {pkg.icon}
                  </div>

                  {/* Title Metadata */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] block uppercase">
                      [ LEVEL_{pkg.name.toUpperCase()} ]
                    </span>
                    <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white mt-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-serif italic text-neutral-400 mt-1">
                      {pkg.caption}
                    </p>
                  </div>

                  {/* Pricing Meter Block */}
                  <div className="border-y border-white/5 py-5 my-5 flex flex-col">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block font-bold mb-1">
                      // SLA STORAGE / RETAINER
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-mono font-black text-white tracking-widest leading-none">
                        ${finalPrice}
                      </span>
                      <span className="text-neutral-500 font-serif italic text-sm">
                        /mo
                      </span>
                    </div>
                    {billingPeriod === 'annually' && (
                      <span className="text-[9px] font-mono text-fuchsia-400 tracking-wider uppercase mt-1">
                        Billed annually (${finalPrice * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Core Features list with custom checkbox styling */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                      // GUARANTEED CAPABILITIES
                    </span>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isPopular ? 'text-fuchsia-400' : 'text-neutral-600'
                          }`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Secure checkout link */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    id={`hosting-cta-btn-${pkg.id}`}
                    href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20Hosting%20SLA%20Plan%20(${billingPeriod}).%20Let's%20activate%20it.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      isPopular 
                        ? 'bg-[#ccff00] text-black hover:bg-white hover:scale-[1.02]' 
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
        </div>

        {/* Global Security SLA footnote */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.01] border border-white/5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest leading-none">
              99.9% Uptime Commitment Backed by Cloud Providers
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

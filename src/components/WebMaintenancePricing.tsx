import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Info,
  Clock,
  Zap,
  Activity
} from 'lucide-react';

interface MaintenancePkg {
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

const maintenancePackages: MaintenancePkg[] = [
  {
    id: "essential",
    name: "Essential",
    caption: "Essential upkeep for sites that need to stay current",
    monthlyPrice: 99,
    icon: <Wrench className="w-5 h-5 text-sky-400" />,
    themeColor: "sky",
    features: [
      "1 hour/month developer time",
      "Security patches and dependency updates",
      "Monthly site health report",
      "Uptime monitoring review"
    ],
    ctaText: "Get Started"
  },
  {
    id: "growth",
    name: "Growth",
    caption: "Active support for sites that need regular improvements",
    monthlyPrice: 249,
    isPopular: true,
    icon: <TrendingUp className="w-5 h-5 text-[#ccff00]" />,
    themeColor: "lime",
    features: [
      "Everything in Essential",
      "4 hours/month developer or content time",
      "Weekly backup verification",
      "Performance and Core Web Vitals monitoring",
      "SEO health monitoring",
      "CMS and plugin updates"
    ],
    ctaText: "Get Started"
  }
];

export default function WebMaintenancePricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  const discountMultiplier = 0.8; // 20% savings for annual

  return (
    <section className="py-36 bg-[#08080A] relative border-t border-neutral-900 overflow-hidden" id="maintenance">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-sky-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Dynamic Grid Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with elegant Cormorant styling */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
              [ CONTINUOUS SITE EVOLUTION ]
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
              Maintenance <span className="font-serif italic text-neutral-400">Plans</span>
            </h2>
            <h3 className="mt-6 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-bold tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5">
              People from Pakistan, India, Bangladesh should contact us on WhatsApp, rates are different for them. I love these people, I love everyone.
            </h3>
            <h3 className="mt-4 text-[#ccff00] text-xl md:text-2xl lg:text-3xl font-medium tracking-wide max-w-3xl leading-relaxed border-l-4 border-[#ccff00] pl-5" style={{ fontFamily: 'Noto Nastaliq Urdu, sans-serif' }}>
              پاکستان، انڈیا، بنگلہ دیش کے لوگ ہم سے واٹس ایپ پر رابطہ کریں، ان کے لیے ریٹس مختلف ہیں۔ میں ان لوگوں سے پیار کرتا ہوں، میں سب سے پیار کرتا ہوں۔
            </h3>
            <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
              Ongoing developer time to keep your digital platform evolving, highly optimised, and secure after dynamic launch. Perfect for growing brands.
            </p>
          </div>

          {/* Interactive Toggle Switch for Monthly vs Annual */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              // CHOOSE BILLING FREQUENCY
            </span>
            <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-full">
              <button
                id="maintenance-btn-monthly"
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
                id="maintenance-btn-annually"
                onClick={() => setBillingPeriod('annually')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 relative ${
                  billingPeriod === 'annually'
                    ? 'bg-white text-black shadow-lg font-extrabold'
                    : 'text-neutral-400 hover:text-white bg-transparent'
                }`}
              >
                Annually
                <span className="absolute -top-3.5 -right-2 bg-[#ccff00] text-black text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                  -20% Save
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {maintenancePackages.map((pkg) => {
            const isPopular = pkg.isPopular === true;
            const finalPrice = billingPeriod === 'annually' 
              ? Math.floor(pkg.monthlyPrice * discountMultiplier) 
              : pkg.monthlyPrice;

            return (
              <div
                key={pkg.id}
                id={`maintenance-card-${pkg.id}`}
                className={`relative bg-[#070709] border rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:-translate-y-1 shadow-3xl flex flex-col justify-between min-h-[560px] overflow-hidden ${
                  isPopular 
                    ? 'border-[#ccff00]/40 bg-zinc-950/45 ring-1 ring-[#ccff00]/10' 
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
                    'bg-lime-950/20 border-lime-500/20 text-[#ccff00]'
                  }`}>
                    {pkg.icon}
                  </div>

                  {/* Title Metadata */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] block uppercase">
                      [ RETAINER_{pkg.name.toUpperCase()} ]
                    </span>
                    <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white mt-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-serif italic text-neutral-400 mt-1">
                      {pkg.caption}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="border-y border-white/5 py-5 my-5 flex flex-col">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block font-bold mb-1">
                      // MONTHLY INVESTMENT
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
                      <span className="text-[9px] font-mono text-[#ccff00] tracking-wider uppercase mt-1">
                        Billed annually (${finalPrice * 12}/yr)
                      </span>
                    )}
                  </div>

                  {/* Core Features list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                      // SLA STANDARDS & DELIVERABLES
                    </span>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isPopular ? 'text-[#ccff00]' : 'text-neutral-600'
                          }`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Call to Action WhatsApp dispatch */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    id={`maintenance-cta-btn-${pkg.id}`}
                    href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20Maintenance%20SLA%20Plan%20(${billingPeriod}).%20Let's%20activate%20it.`}
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

        {/* Global technical monitoring SLA label */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.01] border border-white/5 rounded-full">
            <Activity className="w-4 h-4 text-[#ccff00]" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest leading-none">
              Dedicated Slack Channel + Rapid Response Hours Enabled
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

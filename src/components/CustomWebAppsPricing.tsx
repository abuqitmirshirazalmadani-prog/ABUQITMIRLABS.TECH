import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  TrendingUp, 
  CheckCircle2, 
  PhoneCall, 
  Info,
  Layers,
  Database,
  Cpu,
  ShieldCheck
} from 'lucide-react';

interface CustomAppPkg {
  id: string;
  name: string;
  caption: string;
  price: string;
  priceSuffix?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  icon: React.ReactNode;
  themeColor: string;
}

const customAppPackages: CustomAppPkg[] = [
  {
    id: "mvp",
    name: "MVP Web App",
    caption: "Launch your product idea with extreme velocity",
    price: "$3000",
    priceSuffix: "+",
    isPopular: true,
    icon: <Rocket className="w-5 h-5 text-[#ccff00]" />,
    themeColor: "lime",
    features: [
      "Custom front-end (React/Next.js)",
      "Secure backend (Node, Supabase, Firebase)",
      "User auth, roles, admin dashboards",
      "Cloud hosting setup (AWS, GCP, Vercel)",
      "CI/CD pipeline setup",
      "Documentation & handoff"
    ],
    ctaText: "Launch MVP Web App"
  },
  {
    id: "growth",
    name: "Growth Plan",
    caption: "Continuous high-velocity development partnership",
    price: "$3000",
    priceSuffix: "/mo",
    icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
    themeColor: "cyan",
    features: [
      "Continuous feature rollouts",
      "Weekly agile team sprints",
      "Advanced monitoring & daily backups",
      "CI/CD pipeline full maintenance",
      "Expert dev support & UX enhancements",
      "Priority response time SLAs"
    ],
    ctaText: "Select Growth Partnership"
  }
];

export default function CustomWebAppsPricing() {
  return (
    <section className="py-36 bg-[#0A0A0C] relative border-t border-neutral-900 overflow-hidden" id="custom-apps">
      {/* Background visual light halos */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle technical background grid dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with Old Money styling */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div>
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-[0.3em] font-bold block mb-4">
              [ HIGH-PERFORMANCE COMPUTATION BUILDERS ]
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-none">
              Custom Web <span className="font-serif italic text-neutral-400">Applications</span>
            </h2>
            <p className="mt-6 text-neutral-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed font-sans">
              Scalable, highly secure full-stack software systems custom engineered to address your unique workflow demands and heavy user scales.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-1 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">
              // CLOUD INTEGRITY ASSURED
            </span>
            <span className="text-neutral-400 text-xs font-light">
              AWS, Supabase, &amp; Firebase Partners
            </span>
          </div>
        </div>

        {/* Packages Grid - Beautiful, generous bento-grid arrangement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {customAppPackages.map((pkg) => {
            const isPopular = pkg.isPopular === true;

            return (
              <div
                key={pkg.id}
                id={`custom-app-card-${pkg.id}`}
                className={`relative bg-[#070709] border rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:-translate-y-1 shadow-3xl flex flex-col justify-between min-h-[580px] overflow-hidden ${
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
                    pkg.themeColor === 'cyan' ? 'bg-cyan-950/20 border-cyan-500/20 text-cyan-400' :
                    'bg-lime-950/20 border-lime-500/20 text-[#ccff00]'
                  }`}>
                    {pkg.icon}
                  </div>

                  {/* Title Metadata */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] block uppercase">
                      [ APPLICATION_{pkg.name.toUpperCase().replace(/\s+/g, '_')} ]
                    </span>
                    <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white mt-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-serif italic text-neutral-400 mt-1">
                      {pkg.caption}
                    </p>
                  </div>

                  {/* Price block */}
                  <div className="border-y border-white/5 py-5 my-5 flex flex-col">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest block font-bold mb-1">
                      // ESTIMATED INVESTMENT MATRIX
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-mono font-black text-white tracking-widest leading-none">
                        {pkg.price}
                      </span>
                      {pkg.priceSuffix && (
                        <span className="text-neutral-500 font-serif italic text-sm">
                          {pkg.priceSuffix}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features list with custom dots */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                      // SYSTEM SPECIFICATIONS & DELIVERABLES
                    </span>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light leading-relaxed">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isPopular ? 'text-[#ccff00]' : 'text-cyan-400'
                          }`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* WhatsApp Dispatch redirection anchor */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    id={`custom-app-cta-${pkg.id}`}
                    href={`https://wa.me/923233260859?text=Hello,%20I'm%20interested%20in%20discussing%20the%20${encodeURIComponent(pkg.name)}%20model%20to%20build%20my%20web%20project.%20Let's%20discuss.`}
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

        {/* Dynamic Partner Logo Accents / Footnote */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.01] border border-white/5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest leading-none">
              Fully Documented APIs, Full Ownership Transfer, &amp; Post-launch Support
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

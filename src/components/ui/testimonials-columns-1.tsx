import React from "react";
import { Link } from "react-router-dom";
import { UserCircle, CheckCircle2, ExternalLink } from "lucide-react";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  verifiedSource?: string;
  projectUrl?: string;
  projectLabel?: string;
}

export const TestimonialsColumn: React.FC<{
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}> = ({ className = "", testimonials, duration = 30 }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
        className="flex flex-col gap-6 pb-6 animate-marquee-vertical"
      >
        {testimonials.map(({ text, name, role, verifiedSource, projectUrl, projectLabel }, i) => (
          <div 
            className="p-8 rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full hover:bg-[#B9FF66] transition-colors group shrink-0" 
            key={`orig-${i}`}
          >
            <div className="flex items-center justify-between gap-2 mb-4 text-black text-xs font-black tracking-tight" aria-label="5 out of 5 stars">
              <div className="flex items-center gap-1">
                <span className="text-black text-sm tracking-widest">★★★★★</span>
                <span className="ml-1 text-[11px] font-mono font-extrabold text-black/70">5.0</span>
              </div>
              {verifiedSource && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded text-black/80">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                  {verifiedSource}
                </span>
              )}
            </div>
            <div className="font-medium text-sm leading-relaxed mb-6 italic">&ldquo;{text}&rdquo;</div>
            <div className="mt-auto pt-4 border-t border-black/10 space-y-2.5">
              <div className="flex items-center gap-3">
                <UserCircle className="w-10 h-10 text-black/30 group-hover:text-black transition-colors shrink-0" strokeWidth={1.2} />
                <div className="flex flex-col">
                  <div className="font-black text-xs uppercase tracking-tighter leading-tight">{name}</div>
                  <div className="text-[10px] font-mono text-black/70 uppercase tracking-widest">{role}</div>
                </div>
              </div>
              {projectUrl && projectLabel && (
                <div className="pt-1">
                  <Link
                    to={projectUrl}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black underline hover:opacity-80"
                  >
                    <span>{projectLabel}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Seamless second pass for infinite CSS keyframe loop */}
        {testimonials.map(({ text, name, role, verifiedSource, projectUrl, projectLabel }, i) => (
          <div 
            aria-hidden="true"
            className="p-8 rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full hover:bg-[#B9FF66] transition-colors group shrink-0" 
            key={`dup-${i}`}
          >
            <div className="flex items-center justify-between gap-2 mb-4 text-black text-xs font-black tracking-tight" aria-label="5 out of 5 stars">
              <div className="flex items-center gap-1">
                <span className="text-black text-sm tracking-widest">★★★★★</span>
                <span className="ml-1 text-[11px] font-mono font-extrabold text-black/70">5.0</span>
              </div>
              {verifiedSource && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded text-black/80">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                  {verifiedSource}
                </span>
              )}
            </div>
            <div className="font-medium text-sm leading-relaxed mb-6 italic">&ldquo;{text}&rdquo;</div>
            <div className="mt-auto pt-4 border-t border-black/10 space-y-2.5">
              <div className="flex items-center gap-3">
                <UserCircle className="w-10 h-10 text-black/30 group-hover:text-black transition-colors shrink-0" strokeWidth={1.2} />
                <div className="flex flex-col">
                  <div className="font-black text-xs uppercase tracking-tighter leading-tight">{name}</div>
                  <div className="text-[10px] font-mono text-black/70 uppercase tracking-widest">{role}</div>
                </div>
              </div>
              {projectUrl && projectLabel && (
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-black underline">
                    <span>{projectLabel}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


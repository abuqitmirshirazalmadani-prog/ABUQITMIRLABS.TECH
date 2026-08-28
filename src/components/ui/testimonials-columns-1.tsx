import React from "react";
import { UserCircle } from "lucide-react";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
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
        {testimonials.map(({ text, name, role }, i) => (
          <div 
            className="p-8 rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full hover:bg-[#B9FF66] transition-colors group shrink-0" 
            key={`orig-${i}`}
          >
            <div className="flex items-center gap-1 mb-4 text-black text-xs font-black tracking-tight" aria-label="5 out of 5 stars">
              <span className="text-black text-sm tracking-widest">★★★★★</span>
              <span className="ml-1 text-[11px] font-mono font-extrabold text-black/70">5.0</span>
            </div>
            <div className="font-medium text-sm leading-relaxed mb-6 italic">"{text}"</div>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black/10">
              <UserCircle className="w-10 h-10 text-black/20 group-hover:text-black transition-colors" strokeWidth={1} />
              <div className="flex flex-col">
                <div className="font-black text-xs uppercase tracking-tighter leading-tight">{name}</div>
                <div className="text-[10px] font-mono text-black/60 uppercase tracking-widest">{role}</div>
              </div>
            </div>
          </div>
        ))}
        {/* Seamless second pass for infinite CSS keyframe loop */}
        {testimonials.map(({ text, name, role }, i) => (
          <div 
            aria-hidden="true"
            className="p-8 rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full hover:bg-[#B9FF66] transition-colors group shrink-0" 
            key={`dup-${i}`}
          >
            <div className="flex items-center gap-1 mb-4 text-black text-xs font-black tracking-tight" aria-label="5 out of 5 stars">
              <span className="text-black text-sm tracking-widest">★★★★★</span>
              <span className="ml-1 text-[11px] font-mono font-extrabold text-black/70">5.0</span>
            </div>
            <div className="font-medium text-sm leading-relaxed mb-6 italic">"{text}"</div>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-black/10">
              <UserCircle className="w-10 h-10 text-black/20 group-hover:text-black transition-colors" strokeWidth={1} />
              <div className="flex flex-col">
                <div className="font-black text-xs uppercase tracking-tighter leading-tight">{name}</div>
                <div className="text-[10px] font-mono text-black/60 uppercase tracking-widest">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

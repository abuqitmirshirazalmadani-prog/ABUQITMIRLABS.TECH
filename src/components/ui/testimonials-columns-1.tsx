import React from "react";
import { Link } from "react-router-dom";

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
}> = ({ className = "", testimonials }) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-6 pb-6">
        {testimonials.map(({ text, name, role, verifiedSource, projectUrl, projectLabel }, i) => (
          <article
            className="p-7 rounded-3xl border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full hover:bg-[#B9FF66] transition-colors group"
            key={`rev-${i}`}
          >
            <p className="flex items-center justify-between gap-2 mb-3 text-black text-xs font-black tracking-tight m-0">
              <span className="text-black text-sm tracking-widest">★★★★★ 5.0.</span>
              {verifiedSource && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/5 px-2 py-0.5 rounded text-black/80">
                  ✓ {verifiedSource}.
                </span>
              )}
            </p>
            <p className="font-medium text-sm leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
            <div className="pt-3 border-t border-black/10 text-xs">
              <p className="font-black uppercase tracking-tight m-0">{name}. <span className="text-[10px] font-mono text-black/70">{role}.</span></p>
              {projectUrl && projectLabel && (
                <p className="pt-1.5 m-0">
                  <Link
                    to={projectUrl}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider text-black underline hover:opacity-80"
                  >
                    {projectLabel} →
                  </Link>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};



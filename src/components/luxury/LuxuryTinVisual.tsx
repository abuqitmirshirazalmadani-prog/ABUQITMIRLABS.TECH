import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export interface TinDetails {
  id: string;
  editionNumber: string;
  name: string;
  subtitle: string;
  vintage: string;
  allocationTotal: number;
  allocationRemaining: number;
  price: string;
  themeColor: string;
  accentGlow: string;
  haloGradient: string;
  elevation: string;
  origin: string;
  harvest: string;
  steepProfile: string;
  tastingNotes: string[];
  vesselSpec: string;
  imageUrl: string;
  stampSymbol: string;
  description: string;
}

interface LuxuryTinVisualProps {
  tin: TinDetails;
  isInspecting?: boolean;
  onInspectToggle?: () => void;
}

export const LuxuryTinVisual: React.FC<LuxuryTinVisualProps> = ({
  tin,
  isInspecting = false,
  onInspectToggle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tinRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseActive, setMouseActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tinRef.current) return;
    const rect = tinRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 14;
    const rotY = (x / (rect.width / 2)) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setMouseActive(true);

    if (sheenRef.current) {
      const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
      const sheenY = ((e.clientY - rect.top) / rect.height) * 100;
      sheenRef.current.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)`;
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setMouseActive(false);
    if (sheenRef.current) {
      sheenRef.current.style.background = 'transparent';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-[520px] aspect-[4/5] mx-auto select-none perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* High-contrast vibrant colored ambient halo against pitch-black background */}
      <div
        className="absolute w-[120%] h-[120%] -z-10 rounded-full blur-[110px] opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{
          background: tin.haloGradient,
          transform: `translate(${rotateY * 1.5}px, ${-rotateX * 1.5}px)`,
        }}
      />

      {/* Floating Tin Body Container */}
      <div
        ref={tinRef}
        className="tin-element relative w-full h-full flex flex-col items-center justify-center transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${mouseActive ? 1.04 : 1}, ${mouseActive ? 1.04 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Tin Outer Shell with Photorealistic Shadow & Specular Lighting */}
        <div className="relative w-[300px] sm:w-[360px] md:w-[410px] h-[440px] sm:h-[490px] md:h-[540px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] bg-[#070707] flex flex-col items-center justify-between p-6">
          
          {/* Real high-contrast product photography background */}
          <div className="absolute inset-0 z-0">
            <img
              src={tin.imageUrl}
              alt={`${tin.name} bespoke luxury tin`}
              className="w-full h-full object-cover object-center opacity-85 brightness-110 contrast-125 saturate-130 transition-transform duration-700 scale-105"
              loading="eager"
            />
            {/* Rich gradient overlay for luxury lacquer look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          </div>

          {/* Dynamic Specular Sheen Layer */}
          <div
            ref={sheenRef}
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
          />

          {/* Top Bezel / Brass Cap & Latitudinal Engraving */}
          <div className="relative z-20 w-full flex items-center justify-between pt-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tin.themeColor }} />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-300">
                {tin.editionNumber}
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              {tin.vintage}
            </span>
          </div>

          {/* Centerpiece Intaglio / Old-Money Crest */}
          <div className="relative z-20 my-auto text-center px-4 py-6">
            <div
              className="w-14 h-14 mx-auto mb-4 rounded-full border flex items-center justify-center font-serif text-xl italic shadow-inner"
              style={{
                borderColor: `${tin.themeColor}55`,
                color: tin.themeColor,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {tin.stampSymbol}
            </div>

            <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-2">
              L’Atelier De Réserve
            </p>

            <h3
              className="text-2xl sm:text-3xl font-serif text-white tracking-wide font-normal"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              {tin.name}
            </h3>

            <p
              className="text-sm font-serif italic mt-1 tracking-wide"
              style={{ color: tin.themeColor }}
            >
              {tin.subtitle}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-3 text-[10px] font-mono tracking-widest text-neutral-400">
              <span>{tin.origin}</span>
              <span className="text-neutral-600">·</span>
              <span>{tin.elevation}</span>
            </div>
          </div>

          {/* Base Guilloché Seal & Allocation Number */}
          <div className="relative z-20 w-full flex items-center justify-between border-t border-white/10 pt-3">
            <div className="text-left">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                Remaining Allocation
              </p>
              <p className="text-xs font-mono font-bold text-white tracking-wider">
                {tin.allocationRemaining} <span className="text-neutral-500 font-normal">/ {tin.allocationTotal}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                Reserve Cuvée
              </p>
              <p className="text-sm font-serif italic font-medium" style={{ color: tin.themeColor }}>
                {tin.price}
              </p>
            </div>
          </div>

          {/* Tactile 3D Edge Highlights */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Reflection & Contact Shadow underneath */}
        <div
          className="absolute -bottom-10 w-[70%] h-8 rounded-full blur-xl pointer-events-none transition-all duration-300"
          style={{
            backgroundColor: `${tin.themeColor}33`,
            transform: `scaleX(${mouseActive ? 1.15 : 1}) translateY(${rotateX * 0.5}px)`,
          }}
        />
      </div>

      {/* Interactive 3D Inspection Hint */}
      <div className="absolute -bottom-10 inset-x-0 text-center pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
          Move cursor to reveal metallic depth
        </span>
      </div>
    </div>
  );
};

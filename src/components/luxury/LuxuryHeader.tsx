import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ArrowLeft, Sparkles, Compass } from 'lucide-react';

interface LuxuryHeaderProps {
  currentEditionIndex: number;
  totalEditions: number;
  onSelectEdition: (index: number) => void;
  onOpenConcierge: () => void;
}

export const LuxuryHeader: React.FC<LuxuryHeaderProps> = ({
  currentEditionIndex,
  totalEditions,
  onSelectEdition,
  onOpenConcierge,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Subtle ambient meditation / warm cello harmonic chord generator using Web Audio API
  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Base warm harmonic tone (108 Hz - Sacred deep A/C resonance)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, ctx.currentTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(216, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        oscillatorRef.current = osc1;
        gainNodeRef.current = gain;
        setIsAudioPlaying(true);
      } catch (e) {
        console.warn('Audio not supported:', e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 1
        );
        setTimeout(() => {
          audioCtxRef.current?.close();
          setIsAudioPlaying(false);
        }, 1000);
      } else {
        setIsAudioPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-[100] h-20 sm:h-24 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
      {/* Left: Back to Main Agency + Crest */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <Link
          to="/"
          className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          title="Return to AbuQitmirLabs"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors bg-black/40 backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] hidden sm:inline-block">
            Studio
          </span>
        </Link>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

        <div className="pointer-events-auto">
          <Link to="/luxury-brand-experience" className="text-left block">
            <span className="font-serif text-lg sm:text-xl tracking-[0.18em] text-white font-normal block leading-none">
              L’ATELIER DE RÉSERVE
            </span>
            <span className="text-[8px] font-mono tracking-[0.35em] text-neutral-400 uppercase block mt-1">
              Private Cellar Editions · 2026
            </span>
          </Link>
        </div>
      </div>

      {/* Center: Roman Numeral Edition Selector (Desktop) */}
      <div className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-lg pointer-events-auto">
        {Array.from({ length: totalEditions }).map((_, i) => {
          const roman = ['I', 'II', 'III', 'IV', 'V'][i];
          const active = currentEditionIndex === i;
          return (
            <button
              key={i}
              onClick={() => onSelectEdition(i)}
              className={`text-xs font-serif tracking-widest transition-all ${
                active
                  ? 'text-amber-300 font-bold scale-110 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              N° {roman}
            </button>
          );
        })}
      </div>

      {/* Right: Audio Ambience & Concierge Allocation Call */}
      <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
        {/* Ambient Sound Toggle */}
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all ${
            isAudioPlaying
              ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
              : 'border-white/10 bg-black/40 text-neutral-400 hover:text-white hover:border-white/20 backdrop-blur-md'
          }`}
          title={isAudioPlaying ? 'Mute ambient cellar acoustics' : 'Experience cellar atmosphere'}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">Ambience On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sound</span>
            </>
          )}
        </button>

        {/* Private Concierge Button */}
        <button
          onClick={onOpenConcierge}
          className="px-4 sm:px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black font-serif text-xs tracking-wider transition-all duration-300 backdrop-blur-md"
        >
          Acquire Allocation
        </button>
      </div>
    </header>
  );
};

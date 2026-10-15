import React, { useState } from 'react';
import { X, Check, Shield, Sparkles, Lock, ArrowRight, Award } from 'lucide-react';
import { TinDetails } from './LuxuryTinVisual';

interface AllocationDrawerProps {
  tin: TinDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AllocationDrawer: React.FC<AllocationDrawerProps> = ({ tin, isOpen, onClose }) => {
  const [monogram, setMonogram] = useState('A.Q');
  const [selectedSerial, setSelectedSerial] = useState('N° 088');
  const [includeVelvetBox, setIncludeVelvetBox] = useState(true);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !tin) return null;

  const serials = ['N° 018', 'N° 042', 'N° 088', 'N° 114', 'N° 189', 'N° 220'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/85 backdrop-blur-md transition-all duration-500 animate-in fade-in">
      {/* Background dismissal overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl h-full bg-[#070707] border-l border-white/10 text-white flex flex-col justify-between overflow-y-auto shadow-2xl p-8 sm:p-12 z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
              Private Cellar Allocation
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-white mt-1">
              {tin.editionNumber} · {tin.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
            aria-label="Close Allocation Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="my-auto py-12 text-center space-y-6">
            <div
              className="w-16 h-16 mx-auto rounded-full border border-amber-400/40 flex items-center justify-center text-2xl font-serif italic text-amber-300"
              style={{ backgroundColor: `${tin.themeColor}22` }}
            >
              <Award className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                Allocation Reserved
              </span>
              <h3 className="text-3xl font-serif text-white">
                Certificate of Provenance #{selectedSerial.replace('N° ', '')}
              </h3>
              <p className="text-neutral-400 text-sm font-serif max-w-md mx-auto leading-relaxed">
                Thank you, {clientName}. Your bespoke allocation of {tin.name} ({tin.editionNumber}) with engraved initials &ldquo;{monogram}&rdquo; has been secured in the temperature-controlled reserve vault.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/60 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Client Dossier:</span>
                <span className="text-white">{clientEmail}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Cuvée Price:</span>
                <span className="text-white font-bold">{tin.price}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Presentation:</span>
                <span className="text-white">Aged Walnut & Silk Ribbon</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-neutral-400">Courier Dispatch:</span>
                <span className="text-emerald-400">Diplomatic White-Glove (Insured)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-8 py-3.5 border border-white/20 hover:border-white rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all"
            >
              Return to Collection
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-8">
            {/* Tin Summary Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center gap-6">
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-white/10 bg-black shrink-0 relative">
                <img
                  src={tin.imageUrl}
                  alt={tin.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  {tin.vintage} · {tin.origin}
                </span>
                <h4 className="text-xl font-serif text-white">{tin.name}</h4>
                <p className="text-sm font-serif italic" style={{ color: tin.themeColor }}>
                  {tin.price} · {tin.allocationRemaining} Available Globally
                </p>
              </div>
            </div>

            {/* Custom Monogram Engraving */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">
                  Guilloché Brass Monogram Engraving
                </label>
                <span className="text-[10px] font-mono text-neutral-400">Comped by Atelier</span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  maxLength={4}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="A.Q"
                  className="w-28 px-4 py-3 bg-black border border-white/20 rounded-xl text-center text-lg font-serif tracking-widest text-white uppercase focus:outline-none focus:border-amber-400"
                />
                <div className="text-xs font-serif italic text-neutral-400">
                  Precision intaglio stamped onto the lid bezel of tin {selectedSerial}.
                </div>
              </div>
            </div>

            {/* Select Available Certificate Number */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">
                Select Numbered Seal
              </label>
              <div className="grid grid-cols-3 gap-2">
                {serials.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSerial(s)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono tracking-wider transition-all ${
                      selectedSerial === s
                        ? 'border-amber-400/80 bg-amber-400/10 text-white font-bold'
                        : 'border-white/10 bg-black/40 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging Option */}
            <div className="space-y-3 pt-2">
              <label
                onClick={() => setIncludeVelvetBox(!includeVelvetBox)}
                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center ${
                      includeVelvetBox ? 'border-amber-400 bg-amber-400 text-black' : 'border-white/30'
                    }`}
                  >
                    {includeVelvetBox && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-wide text-white uppercase">
                      Handcrafted Walnut Vault Case
                    </p>
                    <p className="text-[11px] font-serif italic text-neutral-400">
                      Lined with charcoal velvet and numbered wax seal
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-400">Included</span>
              </label>
            </div>

            {/* Contact Dossier */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Lady Eleanor Vance"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-xl text-sm font-sans text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-300">
                  Direct Concierge Email
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@sanctuary-estates.com"
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-xl text-sm font-sans text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-black border border-white/5 text-[11px] font-serif text-neutral-400 leading-relaxed">
              <Shield className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
              <span>
                Each reserve allocation is hermetically purged with food-grade argon gas to preserve peak botanical volatile aromatics for a minimum of 36 months.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-white text-black font-serif text-lg tracking-wider hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-medium"
            >
              <span>Secure Allocation · {tin.price}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Bottom Subtext */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          <span>Global Insured Transit</span>
          <span>Zero-Risk Guarantee</span>
        </div>
      </div>
    </div>
  );
};

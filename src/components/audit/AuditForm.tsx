import React, { useState } from 'react';
import { Search, Smartphone, Monitor, Clipboard, Check, Sparkles } from 'lucide-react';
import { DeviceStrategy } from '../../types/audit';

interface AuditFormProps {
  onRunAudit: (url: string, device: DeviceStrategy, categories: string[]) => void;
  isLoading: boolean;
  initialUrl?: string;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onRunAudit, isLoading, initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [device, setDevice] = useState<DeviceStrategy>('mobile');
  const [pasted, setPasted] = useState(false);
  const [categories, setCategories] = useState({
    performance: true,
    seo: true,
    accessibility: true,
    security: true,
    bestPractices: true
  });

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setPasted(true);
          setTimeout(() => setPasted(false), 2000);
        }
      }
    } catch {
      // Clipboard permissions denied
    }
  };

  const toggleCategory = (cat: keyof typeof categories) => {
    setCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    const enabledCategories = Object.entries(categories)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key);

    onRunAudit(url.trim(), device, enabledCategories.length > 0 ? enabledCategories : ['performance']);
  };

  const sampleUrls = [
    'https://www.abuqitmirlabs.tech',
    'https://example.com',
    'https://wikipedia.org'
  ];

  return (
    <div id="audit-tool-form" className="w-full bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Instant URL Analysis
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
        Audit Any Website Live
      </h2>
      <p className="text-gray-400 text-sm md:text-base mb-6">
        Enter any public URL to run deep performance, Google Core Web Vitals, SEO, accessibility, and security checks.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div>
          <label htmlFor="target-url-input" className="block text-xs font-mono uppercase text-gray-400 mb-2 tracking-wider">
            Target Website URL *
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-500 pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="target-url-input"
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#141414] border border-[#333] hover:border-[#555] focus:border-[#ccff00] rounded-xl pl-12 pr-28 py-4 text-white text-base md:text-lg placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ccff00] transition-all font-sans"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePaste}
                title="Paste from clipboard"
                className="px-3 py-2 bg-[#222] hover:bg-[#333] text-gray-300 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                {pasted ? <Check className="w-3.5 h-3.5 text-[#ccff00]" /> : <Clipboard className="w-3.5 h-3.5" />}
                <span>{pasted ? 'Pasted!' : 'Paste'}</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
            <span className="text-xs text-gray-500">
              Must be a valid domain or page URL (e.g. <span className="text-gray-400 font-mono">https://domain.com</span>)
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="text-gray-500">Try demo:</span>
              {sampleUrls.map((sUrl) => (
                <button
                  key={sUrl}
                  type="button"
                  onClick={() => setUrl(sUrl)}
                  className="text-gray-400 hover:text-[#ccff00] underline underline-offset-2 transition-colors"
                >
                  {sUrl.replace('https://', '').replace('www.', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Device Strategy & Category Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#1a1a1a]">
          {/* Device Strategy */}
          <div>
            <label className="block text-xs font-mono uppercase text-gray-400 mb-2 tracking-wider">
              Simulation Device
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#141414] p-1.5 rounded-xl border border-[#262626]">
              <button
                type="button"
                id="device-mobile-btn"
                onClick={() => setDevice('mobile')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  device === 'mobile'
                    ? 'bg-[#ccff00] text-black font-bold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#222]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile (Moto G4/4G)</span>
              </button>

              <button
                type="button"
                id="device-desktop-btn"
                onClick={() => setDevice('desktop')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  device === 'desktop'
                    ? 'bg-[#ccff00] text-black font-bold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-[#222]'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Desktop (Emulated)</span>
              </button>
            </div>
          </div>

          {/* Audit Categories */}
          <div>
            <label className="block text-xs font-mono uppercase text-gray-400 mb-2 tracking-wider">
              Assessment Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'performance', label: '🚀 Performance', state: categories.performance },
                { id: 'seo', label: '🔍 SEO', state: categories.seo },
                { id: 'accessibility', label: '♿ Accessibility', state: categories.accessibility },
                { id: 'security', label: '🔒 Security', state: categories.security },
                { id: 'bestPractices', label: '✅ Best Practices', state: categories.bestPractices }
              ].map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    cat.state
                      ? 'bg-[#1b2612] border-[#ccff00]/40 text-[#ccff00]'
                      : 'bg-[#141414] border-[#2b2b2b] text-gray-500 hover:border-gray-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="run-audit-submit-btn"
            disabled={isLoading || !url.trim()}
            className="w-full py-4 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-black font-bold text-base md:text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.25)] transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Target Website...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Run Free Website Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Privacy badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1 font-mono">
          <span>🔒 100% Free · No Registration · Real-Time Deep Analysis · Zero Data Retention</span>
        </div>
      </form>
    </div>
  );
};

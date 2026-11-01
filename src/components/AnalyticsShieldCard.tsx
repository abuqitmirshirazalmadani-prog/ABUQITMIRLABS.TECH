import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Trash2, CheckCircle2, Globe, Lock } from 'lucide-react';
import {
  GA_MEASUREMENT_ID,
  getConfiguredTeamIps,
  saveConfiguredTeamIps,
  getConfiguredUnwantedReferrals,
  saveConfiguredUnwantedReferrals,
  isBrowserMarkedInternal,
  markBrowserAsInternalTraffic,
  detectClientIpAndVerifyTeamFilter,
} from '../utils/analyticsShield';

export default function AnalyticsShieldCard() {
  const [isInternalDevice, setIsInternalDevice] = useState<boolean>(true);
  const [detectedIp, setDetectedIp] = useState<string>('');
  const [teamIps, setTeamIps] = useState<string[]>([]);
  const [newIpInput, setNewIpInput] = useState<string>('');
  const [unwantedReferrals, setUnwantedReferrals] = useState<string[]>([]);
  const [newReferralInput, setNewReferralInput] = useState<string>('');
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  useEffect(() => {
    // Automatically tag any browser visiting Admin Dashboard as internal team traffic
    markBrowserAsInternalTraffic(true);
    setIsInternalDevice(isBrowserMarkedInternal());
    setTeamIps(getConfiguredTeamIps());
    setUnwantedReferrals(getConfiguredUnwantedReferrals());

    detectClientIpAndVerifyTeamFilter().then(({ ip }) => {
      if (ip) {
        setDetectedIp(ip);
        setTeamIps(getConfiguredTeamIps());
        setUnwantedReferrals(getConfiguredUnwantedReferrals());
      }
    });
  }, []);

  const syncWithBackend = async (nextIps: string[], nextReferrals: string[], message: string) => {
    saveConfiguredTeamIps(nextIps);
    saveConfiguredUnwantedReferrals(nextReferrals);
    setTeamIps(getConfiguredTeamIps());
    setUnwantedReferrals(getConfiguredUnwantedReferrals());
    try {
      await fetch('/api/client-ip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamIps: nextIps,
          unwantedReferrals: nextReferrals,
        }),
      });
    } catch {}
    setSavedBanner(message);
    setTimeout(() => setSavedBanner(null), 4000);
  };

  const handleToggleDeviceShield = () => {
    const next = !isInternalDevice;
    markBrowserAsInternalTraffic(next);
    setIsInternalDevice(next);
    setSavedBanner(
      next
        ? `This browser is marked as Internal Team Traffic (${GA_MEASUREMENT_ID} disabled).`
        : 'Internal device flag removed for this browser.'
    );
    setTimeout(() => setSavedBanner(null), 4000);
  };

  const handleAddDetectedIp = () => {
    if (!detectedIp) return;
    if (teamIps.includes(detectedIp)) return;
    const nextIps = [...teamIps, detectedIp];
    syncWithBackend(nextIps, unwantedReferrals, `Team IP ${detectedIp} added to Internal Traffic filter.`);
  };

  const handleAddCustomIp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newIpInput.trim();
    if (!clean) return;
    const nextIps = Array.from(new Set([...teamIps, clean]));
    setNewIpInput('');
    syncWithBackend(nextIps, unwantedReferrals, `Team IP ${clean} added to Internal Traffic filter.`);
  };

  const handleRemoveIp = (ipToRemove: string) => {
    const nextIps = teamIps.filter((ip) => ip !== ipToRemove);
    syncWithBackend(nextIps, unwantedReferrals, `Removed IP ${ipToRemove} from Internal Traffic filter.`);
  };

  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newReferralInput
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');
    if (!clean) return;
    const nextRefs = Array.from(new Set([...unwantedReferrals, clean]));
    setNewReferralInput('');
    syncWithBackend(teamIps, nextRefs, `Added ${clean} to Unwanted Referrals blocklist.`);
  };

  return (
    <div className="p-8 rounded-3xl bg-zinc-950 border border-emerald-500/20 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-black uppercase text-white tracking-wide">
                GA4 Bot, Referral &amp; Internal Traffic Shield ({GA_MEASUREMENT_ID})
              </h3>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Protection
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Blocks 0s bot traffic from <code className="text-emerald-300">m.facebook.com</code>, referral spam from{' '}
              <code className="text-emerald-300">ghastlypages.com</code>, testing hits from{' '}
              <code className="text-emerald-300">tagassistant.google.com</code>, and excludes Admin/Team IPs from GA4.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleDeviceShield}
          className={`px-5 py-3 rounded-xl font-black uppercase text-[11px] tracking-wider transition-all flex items-center gap-2 shrink-0 ${
            isInternalDevice
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-white/10 text-gray-300 border border-white/10'
          }`}
        >
          <Lock size={14} />
          {isInternalDevice ? 'Internal Device Excluded (ON)' : 'Mark Device as Internal'}
        </button>
      </div>

      {savedBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{savedBanner}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internal Team IPs Filter */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Lock size={14} className="text-blue-400" /> Internal Team IP Filter (Admin &amp; Team)
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Admin panel views and any IP listed below are automatically excluded from GA4.
              </p>
            </div>
            {detectedIp && !teamIps.includes(detectedIp) && (
              <button
                type="button"
                onClick={handleAddDetectedIp}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider transition-all shrink-0"
              >
                + Add My IP ({detectedIp})
              </button>
            )}
          </div>

          <form onSubmit={handleAddCustomIp} className="flex gap-2">
            <input
              type="text"
              value={newIpInput}
              onChange={(e) => setNewIpInput(e.target.value)}
              placeholder={detectedIp ? `e.g. ${detectedIp}` : 'Enter team IPv4 / IPv6 address'}
              className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-xs outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus size={14} /> Add IP
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1.5">
              /admin &amp; /login routes (Auto-Blocked)
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1.5">
              tagassistant.google.com (Auto-Blocked)
            </span>
            {teamIps.map((ip) => (
              <span
                key={ip}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[11px] flex items-center gap-2"
              >
                {ip}
                <button
                  type="button"
                  onClick={() => handleRemoveIp(ip)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  aria-label={`Remove ${ip}`}
                >
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Unwanted Referrals & Bot Blocklist */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Globe size={14} className="text-emerald-400" /> Unwanted Referrals &amp; Spam Bot Blocklist
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Referrals below are stripped or blocked, and <code className="text-emerald-300">m.facebook.com</code> 0s bot hits require human verification.
            </p>
          </div>

          <form onSubmit={handleAddReferral} className="flex gap-2">
            <input
              type="text"
              value={newReferralInput}
              onChange={(e) => setNewReferralInput(e.target.value)}
              placeholder="e.g. spam-domain.com"
              className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-xs outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus size={14} /> Block Domain
            </button>
          </form>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pt-1">
            {unwantedReferrals.map((domain) => (
              <span
                key={domain}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-gray-300 font-mono text-[11px]"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

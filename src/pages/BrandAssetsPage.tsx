import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Download, 
  Check, 
  Copy, 
  Layers, 
  Image as ImageIcon, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Share2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BrandAsset {
  id: string;
  name: string;
  category: 'gmb' | 'youtube' | 'linkedin' | 'facebook' | 'instagram' | 'x' | 'wordmark' | 'web';
  categoryLabel: string;
  platformIcon: string;
  dimensions: string;
  fileSize: string;
  type: string;
  purpose: string;
  downloadUrl: string;
  previewUrl: string;
  isBanner?: boolean;
  isTransparent?: boolean;
}

const BRAND_ASSETS: BrandAsset[] = [
  // GMB
  {
    id: 'gmb-logo',
    name: 'Google Business Profile (GMB) Avatar',
    category: 'gmb',
    categoryLabel: 'Google Business Profile',
    platformIcon: 'GMB',
    dimensions: '720 × 720 px',
    fileSize: '35 KB',
    type: 'PNG (Onyx Background)',
    purpose: 'Google Maps, Google Search Knowledge Panel & Business Profile Icon',
    downloadUrl: '/brand-assets/01-Google-Business-Profile/gmb-logo-720x720.png',
    previewUrl: '/brand-assets/01-Google-Business-Profile/gmb-logo-720x720.png'
  },
  {
    id: 'gmb-cover',
    name: 'Google Business Profile (GMB) Cover',
    category: 'gmb',
    categoryLabel: 'Google Business Profile',
    platformIcon: 'GMB',
    dimensions: '1024 × 576 px',
    fileSize: '61 KB',
    type: 'PNG (16:9 Landscape)',
    purpose: 'Header Cover Photo for Google Maps & Local Search Listing',
    downloadUrl: '/brand-assets/01-Google-Business-Profile/gmb-cover-1024x576.png',
    previewUrl: '/brand-assets/01-Google-Business-Profile/gmb-cover-1024x576.png',
    isBanner: true
  },

  // YouTube
  {
    id: 'youtube-avatar',
    name: 'YouTube Channel Profile Picture',
    category: 'youtube',
    categoryLabel: 'YouTube',
    platformIcon: 'YT',
    dimensions: '800 × 800 px',
    fileSize: '40 KB',
    type: 'PNG (Circular Safe Zone)',
    purpose: 'Official YouTube Channel Avatar & Comment Badge',
    downloadUrl: '/brand-assets/02-YouTube/youtube-avatar-800x800.png',
    previewUrl: '/brand-assets/02-YouTube/youtube-avatar-800x800.png'
  },
  {
    id: 'youtube-banner',
    name: 'YouTube Channel Header Banner',
    category: 'youtube',
    categoryLabel: 'YouTube',
    platformIcon: 'YT',
    dimensions: '2560 × 1440 px',
    fileSize: '200 KB',
    type: 'PNG (TV / Desktop / Mobile Safe)',
    purpose: 'Full-Width YouTube Channel Header with Central Safe Zone',
    downloadUrl: '/brand-assets/02-YouTube/youtube-banner-2560x1440.png',
    previewUrl: '/brand-assets/02-YouTube/youtube-banner-2560x1440.png',
    isBanner: true
  },
  {
    id: 'youtube-watermark',
    name: 'YouTube Video Branding Watermark',
    category: 'youtube',
    categoryLabel: 'YouTube',
    platformIcon: 'YT',
    dimensions: '150 × 150 px',
    fileSize: '5 KB',
    type: 'PNG (Transparent Alpha)',
    purpose: 'In-Video Subscribe Watermark placed at lower right corner',
    downloadUrl: '/brand-assets/02-YouTube/youtube-video-watermark-150x150.png',
    previewUrl: '/brand-assets/02-YouTube/youtube-video-watermark-150x150.png',
    isTransparent: true
  },

  // LinkedIn
  {
    id: 'linkedin-company-logo',
    name: 'LinkedIn Company Page Logo',
    category: 'linkedin',
    categoryLabel: 'LinkedIn',
    platformIcon: 'IN',
    dimensions: '400 × 400 px',
    fileSize: '18 KB',
    type: 'PNG (Square)',
    purpose: 'Official LinkedIn Organization & Company Page Logo',
    downloadUrl: '/brand-assets/03-LinkedIn/linkedin-company-logo-400x400.png',
    previewUrl: '/brand-assets/03-LinkedIn/linkedin-company-logo-400x400.png'
  },
  {
    id: 'linkedin-company-cover',
    name: 'LinkedIn Company Page Banner',
    category: 'linkedin',
    categoryLabel: 'LinkedIn',
    platformIcon: 'IN',
    dimensions: '1128 × 191 px',
    fileSize: '24 KB',
    type: 'PNG (Ultra-Wide Banner)',
    purpose: 'Header Banner for LinkedIn Corporate Page',
    downloadUrl: '/brand-assets/03-LinkedIn/linkedin-company-cover-1128x191.png',
    previewUrl: '/brand-assets/03-LinkedIn/linkedin-company-cover-1128x191.png',
    isBanner: true
  },
  {
    id: 'linkedin-personal-profile',
    name: 'LinkedIn Personal Profile Picture',
    category: 'linkedin',
    categoryLabel: 'LinkedIn',
    platformIcon: 'IN',
    dimensions: '800 × 800 px',
    fileSize: '40 KB',
    type: 'PNG (Executive Profile)',
    purpose: 'Founder & Team Member Profile Picture',
    downloadUrl: '/brand-assets/03-LinkedIn/linkedin-personal-profile-800x800.png',
    previewUrl: '/brand-assets/03-LinkedIn/linkedin-personal-profile-800x800.png'
  },
  {
    id: 'linkedin-personal-banner',
    name: 'LinkedIn Personal Profile Banner',
    category: 'linkedin',
    categoryLabel: 'LinkedIn',
    platformIcon: 'IN',
    dimensions: '1584 × 396 px',
    fileSize: '52 KB',
    type: 'PNG (Background Cover)',
    purpose: 'Personal Profile Header Banner for Shiraz Almadani & Team',
    downloadUrl: '/brand-assets/03-LinkedIn/linkedin-personal-banner-1584x396.png',
    previewUrl: '/brand-assets/03-LinkedIn/linkedin-personal-banner-1584x396.png',
    isBanner: true
  },

  // Facebook
  {
    id: 'facebook-profile',
    name: 'Facebook Page Profile Picture',
    category: 'facebook',
    categoryLabel: 'Facebook',
    platformIcon: 'FB',
    dimensions: '800 × 800 px',
    fileSize: '40 KB',
    type: 'PNG (High-DPI Square)',
    purpose: 'Facebook Business Page Avatar & Mobile Feed Icon',
    downloadUrl: '/brand-assets/04-Facebook/facebook-profile-800x800.png',
    previewUrl: '/brand-assets/04-Facebook/facebook-profile-800x800.png'
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Page Cover Banner',
    category: 'facebook',
    categoryLabel: 'Facebook',
    platformIcon: 'FB',
    dimensions: '1200 × 630 px',
    fileSize: '71 KB',
    type: 'PNG (Landscape Banner)',
    purpose: 'Header Cover Photo for Facebook Page & Groups',
    downloadUrl: '/brand-assets/04-Facebook/facebook-cover-1200x630.png',
    previewUrl: '/brand-assets/04-Facebook/facebook-cover-1200x630.png',
    isBanner: true
  },

  // Instagram
  {
    id: 'instagram-profile-hd',
    name: 'Instagram HD Profile Picture',
    category: 'instagram',
    categoryLabel: 'Instagram',
    platformIcon: 'IG',
    dimensions: '1080 × 1080 px',
    fileSize: '56 KB',
    type: 'PNG (1080p Ultra-Clear)',
    purpose: 'Instagram Business Profile Avatar with Circular Boundary Fit',
    downloadUrl: '/brand-assets/05-Instagram/instagram-profile-1080x1080.png',
    previewUrl: '/brand-assets/05-Instagram/instagram-profile-1080x1080.png'
  },
  {
    id: 'instagram-post-square',
    name: 'Instagram Square Brand Post Card',
    category: 'instagram',
    categoryLabel: 'Instagram',
    platformIcon: 'IG',
    dimensions: '1080 × 1080 px',
    fileSize: '92 KB',
    type: 'PNG (Grid Post Card)',
    purpose: 'Feed Post, Carousel Cover, and Highlights Cover Graphic',
    downloadUrl: '/brand-assets/05-Instagram/instagram-post-square-1080x1080.png',
    previewUrl: '/brand-assets/05-Instagram/instagram-post-square-1080x1080.png'
  },

  // X (Twitter)
  {
    id: 'x-profile',
    name: 'X (Twitter) Profile Picture',
    category: 'x',
    categoryLabel: 'X (Twitter)',
    platformIcon: 'X',
    dimensions: '400 × 400 px',
    fileSize: '18 KB',
    type: 'PNG (Circle Mask Ready)',
    purpose: 'Official Avatar for @AbuQitmirLabs on X / Twitter',
    downloadUrl: '/brand-assets/06-X-Twitter/x-twitter-profile-400x400.png',
    previewUrl: '/brand-assets/06-X-Twitter/x-twitter-profile-400x400.png'
  },
  {
    id: 'x-header',
    name: 'X (Twitter) Header Banner',
    category: 'x',
    categoryLabel: 'X (Twitter)',
    platformIcon: 'X',
    dimensions: '1500 × 500 px',
    fileSize: '65 KB',
    type: 'PNG (3:1 Aspect Ratio)',
    purpose: 'Header Banner for X (Twitter) Desktop & Mobile App',
    downloadUrl: '/brand-assets/06-X-Twitter/x-twitter-header-1500x500.png',
    previewUrl: '/brand-assets/06-X-Twitter/x-twitter-header-1500x500.png',
    isBanner: true
  },

  // Wordmarks & Logos
  {
    id: 'wordmark-dark',
    name: 'AbuQitmirLabs Horizontal Logo (Dark)',
    category: 'wordmark',
    categoryLabel: 'Logos & Wordmarks',
    platformIcon: 'LOGO',
    dimensions: '1200 × 400 px',
    fileSize: '22 KB',
    type: 'PNG (Dark Onyx Background)',
    purpose: 'Website Headers, Pitch Decks, Presentations & Client Invoices',
    downloadUrl: '/brand-assets/07-Horizontal-Wordmarks/abuqitmirlabs-horizontal-dark-1200x400.png',
    previewUrl: '/brand-assets/07-Horizontal-Wordmarks/abuqitmirlabs-horizontal-dark-1200x400.png',
    isBanner: true
  },
  {
    id: 'wordmark-transparent',
    name: 'AbuQitmirLabs Horizontal Logo (Transparent)',
    category: 'wordmark',
    categoryLabel: 'Logos & Wordmarks',
    platformIcon: 'LOGO',
    dimensions: '1200 × 400 px',
    fileSize: '20 KB',
    type: 'PNG (Transparent Background)',
    purpose: 'Overlay on custom graphics, videos, merchandise & light backgrounds',
    downloadUrl: '/brand-assets/07-Horizontal-Wordmarks/abuqitmirlabs-horizontal-transparent-1200x400.png',
    previewUrl: '/brand-assets/07-Horizontal-Wordmarks/abuqitmirlabs-horizontal-transparent-1200x400.png',
    isBanner: true,
    isTransparent: true
  },
  {
    id: 'emblem-transparent',
    name: 'AbuQitmirLabs Emblem (Transparent)',
    category: 'wordmark',
    categoryLabel: 'Logos & Wordmarks',
    platformIcon: 'MARK',
    dimensions: '1024 × 1024 px',
    fileSize: '35 KB',
    type: 'PNG (Transparent Alpha)',
    purpose: 'Master Vector-Grade Square Icon without background box',
    downloadUrl: '/brand-assets/07-Horizontal-Wordmarks/abuqitmirlabs-logo-square-transparent-1024x1024.png',
    previewUrl: '/brand-assets/07-Horizontal-Wordmarks/abuqitmirlabs-logo-square-transparent-1024x1024.png',
    isTransparent: true
  },

  // Web & Master
  {
    id: 'master-icon-1024',
    name: 'Master 4K Brand Icon',
    category: 'web',
    categoryLabel: 'Web & Master Assets',
    platformIcon: 'HQ',
    dimensions: '1024 × 1024 px',
    fileSize: '54 KB',
    type: 'PNG (Full High-Resolution)',
    purpose: 'Mobile App Store Icon, PWA Master Asset, High-DPI Screens',
    downloadUrl: '/brand-assets/08-Master-Web-Assets/abuqitmirlabs-master-icon-1024x1024.png',
    previewUrl: '/brand-assets/08-Master-Web-Assets/abuqitmirlabs-master-icon-1024x1024.png'
  },
  {
    id: 'og-preview',
    name: 'Universal Open Graph Social Preview',
    category: 'web',
    categoryLabel: 'Web & Master Assets',
    platformIcon: 'OG',
    dimensions: '1200 × 630 px',
    fileSize: '71 KB',
    type: 'PNG (Standard OG / Twitter Card)',
    purpose: 'Automatic link preview thumbnail when shared on WhatsApp, LinkedIn, X, Telegram & Slack',
    downloadUrl: '/brand-assets/08-Master-Web-Assets/og-social-preview-1200x630.png',
    previewUrl: '/brand-assets/08-Master-Web-Assets/og-social-preview-1200x630.png',
    isBanner: true
  }
];

const BRAND_COLORS = [
  { name: 'Cyber Neon Lime', hex: '#ccff00', rgb: 'rgb(204, 255, 0)', role: 'Primary Brand Accent & Core Glow' },
  { name: 'Deep Onyx Black', hex: '#09090b', rgb: 'rgb(9, 9, 11)', role: 'Primary Background & Monogram Cutout' },
  { name: 'Pitch Black', hex: '#000000', rgb: 'rgb(0, 0, 0)', role: 'Canvas Background & Shadow Depth' },
  { name: 'Crisp White', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', role: 'Primary Typography & Optical Highlight' },
  { name: 'Zinc Silver', hex: '#a1a1aa', rgb: 'rgb(161, 161, 170)', role: 'Subtitles & Secondary Meta Info' }
];

export default function BrandAssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filteredAssets = selectedCategory === 'all' 
    ? BRAND_ASSETS 
    : BRAND_ASSETS.filter(a => a.category === selectedCategory);

  const copyToClipboard = (text: string, id: string) => {
    const fullUrl = text.startsWith('/') ? `${window.location.origin}${text}` : text;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2500);
  };

  // Robust Direct Blob Downloader
  const triggerDownload = async (url: string, filename: string, id: string) => {
    setDownloadingId(id);
    setStatusMessage(`Downloading ${filename}...`);

    try {
      // 1. Try Fetch -> Blob -> Object URL download (Bypasses iframe & sandbox restrictions)
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);

      setDownloadingId(null);
      setDownloadSuccessId(id);
      setStatusMessage(`✓ ${filename} successfully downloaded!`);
      setTimeout(() => {
        setDownloadSuccessId(null);
        setStatusMessage(null);
      }, 3500);
    } catch (err) {
      console.warn('Direct blob fetch download failed, attempting backend attachment fallback:', err);
      
      // 2. Fallback: Backend attachment endpoint
      const safeFileParam = encodeURIComponent(url);
      const fallbackUrl = `/api/download-asset?file=${safeFileParam}`;
      
      const fallbackLink = document.createElement('a');
      fallbackLink.href = fallbackUrl;
      fallbackLink.download = filename;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);

      setDownloadingId(null);
      setDownloadSuccessId(id);
      setStatusMessage(`✓ Download started via direct stream!`);
      setTimeout(() => {
        setDownloadSuccessId(null);
        setStatusMessage(null);
      }, 3500);
    }
  };

  const triggerZipDownload = async () => {
    setDownloadingId('zip-kit');
    setStatusMessage('Preparing & downloading AbuQitmirLabs Social Media Kit ZIP...');

    try {
      const res = await fetch('/api/download-kit');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'abuqitmirlabs-social-media-kit.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);

      setDownloadingId(null);
      setDownloadSuccessId('zip-kit');
      setStatusMessage('✓ AbuQitmirLabs Social Media Kit ZIP downloaded successfully!');
      setTimeout(() => {
        setDownloadSuccessId(null);
        setStatusMessage(null);
      }, 3500);
    } catch (err) {
      console.warn('Blob zip fetch failed, falling back to direct location download:', err);
      window.location.href = '/api/download-kit';
      setDownloadingId(null);
      setDownloadSuccessId('zip-kit');
      setStatusMessage('✓ ZIP download triggered!');
      setTimeout(() => {
        setDownloadSuccessId(null);
        setStatusMessage(null);
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-[#ccff00] selection:text-black">
      <Helmet>
        <title>Official Brand Assets & Social Media Kit | AbuQitmirLabs</title>
        <meta name="description" content="Download official AbuQitmirLabs brand assets, high-resolution PNG logos, and custom banners tailored for Google Business Profile, YouTube, LinkedIn, Facebook, Instagram, and X." />
        <link rel="canonical" href="https://www.abuqitmirlabs.tech/brand-assets" />
        <meta property="og:title" content="Official Brand Assets & Social Media Kit | AbuQitmirLabs" />
        <meta property="og:description" content="High-resolution PNG logos and platform-specific banners for AbuQitmirLabs." />
        <meta property="og:image" content="https://www.abuqitmirlabs.tech/brand-assets/og-social-preview-1200x630.png" />
      </Helmet>

      <Header />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/5 text-[#ccff00] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Identity &amp; Social Media Kit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            AbuQitmir<span className="text-[#ccff00]">Labs</span> Brand Assets
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
            Tamam social media platforms (GMB, YouTube, LinkedIn, Facebook, Instagram, X) aur digital platforms ke liye exact dimensions par tayyar shuda official high-resolution PNG logos aur banners.
          </p>

          {/* Live Notification Bar */}
          {statusMessage && (
            <div className="mb-6 p-4 rounded-xl border border-[#ccff00]/40 bg-[#ccff00]/10 text-[#ccff00] text-sm font-semibold flex items-center justify-center gap-3 animate-fade-in shadow-lg shadow-[#ccff00]/5">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Quick ZIP Download CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={triggerZipDownload}
              disabled={downloadingId === 'zip-kit'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#ccff00] text-black font-bold rounded-xl hover:bg-[#b8e600] active:scale-95 transition-all duration-200 shadow-lg shadow-[#ccff00]/20 hover:scale-[1.02] cursor-pointer disabled:opacity-75"
            >
              {downloadingId === 'zip-kit' ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Downloading ZIP...</span>
                </>
              ) : downloadSuccessId === 'zip-kit' ? (
                <>
                  <Check className="w-5 h-5 text-black" />
                  <span>ZIP Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Complete Kit (ZIP · 3.5 MB)</span>
                </>
              )}
            </button>

            <button
              onClick={() => triggerDownload('/brand-assets/08-Master-Web-Assets/abuqitmirlabs-master-icon-1024x1024.png', 'abuqitmirlabs-master-icon-1024x1024.png', 'hero-master-icon')}
              disabled={downloadingId === 'hero-master-icon'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 border border-zinc-700 text-white font-medium rounded-xl hover:border-[#ccff00]/50 hover:bg-zinc-800 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-75"
            >
              {downloadingId === 'hero-master-icon' ? (
                <div className="w-4 h-4 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
              ) : downloadSuccessId === 'hero-master-icon' ? (
                <Check className="w-4 h-4 text-[#ccff00]" />
              ) : (
                <ImageIcon className="w-4 h-4 text-[#ccff00]" />
              )}
              <span>{downloadSuccessId === 'hero-master-icon' ? 'Icon Downloaded!' : 'Download Master 4K Icon'}</span>
            </button>
          </div>
        </div>

        {/* Color Palette Tokens */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 mb-16 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl font-bold text-white">Brand Color System</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BRAND_COLORS.map((c) => (
              <div 
                key={c.hex}
                onClick={() => copyColor(c.hex)}
                className="group cursor-pointer bg-zinc-950/80 border border-zinc-800/80 hover:border-[#ccff00]/40 rounded-xl p-4 transition-all duration-200"
              >
                <div 
                  className="w-full h-14 rounded-lg mb-3 border border-white/10 flex items-end justify-end p-2 transition-transform group-hover:scale-[1.02]" 
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs">
                    {c.hex}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-white">{c.name}</div>
                    <div className="text-xs text-zinc-400 line-clamp-1">{c.role}</div>
                  </div>
                  <button className="text-zinc-500 group-hover:text-[#ccff00] p-1">
                    {copiedHex === c.hex ? <Check className="w-4 h-4 text-[#ccff00]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {[
            { id: 'all', label: 'All Assets (21)' },
            { id: 'gmb', label: 'Google Business Profile' },
            { id: 'youtube', label: 'YouTube' },
            { id: 'linkedin', label: 'LinkedIn' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'x', label: 'X (Twitter)' },
            { id: 'wordmark', label: 'Logos & Wordmarks' },
            { id: 'web', label: 'Web & Master' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === tab.id
                  ? 'bg-[#ccff00] text-black font-semibold shadow-md shadow-[#ccff00]/10'
                  : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className={`bg-zinc-900/60 border border-zinc-800/80 hover:border-[#ccff00]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group ${
                asset.isBanner ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Preview Container */}
              <div className={`p-6 flex items-center justify-center relative overflow-hidden ${
                asset.isTransparent 
                  ? 'bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] bg-zinc-950' 
                  : 'bg-zinc-950'
              } ${asset.isBanner ? 'min-h-[220px]' : 'min-h-[240px]'}`}>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 border border-zinc-700/60 text-[11px] font-mono text-[#ccff00]">
                  <span>{asset.dimensions}</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 border border-zinc-700/60 text-[11px] text-zinc-400">
                  {asset.fileSize}
                </div>

                <img
                  src={asset.previewUrl}
                  alt={asset.name}
                  className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                    asset.isBanner 
                      ? 'w-full max-h-[180px] rounded-lg shadow-xl' 
                      : 'max-h-[170px] max-w-[170px] rounded-2xl shadow-xl'
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Info & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-zinc-900/40">
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-[#ccff00] uppercase tracking-wider">
                      {asset.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {asset.type}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#ccff00] transition-colors">
                    {asset.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {asset.purpose}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => triggerDownload(asset.downloadUrl, asset.downloadUrl.split('/').pop() || `${asset.id}.png`, asset.id)}
                    disabled={downloadingId === asset.id}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ccff00] text-black font-semibold text-xs rounded-lg hover:bg-[#b8e600] active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-75"
                  >
                    {downloadingId === asset.id ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : downloadSuccessId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-black" />
                        <span>Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PNG</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => copyToClipboard(asset.downloadUrl, asset.id)}
                    title="Direct URL copy karein"
                    className="p-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#ccff00]/40 transition-colors cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <Check className="w-4 h-4 text-[#ccff00]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={asset.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Naye tab mein open karein"
                    className="p-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#ccff00]/40 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Dimension Guide Table */}
        <div className="mt-20 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-xl font-bold text-white">Platform Upload Guide &amp; Specifications</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950/80 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Asset Type</th>
                  <th className="px-4 py-3">Optimal Dimensions</th>
                  <th className="px-4 py-3">Format</th>
                  <th className="px-4 py-3">File Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono text-xs">
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">Google Business Profile</td>
                  <td className="px-4 py-3 font-sans">Avatar / Profile Logo</td>
                  <td className="px-4 py-3 text-[#ccff00]">720 × 720 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/01-Google-Business-Profile/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">Google Business Profile</td>
                  <td className="px-4 py-3 font-sans">Cover Photo</td>
                  <td className="px-4 py-3 text-[#ccff00]">1024 × 576 px</td>
                  <td className="px-4 py-3">PNG (16:9)</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/01-Google-Business-Profile/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">YouTube</td>
                  <td className="px-4 py-3 font-sans">Channel Avatar</td>
                  <td className="px-4 py-3 text-[#ccff00]">800 × 800 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/02-YouTube/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">YouTube</td>
                  <td className="px-4 py-3 font-sans">Channel Banner Header</td>
                  <td className="px-4 py-3 text-[#ccff00]">2560 × 1440 px</td>
                  <td className="px-4 py-3">PNG (Safe Center)</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/02-YouTube/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">LinkedIn</td>
                  <td className="px-4 py-3 font-sans">Company Page Logo</td>
                  <td className="px-4 py-3 text-[#ccff00]">400 × 400 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/03-LinkedIn/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">LinkedIn</td>
                  <td className="px-4 py-3 font-sans">Company Page Banner</td>
                  <td className="px-4 py-3 text-[#ccff00]">1128 × 191 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/03-LinkedIn/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">Facebook</td>
                  <td className="px-4 py-3 font-sans">Page Profile Picture</td>
                  <td className="px-4 py-3 text-[#ccff00]">800 × 800 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/04-Facebook/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">Facebook</td>
                  <td className="px-4 py-3 font-sans">Page Cover Photo</td>
                  <td className="px-4 py-3 text-[#ccff00]">1200 × 630 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/04-Facebook/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">Instagram</td>
                  <td className="px-4 py-3 font-sans">HD Profile Picture</td>
                  <td className="px-4 py-3 text-[#ccff00]">1080 × 1080 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/05-Instagram/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">X (Twitter)</td>
                  <td className="px-4 py-3 font-sans">Profile Picture</td>
                  <td className="px-4 py-3 text-[#ccff00]">400 × 400 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/06-X-Twitter/</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-sans font-semibold">X (Twitter)</td>
                  <td className="px-4 py-3 font-sans">Header Banner</td>
                  <td className="px-4 py-3 text-[#ccff00]">1500 × 500 px</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3 text-zinc-400">/brand-assets/06-X-Twitter/</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

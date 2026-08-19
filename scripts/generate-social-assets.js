import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { ZipArchive } = require('archiver');

const BRAND_NAME = 'AbuQitmirLabs';
const TAGLINE = 'Custom Software & AI Engineering';
const URL = 'www.abuqitmirlabs.tech';

// Base Monogram SVG (Square with circular & rounded safe areas)
function getSquareLogoSvg(size, isTransparent = false) {
  const half = size / 2;
  const radius = isTransparent ? 0 : size * 0.22;
  const strokeW = Math.max(2, size * 0.007);
  const outerHexR = size * 0.36;
  const innerCircleR = size * 0.29;
  const nodeR = Math.max(3, size * 0.015);

  const bg = isTransparent
    ? ''
    : `<rect width="${size}" height="${size}" rx="${radius}" fill="url(#bgGlow)" />
       <rect width="${size - 2}" height="${size - 2}" x="1" y="1" rx="${radius - 1}" fill="none" stroke="#ccff00" stroke-width="${strokeW}" stroke-opacity="0.35" />`;

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#141c00" stop-opacity="0.9" />
      <stop offset="55%" stop-color="#09090b" stop-opacity="0.98" />
      <stop offset="100%" stop-color="#000000" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e6ff80" />
      <stop offset="50%" stop-color="#ccff00" />
      <stop offset="100%" stop-color="#88b300" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${Math.max(2, size * 0.018)}" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  ${bg}

  <!-- Tech Guide Ring -->
  <circle cx="${half}" cy="${half}" r="${outerHexR}" fill="none" stroke="#ccff00" stroke-width="${strokeW}" stroke-dasharray="${size * 0.018} ${size * 0.018}" stroke-opacity="0.28" />

  <!-- Core Emblem Background -->
  <circle cx="${half}" cy="${half}" r="${innerCircleR}" fill="url(#limeGrad)" filter="url(#neonGlow)" />

  <!-- Monogram Glyph (Geometric Delta Silhouette) -->
  <!-- Scaled coordinates based on size -->
  <path d="M${half} ${half - innerCircleR * 0.72} 
           L${half + innerCircleR * 0.65} ${half + innerCircleR * 0.55} 
           L${half + innerCircleR * 0.28} ${half + innerCircleR * 0.55} 
           L${half} ${half - innerCircleR * 0.08} 
           L${half - innerCircleR * 0.28} ${half + innerCircleR * 0.55} 
           L${half - innerCircleR * 0.65} ${half + innerCircleR * 0.55} Z" 
        fill="#09090b" />

  <!-- Center Core Diamond Accent -->
  <polygon points="${half},${half - innerCircleR * 0.25} 
                   ${half + innerCircleR * 0.16},${half + innerCircleR * 0.05} 
                   ${half},${half + innerCircleR * 0.35} 
                   ${half - innerCircleR * 0.16},${half + innerCircleR * 0.05}" 
           fill="url(#limeGrad)" />
  <circle cx="${half}" cy="${half + innerCircleR * 0.05}" r="${Math.max(2, innerCircleR * 0.065)}" fill="#ffffff" />

  <!-- Floating Tech Orbital Nodes -->
  <circle cx="${half}" cy="${half - outerHexR * 1.05}" r="${nodeR}" fill="#ccff00" />
  <circle cx="${half}" cy="${half + outerHexR * 1.05}" r="${nodeR}" fill="#ccff00" />
  <circle cx="${half - outerHexR * 1.05}" cy="${half}" r="${nodeR}" fill="#ccff00" />
  <circle cx="${half + outerHexR * 1.05}" cy="${half}" r="${nodeR}" fill="#ccff00" />
</svg>
`;
}

// Horizontal Wordmark SVG
function getHorizontalLogoSvg(width, height, isTransparent = false) {
  const iconSize = height * 0.72;
  const iconX = height * 0.18;
  const iconY = (height - iconSize) / 2;
  const textX = iconX + iconSize + height * 0.22;

  const bg = isTransparent
    ? ''
    : `<rect width="${width}" height="${height}" rx="${height * 0.08}" fill="#09090b" />
       <rect width="${width - 2}" height="${height - 2}" x="1" y="1" rx="${height * 0.08 - 1}" fill="none" stroke="#ccff00" stroke-width="1.5" stroke-opacity="0.25" />`;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="limeGradH" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e6ff80" />
      <stop offset="50%" stop-color="#ccff00" />
      <stop offset="100%" stop-color="#88b300" />
    </linearGradient>
    <filter id="neonGlowH" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${height * 0.015}" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  ${bg}

  <!-- Icon Section -->
  <g transform="translate(${iconX}, ${iconY})">
    <circle cx="${iconSize / 2}" cy="${iconSize / 2}" r="${iconSize * 0.44}" fill="url(#limeGradH)" filter="url(#neonGlowH)" />
    <!-- Glyph -->
    <path d="M${iconSize / 2} ${iconSize * 0.18} 
             L${iconSize * 0.8} ${iconSize * 0.76} 
             L${iconSize * 0.63} ${iconSize * 0.76} 
             L${iconSize / 2} ${iconSize * 0.48} 
             L${iconSize * 0.37} ${iconSize * 0.76} 
             L${iconSize * 0.2} ${iconSize * 0.76} Z" 
          fill="#09090b" />
    <polygon points="${iconSize / 2},${iconSize * 0.4} 
                     ${iconSize * 0.57},${iconSize * 0.53} 
                     ${iconSize / 2},${iconSize * 0.67} 
                     ${iconSize * 0.43},${iconSize * 0.53}" 
             fill="url(#limeGradH)" />
  </g>

  <!-- Typography -->
  <text x="${textX}" y="${height * 0.46}" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="${height * 0.32}" fill="#ffffff" letter-spacing="-0.5px">
    AbuQitmir<tspan fill="#ccff00">Labs</tspan>
  </text>
  <text x="${textX}" y="${height * 0.72}" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="${height * 0.15}" fill="#a1a1aa" letter-spacing="1.5px">
    CUSTOM SOFTWARE &amp; AI ENGINEERING
  </text>
</svg>
`;
}

// Banner / Cover Graphic SVG (Optimized with centered safe-zones for headers)
function getBannerSvg(width, height, platformLabel) {
  const halfW = width / 2;
  const halfH = height / 2;
  const iconSize = Math.min(height * 0.48, width * 0.25);
  const iconX = width > 1200 ? halfW - iconSize / 2 : halfW * 0.35;
  const isCentered = width > 1800 || height < 300;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgBanner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050702" />
      <stop offset="50%" stop-color="#09090b" />
      <stop offset="100%" stop-color="#030303" />
    </linearGradient>
    <radialGradient id="glowBanner" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ccff00" stop-opacity="0.14" />
      <stop offset="60%" stop-color="#ccff00" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="limeGradB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e6ff80" />
      <stop offset="50%" stop-color="#ccff00" />
      <stop offset="100%" stop-color="#88b300" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.4" />
    </pattern>
  </defs>

  <!-- Background Layer -->
  <rect width="${width}" height="${height}" fill="url(#bgBanner)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />
  <circle cx="${halfW}" cy="${halfH}" r="${Math.max(width, height) * 0.45}" fill="url(#glowBanner)" />

  <!-- Subtle Cyber Accent Lines -->
  <line x1="0" y1="${height * 0.15}" x2="${width * 0.28}" y2="${height * 0.15}" stroke="#ccff00" stroke-width="1.5" stroke-opacity="0.4" />
  <line x1="${width * 0.72}" y1="${height * 0.85}" x2="${width}" y2="${height * 0.85}" stroke="#ccff00" stroke-width="1.5" stroke-opacity="0.4" />
  <circle cx="${width * 0.28}" cy="${height * 0.15}" r="3.5" fill="#ccff00" />
  <circle cx="${width * 0.72}" cy="${height * 0.85}" r="3.5" fill="#ccff00" />

  <!-- Center Content Block -->
  <g transform="translate(${halfW}, ${halfH})">
    <!-- Center Emblem -->
    <g transform="translate(0, ${-height * 0.12})">
      <circle cx="0" cy="0" r="${iconSize * 0.46}" fill="none" stroke="#ccff00" stroke-width="2" stroke-dasharray="6 6" stroke-opacity="0.4" />
      <circle cx="0" cy="0" r="${iconSize * 0.36}" fill="url(#limeGradB)" />
      <!-- Monogram -->
      <path d="M0 ${-iconSize * 0.26} 
               L${iconSize * 0.24} ${iconSize * 0.2} 
               L${iconSize * 0.11} ${iconSize * 0.2} 
               L0 ${-iconSize * 0.02} 
               L${-iconSize * 0.11} ${iconSize * 0.2} 
               L${-iconSize * 0.24} ${iconSize * 0.2} Z" 
            fill="#09090b" />
      <polygon points="0,${-iconSize * 0.08} ${iconSize * 0.06},0 0,${iconSize * 0.1} ${-iconSize * 0.06},0" fill="url(#limeGradB)" />
    </g>

    <!-- Typography -->
    <text x="0" y="${height * 0.14}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="${Math.max(22, height * 0.11)}" fill="#ffffff" letter-spacing="-0.5px">
      AbuQitmir<tspan fill="#ccff00">Labs</tspan>
    </text>
    <text x="0" y="${height * 0.24}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="${Math.max(12, height * 0.045)}" fill="#a1a1aa" letter-spacing="3px">
      CUSTOM SOFTWARE &amp; AI ENGINEERING STUDIO
    </text>
    <text x="0" y="${height * 0.32}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="${Math.max(10, height * 0.035)}" fill="#ccff00" letter-spacing="1.5px">
      ${URL}
    </text>
  </g>
</svg>
`;
}

// Generate all social assets
async function generateAllSocialAssets() {
  const baseDir = path.resolve('public/brand-assets');
  const zipOutputDir = path.resolve('public');
  
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const assetList = [
    // --- 1. GOOGLE BUSINESS PROFILE (GMB) ---
    {
      category: '01-Google-Business-Profile',
      filename: 'gmb-logo-720x720.png',
      width: 720,
      height: 720,
      svg: getSquareLogoSvg(720),
      label: 'Google Business Profile (GMB) Logo / Profile Picture (720x720)'
    },
    {
      category: '01-Google-Business-Profile',
      filename: 'gmb-cover-1024x576.png',
      width: 1024,
      height: 576,
      svg: getBannerSvg(1024, 576, 'Google Business Profile'),
      label: 'Google Business Profile (GMB) Cover Photo (1024x576)'
    },

    // --- 2. YOUTUBE ---
    {
      category: '02-YouTube',
      filename: 'youtube-avatar-800x800.png',
      width: 800,
      height: 800,
      svg: getSquareLogoSvg(800),
      label: 'YouTube Channel Profile Picture / Avatar (800x800)'
    },
    {
      category: '02-YouTube',
      filename: 'youtube-banner-2560x1440.png',
      width: 2560,
      height: 1440,
      svg: getBannerSvg(2560, 1440, 'YouTube Banner'),
      label: 'YouTube Channel Banner / Header (2560x1440)'
    },
    {
      category: '02-YouTube',
      filename: 'youtube-video-watermark-150x150.png',
      width: 150,
      height: 150,
      svg: getSquareLogoSvg(150, true), // Transparent watermark
      label: 'YouTube Video Watermark (150x150 Transparent)'
    },

    // --- 3. LINKEDIN ---
    {
      category: '03-LinkedIn',
      filename: 'linkedin-company-logo-400x400.png',
      width: 400,
      height: 400,
      svg: getSquareLogoSvg(400),
      label: 'LinkedIn Company Page Logo (400x400)'
    },
    {
      category: '03-LinkedIn',
      filename: 'linkedin-company-cover-1128x191.png',
      width: 1128,
      height: 191,
      svg: getBannerSvg(1128, 191, 'LinkedIn Company Banner'),
      label: 'LinkedIn Company Page Banner (1128x191)'
    },
    {
      category: '03-LinkedIn',
      filename: 'linkedin-personal-profile-800x800.png',
      width: 800,
      height: 800,
      svg: getSquareLogoSvg(800),
      label: 'LinkedIn Personal Profile Picture (800x800)'
    },
    {
      category: '03-LinkedIn',
      filename: 'linkedin-personal-banner-1584x396.png',
      width: 1584,
      height: 396,
      svg: getBannerSvg(1584, 396, 'LinkedIn Personal Banner'),
      label: 'LinkedIn Personal Background Banner (1584x396)'
    },

    // --- 4. FACEBOOK ---
    {
      category: '04-Facebook',
      filename: 'facebook-profile-800x800.png',
      width: 800,
      height: 800,
      svg: getSquareLogoSvg(800),
      label: 'Facebook Page Profile Picture (800x800)'
    },
    {
      category: '04-Facebook',
      filename: 'facebook-cover-1200x630.png',
      width: 1200,
      height: 630,
      svg: getBannerSvg(1200, 630, 'Facebook Page Cover'),
      label: 'Facebook Page Cover / Banner (1200x630)'
    },

    // --- 5. INSTAGRAM ---
    {
      category: '05-Instagram',
      filename: 'instagram-profile-1080x1080.png',
      width: 1080,
      height: 1080,
      svg: getSquareLogoSvg(1080),
      label: 'Instagram HD Profile Picture (1080x1080)'
    },
    {
      category: '05-Instagram',
      filename: 'instagram-profile-320x320.png',
      width: 320,
      height: 320,
      svg: getSquareLogoSvg(320),
      label: 'Instagram Standard Profile Picture (320x320)'
    },
    {
      category: '05-Instagram',
      filename: 'instagram-post-square-1080x1080.png',
      width: 1080,
      height: 1080,
      svg: getBannerSvg(1080, 1080, 'Instagram Square Post'),
      label: 'Instagram Square Brand Post Card (1080x1080)'
    },

    // --- 6. X (TWITTER) ---
    {
      category: '06-X-Twitter',
      filename: 'x-twitter-profile-400x400.png',
      width: 400,
      height: 400,
      svg: getSquareLogoSvg(400),
      label: 'X (Twitter) Profile Picture (400x400)'
    },
    {
      category: '06-X-Twitter',
      filename: 'x-twitter-header-1500x500.png',
      width: 1500,
      height: 500,
      svg: getBannerSvg(1500, 500, 'X Twitter Header'),
      label: 'X (Twitter) Header / Banner (1500x500)'
    },

    // --- 7. HORIZONTAL WORDMARKS & TRANSPARENT LOGOS ---
    {
      category: '07-Horizontal-Wordmarks',
      filename: 'abuqitmirlabs-horizontal-dark-1200x400.png',
      width: 1200,
      height: 400,
      svg: getHorizontalLogoSvg(1200, 400, false),
      label: 'Horizontal Wordmark Logo (Dark Background, 1200x400)'
    },
    {
      category: '07-Horizontal-Wordmarks',
      filename: 'abuqitmirlabs-horizontal-transparent-1200x400.png',
      width: 1200,
      height: 400,
      svg: getHorizontalLogoSvg(1200, 400, true),
      label: 'Horizontal Wordmark Logo (Transparent Background, 1200x400)'
    },
    {
      category: '07-Horizontal-Wordmarks',
      filename: 'abuqitmirlabs-logo-square-transparent-1024x1024.png',
      width: 1024,
      height: 1024,
      svg: getSquareLogoSvg(1024, true),
      label: 'Square Emblem Logo (Transparent PNG, 1024x1024)'
    },

    // --- 8. OPEN GRAPH & MASTER WEB ASSETS ---
    {
      category: '08-Master-Web-Assets',
      filename: 'og-social-preview-1200x630.png',
      width: 1200,
      height: 630,
      svg: getBannerSvg(1200, 630, 'Open Graph Social Card'),
      label: 'Universal Open Graph / Social Sharing Image (1200x630)'
    },
    {
      category: '08-Master-Web-Assets',
      filename: 'abuqitmirlabs-master-icon-1024x1024.png',
      width: 1024,
      height: 1024,
      svg: getSquareLogoSvg(1024),
      label: 'Master High-Resolution Icon (1024x1024)'
    }
  ];

  console.log(`Generating ${assetList.length} customized social media & platform assets...`);

  // Write files to public/brand-assets and copy flat versions to public/
  for (const asset of assetList) {
    const categoryDir = path.join(baseDir, asset.category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const categoryFilePath = path.join(categoryDir, asset.filename);
    const flatFilePath = path.join(baseDir, asset.filename);

    const svgBuffer = Buffer.from(asset.svg);
    const pngBuffer = await sharp(svgBuffer)
      .resize(asset.width, asset.height)
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(categoryFilePath, pngBuffer);
    fs.writeFileSync(flatFilePath, pngBuffer);
    console.log(`✓ Generated ${asset.filename} (${asset.width}x${asset.height})`);
  }

  // Create README text file for the download package
  const readmeContent = `
================================================================================
           ABUQITMIRLABS - OFFICIAL SOCIAL MEDIA & BRAND ASSET KIT
================================================================================

Brand Name: AbuQitmirLabs
Tagline: Custom Software & AI Engineering Studio
Website: https://www.abuqitmirlabs.tech
Primary Palette: Onyx Black (#09090b), Cyber Neon Lime (#ccff00), Crisp White (#ffffff)

--------------------------------------------------------------------------------
FOLDER STRUCTURE & PLATFORM UPLOAD GUIDE:
--------------------------------------------------------------------------------

1. [01-Google-Business-Profile]
   - gmb-logo-720x720.png        -> Google Business Profile (GMB) Avatar / Logo (720 x 720)
   - gmb-cover-1024x576.png      -> Google Business Profile (GMB) Cover Photo (1024 x 576)

2. [02-YouTube]
   - youtube-avatar-800x800.png           -> YouTube Channel Profile Picture (800 x 800)
   - youtube-banner-2560x1440.png         -> YouTube Channel Banner / Header (2560 x 1440)
   - youtube-video-watermark-150x150.png  -> Video Branding Watermark (Transparent PNG, 150 x 150)

3. [03-LinkedIn]
   - linkedin-company-logo-400x400.png    -> LinkedIn Company Page Logo (400 x 400)
   - linkedin-company-cover-1128x191.png  -> LinkedIn Company Page Cover Banner (1128 x 191)
   - linkedin-personal-profile-800x800.png-> Personal Profile Picture (800 x 800)
   - linkedin-personal-banner-1584x396.png-> Personal Profile Background Banner (1584 x 396)

4. [04-Facebook]
   - facebook-profile-800x800.png         -> Facebook Page Profile Picture (800 x 800)
   - facebook-cover-1200x630.png          -> Facebook Page Cover Banner (1200 x 630)

5. [05-Instagram]
   - instagram-profile-1080x1080.png      -> Instagram HD Profile Picture (1080 x 1080)
   - instagram-profile-320x320.png        -> Instagram Standard Profile Picture (320 x 320)
   - instagram-post-square-1080x1080.png  -> Instagram Square Brand Post Card (1080 x 1080)

6. [06-X-Twitter]
   - x-twitter-profile-400x400.png        -> X (Twitter) Profile Picture (400 x 400)
   - x-twitter-header-1500x500.png        -> X (Twitter) Header / Banner (1500 x 500)

7. [07-Horizontal-Wordmarks]
   - abuqitmirlabs-horizontal-dark-1200x400.png         -> Website header / Dark background logo
   - abuqitmirlabs-horizontal-transparent-1200x400.png  -> Transparent vector-grade wordmark
   - abuqitmirlabs-logo-square-transparent-1024x1024.png-> Transparent square emblem

8. [08-Master-Web-Assets]
   - og-social-preview-1200x630.png       -> Open Graph / WhatsApp / Discord link preview
   - abuqitmirlabs-master-icon-1024x1024.png -> Master High-Res 4K App Icon

================================================================================
Generated with precision by AbuQitmirLabs Asset Engineering System
`.trim();

  fs.writeFileSync(path.join(baseDir, 'README.txt'), readmeContent);

  // Create ZIP archive
  const zipPath = path.join(zipOutputDir, 'abuqitmirlabs-social-media-kit.zip');
  const output = fs.createWriteStream(zipPath);
  const archive = new ZipArchive({ zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`✓ Created complete ZIP package: ${zipPath} (${archive.pointer()} total bytes)`);
      // Also copy zip into public/brand-assets for convenience
      fs.copyFileSync(zipPath, path.join(baseDir, 'abuqitmirlabs-social-media-kit.zip'));
      resolve(assetList);
    });

    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    // Append all category directories
    archive.directory(baseDir, false);
    archive.finalize();
  });
}

generateAllSocialAssets().then(() => {
  console.log('All social media assets generated successfully!');
}).catch((err) => {
  console.error('Error generating social media assets:', err);
  process.exit(1);
});

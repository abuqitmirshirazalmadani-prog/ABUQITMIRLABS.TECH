import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgLogo = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#182200" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#09090b" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#000000" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e6ff80" />
      <stop offset="50%" stop-color="#ccff00" />
      <stop offset="100%" stop-color="#88b300" />
    </linearGradient>
    <linearGradient id="accentGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ccff00" stop-opacity="0.3" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background with rounded corners and subtle border -->
  <rect width="512" height="512" rx="110" fill="url(#bgGlow)" />
  <rect width="510" height="510" x="1" y="1" rx="109" fill="none" stroke="#ccff00" stroke-width="2.5" stroke-opacity="0.3" />

  <!-- Outer Cyber Hex Ring -->
  <circle cx="256" cy="256" r="180" fill="none" stroke="#ccff00" stroke-width="3" stroke-dasharray="8 8" stroke-opacity="0.25" />
  
  <!-- Central Emblem Backdrop -->
  <circle cx="256" cy="256" r="145" fill="url(#limeGrad)" filter="url(#neonGlow)" />
  
  <!-- Precision Futuristic Monogram Cutout -->
  <!-- Outer Delta / 'A' Glyph in Black -->
  <path d="M256 150 L345 325 L295 325 L256 245 L217 325 L167 325 Z" fill="#09090b" />
  
  <!-- Inner Dynamic Core Diamond / 'Q' Accent -->
  <polygon points="256,220 276,260 256,300 236,260" fill="url(#limeGrad)" />
  <circle cx="256" cy="260" r="8" fill="#ffffff" />
  
  <!-- Floating Orbit Tech Nodes -->
  <circle cx="256" cy="76" r="7" fill="#ccff00" />
  <circle cx="256" cy="436" r="7" fill="#ccff00" />
  <circle cx="76" cy="256" r="7" fill="#ccff00" />
  <circle cx="436" cy="256" r="7" fill="#ccff00" />
</svg>
`;

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuffer = Buffer.from(svgLogo);

  // 1. Generate 512x512 logo.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Generated public/logo.png (512x512 binary PNG)');

  // 2. Generate 512x512 logo-512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(path.join(publicDir, 'logo-512.png'));
  console.log('✓ Generated public/logo-512.png (512x512 binary PNG)');

  // 3. Generate 192x192 logo-192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(path.join(publicDir, 'logo-192.png'));
  console.log('✓ Generated public/logo-192.png (192x192 binary PNG)');

  // 4. Generate 180x180 apple-touch-icon.png
  await sharp(svgBuffer)
    .resize(180, 180)
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated public/apple-touch-icon.png (180x180 binary PNG)');

  // 5. Also update favicon.svg with modern styling
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgLogo.trim());
  console.log('✓ Updated public/favicon.svg');
}

generate().catch(err => {
  console.error('Error generating logos:', err);
  process.exit(1);
});

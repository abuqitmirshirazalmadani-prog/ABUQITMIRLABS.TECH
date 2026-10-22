const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateSkillsAcademyBanner() {
  const width = 1200;
  const height = 630;

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <radialGradient id="bgGlow" cx="20%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#182405" stop-opacity="0.8" />
      <stop offset="45%" stop-color="#0c0e12" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#050505" stop-opacity="1" />
    </radialGradient>
    <radialGradient id="violetGlow" cx="85%" cy="70%" r="60%">
      <stop offset="0%" stop-color="#3b1d6e" stop-opacity="0.6" />
      <stop offset="60%" stop-color="#050505" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="limeText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ccff00" />
      <stop offset="100%" stop-color="#a3e635" />
    </linearGradient>
    <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
  </defs>

  <!-- Base Canvas -->
  <rect width="${width}" height="${height}" fill="#050505" />
  <rect width="${width}" height="${height}" fill="url(#bgGlow)" />
  <rect width="${width}" height="${height}" fill="url(#violetGlow)" />

  <!-- Subtle grid pattern -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="630" />
    <line x1="240" y1="0" x2="240" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="560" y1="0" x2="560" y2="630" />
    <line x1="720" y1="0" x2="720" y2="630" />
    <line x1="880" y1="0" x2="880" y2="630" />
    <line x1="1040" y1="0" x2="1040" y2="630" />
    <line x1="0" y1="100" x2="1200" y2="100" />
    <line x1="0" y1="220" x2="1200" y2="220" />
    <line x1="0" y1="340" x2="1200" y2="340" />
    <line x1="0" y1="460" x2="1200" y2="460" />
    <line x1="0" y1="580" x2="1200" y2="580" />
  </g>

  <!-- Border Frame -->
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />

  <!-- Academy Badge -->
  <g transform="translate(80, 80)">
    <rect width="360" height="42" rx="21" fill="rgba(204, 255, 0, 0.1)" stroke="rgba(204, 255, 0, 0.3)" stroke-width="1" />
    <circle cx="24" cy="21" r="5" fill="#ccff00" />
    <text x="42" y="26" font-family="monospace, sans-serif" font-size="13" font-weight="bold" fill="#ccff00" letter-spacing="2">
      ABUQITMIRLABS SKILLS ACADEMY
    </text>
  </g>

  <!-- Main Title -->
  <text x="80" y="210" font-family="'Space Grotesk', 'Inter', system-ui, sans-serif" font-size="58" font-weight="800" fill="#ffffff" letter-spacing="-1">
    Brand Banao Business Chalao
  </text>

  <!-- Title Line 2 (Gradient) -->
  <text x="80" y="280" font-family="'Space Grotesk', 'Inter', system-ui, sans-serif" font-size="44" font-weight="700" fill="url(#limeText)" letter-spacing="-0.5">
    Learn to Build a Brand &amp; Business Online
  </text>

  <!-- Subtitle (English & Urdu context) -->
  <text x="80" y="345" font-family="'Inter', system-ui, sans-serif" font-size="22" font-weight="400" fill="#a1a1aa">
    Pakistan's premier AI-powered course in Urdu. Real agency projects, Next.js architecture &amp; revenue skills.
  </text>

  <!-- 3 Strategic Feature Badges -->
  <g transform="translate(80, 410)">
    <!-- Badge 1 -->
    <g transform="translate(0, 0)">
      <rect width="240" height="52" rx="14" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
      <text x="24" y="32" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="600" fill="#ffffff">
        12-Week Intensive Track
      </text>
    </g>

    <!-- Badge 2 -->
    <g transform="translate(255, 0)">
      <rect width="270" height="52" rx="14" fill="rgba(204, 255, 0, 0.08)" stroke="rgba(204, 255, 0, 0.3)" stroke-width="1" />
      <text x="24" y="32" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="600" fill="#ccff00">
        Live Agency Client Capstone
      </text>
    </g>

    <!-- Badge 3 -->
    <g transform="translate(540, 0)">
      <rect width="250" height="52" rx="14" fill="rgba(139, 92, 246, 0.12)" stroke="rgba(139, 92, 246, 0.4)" stroke-width="1" />
      <text x="24" y="32" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="600" fill="#c4b5fd">
        Zero Code with Modern AI
      </text>
    </g>
  </g>

  <!-- Footer Strip inside Card -->
  <line x1="80" y1="520" x2="1120" y2="520" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />

  <text x="80" y="560" font-family="monospace, sans-serif" font-size="14" font-weight="bold" fill="#71717a" letter-spacing="1.5">
    OFFICIAL CERTIFICATION · KARACHI HYBRID &amp; ONLINE
  </text>

  <text x="1120" y="560" text-anchor="end" font-family="monospace, sans-serif" font-size="14" font-weight="bold" fill="#ccff00" letter-spacing="1">
    abuqitmirlabs.tech/skills-academy
  </text>
</svg>
`;

  const buffer = Buffer.from(svg);
  const jpegBuffer = await sharp(buffer)
    .jpeg({ quality: 96, mozjpeg: true })
    .toBuffer();

  const targets = [
    path.join(__dirname, '../public/og-skills-academy.jpg'),
    path.join(__dirname, '../public/twitter-skills-academy.jpg'),
    path.join(__dirname, '../public/images/skills-academy-course-banner.jpg')
  ];

  for (const t of targets) {
    fs.mkdirSync(path.dirname(t), { recursive: true });
    fs.writeFileSync(t, jpegBuffer);
    console.log(`✓ Generated: ${t} (${jpegBuffer.length} bytes)`);
  }
}

generateSkillsAcademyBanner().catch(err => {
  console.error('Error generating banner:', err);
  process.exit(1);
});

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateBanner() {
  const customPng = path.join(process.cwd(), 'public/Custom-Build-vs-Shopify.png');
  if (fs.existsSync(customPng)) {
    console.log('Using original Custom-Build-vs-Shopify.png to build high-res assets...');
    const ogBuf = await sharp(customPng)
      .resize(1200, 675, { fit: 'cover' })
      .jpeg({ quality: 96, mozjpeg: true })
      .toBuffer();

    const twitterBuf = await sharp(customPng)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 96, mozjpeg: true })
      .toBuffer();

    const fullBuf = await sharp(customPng)
      .jpeg({ quality: 96, mozjpeg: true })
      .toBuffer();

    const targets = [
      { file: 'public/og-ecommerce-platform-development.jpg', buf: ogBuf },
      { file: 'public/twitter-ecommerce-platform-development.jpg', buf: twitterBuf },
      { file: 'public/ecommerce-custom-vs-shopify-banner-1920x1080.jpg', buf: fullBuf },
      { file: 'dist/og-ecommerce-platform-development.jpg', buf: ogBuf },
      { file: 'dist/twitter-ecommerce-platform-development.jpg', buf: twitterBuf },
      { file: 'dist/ecommerce-custom-vs-shopify-banner-1920x1080.jpg', buf: fullBuf }
    ];

    for (const t of targets) {
      fs.mkdirSync(path.dirname(t.file), { recursive: true });
      fs.writeFileSync(t.file, t.buf);
      console.log(`Saved ${t.file} (${t.buf.length} bytes)`);
    }

    console.log('Banner generation complete using original image!');
    return;
  }

  const width = 1920;
  const height = 1080;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#040914" />
        <stop offset="50%" stop-color="#071020" />
        <stop offset="100%" stop-color="#03060c" />
      </linearGradient>

      <radialGradient id="warmLight" cx="60%" cy="25%" r="45%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.16" />
        <stop offset="50%" stop-color="#d97706" stop-opacity="0.06" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="greenGlow" cx="85%" cy="20%" r="40%">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.22" />
        <stop offset="60%" stop-color="#15803d" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="leftAmbientGlow" cx="15%" cy="30%" r="35%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#241710" />
        <stop offset="40%" stop-color="#1a110a" />
        <stop offset="100%" stop-color="#0d0805" />
      </linearGradient>

      <linearGradient id="deskHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3d271a" stop-opacity="0.6" />
        <stop offset="50%" stop-color="#543624" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#2e1d13" stop-opacity="0.5" />
      </linearGradient>

      <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#22c55e" />
        <stop offset="100%" stop-color="#16a34a" />
      </linearGradient>

      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0f192b" stop-opacity="0.92" />
        <stop offset="100%" stop-color="#090f1a" stop-opacity="0.96" />
      </linearGradient>

      <linearGradient id="laptopBezel" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>

      <linearGradient id="laptopBase" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#64748b" />
        <stop offset="25%" stop-color="#334155" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>

      <linearGradient id="chartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="50%" stop-color="#06b6d4" />
        <stop offset="100%" stop-color="#22c55e" />
      </linearGradient>

      <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ccff00" />
        <stop offset="100%" stop-color="#22c55e" />
      </linearGradient>

      <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.65" />
      </filter>

      <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#22c55e" flood-opacity="0.25" />
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Ambient Lighting Layers (Warehouse & Studio Bokeh) -->
    <circle cx="280" cy="300" r="380" fill="url(#leftAmbientGlow)" />
    <circle cx="1150" cy="240" r="480" fill="url(#warmLight)" />
    <circle cx="1650" cy="180" r="380" fill="url(#greenGlow)" />

    <!-- Bokeh store lights in deep background -->
    <circle cx="780" cy="140" r="28" fill="#fbbf24" opacity="0.18" filter="blur(10px)" />
    <circle cx="840" cy="190" r="18" fill="#fbbf24" opacity="0.14" />
    <circle cx="1380" cy="120" r="34" fill="#22c55e" opacity="0.15" />
    <circle cx="1440" cy="170" r="22" fill="#38bdf8" opacity="0.12" />
    <circle cx="1720" cy="260" r="40" fill="#22c55e" opacity="0.1" />

    <!-- Desk Surface (Polygonal Perspective Desk) -->
    <polygon points="520,680 1920,640 1920,910 520,910" fill="url(#deskGrad)" />
    <polygon points="520,680 1920,640 1920,685 520,725" fill="url(#deskHighlight)" opacity="0.4" />

    <!-- ======================================================== -->
    <!-- 1. TOP HEADER (BRAND & LUXURY SCRIPT) -->
    <!-- ======================================================== -->
    <!-- Brand Logo Left -->
    <g transform="translate(60, 48)">
      <!-- Hex Shield -->
      <path d="M28,4 L50,16 L50,42 L28,54 L6,42 L6,16 Z" fill="url(#brandLogoGrad)" />
      <!-- Black 'A' symbol inside -->
      <path d="M28,14 L38,38 L32,38 L28,26 L24,38 L18,38 Z M28,21 L25,32 L31,32 Z" fill="#000000" />
      <!-- Text -->
      <text x="64" y="30" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="-0.5">AbuQitmir<tspan fill="#22c55e">Labs</tspan></text>
      <text x="66" y="48" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="12" font-weight="700" fill="#94a3b8" letter-spacing="3.5">CUSTOM SOFTWARE &amp; AI SOLUTIONS</text>
    </g>

    <!-- Top Right Handwriting Script -->
    <g transform="translate(1620, 68)" text-anchor="middle">
      <text x="0" y="0" font-family="'Liberation Sans', 'DejaVu Sans', cursive, sans-serif" font-style="italic" font-size="34" font-weight="800" fill="#ccff00" letter-spacing="0.5">Better Platform.</text>
      <text x="0" y="38" font-family="'Liberation Sans', 'DejaVu Sans', cursive, sans-serif" font-style="italic" font-size="34" font-weight="800" fill="#ccff00" letter-spacing="0.5">Bigger Possibilities.</text>
      <!-- Two curved green underline swooshes -->
      <path d="M-120,52 Q-40,65 60,48 Q100,42 130,55" fill="none" stroke="#ccff00" stroke-width="4" stroke-linecap="round" />
      <path d="M-80,62 Q-10,72 90,58" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" opacity="0.8" />
    </g>

    <!-- ======================================================== -->
    <!-- 2. LEFT HERO CONTENT BLOCK -->
    <!-- ======================================================== -->
    <g transform="translate(60, 160)">
      <!-- Main Headline -->
      <text x="0" y="50" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="58" font-weight="900" fill="#ffffff" letter-spacing="-1">Shopify Powers</text>
      <text x="0" y="118" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="58" font-weight="900" fill="#22c55e" letter-spacing="-1">30% of the US Market</text>
      <text x="0" y="176" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="34" font-weight="700" fill="#ffffff" letter-spacing="-0.5">and Runs on <tspan fill="#22c55e" font-weight="900">4.82M+</tspan> Active Stores Worldwide.</text>

      <!-- Paragraph description -->
      <text x="0" y="240" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="18" font-weight="400" fill="#cbd5e1" line-height="1.6">
        <tspan x="0" dy="0">It's a powerful platform — but for certain businesses, it can also be one</tspan>
        <tspan x="0" dy="30">of the most expensive options as you scale. Understanding where</tspan>
        <tspan x="0" dy="30">Shopify wins and where e-commerce platform development earns its</tspan>
        <tspan x="0" dy="30">investment is a straightforward financial calculation once you have</tspan>
        <tspan x="0" dy="30">the right numbers.</tspan>
      </text>

      <!-- CTA Button Pill -->
      <g transform="translate(0, 420)">
        <rect width="560" height="66" rx="33" fill="url(#ctaGrad)" filter="url(#badgeGlow)" />
        <!-- Inner Black Circle Arrow -->
        <circle cx="36" cy="33" r="18" fill="#000000" />
        <path d="M30,33 L42,33 M37,28 L42,33 L37,38" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Button Text -->
        <text x="70" y="40" font-family="'Liberation Sans', 'DejaVu Sans', sans-serif" font-size="20" font-weight="900" fill="#000000" letter-spacing="0.2">Read the full 2026 decision framework  →</text>
      </g>

      <!-- Link underneath -->
      <text x="80" y="520" font-family="'Liberation Sans', 'DejaVu Sans', monospace" font-size="15" font-weight="500" fill="#94a3b8">https://abuqitmirlabs.tech/solutions/e-commerce</text>
    </g>

    <!-- ======================================================== -->
    <!-- 3. CENTER-RIGHT DESK SCENE (LAPTOP, BADGES, CART, PHONE) -->
    <!-- ======================================================== -->

    <!-- FLOATING STAT BADGES ABOVE LAPTOP -->
    <!-- Badge 1: Shopify 30% -->
    <g transform="translate(930, 50)" filter="url(#softShadow)">
      <rect width="260" height="150" rx="20" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5" />
      <!-- Shopify Bag Icon -->
      <g transform="translate(24, 22)">
        <path d="M14,6 C14,3 18,1 21,1 C24,1 28,3 28,6 L34,8 L30,34 L12,34 L8,8 Z" fill="#95bf47" />
        <path d="M21,3 C19,3 16,5 16,8 L26,8 C26,5 23,3 21,3 Z" fill="#5e8e3e" />
        <!-- S mark on bag -->
        <text x="21" y="24" font-family="'Liberation Sans', sans-serif" font-size="15" font-weight="900" fill="#ffffff" text-anchor="middle">S</text>
      </g>
      <text x="70" y="44" font-family="'Liberation Sans', sans-serif" font-size="26" font-weight="800" fill="#ffffff">shopify</text>
      <text x="24" y="98" font-family="'Liberation Sans', sans-serif" font-size="44" font-weight="900" fill="#22c55e">30%</text>
      <text x="24" y="122" font-family="'Liberation Sans', sans-serif" font-size="13" font-weight="700" fill="#94a3b8">US E-Commerce Platform Market</text>
    </g>

    <!-- Badge 2: 4.82M+ Active Stores -->
    <g transform="translate(1220, 50)" filter="url(#softShadow)">
      <rect width="250" height="150" rx="20" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5" />
      <!-- Store Icon -->
      <g transform="translate(24, 22)">
        <rect x="2" y="10" width="36" height="22" rx="4" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <path d="M2,10 L8,2 L32,2 L38,10" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linejoin="round" />
        <rect x="14" y="18" width="12" height="14" fill="#22c55e" opacity="0.6" />
      </g>
      <text x="24" y="98" font-family="'Liberation Sans', sans-serif" font-size="44" font-weight="900" fill="#22c55e">4.82M+</text>
      <text x="24" y="122" font-family="'Liberation Sans', sans-serif" font-size="13" font-weight="700" fill="#94a3b8">Active Stores Worldwide</text>
    </g>

    <!-- THE LAPTOP (x: 900, y: 220, w: 710, h: 480) -->
    <g transform="translate(900, 220)" filter="url(#softShadow)">
      <!-- Screen Outer Lid / Bezel -->
      <rect x="35" y="0" width="640" height="420" rx="16" fill="url(#laptopBezel)" stroke="#334155" stroke-width="3" />
      <!-- Camera dot -->
      <circle cx="355" cy="10" r="3" fill="#0f172a" />
      <circle cx="355" cy="10" r="1.2" fill="#38bdf8" />

      <!-- Inside Display Screen (Clean Modern White UI) -->
      <rect x="45" y="20" width="620" height="390" rx="6" fill="#f8fafc" />

      <!-- Display Header -->
      <text x="355" y="48" font-family="'Liberation Sans', sans-serif" font-size="22" font-weight="900" fill="#0f172a" text-anchor="middle">Shopify vs Custom Development</text>
      <text x="355" y="66" font-family="'Liberation Sans', sans-serif" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">Two Paths. One Goal — Your Success.</text>

      <!-- Panel 1: Shopify Card -->
      <g transform="translate(60, 80)">
        <rect width="175" height="280" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
        <!-- Header -->
        <path d="M22,14 C22,12 25,10 27,10 C29,10 32,12 32,14 L36,16 L33,32 L20,32 L17,16 Z" fill="#95bf47" />
        <text x="42" y="27" font-family="'Liberation Sans', sans-serif" font-size="16" font-weight="900" fill="#1e293b">shopify</text>
        <!-- Checklist -->
        <g transform="translate(14, 52)" font-family="'Liberation Sans', sans-serif" font-size="11" font-weight="600" fill="#334155">
          <circle cx="6" cy="6" r="6" fill="#dcfce7" />
          <path d="M3,6 L5,8 L9,4" fill="none" stroke="#16a34a" stroke-width="1.8" />
          <text x="18" y="10">Fast Launch</text>

          <circle cx="6" cy="36" r="6" fill="#dcfce7" />
          <path d="M3,36 L5,38 L9,34" fill="none" stroke="#16a34a" stroke-width="1.8" />
          <text x="18" y="40">Built-in Security</text>

          <circle cx="6" cy="66" r="6" fill="#dcfce7" />
          <path d="M3,66 L5,68 L9,64" fill="none" stroke="#16a34a" stroke-width="1.8" />
          <text x="18" y="70">Easy to Manage</text>

          <circle cx="6" cy="96" r="6" fill="#dcfce7" />
          <path d="M3,96 L5,98 L9,94" fill="none" stroke="#16a34a" stroke-width="1.8" />
          <text x="18" y="100">Large App Ecosystem</text>

          <circle cx="6" cy="126" r="6" fill="#dcfce7" />
          <path d="M3,126 L5,128 L9,124" fill="none" stroke="#16a34a" stroke-width="1.8" />
          <text x="18" y="130">Best for Standard Catalogs</text>
        </g>
        <!-- Bottom Pill -->
        <rect x="12" y="235" width="151" height="28" rx="14" fill="#22c55e" />
        <text x="87" y="253" font-family="'Liberation Sans', sans-serif" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">Great for Early Stage &amp; SMBs</text>
      </g>

      <!-- Panel 2: Custom Development Card -->
      <g transform="translate(245, 80)">
        <rect width="175" height="280" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
        <!-- Header -->
        <rect x="14" y="14" width="22" height="18" rx="4" fill="#0284c7" />
        <text x="25" y="27" font-family="'Liberation Sans', monospace" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">&lt;/&gt;</text>
        <text x="42" y="27" font-family="'Liberation Sans', sans-serif" font-size="13" font-weight="900" fill="#0f172a">Custom Development</text>
        <!-- Checklist -->
        <g transform="translate(14, 52)" font-family="'Liberation Sans', sans-serif" font-size="11" font-weight="600" fill="#334155">
          <circle cx="6" cy="6" r="6" fill="#e0f2fe" />
          <path d="M3,6 L5,8 L9,4" fill="none" stroke="#0284c7" stroke-width="1.8" />
          <text x="18" y="10">Full Flexibility</text>

          <circle cx="6" cy="36" r="6" fill="#e0f2fe" />
          <path d="M3,36 L5,38 L9,34" fill="none" stroke="#0284c7" stroke-width="1.8" />
          <text x="18" y="40">No Transaction Fees</text>

          <circle cx="6" cy="66" r="6" fill="#e0f2fe" />
          <path d="M3,66 L5,68 L9,64" fill="none" stroke="#0284c7" stroke-width="1.8" />
          <text x="18" y="70">Unique Features</text>

          <circle cx="6" cy="96" r="6" fill="#e0f2fe" />
          <path d="M3,96 L5,98 L9,94" fill="none" stroke="#0284c7" stroke-width="1.8" />
          <text x="18" y="100">Better for Complex Logic</text>

          <circle cx="6" cy="126" r="6" fill="#e0f2fe" />
          <path d="M3,126 L5,128 L9,124" fill="none" stroke="#0284c7" stroke-width="1.8" />
          <text x="18" y="130">Long-Term Cost Efficiency</text>
        </g>
        <!-- Bottom Pill -->
        <rect x="12" y="235" width="151" height="28" rx="14" fill="#0284c7" />
        <text x="87" y="253" font-family="'Liberation Sans', sans-serif" font-size="9.5" font-weight="800" fill="#ffffff" text-anchor="middle">Best for Growing &amp; Enterprise</text>
      </g>

      <!-- Panel 3: The Big Picture Card -->
      <g transform="translate(430, 80)">
        <rect width="135" height="280" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="67" y="28" font-family="'Liberation Sans', sans-serif" font-size="13" font-weight="900" fill="#0f172a" text-anchor="middle">The Big Picture</text>

        <!-- Upward Growth Chart -->
        <g transform="translate(20, 60)">
          <!-- Rising Bars -->
          <rect x="10" y="80" width="14" height="40" rx="3" fill="#0284c7" />
          <rect x="32" y="60" width="14" height="60" rx="3" fill="#0ea5e9" />
          <rect x="54" y="35" width="14" height="85" rx="3" fill="#06b6d4" />
          <rect x="76" y="10" width="14" height="110" rx="3" fill="#22c55e" />
          <!-- Growth Arrow -->
          <path d="M10,85 Q45,50 82,12" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" />
          <polygon points="85,6 87,18 76,14" fill="#16a34a" />
        </g>

        <!-- Big Picture Text -->
        <text x="67" y="210" font-family="'Liberation Sans', sans-serif" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle">Right platform.</text>
        <text x="67" y="228" font-family="'Liberation Sans', sans-serif" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle">Higher returns.</text>
      </g>

      <!-- Bottom Laptop Navigation Bar -->
      <g transform="translate(120, 385)" font-family="'Liberation Sans', sans-serif" font-size="11" font-weight="700" fill="#64748b">
        <text x="30" y="0">&lt;/&gt;  Build</text>
        <text x="140" y="0">🔗 Integrate</text>
        <text x="260" y="0">📈 Scale</text>
        <text x="370" y="0">🌱 Grow</text>
      </g>

      <!-- Laptop Base / Keyboard Section (Angled metallic plate) -->
      <polygon points="0,420 710,420 670,450 40,450" fill="url(#laptopBase)" stroke="#475569" stroke-width="1.5" />
      <!-- Center opening trackpad notch -->
      <rect x="315" y="420" width="80" height="6" rx="3" fill="#1e293b" />
    </g>

    <!-- SHOPPING CART & PACKAGES (Left of Laptop) -->
    <g transform="translate(590, 350)" filter="url(#softShadow)">
      <!-- Cart Wheels -->
      <circle cx="50" cy="270" r="10" fill="#334155" stroke="#94a3b8" stroke-width="3" />
      <circle cx="115" cy="270" r="10" fill="#334155" stroke="#94a3b8" stroke-width="3" />
      <path d="M50,265 L115,265" stroke="#64748b" stroke-width="4" />
      <!-- Cart Frame -->
      <path d="M30,190 L50,260 L125,260 L145,150 L20,150" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-linejoin="round" />
      <path d="M15,140 L35,140 L45,190" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" />
      <!-- Wire Basket Grid -->
      <line x1="30" y1="180" x2="140" y2="180" stroke="#94a3b8" stroke-width="2" />
      <line x1="40" y1="215" x2="135" y2="215" stroke="#94a3b8" stroke-width="2" />
      <line x1="60" y1="150" x2="65" y2="250" stroke="#94a3b8" stroke-width="2" />
      <line x1="90" y1="150" x2="95" y2="250" stroke="#94a3b8" stroke-width="2" />
      <line x1="120" y1="150" x2="120" y2="250" stroke="#94a3b8" stroke-width="2" />

      <!-- Green Shopping Bag inside Cart -->
      <g transform="translate(60, 115)">
        <!-- Bag Handles -->
        <path d="M22,25 C22,12 42,12 42,25" fill="none" stroke="#ffffff" stroke-width="3" />
        <!-- Bag Body -->
        <polygon points="12,24 52,24 58,85 6,85" fill="#22c55e" rx="4" />
        <!-- Leaf / White S logo -->
        <path d="M32,45 C38,45 42,50 42,56 C42,65 32,70 32,70 C32,70 22,65 22,56 C22,50 26,45 32,45 Z" fill="#ffffff" />
      </g>

      <!-- Kraft Shipping Cardboard Box 1 -->
      <g transform="translate(130, 175)">
        <polygon points="10,25 60,10 95,28 45,45" fill="#d97706" />
        <polygon points="10,25 45,45 45,95 10,75" fill="#b45309" />
        <polygon points="45,45 95,28 95,78 45,95" fill="#92400e" />
        <!-- Tape -->
        <line x1="52" y1="17" x2="27" y2="35" stroke="#fbbf24" stroke-width="6" opacity="0.8" />
      </g>

      <!-- Kraft Shipping Cardboard Box 2 -->
      <g transform="translate(120, 230)">
        <polygon points="10,20 50,8 80,22 40,36" fill="#d97706" />
        <polygon points="10,20 40,36 40,75 10,60" fill="#b45309" />
        <polygon points="40,36 80,22 80,62 40,75" fill="#92400e" />
      </g>
    </g>

    <!-- SMARTPHONE CASE STUDY MOCKUP (Right of Laptop) -->
    <g transform="translate(1610, 335)" filter="url(#softShadow)">
      <!-- Outer Phone Bezel -->
      <rect width="250" height="425" rx="38" fill="#0f172a" stroke="#334155" stroke-width="4" />
      <!-- Glass Screen -->
      <rect x="10" y="10" width="230" height="405" rx="30" fill="#f8fafc" />
      <!-- Punch Hole Camera & Speaker -->
      <circle cx="125" cy="22" r="4" fill="#000000" />

      <!-- Status Bar -->
      <text x="28" y="32" font-family="'Liberation Sans', sans-serif" font-size="10" font-weight="700" fill="#64748b">11:31</text>
      <text x="210" y="32" font-family="'Liberation Sans', sans-serif" font-size="10" font-weight="700" fill="#64748b" text-anchor="end">📶 🔋</text>

      <!-- Screen Header -->
      <text x="28" y="58" font-family="'Liberation Sans', sans-serif" font-size="13" font-weight="800" fill="#0f172a">← Case Study</text>

      <!-- App Card Mockup -->
      <rect x="20" y="72" width="210" height="300" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#softShadow)" />

      <!-- Preview Image thumbnail in App Card -->
      <rect x="30" y="82" width="190" height="75" rx="8" fill="#0f172a" />
      <!-- Mini Dashboard graphic inside thumbnail -->
      <rect x="38" y="92" width="45" height="45" rx="6" fill="#0284c7" />
      <rect x="90" y="92" width="120" height="10" rx="3" fill="#334155" />
      <rect x="90" y="108" width="90" height="8" rx="3" fill="#475569" />
      <rect x="90" y="122" width="110" height="8" rx="3" fill="#334155" />

      <!-- App Title & Verified Badge -->
      <text x="32" y="180" font-family="'Liberation Sans', sans-serif" font-size="17" font-weight="900" fill="#0f172a">HealthPlus</text>
      <text x="32" y="196" font-family="'Liberation Sans', sans-serif" font-size="11" font-weight="600" fill="#64748b">Healthcare E-Commerce Platform</text>
      <rect x="32" y="206" width="60" height="18" rx="9" fill="#dcfce7" />
      <text x="62" y="219" font-family="'Liberation Sans', sans-serif" font-size="10" font-weight="800" fill="#15803d" text-anchor="middle">✓ Verified</text>

      <!-- App Description -->
      <text x="32" y="240" font-family="'Liberation Sans', sans-serif" font-size="9.5" font-weight="500" fill="#475569">
        <tspan x="32" dy="0">Custom e-commerce platform with</tspan>
        <tspan x="32" dy="14">subscription billing, inventory</tspan>
        <tspan x="32" dy="14">management and multi-vendor support.</tspan>
      </text>

      <!-- Stats Grid -->
      <g transform="translate(32, 290)">
        <text x="0" y="0" font-family="'Liberation Sans', sans-serif" font-size="15" font-weight="900" fill="#22c55e">+250%</text>
        <text x="0" y="14" font-family="'Liberation Sans', sans-serif" font-size="9" font-weight="600" fill="#64748b">Revenue Growth</text>

        <text x="100" y="0" font-family="'Liberation Sans', sans-serif" font-size="15" font-weight="900" fill="#0f172a">3 Months</text>
        <text x="100" y="14" font-family="'Liberation Sans', sans-serif" font-size="9" font-weight="600" fill="#64748b">Timeline</text>
      </g>

      <!-- Button -->
      <rect x="32" y="325" width="186" height="34" rx="8" fill="#0f172a" />
      <text x="125" y="347" font-family="'Liberation Sans', sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">View Case Study →</text>
    </g>

    <!-- NOTEBOOK & PEN ON DESK (Front Foreground) -->
    <g transform="translate(60, 690)" filter="url(#softShadow)">
      <!-- Black Leather Notebook (perspective angle) -->
      <polygon points="10,20 380,50 350,130 0,95" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
      <polygon points="0,95 350,130 350,145 0,110" fill="#090d16" />
      <!-- Cyan/White Embossed Title on Notebook -->
      <g transform="translate(80, 55) rotate(5)">
        <text x="0" y="0" font-family="'Liberation Sans', cursive, sans-serif" font-size="20" font-weight="900" fill="#38bdf8" font-style="italic">Better</text>
        <text x="0" y="24" font-family="'Liberation Sans', sans-serif" font-size="17" font-weight="800" fill="#ffffff">E-Commerce</text>
        <text x="0" y="44" font-family="'Liberation Sans', sans-serif" font-size="17" font-weight="800" fill="#ffffff">Solutions</text>
      </g>

      <!-- Silver & Black Executive Pen -->
      <g transform="translate(260, 45) rotate(22)">
        <rect x="0" y="0" width="140" height="9" rx="4" fill="#020617" stroke="#94a3b8" stroke-width="1" />
        <rect x="100" y="-1" width="30" height="11" rx="2" fill="#cbd5e1" />
        <polygon points="0,4.5 15,1 15,8" fill="#94a3b8" />
        <rect x="80" y="2" width="25" height="2" fill="#cbd5e1" />
      </g>
    </g>

    <!-- ======================================================== -->
    <!-- 4. BOTTOM FEATURE BAR (DARK GLASS DIVIDER) -->
    <!-- ======================================================== -->
    <g transform="translate(0, 790)">
      <!-- Translucent Bar Background -->
      <rect width="${width}" height="130" fill="#050a14" opacity="0.94" stroke="#1e293b" stroke-width="1.5" />

      <!-- Feature 1: Real Data -->
      <g transform="translate(60, 40)">
        <circle cx="28" cy="25" r="24" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <!-- Search Icon inside -->
        <circle cx="25" cy="22" r="8" fill="none" stroke="#22c55e" stroke-width="2" />
        <line x1="31" y1="28" x2="38" y2="35" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" />
        <text x="64" y="20" font-family="'Liberation Sans', sans-serif" font-size="18" font-weight="900" fill="#ffffff">Real Data</text>
        <text x="64" y="40" font-family="'Liberation Sans', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Not Guesswork</text>
      </g>

      <!-- Feature 2: Detailed Cost Analysis -->
      <g transform="translate(380, 40)">
        <circle cx="28" cy="25" r="24" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <!-- Document Icon inside -->
        <rect x="19" y="14" width="18" height="22" rx="2" fill="none" stroke="#22c55e" stroke-width="2" />
        <line x1="23" y1="20" x2="33" y2="20" stroke="#22c55e" stroke-width="1.5" />
        <line x1="23" y1="25" x2="33" y2="25" stroke="#22c55e" stroke-width="1.5" />
        <line x1="23" y1="30" x2="29" y2="30" stroke="#22c55e" stroke-width="1.5" />
        <text x="64" y="20" font-family="'Liberation Sans', sans-serif" font-size="18" font-weight="900" fill="#ffffff">Detailed</text>
        <text x="64" y="40" font-family="'Liberation Sans', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Cost Analysis</text>
      </g>

      <!-- Feature 3: Platform Comparison -->
      <g transform="translate(710, 40)">
        <circle cx="28" cy="25" r="24" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <!-- Gear / Cog Icon inside -->
        <circle cx="28" cy="25" r="6" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <path d="M28,15 L28,18 M28,32 L28,35 M18,25 L21,25 M35,25 L38,25" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" />
        <text x="64" y="20" font-family="'Liberation Sans', sans-serif" font-size="18" font-weight="900" fill="#ffffff">Platform</text>
        <text x="64" y="40" font-family="'Liberation Sans', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Comparison</text>
      </g>

      <!-- Feature 4: Build What Fits Your Business -->
      <g transform="translate(1040, 40)">
        <circle cx="28" cy="25" r="24" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <!-- Target / Bullseye Icon -->
        <circle cx="28" cy="25" r="10" fill="none" stroke="#22c55e" stroke-width="2" />
        <circle cx="28" cy="25" r="4" fill="#22c55e" />
        <text x="64" y="20" font-family="'Liberation Sans', sans-serif" font-size="18" font-weight="900" fill="#ffffff">Build What</text>
        <text x="64" y="40" font-family="'Liberation Sans', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Fits Your Business</text>
      </g>

      <!-- Right Logo in Feature Bar -->
      <g transform="translate(1500, 35)">
        <path d="M30,8 L48,18 L48,40 L30,50 L12,40 L12,18 Z" fill="url(#brandLogoGrad)" />
        <path d="M30,16 L38,36 L34,36 L30,26 L26,36 L22,36 Z M30,22 L27,31 L33,31 Z" fill="#000000" />
        <text x="58" y="32" font-family="'Liberation Sans', sans-serif" font-size="28" font-weight="900" fill="#ffffff">AbuQitmir<tspan fill="#22c55e">Labs</tspan></text>
        <text x="60" y="48" font-family="'Liberation Sans', sans-serif" font-size="10.5" font-weight="700" fill="#94a3b8" letter-spacing="2.5">CUSTOM SOFTWARE &amp; AI SOLUTIONS</text>
      </g>
    </g>

    <!-- ======================================================== -->
    <!-- 5. BOTTOM SUB-BAR (CONTACT & GREEN ACCENT) -->
    <!-- ======================================================== -->
    <g transform="translate(0, 920)">
      <rect width="${width}" height="160" fill="#030712" />

      <!-- Phone / WhatsApp -->
      <g transform="translate(60, 50)">
        <circle cx="24" cy="20" r="22" fill="#22c55e" />
        <!-- Phone Receiver SVG -->
        <path d="M18,14 C18,22 24,28 32,28 L30,24 C29,23 27,23 26,24 L25,25 C22,23 20,21 19,18 L20,17 C21,16 21,14 20,13 Z" fill="#ffffff" />
        <text x="58" y="27" font-family="'Liberation Sans', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="0.5">+92 323 3260859</text>
      </g>

      <!-- Website Globe -->
      <g transform="translate(680, 50)">
        <circle cx="20" cy="20" r="16" fill="none" stroke="#94a3b8" stroke-width="2" />
        <line x1="4" y1="20" x2="36" y2="20" stroke="#94a3b8" stroke-width="1.8" />
        <ellipse cx="20" cy="20" rx="9" ry="16" fill="none" stroke="#94a3b8" stroke-width="1.8" />
        <text x="48" y="27" font-family="'Liberation Sans', sans-serif" font-size="20" font-weight="700" fill="#cbd5e1">abuqitmirlabs.tech</text>
      </g>

      <!-- Location Pin -->
      <g transform="translate(1080, 50)">
        <!-- Pin icon -->
        <path d="M20,6 C13,6 8,11 8,18 C8,26 20,36 20,36 C20,36 32,26 32,18 C32,11 27,6 20,6 Z" fill="#22c55e" />
        <circle cx="20" cy="17" r="4" fill="#030712" />
        <text x="44" y="27" font-family="'Liberation Sans', sans-serif" font-size="18" font-weight="700" fill="#cbd5e1">Karachi, Pakistan &amp; Worldwide</text>
      </g>

      <!-- Right Hand-drawn Tagline -->
      <g transform="translate(1620, 65)">
        <text x="0" y="0" font-family="'Liberation Sans', 'DejaVu Sans', cursive, sans-serif" font-style="italic" font-size="24" font-weight="800" fill="#22c55e" text-anchor="middle">Your E-Commerce Growth Partner</text>
        <path d="M70,12 Q100,12 125,5 M115,-3 L125,5 L115,13" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </svg>`;

  console.log('Rendering high-res 1920x1080 and 1200x630 banner images...');

  // 1. Render primary 1920x1080 image
  const fullBuffer = await sharp(Buffer.from(svg))
    .jpeg({ quality: 96, mozjpeg: true })
    .toBuffer();

  // 2. Render 1200x675 / 1200x630 for standard OG social card
  const ogBuffer = await sharp(Buffer.from(svg))
    .resize(1200, 675, { fit: 'cover' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer();

  const twitterBuffer = await sharp(Buffer.from(svg))
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer();

  // Write outputs
  const targets = [
    { file: 'public/og-ecommerce-platform-development.jpg', buf: ogBuffer },
    { file: 'public/twitter-ecommerce-platform-development.jpg', buf: twitterBuffer },
    { file: 'public/ecommerce-custom-vs-shopify-banner-1920x1080.jpg', buf: fullBuffer },
    { file: 'dist/og-ecommerce-platform-development.jpg', buf: ogBuffer },
    { file: 'dist/twitter-ecommerce-platform-development.jpg', buf: twitterBuffer },
    { file: 'dist/ecommerce-custom-vs-shopify-banner-1920x1080.jpg', buf: fullBuffer }
  ];

  for (const t of targets) {
    fs.mkdirSync(path.dirname(t.file), { recursive: true });
    fs.writeFileSync(t.file, t.buf);
    console.log(`Saved ${t.file} (${t.buf.length} bytes)`);
  }

  console.log('Banner generation complete!');
}

generateBanner().catch(err => {
  console.error('Error generating banner:', err);
  process.exit(1);
});

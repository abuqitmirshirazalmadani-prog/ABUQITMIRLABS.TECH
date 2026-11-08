const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const width = 1584;
const height = 396;

// Save clean vector SVG version as well
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050505" />
      <stop offset="45%" stop-color="#0a0c0e" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d4ff00" />
      <stop offset="100%" stop-color="#99cc00" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect x="0" y="0" width="${width}" height="3" fill="url(#limeGrad)" />
  <g transform="translate(378, 46)">
    <circle cx="22" cy="22" r="22" fill="url(#limeGrad)" />
    <path d="M22 8 L33 33 L27 33 L22 21 L17 33 L11 33 Z" fill="#050505" />
    <text x="56" y="30" font-family="Inter, sans-serif" font-weight="800" font-size="24" fill="#ffffff">AbuQitmir<tspan fill="#ccff00">Labs</tspan></text>
  </g>
  <text x="378" y="162" font-family="Inter, sans-serif" font-weight="800" font-size="45" fill="#ffffff">AI Engineering <tspan fill="#ccff00">+ Custom Software</tspan></text>
  <text x="378" y="236" font-family="JetBrains Mono, monospace" font-weight="700" font-size="23" fill="#f4f4f5">AI Agents <tspan fill="#ccff00">•</tspan> RAG Systems <tspan fill="#ccff00">•</tspan> SaaS <tspan fill="#ccff00">•</tspan> Web Platforms</text>
  <text x="378" y="322" font-family="Inter, sans-serif" font-weight="700" font-size="29" fill="#e4e4e7">Build systems that are <tspan fill="#ccff00">ready to scale.</tspan></text>
</svg>`;

const outDir = path.join(process.cwd(), 'public', 'brand-assets', '03-LinkedIn');
const flatDir = path.join(process.cwd(), 'public', 'brand-assets');
fs.mkdirSync(outDir, { recursive: true });

const svgPath = path.join(outDir, 'linkedin-founder-banner-1584x396.svg');
const pngFounderPath = path.join(outDir, 'linkedin-founder-banner-1584x396.png');
const pngFlatFounderPath = path.join(flatDir, 'linkedin-founder-banner-1584x396.png');
const pngPersonalPath = path.join(outDir, 'linkedin-personal-banner-1584x396.png');
const pngFlatPersonalPath = path.join(flatDir, 'linkedin-personal-banner-1584x396.png');

fs.writeFileSync(svgPath, svgContent, 'utf8');
fs.writeFileSync(path.join(flatDir, 'linkedin-founder-banner-1584x396.svg'), svgContent, 'utf8');

const S = 1;
const W = width * S;
const H = height * S;

const drawCmds = [];

// 1. Subtle architectural grid lines
for (let x = 0; x <= W; x += 44) {
  drawCmds.push(`stroke "rgba(255,255,255,0.03)" stroke-width 1 line ${x},0 ${x},${H}`);
}
for (let y = 0; y <= H; y += 44) {
  drawCmds.push(`stroke "rgba(255,255,255,0.03)" stroke-width 1 line 0,${y} ${W},${y}`);
}

// 2. Top & bottom neon accent bars
drawCmds.push(`stroke none fill "#ccff00" rectangle 0,0 ${W},3`);
drawCmds.push(`stroke none fill "#18181b" rectangle 0,${H - 3} ${W},${H}`);
drawCmds.push(`stroke none fill "#ccff00" rectangle 346,${H - 3} 1270,${H}`);

// 3. Left LinkedIn Profile Avatar Safe-Zone Tech Rings (x: 172, y: 266)
const cx = 172;
const cy = 266;
drawCmds.push(`fill none stroke "rgba(204,255,0,0.22)" stroke-width 1.2 circle ${cx},${cy} ${cx + 112},${cy}`);
drawCmds.push(`fill none stroke "rgba(255,255,255,0.08)" stroke-width 1 circle ${cx},${cy} ${cx + 136},${cy}`);
drawCmds.push(`fill none stroke "rgba(204,255,0,0.48)" stroke-width 1.5 line 0,88 296,88`);
drawCmds.push(`stroke none fill "#ccff00" circle 296,88 300,88`);

// 4. Vertical Safe-Zone Divider at x = 346
drawCmds.push(`fill none stroke "#27272a" stroke-width 1.5 line 346,38 346,358`);
drawCmds.push(`stroke none fill "#ccff00" roundrectangle 344.5,128 347.5,268 1.5,1.5`);

// 5. Top Brand Emblem Circle + 'A' Logo at (402, 62)
const logoCx = 402;
const logoCy = 62;
const logoR = 22;
drawCmds.push(`stroke none fill "#ccff00" circle ${logoCx},${logoCy} ${logoCx + logoR},${logoCy}`);
// Geometric 'A' inside circle
drawCmds.push(`stroke none fill "#050505" polygon ${logoCx},48 ${logoCx + 12},74 ${logoCx + 6},74 ${logoCx},60 ${logoCx - 6},74 ${logoCx - 12},74`);
drawCmds.push(`stroke none fill "#84cc16" polygon ${logoCx},63 ${logoCx + 3.8},70 ${logoCx},76 ${logoCx - 3.8},70`);

// Studio Domain Pill Badge at top right of brand header (x: 676..896)
drawCmds.push(`fill "#111610" stroke "rgba(204,255,0,0.42)" stroke-width 1.3 roundrectangle 676,46 896,78 16,16`);
drawCmds.push(`stroke none fill "#ccff00" circle 695,62 699,62`);

// 6. Pillars Container Box (x: 378..1262, y: 194..254)
drawCmds.push(`fill "rgba(18,23,16,0.94)" stroke "rgba(204,255,0,0.42)" stroke-width 1.5 roundrectangle 378,194 1262,254 12,12`);
drawCmds.push(`stroke none fill "#ccff00" roundrectangle 378,194 384,254 3,3`);

// 7. Tagline Terminal Icon Box (x: 378, y: 292..328)
drawCmds.push(`fill "rgba(204,255,0,0.14)" stroke "#ccff00" stroke-width 1.5 roundrectangle 378,292 414,328 8,8`);
drawCmds.push(`fill none stroke "#ccff00" stroke-width 2.5 stroke-linecap round polyline 389,303 397,310 389,317`);
drawCmds.push(`fill none stroke "#ccff00" stroke-width 2.5 stroke-linecap round line 399,317 406,317`);

// 8. Right Architectural Systems Node Card (x: 1326..1542, y: 46..350)
drawCmds.push(`fill "#0b0e0b" stroke "#27272a" stroke-width 1.5 roundrectangle 1326,46 1542,350 18,18`);
drawCmds.push(`fill "#080a08" stroke "rgba(204,255,0,0.26)" stroke-width 1 roundrectangle 1340,60 1528,336 12,12`);
// Window dots
drawCmds.push(`stroke none fill "#ccff00" circle 1358,80 1361.5,80`);
drawCmds.push(`stroke none fill "#27272a" circle 1372,80 1375.5,80`);
drawCmds.push(`stroke none fill "#27272a" circle 1386,80 1389.5,80`);

// Node connecting lines inside right card
const nTopX = 1434, nTopY = 132;
const nLeftX = 1384, nLeftY = 198;
const nRightX = 1484, nRightY = 198;
const nBotX = 1434, nBotY = 264;

drawCmds.push(`fill none stroke "rgba(204,255,0,0.55)" stroke-width 1.8 line ${nTopX},${nTopY} ${nLeftX},${nLeftY}`);
drawCmds.push(`fill none stroke "rgba(204,255,0,0.55)" stroke-width 1.8 line ${nTopX},${nTopY} ${nRightX},${nRightY}`);
drawCmds.push(`fill none stroke "rgba(204,255,0,0.55)" stroke-width 1.8 line ${nLeftX},${nLeftY} ${nBotX},${nBotY}`);
drawCmds.push(`fill none stroke "rgba(204,255,0,0.55)" stroke-width 1.8 line ${nRightX},${nRightY} ${nBotX},${nBotY}`);
drawCmds.push(`fill none stroke "rgba(204,255,0,0.35)" stroke-width 1.2 line ${nLeftX},${nLeftY} ${nRightX},${nRightY}`);

// Node circles
drawCmds.push(`fill "#13190e" stroke "#ccff00" stroke-width 2 circle ${nTopX},${nTopY} ${nTopX + 20},${nTopY}`);
drawCmds.push(`fill "#111318" stroke "#e4e4e7" stroke-width 1.5 circle ${nLeftX},${nLeftY} ${nLeftX + 18},${nLeftY}`);
drawCmds.push(`fill "#111318" stroke "#e4e4e7" stroke-width 1.5 circle ${nRightX},${nRightY} ${nRightX + 18},${nRightY}`);
drawCmds.push(`fill "#13190e" stroke "#ccff00" stroke-width 2 circle ${nBotX},${nBotY} ${nBotX + 18},${nBotY}`);

const args = [
  '-size', `${W}x${H}`,
  'xc:#060708',
  '-draw', drawCmds.join(' '),

  // Brand Name: AbuQitmirLabs (properly kerned)
  '-font', 'DejaVu-Sans-Bold',
  '-pointsize', '25',
  '-fill', '#ffffff',
  '-annotate', '+436+71', 'AbuQitmir',
  '-fill', '#ccff00',
  '-annotate', '+583+71', 'Labs',

  // Studio Domain Badge Text
  '-font', 'JetBrains-Mono-Bold',
  '-pointsize', '13',
  '-fill', '#e4e4e7',
  '-annotate', '+710+67', 'ABUQITMIRLABS.TECH',

  // =========================================================================
  // EXACT REQUESTED COPY LINE 1: AI Engineering + Custom Software
  // =========================================================================
  '-font', 'DejaVu-Sans-Bold',
  '-pointsize', '44',
  '-fill', '#ffffff',
  '-annotate', '+378+156', 'AI Engineering',
  '-fill', '#ccff00',
  '-annotate', '+764+156', '+ Custom Software',

  // =========================================================================
  // EXACT REQUESTED COPY LINE 2: AI Agents • RAG Systems • SaaS • Web Platforms
  // =========================================================================
  '-font', 'JetBrains-Mono-Bold',
  '-pointsize', '24',
  '-fill', '#f4f4f5',
  '-annotate', '+408+233', 'AI Agents',
  '-fill', '#ccff00',
  '-annotate', '+572+233', '•',
  '-fill', '#f4f4f5',
  '-annotate', '+612+233', 'RAG Systems',
  '-fill', '#ccff00',
  '-annotate', '+806+233', '•',
  '-fill', '#f4f4f5',
  '-annotate', '+846+233', 'SaaS',
  '-fill', '#ccff00',
  '-annotate', '+936+233', '•',
  '-fill', '#f4f4f5',
  '-annotate', '+976+233', 'Web Platforms',

  // =========================================================================
  // EXACT REQUESTED COPY LINE 3: Build systems that are ready to scale.
  // =========================================================================
  '-font', 'DejaVu-Sans-Bold',
  '-pointsize', '29',
  '-fill', '#e4e4e7',
  '-annotate', '+430+321', 'Build systems that are',
  '-fill', '#ccff00',
  '-annotate', '+818+321', 'ready to scale.',

  // Right Node Labels
  '-font', 'JetBrains-Mono-Bold',
  '-pointsize', '10',
  '-fill', '#ccff00',
  '-annotate', '+1436+84', 'SCALE // 99.9%',

  '-pointsize', '12',
  '-fill', '#ccff00',
  '-annotate', '+1426+136', 'AI',

  '-pointsize', '10.5',
  '-fill', '#ffffff',
  '-annotate', '+1373+202', 'RAG',
  '-annotate', '+1470+202', 'SaaS',

  '-fill', '#ccff00',
  '-annotate', '+1423+268', 'WEB',

  '-pointsize', '10',
  '-fill', '#a1a1aa',
  '-annotate', '+1382+318', 'PRODUCTION-GRADE',

  '-quality', '100',
  pngFounderPath
];

execFileSync('convert', args, { stdio: 'inherit' });

fs.copyFileSync(pngFounderPath, pngFlatFounderPath);
fs.copyFileSync(pngFounderPath, pngPersonalPath);
fs.copyFileSync(pngFounderPath, pngFlatPersonalPath);

const stat = fs.statSync(pngFounderPath);
console.log(`✓ Generated crisp 1584x396 PNG (${stat.size} bytes) at:`, pngFounderPath);

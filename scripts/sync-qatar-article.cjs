const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  const rootDir = process.cwd();
  const qatarRaw = JSON.parse(fs.readFileSync('/tmp/qatar.json', 'utf8'));

  const slug = 'custom-software-development-qatar';
  const title = 'Custom Software Development Qatar: Data Protection Laws';
  const seoTitle = 'Custom Software Development Qatar | AbuQitmirLabs';
  const publishedAt = '2026-11-08';
  const author = 'Abu Qitmir Mohammad Shiraz Al-Madani';
  const category = 'Software';
  const excerpt =
    'Build compliant custom software in Qatar. Navigate Law No. 13 of 2016 (DPL), QFC regulations, QCB cloud mandates, and Doha cloud data residency in 2026.';
  const metaDescription =
    'Build compliant custom software in Qatar. Navigate Law No. 13 of 2016 (DPL), QFC regulations, QCB cloud mandates, and Doha cloud data residency in 2026.';
  const localCoverWebp = '/images/blog-covers/custom-software-development-qatar-06910d97.webp';
  const absCoverWebp = path.join(rootDir, 'public', localCoverWebp);

  // 1. Download and convert cover image to local WebP
  const remoteCoverUrl = qatarRaw.coverImage || 'https://i.postimg.cc/L5RsMkbN/Qatar-Custom-Software-Development-Guide.png';
  const tmpPng = '/tmp/qatar-cover.png';
  try {
    console.log('Downloading cover image:', remoteCoverUrl);
    execSync(`curl -sL --max-time 25 "${remoteCoverUrl}" -o "${tmpPng}"`);
    const stat = fs.statSync(tmpPng);
    if (stat.size > 1000) {
      execSync(`convert "${tmpPng}" -resize "1200x630^" -gravity center -extent 1200x630 -quality 84 "${absCoverWebp}"`);
      console.log('Converted remote cover to WebP:', absCoverWebp, fs.statSync(absCoverWebp).size, 'bytes');
    } else {
      throw new Error('Downloaded image too small');
    }
  } catch (err) {
    console.warn('Fallback cover generation triggered:', err.message);
    execSync(
      `convert -size 1200x630 xc:"#050505" ` +
        `-fill "#0a192f" -draw "circle 950,150 950,500" ` +
        `-fill "#ccff00" -pointsize 22 -annotate +80+120 "ABUQITMIRLABS // GCC COMPLIANCE ARCHITECTURE" ` +
        `-fill "#ffffff" -pointsize 52 -annotate +80+240 "Custom Software Development" ` +
        `-fill "#ffffff" -pointsize 52 -annotate +80+310 "Qatar: Data Protection Laws" ` +
        `-fill "#94a3b8" -pointsize 26 -annotate +80+400 "Law No. 13 of 2016 (DPL) • QFC • QCB Cloud • Doha Regions" ` +
        `-quality 85 "${absCoverWebp}"`
    );
  }

  // 2. Register in src/data/localCoverImageMap.ts
  const mapFilePath = path.join(rootDir, 'src', 'data', 'localCoverImageMap.ts');
  let mapContent = fs.readFileSync(mapFilePath, 'utf8');
  if (!mapContent.includes(`"${slug}":`)) {
    mapContent = mapContent.replace(
      'export const LOCAL_BLOG_COVER_BY_SLUG: Record<string, string> = {',
      `export const LOCAL_BLOG_COVER_BY_SLUG: Record<string, string> = {\n  "${slug}": "${localCoverWebp}",`
    );
  }
  if (!mapContent.includes(`"${remoteCoverUrl}":`)) {
    mapContent = mapContent.replace(
      'export const LOCAL_BLOG_COVER_MAP: Record<string, string> = {',
      `export const LOCAL_BLOG_COVER_MAP: Record<string, string> = {\n  "${remoteCoverUrl}": "${localCoverWebp}",`
    );
  }
  fs.writeFileSync(mapFilePath, mapContent, 'utf8');
  console.log('Updated src/data/localCoverImageMap.ts');

  // 3. Clean and enrich markdown content
  let md = String(qatarRaw.content || '').trim();

  // Promote opening ### Quick Takeaways to ## Quick Takeaways
  md = md.replace(/^###\s+Quick Takeaways/m, '## Quick Takeaways');

  // Ensure ## Frequently Asked Questions has an introductory paragraph immediately below it so no scraper drops the H2
  md = md.replace(
    /## Frequently Asked Questions\s*\n+### How much does custom software development cost in Qatar\?/,
    `## Frequently Asked Questions\n\nHere are clear, direct answers to the most common regulatory, architectural, and cost questions regarding custom software development and data protection compliance in Qatar:\n\n### How much does custom software development cost in Qatar?`
  );

  // Replace the ending Related guides + Sources and Further Reading section with low-link-density descriptive items
  const relatedStartIdx = md.indexOf('**Related guides:**');
  const enrichedFooterMd = `### Related Guides

Explore our related GCC engineering and compliance guides for building resilient enterprise platforms across the Middle East:

* [Custom Software Development Saudi Arabia: The Complete 2026 Enterprise Guide](/blog/custom-software-development-saudi-arabia) — Compare Qatar's DPL and NPC frameworks with Saudi Arabia's PDPL, NCA ECC-2, and ZATCA Phase 2 compliance mandates across the GCC.
* [Custom Software Development Dubai: Engineering Resilient Systems](/blog/custom-software-development-dubai) — Explore how regional cloud architecture, data residency, and cross-border API gateways work across Doha, Dubai, and Riyadh.
* [AI Automation for Regulated Industries: Compliance Architecture](/blog/ai-automation-compliance) — Learn how to deploy sovereign AI agents and automated audit trails without violating strict financial or healthcare data privacy laws.

---

### Sources and Further Reading

All statutory requirements, fines, and architectural specifications referenced in this guide are grounded in primary Qatari regulatory publications and international legal benchmarks:

* [National Cyber Security Agency (NCSA) Qatar — Official Regulatory Portal](https://ncsa.gov.qa) — Official guidelines, National Data Classification Policy documentation, and Law No. 13 of 2016 (DPL) 72-hour breach notification frameworks issued by the State of Qatar.
* [Qatar Central Bank (QCB) — Cloud Computing & FinTech Regulations](https://www.qcb.gov.qa) — Official circulars governing the June 2024 Cloud Computing Regulations, September 2024 AI Guidelines, and QPay / NAPS local payment switch integration.
* [Qatar Financial Centre (QFC) — Data Protection Office](https://www.qfc.qa) — Comprehensive regulatory documentation on the QFC Data Protection Regulations 2021, approved adequacy jurisdictions, and cross-border data transfer permits.
* [DLA Piper Data Protection Laws of the World — Qatar Overview](https://www.dlapiperdataprotection.com/index.html?t=law&c=QA) — Independent legal analysis comparing Qatar Law No. 13 of 2016 (Onshore DPL) with QFC Data Protection Regulations and European GDPR standards.`;

  if (relatedStartIdx !== -1) {
    md = md.slice(0, relatedStartIdx).trim() + '\n\n' + enrichedFooterMd + '\n';
  } else {
    md = md + '\n\n' + enrichedFooterMd + '\n';
  }

  // 4. Write content/blog/custom-software-development-qatar.md
  const frontmatterObj = {
    slug,
    title,
    seoTitle,
    excerpt,
    metaDescription,
    category,
    author,
    publishedAt,
    createdAt: publishedAt,
    coverImage: localCoverWebp,
    tags: [
      'Custom Software Development Qatar',
      'Qatar Data Protection Law',
      'QFC Data Protection',
      'QCB Cloud Regulations',
      'Doha Cloud Residency',
      'Enterprise Software Qatar',
    ],
  };
  const mdFileContent = `---\n${JSON.stringify(frontmatterObj, null, 2)}\n---\n\n${md}`;
  const mdFilePath = path.join(rootDir, 'content', 'blog', `${slug}.md`);
  fs.writeFileSync(mdFilePath, mdFileContent, 'utf8');
  console.log('Wrote content/blog/custom-software-development-qatar.md');

  // 5. Update src/data/staticBlogPosts.ts
  const staticPostsPath = path.join(rootDir, 'src', 'data', 'staticBlogPosts.ts');
  let staticPostsContent = fs.readFileSync(staticPostsPath, 'utf8');
  const postEntryObj = {
    slug,
    title,
    seoTitle,
    metaDescription,
    excerpt,
    content: md,
    coverImage: localCoverWebp,
    author,
    category,
    publishedAt,
    createdAt: publishedAt,
    tags: frontmatterObj.tags,
  };
  const postEntryCode = `  ${JSON.stringify(slug)}: ${JSON.stringify(postEntryObj, null, 2)},`;
  if (staticPostsContent.includes(`"${slug}":`)) {
    const startIdx = staticPostsContent.indexOf(`"${slug}":`);
    // Replace existing entry if already present
    console.log('Entry already in staticBlogPosts.ts, replacing...');
  } else {
    staticPostsContent = staticPostsContent.replace(
      'export const STATIC_BLOG_POSTS: Record<string, any> = {',
      `export const STATIC_BLOG_POSTS: Record<string, any> = {\n${postEntryCode}`
    );
    fs.writeFileSync(staticPostsPath, staticPostsContent, 'utf8');
    console.log('Added custom-software-development-qatar to src/data/staticBlogPosts.ts');
  }

  // 6. Update scripts/prerender.cjs to include '/blog/custom-software-development-qatar' in blogRoutes
  const prerenderPath = path.join(rootDir, 'scripts', 'prerender.cjs');
  let prerenderContent = fs.readFileSync(prerenderPath, 'utf8');
  if (!prerenderContent.includes(`'/blog/${slug}'`)) {
    prerenderContent = prerenderContent.replace(
      "const blogRoutes = [",
      `const blogRoutes = [\n  '/blog/${slug}',`
    );
    fs.writeFileSync(prerenderPath, prerenderContent, 'utf8');
    console.log('Added /blog/custom-software-development-qatar to scripts/prerender.cjs');
  }

  // 7. Update public/sitemap.xml and sitemap.xml
  const canonicalLoc = `https://www.abuqitmirlabs.tech/blog/${slug}`;
  for (const smRel of ['public/sitemap.xml', 'sitemap.xml']) {
    const smPath = path.join(rootDir, smRel);
    if (fs.existsSync(smPath)) {
      let smXml = fs.readFileSync(smPath, 'utf8');
      if (!smXml.includes(`<loc>${canonicalLoc}</loc>`)) {
        const newUrlEntry = `  <url>\n    <loc>${canonicalLoc}</loc>\n    <lastmod>${publishedAt}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`;
        smXml = smXml.replace('</urlset>', newUrlEntry);
        fs.writeFileSync(smPath, smXml, 'utf8');
        console.log(`Added ${canonicalLoc} to ${smRel}`);
      }
    }
  }

  // 8. Also update Firestore document so live queries have the exact cleaned markdown and local cover image
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(rootDir, 'firebase-applet-config.json'), 'utf8'));
    const docId = qatarRaw._docId || 'custom-software-development-qatar';
    const patchUrl = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/${cfg.firestoreDatabaseId}/documents/posts/${docId}?updateMask.fieldPaths=content&updateMask.fieldPaths=coverImage&updateMask.fieldPaths=publishedAt&key=${cfg.apiKey}`;
    const patchRes = await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          content: { stringValue: md },
          coverImage: { stringValue: localCoverWebp },
          publishedAt: { stringValue: publishedAt },
        },
      }),
    });
    console.log('Firestore PATCH status:', patchRes.status);
  } catch (e) {
    console.warn('Firestore PATCH warning:', e.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');

async function main() {
  const { db, collection, getDocs } = await import('../src/lib/firebase.ts');
  const { BLOG_SLUG_REDIRECTS } = await import('../src/data/canonicalRedirects.ts');

  const snap = await getDocs(collection(db, 'posts'));
  console.log(`Fetched ${snap.size} posts from Firestore.`);

  // Map canonical slug -> true YYYY-MM-DD date from Firestore
  const trueDates = new Map();

  for (const doc of snap.docs) {
    const data = doc.data();
    let slug = String(data.slug || doc.id).replace(/^\/+/, '').replace(/^blog\//, '');
    const canonicalSlug = BLOG_SLUG_REDIRECTS[slug] || slug;

    let ts = 0;
    if (data.createdAt && typeof data.createdAt.seconds === 'number') {
      ts = data.createdAt.seconds * 1000;
    } else if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      ts = data.createdAt.toDate().getTime();
    } else if (data.createdAt) {
      ts = new Date(data.createdAt).getTime() || 0;
    } else if (data.publishedAt) {
      ts = new Date(data.publishedAt).getTime() || 0;
    } else if (data.date) {
      ts = new Date(data.date).getTime() || 0;
    }

    if (ts > 0) {
      const isoDate = new Date(ts).toISOString().slice(0, 10);
      // Keep the most accurate date for canonicalSlug
      if (!trueDates.has(canonicalSlug)) {
        trueDates.set(canonicalSlug, isoDate);
      }
      if (!trueDates.has(slug)) {
        trueDates.set(slug, isoDate);
      }
    }
  }

  // Keep explicit curated dates for newest flagship posts if needed
  trueDates.set('brand-refresh-vs-rebrand', '2026-11-07');
  trueDates.set('offshore-ai-agent-development-partner-uae', '2026-11-06');
  trueDates.set('brand-audit-checklist-pakistan', '2026-11-05');
  trueDates.set('offshore-software-development-saudi-arabia', '2026-11-04');
  trueDates.set('build-brand-on-social-media', '2026-11-03');
  trueDates.set('soc-2-fintech-startups', '2026-11-02');
  trueDates.set('how-to-build-personal-brand-online', '2026-11-01');
  trueDates.set('ai-automation-compliance', '2026-10-31');
  trueDates.set('ai-automation-for-regulated-industries-abuqitmirlabs', '2026-10-31');
  trueDates.set('complete-brand-building-guide', '2026-10-30');
  trueDates.set('ecommerce-platform-development', '2026-10-29');
  trueDates.set('geo-content-writing', '2026-10-28');
  trueDates.set('startup-brand-identity-checklist', '2026-10-27');
  trueDates.set('ai-content-vs-human-content', '2026-10-26');
  trueDates.set('content-calendar-strategy', '2026-10-25');
  trueDates.set('brand-strategy-vs-logo-design-pakistan-sme', '2026-10-25');
  trueDates.set('small-business-branding-mistakes-pakistan', '2026-10-24');
  trueDates.set('content-brief-template', '2026-10-23');
  trueDates.set('seo-content-vs-thought-leadership', '2026-10-22');
  trueDates.set('how-to-brief-graphic-designer', '2026-10-21');
  trueDates.set('design-trends-2026', '2026-10-20');
  trueDates.set('ui-ux-design-conversion', '2026-10-20');
  trueDates.set('design-systems-for-startups', '2026-10-18');
  trueDates.set('brand-identity-vs-logo-design', '2026-10-17');
  trueDates.set('ai-is-quietly-stealing-your-ability-to-think', '2026-10-16');
  trueDates.set('measure-marketing-roi-without-tracking', '2026-10-13');
  trueDates.set('guest-posting-in-2026-what-works-abuqitmirlabs', '2026-10-12');
  trueDates.set('digital-marketing-stack-2026', '2026-10-11');
  trueDates.set('performance-marketing-vs-brand-marketing-a-budget-allocation-framework-for-startups', '2026-10-10');
  trueDates.set('the-non-technical-founders-guide-to-software-ownership-ip-2026', '2026-10-09');
  trueDates.set('5-minute-technical-audit-for-founders', '2026-10-08');
  trueDates.set('mvp-to-scale-a-non-technical-founders-roadmap-for-version-20-2026', '2026-10-08');

  // 1. Update src/data/staticBlogPosts.ts
  const staticPath = path.join(process.cwd(), 'src/data/staticBlogPosts.ts');
  let staticSrc = fs.readFileSync(staticPath, 'utf8');
  let staticUpdated = 0;

  staticSrc = staticSrc.replace(
    /STATIC_BLOG_POSTS\["([^"]+)"\]\s*=\s*\{([\s\S]*?)\n\};/g,
    (fullMatch, key, body) => {
      const canonicalKey = BLOG_SLUG_REDIRECTS[key] || key;
      const targetDate = trueDates.get(key) || trueDates.get(canonicalKey);
      if (!targetDate) return fullMatch;

      const updatedBody = body.replace(
        /"createdAt":\s*"([^"]+)"/,
        (m, oldDate) => {
          if (oldDate !== targetDate) {
            staticUpdated++;
            return `"createdAt": "${targetDate}"`;
          }
          return m;
        }
      );
      return `STATIC_BLOG_POSTS["${key}"] = {${updatedBody}\n};`;
    }
  );
  fs.writeFileSync(staticPath, staticSrc, 'utf8');
  console.log(`✓ Updated ${staticUpdated} article dates in src/data/staticBlogPosts.ts`);

  // 2. Update content/blog/*.md frontmatter publishedAt
  const mdDir = path.join(process.cwd(), 'content/blog');
  let mdUpdated = 0;
  if (fs.existsSync(mdDir)) {
    const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const canonicalSlug = BLOG_SLUG_REDIRECTS[slug] || slug;
      const targetDate = trueDates.get(slug) || trueDates.get(canonicalSlug);
      if (!targetDate) continue;

      const fullMdPath = path.join(mdDir, file);
      const mdContent = fs.readFileSync(fullMdPath, 'utf8');
      const updatedMd = mdContent.replace(
        /("publishedAt"\s*:\s*"|publishedAt:\s*["']?)(\d{4}-\d{2}-\d{2})(?:T[^"'\n]+)?(["']?)/m,
        (_, p1, oldDate, p3) => {
          if (oldDate !== targetDate) {
            mdUpdated++;
            return `${p1}${targetDate}${p3}`;
          }
          return _;
        }
      );
      if (updatedMd !== mdContent) {
        fs.writeFileSync(fullMdPath, updatedMd, 'utf8');
      }
    }
  }
  console.log(`✓ Updated ${mdUpdated} markdown frontmatter dates in content/blog/*.md`);

  // 3. Update src/data/seoRoutesMetadata.ts datePublished / publishedTime
  const seoRoutesPath = path.join(process.cwd(), 'src/data/seoRoutesMetadata.ts');
  let seoUpdated = 0;
  if (fs.existsSync(seoRoutesPath)) {
    let seoSrc = fs.readFileSync(seoRoutesPath, 'utf8');
    for (const [slug, targetDate] of trueDates.entries()) {
      const routePattern = new RegExp(`(["']/blog/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']\\s*:\\s*\\{[\\s\\S]*?\\n\\s*\\},)`, 'g');
      seoSrc = seoSrc.replace(routePattern, (block) => {
        return block.replace(
          /((?:publishedTime|"datePublished"|datePublished)\s*:\s*["'])(\d{4}-\d{2}-\d{2})(?:T[^"']+)?(["'])/g,
          (m, p1, oldVal, p3) => {
            if (oldVal !== targetDate) {
              seoUpdated++;
              return `${p1}${targetDate}${p3}`;
            }
            return m;
          }
        );
      });
    }
    fs.writeFileSync(seoRoutesPath, seoSrc, 'utf8');
  }
  console.log(`✓ Updated ${seoUpdated} route date entries in src/data/seoRoutesMetadata.ts`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

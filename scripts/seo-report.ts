/**
 * LAYER 3: Non-Blocking Build-Time SEO Report (`scripts/seo-report.ts`)
 *
 * Scans all blog articles (`content/blog/*.md` and `staticBlogPosts.ts`) and route metadata
 * at build time. Never fails the build (`process.exit(0)`), prints clear terminal warnings,
 * and saves a structured JSON report (`content/.seo-report.json`) plus the actionable
 * admin fix queue (`content/.fix-queue.json`).
 */

import fs from 'fs';
import path from 'path';
import {
  SeoFixQueueItem,
  countInternalLinksInContent,
  extractFirstHeading,
  generateMetaFromH1AndContent,
  isExternalImageUrl,
  parsePublishDateAndClampFuture,
} from '../lib/auto-fix-article';
import { SEO_ROUTES_METADATA } from '../src/data/seoRoutesMetadata';
import { STATIC_BLOG_POSTS } from '../src/data/staticBlogPosts';
import { BLOG_SLUG_REDIRECTS, getCanonicalSlug } from '../src/data/canonicalRedirects';
import { resolveOptimizedCoverImage } from '../src/data/localCoverImageMap';

export interface BuildTimeSeoReport {
  generatedAt: string;
  totalArticlesChecked: number;
  totalRoutesChecked: number;
  summary: {
    duplicateTitles: number;
    duplicateMetas: number;
    missingTitles: number;
    missingMetas: number;
    futurePublishDates: number;
    missingInternalLinks: number;
    leadingH1InContent: number;
    externalImages: number;
    totalWarnings: number;
  };
  warnings: SeoFixQueueItem[];
}

function parseMarkdownFile(filePath: string): Record<string, any> | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) {
      return { content: raw };
    }
    const fmRaw = fmMatch[1].trim();
    const body = fmMatch[2].trim();
    if (fmRaw.startsWith('{')) {
      const parsed = JSON.parse(fmRaw);
      return { ...parsed, content: body };
    }
    const meta: Record<string, any> = { content: body };
    for (const line of fmRaw.split(/\r?\n/)) {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const key = line.slice(0, idx).trim();
        const val = line
          .slice(idx + 1)
          .trim()
          .replace(/^["']|["']$/g, '');
        meta[key] = val;
      }
    }
    return meta;
  } catch {
    return null;
  }
}

export function generateSeoReport(): BuildTimeSeoReport {
  const nowIso = new Date().toISOString();
  const warnings: SeoFixQueueItem[] = [];
  const contentBlogDir = path.join(process.cwd(), 'content', 'blog');
  const fixQueuePath = path.join(process.cwd(), 'content', '.fix-queue.json');
  const reportPath = path.join(process.cwd(), 'content', '.seo-report.json');

  // Merge articles from STATIC_BLOG_POSTS and content/blog/*.md (canonical slugs only)
  const articlesBySlug = new Map<string, Record<string, any>>();

  for (const [slug, post] of Object.entries(STATIC_BLOG_POSTS)) {
    if (BLOG_SLUG_REDIRECTS[slug] && BLOG_SLUG_REDIRECTS[slug] !== slug) continue;
    const canonicalSlug = getCanonicalSlug(slug);
    articlesBySlug.set(canonicalSlug, { ...post, slug: canonicalSlug, source: 'staticBlogPosts' });
  }

  if (fs.existsSync(contentBlogDir)) {
    const files = fs.readdirSync(contentBlogDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const slugFromFile = file.replace(/\.md$/, '');
      if (BLOG_SLUG_REDIRECTS[slugFromFile] && BLOG_SLUG_REDIRECTS[slugFromFile] !== slugFromFile) {
        continue;
      }
      const canonicalSlug = getCanonicalSlug(slugFromFile);
      const parsed = parseMarkdownFile(path.join(contentBlogDir, file));
      if (parsed) {
        const prev = articlesBySlug.get(canonicalSlug) || {};
        const merged: Record<string, any> = { ...prev };
        for (const [k, v] of Object.entries(parsed)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            merged[k] = v;
          }
        }
        merged.slug = canonicalSlug;
        merged.source = `content/blog/${file}`;
        articlesBySlug.set(canonicalSlug, merged);
      }
    }
  }

  const titleToSlugs = new Map<string, string[]>();
  const metaToSlugs = new Map<string, string[]>();

  let missingTitles = 0;
  let missingMetas = 0;
  let futurePublishDates = 0;
  let missingInternalLinks = 0;
  let leadingH1InContent = 0;
  let externalImages = 0;

  for (const [slug, article] of articlesBySlug.entries()) {
    const rawTitle = String(article.title || '')
      .replace(/\s*\|\s*Abu\s*Qitmir\s*Labs.*$/i, '')
      .trim();
    const content = String(article.content || '').trim();
    const rawMeta = String(article.metaDescription || article.excerpt || '').trim();

    // 1. Check Missing Title
    if (!rawTitle) {
      missingTitles++;
      const proposedTitle = extractFirstHeading(content) || slug.replace(/-/g, ' ');
      warnings.push({
        id: `missing-title-${slug}`,
        slug,
        title: proposedTitle,
        type: 'missing_title',
        severity: 'warning',
        field: 'title',
        currentValue: '',
        proposedValue: proposedTitle,
        message: `Article "${slug}" is missing a title.`,
        suggestedFix: `Auto-set title to "${proposedTitle}"`,
        autoFixable: true,
        createdAt: nowIso,
      });
    } else {
      const normTitle = rawTitle.toLowerCase();
      const list = titleToSlugs.get(normTitle) || [];
      list.push(slug);
      titleToSlugs.set(normTitle, list);
    }

    // 2. Check Missing Meta Description
    if (!rawMeta || rawMeta.length < 40) {
      missingMetas++;
      const proposedMeta = generateMetaFromH1AndContent(rawTitle || slug, content);
      warnings.push({
        id: `missing-meta-${slug}`,
        slug,
        title: rawTitle || slug,
        type: 'missing_meta',
        severity: 'warning',
        field: 'metaDescription',
        currentValue: rawMeta,
        proposedValue: proposedMeta,
        message: `Article "${rawTitle || slug}" has a missing or too-short meta description (${rawMeta.length} chars).`,
        suggestedFix: `Auto-generate 155-char meta description from H1 & intro`,
        autoFixable: true,
        createdAt: nowIso,
      });
    } else {
      const normMeta = rawMeta.toLowerCase().slice(0, 155);
      const list = metaToSlugs.get(normMeta) || [];
      list.push(slug);
      metaToSlugs.set(normMeta, list);
    }

    // 3. Check Future Publish Date
    const dateInfo = parsePublishDateAndClampFuture(article.publishedAt || article.createdAt || article.date);
    if (dateInfo.wasFuture) {
      futurePublishDates++;
      warnings.push({
        id: `future-date-${slug}`,
        slug,
        title: rawTitle || slug,
        type: 'future_publish_date',
        severity: 'warning',
        field: 'publishedAt',
        currentValue: dateInfo.originalValue,
        proposedValue: dateInfo.dateIso,
        message: `Article "${rawTitle || slug}" has a future publish date (${dateInfo.originalValue}).`,
        suggestedFix: `Clamp publish date to today (${dateInfo.dateIso})`,
        autoFixable: true,
        createdAt: nowIso,
      });
    }

    // 4. Check Leading `# H1` in Content
    const nonEmptyLines = content
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && l !== '---');
    if (nonEmptyLines.length > 0 && /^#\s+/.test(nonEmptyLines[0])) {
      leadingH1InContent++;
      const h1Text = nonEmptyLines[0].replace(/^#\s+/, '').trim();
      warnings.push({
        id: `leading-h1-${slug}`,
        slug,
        title: rawTitle || slug,
        type: 'leading_h1_in_content',
        severity: 'info',
        field: 'content',
        currentValue: `# ${h1Text}`,
        proposedValue: `## ${h1Text}`,
        message: `Markdown body contains a "# H1" heading which duplicates the page <h1> title.`,
        suggestedFix: `Convert "# ${h1Text}" to "## ${h1Text}" in markdown file`,
        autoFixable: true,
        createdAt: nowIso,
      });
    }

    // 5. Check Missing Internal Links
    const internalLinkCount = countInternalLinksInContent(content);
    if (internalLinkCount === 0) {
      missingInternalLinks++;
      warnings.push({
        id: `missing-links-${slug}`,
        slug,
        title: rawTitle || slug,
        type: 'missing_internal_links',
        severity: 'warning',
        field: 'content',
        currentValue: '0 internal links',
        proposedValue: 'Inject 2 contextual internal links',
        message: `Article body has 0 internal links. Contextual internal links improve crawl depth and topical authority.`,
        suggestedFix: 'Auto-inject contextual internal links section before FAQs',
        autoFixable: true,
        createdAt: nowIso,
      });
    }

    // 6. Check External Cover Image
    const rawCover = String(article.coverImage || '').trim();
    const resolvedLocal = resolveOptimizedCoverImage(rawCover, slug);
    const hasLocalWebp = resolvedLocal.startsWith('/images/blog-covers/');
    if (isExternalImageUrl(rawCover) && !hasLocalWebp) {
      externalImages++;
      warnings.push({
        id: `external-image-${slug}`,
        slug,
        title: rawTitle || slug,
        type: 'external_image',
        severity: 'warning',
        field: 'coverImage',
        currentValue: rawCover,
        proposedValue: `/images/blog-covers/${slug}.webp`,
        message: `External cover image URL (${rawCover}) should be shifted to local WebP (/images/blog-covers/).`,
        suggestedFix: 'Optimize & shift external cover image to local WebP',
        autoFixable: true,
        createdAt: nowIso,
      });
    }
  }

  // 7. Check Duplicate Titles & Duplicate Meta Descriptions across articles & routes
  let duplicateTitles = 0;
  for (const [, slugs] of titleToSlugs.entries()) {
    if (slugs.length > 1) {
      duplicateTitles += slugs.length - 1;
      for (let i = 1; i < slugs.length; i++) {
        const dupSlug = slugs[i];
        const art = articlesBySlug.get(dupSlug);
        const currTitle = String(art?.title || dupSlug);
        const proposedTitle = `${currTitle} (${dupSlug.split('-').slice(0, 2).join(' ')})`;
        warnings.push({
          id: `dup-title-${dupSlug}`,
          slug: dupSlug,
          title: currTitle,
          type: 'duplicate_title',
          severity: 'warning',
          field: 'title',
          currentValue: currTitle,
          proposedValue: proposedTitle,
          message: `Duplicate title shared between "${slugs[0]}" and "${dupSlug}".`,
          suggestedFix: `Differentiate title for "${dupSlug}"`,
          autoFixable: true,
          createdAt: nowIso,
        });
      }
    }
  }

  let duplicateMetas = 0;
  for (const [, slugs] of metaToSlugs.entries()) {
    if (slugs.length > 1) {
      duplicateMetas += slugs.length - 1;
      for (let i = 1; i < slugs.length; i++) {
        const dupSlug = slugs[i];
        const art = articlesBySlug.get(dupSlug);
        const currTitle = String(art?.title || dupSlug);
        const proposedMeta = generateMetaFromH1AndContent(
          `${currTitle} (${dupSlug.replace(/-/g, ' ')})`,
          String(art?.content || '')
        );
        warnings.push({
          id: `dup-meta-${dupSlug}`,
          slug: dupSlug,
          title: currTitle,
          type: 'duplicate_meta',
          severity: 'warning',
          field: 'metaDescription',
          currentValue: String(art?.metaDescription || art?.excerpt || ''),
          proposedValue: proposedMeta,
          message: `Duplicate meta description shared between "${slugs[0]}" and "${dupSlug}".`,
          suggestedFix: `Auto-generate unique meta description for "${dupSlug}"`,
          autoFixable: true,
          createdAt: nowIso,
        });
      }
    }
  }

  const mergedWarningsMap = new Map<string, SeoFixQueueItem>();
  for (const w of warnings) {
    mergedWarningsMap.set(w.id, w);
  }

  const finalWarnings = Array.from(mergedWarningsMap.values());

  const report: BuildTimeSeoReport = {
    generatedAt: nowIso,
    totalArticlesChecked: articlesBySlug.size,
    totalRoutesChecked: Object.keys(SEO_ROUTES_METADATA).length,
    summary: {
      duplicateTitles,
      duplicateMetas,
      missingTitles,
      missingMetas,
      futurePublishDates,
      missingInternalLinks,
      leadingH1InContent,
      externalImages,
      totalWarnings: finalWarnings.length,
    },
    warnings: finalWarnings,
  };

  try {
    const contentDir = path.join(process.cwd(), 'content');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    fs.writeFileSync(fixQueuePath, JSON.stringify(finalWarnings, null, 2), 'utf-8');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  } catch (err) {
    console.warn('⚠️ [SEO Report] Could not write report files:', err);
  }

  return report;
}

// Run when invoked directly via `tsx scripts/seo-report.ts`
const isDirectExecution =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv.some((arg) => arg.includes('seo-report'));

if (isDirectExecution) {
  try {
    console.log('\n🛡️  [SEO Report - Layer 3] Running Non-Blocking Build-Time SEO Check...');
    const report = generateSeoReport();
    console.log(
      `   • Articles Checked : ${report.totalArticlesChecked}\n` +
        `   • Routes Checked   : ${report.totalRoutesChecked}\n` +
        `   • Pending Warnings : ${report.summary.totalWarnings}`
    );
    if (report.warnings.length > 0) {
      console.warn(
        `⚠️  [SEO Report] Found ${report.warnings.length} non-blocking SEO warning(s). Saved to content/.fix-queue.json and content/.seo-report.json.`
      );
      report.warnings.slice(0, 10).forEach((w) => {
        console.warn(`   - [${w.type}] (${w.slug}): ${w.message}`);
      });
    } else {
      console.log('✅ [SEO Report] Zero pending SEO warnings!');
    }
  } catch (err) {
    console.warn('⚠️  [SEO Report] Non-blocking warning during report generation:', err);
  }
  // Never fail the build!
  process.exit(0);
}

const fs = require('fs');
const path = require('path');

const staticPath = path.join(__dirname, '../src/data/staticBlogPosts.ts');
let code = fs.readFileSync(staticPath, 'utf8');
const fp = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_posts.json'), 'utf8'));

// Also check content/blog markdown files
const contentDir = path.join(__dirname, '../content/blog');
const mdFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
const mdImages = {};
for (const file of mdFiles) {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const m = content.match(/\"coverImage\":\s*\"([^\"]+)\"/);
  const altM = content.match(/\"coverImageAlt\":\s*\"([^\"]+)\"/);
  const slugM = content.match(/\"slug\":\s*\"([^\"]+)\"/);
  const fileSlug = file.replace(/\.md$/, '');
  const slug = (slugM && slugM[1]) || fileSlug;
  if (m && m[1]) {
    mdImages[slug] = {
      coverImage: m[1],
      coverImageAlt: altM ? altM[1] : undefined
    };
  }
}

let updated = 0;

// Update using firestore_posts.json first
for (const [docId, p] of Object.entries(fp)) {
  const slug = p.slug || docId;
  const targetCover = p.coverImage;
  if (!targetCover) continue;

  const needle = 'STATIC_BLOG_POSTS["' + slug + '"] = {';
  const startIdx = code.indexOf(needle);
  if (startIdx !== -1) {
    const endIdx = code.indexOf('};', startIdx);
    if (endIdx !== -1) {
      let block = code.substring(startIdx, endIdx + 2);
      const imgMatch = block.match(/"coverImage":\s*"([^"]+)"/);
      if (imgMatch && imgMatch[1] !== targetCover) {
        block = block.replace(/"coverImage":\s*"[^"]+"/, `"coverImage": "${targetCover}"`);
        if (p.coverImageAlt) {
          block = block.replace(/"coverImageAlt":\s*"[^"]+"/, `"coverImageAlt": ${JSON.stringify(p.coverImageAlt)}`);
        }
        code = code.substring(0, startIdx) + block + code.substring(endIdx + 2);
        updated++;
        console.log(`Updated [${slug}]: ${imgMatch[1]} -> ${targetCover}`);
      }
    }
  }
}

// Update using content/blog if firestore didn't have it
for (const [slug, meta] of Object.entries(mdImages)) {
  const needle = 'STATIC_BLOG_POSTS["' + slug + '"] = {';
  const startIdx = code.indexOf(needle);
  if (startIdx !== -1) {
    const endIdx = code.indexOf('};', startIdx);
    if (endIdx !== -1) {
      let block = code.substring(startIdx, endIdx + 2);
      const imgMatch = block.match(/"coverImage":\s*"([^"]+)"/);
      if (imgMatch && (imgMatch[1].includes('logo.png') || imgMatch[1] !== meta.coverImage)) {
        block = block.replace(/"coverImage":\s*"[^"]+"/, `"coverImage": "${meta.coverImage}"`);
        if (meta.coverImageAlt) {
          block = block.replace(/"coverImageAlt":\s*"[^"]+"/, `"coverImageAlt": ${JSON.stringify(meta.coverImageAlt)}`);
        }
        code = code.substring(0, startIdx) + block + code.substring(endIdx + 2);
        updated++;
        console.log(`Updated from MD [${slug}]: ${imgMatch[1]} -> ${meta.coverImage}`);
      }
    }
  }
}

fs.writeFileSync(staticPath, code, 'utf8');
console.log(`Successfully updated ${updated} blog post cover images with true user photos.`);

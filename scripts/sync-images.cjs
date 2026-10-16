const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const rootDir = path.resolve(__dirname, '..');
const configPath = path.join(rootDir, 'firebase-applet-config.json');
const staticPostsPath = path.join(rootDir, 'src', 'data', 'staticBlogPosts.ts');
const seoMetaPath = path.join(rootDir, 'src', 'data', 'seoRoutesMetadata.ts');

if (!fs.existsSync(configPath)) {
  console.error('firebase-applet-config.json not found');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function syncImages() {
  console.log('Fetching all published posts from Firestore to synchronize cover images...');
  const snap = await getDocs(collection(db, 'posts'));
  let ts = fs.readFileSync(staticPostsPath, 'utf8');
  let seo = fs.readFileSync(seoMetaPath, 'utf8');
  let updatedCount = 0;

  snap.forEach(docSnap => {
    const post = docSnap.data();
    const slug = post.slug;
    const cover = post.coverImage || post.imageUrl || post.featuredImage || post.image;
    if (slug && cover && typeof cover === 'string' && cover.trim().startsWith('http')) {
      const cleanCover = cover.trim();
      const needle = 'STATIC_BLOG_POSTS["' + slug + '"]';
      const idx = ts.indexOf(needle);
      if (idx !== -1) {
        const nextIdx = ts.indexOf('STATIC_BLOG_POSTS[', idx + needle.length);
        const endSearch = nextIdx !== -1 ? nextIdx : idx + 4000;
        const chunk = ts.slice(idx, endSearch);
        const m = chunk.match(/"coverImage":\s*"([^"]+)"/);
        if (m && m[1] !== cleanCover) {
          console.log(`✓ Synchronizing [${slug}]:`);
          console.log(`   Old: ${m[1]}`);
          console.log(`   New: ${cleanCover}`);
          const newChunk = chunk.replace(m[0], `"coverImage": "${cleanCover}"`);
          ts = ts.slice(0, idx) + newChunk + ts.slice(endSearch);
          updatedCount++;
        }
      }

      // Also update in seoRoutesMetadata.ts
      const seoNeedle = "'/blog/" + slug + "':";
      const sIdx = seo.indexOf(seoNeedle);
      if (sIdx !== -1) {
        const sNextIdx = seo.indexOf("'/blog/", sIdx + seoNeedle.length);
        const sEnd = sNextIdx !== -1 ? sNextIdx : sIdx + 2000;
        const sChunk = seo.slice(sIdx, sEnd);
        const ogm = sChunk.match(/ogImage:\s*'([^']+)'/);
        if (ogm && ogm[1] !== cleanCover) {
          const newSChunk = sChunk
            .replace(/ogImage:\s*'[^']+'/, `ogImage: '${cleanCover}'`)
            .replace(/twitterImage:\s*'[^']+'/, `twitterImage: '${cleanCover}'`);
          seo = seo.slice(0, sIdx) + newSChunk + seo.slice(sEnd);
        }
      }
    }
  });

  fs.writeFileSync(staticPostsPath, ts, 'utf8');
  fs.writeFileSync(seoMetaPath, seo, 'utf8');
  console.log(`✨ Successfully synchronized ${updatedCount} blog post images!`);
}

syncImages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
  });

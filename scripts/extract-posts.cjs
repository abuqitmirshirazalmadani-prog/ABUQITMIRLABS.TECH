const fs = require('fs');
const path = require('path');

const bak = fs.readFileSync(path.join(__dirname, '../src/pages/BlogPostPage.tsx.bak'), 'utf8');

// Find all occurrences of "if (slug === " or "if (slug"
const lines = bak.split('\n');
const posts = [];

let currentPost = null;
let collectingContent = false;
let contentLines = [];

for (let i = 0; i < 1200; i++) {
  const line = lines[i];
  if (line.trim().startsWith('if (slug') && (line.includes('===') || line.includes('includes'))) {
    if (currentPost) {
      currentPost.content = contentLines.join('\n');
      posts.push(currentPost);
    }
    
    // Extract slugs
    const slugMatches = [...line.matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]).filter(s => s !== 'slug');
    
    currentPost = {
      slugs: slugMatches,
      title: '',
      coverImage: 'https://www.abuqitmirlabs.tech/logo.png',
      category: 'Engineering',
      createdAt: '2026-07-26',
      author: 'AbuQitmirLabs'
    };
    collectingContent = false;
    contentLines = [];
  } else if (currentPost) {
    if (line.includes('title:')) {
      const m = line.match(/title:\s*"([^"]+)"/);
      if (m) currentPost.title = m[1];
    } else if (line.includes('coverImage:')) {
      const m = line.match(/coverImage:\s*"([^"]+)"/);
      if (m) currentPost.coverImage = m[1];
    } else if (line.includes('category:')) {
      const m = line.match(/category:\s*"([^"]+)"/);
      if (m) currentPost.category = m[1];
    } else if (line.includes('createdAt:')) {
      const m = line.match(/createdAt:\s*"([^"]+)"/);
      if (m) currentPost.createdAt = m[1];
    } else if (line.includes('author:')) {
      const m = line.match(/author:\s*"([^"]+)"/);
      if (m) currentPost.author = m[1];
    } else if (line.includes('content: ragAiBlogContent')) {
      currentPost.isRag = true;
    } else if (line.includes('content: `')) {
      collectingContent = true;
      contentLines.push(line.substring(line.indexOf('content: `') + 10));
    } else if (collectingContent) {
      if (line.includes('`,') || line.trim() === '`') {
        collectingContent = false;
        if (line.includes('`,')) {
          contentLines.push(line.substring(0, line.indexOf('`,')));
        }
      } else {
        contentLines.push(line);
      }
    }
  }
}

if (currentPost) {
  currentPost.content = contentLines.join('\n');
  posts.push(currentPost);
}

console.log('Successfully found', posts.length, 'posts');

let code = `import { ragAiBlogContent } from '../utils/ragAiBlogStaticData';

export interface StaticBlogPost {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  createdAt: any;
  updatedAt?: any;
  author: string;
  tags?: string[];
}

export const STATIC_BLOG_POSTS: Record<string, StaticBlogPost> = {
`;

for (const p of posts) {
  for (const slug of p.slugs) {
    const contentExpr = p.isRag ? 'ragAiBlogContent' : JSON.stringify(p.content || `# ${p.title}\n\nFull article content available.`);
    code += `  '${slug}': {
    title: ${JSON.stringify(p.title)},
    content: ${contentExpr},
    coverImage: ${JSON.stringify(p.coverImage)},
    coverImageAlt: ${JSON.stringify(p.title + ' | AbuQitmirLabs')},
    category: ${JSON.stringify(p.category)},
    createdAt: ${JSON.stringify(p.createdAt)},
    author: ${JSON.stringify(p.author)},
    tags: [${JSON.stringify(p.category)}, 'Software Engineering', 'AI Architecture']
  },
`;
  }
}

code += `};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/staticBlogPosts.ts'), code, 'utf8');
console.log('Saved to src/data/staticBlogPosts.ts');

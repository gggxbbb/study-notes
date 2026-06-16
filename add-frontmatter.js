const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'src', 'content', 'docs');

function addFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 如果已经有 frontmatter，跳过
  if (content.trim().startsWith('---')) {
    return;
  }
  
  // 提取第一个 h1 作为 title
  const h1Match = content.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : path.basename(filePath, '.md');
  
  const frontmatter = `---\ntitle: ${title}\n---\n\n`;
  fs.writeFileSync(filePath, frontmatter + content, 'utf-8');
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith('.md')) {
      addFrontmatter(fullPath);
    }
  }
}

walk(docsDir);
console.log('Frontmatter added to all markdown files.');

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CAPITULOS_DIR = path.join(__dirname, '../content/capitulos');
const OUTPUT_DIR = path.join(__dirname, '../public/downloads');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'livro-pog-combined.md');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Recursively read all markdown files from capitulos
function getChapters(dir = CAPITULOS_DIR) {
  const chapters = [];

  function readDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively read subdirectories
        readDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Only include chapters with status 'done'
        if (data.status === 'done') {
          chapters.push({
            order: data.order_number || 9999,
            title: data.title || 'Sem título',
            content: content.trim(),
            filename: item,
            path: fullPath.replace(CAPITULOS_DIR, '').substring(1)
          });
        }
      }
    });
  }

  readDirectory(dir);

  // Sort by order_number
  chapters.sort((a, b) => a.order - b.order);

  return chapters;
}

// Fix image paths for Pandoc (relative to public/)
function fixImagePaths(content) {
  // Convert /images/... to ./images/... for Pandoc
  return content.replace(/!\[([^\]]*)\]\(\/images\//g, '![$1](./images/');
}

// Generate combined markdown
function generateCombinedMarkdown() {
  const chapters = getChapters();
  let combinedContent = '';

  // Add title page
  combinedContent += '---\n';
  combinedContent += 'title: Programação Orientada a Gambiarra\n';
  combinedContent += 'author: Josenaldo Matos Filho\n';
  combinedContent += 'lang: pt-BR\n';
  combinedContent += '---\n\n';

  // Add each chapter
  chapters.forEach((chapter, index) => {
    console.log(`Adding chapter ${index + 1}/${chapters.length}: ${chapter.title} (${chapter.path})`);
    
    combinedContent += `# ${chapter.title}\n\n`;
    combinedContent += fixImagePaths(chapter.content);
    combinedContent += '\n\n';
    
    // Add page break for PDF
    if (index < chapters.length - 1) {
      combinedContent += '\\newpage\n\n';
    }
  });

  // Write combined file
  fs.writeFileSync(OUTPUT_FILE, combinedContent, 'utf-8');
  console.log(`\nGenerated combined markdown: ${OUTPUT_FILE}`);
  console.log(`Total chapters: ${chapters.length}`);
}

// Run
try {
  generateCombinedMarkdown();
  process.exit(0);
} catch (error) {
  console.error('Error generating eBook:', error);
  process.exit(1);
}

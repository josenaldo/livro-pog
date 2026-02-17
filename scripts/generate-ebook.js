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

// Fix image paths for Pandoc
// Images are in public/images/, markdown is in public/downloads/
// So from downloads/livro-pog-combined.md, images are at ../images/
function fixImagePaths(content) {
  // Convert /images/... to ../images/... (relative path from downloads/ to images/)
  return content.replace(/!\[([^\]]*)\]\(\/images\//g, '![$1](../images/');
}

// Extract references from content (without removing)
function extractReferences(content) {
  // Match from "## Referências" to the next "##" (not "###") or "[^" or end
  const referencesMatch = content.match(/## Referências\s*\n([\s\S]*?)(?=\n## [^#]|\n\[^[^\]]|$)/);
  if (referencesMatch && referencesMatch[1].trim()) {
    // Clean up the references section
    return referencesMatch[1].trim().replace(/^---+\s*$/gm, ''); // Remove horizontal rules
  }
  return null;
}

// Generate combined markdown
function generateCombinedMarkdown() {
  const chapters = getChapters();
  let combinedContent = '';
  const allReferences = [];

  // Add title page with metadata
  combinedContent += '---\n';
  combinedContent += 'title: Programação Orientada a Gambiarra\n';
  combinedContent += 'subtitle: Um Guia Definitivo sobre a Arte da Gambiarra no Desenvolvimento de Software\n';
  combinedContent += 'author: Josenaldo Matos Filho\n';
  combinedContent += 'date: 2024\n';
  combinedContent += 'lang: pt-BR\n';
  combinedContent += 'rights: © 2024 Josenaldo Matos Filho. Licenciado sob CC BY-NC-SA 4.0\n';
  combinedContent += 'description: |\n';
  combinedContent += '  Um livro satírico sobre as gambiarras no desenvolvimento de software,\n';
  combinedContent += '  explorando técnicas, princípios e padrões da POGramação.\n';
  combinedContent += 'keywords: [programação, gambiarra, humor técnico, padrões de projeto, desenvolvimento de software]\n';
  combinedContent += 'publisher: Auto-publicado\n';
  combinedContent += '---\n\n';

  // Add each chapter
  chapters.forEach((chapter, index) => {
    console.log(`Adding chapter ${index + 1}/${chapters.length}: ${chapter.title} (${chapter.path})`);
    
    let chapterContent = chapter.content;
    
    // Extract and collect references (keep them in chapter)
    const references = extractReferences(chapterContent);
    if (references) {
      allReferences.push({
        chapter: chapter.title,
        references: references
      });
    }
    
    combinedContent += `# ${chapter.title}\n\n`;
    combinedContent += fixImagePaths(chapterContent);
    combinedContent += '\n\n';
    
    // Add page break for PDF
    if (index < chapters.length - 1) {
      combinedContent += '\\newpage\n\n';
    }
  });

  // Add consolidated references at the end if any exist
  if (allReferences.length > 0) {
    combinedContent += '\\newpage\n\n';
    combinedContent += '# Bibliografia Consolidada\n\n';
    combinedContent += 'Esta seção consolida todas as referências citadas ao longo do livro, organizadas por capítulo.\n\n';
    
    allReferences.forEach(ref => {
      combinedContent += `## ${ref.chapter}\n\n`;
      combinedContent += ref.references;
      combinedContent += '\n\n';
    });
  }

  // Write combined file
  fs.writeFileSync(OUTPUT_FILE, combinedContent, 'utf-8');
  console.log(`\nGenerated combined markdown: ${OUTPUT_FILE}`);
  console.log(`Total chapters: ${chapters.length}`);
  console.log(`References consolidated: ${allReferences.length} chapters`);
}

// Run
try {
  generateCombinedMarkdown();
  process.exit(0);
} catch (error) {
  console.error('Error generating eBook:', error);
  process.exit(1);
}

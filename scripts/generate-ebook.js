const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CAPITULOS_DIR = path.join(__dirname, '../content/capitulos');
const STRUCTURE_FILE = path.join(__dirname, '../estrutura-livro.txt');
const SOURCE_BIB_FILE = path.join(__dirname, '../_bibliography/library.bib');
const OUTPUT_DIR = path.join(__dirname, '../public/downloads');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'livro-pog-combined.md');
const OUTPUT_BIB_FILE = path.join(OUTPUT_DIR, 'livro-pog.bib');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load all chapters from disk into a map keyed by relative path
function loadAllChapters() {
    const map = {};

    function readDir(dir) {
        fs.readdirSync(dir).forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                readDir(fullPath);
            } else if (item.endsWith('.md')) {
                const relPath = fullPath.replace(CAPITULOS_DIR + path.sep, '').replace(/\\/g, '/');
                const { data, content } = matter(fs.readFileSync(fullPath, 'utf-8'));
                if (data.status === 'done') {
                    map[relPath] = { ...data, content: content.trim(), path: relPath };
                }
            }
        });
    }

    readDir(CAPITULOS_DIR);
    return map;
}

// Parse estrutura-livro.txt → ordered list of parts and chapters
function parseStructure() {
    const lines = fs.readFileSync(STRUCTURE_FILE, 'utf-8').split('\n');
    const items = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // PARTE: Título da Parte
        const parteMatch = trimmed.match(/^PARTE:\s*(.+)$/);
        if (parteMatch) {
            items.push({ type: 'part', title: parteMatch[1].trim() });
            continue;
        }

        // CAP  arquivo.md  |  order  |  Título
        // SUB  pasta/arquivo.md  |  order  |  Título
        const entryMatch = trimmed.match(/^(CAP|SUB)\s+(\S+)\s*\|\s*(\d+)\s*\|\s*(.+)$/);
        if (entryMatch) {
            const [, kind, file, order, title] = entryMatch;
            items.push({
                type: kind === 'CAP' ? 'chapter' : 'subchapter',
                file: file.trim(),
                order: parseInt(order, 10),
                title: title.trim(),
            });
        }
    }

    return items;
}

// Shift all markdown headings down by `levels`, skipping fenced code blocks
function shiftHeadings(content, levels) {
    const parts = content.split(/(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~)/m);
    return parts.map((part, i) => {
        if (i % 2 === 1) return part; // inside code block — leave untouched
        return part.replace(/^(#{1,6}) /gm, (_, hashes) => {
            return '#'.repeat(Math.min(hashes.length + levels, 6)) + ' ';
        });
    }).join('');
}

// Fix image paths for Pandoc (content is in downloads/, images are in images/)
function fixImagePaths(content) {
    return content.replace(/!\[([^\]]*)\]\(\/images\//g, '![$1](../images/');
}

// Normalize image alt text used as figure captions in Pandoc.
// This repo sometimes embeds metadata in the alt text like:
// ![Title {803x403} {caption: Real caption}](...)
// For PDF/LaTeX we want only: "Real caption" (Pandoc will add "Figura X.Y:" automatically).
function normalizeImageCaptions(content) {
    const parts = content.split(/(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~)/m);

    return parts
        .map((part, i) => {
            if (i % 2 === 1) return part; // inside code block — leave untouched

            return part.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, (match, alt, url) => {
                const captionMatch = alt.match(/\{\s*caption\s*:\s*([^}]+)\}/i);
                let normalizedAlt = alt;

                if (captionMatch) {
                    normalizedAlt = captionMatch[1].trim();
                }

                // Strip any remaining "{...}" tokens used as image metadata (sizes, etc.)
                normalizedAlt = normalizedAlt
                    .replace(/\{[^}]*\}/g, ' ')
                    .replace(/\s{2,}/g, ' ')
                    .trim();

                return `![${normalizedAlt}](${url})`;
            });
        })
        .join('');
}

function extractBibKeys(bibtexSource) {
    const keys = [];
    const seen = new Set();
    const regex = /^@\w+\s*\{\s*([^,]+)\s*,/gm;
    let match;

    while ((match = regex.exec(bibtexSource)) !== null) {
        const key = (match[1] || '').trim();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        keys.push(key);
    }

    return keys;
}

function getBibliographyKeysForNocite() {
    if (!fs.existsSync(SOURCE_BIB_FILE)) {
        return [];
    }

    const source = fs.readFileSync(SOURCE_BIB_FILE, 'utf-8');
    return extractBibKeys(source);
}

// Normalize bibliography entry types for Pandoc 2.x + pandoc-citeproc
function generateSanitizedBibliography() {
    if (!fs.existsSync(SOURCE_BIB_FILE)) {
        console.warn(`WARNING: bibliography source not found: ${SOURCE_BIB_FILE}`);
        return;
    }

    const source = fs.readFileSync(SOURCE_BIB_FILE, 'utf-8');
    const normalized = source
        .replace(/@web_page\s*\{/gi, '@misc{')
        .replace(/@thesis\s*\{/gi, '@phdthesis{');

    fs.writeFileSync(OUTPUT_BIB_FILE, normalized, 'utf-8');
}

// Remove per-chapter references placeholders ("## Referências" + [^ref])
// The final bibliography is generated by Pandoc citeproc from .bib files.
function removeReferencesSection(content) {
    const lines = content.split('\n');
    const output = [];
    let skipping = false;

    for (const line of lines) {
        if (!skipping && /^##\s+Refer[eê]ncias\s*$/i.test(line.trim())) {
            skipping = true;
            continue;
        }

        if (skipping && /^#{1,2}\s+/.test(line)) {
            skipping = false;
        }

        if (!skipping) {
            output.push(line);
        }
    }

    return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// Remove an empty "## Notas" section (heading present but no content).
// This prevents Pandoc from rendering a dangling section title at the end of a chapter.
function removeEmptyNotasSection(content) {
    const lines = content.split('\n');
    const output = [];

    let inNotas = false;
    let notasBuffer = [];
    let notasHasContent = false;

    const flushNotas = () => {
        if (!inNotas) return;
        if (notasHasContent) {
            output.push(...notasBuffer);
        }
        inNotas = false;
        notasBuffer = [];
        notasHasContent = false;
    };

    for (const line of lines) {
        const trimmed = line.trim();

        if (!inNotas && /^##\s+Notas\s*$/i.test(trimmed)) {
            inNotas = true;
            notasBuffer.push(line);
            continue;
        }

        if (inNotas) {
            // End of section: next chapter/section heading
            if (/^#{1,2}\s+/.test(trimmed)) {
                flushNotas();
                output.push(line);
                continue;
            }

            notasBuffer.push(line);

            // Any non-empty, non-comment line counts as content
            if (trimmed && !/^<!--/.test(trimmed)) {
                notasHasContent = true;
            }

            continue;
        }

        output.push(line);
    }

    flushNotas();

    return output.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// Generate combined markdown
function generateCombinedMarkdown() {
    const chaptersMap = loadAllChapters();
    const structure = parseStructure();
    const bibKeys = getBibliographyKeysForNocite();

    let combined = '';

    // YAML front matter
    combined += '---\n';
    combined += 'title: Programação Orientada a Gambiarra\n';
    combined += 'subtitle: Um Guia Definitivo sobre a Arte da Gambiarra no Desenvolvimento de Software\n';
    combined += 'author: Josenaldo de Oliveira Matos Filho\n';
    combined += 'date: 2026\n';
    combined += 'lang: pt-BR\n';
    combined += 'rights: © 2026 Josenaldo de Oliveira Matos Filho. Licenciado sob CC BY-NC-SA 4.0\n';
    combined += 'description: |\n';
    combined += '  Um livro satírico sobre as gambiarras no desenvolvimento de software,\n';
    combined += '  explorando técnicas, princípios e padrões da POGramação.\n';
    combined += 'keywords: [programação, gambiarra, humor técnico, padrões de projeto, desenvolvimento de software]\n';
    combined += 'publisher: Auto-publicado\n';

    // Pandoc 2.9 + pandoc-citeproc only prints cited references by default.
    // We want the References section to always include the full library.
    if (bibKeys.length > 0) {
        combined += 'nocite: |\n';
        bibKeys.forEach(key => {
            combined += `  @${key}\n`;
        });
    }
    combined += '---\n\n';

    let chapIndex = 0;

    structure.forEach(item => {
        // ── PARTE ─────────────────────────────────────────────────────────────
        if (item.type === 'part') {
            // PDF: raw LaTeX \part{} — capa interna de parte (ignorado pelo EPUB)
            combined += '```{=latex}\n';
            combined += `\\part{${item.title}}\n`;
            combined += '```\n\n';
            // EPUB/HTML: página de parte semântica (ignorado pelo PDF)
            combined += '```{=html}\n';
            combined += `<section epub:type="part" class="part-page">\n`;
            combined += `<h1 class="part-title">${item.title}</h1>\n`;
            combined += `</section>\n`;
            combined += '```\n\n';
            return;
        }

        // ── CAPÍTULO ou SUB-CAPÍTULO ──────────────────────────────────────────
        const chapter = chaptersMap[item.file];
        if (!chapter) {
            console.warn(`WARNING: file not found in chapters map: ${item.file}`);
            return;
        }

        chapIndex++;
        console.log(`Adding ${item.type} ${chapIndex}: ${item.title} (${item.file})`);

        let content = fixImagePaths(chapter.content);

        // Remove chapter-level references placeholders for ebook output
        content = removeReferencesSection(content);

        // Drop empty end-of-chapter "Notas" sections
        content = removeEmptyNotasSection(content);

        // Use only the explicit {caption: ...} text for figure captions
        content = normalizeImageCaptions(content);

        if (item.type === 'subchapter') {
            // Level 3 (##  → \section). Shift body headings +1 so internal ## → ###
            combined += `## ${item.title}\n\n`;
            combined += shiftHeadings(content, 1);
        } else {
            // Level 2 (#  → \chapter). Body headings stay as-is (## → \section)
            combined += `# ${item.title}\n\n`;
            combined += content;
        }

        combined += '\n\n\\newpage\n\n';
    });

    fs.writeFileSync(OUTPUT_FILE, combined, 'utf-8');
    generateSanitizedBibliography();
    console.log(`\nGenerated combined markdown: ${OUTPUT_FILE}`);
    console.log(`Generated bibliography: ${OUTPUT_BIB_FILE}`);
    console.log(`Total items: ${chapIndex} chapters/subchapters`);
}

// Run
try {
    generateCombinedMarkdown();
    process.exit(0);
} catch (error) {
    console.error('Error generating eBook:', error);
    process.exit(1);
}

#!/usr/bin/env node

/**
 * Generate Static OG Images for Ebooks
 * 
 * This script generates static PNG images from icon definitions
 * for use in ebook builds where dynamic generation isn't available.
 * 
 * Usage: node scripts/generate-og-images.js
 */

const fs = require('fs')
const path = require('path')

// Para geração real de imagens, você precisará instalar:
// npm install canvas
// ou
// npm install @vercel/og

console.log('📸 OG Image Generation Script\n')
console.log('⚠️  This is a placeholder script.')
console.log('To generate actual images, you need to:')
console.log('  1. Install image generation library:')
console.log('     npm install canvas')
console.log('     OR')
console.log('     npm install @vercel/og satori')
console.log('  2. Implement image generation logic below')
console.log('  3. Run this script before building ebooks\n')

// Ler todos os arquivos de conteúdo e extrair ícones
function getAllContentIcons() {
    const icons = new Map()
    const contentDir = path.join(__dirname, '../content')
    
    function scanDirectory(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            
            if (entry.isDirectory()) {
                scanDirectory(fullPath)
            } else if (entry.name.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf8')
                const iconMatch = content.match(/^icon:\s*"([^"]+)"/m)
                
                if (iconMatch) {
                    const icon = iconMatch[1]
                    const titleMatch = content.match(/^title:\s*(.+)$/m)
                    const title = titleMatch ? titleMatch[1].trim() : 'Untitled'
                    
                    icons.set(entry.name, { icon, title, file: entry.name })
                }
            }
        }
    }
    
    scanDirectory(contentDir)
    return Array.from(icons.values())
}

// Função placeholder para gerar imagens
function generateImage(icon, title, outputPath) {
    console.log(`  Would generate: ${outputPath}`)
    console.log(`    Icon: ${icon}`)
    console.log(`    Title: ${title}\n`)
    
    // TODO: Implementar geração real com canvas ou @vercel/og
    // Exemplo com canvas:
    /*
    const { createCanvas, loadImage } = require('canvas')
    const canvas = createCanvas(1200, 630)
    const ctx = canvas.getContext('2d')
    
    // 1. Carregar base.png
    const baseImage = await loadImage('./public/images/base.png')
    ctx.drawImage(baseImage, 0, 0, 1200, 630)
    
    // 2. Renderizar ícone SVG
    // 3. Adicionar título (opcional)
    
    // 4. Salvar
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(outputPath, buffer)
    */
}

// Main
async function main() {
    const icons = getAllContentIcons()
    const outputDir = path.join(__dirname, '../public/images/generated')
    
    console.log(`Found ${icons.length} content files with icons\n`)
    
    // Criar diretório de saída
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Gerar imagem para cada conteúdo
    for (const { icon, title, file } of icons) {
        const outputFilename = file.replace('.md', '.png')
        const outputPath = path.join(outputDir, outputFilename)
        
        generateImage(icon, title, outputPath)
    }
    
    console.log('✅ Done! (Images would be generated with proper implementation)')
    console.log(`📁 Output directory: ${outputDir}`)
}

main().catch(console.error)

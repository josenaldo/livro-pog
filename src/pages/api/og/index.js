/**
 * OG Image Generation API
 * 
 * Generates Open Graph images dynamically using SVG.
 * Returns SVG images that can be displayed directly by browsers
 * and social media crawlers.
 * 
 * Usage: /api/og?icon=tabler/IconRun&title=Post Title
 */

import { createOGImageSVG } from '@pog/lib/iconRenderer'

export default async function handler(req, res) {
    try {
        const { 
            icon = 'tabler/IconBooks',
            title = ''
        } = req.query

        // Generate SVG
        const svg = createOGImageSVG(icon, title)
        
        // Set headers for SVG response
        res.setHeader('Content-Type', 'image/svg+xml')
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        
        // Send SVG
        res.status(200).send(svg)
        
    } catch (error) {
        console.error('Error generating OG image:', error)
        
        // Return error SVG
        const errorSVG = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1a1a2e"/>
  <text x="600" y="315" font-family="system-ui" font-size="40" fill="#ff6b6b" text-anchor="middle">
    Error generating image
  </text>
  <text x="600" y="360" font-family="system-ui" font-size="20" fill="#999" text-anchor="middle">
    ${error.message}
  </text>
</svg>`
        
        res.setHeader('Content-Type', 'image/svg+xml')
        res.status(500).send(errorSVG)
    }
}



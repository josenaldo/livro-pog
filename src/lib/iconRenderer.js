/**
 * Icon to SVG Renderer
 * 
 * Renders Tabler Icon components to SVG strings for OG image generation.
 */

import fs from 'fs'
import path from 'path'
import { renderToStaticMarkup } from 'react-dom/server'
import { getIcon } from './iconMapper'

// Cache the base64 image in memory to avoid repeated disk reads
let _baseImageCache = null
function getBaseImageDataUrl() {
    if (!_baseImageCache) {
        const filePath = path.join(process.cwd(), 'public', 'images', 'base.png')
        const buffer = fs.readFileSync(filePath)
        _baseImageCache = `data:image/png;base64,${buffer.toString('base64')}`
    }
    return _baseImageCache
}

/**
 * Render an icon to SVG string
 * @param {string} iconString - Icon identifier (e.g., "tabler/IconRun")
 * @param {number} size - Icon size in pixels
 * @param {number} strokeWidth - Stroke width
 * @param {string} color - Icon color
 * @returns {string|null} SVG string or null if icon not found
 */
export function renderIconToSVG(iconString, size = 200, strokeWidth = 1.5, color = '#1976d2') {
    const IconComponent = getIcon(iconString)
    
    if (!IconComponent) {
        return null
    }
    
    try {
        const svgString = renderToStaticMarkup(
            <IconComponent 
                size={size} 
                stroke={strokeWidth}
                color={color}
            />
        )
        
        return svgString
    } catch (error) {
        console.error(`Failed to render icon ${iconString}:`, error)
        return null
    }
}

/**
 * Create a complete OG image SVG with base image and icon overlay
 * @param {string} iconString - Icon identifier
 * @param {string} title - Optional title text
 * @returns {string} Complete SVG
 */
export function createOGImageSVG(iconString, title = '') {
    const width = 1200
    const height = 630
    const iconSize = 300
    const iconColor = 'rgba(255,255,255,0.85)'

    // Get icon SVG content (paths only, without the outer <svg> wrapper)
    const IconComponent = getIcon(iconString)
    let iconContent = null

    if (IconComponent) {
        try {
            const svgString = renderToStaticMarkup(
                <IconComponent size={iconSize} stroke={1.5} color={iconColor} />
            )
            // Extract only the inner paths, preserving all attributes
            iconContent = svgString
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>$/, '')
        } catch (e) {
            console.error(`Failed to render icon ${iconString}:`, e)
        }
    }

    // Icon position (centered)
    const iconX = (width - iconSize) / 2
    const iconY = (height - iconSize) / 2

    // Background: base.png embedded as base64 (works inside <img> tags)
    const baseImageDataUrl = getBaseImageDataUrl()

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background: base.png embedded as base64 -->
  <image href="${baseImageDataUrl}" width="${width}" height="${height}" x="0" y="0" preserveAspectRatio="xMidYMid slice"/>

  <!-- Dark overlay for contrast -->
  <rect width="${width}" height="${height}" fill="rgba(0,0,0,0.35)"/>

  <!-- Icon (centered, white with glow) -->
  ${iconContent ? `
  <g transform="translate(${iconX}, ${iconY})" filter="url(#glow)">
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24"
         fill="none"
         stroke="${iconColor}"
         stroke-width="1.5"
         stroke-linecap="round"
         stroke-linejoin="round">
      ${iconContent}
    </svg>
  </g>` : ''}

  <!-- Title bar -->
  ${title ? `
  <rect y="${height - 100}" width="${width}" height="100" fill="rgba(0,0,0,0.6)"/>
  <text
    x="${width / 2}"
    y="${height - 40}"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="42"
    font-weight="bold"
    fill="#ffffff"
    text-anchor="middle"
  >${escapeXML(title)}</text>` : ''}
</svg>`.trim()

    return svg
}

/**
 * Escape XML special characters
 */
function escapeXML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

export default { renderIconToSVG, createOGImageSVG }


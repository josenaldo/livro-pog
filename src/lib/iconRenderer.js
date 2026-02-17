/**
 * Icon to SVG Renderer
 * 
 * Renders Tabler Icon components to SVG strings for OG image generation.
 */

import { renderToStaticMarkup } from 'react-dom/server'
import { getIcon } from './iconMapper'

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
    const iconSize = 200
    
    // Get icon SVG
    const iconSVG = renderIconToSVG(iconString, iconSize, 1.5, '#1976d2')
    
    if (!iconSVG) {
        // Return a default SVG if icon not found
        return createDefaultSVG(width, height, title)
    }
    
    // Extract SVG content (remove outer <svg> tag)
    const iconContent = iconSVG
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>/, '')
    
    // Calculate icon position (centered)
    const iconX = (width - iconSize) / 2
    const iconY = (height - iconSize) / 2
    
    // Create complete SVG with background pattern
    const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
    </linearGradient>
    
    <!-- Grid pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <!-- Background gradient -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Grid overlay -->
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  
  <!-- Icon with glow effect -->
  <g transform="translate(${iconX}, ${iconY})">
    <g filter="url(#glow)">
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
        ${iconContent}
      </svg>
    </g>
  </g>
  
  <!-- Title (if provided) -->
  ${title ? `
  <g>
    <rect y="${height - 100}" width="${width}" height="100" fill="rgba(0,0,0,0.7)"/>
    <text 
      x="${width / 2}" 
      y="${height - 45}" 
      font-family="system-ui, -apple-system, sans-serif" 
      font-size="40" 
      font-weight="bold"
      fill="#ffffff" 
      text-anchor="middle"
    >${escapeXML(title)}</text>
  </g>
  ` : ''}
  
  <!-- Glow filter -->
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>`.trim()
    
    return svg
}

/**
 * Create a default SVG when icon is not found
 */
function createDefaultSVG(width, height, title) {
    return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#1a1a2e"/>
  <text 
    x="${width / 2}" 
    y="${height / 2}" 
    font-family="system-ui" 
    font-size="60" 
    fill="#666" 
    text-anchor="middle"
  >Icon not found</text>
  ${title ? `
  <text 
    x="${width / 2}" 
    y="${height / 2 + 60}" 
    font-family="system-ui" 
    font-size="30" 
    fill="#999" 
    text-anchor="middle"
  >${escapeXML(title)}</text>
  ` : ''}
</svg>`.trim()
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

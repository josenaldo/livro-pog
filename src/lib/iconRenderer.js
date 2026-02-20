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
        const filePath = path.join(process.cwd(), 'public', 'images', 'base.webp')
        const buffer = fs.readFileSync(filePath)
        _baseImageCache = `data:image/webp;base64,${buffer.toString('base64')}`
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
    const iconSize = 400
    const iconColor = 'rgba(255,255,255,0.8)'
    const titleFontFamily = 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif'

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

    // Background: base.webp embedded as base64 (works inside <img> tags)
    const baseImageDataUrl = getBaseImageDataUrl()

    const titleLayout = getTitleLayout(title, width)

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- drop-shadow equivalente ao CSS: drop-shadow(0px 4px 8px rgba(0,0,0,0.3)) -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="black" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background: base.webp embedded as base64 -->
  <image href="${baseImageDataUrl}" width="${width}" height="${height}" x="0" y="0" preserveAspectRatio="xMidYMid slice"/>

  <!-- Dark overlay for contrast -->
  <rect width="${width}" height="${height}" fill="rgba(0,0,0,0.35)"/>

  <!-- Icon (centered, white with glow) -->
  ${iconContent ? `
  <g transform="translate(${iconX}, ${iconY})" filter="url(#shadow)">
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
    ${titleLayout ? `
    <rect y="${titleLayout.barY}" width="${width}" height="${titleLayout.barHeight}" fill="rgba(0,0,0,0.62)"/>
    <text
        x="${width / 2}"
        y="${titleLayout.textY}"
        font-family="${titleFontFamily}"
        font-size="${titleLayout.fontSize}"
        font-weight="700"
        fill="#ffffff"
        text-anchor="middle"
        dominant-baseline="middle"
    >${titleLayout.tspans}</text>` : ''}
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

function normalizeTitle(title) {
    return String(title || '')
        .trim()
        .replace(/\s+/g, ' ')
}

function splitLongWord(word, maxChars) {
    if (word.length <= maxChars) return [word]
    const parts = []
    for (let i = 0; i < word.length; i += maxChars) {
        parts.push(word.slice(i, i + maxChars))
    }
    return parts
}

function wrapTextByWords(text, maxCharsPerLine, maxLines) {
    if (!text) return []

    const words = text.split(' ')
    const lines = []
    let current = ''

    for (const word of words) {
        const safeWords = splitLongWord(word, Math.max(8, maxCharsPerLine))
        for (const w of safeWords) {
            const next = current ? `${current} ${w}` : w
            if (next.length <= maxCharsPerLine) {
                current = next
                continue
            }

            if (current) lines.push(current)
            current = w

            if (lines.length >= maxLines) {
                return null
            }
        }
    }

    if (current) lines.push(current)
    if (lines.length > maxLines) return null
    return lines
}

function truncateLine(line, maxChars) {
    if (line.length <= maxChars) return line
    const clipped = line.slice(0, Math.max(0, maxChars - 1)).trimEnd()
    return `${clipped}…`
}

function getTitleLayout(title, width) {
    const clean = normalizeTitle(title)
    if (!clean) return null

    // Layout tuning
    const maxLines = 2
    const minFontSize = 28
    const maxFontSize = 48
    const paddingX = 72
    const paddingY = 18
    const availableWidth = width - paddingX * 2

    // Rough average width per character in Roboto Bold.
    const charWidthFactor = 0.58

    for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 2) {
        const maxCharsPerLine = Math.max(
            14,
            Math.floor(availableWidth / (fontSize * charWidthFactor))
        )

        const lines = wrapTextByWords(clean, maxCharsPerLine, maxLines)
        if (!lines) continue

        const lineHeight = Math.round(fontSize * 1.22)
        const barHeight = paddingY * 2 + lineHeight * lines.length
        const barY = 630 - barHeight
        const textY = barY + barHeight / 2

        const firstDy = lines.length === 1 ? 0 : -(lineHeight / 2)
        const tspans = lines
            .map((l, idx) => {
                const dy = idx === 0 ? firstDy : lineHeight
                return `<tspan x="${width / 2}" dy="${dy}">${escapeXML(l)}</tspan>`
            })
            .join('')

        return { fontSize, barHeight, barY, textY, tspans }
    }

    // Fallback: force 2 lines and truncate the last one.
    const fontSize = minFontSize
    const maxCharsPerLine = Math.max(14, Math.floor(availableWidth / (fontSize * charWidthFactor)))
    const roughLines = wrapTextByWords(clean, maxCharsPerLine, maxLines) || [clean]
    const lines = roughLines.slice(0, maxLines)
    if (lines.length === maxLines) {
        lines[maxLines - 1] = truncateLine(lines[maxLines - 1], maxCharsPerLine)
    }
    const lineHeight = Math.round(fontSize * 1.22)
    const barHeight = paddingY * 2 + lineHeight * lines.length
    const barY = 630 - barHeight
    const textY = barY + barHeight / 2
    const firstDy = lines.length === 1 ? 0 : -(lineHeight / 2)
    const tspans = lines
        .map((l, idx) => {
            const dy = idx === 0 ? firstDy : lineHeight
            return `<tspan x="${width / 2}" dy="${dy}">${escapeXML(l)}</tspan>`
        })
        .join('')

    return { fontSize, barHeight, barY, textY, tspans }
}



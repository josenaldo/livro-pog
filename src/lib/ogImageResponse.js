import { ImageResponse } from 'next/og'

import fs from 'fs'
import path from 'path'

import { getIcon } from './iconMapper'

const OG_WIDTH = 1200
const OG_HEIGHT = 630
const ICON_SIZE = 400
const ICON_STROKE = 1.5
const ICON_COLOR = 'rgba(255,255,255,0.9)'

let baseImageDataUrl = null

function getBaseImageDataUrl() {
    if (baseImageDataUrl) {
        return baseImageDataUrl
    }

    const filePath = path.join(process.cwd(), 'public', 'images', 'base.png')
    const buffer = fs.readFileSync(filePath)
    baseImageDataUrl = `data:image/png;base64,${buffer.toString('base64')}`
    return baseImageDataUrl
}

function toKebabCase(value) {
    return value.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

function escapeXML(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function serializeProps(props = {}) {
    const attrs = Object.entries(props)
        .filter(([key, value]) => {
            if (key === 'children' || key === 'dangerouslySetInnerHTML') {
                return false
            }
            return value !== undefined && value !== null && value !== false
        })
        .map(([key, value]) => {
            const attrName = key === 'className' ? 'class' : toKebabCase(key)
            if (value === true) {
                return attrName
            }
            return `${attrName}="${escapeXML(value)}"`
        })

    return attrs.join(' ')
}

function serializeElement(node) {
    if (!node || typeof node === 'boolean') {
        return ''
    }

    if (Array.isArray(node)) {
        return node.map(serializeElement).join('')
    }

    if (typeof node === 'string' || typeof node === 'number') {
        return escapeXML(node)
    }

    if (typeof node !== 'object' || !node.type) {
        return ''
    }

    if (typeof node.type !== 'string') {
        return serializeElement(node.props?.children)
    }

    const attrs = serializeProps(node.props)
    const children = serializeElement(node.props?.children)
    const openTag = attrs ? `<${node.type} ${attrs}>` : `<${node.type}>`
    return `${openTag}${children}</${node.type}>`
}

function renderIconChildren(iconKey) {
    const IconComponent = getIcon(iconKey)
    if (!IconComponent) {
        return ''
    }

    const renderFn =
        typeof IconComponent === 'function'
            ? IconComponent
            : IconComponent?.render

    if (!renderFn) {
        return ''
    }

    const svgElement = renderFn(
        {
            size: ICON_SIZE,
            stroke: ICON_STROKE,
            color: ICON_COLOR,
        },
        null
    )

    return serializeElement(svgElement?.props?.children)
}

function createIconDataUrl(iconKey) {
    const iconChildren = renderIconChildren(iconKey)
    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 24 24" fill="none" stroke="${ICON_COLOR}" stroke-width="${ICON_STROKE}" stroke-linecap="round" stroke-linejoin="round">${iconChildren || '<circle cx="12" cy="12" r="8"></circle>'}</svg>`
    return `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString('base64')}`
}

function createImageMarkup(iconKey) {
    const baseImageUrl = getBaseImageDataUrl()
    const iconDataUrl = createIconDataUrl(iconKey)

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#101010',
            }}
        >
            <img
                src={baseImageUrl}
                alt=""
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.32)',
                }}
            />
            <img
                src={iconDataUrl}
                alt=""
                width={ICON_SIZE}
                height={ICON_SIZE}
                style={{
                    position: 'relative',
                }}
            />
        </div>
    )
}

function createOgImageResponse(iconKey = 'tabler/IconBooks') {
    return new ImageResponse(createImageMarkup(iconKey), {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}

export { createOgImageResponse, OG_HEIGHT, OG_WIDTH }

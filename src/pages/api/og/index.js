/**
 * OG Image Generation API
 * 
 * For now, returns a simple redirect to static images or generates
 * a basic HTML response. Full image generation requires additional
 * setup with image processing libraries.
 * 
 * TODO: Implement full image generation using:
 * - @vercel/og (recommended for Vercel deployment)
 * - OR canvas (for self-hosted)
 * - OR satori + resvg (for static exports)
 * 
 * Usage: /api/og?icon=tabler/IconRun&title=Post Title
 */

import { getIcon } from '@pog/lib/iconMapper'

export default async function handler(req, res) {
    try {
        const { 
            icon = 'tabler/IconBooks',
            title = 'Livro POG'
        } = req.query

        // Verificar se o ícone existe
        const IconComponent = getIcon(icon)
        
        if (!IconComponent) {
            return res.status(404).json({ 
                error: 'Icon not found',
                icon 
            })
        }

        // Por enquanto, retorna JSON com informações
        // Em produção, isso geraria uma imagem PNG/JPEG
        res.status(200).json({
            message: 'OG Image generation endpoint',
            icon,
            title,
            width: 1200,
            height: 630,
            note: 'Full image generation requires @vercel/og or canvas setup'
        })
        
    } catch (error) {
        console.error('Error in OG image endpoint:', error)
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        })
    }
}


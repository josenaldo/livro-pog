import { Box } from '@mui/material'
import { getIcon } from '@pog/lib/iconMapper'

/**
 * ContentCover Component
 *
 * Renders an icon over the base background image.
 * Replaces static OG images with dynamic icon-based covers.
 *
 * @param {string} icon - Icon identifier (e.g., "tabler/IconRun")
 * @param {string} title - Title for accessibility
 * @param {string} aspectRatio - Aspect ratio (default: '16/9')
 * @param {number} iconSize - Icon size in pixels (default: 120)
 */
const ContentCover = ({
    icon,
    title,
    aspectRatio = '16/9',
    iconSize = 400
}) => {
    const IconComponent = getIcon(icon)

    // Se o ícone não existir, não renderiza nada
    if (!IconComponent) {
        console.warn(`Icon not found: ${icon}`)
        return null
    }

    return (
        <Box
            sx={{
                aspectRatio: aspectRatio,
                position: 'relative',
                width: '100%',
                backgroundImage: 'url(/images/base.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
            role="img"
            aria-label={title || 'Content cover'}
        >
            {/* Icon overlay */}
            <Box
                sx={{
                    color: 'white',
                    opacity: 0.9,
                    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))',
                }}
            >
                <IconComponent
                    size={iconSize}
                    stroke={1.5}
                    aria-hidden="true"
                />
            </Box>
        </Box>
    )
}

export { ContentCover }

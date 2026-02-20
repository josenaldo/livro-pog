import Image from 'next/image'

import { Box, CardMedia } from '@mui/material'

const DEFAULT_IMAGE = '/images/default.jpg'

const ContentMainImage = ({ image, alt, aspectRatio = '16/9', priority = false }) => {
    const contentImage = image || DEFAULT_IMAGE
    return (
        <CardMedia
            sx={{
                padding: 0,
                margin: 0,
            }}
        >
            {contentImage && (
                <Box
                    sx={{
                        aspectRatio: aspectRatio,
                        position: 'relative',
                    }}
                >
                    <Image
                        src={contentImage}
                        alt={alt}
                        fill
                        loading={priority ? 'eager' : 'lazy'}
                        style={{ objectFit: 'cover' }}
                        priority={priority}
                    />
                </Box>
            )}
        </CardMedia>
    )
}

export { ContentMainImage }

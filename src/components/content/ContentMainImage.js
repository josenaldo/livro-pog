import Image from 'next/image'
import { Box, CardMedia } from '@mui/material'
import { APP_IMAGE } from '@pog/config'

const ContentMainImage = ({ image, alt, aspectRatio = '16/9' }) => {
    const contentImage = image || APP_IMAGE
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
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </Box>
            )}
        </CardMedia>
    )
}

export { ContentMainImage }

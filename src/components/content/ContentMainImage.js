import Image from 'next/image'
import { Box, CardMedia } from '@mui/material'

const DEFAULT_IMAGE = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/default.jpg`,
    width: '1200px',
    height: '630px',
}

const ContentMainImage = ({ image, alt, aspectRatio = '16/9' }) => {
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
                        src={contentImage.url}
                        alt={alt}
                        // width={contentImage.width}
                        // height={contentImage.height}
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
            )}
        </CardMedia>
    )
}

export { ContentMainImage }

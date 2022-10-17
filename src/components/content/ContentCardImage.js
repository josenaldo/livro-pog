import Image from 'next/image'
import { Box } from '@mui/material'

const DEFAULT_IMAGE = `${process.env.NEXT_PUBLIC_SITE_URL}/images/default.jpg`

const ContentCardImage = ({ image, alt, aspectRatio = '16/9' }) => {
    const contentImage = image || DEFAULT_IMAGE
    return (
        <>
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
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
            )}
        </>
    )
}

export { ContentCardImage }

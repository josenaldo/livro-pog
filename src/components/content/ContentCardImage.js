import Image from 'next/image'
import { Box } from '@mui/material'
import { APP_IMAGE } from '@pog/config'

const ContentCardImage = ({ image, alt, aspectRatio = '16/9' }) => {
    const contentImage = image || APP_IMAGE
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

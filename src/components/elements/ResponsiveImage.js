import Image from 'next/image'

import { Box, Typography } from '@mui/material'

const ResponsiveImage = (props) => {
    const alt = props.alt?.replace(/ *\{[^)]*\} */g, '')
    const metaWidth = props.alt.match(/{([^}]+)x/)
    const metaHeight = props.alt.match(/x([^}]+)}/)
    const width = metaWidth ? metaWidth[1] : '1000'
    const height = metaHeight ? metaHeight[1] : '500'
    const isPriority = props.alt?.toLowerCase().includes('{priority}')
    const hasCaption = props.alt?.toLowerCase().includes('{caption:')
    const caption = props.alt?.match(/{caption: (.*?)}/)?.pop()

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: 'auto',
                    width: '90%',
                }}
            >
                <a href={props.src} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={props.src}
                        width={width}
                        height={height}
                        className="postImg"
                        alt={alt}
                        priority={isPriority}
                        layout="responsive"
                        loading="lazy"
                    />
                </a>
            </Box>
            {hasCaption && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        my: '5px',
                    }}
                >
                    <Typography variant="caption" textAlign="center">
                        {caption}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export { ResponsiveImage }

import { Typography, Box } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

const ContentQuote = ({ quote, author }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'neutral.light',
                borderRadius: 5,
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                }}
            >
                <FormatQuoteIcon />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="body1" textAlign="center">
                    {quote}
                </Typography>
                <Typography
                    variant="caption"
                    textAlign="center"
                    fontStyle="italic"
                    mt={1}
                >
                    {author}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                }}
            >
                <FormatQuoteIcon />
            </Box>
        </Box>
    )
}

export { ContentQuote }

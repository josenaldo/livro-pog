import { Typography, Box } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

const ContentQuote = ({ quote, author }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.quote',
                color: 'text.secondary',
                borderRadius: 5,
                padding: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                }}
            >
                <FormatQuoteIcon
                    fontSize="small"
                    sx={{ color: 'text.quote' }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'text.quote',
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
                <FormatQuoteIcon
                    fontSize="small"
                    sx={{ color: 'text.quote' }}
                />
            </Box>
        </Box>
    )
}

export { ContentQuote }

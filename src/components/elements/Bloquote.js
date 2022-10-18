import { Box, Typography } from '@mui/material'

const Bloquote = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                bgcolor: 'neutral.lighter',
                color: 'neutral.dark',
                py: 1,
                px: 3,
                borderRadius: 2,
                borderLeft: '5px solid',
                borderColor: 'secondary.light',
            }}
        >
            <Typography variant="overline" fontStyle="italic" fontWeight="bold">
                {children}
            </Typography>
        </Box>
    )
}

export { Bloquote }

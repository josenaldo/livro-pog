import { Box } from '@mui/material'

const Code = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'block',
                overflowX: 'auto',
                textWrap: 'none',
                bgcolor: 'background.paper',
                padding: '10px',
            }}
        >
            <Box
                component="pre"
                sx={{
                    padding: '10px',
                    margin: '0',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export { Code }

import { Box } from '@mui/material'

const Code = ({ children }) => {
    return (
        <Box
            className="remark-highlight"
            sx={{
                display: 'block',
                overflowX: 'auto',
                textWrap: 'none',
                bgcolor: 'background.paper',
                padding: '10px',
            }}
        >
            <pre>{children}</pre>
        </Box>
    )
}

export { Code }

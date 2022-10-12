import { Box, Chip } from '@mui/material'
import { format, parseISO } from 'date-fns'

const ContentMeta = ({ date, author, color = 'secondary' }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
            }}
        >
            <Chip
                color={color}
                size="small"
                label={format(parseISO(date), 'dd/MM/yyyy')}
            />
            <Chip color={color} size="small" label={author} />
        </Box>
    )
}

export { ContentMeta }

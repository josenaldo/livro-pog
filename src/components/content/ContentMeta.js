import { Box } from '@mui/material'

import { ContentAuthorAndDate } from '@pog/components/content/ContateAuthorAndDate'

const ContentMeta = ({ date, author }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
            }}
        >
            <ContentAuthorAndDate author={author} date={date} />

        </Box>
    )
}

export { ContentMeta }

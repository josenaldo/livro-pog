import { Stack, Typography } from '@mui/material'

const ContentTitle = ({ title, subtitle = '' }) => {
    return (
        <Stack alignItems="center">
            <Typography variant="h1" textAlign="center">
                {title}
            </Typography>
            <Typography variant="subtitle" textAlign="center">
                {subtitle}
            </Typography>
        </Stack>
    )
}

export { ContentTitle }

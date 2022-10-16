import { Stack, Typography } from '@mui/material'

const ContentTitle = ({
    title,
    subtitle = '',
    titleVariant = 'h1',
    subtitleVariant = 'subtitle',
}) => {
    return (
        <Stack alignItems="center">
            <Typography variant={titleVariant} textAlign="center">
                {title}
            </Typography>
            <Typography variant={subtitleVariant} textAlign="center">
                {subtitle}
            </Typography>
        </Stack>
    )
}

export { ContentTitle }

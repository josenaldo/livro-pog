import Link from 'next/link'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'

import { ContentCardImage } from '@pog/components/content'
import { ShareLink } from '@pog/components/share'
import { APP_URL } from '@pog/config'

const ContentCard = ({
    title,
    text,
    url,
    image,
    moreLinkText = 'Leia mais',
}) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'background.paper',
            }}
        >
            <CardActionArea
                component={Link}
                href={url}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'stretch',
                    height: '100%',
                    gap: 1,
                    '&, &:visited, &:hover, &:active': {
                        textDecoration: 'none',
                        color: 'inherit',
                    },
                    '& .MuiTypography-root': {
                        textDecoration: 'none',
                    },
                }}
            >
                <CardMedia
                    sx={{
                        position: 'relative',
                    }}
                >
                    <ContentCardImage image={image} alt={title} />
                </CardMedia>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        flexGrow: 1,
                    }}
                >
                    <Typography component="h3" variant="h4" color="primary">
                        {title}
                    </Typography>
                    <Typography
                        component="p"
                        variant="body2"
                        color="text.primary"
                    >
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-end',
                    p: 2,
                }}
            >
                <Button
                    component={Link}
                    href={url}
                    endIcon={<ArrowRightAltIcon />}
                >
                    {moreLinkText}
                </Button>
                <ShareLink
                    title={title}
                    description={text}
                    url={url}
                    image={`${APP_URL}${image}`}
                />
            </CardActions>
        </Card>
    )
}

export { ContentCard }

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from '@mui/material'

import { ContentAuthorAndDate } from '@pog/components/content/ContateAuthorAndDate'
import { ContentCardImage } from '@pog/components/content/ContentCardImage'
import { ContentCover } from '@pog/components/content/ContentCover'
import { ShareLink } from '@pog/components/share'
import { APP_URL } from '@pog/config'
import { formatDate } from '@pog/utils/DateUtils'

const ContentCard = ({
    title,
    text,
    url,
    image,
    icon,
    author,
    date,
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
                component="a"
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
                    {icon ? (
                        <ContentCover
                            icon={icon}
                            title={title}
                            iconSize={130}
                        />
                    ) : (
                        <ContentCardImage image={image} alt={title} />
                    )}
                </CardMedia>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        flexGrow: 1,
                    }}
                >
                    <Stack>
                        <ContentAuthorAndDate author={author} date={date} />

                        <Typography component="h3" variant="h5" color="primary">
                            {title}
                        </Typography>
                    </Stack>


                    <Typography
                        component="p"
                        variant="body2"
                        sx={{ color: 'text.primary' }}
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
                    component="a"
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

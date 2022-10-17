import Link from 'next/link'

import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    CardActionArea,
    Button,
} from '@mui/material'

import { ContentCardImage } from '@pog/components/content'
import { ShareLink } from '@pog/components/share'

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
            <Link href={url}>
                <CardActionArea
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'stretch',
                        height: '100%',
                        gap: 1,
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
                        <Typography component="p" variant="body2">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignSelf: 'flex-end',
                    p: 2,
                }}
            >
                <Link href={url}>
                    <Button component="a">{moreLinkText}</Button>
                </Link>
                <ShareLink
                    title={title}
                    description={text}
                    url={url}
                    image={`${process.env.NEXT_PUBLIC_SITE_URL}${image}`}
                />
            </CardActions>
        </Card>
    )
}

export { ContentCard }

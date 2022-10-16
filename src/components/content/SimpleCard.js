import NextLink from 'next/link'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    Typography,
    CardActionArea,
} from '@mui/material'

import { ContentMainImage } from '@pog/components/content'
import { Link } from '@pog/components/elements'

const SimpleCard = ({
    title,
    description,
    url,
    image,
    moreLinkText = 'Saiba mais...',
}) => {
    const contentImage = {
        url: image,
    }

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <NextLink href={url}>
                <CardActionArea
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'stretch',

                        height: '100%',
                    }}
                >
                    <ContentMainImage image={contentImage} alt={title} />
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            component="h3"
                            variant="h5"
                            textAlign="center"
                        >
                            {title}
                        </Typography>
                        <Typography component="p" variant="body1">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            alignSelf: 'flex-end',
                            pb: 2,
                        }}
                    >
                        <Link href={url} passHref>
                            <Typography component="a">
                                {moreLinkText}
                            </Typography>
                        </Link>
                    </CardActions>
                </CardActionArea>
            </NextLink>
        </Card>
    )
}

export { SimpleCard }

import React from 'react'
import Link from 'next/link'
import {
    Card,
    CardContent,
    Divider,
    Typography,
    CardActionArea,
} from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'

import {
    ContentMainImage,
    ContentMeta,
    ContentTitle,
    MDXContent,
} from '@pog/components/content'

const PostCard = ({ post }) => {
    return (
        <Card>
            <Link href={post.url}>
                <CardActionArea
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'stretch',

                        height: '100%',
                    }}
                >
                    <ContentMainImage image={post.image} alt={post.title} />

                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',

                            gap: 2,
                        }}
                    >
                        <ContentMeta date={post.date} author={post.author} />

                        <Typography variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    )
}

export { PostCard }

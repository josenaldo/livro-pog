import React from 'react'

import { Box, Card, Divider } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'

import {
    ContentMainImage,
    ContentMeta,
    ContentTitle,
    MDXContent,
} from '@pog/components/content'

const PostView = ({ post }) => {
    return (
        <Card
            sx={{
                my: 5,
                padding: 0,
            }}
        >
            <ContentMainImage image={post.image} alt={post.title} />

            <Grid
                container
                spacing={0}
                sx={{
                    alignContent: 'stretch',
                }}
            >
                <Grid xs={1}></Grid>
                <Grid
                    xs={10}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        pb: 5,
                    }}
                >
                    <ContentTitle
                        title={post.title}
                        subtitle={post.description}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ContentMeta date={post.date} author={post.author} />
                    </Box>
                    <Divider />

                    <MDXContent content={post.body.raw} />
                </Grid>
                <Grid xs={1}></Grid>
            </Grid>
        </Card>
    )
}

export { PostView }

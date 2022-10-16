import React from 'react'

import { Box, Container } from '@mui/material'

import { ContentTitle, SimpleCard } from '@pog/components/content'

import { getSortedPosts } from '@pog/data'
const LastNews = () => {
    const posts = getSortedPosts().slice(0, 3)
    return (
        <Box
            sx={{
                backgroundColor: 'neutral.dark',
                width: '100%',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 5,
                    gap: 5,
                }}
            >
                <ContentTitle title="Últimas do BLOG" titleVariant="h2" />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                            md: '1fr 1fr',
                            lg: '1fr 1fr 1fr',
                        },
                        gap: 3,
                    }}
                >
                    {posts.map((post) => (
                        <SimpleCard
                            title={post.title}
                            description={post.description}
                            image={post.image.url}
                            url={post.url}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export { LastNews }

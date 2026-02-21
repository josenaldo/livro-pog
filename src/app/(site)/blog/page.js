import { Box, Container } from '@mui/material'

import { ContentCard } from '@pog/components/content/ContentCard'
import { ContentTitle } from '@pog/components/content/ContentTitle'
import { getSortedPosts } from '@pog/data'

export const metadata = {
    title: 'B.L.O.G.',
    description: 'Baboseira Línguística Orientada a Gambiarra',
}

export default function BlogPage() {
    const posts = getSortedPosts()

    const title = 'B.L.O.G.'
    const description = 'Baboseira Línguística Orientada a Gambiarra'

    return (
        <Container>
            <Box sx={{ my: 5 }}>
                <ContentTitle title={title} subtitle={description} />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                            md: '1fr 1fr 1fr',
                        },
                        gap: 3,
                        my: 5,
                    }}
                >
                    {posts.map((post) => (
                        <ContentCard
                            title={post.title}
                            text={post.description}
                            url={post.url}
                            author={post.author}
                            date={post.date}
                            icon={post.icon}
                            key={post.url}
                        />
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

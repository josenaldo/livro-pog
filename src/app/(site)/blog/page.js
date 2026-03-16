import { Box, Container } from '@mui/material'

import { ContentCard } from '@pog/components/content/ContentCard'
import { ContentTitle } from '@pog/components/content/ContentTitle'
import { StructuredDataScript } from '@pog/components/seo'
import { getSortedPosts } from '@pog/data'
import { buildWebPageSchema } from '@pog/lib'

export const metadata = {
    title: 'Blog do Livro POG',
    description: 'Baboseira Línguística Orientada a Gambiarra',
}

export default function BlogPage() {
    const posts = getSortedPosts()

    const title = 'Blog do Livro POG'
    const description = 'Baboseira Línguística Orientada a Gambiarra'
    const pageSchema = buildWebPageSchema({
        title,
        description,
        pathname: '/blog',
    })

    return (
        <Container>
            <StructuredDataScript id="blog-index-structured-data" data={pageSchema} />
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

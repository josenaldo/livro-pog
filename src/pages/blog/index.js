import { Box, Container } from '@mui/material'

import { Layout } from '@pog/components/template'

import { ContentTitle, ContentCard } from '@pog/components/content'

import { getSortedPosts } from '@pog/data'
import { getOgImageUrl } from '@pog/lib'

const getStaticProps = async () => {
    const posts = getSortedPosts()
    return { props: { posts } }
}

const BlogPage = ({ posts }) => {
    const title = 'B.L.O.G.'
    const description = 'Baboseira Línguística Orientada a Gambiarra'
    const image = '/images/pages/blog.jpg'

    return (
        <Layout
            title={title}
            description={description}
            image={image}
            url="/blog"
        >
            <Container>
                <Box
                    sx={{
                        my: 5,
                    }}
                >
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
                                image={getOgImageUrl(post.icon)}
                                key={post.url}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export { getStaticProps }
export default BlogPage

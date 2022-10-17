import { Box, Container } from '@mui/material'

import { Layout } from '@pog/components/template'

import { PostCard, ContentTitle } from '@pog/components/content'

import { getSortedPosts } from '@pog/data'

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
                            <PostCard post={post} key={post.url} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export { getStaticProps }
export default BlogPage

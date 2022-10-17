import Link from 'next/link'

import { Box, Container } from '@mui/material'

import { compareDesc } from 'date-fns'

import { Layout } from '@pog/components/template'
import { allPosts } from 'contentlayer/generated'

import { PostCard, ContentTitle } from '@pog/components/content'

const getStaticProps = async () => {
    const posts = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })

    return { props: { posts } }
}

const BlogPage = ({ posts }) => {
    const title = 'B.L.O.G.'
    const description = 'Baboseira Línguística Orientada a Gambiarra'
    const image = '/images/pages/blog.jpg'

    return (
        <Layout title={title} description={description} image={image}>
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

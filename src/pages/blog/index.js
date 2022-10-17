import Link from 'next/link'

import { Box, Container } from '@mui/material'

import { NextSeo } from 'next-seo'

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

    const og = {
        title: title,
        description: description,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/pages/blog.jpg`,
                width: '1200px',
                height: '630px',
                alt: title,
            },
        ],
    }

    return (
        <Layout>
            <Container>
                <NextSeo
                    title={title}
                    description={description}
                    openGraph={og}
                />
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

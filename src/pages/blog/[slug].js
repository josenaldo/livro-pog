import { Container } from '@mui/material'

import { PostView } from '@pog/components/content'

import { NextSeo } from 'next-seo'

import { allPosts } from 'contentlayer/generated'

const getStaticPaths = async () => {
    const paths = allPosts.map((post) => post.url)
    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const { slug } = params
    const url = `/blog/${slug}`
    const post = allPosts.find((post) => post.url === url)

    return {
        props: {
            post,
        },
    }
}

const PostPage = ({ post }) => {
    const og = {
        title: post.title,
        description: post.description,
    }

    if (post.image) {
        og.images = [post.image]
    }

    return (
        <Container>
            <NextSeo
                title={post.title}
                description={post.description}
                openGraph={og}
            />
            <PostView post={post} />
        </Container>
    )
}

export { getStaticPaths, getStaticProps }
export default PostPage

import { Box, Container } from '@mui/material'

import { getAllPostsPaths, getPostData } from '@pog/data'

import { Layout } from '@pog/components/template'
import { ContentView, ContentMeta } from '@pog/components/content'

const getStaticPaths = async () => {
    const paths = getAllPostsPaths()
    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const { slug } = params
    const post = getPostData(slug)

    return {
        props: {
            post,
        },
    }
}

const PostPage = ({ post }) => {
    return (
        <Layout
            title={post.title}
            description={post.description}
            image={post?.image || null}
            url={post.url}
        >
            <Container>
                <ContentView
                    content={post}
                    contentExtraInfo={
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ContentMeta
                                date={post.date}
                                author={post.author}
                            />
                        </Box>
                    }
                />
            </Container>
        </Layout>
    )
}

export { getStaticPaths, getStaticProps }
export default PostPage

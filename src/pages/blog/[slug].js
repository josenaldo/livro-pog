import { Box, Container } from '@mui/material'

import { ContentMeta,ContentView } from '@pog/components/content'
import { Layout } from '@pog/components/template'
import { getAllPostsPaths, getPostData } from '@pog/data'

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
            icon={post?.icon || null}
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

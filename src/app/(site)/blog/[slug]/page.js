import { notFound } from 'next/navigation'

import { Box, Container } from '@mui/material'

import { ContentMeta } from '@pog/components/content/ContentMeta'
import { ContentView } from '@pog/components/content/ContentView'
import { getAllPostsPaths, getPostData } from '@pog/data'

export function generateStaticParams() {
    return getAllPostsPaths().map((url) => ({
        slug: url.replace(/^\/blog\//, ''),
    }))
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params
    const post = getPostData(resolvedParams?.slug)

    if (!post) {
        return {
            title: 'Post não encontrado',
            robots: { index: false, follow: false },
        }
    }

    const title = post?.title || ''
    const description = post?.description || ''

    return {
        title,
        description,
    }
}

export default async function PostPage({ params }) {
    const resolvedParams = await params
    const post = getPostData(resolvedParams?.slug)

    if (!post) {
        notFound()
    }

    return (
        <Container>
            <ContentView
                content={post}
                contentExtraInfo={
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ContentMeta date={post.date} author={post.author} />
                    </Box>
                }
            />
        </Container>
    )
}

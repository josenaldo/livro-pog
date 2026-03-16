import { notFound } from 'next/navigation'

import { Box, Container } from '@mui/material'

import { ContentMeta } from '@pog/components/content/ContentMeta'
import { ContentView } from '@pog/components/content/ContentView'
import { StructuredDataScript } from '@pog/components/seo'
import { APP_IMAGE } from '@pog/config'
import { getAllPostsPaths, getBreadcrumbs, getPostData } from '@pog/data'
import { absoluteUrl, buildArticleSchema, buildBreadcrumbSchema } from '@pog/lib'

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
    const canonicalPath = post?.url || `/blog/${resolvedParams?.slug}`

    return {
        title,
        description,
        alternates: {
            canonical: absoluteUrl(canonicalPath),
        },
        openGraph: {
            type: 'article',
            title,
            description,
            url: absoluteUrl(canonicalPath),
            images: [
                {
                    url: APP_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
    }
}

export default async function PostPage({ params }) {
    const resolvedParams = await params
    const post = getPostData(resolvedParams?.slug)

    if (!post) {
        notFound()
    }

    const breadcrumbSchema = buildBreadcrumbSchema(getBreadcrumbs(post.url))
    const articleSchema = buildArticleSchema({
        title: post.title,
        description: post.description || '',
        pathname: post.url,
        publishedTime: post.date,
        modifiedTime: post.date,
        author: post.author,
    })

    return (
        <Container>
            <StructuredDataScript
                id={`blog-structured-data-${post.slugAsParams || resolvedParams?.slug}`}
                data={[breadcrumbSchema, articleSchema]}
            />
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

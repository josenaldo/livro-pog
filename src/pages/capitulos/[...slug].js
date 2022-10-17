import { Container } from '@mui/material'

import { ChapterView } from '@pog/components/content'

import { NextSeo } from 'next-seo'

import { Layout } from '@pog/components/template'

import { getAllChaptersPaths, getChapterData } from '@pog/data'

const getStaticPaths = async () => {
    const paths = getAllChaptersPaths()
    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const slugParts = params.slug
    const slug = slugParts.join('/')

    const chapter = getChapterData(slug)

    return {
        props: {
            chapter,
        },
    }
}

const PaginaCapitulo = ({ chapter }) => {
    const og = {
        title: chapter.title,
        description: chapter.description,
    }

    if (chapter.image) {
        og.images = [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}${chapter.image.url}`,
                width: chapter.image.width,
                height: chapter.image.height,
                alt: chapter.title,
            },
        ]
    }

    return (
        <Layout>
            <Container>
                <NextSeo
                    title={chapter.title}
                    description={chapter.description}
                    openGraph={og}
                />
                <ChapterView chapter={chapter} />
            </Container>
        </Layout>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

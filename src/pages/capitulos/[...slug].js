import { Container } from '@mui/material'

import { getChapters, getSortedChapters } from '@pog/data'

import { ChapterView } from '@pog/components/chapters'

import { NextSeo } from 'next-seo'

const getStaticPaths = async () => {
    const files = await getChapters()

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', '').split('/'),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const slugParts = params.slug
    const slug = slugParts.join('/')

    const sortedChapters = await getSortedChapters()

    const chapter = sortedChapters.find((c) => c.slug === slug)

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
                url: `${process.env.NEXT_PUBLIC_SITE_URL}${chapter.image.path}`,
                width: '1200px',
                height: '630px',
                alt: chapter.title,
            },
        ]
    }

    return (
        <Container>
            <NextSeo
                title={chapter.title}
                description={chapter.description}
                openGraph={og}
            />
            <ChapterView chapter={chapter} />
        </Container>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

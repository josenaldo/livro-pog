import { Container } from '@mui/material'

import { ChapterView } from '@pog/components/content'

import { NextSeo } from 'next-seo'

import { allChapters } from 'contentlayer/generated'

const getStaticPaths = async () => {
    const paths = allChapters.map((chapter) => chapter.url)
    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const slugParts = params.slug
    const slug = slugParts.join('/')
    const url = `/capitulos/${slug}`

    const chapters = allChapters.sort((a, b) => {
        return a.order_number - b.order_number
    })

    const chapter = chapters.find((chapter, index, chapters) => {
        if (chapter.url === url) {
            const isFirst = index === 0
            const isLast = index === chapters.length - 1
            const previousChapter = !isFirst ? chapters[index - 1] : null
            const nextChapter = !isLast ? chapters[index + 1] : null

            if (previousChapter) {
                chapter.previous = {
                    url: previousChapter.url,
                    title: previousChapter.title,
                }
            } else {
                chapter.previous = {
                    url: '/capitulos',
                }
            }

            if (nextChapter) {
                chapter.next = {
                    url: nextChapter.url,
                    title: nextChapter.title,
                }
            } else {
                chapter.next = {
                    url: '/capitulos',
                }
            }
            return chapter
        }
    })

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

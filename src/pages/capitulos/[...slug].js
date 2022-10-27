import { Container } from '@mui/material'

import { Layout } from '@pog/components/template'

import { ChapterView, ContentView, ContentQuote } from '@pog/components/content'

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
    return (
        <Layout
            title={
                chapter.parent
                    ? `${chapter.parentTitle} | ${chapter.title}`
                    : chapter.title
            }
            description={chapter.description}
            image={chapter?.image?.url || null}
            url={chapter.url}
        >
            <Container>
                <ContentView
                    content={chapter}
                    contentExtraInfo={
                        <ContentQuote
                            quote={chapter.sentence}
                            author={chapter.sentence_author}
                        />
                    }
                />
            </Container>
        </Layout>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

import { Container } from '@mui/material'

import { ChapterView } from '@pog/components/content'

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
    return (
        <Layout
            title={chapter.title}
            description={chapter.description}
            image={chapter?.image?.url || null}
            url={chapter.url}
        >
            <Container>
                <ChapterView chapter={chapter} />
            </Container>
        </Layout>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

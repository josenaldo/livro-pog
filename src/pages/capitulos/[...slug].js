import Head from 'next/head'
import fs from 'fs'
import matter from 'gray-matter'
import { Container, Box } from '@mui/material'

import { getChapters } from '@pog/data'
import { getDataFileAbsolutePath } from '@pog/utils'

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

    const filePath = getDataFileAbsolutePath(`capitulos/${slug}.md`)
    const readFile = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = matter(readFile)
    const chapter = {
        slug,
        ...frontmatter,
    }

    return {
        props: {
            chapter,
        },
    }
}
const PaginaCapitulo = ({ chapter }) => {
    return (
        <Container sx={{ my: '40px' }}>
            <Box sx={{ my: '20px' }}>
                <h1>{chapter.title}</h1>
                <p>{chapter.description}</p>
                <p>{chapter.slug}</p>
            </Box>
        </Container>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

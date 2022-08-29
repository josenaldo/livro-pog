import Head from 'next/head'
import { Container } from '@mui/material'

const getStaticPaths = async () => {
    const files = fs.readdirSync('../../../data/capitulos')

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const api = new ArticlesApi()

    const article = await api.getData(params.slug, params.category)
    return {
        props: {
            article,
        },
    }
}

export default function Post({ article }) {
    return (
        <Container sx={{ my: '40px' }}>
            <Head>
                <title>
                    {article.titulo} - {AppConfig.name}
                </title>
            </Head>
            <ArticlePage article={article}></ArticlePage>
        </Container>
    )
}

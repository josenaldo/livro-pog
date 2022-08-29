import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import matter from 'gray-matter'
import {
    Avatar,
    Box,
    IconButton,
    Card,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemSecondaryAction,
    Typography,
    ListItemText,
    ListItemAvatar,
    Stack,
    CardMedia,
    CardContent,
} from '@mui/material'

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
    console.log(chapter)
    return (
        <Container>
            <Card
                sx={{
                    my: 5,
                }}
            >
                <CardMedia>
                    <Image
                        src={chapter.image.path}
                        alt={chapter.title}
                        width={chapter.image.width}
                        height={chapter.image.height}
                    />
                </CardMedia>

                <CardContent
                    sx={{
                        py: 5,
                        px: { xs: 2, sm: 2, md: 5, lg: 12 },
                    }}
                >
                    <Stack alignItems="center" gap={0} marginBottom={2}>
                        <Typography variant="h1" textAlign="center">
                            {chapter.title}
                        </Typography>
                        <Typography variant="sentence" textAlign="center">
                            {chapter.sentence}
                        </Typography>
                        <Typography variant="sentenceAuthor" textAlign="center">
                            {chapter.sentence_author}
                        </Typography>
                        <Typography variant="subtitle" textAlign="center">
                            {chapter.description}
                        </Typography>
                    </Stack>
                    <Divider />
                </CardContent>
            </Card>
        </Container>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

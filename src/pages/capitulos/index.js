import Link from 'next/link'

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
} from '@mui/material'

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import ArticleIcon from '@mui/icons-material/Article'

import matter from 'gray-matter'

import { ChapterProgress } from '@pog/components/elements'
import { getChapters } from '@pog/data'
import { getDataFileAbsolutePath } from '@pog/utils'
import fs from 'fs'

const getStaticProps = async () => {
    const files = await getChapters()

    const chapters = files.map((fileName) => {
        const slug = fileName.replace('.md', '')

        const filePath = getDataFileAbsolutePath(`capitulos/${fileName}`)
        const readFile = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter } = matter(readFile)
        return {
            slug,
            ...frontmatter,
        }
    })

    const sortedChapters = chapters.sort((a, b) => {
        return a.order_number - b.order_number
    })

    return {
        props: {
            chapters: sortedChapters,
        },
    }
}

const PaginaCapitulos = ({ chapters }) => {
    const getChapterTypeIcon = (chapter) => {
        if (chapter.isParent) {
            return <TopicIcon />
        }

        if (!chapter.isParent && chapter.parent) {
            return <SubdirectoryArrowRightIcon />
        }

        return <ArticleIcon />
    }

    return (
        <Container>
            <Card
                sx={{
                    my: 5,
                    py: 5,
                    px: { xs: 2, sm: 2, md: 5, lg: 12 },
                }}
            >
                <Typography variant="h1" textAlign="center">
                    Capítulos
                </Typography>
                <List sx={{ my: 5 }}>
                    {chapters.map((chapter) => (
                        <>
                            <Link href={`capitulos/${chapter.slug}`}>
                                <ListItemButton
                                    component="a"
                                    key={chapter.slug}
                                    alignItems="flex-start"
                                    sx={{
                                        pl: chapter.parent ? 5 : 0,
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            {getChapterTypeIcon(chapter)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={chapter.title}
                                        secondary={chapter.description}
                                        sx={{
                                            pr: 1,
                                        }}
                                    />
                                    <ListItemSecondaryAction>
                                        <ChapterProgress chapter={chapter} />
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </Link>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>
            </Card>
        </Container>
    )
}

export { getStaticProps }
export default PaginaCapitulos

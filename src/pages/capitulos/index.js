import Link from 'next/link'

import {
    Avatar,
    Card,
    CardContent,
    Container,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material'

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import ArticleIcon from '@mui/icons-material/Article'

import { Layout } from '@pog/components/template'

import { ChapterProgress } from '@pog/components/elements'
import { NextSeo } from 'next-seo'
import { getSortedChapters } from '@pog/data'

const getStaticProps = async () => {
    const chapters = getSortedChapters()

    return { props: { chapters } }
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

    const title = 'Capítulos'
    const description = 'Essa é a lista de capítulos do livro POG.'

    const og = {
        title: title,
        description: description,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/pages/capitulos.jpg`,
                width: '1200px',
                height: '630px',
                alt: title,
            },
        ],
    }

    return (
        <Layout>
            <Container>
                <NextSeo
                    title={title}
                    description={description}
                    openGraph={og}
                />
                <Card
                    sx={{
                        my: 5,
                    }}
                >
                    <CardContent
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
                                    <Link href={chapter.url}>
                                        <ListItemButton
                                            component="a"
                                            key={chapter.url}
                                            alignItems="flex-start"
                                            sx={{
                                                pl: chapter.parent ? 5 : 0,
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {getChapterTypeIcon(
                                                        chapter
                                                    )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={chapter.title}
                                                secondary={chapter.description}
                                                sx={{
                                                    pr: 3,
                                                }}
                                            />
                                            <ListItemSecondaryAction>
                                                <ChapterProgress
                                                    chapter={chapter}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                    </Link>
                                    <Divider variant="inset" component="li" />
                                </>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Container>
        </Layout>
    )
}

export { getStaticProps }
export default PaginaCapitulos

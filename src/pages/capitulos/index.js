import Link from 'next/link'

import {
    Box,
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
import { ContentTitle } from '@pog/components/content'
import { ShareLink } from '@pog/components/share'
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
    const image = '/images/pages/capitulos.jpg'
    const url = '/capitulos'

    return (
        <Layout title={title} description={description} image={image} url={url}>
            <Container>
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
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '30px 1fr 30px',
                                px: 2,
                            }}
                        >
                            <Box sx={{}} />
                            <ContentTitle title={title} />
                            <ShareLink
                                title={title}
                                description={description}
                                url={`${process.env.NEXT_PUBLIC_SITE_URL}/ajude`}
                                image={`${process.env.NEXT_PUBLIC_SITE_URL}${image}`}
                            />
                        </Box>
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
                                                    pr: 4,
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

import Link from 'next/link'

import ArticleIcon from '@mui/icons-material/Article'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import {
    Avatar,
    Box,
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

import { ContentTitle } from '@pog/components/content'
import { ChapterProgress } from '@pog/components/elements'
import { ShareLink } from '@pog/components/share'
import { Layout } from '@pog/components/template'
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
    const icon = 'tabler/IconFileText'
    const url = '/capitulos'

    return (
        <Layout title={title} description={description} icon={icon} url={url}>
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
                                url={`${process.env.NEXT_PUBLIC_SITE_URL}/capitulos`}
                                icon={icon}
                            />
                        </Box>
                        <List sx={{ my: 5 }}>
                            {chapters.map((chapter) => (
                                <Box key={chapter.url}>
                                    <ListItemButton
                                        component={Link}
                                        href={chapter.url}
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
                                                pr: 4,
                                            }}
                                        />
                                        <ListItemSecondaryAction>
                                            <ChapterProgress chapter={chapter} />
                                        </ListItemSecondaryAction>
                                    </ListItemButton>
                                    <Divider variant="inset" component="li" />
                                </Box>
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

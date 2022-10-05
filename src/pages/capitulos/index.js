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

import { ChapterProgress } from '@pog/components/elements'
import { getSortedChapters } from '@pog/data'

const getStaticProps = async () => {
    const sortedChapters = await getSortedChapters(false)

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
    )
}

export { getStaticProps }
export default PaginaCapitulos

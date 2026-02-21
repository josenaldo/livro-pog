import ArticleIcon from '@mui/icons-material/Article'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

import { ContentTitle } from '@pog/components/content/ContentTitle'
import { ChapterProgress } from '@pog/components/elements'
import { ShareLink } from '@pog/components/share'
import { getSortedChapters } from '@pog/data'

export const metadata = {
    title: 'Capítulos',
    description: 'Essa é a lista de capítulos do livro POG.',
}

export default function CapitulosIndexPage() {
    const chapters = getSortedChapters().map(
        ({ url, title, description, isParent, parent, status }) => ({
            url,
            title,
            description,
            isParent,
            parent,
            status,
        })
    )

    const getChapterTypeIcon = (chapter) => {
        if (chapter.isParent) return <TopicIcon />
        if (!chapter.isParent && chapter.parent) return <SubdirectoryArrowRightIcon />
        return <ArticleIcon />
    }

    const title = 'Capítulos'
    const description = 'Essa é a lista de capítulos do livro POG.'
    const icon = 'tabler/IconFileText'

    return (
        <Container>
            <Card sx={{ my: 5 }}>
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
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        pl: chapter.parent ? 6 : 2,
                                        borderBottom: '1px dotted',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <ListItemButton
                                        href={chapter.url}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <ListItemIcon>
                                                <Avatar>{getChapterTypeIcon(chapter)}</Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={chapter.title}
                                                secondary={chapter.description}
                                                sx={{ pr: 4 }}
                                            />
                                        </Box>

                                        <ChapterProgress chapter={chapter} />
                                    </ListItemButton>
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    )
}

import { Box, Container } from '@mui/material'

import { ContentTitle, ContentCard } from '@pog/components/content'
import { getSortedChapters } from '@pog/data'
import { getOgImageUrl } from '@pog/lib'

const Features = () => {
    const chapters = getSortedChapters().filter((c) => c.isParent)

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 5,
                    gap: 5,
                }}
            >
                <ContentTitle
                    title="Uma viagem pelo mundo da POGramação"
                    titleVariant="h2"
                />
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                            md: '1fr 1fr',
                            lg: '1fr 1fr 1fr',
                        },
                        gap: 3,
                        width: '100%',
                    }}
                >
                    {chapters.map((chapter) => (
                        <ContentCard
                            key={chapter.url}
                            title={chapter.title}
                            text={chapter.description}
                            url={chapter.url}
                            image={getOgImageUrl(chapter.icon, chapter.title)}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export { Features }

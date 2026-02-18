import { Box, Container } from '@mui/material'

import { ContentCard } from '@pog/components/content/ContentCard'
import { ContentTitle } from '@pog/components/content/ContentTitle'
import { getChaptersByNames } from '@pog/data'


const FEATURED_CHAPTERS = [
    'o-que-e-pog',
    'historia',
    'requisitos',
    'principios',
    'tecnicas',
    'gambi-design-patterns',
]

const Features = () => {
    const chapters = getChaptersByNames(FEATURED_CHAPTERS)

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
                            icon={chapter.icon}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export { Features }

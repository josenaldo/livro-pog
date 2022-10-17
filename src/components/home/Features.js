import { Box, Container } from '@mui/material'

import { ContentTitle, ContentCard } from '@pog/components/content'

const Features = () => {
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
                    <ContentCard
                        title="O Que é POG?"
                        text="Sabe o que é uma gambiarra? E uma marreta? Descubra o que isso tem a ver com a Programação Orientada a Gambiarra."
                        image="/images/capitulos/o-que-e-pog.jpg"
                        url="/capitulos/o-que-e-pog"
                    />
                    <ContentCard
                        title="História"
                        text="Sabia que a primeira POG é atribuída a um Papa? E que isso é mentira? Não caia em fake news! Conheça a primeira POG da história!"
                        image="/images/capitulos/historia.jpg"
                        url="/capitulos/historia"
                    />
                    <ContentCard
                        title="Requisitos"
                        text="Conheça os fatores que aumentam as chances do surgimento espontâneo da POG no ambiente de trabalho."
                        image="/images/capitulos/requisitos.jpg"
                        url="/capitulos/requisitos"
                    />
                    <ContentCard
                        title="Princípios"
                        text="Entenda os príncipios universais que regem a Programação Orientada a Gambiarra e aprenda como tornar suas POGs mais resilientes!"
                        image="/images/capitulos/principios.jpg"
                        url="/capitulos/principios"
                    />
                    <ContentCard
                        title="Técnicas"
                        text="Torne-se um ninja na criação de novas POGs! Domine as técnicas dos mestres da Programação Orientada a Gambiarra!"
                        image="/images/capitulos/tecnicas.jpg"
                        url="/capitulos/tecnicas"
                    />
                    <ContentCard
                        title="Gambi Design Patterns"
                        text="Descubra como 'otimiazar' seu trabalho através do reuso da experiência dos mestres da criação de problemas corriqueiros!"
                        image="/images/capitulos/gambi-design-patterns.jpg"
                        url="/capitulos/gambi-design-patterns"
                    />
                </Box>
            </Container>
        </Box>
    )
}

export { Features }

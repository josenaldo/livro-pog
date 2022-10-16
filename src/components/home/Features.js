import NextLink from 'next/link'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    Typography,
    CardActionArea,
} from '@mui/material'

import { SimpleCard, ContentTitle } from '@pog/components/content'
import { Link } from '@pog/components/elements'

const Features = () => {
    return (
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
                }}
            >
                <SimpleCard
                    title="O Que é POG?"
                    description="Sabe o que é uma gambiarra? E uma marreta? Descubra o que isso tem a ver com a Programação Orientada a Gambiarra."
                    image="/images/capitulos/o-que-e-pog.jpg"
                    url="/capitulos/o-que-e-pog"
                />
                <SimpleCard
                    title="História"
                    description="Sabia que a primeira POG é atribuída a um Papa? E que isso é mentira? Não caia em fake news! Conheça a primeira POG da história!"
                    image="/images/capitulos/historia.jpg"
                    url="/capitulos/historia"
                />
                <SimpleCard
                    title="Requisitos"
                    description="Conheça os fatores que aumentam as chances do surgimento espontâneo da POG no ambiente de trabalho."
                    image="/images/capitulos/requisitos.jpg"
                    url="/capitulos/requisitos"
                />
                <SimpleCard
                    title="Princípios"
                    description="Entenda os príncipios universais que regem a Programação Orientada a Gambiarra e aprenda como tornar suas POGs mais resilientes!"
                    image="/images/capitulos/principios.jpg"
                    url="/capitulos/principios"
                />
                <SimpleCard
                    title="Técnicas"
                    description="Torne-se um ninja na criação de novas POGs! Domine as técnicas dos mestres da Programação Orientada a Gambiarra!"
                    image="/images/capitulos/tecnicas.jpg"
                    url="/capitulos/tecnicas"
                />
                <SimpleCard
                    title="Gambi Design Patterns"
                    description="Descubra como 'otimiazar' seu trabalho através do reuso da experiência dos mestres da criação de problemas corriqueiros!"
                    image="/images/capitulos/gambi-design-patterns.jpg"
                    url="/capitulos/gambi-design-patterns"
                />
            </Box>
        </Container>
    )
}

export { Features }

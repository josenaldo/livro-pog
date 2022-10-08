import Link from 'next/link'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Container,
    Typography,
} from '@mui/material'

import DefinitionIcon from '@mui/icons-material/Book'
import HistoryIcon from '@mui/icons-material/HourglassEmpty'
import RequirementsIcon from '@mui/icons-material/Rule'
import PrinciplesIcon from '@mui/icons-material/ReceiptLong'
import TechniqueIcon from '@mui/icons-material/TipsAndUpdates'
import PatternsIcon from '@mui/icons-material/AccountTree'

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
            <Typography component="h2" variant="h2">
                Uma viagem pelo mundo da POGramação
            </Typography>
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
                <FeatureCard
                    title="O Que é POG?"
                    description="Sabe o que é uma gambiarra? E uma marreta? Descubra o que isso tem a ver com a Programação Orientada a Gambiarra."
                    icon={<DefinitionIcon />}
                    url="/capitulos/o-que-e-pog"
                />
                <FeatureCard
                    title="História"
                    description="Sabia que a primeira POG é atribuída a um Papa? E que isso é mentira? Não caia em fake news! Conheça a primeira POG da história!"
                    icon={<HistoryIcon />}
                    url="/capitulos/historia"
                />
                <FeatureCard
                    title="Requisitos"
                    description="Conheça os fatores que aumentam as chances do surgimento espontâneo da POG no ambiente de trabalho."
                    icon={<RequirementsIcon />}
                    url="/capitulos/requisitos"
                />
                <FeatureCard
                    title="Princípios"
                    description="Entenda os príncipios universais que regem a Programação Orientada a Gambiarra e aprenda como tornar suas POGs mais resilientes!"
                    icon={<PrinciplesIcon />}
                    url="/capitulos/principios"
                />
                <FeatureCard
                    title="Técnicas"
                    description="Torne-se um ninja na criação de novas POGs! Domine as técnicas dos mestres da Programação Orientada a Gambiarra!"
                    icon={<TechniqueIcon />}
                    url="/capitulos/tecnicas"
                />
                <FeatureCard
                    title="Gambi Design Patterns"
                    description="Descubra como 'otimiazar' seu trabalho através do reuso da experiência dos mestres da criação de problemas corriqueiros!"
                    icon={<PatternsIcon />}
                    url="/capitulos/gambi-design-patterns"
                />
            </Box>
        </Container>
    )
}

const FeatureCard = ({ title, description, url, icon }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardMedia
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    '& svg': {
                        fontSize: { xs: 48, sm: 64, md: 96, lg: 128 },
                    },
                }}
            >
                {icon}
            </CardMedia>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography component="h3" variant="h5" textAlign="center">
                    {title}
                </Typography>
                <Typography component="p" variant="body1">
                    {description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    alignSelf: 'flex-end',
                    pb: 2,
                }}
            >
                <Link href={url} passHref>
                    <Button variant="contained">Leia</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export { Features }

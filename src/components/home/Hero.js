import Link from 'next/link'
import Image from 'next/image'
import { Container, Box, Typography, Button, Stack } from '@mui/material'
import { useColorMode } from '@pog/contexts'

const Hero = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.cover',
                backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8)), url("/images/cover/hero-lg.jpg")',
            }}
        >
            <Container
                sx={{
                    pt: 5,
                    pb: 5,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h1" component="h1" color="white">
                        Programação Orientada a Gambiarra
                    </Typography>
                    <Typography
                        color="white"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: {
                                xs: '1.2rem',
                                sm: '1.2rem',
                                md: '1.3rem',
                                lg: '1.4rem',
                                xl: '1.4rem',
                            },
                        }}
                    >
                        Cansou de se esforçar pra ser um profissional melhor e
                        não ser reconhecido? Busca a verdadeira segurança?
                        Almeja um encontro com o sucesso? Descubra como manter o
                        seu emprego enquanto garante que o inferno seja uma
                        amostra grátis do seu trabalho!
                    </Typography>
                    <Stack spacing={2} direction="row" width="50%">
                        <Button
                            component="Link"
                            variant="contained"
                            color="primary"
                            href="/capitulos"
                            fullWidth
                        >
                            Começar a ler
                        </Button>
                        <Button
                            component="Link"
                            variant="contained"
                            color="secondary"
                            href="/ajude"
                            fullWidth
                        >
                            Ajude esse projeto
                        </Button>
                    </Stack>
                </Box>
                {/* <Box
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        width: { xs: '100%', sm: '50%' },
                        position: 'relative',
                    }}
                >
                    <Image
                        src="/images/cover/hero-lg.jpg"
                        width="500px"
                        height="400px"
                        alt="Programação Orientada a Gambiarra"
                        layout="responsive"
                    />
                </Box> */}
            </Container>
        </Box>
    )
}

export { Hero }

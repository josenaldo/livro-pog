import Image from 'next/image'
import { Container, Box, Typography } from '@mui/material'

const Testimonial = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.testimonial',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 10,
                }}
            >
                <Box
                    sx={{
                        width: { xs: '80%', sm: '80%', md: '70%', lg: '50%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontStyle="italic"
                        textAlign="center"
                    >
                        "Esse livro elevará o nível de suas habilidades
                        gambiarrizadoras e de sua capacidade de criar mais
                        problemas que soluções! Prepare-se pra descobrir que em
                        casa de ferreiro, quem com ferro fere tanto bate até que
                        fura!!!"
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Image
                            src="/images/avatar/author.png"
                            alt="Autor do livro"
                            width={80}
                            height={80}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                Josenaldo Matos
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Autor Irrelevante Anônimo
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export { Testimonial }

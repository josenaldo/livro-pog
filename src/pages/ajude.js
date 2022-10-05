import {
    Box,
    Container,
    Card,
    CardMedia,
    CardContent,
    Stack,
    Typography,
    // Grid,
    Divider,
    Link,
} from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

const AjudePage = () => {
    const title = 'Ajude o Livro POG'
    const description =
        'Quer colaborar com a realização do livro POG? Veja aqui como ajudar!'

    const og = {
        title: title,
        description: description,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/ajude.jpg`,
                width: '1200px',
                height: '630px',
                alt: title,
            },
        ],
    }

    return (
        <Container>
            <NextSeo title={title} description={description} openGraph={og} />
            <Card
                sx={{
                    my: 5,
                    padding: 0,
                }}
            >
                <CardMedia
                    sx={{
                        padding: 0,
                        margin: 0,
                    }}
                >
                    <Box
                        sx={{
                            aspectRatio: '16/9',
                            position: 'relative',
                        }}
                    >
                        <Image
                            src="/images/ajude.png"
                            layout="fill"
                            objectFit="cover"
                            alt={title}
                        />
                    </Box>
                </CardMedia>

                <CardContent>
                    <Grid
                        container
                        spacing={0}
                        sx={{
                            alignContent: 'stretch',
                        }}
                    >
                        <Grid
                            xs={1}
                            sx={{
                                display: 'block',
                            }}
                        ></Grid>
                        <Grid xs={10} padding={2}>
                            <Stack alignItems="center" gap={0} marginBottom={3}>
                                <Typography variant="h1" textAlign="center">
                                    {title}
                                </Typography>

                                <Typography
                                    variant="subtitle"
                                    textAlign="center"
                                >
                                    {description}
                                </Typography>
                            </Stack>

                            <Divider />

                            <Stack gap={3} marginY={3}>
                                <Typography variant="h2">
                                    Tá, o que é isso aqui??
                                </Typography>
                                <Typography variant="body1">
                                    O Livro Programação Orientada a Gambiarra é
                                    um projeto de um só autor, eu, Josenaldo de
                                    Oliveira Matos Filho. O objetivo desse livro
                                    é simplesmente fazer você rir com alguns dos
                                    absurdos que encontramos nessa maravilhosa
                                    área do conhecimento, o desenvolvimento de
                                    Software.
                                </Typography>
                                <Typography variant="h2">
                                    Como eu posso ajudar?
                                </Typography>
                                <Typography variant="body1">
                                    Isso aqui não é um crowdfunding. Eu não vou
                                    pedir dinheiro prometendo um prazo de
                                    entrega. Não sei quando vou acabar o livro.
                                    A coisa simplesmente está fluindo e eu deixo
                                    rolar.
                                </Typography>
                                <Typography variant="body1">
                                    Se, mesmo sabendo disso, você for acometido
                                    por um desejo insano de tacar patacos de
                                    dinheiros em minha fuça, não se sinta
                                    constrangido e dê vazão à essa sua vontade!
                                </Typography>
                                <Typography variant="body1">
                                    Manda um PIX ou um Picpay!
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'column',
                                            md: 'row',
                                        },
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 4,
                                        my: 5,
                                    }}
                                >
                                    <Card
                                        sx={{
                                            maxWidth: 300,
                                        }}
                                        elevation={2}
                                    >
                                        <CardMedia>
                                            <Image
                                                src="/images/ajude/pix.png"
                                                alt="QR Code do Pix"
                                                width="300"
                                                height="300"
                                            />
                                        </CardMedia>
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'flex-start',
                                                gap: 2,
                                            }}
                                        >
                                            <Typography variant="h5">
                                                PIX
                                            </Typography>
                                            <Typography variant="body1">
                                                c74d1a80-9d3a-4953-bcd5-daffb15829b8
                                            </Typography>
                                            <Typography variant="caption">
                                                Gostou? Manda um PIX!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card elevation={2}>
                                        <CardMedia>
                                            <Image
                                                src="/images/ajude/picpay.png"
                                                alt="QR Code do PicPay"
                                                width="300"
                                                height="300"
                                            />
                                        </CardMedia>
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'flex-start',
                                                gap: 2,
                                            }}
                                        >
                                            <Typography variant="h5">
                                                Picpay
                                            </Typography>
                                            <Link
                                                href="https://picpay.me/josenaldo"
                                                color="primary"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                @josenaldo
                                            </Link>
                                            <Typography variant="caption">
                                                Gostou? Faz um Picpay!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                                <Typography variant="h2">
                                    Quando ele fica pronto?
                                </Typography>
                                <Typography variant="body1">
                                    Não sei. Eu costumo trabalhar nesse livro no
                                    meu tempo livre.
                                </Typography>
                                <Typography variant="h2">
                                    Mas voce é aposentado!
                                </Typography>
                                <Typography variant="body1">
                                    Sim. Eu sou aposentado. Isso não quer dizer
                                    que eu seja desocupado. Tem ideia de quanto
                                    tempo leva pra você, deitado na cama, contar
                                    quantos pontos de sujeira tem no teto?
                                </Typography>
                                <Typography variant="h2">
                                    Que garantias eu tenho de que ele será
                                    terminado?
                                </Typography>
                                <Typography variant="body1">
                                    Nenhuma. Inclusive, eu posso morrer
                                    espancado por um babuíno pelado pintado de
                                    azul. É a vida.
                                </Typography>
                                <Typography variant="body1">
                                    Mas uma coisa eu te garanto: Nesse momento,
                                    estou com o Shift Del apontado para o livro.
                                    Ou você me doa dinheiro, ou ele será
                                    deletado.
                                </Typography>
                                <Typography variant="body1">
                                    Brincadeira.
                                </Typography>
                                <Typography variant="h2">
                                    A escrita desse livro está condicionada a
                                    essa ajuda?
                                </Typography>
                                <Typography variant="body1">
                                    Não. E é bem provável que, ao ler esse
                                    livro, ele já tenha sido escrito.
                                </Typography>
                                <Typography variant="h2">
                                    Porque eu deveria doar dinheiro para um
                                    trabalho que será (ou já foi) feito?
                                </Typography>
                                <Typography variant="body1">
                                    Porque você gostou do livro e deseja me
                                    estimular a escrever outras coisas. Quanto
                                    mais doações eu receber, mais estimulado a
                                    outros projetos eu estarei. :D
                                </Typography>
                                <Typography variant="h2">
                                    Você vai lançar uma versão impressa?
                                </Typography>
                                <Typography variant="body1">
                                    Gostaria muito. Quem sabe?
                                </Typography>
                                <Typography variant="h2">
                                    Você vai fechar esse livro?
                                </Typography>
                                <Typography variant="body1">
                                    Não quero. Essa versão, em site, ficará
                                    disponível pra quem quiser ler. Mas planejo,
                                    no futuro, vender o formato ebook, mais
                                    cômodo pra ler no kindle ou no celular.
                                </Typography>
                                <Typography variant="h2">
                                    Vai lançar em formato PDF?
                                </Typography>
                                <Typography variant="body1">
                                    Se houver masoquistas interessados, sim. Não
                                    julgo como as pessoas gostam de obter o seu
                                    prazer.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={1}></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

const LinkItem = ({ href, children }) => {
    return (
        <Box component="li">
            <Typography variant="body1">
                <Link href={href} target="_blank" rel="noopener noreferrer">
                    <a>{children}</a>
                </Link>
            </Typography>
        </Box>
    )
}

export default AjudePage

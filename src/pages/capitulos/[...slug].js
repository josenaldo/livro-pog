import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {
    Avatar,
    Box,
    IconButton,
    Card,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemSecondaryAction,
    Typography,
    ListItemText,
    ListItemAvatar,
    Stack,
    CardMedia,
    CardContent,
    Button,
    Grid,
} from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { MDXContent } from '@pog/components/elements'
import { getChapters, getSortedChapters } from '@pog/data'

const getStaticPaths = async () => {
    const files = await getChapters()

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', '').split('/'),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const slugParts = params.slug
    const slug = slugParts.join('/')

    const sortedChapters = await getSortedChapters()

    const chapter = sortedChapters.find((c) => c.slug === slug)

    return {
        props: {
            chapter,
        },
    }
}

const PaginaCapitulo = ({ chapter }) => {
    console.log(chapter)
    return (
        <Container>
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
                    {chapter.image && (
                        <Box
                            sx={{
                                aspectRatio: '16/9',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={chapter.image.path}
                                alt={chapter.title}
                                width={chapter.image.width}
                                height={chapter.image.height}
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                    )}
                </CardMedia>

                <Grid
                    container
                    spacing={0}
                    sx={{
                        alignContent: 'stretch',
                    }}
                >
                    <Grid xs={1}>
                        <Link href={chapter.previous.url}>
                            <Button
                                variant="contained"
                                color="neutral"
                                // component="a"
                                sx={{
                                    width: '100%',
                                    minWidth: '0',
                                    height: '100%',
                                    borderRadius: '0',
                                    padding: '0px !important',
                                    px: '0px !important',
                                    py: '0px !important',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ArrowBackIosNewIcon />
                            </Button>
                        </Link>
                    </Grid>
                    <Grid xs={10} padding={2}>
                        <Stack alignItems="center" gap={0} marginBottom={2}>
                            <Typography variant="h1" textAlign="center">
                                {chapter.title}
                            </Typography>
                            <Typography variant="sentence" textAlign="center">
                                {chapter.sentence}
                            </Typography>
                            <Typography
                                variant="sentenceAuthor"
                                textAlign="center"
                            >
                                {chapter.sentence_author}
                            </Typography>
                            <Typography variant="subtitle" textAlign="center">
                                {chapter.description}
                            </Typography>
                        </Stack>
                        <Divider />
                        <Box>
                            <MDXContent content={chapter.content} />
                        </Box>
                    </Grid>
                    <Grid xs={1}>
                        <Link href={chapter.next.url}>
                            <Button
                                component="a"
                                variant="contained"
                                color="neutral"
                                sx={{
                                    minWidth: '0',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '0',
                                    padding: '0 !important',
                                    px: '0px !important',
                                    py: '0 !important',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ArrowForwardIosIcon />
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

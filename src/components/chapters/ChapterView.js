import React from 'react'
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
    Backdrop,
    CircularProgress,
} from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { MDXContent } from '@pog/components/elements'

import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'

const ChapterView = ({ chapter }) => {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(false)
    }, [router.query.slug])

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (chapter.next) {
                router.push(chapter.next.url)
            }
        },
        onSwipedRight: (eventData) => {
            if (chapter.previous) {
                router.push(chapter.previous.url)
            }
        },

        onSwipeStart: (eventData) => {
            setLoading(true)
        },
    })

    return (
        <Card
            sx={{
                my: 5,
                padding: 0,
            }}
            {...handlers}
        >
            <ChapterImage chapter={chapter} />

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
                >
                    <ChapterButton
                        url={chapter.previous.url}
                        icon={<ArrowBackIosNewIcon />}
                        onClick={() => {
                            setLoading(true)
                        }}
                    />
                </Grid>
                <Grid xs={10} padding={2}>
                    <ChapterHeader chapter={chapter} />
                    <Divider />
                    <ChapterContent chapter={chapter} />
                </Grid>
                <Grid xs={1}>
                    <ChapterButton
                        url={chapter.next.url}
                        icon={<ArrowForwardIosIcon />}
                        onClick={() => {
                            setLoading(true)
                        }}
                    />
                </Grid>
            </Grid>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
                onClick={() => setLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Card>
    )
}

const ChapterImage = ({ chapter }) => {
    return (
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
    )
}
const ChapterHeader = ({ chapter }) => {
    return (
        <Stack alignItems="center" gap={0} marginBottom={2}>
            <Typography variant="h1" textAlign="center">
                {chapter.title}
            </Typography>
            <Typography variant="sentence" textAlign="center">
                {chapter.sentence}
            </Typography>
            <Typography variant="sentenceAuthor" textAlign="center">
                {chapter.sentence_author}
            </Typography>
            <Typography variant="subtitle" textAlign="center">
                {chapter.description}
            </Typography>
        </Stack>
    )
}

const ChapterContent = ({ chapter }) => {
    return (
        <Box>
            <MDXContent content={chapter.content} />
        </Box>
    )
}

const ChapterButton = ({ url, icon, onClick = () => {} }) => {
    return (
        <Link href={url}>
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
                onClick={onClick}
            >
                {icon}
            </Button>
        </Link>
    )
}

export { ChapterView }

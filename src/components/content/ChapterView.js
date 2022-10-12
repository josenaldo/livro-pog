import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
    Box,
    Card,
    Divider,
    Typography,
    Stack,
    CardMedia,
    Button,
    Backdrop,
    CircularProgress,
} from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import {
    ContentMainImage,
    ContentQuote,
    ContentTitle,
    MDXContent,
} from '@pog/components/content'

const ChapterView = ({ chapter }) => {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false)

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (chapter.next) {
                setLoading(true)
                router.push(chapter.next.url)
            }
        },
        onSwipedRight: (eventData) => {
            if (chapter.previous) {
                setLoading(true)
                router.push(chapter.previous.url)
            }
        },
    })

    React.useEffect(() => {
        setLoading(false)
    }, [router.query.slug])

    React.useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode === 39) {
                setLoading(true)
                if (chapter.next) {
                    router.push(chapter.next.url)
                }
            }
            if (e.keyCode === 37) {
                setLoading(true)
                if (chapter.previous) {
                    router.push(chapter.previous.url)
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <Card
            sx={{
                my: 5,
                padding: 0,
            }}
            {...handlers}
        >
            <ContentMainImage image={chapter.image} alt={chapter.title} />

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
                <Grid
                    xs={10}
                    padding={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        pb: 5,
                    }}
                >
                    <ContentTitle
                        title={chapter.title}
                        subtitle={chapter.description}
                    />
                    <ContentQuote
                        quote={chapter.sentence}
                        author={chapter.sentence_author}
                    />
                    <Divider />

                    <MDXContent content={chapter.content} />
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

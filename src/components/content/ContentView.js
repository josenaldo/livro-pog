import React from 'react'

import { Card, Divider, Backdrop, CircularProgress } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/router'
import {
    ContentMainImage,
    ContentQuote,
    ContentTitle,
    ContentNavButton,
    MDXContent,
} from '@pog/components/content'

const ContentView = ({ content, contentExtraInfo = null }) => {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false)

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (content.next) {
                setLoading(true)
                router.push(content.next.url)
            }
        },
        onSwipedRight: (eventData) => {
            if (content.previous) {
                setLoading(true)
                router.push(content.previous.url)
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
                if (content.next) {
                    router.push(content.next.url)
                }
            }
            if (e.keyCode === 37) {
                setLoading(true)
                if (content.previous) {
                    router.push(content.previous.url)
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
            <ContentMainImage image={content.image} alt={content.title} />

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
                    <ContentNavButton
                        url={content.previous.url}
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
                        title={content.title}
                        subtitle={content.description}
                    />
                    {contentExtraInfo}
                    <Divider />

                    <MDXContent content={content.body.raw} />
                </Grid>
                <Grid xs={1}>
                    <ContentNavButton
                        url={content.next.url}
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

export { ContentView }

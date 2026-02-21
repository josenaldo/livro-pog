'use client'

import * as React from 'react'

import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Backdrop, Box, Card, CircularProgress, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'

import { ContentCover } from '@pog/components/content/ContentCover'
import { ContentNavButton } from '@pog/components/content/ContentNavButton'
import { ContentTitle } from '@pog/components/content/ContentTitle'
import { ShareLink } from '@pog/components/share'

const MDXContent = dynamic(() => import('@pog/components/content/MDXContent').then(m => m.MDXContent), {
    ssr: false,
    loading: () => <CircularProgress color="inherit" sx={{ m: 4 }} />,
})

const ContentView = ({ content, contentExtraInfo = null }) => {
    const router = useRouter()
    const pathname = usePathname()

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(false)
    }, [pathname])

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

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [content.next, content.previous, router])

    return (
        <Card
            sx={{
                my: 5,
                padding: 0,
            }}
        >
            <ContentCover
                icon={content.icon}
                title={content.title}
            />

            <Grid
                container
                spacing={0}
                sx={{
                    alignContent: 'stretch',
                }}
            >
                <Grid
                    key="prev"
                    size={1}
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
                    key="content"
                    size={10}
                    padding={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        pb: 5,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '30px 1fr 30px',
                        }}
                    >
                        <Box />
                        <ContentTitle
                            title={content.title}
                            subtitle={content.description}
                        />
                        <ShareLink
                            title={content.title}
                            description={content.description}
                            url={content.url}
                            icon={content.icon}
                        />
                    </Box>
                    {contentExtraInfo}

                    <Divider />

                    <MDXContent content={content.body.raw} />
                </Grid>
                <Grid key="next" size={1}>
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

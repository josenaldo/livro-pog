'use client'

import * as React from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Container,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField,
    Typography,
} from '@mui/material'
import axios from 'axios'

import { ContentMainImage, ContentTitle } from '@pog/components/content'
import { ShareLink } from '@pog/components/share'

export function SearchPageClient() {
    const [query, setQuery] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState([])

    const router = useRouter()
    const searchParams = useSearchParams()

    const q = searchParams?.get('q') || ''

    const runSearch = React.useCallback(
        async (nextQuery) => {
            router.push('/pesquisa?q=' + encodeURIComponent(nextQuery))
            const { data: res } = await axios.get(
                `/api/search?q=${encodeURIComponent(nextQuery)}`
            )
            setResults(res)
            setLoading(false)
        },
        [router]
    )

    const handleSearch = (e) => {
        e.preventDefault()
        if (!query) return
        setLoading(true)
        runSearch(query)
    }

    React.useEffect(() => {
        if (!q) return
        setLoading(true)
        setQuery(q)

        const firstSearch = async () => {
            const { data: res } = await axios.get(
                `/api/search?q=${encodeURIComponent(q)}`
            )
            setResults(res)
            setLoading(false)
        }

        firstSearch()
    }, [q])

    return (
        <Container>
            <Box sx={{ my: 5 }}>
                <ContentTitle title="Pesquisa" />
                <SearchForm
                    query={query}
                    setQuery={setQuery}
                    handleSearch={handleSearch}
                    loading={loading}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {results?.map((result) => (
                        <ContentResult result={result} key={result.url} />
                    ))}
                </Box>
            </Box>
        </Container>
    )
}

function SearchForm({ handleSearch, query, setQuery, loading }) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TextField
                    placeholder="Pesquisa"
                    id="input-search-page"
                    value={query}
                    color="secondary"
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="secondary"
                                    disabled={!query}
                                    onClick={handleSearch}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: { xs: '100%', md: '50%' },
                    }}
                />
            </Box>
            <Box sx={{ height: '4px', width: '40%', py: 1 }}>
                {loading && <LinearProgress />}
            </Box>
        </Box>
    )
}

function ContentResult({ result }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <CardActionArea
                component={Link}
                href={result.url}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr 2fr',
                        sm: '1fr 4fr',
                        md: '1fr 6fr',
                        lg: '1fr 8fr',
                        xl: '1fr 8fr',
                    },
                    alignItems: 'flex-start',
                }}
            >
                <ContentMainImage
                    image={result.image}
                    alt={result.title}
                    aspectRatio="1/1"
                />
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 2,
                        pt: 2,
                        pl: 2,
                        pb: 2,
                        pr: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" component="h2" color="primary">
                            {result.title}
                        </Typography>
                        <Chip label={result.type} color="secondary" size="small" />
                    </Box>
                    <Typography variant="caption" component="p">
                        {result.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Box sx={{ pt: 2, pr: 2, pl: 0 }}>
                <ShareLink
                    title={result.title}
                    description={result.description}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}${result.url}`}
                    image={`${process.env.NEXT_PUBLIC_SITE_URL}${result.image}`}
                />
            </Box>
        </Card>
    )
}

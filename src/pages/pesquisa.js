import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import {
    Box,
    Card,
    CardContent,
    CardActionArea,
    Container,
    TextField,
    InputAdornment,
    IconButton,
    LinearProgress,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { NextSeo } from 'next-seo'

import { Layout } from '@pog/components/template'

import { ContentTitle, ContentMainImage } from '@pog/components/content'

const SearchPage = () => {
    const [query, setQuery] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState([])
    const router = useRouter()
    const { q } = router.query

    const title = 'Pesquisa'
    const og = {
        title: title,
        description:
            'Pesquise por termos no livro Programação Orientada a Gambiarra.',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/pages/pesquisa.jpg`,
                width: '1200px',
                height: '630px',
                alt: title,
            },
        ],
    }
    const search = React.useCallback(async (query) => {
        router.push('/pesquisa?q=' + query, undefined, { shallow: true })
        const { data: res } = await axios.get(`/api/search?q=${query}`)
        setResults(res)

        setLoading(false)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        search(query)
    }

    React.useEffect(() => {
        if (!router.isReady) return

        const { q } = router.query

        if (!q) return
        setLoading(true)

        const firstSearch = async (q) => {
            const { data: res } = await axios.get(`/api/search?q=${q}`)
            setResults(res)

            setLoading(false)
        }

        setQuery(q)
        firstSearch(q)
    }, [router.isReady, router.query, setQuery])

    return (
        <Layout>
            <Container>
                <NextSeo
                    title={og.title}
                    description={og.description}
                    openGraph={og}
                />
                <Box
                    sx={{
                        my: 5,
                    }}
                >
                    <ContentTitle title={title} />
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
                        {results &&
                            results.map((result) => (
                                <Card key={result.url}>
                                    <Link href={result.url}>
                                        <CardActionArea
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
                                                    padding: 2,
                                                    gap: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    component="h2"
                                                >
                                                    {result.title}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    component="p"
                                                >
                                                    {result.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                </Card>
                            ))}
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

const SearchForm = ({ handleSearch, query, setQuery, loading }) => {
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
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    disabled={!query}
                                    onClick={handleSearch}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '50px',
                        },
                    }}
                    sx={{
                        width: { xs: '100%', md: '50%' },
                    }}
                />
            </Box>
            <Box
                sx={{
                    height: '4px',
                    width: '40%',
                    py: 1,
                }}
            >
                {loading && <LinearProgress />}
            </Box>
        </Box>
    )
}

export default SearchPage

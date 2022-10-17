import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import {
    Box,
    Chip,
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

import { Layout } from '@pog/components/template'

import { ContentTitle, ContentMainImage } from '@pog/components/content'

import { ShareLink } from '@pog/components/share'

const SearchPage = () => {
    const [query, setQuery] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [results, setResults] = React.useState([])
    const router = useRouter()
    const { q } = router.query

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
        <Layout
            title="Pesquisa"
            description="Pesquise por termos no livro Programação Orientada a Gambiarra."
            image="/images/pages/pesquisa.jpg"
            url="/pesquisa"
        >
            <Container>
                <Box
                    sx={{
                        my: 5,
                    }}
                >
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
                        {results &&
                            results.map((result) => (
                                <ContentResult
                                    result={result}
                                    key={result.url}
                                />
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

const ContentResult = ({ result }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
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
                            <Typography
                                variant="h6"
                                component="h2"
                                color="primary"
                            >
                                {result.title}
                            </Typography>
                            <Chip
                                label={result.type}
                                color="secondary"
                                size="small"
                            />
                        </Box>
                        <Typography variant="caption" component="p">
                            {result.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <Box sx={{ pt: 2, pr: 2, pl: 0 }}>
                <ShareLink
                    title={result.title}
                    description={result.description}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}${result.url}`}
                    image={`${process.env.NEXT_PUBLIC_SITE_URL}${result.image.url}`}
                />
            </Box>
        </Card>
    )
}

export default SearchPage

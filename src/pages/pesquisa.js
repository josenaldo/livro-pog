import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import {
    Box,
    Card,
    CardContent,
    Container,
    TextField,
    InputAdornment,
    IconButton,
    LinearProgress,
    Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { NextSeo } from 'next-seo'

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
        const { data: res } = await axios.get(`/api/search?q=${query}`)
        setResults(res)

        setLoading(false)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        search(query)
    }

    return (
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
                            <Card
                                key={result.url}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr 2fr',
                                        sm: '1fr 2fr',
                                        md: '1fr 3fr',
                                    },
                                    gap: 2,
                                }}
                            >
                                <ContentMainImage
                                    image={result.image}
                                    alt={result.title}
                                    aspectRatio="1/1"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {result.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {result.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                </Box>
            </Box>
        </Container>
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

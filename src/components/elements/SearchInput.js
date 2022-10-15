import React from 'react'
import { Box, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { useRouter } from 'next/router'

const SearchInput = ({ id = 'search-input' }) => {
    const [query, setQuery] = React.useState('')
    const router = useRouter()

    const handleSearch = (event) => {
        event.preventDefault()
        router.push('/pesquisa?q=' + query)
    }

    return (
        <Box component="form" onSubmit={handleSearch}>
            <TextField
                placeholder="Pesquisa"
                id={id}
                fullWidth
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
            />
        </Box>
    )
}

export { SearchInput }

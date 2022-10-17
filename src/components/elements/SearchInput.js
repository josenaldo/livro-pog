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
                color="secondary"
                value={query}
                variant="outlined"
                size="small"
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
            />
        </Box>
    )
}

export { SearchInput }

import {
    Box,
    IconButton,
    Drawer,
    TextField,
    InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
    return (
        <TextField
            id="search"
            placeholder="Pesquisar"
            sx={{}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="search button">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export { SearchBar }

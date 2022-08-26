import { createTheme } from '@mui/material/styles'
import { darkPalette } from '@pog/styles'
import { grey } from '@mui/material/colors'

const Theme = createTheme({
    palette: darkPalette,
    scroll: {
        '&::-webkit-scrollbar': {
            width: '8px',
        },

        '&::-webkit-scrollbar-track': {
            bgcolor: `${grey[800]}`,
            borderRadius: '10px',
        },

        '&::-webkit-scrollbar-thumb': {
            bgcolor: `${grey[700]}`,
            borderRadius: '10px',
        },

        '&::-webkit-scrollbar-thumb:hover': {
            bgcolor: `${grey[500]}`,
        },
    },
})

Theme.typography.h1 = {
    fontSize: '2.0rem',
    [Theme.breakpoints.up('sm')]: {
        fontSize: '2.25rem',
    },
    [Theme.breakpoints.up('md')]: {
        fontSize: '2.50rem',
    },
    [Theme.breakpoints.up('lg')]: {
        fontSize: '2.75rem',
    },
    [Theme.breakpoints.up('xl')]: {
        fontSize: '3.0rem',
    },
}

Theme.typography.h2 = {
    fontSize: '1.75rem',
    [Theme.breakpoints.up('sm')]: {
        fontSize: '2.00rem',
    },
    [Theme.breakpoints.up('md')]: {
        fontSize: '2.25rem',
    },
    [Theme.breakpoints.up('lg')]: {
        fontSize: '2.50rem',
    },
    [Theme.breakpoints.up('xl')]: {
        fontSize: '2.75rem',
    },
}

export { Theme }

import { createTheme } from '@mui/material/styles'
import { Palettes } from '@pog/styles'
import { grey } from '@mui/material/colors'

const BaseTheme = {
    palette: Palettes['dark'],
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
}

const extendTheme = (theme) => {
    theme.typography.h1 = {
        fontSize: '2.0rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.25rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.50rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.75rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '3.0rem',
        },
    }

    theme.typography.h2 = {
        fontSize: '1.75rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.00rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.25rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.50rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '2.75rem',
        },
    }

    theme.typography.footerH2 = {
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.palette.secondary.contrastTextColor.darker,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.10rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.15rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.20rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '1.25rem',
        },
    }
}

export { BaseTheme, extendTheme }

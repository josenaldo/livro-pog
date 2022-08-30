import { Palettes } from '@pog/styles'
import { grey } from '@mui/material/colors'

const scroll = {
    '&::-webkit-scrollbar': {
        width: '15px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: `${grey[800]}`,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${grey[700]}`,
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: `${grey[500]}`,
    },
}

const BaseTheme = {
    palette: Palettes['dark'],
    scroll: scroll,
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    ...scroll,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    overflow: 'auto',
                    ...scroll,
                },
            },
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
            fontSize: '3.0rem',
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
        // color: theme.palette.secondary.contrastTextColor.darker,
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

    theme.typography.subtitle = {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '1.2rem',
        marginTop: '1rem',
        marginBotton: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.3rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '1.6rem',
        },
    }

    theme.typography.sentence = {
        fontWeight: 'bold',
        textAlign: 'center',

        fontSize: '0.90rem',
        color: theme.palette.grey[500],
        [theme.breakpoints.up('sm')]: {
            fontSize: '0.92rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '0.94rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '0.96rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '0.98rem',
        },
    }

    theme.typography.sentenceAuthor = {
        fontStyle: 'italic',
        textAlign: 'center',
        color: theme.palette.grey[500],

        fontSize: '0.70rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '0.72rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '0.74rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '0.76rem',
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: '0.78rem',
        },
    }
}

export { BaseTheme, extendTheme }

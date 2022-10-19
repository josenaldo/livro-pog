import { Palettes } from '@pog/styles'
import { grey } from '@mui/material/colors'

const scroll = {
    '&::-webkit-scrollbar': {
        width: '15px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: `scroll.track`,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `primary.main`,
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: `scroll.hover`,
    },
}

const BaseTheme = {
    palette: Palettes['dark'],
    scroll: ({ ownerState, theme }) => ({
        ...{
            '&::-webkit-scrollbar': {
                width: '15px',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.scroll.track,
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.scroll.thumb,
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.scroll.hover,
            },
        },
    }),
    components: {
        MuiBox: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...{
                        '&::-webkit-scrollbar': {
                            width: '15px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: theme.palette.scroll.track,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.scroll.thumb,
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: theme.palette.scroll.hover,
                        },
                    },
                }),
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: ({ ownerState, theme }) => ({
                    ...{
                        '&::-webkit-scrollbar': {
                            width: '15px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: theme.palette.scroll.track,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.scroll.thumb,
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: theme.palette.scroll.hover,
                        },
                    },
                }),
            },
        },
    },
}

const extendTheme = (theme) => {
    theme.typography.h1 = {
        fontSize: 'clamp(2.00rem, 10vw, 2.40rem)',
        fontWeight: 700,
    }

    theme.typography.h2 = {
        fontSize: 'clamp(1.60rem, 9vw, 2.00rem)',
        fontWeight: 700,
    }

    theme.typography.h3 = {
        fontSize: 'clamp(1.40rem, 8vw, 1.80rem)',
        fontWeight: 700,
    }

    theme.typography.h4 = {
        fontSize: 'clamp(1.20rem, 7vw, 1.60rem)',
        fontWeight: 700,
    }

    theme.typography.h5 = {
        fontSize: 'clamp(1.00rem, 6vw, 1.40rem)',
        fontWeight: 700,
    }

    theme.typography.h6 = {
        fontSize: 'clamp(1.00rem, 5vw, 1.20rem)',
        fontWeight: 500,
    }

    theme.typography.footerH2 = {
        fontSize: 'clamp(1.00rem, 5vw, 1.25rem)',
        fontWeight: 'bold',
        textAlign: 'center',
    }

    theme.typography.subtitle = {
        fontSize: 'clamp(1.20rem, 6vw, 1.60rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '1rem',
        marginBotton: '1rem',
    }

    theme.typography.sentence = {
        fontSize: 'clamp(0.90rem, 4vw, 0.98rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.palette.grey[500],
    }

    theme.typography.sentenceAuthor = {
        fontSize: 'clamp(0.70rem, 3vw, 0.78rem)',
        fontStyle: 'italic',
        textAlign: 'center',
        color: theme.palette.grey[500],
    }
}

export { BaseTheme, extendTheme }

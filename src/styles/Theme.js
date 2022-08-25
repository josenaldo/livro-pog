import { createTheme } from '@mui/material/styles'
import {
    deepOrange,
    blueGrey,
    green,
    blue,
    orange,
    red,
    grey,
} from '@mui/material/colors'

const primaryColor = deepOrange
const secondaryColor = blueGrey

const successColor = green
const infoColor = blue
const warningColor = orange
const errorColor = red

const darkTextColor = '#000'
const lightTextColor = '#fff'

const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            lighter: primaryColor[100],
            light: primaryColor[300],
            main: primaryColor[500],
            dark: primaryColor[700],
            darker: primaryColor[900],

            contrastText: darkTextColor,
            contrastTextColor: {
                lighter: darkTextColor,
                light: darkTextColor,
                main: darkTextColor,
                dark: darkTextColor,
                darker: lightTextColor,
            },
        },

        secondary: {
            lighter: secondaryColor[100],
            light: secondaryColor[300],
            main: secondaryColor[500],
            dark: secondaryColor[700],
            darker: secondaryColor[900],

            contrastText: darkTextColor,
            contrastTextColor: {
                lighter: darkTextColor,
                light: darkTextColor,
                main: darkTextColor,
                dark: lightTextColor,
                darker: lightTextColor,
            },
        },

        error: {
            lighter: errorColor[100],
            light: errorColor[300],
            main: errorColor[500],
            dark: errorColor[700],
            darker: errorColor[900],

            contrastText: darkTextColor,
            contrastTextColor: {
                lighter: darkTextColor,
                light: darkTextColor,
                main: darkTextColor,
                dark: lightTextColor,
                darker: lightTextColor,
            },
        },

        warning: {
            lighter: warningColor[100],
            light: warningColor[300],
            main: warningColor[500],
            dark: warningColor[700],
            darker: warningColor[900],

            contrastText: darkTextColor,
            contrastTextColor: {
                lighter: darkTextColor,
                light: darkTextColor,
                main: darkTextColor,
                dark: darkTextColor,
                darker: darkTextColor,
            },
        },

        info: {
            lighter: infoColor[100],
            light: infoColor[300],
            main: infoColor[500],
            dark: infoColor[700],
            darker: infoColor[900],

            contrastText: darkTextColor,
            contrastTextColor: {
                lighter: darkTextColor,
                light: darkTextColor,
                main: darkTextColor,
                dark: lightTextColor,
                darker: lightTextColor,
            },
        },

        info: {
            lighter: successColor[100],
            light: successColor[300],
            main: successColor[500],
            dark: successColor[700],
            darker: successColor[900],

            contrastText: darkTextColor,
            contrastTextColor: {
                lighter: darkTextColor,
                light: darkTextColor,
                main: darkTextColor,
                dark: darkTextColor,
                darker: lightTextColor,
            },
        },
    },
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

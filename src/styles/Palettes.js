import {
    pink,
    blueGrey,
    green,
    blue,
    orange,
    red,
    grey,
    deepOrange,
    deepPurple,
    cyan,
} from '@mui/material/colors'

const primaryColor = deepPurple
const secondaryColor = blueGrey

const successColor = green
const infoColor = blue
const warningColor = orange
const errorColor = red

const darkTextColor = grey[900]
const lightTextColor = grey[50]

const darkPalette = {
    mode: 'dark',
    primary: {
        lighter: primaryColor[50],
        light: primaryColor[100],
        main: primaryColor[200],
        dark: primaryColor[300],
        darker: primaryColor[400],

        contrastText: darkTextColor,
        contrastTextColor: {
            lighter: darkTextColor,
            light: darkTextColor,
            main: darkTextColor,
            dark: lightTextColor,
            darker: lightTextColor,
        },
    },

    secondary: {
        lighter: secondaryColor[50],
        light: secondaryColor[100],
        main: secondaryColor[200],
        dark: secondaryColor[300],
        darker: secondaryColor[400],

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
        lighter: errorColor[50],
        light: errorColor[100],
        main: errorColor[200],
        dark: errorColor[300],
        darker: errorColor[400],

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
        lighter: warningColor[50],
        light: warningColor[100],
        main: warningColor[200],
        dark: warningColor[300],
        darker: warningColor[400],

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
        lighter: infoColor[50],
        light: infoColor[100],
        main: infoColor[200],
        dark: infoColor[300],
        darker: infoColor[400],

        contrastText: darkTextColor,
        contrastTextColor: {
            lighter: darkTextColor,
            light: darkTextColor,
            main: darkTextColor,
            dark: lightTextColor,
            darker: lightTextColor,
        },
    },

    success: {
        lighter: successColor[50],
        light: successColor[100],
        main: successColor[200],
        dark: successColor[300],
        darker: successColor[400],

        contrastText: darkTextColor,
        contrastTextColor: {
            lighter: darkTextColor,
            light: darkTextColor,
            main: darkTextColor,
            dark: darkTextColor,
            darker: lightTextColor,
        },
    },
}

const lightPalette = {
    mode: 'light',
    primary: {
        lighter: primaryColor[100],
        light: primaryColor[300],
        main: primaryColor[500],
        dark: primaryColor[700],
        darker: primaryColor[900],

        contrastText: lightTextColor,
        contrastTextColor: {
            lighter: darkTextColor,
            light: darkTextColor,
            main: darkTextColor,
            dark: lightTextColor,
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

    success: {
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
}

const Palettes = {
    dark: darkPalette,
    light: lightPalette,
}

export { Palettes }

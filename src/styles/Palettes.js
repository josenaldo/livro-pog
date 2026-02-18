import {
    blue,
    blueGrey,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    lightGreen,
    orange,
    pink,
    purple,
    red,
} from '@mui/material/colors'

const primaryColor = purple
const secondaryColor = lightGreen
const neutralColor = grey

const successColor = green
const infoColor = blue
const warningColor = orange
const errorColor = red

const darkTextColor = 'rgb(0, 0, 0, 0.87)'
const lightTextColor = '#fff'

const darkPalette = {
    mode: 'dark',

    primary: {
        lighter: primaryColor[50],
        light: primaryColor[100],
        main: primaryColor[200],
        dark: primaryColor[300],
        darker: primaryColor[400],

        contrastText: darkTextColor,
    },

    secondary: {
        lighter: secondaryColor[50],
        light: secondaryColor[100],
        main: secondaryColor[200],
        dark: secondaryColor[300],
        darker: secondaryColor[400],

        contrastText: darkTextColor,
    },

    neutral: {
        lighter: neutralColor[500],
        light: neutralColor[600],
        main: neutralColor[700],
        dark: neutralColor[800],
        darker: neutralColor[900],

        contrastText: darkTextColor,
    },

    error: {
        lighter: errorColor[50],
        light: errorColor[100],
        main: errorColor[200],
        dark: errorColor[300],
        darker: errorColor[400],

        contrastText: darkTextColor,
    },

    warning: {
        lighter: warningColor[50],
        light: warningColor[100],
        main: warningColor[200],
        dark: warningColor[300],
        darker: warningColor[400],

        contrastText: darkTextColor,
    },

    info: {
        lighter: infoColor[50],
        light: infoColor[100],
        main: infoColor[200],
        dark: infoColor[300],
        darker: infoColor[400],

        contrastText: darkTextColor,
    },

    success: {
        lighter: successColor[50],
        light: successColor[100],
        main: successColor[200],
        dark: successColor[300],
        darker: successColor[400],

        contrastText: darkTextColor,
    },

    navButton: {
        main: neutralColor[900],
        dark: neutralColor[800],
    },

    scroll: {
        track: neutralColor[800],
        thumb: neutralColor[700],
        hover: neutralColor[500],
    },

    background: {
        default: '#121212',
        paper: neutralColor[900],
        appbar: neutralColor[900],
        cover: neutralColor[900],
        breadcrumbs: neutralColor[800],
        testimonial: neutralColor[900],
        quote: neutralColor[900],
    },

    text: {
        primary: lightTextColor,
        secondary: lightTextColor,
        disabled: lightTextColor,
        quote: neutralColor[400],
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
    },

    secondary: {
        lighter: secondaryColor[100],
        light: secondaryColor[300],
        main: secondaryColor[500],
        dark: secondaryColor[700],
        darker: secondaryColor[900],

        contrastText: darkTextColor,
    },

    neutral: {
        lighter: neutralColor[100],
        light: neutralColor[300],
        main: neutralColor[500],
        dark: neutralColor[700],
        darker: neutralColor[900],

        contrastText: darkTextColor,
    },

    error: {
        lighter: errorColor[100],
        light: errorColor[300],
        main: errorColor[500],
        dark: errorColor[700],
        darker: errorColor[900],

        contrastText: darkTextColor,
    },

    warning: {
        lighter: warningColor[100],
        light: warningColor[300],
        main: warningColor[500],
        dark: warningColor[700],
        darker: warningColor[900],

        contrastText: darkTextColor,
    },

    info: {
        lighter: infoColor[100],
        light: infoColor[300],
        main: infoColor[500],
        dark: infoColor[700],
        darker: infoColor[900],

        contrastText: darkTextColor,
    },

    success: {
        lighter: successColor[100],
        light: successColor[300],
        main: successColor[500],
        dark: successColor[700],
        darker: successColor[900],

        contrastText: darkTextColor,
    },

    navButton: {
        main: neutralColor[50],
        dark: neutralColor[100],
    },

    scroll: {
        track: neutralColor[100],
        thumb: neutralColor[300],
        hover: neutralColor[400],
    },

    background: {
        default: '#fafafa',
        paper: '#ffffff',
        appbar: blueGrey[50],
        cover: blueGrey[200],
        breadcrumbs: blueGrey[100],
        testimonial: blueGrey[50],
        quote: neutralColor[100],
    },

    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        quote: neutralColor[600],
    },
}

const Palettes = {
    dark: darkPalette,
    light: lightPalette,
}

export { Palettes }

import { createTheme } from '@mui/material/styles'
import { blue, amber, grey } from '@mui/material/colors'

const Theme = createTheme({
    fonts: {
        primary: "'Montserrat', sans-serif",
        secundary: 'Squada One',
    },
    palette: {
        mode: 'light',

        primary: {
            lighter: blue[100],
            light: blue[300],
            main: blue[500],
            dark: blue[700],
            darker: blue[900],
            contrastText: '#ffffff',
        },
        secondary: {
            lighter: amber[100],
            light: amber[300],
            main: amber[500],
            dark: amber[700],
            darker: amber[900],

            contrastText: '#ffffff',
        },

        neutral: {
            lighter: grey['100'],
            light: grey['200'],
            main: grey['300'],
            dark: grey['400'],
            darker: grey['500'],
            contrastText: grey['900'],
        },
    },
})

export { Theme }

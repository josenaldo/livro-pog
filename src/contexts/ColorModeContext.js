import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { BaseTheme, extendTheme, Palettes } from '@pog/styles'

const ColorModeContext = React.createContext({})

const ColorModeProvider = ({ children }) => {
    const COLOR_MODES = {
        light: 'light',
        dark: 'dark',
    }
    const [colorMode, setColorMode] = React.useState(COLOR_MODES.dark)

    const theme = React.useMemo(() => {
        BaseTheme.palette = Palettes[colorMode]
        const theme = createTheme(BaseTheme)
        extendTheme(theme)
        return theme
    }, [colorMode])

    const toggleColorMode = () => {
        const newColorMode =
            colorMode === COLOR_MODES.dark
                ? COLOR_MODES.light
                : COLOR_MODES.dark
        localStorage.setItem('colorMode', newColorMode)
        setColorMode(newColorMode)
    }

    React.useEffect(() => {
        const localColorMode = localStorage.getItem('colorMode')
        if (localColorMode) {
            setColorMode(localColorMode)
        }
    }, [])

    return (
        <ColorModeContext.Provider
            value={{ colorMode, toggleColorMode, COLOR_MODES }}
        >
            <CssBaseline />

            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )
}

const useColorMode = () => React.useContext(ColorModeContext)

export { ColorModeProvider, useColorMode }

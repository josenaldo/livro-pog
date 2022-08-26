import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { BaseTheme, extendTheme, Palettes } from '@pog/styles'

const ColorModeContext = React.createContext({})

const ColorModeProvider = ({ children }) => {
    const [colorMode, setColorMode] = React.useState('dark')

    const theme = React.useMemo(() => {
        BaseTheme.palette = Palettes[colorMode]
        const theme = createTheme(BaseTheme)
        extendTheme(theme)
        return theme
    }, [colorMode])

    const toggleColorMode = () => {
        const newColorMode = colorMode === 'dark' ? 'light' : 'dark'
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
        <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
            <CssBaseline />

            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )
}

const useColorMode = () => React.useContext(ColorModeContext)

export { ColorModeProvider, useColorMode }

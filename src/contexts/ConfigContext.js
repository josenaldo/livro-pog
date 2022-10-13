import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import { BaseTheme, extendTheme, Palettes } from '@pog/styles'

const ConfigContext = React.createContext({})

const ConfigProvider = ({ children }) => {
    const COLOR_MODES = {
        light: 'light',
        dark: 'dark',
    }
    const DEFAULT_FONT_SIZE = 1.0
    const MIN_FONT_SIZE = 0.8
    const MAX_FONT_SIZE = 3.0
    const FONT_SIZE_INCREMENT = 0.1

    const [colorMode, setColorMode] = React.useState(COLOR_MODES.dark)
    const [fontSize, setFontSize] = React.useState(DEFAULT_FONT_SIZE)

    const theme = React.useMemo(() => {
        BaseTheme.palette = Palettes[colorMode]
        const theme = createTheme(BaseTheme)
        extendTheme(theme)
        return theme
    }, [colorMode, fontSize])

    const toggleColorMode = () => {
        const newColorMode =
            colorMode === COLOR_MODES.dark
                ? COLOR_MODES.light
                : COLOR_MODES.dark
        localStorage.setItem('colorMode', newColorMode)
        setColorMode(newColorMode)
    }

    const increaseFontSize = () => {
        const newFontSize = fontSize + FONT_SIZE_INCREMENT
        console.log('newFontSize', newFontSize)
        if (newFontSize <= MAX_FONT_SIZE) {
            localStorage.setItem('fontSize', newFontSize)
            setFontSize(newFontSize)
        }
    }

    const decreaseFontSize = () => {
        const newFontSize = fontSize - FONT_SIZE_INCREMENT

        if (newFontSize >= MIN_FONT_SIZE) {
            localStorage.setItem('fontSize', newFontSize)
            setFontSize(newFontSize)
        }
    }

    const resetFontSize = () => {
        const newFontSize = DEFAULT_FONT_SIZE
        localStorage.setItem('fontSize', newFontSize)
        setFontSize(newFontSize)
    }

    React.useEffect(() => {
        const localColorMode = localStorage.getItem('colorMode')
        if (localColorMode) {
            setColorMode(localColorMode)
        }

        const localFontSize = localStorage.getItem('fontSize')
        if (localFontSize) {
            setFontSize(parseFloat(localFontSize))
        }
    }, [])

    return (
        <ConfigContext.Provider
            value={{
                colorMode,
                toggleColorMode,
                COLOR_MODES,
                theme,
                fontSize,
                resetFontSize,
                increaseFontSize,
                decreaseFontSize,
            }}
        >
            <CssBaseline />
            <GlobalStyles
                styles={{
                    body: {
                        ...theme.scroll,
                    },
                }}
            />

            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ConfigContext.Provider>
    )
}

const useConfig = () => React.useContext(ConfigContext)

export { ConfigProvider, useConfig }

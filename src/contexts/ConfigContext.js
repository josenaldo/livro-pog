import React from 'react'

import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme,ThemeProvider } from '@mui/material/styles'

import { BaseTheme, extendTheme, Palettes } from '@pog/styles'

const ConfigContext = React.createContext({})

const ConfigProvider = ({ children }) => {
    const COLOR_MODES = {
        light: 'light',
        dark: 'dark',
    }

    const [colorMode, setColorMode] = React.useState(COLOR_MODES.dark)

    const theme = React.useMemo(() => {
        const theme = createTheme({ ...BaseTheme, palette: Palettes[colorMode] })
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
        <ConfigContext.Provider
            value={{
                colorMode,
                toggleColorMode,
                COLOR_MODES,
                theme,
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

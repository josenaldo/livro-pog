import { AppBar, Box, Toolbar } from '@mui/material'

import { Logo } from '@pog/components/elements'
import { Menu, SearchBar } from '@pog/components/template'
import { useConfig } from '@pog/contexts'

const Header = () => {
    const { colorMode, COLOR_MODES } = useConfig()
    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor:
                    colorMode === COLOR_MODES.dark
                        ? 'background.paper'
                        : 'secondary.light',
            }}
        >
            <Toolbar
                sx={{
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Menu />
                    <Logo />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <SearchBar />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export { Header }

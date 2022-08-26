import { AppBar, Box, Toolbar } from '@mui/material'

import { Logo } from '@pog/components/elements'

import { Menu, FontSettings, SearchBar } from '@pog/components/template'

const Header = () => {
    return (
        <Box component="header">
            <AppBar position="sticky">
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
        </Box>
    )
}

export { Header }

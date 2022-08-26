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
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
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
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <SearchBar />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <FontSettings />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export { Header }

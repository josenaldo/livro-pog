import { AppBar, Box, Toolbar } from '@mui/material'

import { Logo } from '@pog/components/elements'
import { Menu } from '@pog/components/template'
import { SearchInput } from '@pog/components/elements'

const Header = () => {
    return (
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
                    <Logo textColor="inherit" logoColor="dark" />
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
                    <SearchInput />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export { Header }

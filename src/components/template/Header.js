import { AppBar, Box, Button } from '@mui/material'

import { Logo } from '@pog/components/elements'

import { Menu, FontSettings } from '@pog/components/template'

const Header = () => {
    return (
        <Box component="header">
            <AppBar
                sx={{
                    padding: '0.5rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Logo />
                <Box>
                    <FontSettings />
                    <Menu />
                </Box>
            </AppBar>
        </Box>
    )
}

export { Header }

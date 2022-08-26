import { useState } from 'react'
import { Box, IconButton, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { FontSettings } from '@pog/components/template'

const Menu = () => {
    const [open, setOpen] = useState(false)

    return (
        <Box>
            <IconButton
                aria-label="menu"
                onClick={() => {
                    setOpen(true)
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <FontSettings />
            </Drawer>
        </Box>
    )
}

export { Menu }

import { useState } from 'react'
import Link from 'next/link'
import {
    Box,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton as MuiListItemButton,
    ListItemText,
    Stack,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'

import { Logo } from '@pog/components/elements'
import { SettingsDialog } from '@pog/components/template'

const Menu = () => {
    const [open, setOpen] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)

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
                <Stack padding={1}>
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Logo />
                    </Box>
                    <Divider />
                    <Divider />
                    <List sx={{ padding: 0 }}>
                        <ListItemButton
                            icon={<SettingsIcon />}
                            text="Configurações"
                            onClick={() => {
                                setOpenSettings(true)
                            }}
                        />
                    </List>
                </Stack>
            </Drawer>
            <SettingsDialog open={openSettings} setOpen={setOpenSettings} />
        </Box>
    )
}

const ListItemLink = ({ icon, text, href }) => {
    return (
        <ListItem component={Link} disablePadding href={href}>
            <MuiListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </MuiListItemButton>
        </ListItem>
    )
}

const ListItemButton = ({ icon, text, onClick }) => {
    return (
        <ListItem disablePadding>
            <MuiListItemButton onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </MuiListItemButton>
        </ListItem>
    )
}

export { Menu }

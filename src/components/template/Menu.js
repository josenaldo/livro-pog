import React from 'react'
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
    Switch,
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import SosIcon from '@mui/icons-material/Sos'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import SearchIcon from '@mui/icons-material/Search'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import ArticleIcon from '@mui/icons-material/Article'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { Logo } from '@pog/components/elements'

import { getSortedChapters } from '@pog/data'
import { useConfig } from '@pog/contexts'

const Menu = () => {
    const chapters = getSortedChapters()

    const { colorMode, toggleColorMode, COLOR_MODES } = useConfig()

    const [open, setOpen] = React.useState(false)

    const getChapterTypeIcon = (chapter) => {
        if (chapter.isParent) {
            return <TopicIcon />
        }

        if (!chapter.isParent && chapter.parent) {
            return <SubdirectoryArrowRightIcon />
        }

        return <ArticleIcon />
    }

    return (
        <Box>
            <IconButton
                aria-label="menu"
                onClick={() => {
                    setOpen(true)
                }}
                edge="start"
                color="inherit"
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                color="inherit"
            >
                <Stack
                    sx={{
                        maxWidth: '300px',
                        padding: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? theme.palette.background.paper
                                : theme.palette.background.paper,
                    }}
                >
                    <Box
                        sx={{
                            mb: 2,
                            mt: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Logo />
                        <IconButton
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>

                    <Divider />
                    <List sx={{ padding: 0 }}>
                        <ListItemLink
                            href="/"
                            text="Home"
                            icon={<HomeIcon />}
                        />

                        <ListItemLink
                            href="/capitulos"
                            text="Capítulos"
                            icon={<ArticleIcon />}
                        />
                        <ListItemLink
                            href="/ajude"
                            text="Ajude este projeto"
                            icon={<SosIcon />}
                        />
                        <ListItemLink
                            href="/blog"
                            text="Blog"
                            icon={<AnnouncementIcon />}
                        />
                        <ListItemLink
                            href="/pesquisa"
                            text="Pesquisa"
                            icon={<SearchIcon />}
                        />

                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <DarkModeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Tema escuro?"
                                id="switch-list-label-dark-mode"
                            />
                            <Switch
                                edge="end"
                                onChange={toggleColorMode}
                                checked={colorMode === COLOR_MODES.dark}
                                inputProps={{
                                    'aria-labelledby':
                                        'switch-list-label-dark-mode',
                                }}
                            />
                        </ListItem>

                        <Divider />
                        {chapters &&
                            chapters.map((chapter) => (
                                <ListItemLink
                                    key={chapter.url}
                                    href={chapter.url}
                                    text={chapter.title}
                                    icon={getChapterTypeIcon(chapter)}
                                />
                            ))}
                    </List>
                </Stack>
            </Drawer>
        </Box>
    )
}

const ListItemLink = ({ text, href, icon }) => {
    return (
        <Link href={href}>
            <ListItem disablePadding>
                <MuiListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </MuiListItemButton>
            </ListItem>
        </Link>
    )
}

const ListItemButton = ({ text, onClick, icon }) => {
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

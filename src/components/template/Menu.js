import React from 'react'

import Link from 'next/link'

import AnnouncementIcon from '@mui/icons-material/Announcement'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import SosIcon from '@mui/icons-material/Sos'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton as MuiListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Switch,
    useMediaQuery,
} from '@mui/material'

import { Logo } from '@pog/components/elements'
import { ShareLink } from '@pog/components/share'
import { APP_DESCRIPTION, APP_TITLE, APP_URL } from '@pog/config'
import { useConfig } from '@pog/contexts'
import { getSortedChapters } from '@pog/data'

const Menu = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
    const edge = matches ? 'start' : false

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
                edge={edge}
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
                        <ShareLink
                            title={APP_TITLE}
                            description={APP_DESCRIPTION}
                            url={APP_URL}
                            image={`${APP_URL}/images/pages/default.jpg`}
                        />
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
                            text="BLOG"
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
        <ListItem disablePadding>
            <MuiListItemButton component={Link} href={href}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </MuiListItemButton>
        </ListItem>
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

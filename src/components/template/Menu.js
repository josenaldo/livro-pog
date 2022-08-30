import { useState, useEffect } from 'react'
import axios from 'axios'
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
import HomeIcon from '@mui/icons-material/Home'
import SosIcon from '@mui/icons-material/Sos'
import AnnouncementIcon from '@mui/icons-material/Announcement'

import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import TopicIcon from '@mui/icons-material/Topic'
import ArticleIcon from '@mui/icons-material/Article'

import { Logo, LoadingProgress } from '@pog/components/elements'
import { SettingsDialog } from '@pog/components/template'

const Menu = () => {
    const [chapters, setChapters] = useState([])
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)

    const getChapterTypeIcon = (chapter) => {
        if (chapter.isParent) {
            return <TopicIcon />
        }

        if (!chapter.isParent && chapter.parent) {
            return <SubdirectoryArrowRightIcon />
        }

        return <ArticleIcon />
    }

    useEffect(() => {
        const getChapters = async () => {
            const { data: chapters } = await axios.get('/api/chapters')
            console.log('capitulos', chapters)
            setChapters(chapters)
            setLoading(false)
        }

        getChapters()
    }, [])

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
                            href="/novidades"
                            text="Novidades"
                            icon={<AnnouncementIcon />}
                        />
                        <Divider />
                        <LoadingProgress loading={loading} />
                        {chapters &&
                            chapters.map((chapter) => (
                                <ListItemLink
                                    key={chapter.slug}
                                    href={`/capitulos/${chapter.slug}`}
                                    text={chapter.title}
                                    icon={getChapterTypeIcon(chapter)}
                                />
                            ))}

                        <Divider />
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

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {
    Avatar,
    Box,
    IconButton,
    Card,
    Container,
    Divider,
    List,
    ListItemButton,
    ListItemSecondaryAction,
    Typography,
    ListItemText,
    ListItemAvatar,
    Stack,
    CardMedia,
    CardContent,
    Button,
    Grid,
} from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { MDXContent } from '@pog/components/elements'
import { getChapters, getSortedChapters } from '@pog/data'

import { ChapterView } from '@pog/components/chapters'

const getStaticPaths = async () => {
    const files = await getChapters()

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', '').split('/'),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const slugParts = params.slug
    const slug = slugParts.join('/')

    const sortedChapters = await getSortedChapters()

    const chapter = sortedChapters.find((c) => c.slug === slug)

    return {
        props: {
            chapter,
        },
    }
}

const PaginaCapitulo = ({ chapter }) => {
    return (
        <Container>
            <ChapterView chapter={chapter} />
        </Container>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

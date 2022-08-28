import matter from 'gray-matter'
import {
    Avatar,
    Box,
    Card,
    Container,
    Divider,
    List,
    ListItem,
    Typography,
    ListItemText,
    ListItemAvatar,
} from '@mui/material'

import TopicIcon from '@mui/icons-material/Topic'
import ArticleIcon from '@mui/icons-material/Article'

import { getChapters } from '@pog/data'
import { getDataFileAbsolutePath } from '@pog/utils'
import fs from 'fs'

const getStaticProps = async () => {
    const files = await getChapters()

    const chapters = files.map((fileName) => {
        const slug = fileName.replace('.md', '')

        const filePath = getDataFileAbsolutePath(`capitulos/${fileName}`)
        const readFile = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter } = matter(readFile)
        console.log(frontmatter)
        return {
            slug,
            frontmatter,
        }
    })

    const sortedChapters = chapters.sort((a, b) => {
        return a.frontmatter.order_number - b.frontmatter.order_number
    })

    return {
        props: {
            chapters: sortedChapters,
        },
    }
}

const PaginaCapitulos = ({ chapters }) => {
    return (
        <Container>
            <Card
                sx={{
                    my: 5,
                    py: 5,
                    px: { xs: 2, sm: 2, md: 5, lg: 12 },
                }}
            >
                <Typography variant="h1" textAlign="center">
                    Capítulos
                </Typography>
                <List sx={{ my: 5 }}>
                    {chapters.map(({ slug, frontmatter }) => (
                        <>
                            <ListItem key={slug} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar>
                                        <ArticleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={frontmatter.title}
                                    secondary={frontmatter.description}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>
            </Card>
        </Container>
    )
}

export { getStaticProps }
export default PaginaCapitulos

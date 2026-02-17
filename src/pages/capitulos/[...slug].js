import { Container, Box, Typography, Link as MuiLink } from '@mui/material'

import { Layout } from '@pog/components/template'

import { ContentView, ContentQuote } from '@pog/components/content'

import { getAllChaptersPaths, getChapterData } from '@pog/data'

const CITE_KEY_PATTERN = /@([A-Za-z0-9_:.#$%&\-+?<>~]+)/g

const listMarkdownFiles = (fs, path, dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    const files = []

    entries.forEach((entry) => {
        const fullPath = path.join(dirPath, entry.name)
        if (entry.isDirectory()) {
            files.push(...listMarkdownFiles(fs, path, fullPath))
            return
        }

        if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(fullPath)
        }
    })

    return files
}

const extractCitationKeysFromMarkdown = (markdownContent) => {
    const keys = []
    const seen = new Set()
    const matches = markdownContent.matchAll(CITE_KEY_PATTERN)

    for (const match of matches) {
        const key = match?.[1]?.trim()
        if (!key || seen.has(key)) {
            continue
        }
        seen.add(key)
        keys.push(key)
    }

    return keys
}

const cleanBibFieldValue = (value = '') => {
    const normalized = value.replace(/\s+/g, ' ').trim()
    const withoutOuterBraces = normalized.replace(/^\{+|\}+$/g, '')
    return withoutOuterBraces.replace(/^"+|"+$/g, '').trim()
}

const parseBibEntries = (bibContent) => {
    const entries = new Map()
    const entryRegex = /@(\w+)\s*\{\s*([^,\s]+)\s*,([\s\S]*?)\n\}\s*(?=@|$)/g

    for (const match of bibContent.matchAll(entryRegex)) {
        const [, type, key, rawFields] = match
        const fields = {}
        const fieldRegex = /(\w+)\s*=\s*({[\s\S]*?}|"[\s\S]*?"|[^,\n]+)\s*,?/g

        for (const fieldMatch of rawFields.matchAll(fieldRegex)) {
            const fieldName = fieldMatch[1].toLowerCase()
            fields[fieldName] = cleanBibFieldValue(fieldMatch[2])
        }

        const container =
            fields.journal || fields.booktitle || fields.publisher || ''
        const link = fields.url || (fields.doi ? `https://doi.org/${fields.doi}` : '')

        entries.set(key, {
            key,
            type,
            title: fields.title || '',
            author: fields.author || '',
            year: fields.year || '',
            container,
            link,
        })
    }

    return entries
}

const getUsedReferences = ({ fs, path }) => {
    const chapterDir = path.join(process.cwd(), 'content', 'capitulos')
    const bibPath = path.join(process.cwd(), 'public', 'data', 'bib', 'library.bib')
    const markdownFiles = listMarkdownFiles(fs, path, chapterDir).sort()
    const usedKeys = []
    const usedSet = new Set()

    markdownFiles.forEach((filePath) => {
        if (filePath.endsWith(`${path.sep}referencias.md`)) {
            return
        }

        const content = fs.readFileSync(filePath, 'utf8')
        const keys = extractCitationKeysFromMarkdown(content)
        keys.forEach((key) => {
            if (!usedSet.has(key)) {
                usedSet.add(key)
                usedKeys.push(key)
            }
        })
    })

    const bibContent = fs.readFileSync(bibPath, 'utf8')
    const bibEntries = parseBibEntries(bibContent)

    const found = usedKeys
        .map((key) => bibEntries.get(key))
        .filter(Boolean)

    const missing = usedKeys.filter((key) => !bibEntries.has(key))

    return { found, missing, totalUsed: usedKeys.length }
}

const getStaticPaths = async () => {
    const paths = getAllChaptersPaths()
    return {
        paths,
        fallback: false,
    }
}

const getStaticProps = async ({ params }) => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const slugParts = params.slug
    const slug = slugParts.join('/')

    const chapter = getChapterData(slug)
    const referencesData =
        chapter?.name === 'referencias' ? getUsedReferences({ fs, path }) : null

    return {
        props: {
            chapter,
            referencesData,
        },
    }
}

const ReferencesList = ({ referencesData }) => {
    if (!referencesData) {
        return null
    }

    const { found, missing, totalUsed } = referencesData

    return (
        <Box
            sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.quote',
            }}
        >
            <Typography variant="h5" color="primary" mb={2}>
                Referencias usadas no livro
            </Typography>
            <Typography variant="body2" mb={2}>
                Citacoes encontradas nos capitulos: {totalUsed}. Referencias
                resolvidas no banco: {found.length}.
            </Typography>

            {found.length === 0 ? (
                <Typography variant="body2">
                    Nenhuma referencia encontrada no arquivo bib para as chaves
                    citadas.
                </Typography>
            ) : (
                <Box
                    component="ol"
                    sx={{
                        m: 0,
                        pl: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                    }}
                >
                    {found.map((ref) => (
                        <Box component="li" key={ref.key}>
                            <Typography variant="body2">
                                {ref.author ? `${ref.author}. ` : ''}
                                {ref.title ? `${ref.title}. ` : ''}
                                {ref.container ? `${ref.container}. ` : ''}
                                {ref.year ? `${ref.year}. ` : ''}
                                {ref.link ? (
                                    <MuiLink
                                        href={ref.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {ref.link}
                                    </MuiLink>
                                ) : null}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Chave: {ref.key}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {missing.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="error" mb={1}>
                        Chaves citadas nao encontradas no library.bib:
                    </Typography>
                    <Typography variant="caption">
                        {missing.join(', ')}
                    </Typography>
                </Box>
            ) : null}
        </Box>
    )
}

const PaginaCapitulo = ({ chapter, referencesData }) => {
    const isReferencesChapter = chapter?.name === 'referencias'

    return (
        <Layout
            title={
                chapter.parent
                    ? `${chapter.parentTitle} | ${chapter.title}`
                    : chapter.title
            }
            description={chapter.description}
            image={chapter?.image?.url || null}
            url={chapter.url}
        >
            <Container>
                <ContentView
                    content={chapter}
                    contentExtraInfo={
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <ContentQuote
                                quote={chapter.sentence}
                                author={chapter.sentence_author}
                            />
                            {isReferencesChapter ? (
                                <ReferencesList referencesData={referencesData} />
                            ) : null}
                        </Box>
                    }
                />
            </Container>
        </Layout>
    )
}

export { getStaticPaths, getStaticProps }
export default PaginaCapitulo

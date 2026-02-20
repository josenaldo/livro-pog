import { allChapters } from 'contentlayer/generated'

const getAllChapters = () => {
    return allChapters
}

const getSortedChapters = () => {
    return [...allChapters].sort((a, b) => {
        return a.order_number - b.order_number
    })
}

const getAllChaptersPaths = () => {
    const paths = allChapters.map((chapter) => chapter.url)
    return paths
}

const getChapterData = (slug) => {
    if (!slug) return null

    const normalizedSlug = String(slug)
        .replace(/^\/+/, '')
        .replace(/^capitulos\//, '')
        .replace(/^\/capitulos\//, '')

    const url = normalizedSlug.startsWith('/capitulos/')
        ? normalizedSlug
        : `/capitulos/${normalizedSlug}`

    const chapters = getSortedChapters()
    const index = chapters.findIndex((c) => c.url === url)
    if (index === -1) return null

    const current = chapters[index]
    const isFirst = index === 0
    const isLast = index === chapters.length - 1
    const previousChapter = !isFirst ? chapters[index - 1] : null
    const nextChapter = !isLast ? chapters[index + 1] : null

    const hasParent = Boolean(current.parent)
    const parentChapter = hasParent
        ? chapters.find((chap) => chap.name === current.parent)
        : null

    return {
        ...current,
        previous: previousChapter
            ? { url: previousChapter.url, title: previousChapter.title }
            : { url: '/capitulos' },
        next: nextChapter
            ? { url: nextChapter.url, title: nextChapter.title }
            : { url: '/capitulos' },
        parentTitle: parentChapter?.title || '',
    }
}

const getChaptersByNames = (names = []) => {
    return names
        .map((name) => allChapters.find((c) => c.name === name))
        .filter(Boolean)
}

export {
    getAllChapters,
    getAllChaptersPaths,
    getChapterData,
    getChaptersByNames,
    getSortedChapters,
}

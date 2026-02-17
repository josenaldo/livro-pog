import { allChapters } from 'contentlayer/generated'

const getAllChapters = () => {
    return allChapters
}

const getSortedChapters = () => {
    const chapters = allChapters.sort((a, b) => {
        return a.order_number - b.order_number
    })

    return chapters
}

const getAllChaptersPaths = () => {
    const paths = allChapters.map((chapter) => chapter.url)
    return paths
}

const getChapterData = (slug) => {
    const url = `/capitulos/${slug}`
    const chapters = getSortedChapters()

    const chapter = chapters.find((chapter, index, chapters) => {
        if (chapter.url === url) {
            const isFirst = index === 0
            const isLast = index === chapters.length - 1
            const previousChapter = !isFirst ? chapters[index - 1] : null
            const nextChapter = !isLast ? chapters[index + 1] : null

            if (previousChapter) {
                chapter.previous = {
                    url: previousChapter.url,
                    title: previousChapter.title,
                }
            } else {
                chapter.previous = {
                    url: '/capitulos',
                }
            }

            if (nextChapter) {
                chapter.next = {
                    url: nextChapter.url,
                    title: nextChapter.title,
                }
            } else {
                chapter.next = {
                    url: '/capitulos',
                }
            }

            return chapter
        }
    })

    const hasParent = chapter.parent || false
    if (hasParent) {
        const parentChapter = chapters.find((chap) => {
            if (chap.name === chapter.parent) {
                return chapter
            }
        })

        chapter.parentTitle = parentChapter.title
    } else {
        chapter.parentTitle = ''
    }

    return chapter
}

const getChaptersByNames = (names = []) => {
    return names
        .map((name) => allChapters.find((c) => c.name === name))
        .filter(Boolean)
}

export {
    getAllChapters,
    getSortedChapters,
    getAllChaptersPaths,
    getChapterData,
    getChaptersByNames,
}

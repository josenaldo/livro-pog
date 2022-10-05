import glob from 'glob'
import fs from 'fs'
import matter from 'gray-matter'

import { getDataFileAbsolutePath } from '@pog/utils'

const getChapters = async () => {
    const chaptersPath = 'public/data/capitulos'

    const files = glob.sync(`${chaptersPath}/**/*.md`).map((file) => {
        return file.replace(`${chaptersPath}/`, '')
    })

    return files
}

const getChapterData = (fileName, loadContent = true) => {
    const slug = fileName.replace('.md', '')

    const filePath = getDataFileAbsolutePath(`capitulos/${fileName}`)
    console.log('filePath', filePath)
    const readFile = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(readFile)

    const chapter = {
        slug,
        ...frontmatter,
    }

    if (loadContent) {
        chapter.content = content
    }

    return chapter
}

const getLinkedChapters = (sortedChapters) => {
    const linkedSortChapters = sortedChapters.map((chapter, index) => {
        const isFirst = index === 0
        const isLast = index === sortedChapters.length - 1
        const previousChapter = !isFirst ? sortedChapters[index - 1] : null
        const nextChapter = !isLast ? sortedChapters[index + 1] : null

        if (previousChapter) {
            chapter.previous = {
                slug: previousChapter.slug,
                title: previousChapter.title,
            }
            chapter.previous.url = `/capitulos/${previousChapter.slug}`
        } else {
            chapter.previous = {
                url: '/capitulos',
            }
        }

        if (nextChapter) {
            chapter.next = {
                slug: nextChapter.slug,
                title: nextChapter.title,
            }
            chapter.next.url = `/capitulos/${nextChapter.slug}`
        } else {
            chapter.next = {
                url: '/capitulos',
            }
        }

        return chapter
    })

    return linkedSortChapters
}

const getSortedChapters = async (loadContent = true) => {
    const files = await getChapters()

    const chapters = files.map((fileName) => {
        const chapter = getChapterData(fileName, loadContent)
        return chapter
    })

    const sortedChapters = chapters.sort((a, b) => {
        return a.order_number - b.order_number
    })

    const linkedSortChapters = getLinkedChapters(sortedChapters)

    return linkedSortChapters
}

export { getChapters, getChapterData, getLinkedChapters, getSortedChapters }

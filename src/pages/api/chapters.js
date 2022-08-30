import fs from 'fs'
import path from 'path'
import glob from 'glob'
import matter from 'gray-matter'

import { getLinkedChapters } from '@pog/data'

const getChapters = async () => {
    const dirRelativeToPublicFolder = 'public/data/capitulos'
    // const chaptersPath = path.resolve('./public', dirRelativeToPublicFolder)
    // console.log('>>> CHAPTERS PATH <<<', chaptersPath)

    const files = glob
        .sync(`${dirRelativeToPublicFolder}/**/*.md`)
        .map((file) => {
            return file.replace(`${dirRelativeToPublicFolder}/`, '')
        })

    return files
}

const getChapterData = (fileName, loadContent = true) => {
    const slug = fileName.replace('.md', '')

    const dirRelativeToPublicFolder = 'public/data/capitulos'
    const chaptersPath = path.resolve('./', dirRelativeToPublicFolder)

    const filePath = path.join(chaptersPath, `${fileName}`)

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

export default async function handler(req, res) {
    const chapters = await getSortedChapters(false)

    res.status(200).json(chapters)
}

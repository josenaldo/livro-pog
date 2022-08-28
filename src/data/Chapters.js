import { getDataPath } from '@pog/utils'
import glob from 'glob'
import path from 'path'
import fs from 'fs'

const getChapters = async () => {
    const chaptersPath = 'data/capitulos'

    const files = glob.sync(`${chaptersPath}/**/*.md`).map((file) => {
        return file.replace(`${chaptersPath}/`, '')
    })

    return files
}

export { getChapters }

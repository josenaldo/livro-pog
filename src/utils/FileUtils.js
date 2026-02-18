import fs from 'fs'
import path from 'path'

const getDataFileAbsolutePath = (relativeFilePath) => {
    const pathParts = [process.cwd(), 'public', 'data', relativeFilePath]
    const pathString = path.join(...pathParts)
    return path.normalize(pathString)
}

export { getDataFileAbsolutePath }

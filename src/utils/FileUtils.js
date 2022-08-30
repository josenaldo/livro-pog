import path from 'path'
import fs from 'fs'

const getDataFileAbsolutePath = (relativeFilePath) => {
    const pathParts = [process.cwd(), 'public', 'data', relativeFilePath]
    const pathString = path.join(...pathParts)
    return path.normalize(pathString)
}

export { getDataFileAbsolutePath }

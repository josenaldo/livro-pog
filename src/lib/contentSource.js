import { readFile } from 'node:fs/promises'
import path from 'node:path'

function resolveContentFile(baseSegments = [], slugSegments = []) {
    const baseDir = path.join(process.cwd(), 'content', ...baseSegments)
    const resolvedPath = path.resolve(baseDir, ...slugSegments)

    if (!resolvedPath.startsWith(`${baseDir}${path.sep}`) && resolvedPath !== baseDir) {
        return null
    }

    return resolvedPath
}

async function readContentMarkdown(baseSegments = [], slugSegments = []) {
    const filePath = resolveContentFile(baseSegments, slugSegments)

    if (!filePath) {
        return null
    }

    try {
        const content = await readFile(filePath, 'utf8')
        return { content, filePath }
    } catch {
        return null
    }
}

function createMarkdownResponse(markdown, filename) {
    return new Response(markdown, {
        headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'content-disposition': `inline; filename="${filename}"`,
            'cache-control': 'public, max-age=0, must-revalidate',
        },
    })
}

export { createMarkdownResponse, readContentMarkdown }

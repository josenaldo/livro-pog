import { createMarkdownResponse, readContentMarkdown } from '@pog/lib/contentSource'

export async function GET(_request, { params }) {
    const resolvedParams = await params
    const slug = resolvedParams?.slug

    const result = await readContentMarkdown(['blog'], [`${slug}.md`])

    if (!result) {
        return new Response('Not Found', { status: 404 })
    }

    return createMarkdownResponse(result.content, `${slug}.md`)
}

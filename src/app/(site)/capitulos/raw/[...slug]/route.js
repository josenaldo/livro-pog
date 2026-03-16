import { createMarkdownResponse, readContentMarkdown } from '@pog/lib/contentSource'

export async function GET(_request, { params }) {
    const resolvedParams = await params
    const slugParts = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug : []
    const lastPart = slugParts.at(-1)
    const fileParts = [...slugParts.slice(0, -1), `${lastPart}.md`]

    const result = await readContentMarkdown(['capitulos'], fileParts)

    if (!result) {
        return new Response('Not Found', { status: 404 })
    }

    return createMarkdownResponse(result.content, `${lastPart || 'chapter'}.md`)
}

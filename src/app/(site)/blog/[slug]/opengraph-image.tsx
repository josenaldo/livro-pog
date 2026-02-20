import { getPostData } from '../../../../data'
import { createOgImageResponse, OG_HEIGHT, OG_WIDTH } from '../../../../lib/ogImageResponse'

export const runtime = 'nodejs'
export const size = { width: OG_WIDTH, height: OG_HEIGHT }
export const contentType = 'image/png'

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const post = getPostData(resolvedParams?.slug)
    return createOgImageResponse(post?.icon || 'tabler/IconMessage')
}

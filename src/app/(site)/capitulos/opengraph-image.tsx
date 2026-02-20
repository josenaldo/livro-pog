import { createOgImageResponse, OG_HEIGHT, OG_WIDTH } from '../../../lib/ogImageResponse'

export const runtime = 'nodejs'
export const size = { width: OG_WIDTH, height: OG_HEIGHT }
export const contentType = 'image/png'

export default function OpenGraphImage() {
    return createOgImageResponse('tabler/IconFileText')
}

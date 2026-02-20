import { createOgImageResponse } from '../../../lib/ogImageResponse'

export const runtime = 'nodejs'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const iconKey = searchParams.get('icon') || 'tabler/IconBooks'
        return createOgImageResponse(iconKey)
    } catch (error) {
        return new Response(`Failed to generate OG image: ${error?.message || 'unknown error'}`, {
            status: 500,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        })
    }
}

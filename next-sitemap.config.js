/** @type {import('next-sitemap').IConfig} */
const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://livropog.com.br'
).replace(/\/$/, '')

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    exclude: ['/api/*', '/opengraph-image*', '/**/opengraph-image*'],
    robotsTxtOptions: {
        policies: [{ userAgent: '*', allow: '/' }],
    },
    transform: async (config, path) => {
        if (path.includes('opengraph-image') || path.startsWith('/api/')) {
            return null
        }

        return {
            loc: path,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
}

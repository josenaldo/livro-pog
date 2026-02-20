/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer2')

const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    extendDefaultRuntimeCaching: true,
    workboxOptions: {
        runtimeCaching: [
            {
                // Não cacheia a API de geração de OG images — sempre busca da rede
                urlPattern: /^\/api\/og/,
                handler: 'NetworkOnly',
            },
        ],
    },
})

const nextConfig = {
    turbopack: {
        resolveAlias: {
            'contentlayer/generated': './.contentlayer/generated',
            '@pog/components': './src/components',
            '@pog/components/content': './src/components/content',
            '@pog/components/content/ContateAuthorAndDate': './src/components/content/ContateAuthorAndDate',
            '@pog/components/content/ContentCard': './src/components/content/ContentCard',
            '@pog/components/content/ContentCardImage': './src/components/content/ContentCardImage',
            '@pog/components/content/ContentCover': './src/components/content/ContentCover',
            '@pog/components/content/ContentTitle': './src/components/content/ContentTitle',
            '@pog/components/content/MDXContent': './src/components/content/MDXContent',
            '@pog/components/elements': './src/components/elements',
            '@pog/components/home': './src/components/home',
            '@pog/components/share': './src/components/share',
            '@pog/components/template': './src/components/template',
            '@pog/config': './src/config',
            '@pog/contexts': './src/contexts',
            '@pog/data': './src/data',
            '@pog/lib': './src/lib',
            '@pog/lib/iconMapper': './src/lib/iconMapper',
            '@pog/styles': './src/styles',
            '@pog/styles/globals.css': './src/styles/globals.css',
            '@pog/styles/prism-darcula.css': './src/styles/prism-darcula.css',
            '@pog/utils': './src/utils',
            '@pog/utils/DateUtils': './src/utils/DateUtils',
        },
    },
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || '',
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
    },
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost' },
            { protocol: 'https', hostname: 'livropog.com.br' },
        ],
    },
}

const contentLayerConfig = withContentlayer(nextConfig)

module.exports = withPWA(contentLayerConfig)

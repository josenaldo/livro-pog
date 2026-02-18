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
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || '',
        NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
    },
    images: {
        domains: ['localhost', 'livropog.com.br'],
    },
}

const contentLayerConfig = withContentlayer(nextConfig)

module.exports = withPWA(contentLayerConfig)

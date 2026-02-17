/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache')
const { withContentlayer } = require('next-contentlayer2')

const withPWA = require('next-pwa')({
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    mode: 'production',
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

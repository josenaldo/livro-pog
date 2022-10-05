/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
    pwa: {
        dest: 'public',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        mode: 'production',
    },

    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
}

module.exports = () => {
    const plugins = [withPWA]
    const config = plugins.reduce((acc, next) => next(acc), {
        ...nextConfig,
    })
    return config
}

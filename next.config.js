/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
    pwa: {
        dest: "public",
        runtimeCaching,
    },

    env: {
        NEXT_PUBLIC_EMBED_DOMAIN: process.env.NEXT_PUBLIC_EMBED_DOMAIN,
    },
});

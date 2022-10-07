const name = 'POG'
const title = 'Programação Orientada a Gambiarra'
const description =
    'Como transformar o seu trabalho em uma amostra grátis do inferno!.'
const url = 'https://livropog.com.br/'

const SeoConfig = {
    titleTemplate: '%s | Programação Orientada a Gambiarra',
    title: title,
    description: description,
    canonical: url,
    openGraph: {
        url: url,
        title: title,
        description: description,
        type: 'website',
        locale: 'pt_BR',
        site_name: title,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/default.jpg`,
                width: 1200,
                height: 630,
                alt: title,
                type: 'image/png',
            },
        ],
    },
    twitter: {
        handle: '@josenaldomatos',
        site: '@josenaldomatos',
        cardType: 'summary_large_image',
    },
    additionalMetaTags: [
        { name: 'application-name', content: name },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: name },
        { name: 'description', content: description },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'msapplication-config', content: '/icons/browserconfig.xml' },
        { name: 'msapplication-TileColor', content: '#673ab7' },
        { name: 'msapplication-tap-highlight', content: 'no' },
        { name: 'theme-color', content: '#673ab7' },
    ],
    additionalLinkTags: [
        {
            rel: 'icon',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon.ico`,
        },
        {
            rel: 'icon shortcut',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon.ico`,
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon-32x32.png`,
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon-16x16.png`,
        },
        {
            rel: 'mask-icon',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon.svg`,
        },
        {
            rel: 'apple-touch-icon',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/76x76-icon.png`,
            sizes: '76x76',
        },
        {
            rel: 'apple-touch-icon',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/152x152-icon.png`,
            sizes: '152x152',
        },
        {
            rel: 'apple-touch-icon',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/180x180-icon.png`,
            sizes: '180x180',
        },
        {
            rel: 'apple-touch-icon',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/167x167-icon.png`,
            sizes: '167x167',
        },
        {
            rel: 'manifest',
            href: `${process.env.NEXT_PUBLIC_SITE_URL}/manifest.json`,
        },
    ],
}

export { SeoConfig }

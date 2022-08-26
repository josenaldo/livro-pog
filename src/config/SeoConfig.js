const title = 'Ciro TV'
const description = 'A segunda tela do Cirão.'
const url = 'https://cirotv.com.br/'

const SeoConfig = {
    titleTemplate: '%s | Ciro TV',
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
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
                type: 'image/jpeg',
            },
            {
                url: 'https://www.example.ie/og-image-02.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second',
                type: 'image/jpeg',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
        ],
    },
    twitter: {
        handle: '@vudureverso',
        site: '@vudureverso',
        cardType: 'summary_large_image',
    },
}

export { SeoConfig }

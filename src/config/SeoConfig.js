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
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
                type: 'image/jpeg',
            },
        ],
    },
    twitter: {
        handle: '@vudureverso',
        site: '@vudureverso',
        cardType: 'summary_large_image',
    },
}

export { SeoConfig }

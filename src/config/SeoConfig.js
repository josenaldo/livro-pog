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
}

export { SeoConfig }

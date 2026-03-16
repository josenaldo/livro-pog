const APP_TITLE = 'Programação Orientada a Gambiarra'
const APP_DESCRIPTION =
    'Como transformar o seu trabalho em uma amostra grátis do inferno, com histórias, técnicas e padrões de gambiarra aplicados ao caos real do desenvolvimento de software.'
const APP_URL = 'https://livropog.com.br'
const APP_IMAGE = `${APP_URL}/images/default.jpg?v=3`

module.exports = {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    url: APP_URL,
    outDir: 'public',
    generators: {
        robotsTxt: false,
        llmsTxt: true,
        llmsFullTxt: true,
        rawMarkdown: false,
        manifest: true,
        sitemap: false,
        aiIndex: true,
        schema: true,
    },
    schema: {
        enabled: true,
        organization: {
            name: APP_TITLE,
            url: APP_URL,
            logo: `${APP_URL}/icons/192x192-icon.png`,
            sameAs: [
                'https://github.com/josenaldo',
                'https://github.com/josenaldo/livro-pog-1/',
                'https://bsky.app/profile/josenaldo.com.br',
                'https://linkedin.com/in/josenaldo',
                'https://josenaldo.com.br',
            ],
        },
        defaultType: 'WebPage',
    },
    og: {
        enabled: false,
        image: APP_IMAGE,
        twitterHandle: '@josenaldomatos',
        type: 'website',
    },
    widget: {
        enabled: false,
    },
}

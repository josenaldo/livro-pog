import { APP_DESCRIPTION, APP_IMAGE, APP_TITLE, APP_URL } from '@pog/config'

function absoluteUrl(pathname = '/') {
    const normalizedPath = pathname === '/' ? '' : pathname
    return `${APP_URL}${normalizedPath}`
}

function buildBreadcrumbSchema(items = []) {
    if (!items.length) {
        return null
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            item: absoluteUrl(item.url),
        })),
    }
}

function buildFaqSchema(items = []) {
    if (!items.length) {
        return null
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }
}

function buildSiteSchemas() {
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: APP_TITLE,
            description: APP_DESCRIPTION,
            url: APP_URL,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
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
    ]
}

function buildArticleSchema({
    title,
    description,
    pathname,
    publishedTime,
    modifiedTime,
    author = 'Josenaldo de Oliveira Matos Filho',
    image = APP_IMAGE,
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: absoluteUrl(pathname),
        image,
        author: {
            '@type': 'Person',
            name: author,
            url: 'https://josenaldo.com.br',
        },
        publisher: {
            '@type': 'Organization',
            name: APP_TITLE,
            logo: {
                '@type': 'ImageObject',
                url: `${APP_URL}/icons/192x192-icon.png`,
            },
        },
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    }
}

function buildWebPageSchema({
    title,
    description,
    pathname,
    image = APP_IMAGE,
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: absoluteUrl(pathname),
        isPartOf: {
            '@type': 'WebSite',
            name: APP_TITLE,
            url: APP_URL,
        },
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image,
        },
    }
}

export {
    absoluteUrl,
    buildArticleSchema,
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildSiteSchemas,
    buildWebPageSchema,
}

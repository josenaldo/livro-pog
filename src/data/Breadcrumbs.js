import { getAllChapters, getAllPosts } from '@pog/data'

const getBreadcrumbs = (url) => {
    const chapters = getAllChapters()
    const posts = getAllPosts()
    const pages = {}

    chapters.forEach((chapter) => {
        pages[chapter.url] = {
            title: chapter.title,
            url: chapter.url,
        }
    })

    posts.forEach((post) => {
        pages[post.url] = {
            title: post.title,
            url: post.url,
        }
    })

    pages['/'] = {
        title: 'Home',
        url: '/',
    }

    pages['/blog'] = {
        title: 'Blog',
        url: '/blog',
    }

    pages['/ajude'] = {
        title: 'Ajude',
        url: '/ajude',
    }

    pages['/pesquisa'] = {
        title: 'Pesquisa',
        url: '/pesquisa',
    }

    pages['/capitulos'] = {
        title: 'Capítulos',
        url: '/capitulos',
    }

    const breadcrumbs = []

    const urlParts = url === '/' ? [''] : String(url || '').split('/')

    let urlPath = ''

    urlParts.forEach((urlPart) => {
        if (urlPart == '') {
            if (pages['/']) breadcrumbs.push(pages['/'])
        } else if (urlPart) {
            urlPath += `/${urlPart}`
            const crumb = pages[urlPath]
            if (crumb) breadcrumbs.push(crumb)
        }
    })

    return breadcrumbs
}

export { getBreadcrumbs }

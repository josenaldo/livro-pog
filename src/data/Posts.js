import { compareDesc } from 'date-fns'

import { allPosts } from 'contentlayer/generated'

const getAllPosts = () => {
    return allPosts
}

const getSortedPosts = () => {
    return [...allPosts].sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })
}

const getAllPostsPaths = () => {
    const paths = allPosts.map((post) => post.url)
    return paths
}

const getPostData = (slug) => {
    if (!slug) return null

    const normalizedSlug = String(slug).replace(/^\/+/, '').replace(/^blog\//, '')
    const url = normalizedSlug.startsWith('blog/')
        ? `/${normalizedSlug}`
        : normalizedSlug.startsWith('/blog/')
            ? normalizedSlug
            : `/blog/${normalizedSlug}`

    const posts = getSortedPosts()
    const index = posts.findIndex((p) => p.url === url)
    if (index === -1) return null

    const current = posts[index]
    const isFirst = index === posts.length - 1
    const isLast = index === 0
    const previousPost = !isFirst ? posts[index + 1] : null
    const nextPost = !isLast ? posts[index - 1] : null

    return {
        ...current,
        previous: previousPost
            ? { url: previousPost.url, title: previousPost.title }
            : { url: '/blog' },
        next: nextPost ? { url: nextPost.url, title: nextPost.title } : { url: '/blog' },
    }
}

export { getAllPosts, getAllPostsPaths, getPostData, getSortedPosts }

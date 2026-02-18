import { compareDesc } from 'date-fns'

import { allPosts } from 'contentlayer/generated'

const getAllPosts = () => {
    return allPosts
}

const getSortedPosts = () => {
    const posts = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })

    return posts
}

const getAllPostsPaths = () => {
    const paths = allPosts.map((post) => post.url)
    return paths
}

const getPostData = (slug) => {
    const url = `/blog/${slug}`
    const posts = getSortedPosts()

    const post = posts.find((post, index, posts) => {
        if (post.url === url) {
            const isFirst = index === posts.length - 1
            const isLast = index === 0
            const previousPost = !isFirst ? posts[index + 1] : null
            const nextPost = !isLast ? posts[index - 1] : null

            if (previousPost) {
                post.previous = {
                    url: previousPost.url,
                    title: previousPost.title,
                }
            } else {
                post.previous = {
                    url: '/blog',
                }
            }

            if (nextPost) {
                post.next = {
                    url: nextPost.url,
                    title: nextPost.title,
                }
            } else {
                post.next = {
                    url: '/blog',
                }
            }
            return post
        }
    })

    return post
}

export { getAllPosts, getAllPostsPaths, getPostData,getSortedPosts }

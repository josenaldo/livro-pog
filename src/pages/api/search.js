import lunr from 'lunr'
import { getSortedChapters, getSortedPosts } from '@pog/data'

const handler = async (req, res) => {
    const { query, method } = req

    if (method !== 'GET') {
        return res.status(404).json({ message: 'Serviço não encontrado' })
    }

    const { q } = query

    if (!q) {
        return res.end(JSON.stringify([]))
    }

    try {
        const chapters = getSortedChapters()
        const posts = getSortedPosts()
        const documentList = chapters.map((chapter) => {
            return {
                url: chapter.url,
                title: chapter.title,
                description: chapter.description,
                content: chapter.body.raw,
                image: chapter.image,
                type: 'Capítulo',
            }
        })

        posts.forEach((post) => {
            documentList.push({
                url: post.url,
                title: post.title,
                description: post.description,
                content: post.body.raw,
                image: post.image,
                type: 'Post',
            })
        })

        const documents = documentList.reduce(function (memo, doc) {
            memo[doc.url] = {
                url: doc.url,
                title: doc.title,
                description: doc.description,
                image: doc.image,
                type: doc.type,
            }
            return memo
        }, {})

        const index = lunr(function () {
            this.ref('url')
            this.field('title')
            this.field('description')
            this.field('content')

            documentList.forEach(function (doc) {
                this.add(doc)
            }, this)
        })

        const results = index.search(q)

        const searchResults = results.map((result) => documents[result.ref])

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(searchResults))
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json(error)
    }
}

export default handler

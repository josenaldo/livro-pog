import { NextResponse } from 'next/server'

import lunr from 'lunr'

import { getSortedChapters, getSortedPosts } from '@pog/data'

export const runtime = 'nodejs'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')

    if (!q) {
        return NextResponse.json([])
    }

    try {
        const chapters = getSortedChapters()
        const posts = getSortedPosts()

        const documentList = chapters.map((chapter) => ({
            url: chapter.url,
            title: chapter.title,
            description: chapter.description,
            content: chapter.body.raw,
            image: chapter.image,
            type: 'Capítulo',
        }))

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

        const documents = documentList.reduce((memo, doc) => {
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

        return NextResponse.json(searchResults)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Erro ao processar busca' },
            { status: 500 }
        )
    }
}

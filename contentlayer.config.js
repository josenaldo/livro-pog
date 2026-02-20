import {
    defineDocumentType,
    makeSource,
} from 'contentlayer2/source-files'
const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `blog/**/*.md`,
    fields: {
        title: {
            type: 'string',
            description: 'The title of the post',
            required: true,
        },
        description: {
            type: 'string',
            description: 'The description of the post',
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the post',
            required: true,
        },
        author: {
            type: 'string',
            description: 'The author of the post',
            required: true,
        },
        icon: {
            type: 'string',
            description: 'The icon of the post (e.g., "tabler/IconRun")',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/${doc._raw.flattenedPath}`,
        },
        image: {
            type: 'string',
            resolve: (doc) => {
                const params = new URLSearchParams({ icon: doc.icon, title: doc.title, v: '2' })
                return `/api/og?${params.toString()}`
            },
        },
    },
}))

const Chapter = defineDocumentType(() => ({
    name: 'Chapter',
    filePathPattern: `capitulos/**/*.md`,
    fields: {
        title: {
            type: 'string',
            description: 'The title of the chapter',
            required: true,
        },
        description: {
            type: 'string',
            description: 'The description of the chapter',
            required: true,
        },
        date: {
            type: 'date',
            description: 'The date of the chapter',
            required: true,
        },
        sentence: {
            type: 'string',
            description: 'A small sentence',
            required: true,
        },
        order_number: {
            type: 'number',
            description: 'The order number of the chapter',
            required: true,
        },
        sentence_author: {
            type: 'string',
            description: 'The author of the sentence',
            required: true,
        },
        name: {
            type: 'string',
            description: 'The chapter internal name',
            required: true,
        },
        parent: {
            type: 'string',
            description: 'The chapter parent',
            required: false,
            default: null,
        },
        isParent: {
            type: 'boolean',
            description: 'If the chapter is a parent',
            required: false,
            default: false,
        },
        status: {
            type: 'enum',
            options: ['backlog', 'progress', 'review', 'done'],
            description: 'Status of the chapter',
            required: true,
        },
        icon: {
            type: 'string',
            description: 'The icon of the chapter (e.g., "tabler/IconBooks")',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/${doc._raw.flattenedPath}`,
        },
        image: {
            type: 'string',
            resolve: (doc) => {
                const params = new URLSearchParams({ icon: doc.icon, title: doc.title, v: '2' })
                return `/api/og?${params.toString()}`
            },
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post, Chapter],
})

import {
    defineDocumentType,
    makeSource,
    defineNestedType,
} from 'contentlayer/source-files'

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
        image: {
            type: 'string',
            description: 'The image of the post',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/${doc._raw.flattenedPath}`,
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
        image: {
            type: 'string',
            description: 'The image of the post',
            required: true,
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/${doc._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post, Chapter],
})

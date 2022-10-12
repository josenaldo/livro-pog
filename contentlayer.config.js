import {
    defineDocumentType,
    makeSource,
    defineNestedType,
} from 'contentlayer/source-files'

const Image = defineNestedType(() => ({
    name: 'Image',
    fields: {
        url: {
            type: 'string',
        },
        width: {
            type: 'string',
        },
        height: {
            type: 'string',
        },
    },
}))

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
            type: 'nested',
            of: Image,
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
    documentTypes: [Post],
})

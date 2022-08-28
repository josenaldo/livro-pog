import { MDXProvider } from '@mdx-js/react'

import externalLinks from 'rehype-external-links'
import rehypePrism from 'rehype-prism-plus'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Link, ResponsiveImage, Code } from '@pog/components/elements'

const MDXContent = ({ content }) => {
    const remarkPlugins = [
        [
            externalLinks,
            {
                target: '_blank',
                rel: ['nofollow', 'noopener', 'noreferrer'],
            },
        ],
        [rehypePrism],
    ]

    const rehypePlugins = [rehypeRaw]

    const components = {
        img: ResponsiveImage,
        a: Link,
        pre: Code,
    }

    return (
        <MDXProvider>
            <ReactMarkdown
                components={components}
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
            >
                {content}
            </ReactMarkdown>
        </MDXProvider>
    )
}

export { MDXContent }

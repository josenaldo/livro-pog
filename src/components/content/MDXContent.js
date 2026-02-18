import React from 'react'

import { Box, Divider } from '@mui/material'

import { MDXProvider } from '@mdx-js/react'
import { Remark } from 'react-remark'

import remarkGfm from 'remark-gfm'

import externalLinks from 'rehype-external-links'
import rehypePrism from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import rehypeCitation from 'rehype-citation'

import {
    Link,
    ResponsiveImage,
    Code,
    Blockquote,
} from '@pog/components/elements'

const MDXContent = ({ content }) => {
    const origin =
        typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_SITE_URL || ''

    const bibFile = `${origin}/data/bib/library.bib`
    const styleFile = `${origin}/data/bib/abnt.csl`
    const localeFile = `${origin}/data/bib/locales-pt-PT.xml`

    const remarkPlugins = [remarkGfm]

    const rehypePlugins = [
        rehypeRaw,
        [
            externalLinks,
            {
                target: '_blank',
                rel: ['nofollow', 'noopener', 'noreferrer'],
            },
        ],
        [
            rehypeCitation,
            {
                bibliography: bibFile,
                csl: styleFile,
                lang: localeFile,
                inlineClass: ['citation'],
            },
        ],
        rehypePrism,
    ]

    const components = {
        img: ResponsiveImage,
        a: Link,
        pre: Code,
        hr: Divider,
        blockquote: Blockquote,
        // Markdown wraps images in <p>, but ResponsiveImage renders a <div>.
        // Replace <p> with <div> when it contains block-level children to avoid
        // the invalid <p><div> nesting that causes hydration errors.
        p: ({ children, ...props }) => {
            const hasBlock = React.Children.toArray(children).some(
                (child) =>
                    React.isValidElement(child) && child.type === ResponsiveImage
            )
            return hasBlock ? (
                <div {...props}>{children}</div>
            ) : (
                <p {...props}>{children}</p>
            )
        },
    }

    return (
        <Box
            sx={{
                '& #refs': {
                    marginBlockStart: '1em',
                    marginBlockEnd: '1em',
                    paddingInlineStart: '40px',
                },
            }}
        >
            <MDXProvider>
                <Remark
                    remarkPlugins={remarkPlugins}
                    rehypePlugins={rehypePlugins}
                    remarkRehypeOptions={{
                        allowDangerousHtml: true,
                        footnoteLabel: 'Notas de rodapé',
                        footnoteBackLabel: 'Voltar ao conteúdo',
                    }}
                    rehypeReactOptions={{ components: components }}
                    onError={(error) => {
                        console.error(error)
                    }}
                >
                    {content}
                </Remark>
            </MDXProvider>
        </Box>
    )
}

export { MDXContent }

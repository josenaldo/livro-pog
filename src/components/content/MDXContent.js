import React from 'react'

import { Box, Divider } from '@mui/material'

import { MDXProvider } from '@mdx-js/react'
import { Remark } from 'react-remark'

import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'

import externalLinks from 'rehype-external-links'
import rehypePrism from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import { Cite, rehypeCitationGenerator } from 'rehype-citation'

import {
    Link,
    ResponsiveImage,
    Code,
    Blockquote,
} from '@pog/components/elements'

const rehypeCitation = rehypeCitationGenerator(Cite)

const MDXContent = ({ content }) => {
    const origin =
        typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_SITE_URL || ''

    const bibFile = `${origin}/data/bib/library.bib`
    const styleFile = `${origin}/data/bib/abnt.csl`
    const localeFile = `${origin}/data/bib/locales-pt-PT.xml`

    const remarkPlugins = [remarkParse, remarkGfm]

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

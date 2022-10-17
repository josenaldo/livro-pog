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

import { Link, ResponsiveImage, Code } from '@pog/components/elements'

const rehypeCitation = rehypeCitationGenerator(Cite)

const libDir = `${process.env.NEXT_PUBLIC_SITE_URL}/data/bib`
const bibFile = `${libDir}/library.bib`
const styleFile = `${libDir}/abnt.csl`
const localeFile = `${libDir}/locales-pt-PT.xml`

const MDXContent = ({ content }) => {
    const remarkPlugins = [
        remarkParse,
        remarkGfm,
        [
            externalLinks,
            {
                target: '_blank',
                rel: ['nofollow', 'noopener', 'noreferrer'],
            },
        ],
    ]

    const rehypePlugins = [
        rehypeRaw,
        [
            rehypeCitation,
            {
                bibliography: bibFile,
                csl: styleFile,
                lang: localeFile,
            },
        ],
        rehypePrism,
    ]

    const components = {
        img: ResponsiveImage,
        a: Link,
        pre: Code,
        hr: Divider,
    }

    return (
        <Box>
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

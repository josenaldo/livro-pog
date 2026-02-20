
'use client'

import * as React from 'react'
import * as prod from 'react/jsx-runtime'

import { Box, Divider } from '@mui/material'
import rehypeCitation from 'rehype-citation'
import externalLinks from 'rehype-external-links'
import rehypePrism from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import rehypeReact from 'rehype-react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import {
    Blockquote,
    Code,
    Link,
    ResponsiveImage,
} from '@pog/components/elements'

const MDXContent = ({ content }) => {
    const [renderedContent, setRenderedContent] = React.useState(null)

    React.useEffect(() => {
        if (!content) return

        const origin = window.location.origin
        const bibFile = `${origin}/data/bib/library.bib`
        const styleFile = `${origin}/data/bib/abnt.csl`
        const localeFile = `${origin}/data/bib/locales-pt-PT.xml`

        const components = {
            img: ({ node, ...props }) => <ResponsiveImage {...props} />,
            a: ({ node, ...props }) => <Link {...props} />,
            pre: ({ node, ...props }) => <Code {...props} />,
            hr: () => <Divider />,
            blockquote: ({ node, ...props }) => <Blockquote {...props} />,
            // Markdown wraps images in <p>, but ResponsiveImage renders a <div>.
            p: ({ node, children, ...props }) => {
                const hasBlock = React.Children.toArray(children).some(
                    (child) =>
                        React.isValidElement(child) &&
                        child.props?.src !== undefined
                )
                return hasBlock ? (
                    <div {...props}>{children}</div>
                ) : (
                    <p {...props}>{children}</p>
                )
            },
        }

        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {
                allowDangerousHtml: true,
                footnoteLabel: 'Notas de rodapé',
                footnoteBackLabel: 'Voltar ao conteúdo',
            })
            .use(rehypeRaw)
            .use(externalLinks, {
                target: '_blank',
                rel: ['nofollow', 'noopener', 'noreferrer'],
            })
            .use(rehypeCitation, {
                bibliography: bibFile,
                csl: styleFile,
                lang: localeFile,
                inlineClass: ['citation'],
            })
            .use(rehypePrism)
            .use(rehypeReact, {
                Fragment: prod.Fragment,
                jsx: prod.jsx,
                jsxs: prod.jsxs,
                components,
            })
            .process(content)
            .then((file) => setRenderedContent(file.result))
            .catch(console.error)
    }, [content])

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
            {renderedContent}
        </Box>
    )
}

export { MDXContent }

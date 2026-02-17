import React from 'react'

import { Box } from '@mui/material'

import { NextSeo } from 'next-seo'

import { Header, Footer, Breadcrumbs } from '@pog/components/template'

import { getBreadcrumbs } from '@pog/data'

const Layout = ({ title, description, icon, url, children }) => {
    const og = React.useMemo(() => {
        // Se tiver ícone, usa a URL da API de geração de OG image
        // Senão, usa a imagem padrão
        const ogImage = icon 
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?icon=${encodeURIComponent(icon)}&title=${encodeURIComponent(title)}`
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/default.jpg`

        const openGraph = {
            title: title,
            description: description,
            images: [
                {
                    url: ogImage,
                    width: '1200px',
                    height: '630px',
                    alt: title,
                },
            ],
        }
        return openGraph
    }, [title, description, icon])

    const breadcrumbsItems = React.useMemo(() => {
        return getBreadcrumbs(url)
    }, [url])

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >
            <NextSeo title={title} description={description} openGraph={og} />
            <Header />
            <Breadcrumbs items={breadcrumbsItems} />

            <main>{children}</main>
            <Footer />
        </Box>
    )
}

export { Layout }

import React from 'react'

import { Box } from '@mui/material'

import { NextSeo } from 'next-seo'

import { Header, Footer } from '@pog/components/template'

const Layout = ({ title, description, image, url, children }) => {
    const og = React.useMemo(() => {
        const openGraph = {
            title: title,
            description: description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}${image}`,
                    width: '1200px',
                    height: '630px',
                    alt: title,
                },
            ],
        }
        return openGraph
    }, [title, description, image])

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                color: 'text.primary',
            }}
        >
            <NextSeo title={title} description={description} openGraph={og} />
            <Header />
            <main>{children}</main>
            <Footer />
        </Box>
    )
}

export { Layout }

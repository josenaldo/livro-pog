import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import { SeoConfig } from '@pog/config'

import { ConfigProvider } from '@pog/contexts'
import { Layout } from '@pog/components/template'

const PogApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>
            <DefaultSeo {...SeoConfig} />
            <ConfigProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ConfigProvider>
        </>
    )
}

export default PogApp

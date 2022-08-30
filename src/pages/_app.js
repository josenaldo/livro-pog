import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import { SeoConfig } from '@pog/config'

import { ColorModeProvider } from '@pog/contexts'
import { Layout } from '@pog/components/template'

const PogApp = ({ Component, pageProps, chapters }) => {
    console.log('_APP', chapters)

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
            </Head>
            <DefaultSeo {...SeoConfig} />
            <ColorModeProvider>
                {/* <ThemeProvider theme={Theme}> */}
                {/* <CssBaseline /> */}
                <Layout chapters={chapters}>
                    <Component {...pageProps} />
                </Layout>
                {/* </ThemeProvider> */}
            </ColorModeProvider>
        </>
    )
}

export default PogApp

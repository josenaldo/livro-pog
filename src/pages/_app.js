import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import '@pog/styles/globals.css'

import { generateDefaultSeo } from 'next-seo/pages'
import { SeoConfig } from '@pog/config'

import { ConfigProvider } from '@pog/contexts'
import { Layout } from '@pog/components/template'

import { GA_TRACKING_ID, gaPageView } from '@pog/lib'

const PogApp = ({ Component, pageProps }) => {
    const router = useRouter()
    React.useEffect(() => {
        const handleRouteChange = (url) => {
            gaPageView(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];

                        function gtag(){dataLayer.push(arguments);}

                        gtag('js', new Date());

                        gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />

            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                {generateDefaultSeo(SeoConfig)}
            </Head>
            <ConfigProvider>
                <Component {...pageProps} />
            </ConfigProvider>
        </>
    )
}

export default PogApp

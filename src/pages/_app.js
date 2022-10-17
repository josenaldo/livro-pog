import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

import { DefaultSeo } from 'next-seo'
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
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-darcula.css"
                    integrity="sha512-GDAZ4WVai07by1+4lddBjO4anWI2wZFXT8gsfvahTctwsA/Qoe1GXkBpltYHCMvaLWA6L6eVdiF8Ky70Ssj3Fg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <DefaultSeo {...SeoConfig} />
            <ConfigProvider>
                <Component {...pageProps} />
            </ConfigProvider>
        </>
    )
}

export default PogApp

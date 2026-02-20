import { Suspense } from 'react'

import Script from 'next/script'

import { Footer, Header } from '@pog/components/template'
import { APP_DESCRIPTION, APP_TITLE, APP_URL } from '@pog/config'
import { GA_TRACKING_ID } from '@pog/lib'

import { Analytics } from './analytics'
import { BreadcrumbsAuto } from './breadcrumbs-auto'
import { Providers } from './providers'

import '../styles/prism-darcula.css'
import '../styles/globals.css'

const metadataBase = (() => {
    try {
        return APP_URL ? new URL(APP_URL) : undefined
    } catch {
        return undefined
    }
})()

export const metadata = {
    metadataBase,
    title: {
        default: APP_TITLE,
        template: '%s | Programação Orientada a Gambiarra',
    },
    description: APP_DESCRIPTION,
    alternates: metadataBase ? { canonical: metadataBase } : undefined,
    openGraph: {
        title: APP_TITLE,
        description: APP_DESCRIPTION,
        url: APP_URL,
        siteName: APP_TITLE,
        locale: 'pt_BR',
        type: 'website',
        images: [
            {
                url: '/images/default.jpg',
                width: 1200,
                height: 630,
                alt: APP_TITLE,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@josenaldomatos',
        site: '@josenaldomatos',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body suppressHydrationWarning>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                {GA_TRACKING_ID ? (
                    <>
                        <Script
                            id="gtag-stub"
                            strategy="beforeInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
`,
                            }}
                        />
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
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
`,
                            }}
                        />
                    </>
                ) : null}

                <Providers>
                    <Suspense fallback={null}>
                        <Analytics />
                    </Suspense>
                    <Header />
                    <BreadcrumbsAuto />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}

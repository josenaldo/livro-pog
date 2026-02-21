import { Suspense } from 'react'

import Script from 'next/script'

import { Footer, Header } from '@pog/components/template'
import { APP_DESCRIPTION, APP_IMAGE, APP_TITLE, APP_URL } from '@pog/config'
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
    manifest: '/manifest.json',
    applicationName: 'POG',
    description: APP_DESCRIPTION,
    authors: [{ name: 'Josenaldo de Oliveira Matos Filho', url: APP_URL }],
    creator: 'Josenaldo de Oliveira Matos Filho',
    publisher: 'Josenaldo de Oliveira Matos Filho',
    category: 'technology',
    appleWebApp: {
        capable: true,
        title: 'POG',
        statusBarStyle: 'default',
    },
    icons: {
        icon: [
            { url: '/icons/favicon.ico' },
            { url: '/icons/32x32-icon.png', sizes: '32x32', type: 'image/png' },
            { url: '/icons/192x192-icon.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: [{ url: '/icons/180x180-icon.png', sizes: '180x180', type: 'image/png' }],
    },
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
                url: APP_IMAGE,
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
        title: APP_TITLE,
        description: APP_DESCRIPTION,
        images: [APP_IMAGE],
    },
}

export const viewport = {
    themeColor: '#673ab7',
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
                            strategy="lazyOnload"
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                        />
                        <Script
                            id="gtag-init"
                            strategy="lazyOnload"
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

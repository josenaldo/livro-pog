import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="pt-BR">
            <Head>
                <link
                    rel="stylesheet"
                    href="/styles/prism-darcula.css"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

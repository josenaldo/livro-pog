import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-darcula.css"
                    integrity="sha512-GDAZ4WVai07by1+4lddBjO4anWI2wZFXT8gsfvahTctwsA/Qoe1GXkBpltYHCMvaLWA6L6eVdiF8Ky70Ssj3Fg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

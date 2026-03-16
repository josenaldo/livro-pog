import {
    AeoContent,
    DownloadSection,
    Features,
    Hero,
    homeFaqItems,
    LastNews,
    Testimonial,
} from '@pog/components/home'
import { StructuredDataScript } from '@pog/components/seo'
import { APP_IMAGE, APP_URL } from '@pog/config'
import { buildFaqSchema, buildWebPageSchema } from '@pog/lib'

export const metadata = {
    title: 'Livro POG: Programacao Orientada a Gambiarra',
    description:
        'Como transformar o seu trabalho em uma amostra grátis do inferno com histórias, técnicas e padrões de gambiarra aplicados ao caos real do desenvolvimento de software.',
    authors: [{ name: 'Josenaldo de Oliveira Matos Filho', url: APP_URL }],
    creator: 'Josenaldo de Oliveira Matos Filho',
    publisher: 'Josenaldo de Oliveira Matos Filho',
    openGraph: {
        type: 'website',
        title: 'Programação Orientada a Gambiarra',
        description:
            'Como transformar o seu trabalho em uma amostra grátis do inferno com histórias, técnicas e padrões de gambiarra aplicados ao caos real do desenvolvimento de software.',
        url: APP_URL,
        siteName: 'Programação Orientada a Gambiarra',
        locale: 'pt_BR',
        publishedTime: '2020-04-16T00:00:00.000Z',
        authors: ['Josenaldo de Oliveira Matos Filho'],
        images: [
            {
                url: APP_IMAGE,
                width: 1200,
                height: 630,
                alt: 'Programação Orientada a Gambiarra',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Programação Orientada a Gambiarra',
        description:
            'Como transformar o seu trabalho em uma amostra grátis do inferno com histórias, técnicas e padrões de gambiarra aplicados ao caos real do desenvolvimento de software.',
        images: [APP_IMAGE],
    },
}

export default function HomePage() {
    const pageSchema = buildWebPageSchema({
        title: 'Livro POG: Programacao Orientada a Gambiarra',
        description:
            'Como transformar o seu trabalho em uma amostra gratis do inferno com historias, tecnicas e padroes de gambiarra aplicados ao caos real do desenvolvimento de software.',
        pathname: '/',
    })
    const faqSchema = buildFaqSchema(homeFaqItems)

    return (
        <>
            <StructuredDataScript id="home-structured-data" data={[pageSchema, faqSchema]} />
            <Hero />
            <Features />
            <AeoContent />
            <Testimonial />
            <DownloadSection />
            <LastNews />
        </>
    )
}

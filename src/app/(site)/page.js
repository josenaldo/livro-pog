import {
    DownloadSection,
    Features,
    Hero,
    LastNews,
    Testimonial,
} from '@pog/components/home'
import { APP_IMAGE, APP_URL } from '@pog/config'

export const metadata = {
    title: 'Descubra os segredos dos maiores experts da indústria da programação!',
    description:
        'Como transformar o seu trabalho em uma amostra grátis do inferno com histórias, técnicas e padrões de gambiarra aplicados ao caos real do desenvolvimento de software.',
    authors: [{ name: 'Josenaldo de Oliveira Matos Filho', url: APP_URL }],
    creator: 'Josenaldo de Oliveira Matos Filho',
    publisher: 'Josenaldo de Oliveira Matos Filho',
    openGraph: {
        type: 'article',
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
    return (
        <>
            <Hero />
            <Features />
            <Testimonial />
            <DownloadSection />
            <LastNews />
        </>
    )
}

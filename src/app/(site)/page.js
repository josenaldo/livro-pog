import {
    DownloadSection,
    Features,
    Hero,
    LastNews,
    Testimonial,
} from '@pog/components/home'

export const metadata = {
    title: 'Descubra os segredos dos maiores experts da indústria da programação!',
    description: 'Como transformar o seu trabalho em uma amostra grátis do inferno!',
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

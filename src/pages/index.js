import { Layout } from '@pog/components/template'

import {
    Hero,
    Features,
    Testimonial,
    DownloadSection,
    LastNews,
} from '@pog/components/home'

const Home = () => {
    return (
        <Layout
            title="Descubra os segredos dos maiores experts da indústria da programação!"
            description="Como transformar o seu trabalho em uma amostra grátis do inferno!"
            image="/images/pages/default.jpg"
            url="/"
        >
            <Hero />
            <Features />
            <Testimonial />
            <DownloadSection />
            <LastNews />
        </Layout>
    )
}

export default Home

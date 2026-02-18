import {
    DownloadSection,
    Features,
    Hero,
    LastNews,
    Testimonial,
} from '@pog/components/home'
import { Layout } from '@pog/components/template'

const Home = () => {
    return (
        <Layout
            title="Descubra os segredos dos maiores experts da indústria da programação!"
            description="Como transformar o seu trabalho em uma amostra grátis do inferno!"
            icon="tabler/IconBooks"
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

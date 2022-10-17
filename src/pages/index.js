import { Layout } from '@pog/components/template'

import { Hero, Features, Testimonial, LastNews } from '@pog/components/home'

const Home = () => {
    return (
        <Layout
            title="Programação Orientada a Gambiarra"
            description="Como transformar o seu trabalho em uma amostra grátis do inferno!"
            image="/images/pages/default.jpg"
            url="/"
        >
            <Hero />
            <Features />
            <Testimonial />
            <LastNews />
        </Layout>
    )
}

export default Home

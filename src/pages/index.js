import { Box } from '@mui/material'

import { Layout } from '@pog/components/template'

import { Hero, Features, Testimonial, LastNews } from '@pog/components/home'

const Home = () => {
    return (
        <Layout>
            <Hero />
            <Features />
            <Testimonial />
            <LastNews />
        </Layout>
    )
}

export default Home

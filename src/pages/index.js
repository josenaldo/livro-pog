import { Box } from '@mui/material'

import { Hero, Features, Testimonial, LastNews } from '@pog/components/home'

const Home = () => {
    return (
        <Box>
            <Hero />
            <Features />
            <Testimonial />
            <LastNews />
        </Box>
    )
}

export default Home

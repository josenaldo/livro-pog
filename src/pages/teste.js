import { Box, Container, Button } from '@mui/material'

import { NextSeo } from 'next-seo'

const Teste = () => {
    const videoId = 'FP9I_07p2dY'

    return (
        <Container>
            <NextSeo title="Teste" />
            <Box
                sx={{
                    gap: 2,
                    display: 'flex',
                }}
            >
                <Button variant="contained" color="primary" href="/">
                    Voltar
                </Button>
            </Box>
        </Container>
    )
}

export default Teste

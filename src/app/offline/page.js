import { Box, Button, Container, Typography } from '@mui/material'

export const metadata = {
    title: 'Offline',
    robots: { index: false, follow: false },
}

export default function OfflinePage() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '60vh',
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h3" component="h1">
                    Sem internet no momento
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    O app está offline. Os capítulos já baixados continuam disponíveis e você pode voltar para o
                    índice do livro para tentar abrir outro conteúdo em cache.
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button href="/capitulos" variant="contained">
                        Ir para capítulos
                    </Button>
                    <Button href="/" variant="outlined">
                        Ir para início
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

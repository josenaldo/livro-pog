import * as React from 'react'

import DownloadIcon from '@mui/icons-material/Download'
import { Box, Button, Container, Paper, Typography } from '@mui/material'

import { ContentTitle } from '@pog/components/content'

const DownloadSection = () => {
    return (
        <Paper
            sx={{

                width: '100%',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 5,
                    gap: 3,
                }}
            >
                <ContentTitle
                    title="Baixe o Livro Completo"
                    titleVariant="h2"
                    sx={{ color: 'primary.contrastText' }}
                />

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.primary',
                        textAlign: 'center',
                        maxWidth: '800px',
                        mb: 2,
                    }}
                >
                    Leve a sabedoria da POGramação para onde quiser! Baixe o
                    livro completo em PDF ou EPUB e tenha acesso offline a
                    todos os capítulos, técnicas e Gambi Design Patterns.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<DownloadIcon />}
                        href="/downloads/livro-pog.pdf"
                        download
                        sx={{
                            minWidth: '200px',
                        }}
                    >
                        Baixar PDF
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<DownloadIcon />}
                        href="/downloads/livro-pog.epub"
                        download
                        sx={{
                            minWidth: '200px',
                        }}
                    >
                        Baixar EPUB
                    </Button>
                </Box>
            </Container>
        </Paper>
    )
}

export { DownloadSection }

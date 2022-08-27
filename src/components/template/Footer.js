import { Container, Box, Typography, IconButton, Stack } from '@mui/material'

import HandshakeIcon from '@mui/icons-material/Handshake'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

import { useColorMode } from '@pog/contexts'

const iconColor = 'text.primary'
const textColor = 'text.primary'

const Footer = () => {
    const { colorMode, COLOR_MODES } = useColorMode()

    return (
        <Box
            component="footer"
            elevation={12}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2,
                backgroundColor: 'background.cover',
            }}
        >
            <Container
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'flex-Start',
                    justifyContent: 'center',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="footerH2">
                        Encontre esse projeto no Github
                    </Typography>

                    <FooterIcon
                        targetBlank
                        href="https://github.com/josenaldo/livro-pog/"
                        icon={<GitHubIcon />}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="footerH2">
                        Ajude esse projeto
                    </Typography>
                    <FooterIcon href="/ajude" icon={<HandshakeIcon />} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="footerH2">
                        Quer falar comigo?
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                        }}
                    >
                        <FooterIcon
                            targetBlank
                            href="https://github.com/josenaldo"
                            icon={<GitHubIcon />}
                        />
                        <FooterIcon
                            targetBlank
                            href="mailto:josenaldo@gmail.com"
                            icon={<EmailIcon />}
                        />

                        <FooterIcon
                            targetBlank
                            href="https://twitter.com/vudureverso"
                            icon={<TwitterIcon />}
                        />
                        <FooterIcon
                            targetBlank
                            href="https://linkedin.com/in/josenaldo"
                            icon={<LinkedInIcon />}
                        />

                        <FooterIcon
                            targetBlank
                            href="https://facebook.com/josenaldo.matos"
                            icon={<FacebookIcon />}
                        />

                        <FooterIcon
                            targetBlank
                            href="https://instagram.com/vudureverso"
                            icon={<InstagramIcon />}
                        />
                    </Box>
                </Box>
            </Container>
            <Typography
                variant="caption"
                padding="20px"
                mb={2}
                color={textColor}
            >
                Copyright © 2021 - Vudu Reverso - Tudo nessa porra é reservado
            </Typography>
        </Box>
    )
}

const FooterIcon = ({ href, icon, targetBlank = false }) => {
    return (
        <IconButton
            href={href}
            target={targetBlank ? '_blank' : '_self'}
            sx={{
                '& svg': {
                    fontSize: '48px',
                    color: iconColor,
                },
            }}
        >
            {icon}
        </IconButton>
    )
}

export { Footer }

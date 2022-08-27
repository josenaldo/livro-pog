import { Container, Box, Typography, IconButton, Stack } from '@mui/material'

import HandshakeIcon from '@mui/icons-material/Handshake'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

import { useColorMode } from '@pog/contexts'
const Footer = () => {
    const { colorMode } = useColorMode()
    const iconColor = 'secondary.contrastTextColor.darker'
    const textColor = 'secondary.contrastTextColor.darker'

    return (
        <Box
            elevation={12}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2,
                backgroundColor:
                    colorMode === 'dark'
                        ? 'background.paper'
                        : 'secondary.dark',
            }}
        >
            <Container
                component="footer"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'flex-Start',
                    justifyContent: 'center',
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
                    <IconButton>
                        <GitHubIcon
                            sx={{ fontSize: '48px', color: iconColor }}
                        />
                    </IconButton>
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
                    <IconButton>
                        <HandshakeIcon
                            color={iconColor}
                            sx={{ fontSize: '48px', color: iconColor }}
                        />
                    </IconButton>
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
                            gridTemplateColumns: {
                                xs: '1fr 1fr',
                                md: '1fr 1fr 1fr',
                            },
                        }}
                    >
                        <IconButton href="https://github.com/josenaldo">
                            <GitHubIcon
                                sx={{ fontSize: '48px', color: iconColor }}
                            />
                        </IconButton>
                        <IconButton href="mailto:josenaldo@gmail.com">
                            <EmailIcon
                                sx={{ fontSize: '48px', color: iconColor }}
                            />
                        </IconButton>
                        <IconButton href="https://twitter.com/vudureverso">
                            <TwitterIcon
                                sx={{ fontSize: '48px', color: iconColor }}
                            />
                        </IconButton>
                        <IconButton href="https://linkedin.com/in/josenaldo">
                            <LinkedInIcon
                                sx={{ fontSize: '48px', color: iconColor }}
                            />
                        </IconButton>
                        <IconButton href="https://facebook.com/josenaldo.matos">
                            <FacebookIcon
                                sx={{ fontSize: '48px', color: iconColor }}
                            />
                        </IconButton>
                        <IconButton href="https://instagram.com/vudureverso">
                            <InstagramIcon
                                sx={{ fontSize: '48px', color: iconColor }}
                            />
                        </IconButton>
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

export { Footer }

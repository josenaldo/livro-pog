import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import HandshakeIcon from '@mui/icons-material/Handshake'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { IconBrandBluesky, IconBrandGithub, IconBrandGithubFilled, IconBrandLinkedinFilled, IconGlobeFilled, IconHeartHandshake, IconMail, IconMailFilled, IconRecordMail } from '@tabler/icons-react'

const iconColor = 'text.secondary'
const textColor = 'text.secondary'

const Footer = () => {
    return (
        <Box
            component="footer"
            elevation={12}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2,
                backgroundColor: 'background.paper',
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
                    <Typography variant="footerH2" color={textColor}>
                        Encontre esse projeto no Github
                    </Typography>

                    <FooterIcon
                        targetBlank
                        href="https://github.com/josenaldo/livro-pog-1/"
                        icon={<IconBrandGithubFilled size={48} />}
                        label="Repositório do projeto no GitHub"
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
                    <Typography variant="footerH2" color={textColor}>
                        Ajude esse projeto
                    </Typography>
                    <FooterIcon href="/ajude" icon={<IconHeartHandshake size={48} />} label="Ajude esse projeto" />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="footerH2" color={textColor}>
                        Quer falar comigo?
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                        }}
                    >
                        <FooterIcon
                            targetBlank
                            href="https://github.com/josenaldo"
                            icon={<IconBrandGithubFilled />}
                            label="GitHub de Josenaldo Matos"
                        />
                        <FooterIcon
                            targetBlank
                            href="mailto:josenaldo@gmail.com"
                            icon={<IconMailFilled />}
                            label="Enviar e-mail para Josenaldo"
                        />

                        <FooterIcon
                            targetBlank
                            href="https://bsky.app/profile/josenaldo.com.br"
                            icon={<IconBrandBluesky />}
                            label="Bluesky de Josenaldo Matos"
                        />
                        <FooterIcon
                            targetBlank
                            href="https://linkedin.com/in/josenaldo"
                            icon={<IconBrandLinkedinFilled />}
                            label="LinkedIn de Josenaldo Matos"
                        />

                        <FooterIcon
                            targetBlank
                            href="https://josenaldo.com.br"
                            icon={<IconGlobeFilled />}
                            label="Site de Josenaldo Matos"
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

const FooterIcon = ({ href, icon, targetBlank = false, label }) => {
    return (
        <IconButton
            href={href}
            target={targetBlank ? '_blank' : '_self'}
            aria-label={label}
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

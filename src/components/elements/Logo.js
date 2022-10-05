import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { useColorMode } from '@pog/contexts'

const Logo = () => {
    const { colorMode, COLOR_MODES } = useColorMode()
    return (
        <Link href="/" passHref>
            <Box
                component="a"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <Image
                    src={`/images/logo/brand-${colorMode}.png`}
                    alt="Logo do livro Programação Orientada a Gambiarra"
                    width="48px"
                    height="48px"
                />
                <Typography
                    color="text.primary"
                    fontWeight="bold"
                    sx={{
                        mx: 1,
                    }}
                >
                    POG
                </Typography>
            </Box>
        </Link>
    )
}

export { Logo }

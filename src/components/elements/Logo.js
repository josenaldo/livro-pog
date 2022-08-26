import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

const Logo = () => {
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
                    src="/images/logo/brand.png"
                    alt="Logo do livro Programação Orientada a Gambiarra"
                    width="48px"
                    height="48px"
                />
                <Typography fontWeight="bold">POG</Typography>
            </Box>
        </Link>
    )
}

export { Logo }

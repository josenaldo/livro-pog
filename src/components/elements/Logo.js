'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Box, Typography } from '@mui/material'

import { useConfig } from '@pog/contexts'

const Logo = ({ textColor = 'text.primary', logoColor }) => {
    const { colorMode } = useConfig()

    const logoStyle = logoColor ? logoColor : colorMode
    return (
        <Link href="/"
            style={{
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Image
                    src={`/images/logo/brand-${logoStyle}.png`}
                    alt="Logo do livro Programação Orientada a Gambiarra"
                    width={48}
                    height={48}
                />
                <Typography
                    color={textColor}
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

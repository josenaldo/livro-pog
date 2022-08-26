import Image from 'next/image'
import { Box } from '@mui/material'

const Logo = () => {
    return (
        <Box component="header">
            <Image
                src="/images/logo/brand.png"
                alt="Logo do livro Programação Orientada a Gambiarra"
                width="48px"
                height="48px"
            />
        </Box>
    )
}

export { Logo }

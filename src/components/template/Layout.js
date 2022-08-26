import React from 'react'

import { Box } from '@mui/material'
import { Header, Footer } from '@pog/components/template'

const Layout = ({ children }) => {
    return (
        <Box>
            <Header />
            <main>{children}</main>
            <Footer />
        </Box>
    )
}

export { Layout }

import React from 'react'

import { Box } from '@mui/material'
import { Header, Footer } from '@ciro/components/templates'

const Layout = ({ children }) => {
    return (
        <Box>
            <Header>Header 2</Header>
            <main>{children}</main>
            <Footer>Footer 2</Footer>
        </Box>
    )
}

export { Layout }

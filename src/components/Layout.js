import React from 'react'

import { Box } from '@mui/material'

const Layout = ({ children }) => {
    return (
        <>
            <Box />
            <main>{children}</main>
            <Box />
        </>
    )
}

export { Layout }

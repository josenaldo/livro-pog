'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import { ConfigProvider } from '@pog/contexts'

export function Providers({ children }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ConfigProvider>{children}</ConfigProvider>
        </AppRouterCacheProvider>
    )
}

'use client'

import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { gaPageView } from '@pog/lib'

export function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const search = searchParams?.toString()
        const url = search ? `${pathname}?${search}` : pathname
        gaPageView(url)
    }, [pathname, searchParams])

    return null
}

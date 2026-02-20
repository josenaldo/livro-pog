'use client'

import { useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { Breadcrumbs } from '@pog/components/template'
import { getBreadcrumbs } from '@pog/data'

export function BreadcrumbsAuto() {
    const pathname = usePathname() || '/'

    const items = useMemo(() => {
        return getBreadcrumbs(pathname)
    }, [pathname])

    return <Breadcrumbs items={items} />
}

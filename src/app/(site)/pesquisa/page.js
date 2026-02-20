import { Suspense } from 'react'

import { SearchPageClient } from './search-client'

export const metadata = {
    title: 'Pesquisa',
    description: 'Pesquise por termos no livro Programação Orientada a Gambiarra.',
}

export default function PesquisaPage() {
    return (
        <Suspense fallback={null}>
            <SearchPageClient />
        </Suspense>
    )
}

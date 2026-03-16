import { Suspense } from 'react'

import { StructuredDataScript } from '@pog/components/seo'
import { buildWebPageSchema } from '@pog/lib'

import { SearchPageClient } from './search-client'

export const metadata = {
    title: 'Pesquisa no Livro POG',
    description: 'Pesquise por termos no livro Programação Orientada a Gambiarra.',
}

export default function PesquisaPage() {
    const pageSchema = buildWebPageSchema({
        title: 'Pesquisa no Livro POG',
        description: 'Pesquise por termos no livro Programacao Orientada a Gambiarra.',
        pathname: '/pesquisa',
    })

    return (
        <>
            <StructuredDataScript id="search-page-structured-data" data={pageSchema} />
            <Suspense fallback={null}>
                <SearchPageClient />
            </Suspense>
        </>
    )
}

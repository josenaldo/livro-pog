/**
 * Gera a URL da OG image dinâmica para um conteúdo com ícone.
 * A URL é estável e cacheável: parâmetros únicos = chave única de cache.
 *
 * @param {string} icon  - Nome do ícone, ex: 'tabler/IconRun'
 * @param {string} title - Título do conteúdo (opcional)
 * @returns {string|null}
 */
const getOgImageUrl = (icon, title = '') => {
    if (!icon) return null
    const params = new URLSearchParams({ icon, title, v: '2' })
    return `/api/og?${params.toString()}`
}

export { getOgImageUrl }

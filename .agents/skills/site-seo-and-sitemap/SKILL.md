---
name: site-seo-and-sitemap
description: Maintain SEO metadata and sitemap/robots generation for this Next.js static site. Use when changing titles/descriptions/OG images, canonical URLs, NEXT_PUBLIC_SITE_URL, next-seo configuration, or when adding sitemap.xml/robots.txt via next-sitemap.
---

# site-seo-and-sitemap

Guia prático para manter SEO consistente em build estático.

## Objetivo

- Garantir metas (title/description/canonical/OG/Twitter) coerentes em todas as páginas.
- Manter sitemap e robots coerentes com a URL pública final.

## Quando usar (gatilhos)

- “Atualize Open Graph”, “corrija canonical”, “melhore SEO”, “adicione sitemap/robots”.
- Mudanças em `NEXT_PUBLIC_SITE_URL`, `src/data/SeoConfig.js`, `src/layouts/AppLayout.js`, `next-sitemap.config.js`.
- Problemas em preview/prod: OG com URL errada, ícones quebrados, canonical vazio.

## Exemplos de prompt

- “A imagem de preview do LinkedIn está errada; corrija OG.”
- “Gere `sitemap.xml` e `robots.txt` no build.”
- “Padronize title/description/canonical por página.”

## Inputs (o que pedir ao usuário)

- URL pública final (ex.: `https://josenaldo.github.io`).
- Para mudanças por página: quais rotas e quais títulos/descrições.

## Princípios e regras

### Crítico (não negociar)

- `NEXT_PUBLIC_SITE_URL` deve existir no build (local e CI). Ele alimenta `SeoConfig` e OG images.
- Canonical e OG devem ser URLs absolutas em produção.
- Para site exportado, arquivos gerados (`sitemap.xml`, `robots.txt`) precisam cair em `public/` (para serem exportados) ou no diretório final publicado.

### Padrões recomendados

- Centralizar defaults em `src/data/SeoConfig.js` (via `DefaultSeo` em `_app.js`).
- Para páginas específicas, usar `NextSeo` no layout/página (já existe em `AppLayout`).

## Workflow (faça em ordem)

1) Confirmar URL do site
- Definir/validar `NEXT_PUBLIC_SITE_URL`.
- Para dev local, considerar `.env.local` (não commitar secrets).

2) Revisar defaults
- Conferir `src/data/SeoConfig.js`: `canonical`, `openGraph.url`, `images.url`, ícones em `additionalLinkTags`.

3) Revisar por página
- Onde existir `AppLayout`, garantir `title`, `description`, `image` coerentes.
- Evitar meta duplicada/ruim em `_app.js` (o `Head` do template do Next pode conflitar com `DefaultSeo`).

4) Sitemap e robots
- Config em `next-sitemap.config.js` já existe.
- Se `sitemap.xml`/`robots.txt` não estiverem sendo gerados, adicionar execução do `next-sitemap` no pipeline (por exemplo, `postbuild`).

5) Validar
- Rodar `npm run build` e verificar se os arquivos finais estão no output publicado.

## Saída esperada

- Patch com ajustes em SEO (config/layout) e instruções claras para setar `NEXT_PUBLIC_SITE_URL`.
- Se solicitado, incluir ajuste no build para gerar sitemap/robots.

## Checklist

- [ ] `NEXT_PUBLIC_SITE_URL` definido para dev e CI.
- [ ] Canonical/OG usam URLs absolutas.
- [ ] Preview (Open Graph) aponta para imagem válida.
- [ ] Sitemap/robots gerados e publicados.

## Consulte também

- `web-design-guidelines` (skill instalada)

Describe when this skill should be used.

## Instructions

1. First step
2. Second step
3. Additional steps as needed

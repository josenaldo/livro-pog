---
name: site-nextjs-static-export
description: "Build, troubleshoot, and modernize this repository's Next.js static export pipeline (output: 'export') and GitHub Pages deploy workflow. Use when the user mentions GitHub Pages, static export, the out/ folder, next build/export errors, basePath/assetPrefix issues, or CI workflow fixes."
---

# site-nextjs-static-export

Workflow and guardrails for building and deploying this repo as a static Next.js site.

## Objetivo

- Produzir um build estável (local e CI) para `output: 'export'`.
- Garantir que o workflow de deploy publique corretamente o diretório `out/`.

## Quando usar (gatilhos)

- “O build no GitHub Actions falhou”, “GitHub Pages não atualiza”, “404 em assets”.
- “Quero exportar o site”, “preciso do `out/`”, “Next.js export/static”.
- Ajustes em `.github/workflows/nextjs.yml`, `next.config.js`, cache do Actions.

## Exemplos de prompt

- “Corrija o workflow para publicar o `out/` corretamente.”
- “O site no GitHub Pages está sem CSS/imagens; revise `basePath/assetPrefix`.”
- “Padronize o build local e no CI (Contentlayer + Next).”

## Inputs (o que pedir ao usuário)

- Onde vai rodar: GitHub Pages (user page vs project page) ou outro host estático.
- URL pública final (ex.: `https://josenaldo.github.io`) para `NEXT_PUBLIC_SITE_URL`.
- Erro completo do Actions (log) ou comando local que falhou.

## Princípios e regras

### Crítico (não negociar)

- Para este repo, o build deve considerar Contentlayer: prefira `npm run build` (ver `package.json`) em vez de `next build` direto.
- Para deploy estático, publique o `out/` gerado pelo Next (`output: 'export'`).
- Qualquer link/canonical/OG que use `NEXT_PUBLIC_SITE_URL` precisa de valor correto no CI.

### Padrões recomendados

- Sempre validar com `npm run lint` e `npm run build` antes de mexer no workflow.
- Evitar mudanças de `basePath` quando o deploy é “user page” (`username.github.io`).

## Decision Tree

1) O deploy é “user page” (`username.github.io`) ou “project page” (`username.github.io/repo`)?
- User page → normalmente `basePath` vazio.
- Project page → pode exigir `basePath` e ajuste de links/rotas.

2) O erro é no CI ou só em produção?
- CI → focar em Node/cache/commands/env vars.
- Produção → focar em `NEXT_PUBLIC_SITE_URL`, caminhos absolutos, sitemap/robots, assets.

## Workflow (faça em ordem)

1) Reproduzir localmente
- Rodar `npm ci` (ou `npm install`) e `npm run build`.
- Confirmar que existe `out/` após o build.

2) Confirmar invariantes do Next export
- `next.config.js` deve manter `output: 'export'`.
- `images.unoptimized: true` faz sentido para export estático.

3) Ajustar CI/Actions
- No workflow, usar o script do projeto (`npm run build`) para incluir Contentlayer.
- Publicar `./out` com `actions/upload-pages-artifact`.

4) Validar
- Re-executar o workflow (ou simular via `npm run build`).
- Conferir que a URL final e assets renderizam (CSS, imagens, OG).

## Saída esperada

- Patch com ajustes em workflow/config e um checklist de validação.
- Se houver falha: diagnóstico com a causa provável + correção mínima.

## Checklist

- [ ] `npm run build` gera `out/`.
- [ ] Workflow publica `out/`.
- [ ] `NEXT_PUBLIC_SITE_URL` está definido no ambiente de build.
- [ ] Não há 404 em assets (CSS/JS/imagens) em produção.

## Limitações e recomendações futuras

- Este skill assume deploy estático (sem SSR/API Routes). Para SSR, é outro pipeline.

## Consulte também

- `vercel-react-best-practices` (skill instalada)
- `web-design-guidelines` (skill instalada)

---
name: site-nextjs-static-export
description: "Build, troubleshoot, and modernize this repository's Next.js build pipeline (Next.js + Contentlayer + next-sitemap + next-pwa). Use when the user mentions build errors, dependency upgrades, env vars (NEXT_PUBLIC_SITE_URL), sitemap/robots generation, PWA issues, or deployment mismatches."
---

# site-nextjs-static-export

Workflow and guardrails for building and deploying this repo (Vercel-style Next.js app).

## Objetivo

- Produzir um build estável (local e CI) via `npm run build`.
- Garantir que variáveis de ambiente e geração de artefatos (ex.: sitemap) estejam consistentes.

## Quando usar (gatilhos)

- “O build falhou”, “subiu mas está com SEO errado”, “sitemap não aparece”, “PWA quebrou”.
- “Vou modernizar Next.js/deps e preciso de um checklist de riscos.”
- Ajustes em `next.config.js`, `next-sitemap.config.js`, `.env.*`, pipeline de CI (se existir).

## Exemplos de prompt

- “O `npm run build` quebrou depois do upgrade; encontre a causa e corrija.”
- “O sitemap/robots não estão sendo gerados; revise `next-sitemap` e o `postbuild`.”
- “Padronize build local e no CI (Contentlayer + Next + next-sitemap).”

## Inputs (o que pedir ao usuário)

- Onde vai rodar: Vercel (atual) ou outro host.
- URL pública final (ex.: `https://livropog.com.br`) para `NEXT_PUBLIC_SITE_URL`.
- Erro completo do CI/log ou comando local que falhou.

## Princípios e regras

### Crítico (não negociar)

- Para este repo, o build deve considerar Contentlayer e postbuild do sitemap: prefira `npm run build` (ver `package.json`) em vez de `next build` direto.
- Qualquer link/canonical/OG que use `NEXT_PUBLIC_SITE_URL` precisa de valor correto no CI.

### Padrões recomendados

- Sempre validar com `npm run lint` e `npm run build` antes de mexer no workflow.
- Evitar mudanças de `basePath`/`assetPrefix` sem uma necessidade clara (quebra links facilmente).

## Decision Tree

1) O erro é no CI ou só em produção?
- CI → focar em Node/cache/commands/env vars.
- Produção → focar em `NEXT_PUBLIC_SITE_URL`, caminhos absolutos, sitemap/robots, assets.

## Workflow (faça em ordem)

1) Reproduzir localmente
- Rodar `npm ci` (ou `npm install`) e `npm run build`.
- Confirmar que o build termina sem erros.

2) Confirmar invariantes do projeto
- `contentlayer.config.js` e `next.config.js` precisam estar compatíveis com a versão do Next.
- `next-pwa` e `next-sitemap` precisam ser compatíveis com a versão do Next.

3) Ajustar CI/deploy (quando aplicável)
- Usar o script do projeto (`npm run build`) para incluir Contentlayer e `postbuild` do `next-sitemap`.
- Garantir `NEXT_PUBLIC_SITE_URL` no ambiente de build.

4) Validar
- Re-executar o workflow (ou simular via `npm run build`).
- Conferir que a URL final e assets renderizam (CSS, imagens, OG).

## Saída esperada

- Patch com ajustes em workflow/config e um checklist de validação.
- Se houver falha: diagnóstico com a causa provável + correção mínima.

## Checklist

- [ ] `npm run build` passa.
- [ ] `NEXT_PUBLIC_SITE_URL` está definido no ambiente de build.
- [ ] `sitemap.xml`/`robots.txt` são gerados (via `postbuild`).

## Limitações e recomendações futuras

Este skill não cobre migração para App Router/RSC; use uma skill de upgrade/migração quando for o momento.

## Consulte também

- `vercel-react-best-practices` (skill instalada)
- `web-design-guidelines` (skill instalada)

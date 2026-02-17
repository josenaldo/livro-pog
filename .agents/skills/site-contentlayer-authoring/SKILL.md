---
name: site-contentlayer-authoring
description: Authoring and maintenance workflow for this repo's Contentlayer content (content/*). Use when adding/editing blog posts or chapters; when frontmatter is missing/broken; or when Contentlayer build fails.
---

# site-contentlayer-authoring

Este repositório usa `contentlayer` (via `next-contentlayer`) para gerar tipos a partir de Markdown em `content/`.

## Objetivo

- Criar/atualizar conteúdo Markdown sem quebrar o schema do Contentlayer.
- Manter consistência de frontmatter e URLs computadas.

## Quando usar (gatilhos)

- “Adicione um post no blog”, “crie uma nova página”, “inclua um projeto”.
- Erros de build do tipo “missing required field” / “Contentlayer build failed”.
- Ajustes em `contentlayer.config.js` ou nas pastas `content/**`.

## Exemplos de prompt

- “Crie um novo post em `content/blog` com frontmatter correto.”
- “Estou recebendo erro de frontmatter; encontre o arquivo e corrija.”
- “Adicione uma experiência e faça aparecer no currículo.”

## Inputs (o que pedir ao usuário)

- Tipo de conteúdo: `Post` (blog) ou `Chapter` (capítulos).
- Path/slug desejado e imagens (se houver).
- Para mudanças de schema: quais campos novos e se são `required`.

## Princípios e regras

### Crítico (não negociar)

- Respeitar campos `required: true` definidos em `contentlayer.config.js`.
- Não alterar o schema sem ajustar todos os documentos impactados.
- Manter URLs consistentes com os `computedFields` (não “inventar” rotas).

### Padrões recomendados

- Preferir datas ISO no frontmatter quando o tipo for `date`.
- Manter imagens como paths estáticos (normalmente em `public/`).

## Cheat sheet: frontmatter por tipo

Fonte: `contentlayer.config.js`.

### Post (`content/blog/**/*.md`)

- `title` (string)
- `description` (string)
- `date` (date)
- `author` (string)
- `image` (string)

URL computada: `/${flattenedPath}` (ex.: `/blog/meu-post`).

### Chapter (`content/capitulos/**/*.md`)

- `title` (string)
- `description` (string)
- `date` (date)
- `sentence` (string)
- `order_number` (number)
- `sentence_author` (string)
- `name` (string)
- `status` (enum: `backlog` | `progress` | `review` | `done`)
- `image` (string)

Opcionais:

- `parent` (string | null; default `null`)
- `isParent` (boolean; default `false`)

## Workflow (faça em ordem)

1) Identificar tipo e arquivo
- Confirmar em qual pasta o conteúdo vive.

2) Criar/editar o Markdown
- Garantir todos os campos `required` no frontmatter.
- Se adicionar imagem, usar path absoluto do site (ex.: `/images/...`) quando apropriado.

3) Validar localmente
- Rodar `npm run dev` para validação rápida (Contentlayer + Next em watch).
- Ou rodar `npm run build` para validação completa.

4) Ajustar onde o conteúdo aparece (se necessário)
- Se o conteúdo não renderizar, localizar o `contentService`/página correspondente e validar filtros (ex.: `show`, `pin`).

## Saída esperada

- Patch com o Markdown corrigido/criado e, se necessário, ajustes mínimos no código de listagem.

## Checklist

- [ ] Frontmatter completo e tipos corretos.
- [ ] `npm run dev` sobe sem erro de Contentlayer.
- [ ] `npm run build` passa.

## Limitações e recomendações futuras

- Este skill não cobre migração para MDX/RSC/App Router; é focado no setup atual.

## Consulte também

- `site-nextjs-static-export` (skill do repo)
- `level` (string)

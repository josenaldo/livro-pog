---
name: site-frontmatter-qc
description: Checagem e padronização de frontmatter/metadata para arquivos Markdown em `content/**` conforme Contentlayer2. Use esta skill quando o usuário pedir para padronizar campos obrigatórios, corrigir erros de build do Contentlayer, ajustar categorias/imagens/URLs, ou fazer QA de conteúdo antes do build/export.
---

# Skill: Site Frontmatter QC

Evita erros silenciosos e quebras no build: Contentlayer exige campos obrigatórios por tipo de documento.

## Objetivo

- Validar e padronizar frontmatter dos conteúdos do site.
- Reduzir inconsistências (campos faltando, tipos errados, imagem inexistente).

## Quando usar (gatilhos)

- “O build quebrou por causa do Contentlayer.”
- “Quero padronizar frontmatter dos posts/projetos/experiências.”
- “Alguma página não aparece / está com metadados errados.”
- “Quero revisar conteúdo antigo sem quebrar nada.”

## Exemplos de prompt

- "Verifique todos os arquivos em `content/blog/` e aponte frontmatter faltando/inconsistente."
- "Corrija o frontmatter deste projeto para ficar compatível com o Contentlayer."

## Inputs (o que pedir ao usuário)

- Escopo: pasta(s) alvo ou lista de arquivos.
- Se existe alguma taxonomia desejada (categorias válidas, convenção de imagens).

## Princípios e regras

### Crítico (não negociar)

- Seguir os campos obrigatórios definidos em `contentlayer.config.js`.
- Não alterar URLs computadas; elas dependem do path do arquivo.
- Datas devem ser datas válidas; booleans devem ser `true/false`.

### Padrões recomendados

- `description` específico: dizer *o que* o leitor ganha (não “sobre X” genérico).
- `image` deve apontar para um asset em `public/` (ex.: `/images/...`).

## Decision Tree (quando houver variações)

1) É erro de campo obrigatório ou qualidade editorial?

- Obrigatório → corrigir primeiro.
- Editorial → tratar com `site-content-refresh`/`article-review`.

## Workflow (faça em ordem)

1) Identificar o tipo de documento pelo path

Conforme `contentlayer.config.js`:

- Blog (`content/blog/**/*.md`) → `title`, `description`, `date`, `author`, `category`, `image`
- Pages (`content/pages/**/*.md`) → `title`, `description`, `image`
- Projects (`content/projects/**/*.md`) → `id` (number), `title`, `description`, `projectUrl`, `pin` (boolean), `image`
- Experiences (`content/experiences/**/*.md`) → `id` (number), `title`, `company`, `location`, `period`, `show` (boolean)
- Testimonials (`content/testimonials/**/*.md`) → `name`, `position`, `testimonial`, `image`
- Skills (`content/skills/**/*.md`) → `name`, `level`, `firstContact` (number)
- Courses (`content/courses/**/*.md`) → `name`, `institution`, `completionDate` (date), `workload` (number), `courseLink`, `certificateLink`

1) Checar presença e tipo

- Campos faltando
- Tipos errados (ex.: `id` como string)

1) Checar consistência prática

- `image` existe e segue convenção
- `projectUrl` é URL válida

1) Validar via build

- Rodar `npm run build` para garantir que Contentlayer gerou sem erro.

## Saída esperada

- Lista de inconsistências encontradas
- Patch nos arquivos afetados (quando solicitado)

## Checklist

- [ ] Campos obrigatórios presentes por tipo
- [ ] Tipos corretos (date/number/boolean)
- [ ] Imagens com caminho válido em `public/`
- [ ] Build passa (`npm run build`)

## Limitações e recomendações futuras

- Esta skill não valida semanticamente “categoria boa”; isso depende de taxonomia definida pelo usuário.

## Consulte também

- `site-content-refresh`

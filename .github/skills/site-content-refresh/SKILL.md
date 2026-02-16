---
name: site-content-refresh
description: Revisão e atualização de conteúdo antigo (blog, experiências e portfólio) com foco em clareza, consistência e manutenção do site (Next export estático + Contentlayer). Use esta skill quando o usuário pedir para revisar peças antigas, padronizar textos, ajustar títulos/descrições, melhorar navegação e rodar validações do build.
---

# Skill: Site Content Refresh

Workflow de “manutenção editorial”: atualizar conteúdo sem reescrever à toa e sem quebrar o build/export.

## Objetivo

- Revisar conteúdos antigos e produzir uma lista de mudanças objetivas.
- Manter consistência de frontmatter e estrutura para o Contentlayer.

## Quando usar (gatilhos)

- “Estou revisando posts antigos e preciso padronizar.”
- “Quero revisar experiências/projetos antigos do site.”
- “Quero melhorar clareza, cortar gordura e fortalecer argumentos.”
- “Quero garantir que o build continue passando.”

## Exemplos de prompt

- "Revise meus posts antigos de arquitetura: aponte o que cortar, o que expandir e o que reorganizar."
- "Revise as experiências em `content/experiences/` para ficarem mais consistentes e objetivas."

## Inputs (o que pedir ao usuário)

- Quais itens revisar (paths, lista de URLs, ou filtro por pasta/categoria).
- Meta do refresh (SEO, clareza, padronização, atualização técnica).

Opcional:

- Preferências de tom e nível de intervenção.
- Se o usuário quer manter datas originais ou atualizar a data.

## Princípios e regras

### Crítico (não negociar)

- Não mudar significado histórico sem confirmação (experiências/projetos).
- Não quebrar campos obrigatórios do Contentlayer.
- Mudanças devem ser “explicáveis”: cada ajuste precisa de motivo (clareza, precisão, consistência, SEO).

### Padrões recomendados

- Padronizar: títulos claros, descrições específicas, seções com propósito.
- Preferir consistência ao “texto perfeito”.

## Decision Tree (quando houver variações)

1) O problema é conteúdo ou metadado?
- Conteúdo → revisão (usar `article-review`).
- Metadado/estrutura → usar `site-frontmatter-qc`.

2) O item está desatualizado tecnicamente?
- Sim → adicionar “atualização” com data, ou ajustar o texto (sem reescrever tudo).
- Não → focar em clareza e concisão.

## Workflow (faça em ordem)

1) Inventariar itens
- Listar arquivos-alvo e seus metadados essenciais.

2) Diagnóstico rápido por item
- O que está bom?
- O que está fraco?
- O que está errado/desatualizado?

3) Aplicar mudanças mínimas de alto impacto
- Título/description mais específicos.
- Cortar repetições.
- Inserir exemplo concreto quando o texto está abstrato.

4) Validar build do site
- Rodar `npm run build` para pegar erros do Contentlayer/export.

## Saída esperada

- Lista de itens revisados com “mudanças feitas” + “pendências”.
- Patches aplicados nos arquivos do `content/**`.

## Checklist

- [ ] Campos obrigatórios presentes
- [ ] Título/description específicos
- [ ] Texto sem repetição e com exemplos
- [ ] Build passa (`npm run build`)

## Limitações e recomendações futuras

- Se houver muitos itens, trabalhar em lotes (ex.: 5–10 por vez).

## Consulte também

- `site-frontmatter-qc`
- `article-review`

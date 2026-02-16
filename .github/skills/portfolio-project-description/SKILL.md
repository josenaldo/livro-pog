---
name: portfolio-project-description
description: Descrever projetos de portfólio com narrativa e clareza (problema, solução, papel, decisões e resultados). Use esta skill quando o usuário pedir para escrever/reescrever páginas de projetos em `content/projects/**`, criar descrições curtas e fortes, ou transformar um repositório em “história de projeto” sem exageros.
---

# Skill: Portfolio Project Description

Ajuda a transformar projeto em comunicação: o que era o problema, o que foi construído, por que isso importa, e como você pensa.

## Objetivo

- Produzir uma descrição completa do projeto (texto longo) + 1 descrição curta (para cards/SEO).
- Evidenciar papel e decisões técnicas sem jargão vazio.

## Quando usar (gatilhos)

- “Me ajude a descrever este projeto no portfólio.”
- “Quero melhorar a narrativa do projeto.”
- “Quero deixar mais objetivo e mais forte.”
- “Quero escrever páginas em `content/projects/**`.”

## Exemplos de prompt

- "Tenho um repositório no GitHub. Crie uma descrição do projeto focada em problema/solução/decisões e o que eu aprendi."
- "Reescreva este projeto para ficar mais profissional, sem ficar longo demais."

## Inputs (o que pedir ao usuário)

Obrigatório:

- Link do repositório/demo (se existir) e o objetivo do projeto.
- O papel do autor (sozinho, em time, responsabilidade).

Opcional:

- Usuários/escopo (quem usa, por quê).
- Decisões técnicas e trade-offs.
- Resultados (mesmo que qualitativos) e aprendizados.
- Prints/ícones/imagem para o `image`.

## Princípios e regras

### Crítico (não negociar)

- Não prometer o que não existe (ex.: “escala” sem evidência).
- Evitar lista de tecnologias como substituto de história.
- Deixar explícito: o que foi difícil e como foi resolvido.
- Linguagem direta: frases curtas e exemplos.

### Padrões recomendados

- Estrutura “Problema → Solução → Decisões → Resultado → Aprendizados”.
- Incluir 1 seção curta de “o que eu faria diferente hoje”.

## Decision Tree (quando houver variações)

1) Projeto é “produto” ou “experimento/estudo”?
- Produto → foco em usuário, uso e confiabilidade.
- Estudo → foco em aprendizado, hipóteses e limitações.

2) Existe resultado mensurável?
- Sim → destacar (métricas).
- Não → destacar qualidade do aprendizado e evidências (ex.: testes, arquitetura, docs).

## Workflow (faça em ordem)

1) Coletar inputs
- Usar `assets/project-intake.md`.

2) Escrever versões
- Versão curta (1–2 frases)
- Versão longa (seções no template)

3) Adaptar para Contentlayer (projeto)
- Garantir frontmatter mínimo em `contentlayer.config.js` para `Project`:
  - `id`, `title`, `description`, `projectUrl`, `pin`, `image`

## Saída esperada

- Texto pronto para `content/projects/**`.
- Sugestão de `description` curta e “sem hype”.

## Checklist

- [ ] Problema e solução estão claros
- [ ] Papel do autor está explícito
- [ ] Há pelo menos 1 decisão técnica com trade-off
- [ ] Há resultado ou evidência (mesmo qualitativa)
- [ ] Frontmatter compatível com Contentlayer

## Recursos inclusos (opcional)

- `assets/project-intake.md`
- `assets/project-one-pager-template.md`

## Limitações e recomendações futuras

- Se o projeto for grande, considerar um “case study” no blog e linkar do portfólio.

## Consulte também

- `resume-experience-xyz`
- `site-frontmatter-qc`

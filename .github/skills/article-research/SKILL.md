---
name: article-research
description: Pesquisa e solidificação de ideias para artigos (blog/ensaios técnicos) com linha de argumentação clara. Use esta skill quando o usuário pedir para pesquisar um tema, organizar fontes, mapear argumentos/contra-argumentos, produzir um research brief, ou transformar dúvidas vagas em uma tese defensável.
---

# Skill: Article Research

Pesquisa aplicada para escrever melhor: transformar um tema em tese, evidências, exemplos e trade-offs, sem “enfeitar” com generalidades.

## Objetivo

- Produzir um **Research Brief** curto e acionável (tese + argumentos + evidências + exemplos + riscos).
- Reduzir “achismo” e acelerar a escrita com um mapa de decisões (o que afirmar, como sustentar, o que evitar).

## Quando usar (gatilhos)

- “Quero escrever sobre X, mas não sei por onde começar.”
- “Me ajude a pesquisar e organizar as ideias/argumentos.”
- “Quais são os prós e contras de X?”
- “Quero uma linha de argumentação clara, com exemplos.”
- “Quero um brief para escrever depois.”

## Exemplos de prompt

- "Pesquise e solidifique os argumentos do meu artigo sobre interfaces vs abstrações especulativas. Gere um Research Brief e um checklist de pontos frágeis."
- "Quero escrever um post sobre migração para Next export estático. Faça a pesquisa e traga um mapa de riscos + recomendações."

## Inputs (o que pedir ao usuário)

- Público-alvo (iniciante, pleno, senior, time específico) e o que ele já sabe.
- Objetivo do texto (ensinar, convencer, documentar decisão, reflexão crítica).
- Tom/voz (mais pragmático, mais opinativo, mais didático) e idioma.
- Escopo: o que entra e o que fica fora.

Opcional (ajuda muito):

- Links e referências que o usuário quer considerar (docs, RFCs, posts, talks).
- Experiências reais do usuário (incidentes, decisões, contextos) que podem virar exemplos.
- Restrições (tempo de leitura desejado, tamanho aproximado, presença/ausência de código).

## Princípios e regras

### Crítico (não negociar)

- Separar **afirmações** em: (1) fato verificável, (2) opinião/heurística, (3) hipótese; rotular internamente para não misturar.
- Toda afirmação forte precisa de pelo menos uma de: evidência, exemplo concreto, contraponto honesto, ou delimitação de contexto.
- Evitar “fumaça” textual: não preencher lacunas com frases genéricas (ex.: “é importante”, “é essencial”) sem especificar **por quê** e **em que contexto**.
- Não inventar dados/métricas/fatos. Se faltar, pedir ao usuário ou assumir explicitamente como hipótese.

### Padrões recomendados

- Preferir fontes primárias: documentação oficial, RFC/specs, repos, changelogs, papers.
- Complementar com fontes secundárias: posts técnicos, talks, experiências de times (com ressalvas).

## Decision Tree (quando houver variações)

1) O texto é mais “decisão técnica” ou “ensaio opinativo”?
- Decisão → focar em opções, trade-offs, critérios e recomendação.
- Ensaio → focar em tese, exemplos, contra-argumentos e síntese.

2) O tema envolve risco de dogmatismo?
- Sim → explicitar contextos onde a regra falha + “quando NÃO fazer”.
- Não → manter exemplos e delimitações, mas menos ênfase em exceções.

## Workflow (faça em ordem)

1) Delimitar pergunta e tese provisória
- Transformar o tema em 1 pergunta-guia e 1 tese provisória.
- Listar o que o texto **não** vai cobrir.

2) Mapear o espaço de argumentos
- Listar 3–5 argumentos a favor e 2–4 contra-argumentos sérios.
- Identificar “pontos frágeis” (onde o leitor pode discordar com razão).

3) Coletar evidências e exemplos
- Para cada argumento, anexar 1–2 evidências (ou exemplos) e 1 risco/limitação.
- Quando aplicável, criar 1 micro-estudo de caso (ex.: “antes/depois” em arquitetura).

4) Produzir Research Brief
- Gerar o brief no template em `assets/research-brief-template.md`.
- Incluir: tese, público, premissas, argumentos, evidências, exemplos, anti-tese, e “o que eu não sei ainda”.

5) Preparar ponte para escrita
- Sugerir 2–3 estruturas possíveis (outline) e qual combina mais com o objetivo.

## Saída esperada

- Um Research Brief em Markdown seguindo `assets/research-brief-template.md`.
- Uma lista curta de “pontos frágeis” e perguntas que precisam ser respondidas para o texto não ficar superficial.

## Checklist

- [ ] Pergunta-guia e tese estão explícitas
- [ ] Há contra-argumentos honestos (não espantalhos)
- [ ] Cada argumento tem evidência/exemplo e limitações
- [ ] Escopo (in/out) está definido
- [ ] Existem 2–3 ângulos de estrutura sugeridos

## Recursos inclusos (opcional)

- `assets/research-brief-template.md`: template de brief.
- `references/source-quality.md`: heurística para julgar fontes e usar citações.

## Limitações e recomendações futuras

- Esta skill não substitui checagem de fatos por leitura completa das fontes.
- Se o tema for muito amplo, o brief pode virar uma “árvore”; quebrar em 2 artigos.

## Consulte também

- `article-structure` (para transformar o brief em outline)
- `article-review` (para revisão final)

---
name: article-structure
description: Estruturação de artigos (blog/ensaio/técnico) com tese, narrativa e progressão de ideias. Use esta skill quando o usuário pedir para criar outline, estruturar seções, definir introdução/conclusão, calibrar tamanho, ou transformar notas/pesquisa em um artigo com argumento claro.
---

# Skill: Article Structure

Organiza um texto para que ele tenha início, meio e fim — e para que cada seção “pague o aluguel” na argumentação.

## Objetivo

- Gerar um outline completo (títulos, propósito da seção, conteúdo esperado).
- Definir um arco narrativo coerente: problema → tensão → proposta → evidências → trade-offs → síntese.

## Quando usar (gatilhos)

- “Me ajuda a estruturar o artigo.”
- “Tenho notas soltas, quero virar um texto bom.”
- “Quero um artigo nem curto demais, nem longo demais.”
- “Quero uma linha de argumentação clara.”

## Exemplos de prompt

- "Estruture um artigo a partir deste Research Brief. Quero um outline com seções, objetivos e os pontos que entram em cada uma."
- "Tenho este rascunho e está confuso. Reorganize a linha de argumento e proponha uma estrutura mais forte."

## Inputs (o que pedir ao usuário)

- Tema + tese (ou o Research Brief, se existir).
- Tipo de texto: tutorial, decisão técnica, ensaio opinativo, estudo de caso.
- Tamanho/tempo de leitura desejado (ex.: 6–10 min, 12–15 min).
- Se o texto deve conter código (e em qual linguagem).

Opcional:

- Onde o usuário quer chegar (call-to-action): “quero que o leitor faça/pense X”.
- Exemplos reais do usuário (incidentes, escolhas, refactors).

## Princípios e regras

### Crítico (não negociar)

- A introdução precisa declarar: **o problema**, **o custo**, **a promessa** do texto.
- Cada seção deve ter 1 propósito explícito: ou avança argumento, ou prova, ou delimita contexto.
- Sempre incluir “quando não vale”/limitações quando o tema vira dogma fácil.
- Evitar listas longas sem ligação lógica; preferir progressão (“portanto”, “porém”, “logo”).

### Padrões recomendados

- Começar com um caso concreto (ou mini-história) quando possível.
- Usar 1 metáfora no máximo; preferir exemplos técnicos.

## Decision Tree (quando houver variações)

1) A tese é controversa?

- Sim → introduzir contra-argumento cedo e responder com rigor.
- Não → focar em didática e exemplos.

1) O leitor quer “como fazer”?

- Sim → usar estrutura de tutorial/checklist.
- Não → usar estrutura de ensaio/argumento.

## Workflow (faça em ordem)

1) Escolher forma do artigo

- Selecionar um dos templates em `assets/`.

1) Escrever o outline

- Para cada seção: objetivo, tópicos, exemplo, frase de transição.

1) Calibrar tamanho

- Unir seções redundantes; cortar o que não serve ao argumento.
- Garantir pelo menos 1 seção de limitações/anti-padrões.

1) Preparar rascunho “zero”

- Escrever frases-guia por seção (1–3 por seção) para tirar o bloqueio de página em branco.

## Saída esperada

- Outline em Markdown no formato do template escolhido.
- Sugestão de 2 opções de introdução e 2 de conclusão (curtas).

## Checklist

- [ ] Introdução define problema, custo e promessa
- [ ] Seções têm propósito explícito
- [ ] Há contra-argumento e/ou limitações
- [ ] O texto tem progressão (não é lista de tópicos)
- [ ] Tamanho está dentro do alvo

## Recursos inclusos (opcional)

- `assets/outline-essay.md`: outline para ensaio técnico.
- `assets/outline-decision-record.md`: outline para “decisão técnica”.
- `assets/outline-tutorial.md`: outline para tutorial.

## Limitações e recomendações futuras

- A estrutura não garante “voz”; usar `article-review` para ajustar estilo e naturalidade.

## Consulte também

- `article-research`
- `article-review`

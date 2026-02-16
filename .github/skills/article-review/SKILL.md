---
name: article-review
description: Revisão de artigos em Markdown (clareza, argumentação, precisão técnica, estilo e “voz humana”). Use esta skill quando o usuário pedir para revisar um artigo/rascunho, melhorar coesão, cortar gordura, fortalecer argumentos, ajustar tom e garantir consistência de frontmatter para o site.
---

# Skill: Article Review

Revisão com foco em: argumento, clareza e naturalidade — sem deixar o texto “cheiro de IA”.

## Objetivo

- Gerar um **Relatório de Revisão** com mudanças recomendadas e justificativas.
- Produzir uma versão revisada com corte de redundâncias e reforço de exemplos.

## Quando usar (gatilhos)

- “Revise este artigo.”
- “Está com cara de IA / genérico. Deixe mais humano.”
- “Melhore a argumentação e a linha lógica.”
- “Corte onde está longo demais.”

## Exemplos de prompt

- "Revise este post e me devolva: (1) lista de problemas, (2) sugestões por seção, (3) versão revisada."
- "Quero manter meu estilo. Faça uma revisão leve, sem reescrever tudo."

## Inputs (o que pedir ao usuário)

- O Markdown do artigo (ou o arquivo/path).
- Nível de intervenção: leve (polimento), médio (reestruturação parcial), pesado (reescrita).
- Preferências de voz: mais direto, mais didático, mais opinativo.

Opcional:

- Leitor ideal (persona) e o que ele reclama.
- Se o texto precisa seguir algum padrão (ex.: mais técnico, menos metáfora).

## Princípios e regras

### Crítico (não negociar)

- Manter **a intenção e a tese** do autor; não “trocar o artigo” por outro.
- Evitar clichês e preenchimentos: “de forma geral”, “vale destacar”, “é importante” sem conteúdo.
- Variar ritmo: misturar frases curtas e médias; evitar parágrafos longos demais.
- Reforçar especificidade: onde há abstração, pedir/introduzir exemplo concreto.
- Nunca inventar experiência do autor. Se faltar detalhe, marcar como pergunta.

### Padrões recomendados

- Uma ideia por parágrafo.
- Títulos que são promessas (“o que você vai entender aqui”).

## Decision Tree (quando houver variações)

1) O problema é estilo ou argumento?
- Estilo → cortar redundância, ajustar ritmo, clarificar frases.
- Argumento → reorganizar seções, adicionar contra-argumento e delimitação.

2) O texto está longo por quê?
- Repetição → consolidar.
- Muitos tópicos → dividir em 2 posts.

## Workflow (faça em ordem)

1) Leitura diagnóstica
- Identificar tese, promessas por seção e pontos frágeis.

2) Relatório de Revisão
- Preencher o template em `assets/review-report-template.md`.
- Separar feedback em: argumento, clareza, precisão, estilo, estrutura.

3) Passes de revisão
- Passo 1: estrutura (ordem e cortes)
- Passo 2: clareza (frase/parágrafo)
- Passo 3: voz (naturalidade)

4) Validação para o site
- Checar frontmatter mínimo (para blog: `title`, `description`, `date`, `author`, `image`, `category`).
- Sugerir melhoria de título/description para SEO sem clickbait.

## Saída esperada

- Relatório de Revisão + lista de perguntas para o autor.
- Versão revisada do texto (ou patch no arquivo).

## Checklist

- [ ] Tese aparece cedo e está clara
- [ ] Há exemplos concretos
- [ ] Contra-argumentos/limitações estão presentes
- [ ] Redundâncias removidas
- [ ] Tom natural, sem frases genéricas em série
- [ ] Frontmatter consistente com Contentlayer

## Recursos inclusos (opcional)

- `assets/review-report-template.md`

## Limitações e recomendações futuras

- Se o texto depender de dados/estatísticas, pedir fonte ao usuário antes de afirmar.

## Consulte também

- `article-research`
- `article-structure`

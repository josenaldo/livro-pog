# Padrões de Saída

Use estes padrões quando skills precisarem produzir saídas consistentes e de alta qualidade.

## Padrão de Template

Forneça templates para o formato da saída. Ajuste o nível de rigidez conforme a necessidade.

**Para requisitos rígidos (como respostas de API ou formatos de dados):**

```markdown
## Estrutura do relatório

SEMPRE use exatamente esta estrutura de template:

# [Título da Análise]

## Resumo executivo

[Visão geral em um parágrafo dos principais achados]

## Principais achados

- Achado 1 com dados de apoio
- Achado 2 com dados de apoio
- Achado 3 com dados de apoio 

## Recomendações

1. Recomendações específicas e acionáveis
2. Recomendações específicas e acionáveis
```

**Para orientações flexíveis (quando adaptação é útil):**

```markdown
## Estrutura do relatório

Aqui está um formato padrão sensato, mas use seu julgamento:

# [Título da Análise]

## Resumo executivo

[Visão geral]

## Principais achados

[Adapte as seções conforme o que descobrir]

## Recomendações

[Adapte ao contexto específico]

Ajuste as seções conforme necessário para o tipo de análise.
```

## Padrão de Exemplos

Para skills onde a qualidade da saída depende de exemplos, forneça pares de entrada/saída:

```markdown
## Formato da mensagem de commit

Gere mensagens de commit seguindo estes exemplos:

**Exemplo 1:**

Entrada: Adicionada autenticação de usuário com tokens JWT

Saída:
```

feat(auth): implementa autenticação baseada em JWT

Adiciona endpoint de login e middleware de validação de token

```markdown
**Exemplo 2:**

Entrada: Corrigido bug onde datas eram exibidas incorretamente em relatórios

Saída:
```

fix(reports): corrige formatação de datas na conversão de timezone

Usa timestamps UTC de forma consistente na geração de relatórios

```markdown
Siga este estilo: tipo(escopo): descrição breve, depois explicação detalhada.
```

Exemplos ajudam o agente a entender o estilo e o nível de detalhamento desejados melhor do que descrições isoladas.

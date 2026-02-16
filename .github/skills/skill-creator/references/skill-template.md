---
name: nome-da-skill
# Exemplo: name: maintain-docs
description: Descreva de forma clara o que a skill faz, quando e como deve ser acionada (ex: "Use esta skill quando o usuário pedir para gerar documentação técnica ou atualizar arquivos Markdown"). Seja objetivo e inclua os principais gatilhos de uso.
# Exemplo: description: Skill para criar ou manter documentação técnica (JSDoc) e funcional (Markdown) em Português, seguindo padrões do projeto MedEspecialista. Use quando solicitado para gerar, atualizar ou revisar documentação de código, features, módulos ou APIs.
---

# Skill: {Nome da Skill}

Uma frase descrevendo o valor da skill e seu escopo (o que resolve e o que NÃO resolve).

## Objetivo

- Objetivo principal (1–2 bullets). Se houver mais de um objetivo, mantenha objetivos mensuráveis.

## Quando usar (gatilhos)

- Frases típicas do usuário que devem acionar esta skill.
- Tipos de tarefa (ex.: criar, revisar, migrar, depurar, testar).

## Exemplos de prompt

- "Exemplo 1"
- "Exemplo 2"

## Inputs (o que pedir ao usuário)

- O que é obrigatório para executar bem (ex.: paths, módulo, endpoint, stack trace, critérios de aceite).
- O que é opcional mas acelera (ex.: prints, payloads, fixtures, versão de ambiente).

> Regra: não crie campos extras no frontmatter (ex.: `argument-hint`, `applyTo`). Se precisar orientar inputs, faça aqui.

## Princípios e regras

### Crítico (não negociar)

- Liste 3–8 regras que devem ser checadas em toda execução.
- Coloque aqui os principais "anti-patterns" do projeto.

### Padrões recomendados

- Convenções de pasta/arquivo.
- Convenções de nomenclatura.

## Decision Tree (quando houver variações)

Use apenas quando houver mais de um caminho de execução.

1) Condição A?
- Sim → caminho A
- Não → caminho B

## Workflow (faça em ordem)

1) Delimitar escopo
- Quais arquivos/módulo/feature.

2) Executar a mudança/ação
- Passos concretos.

3) Validar
- Qual comando/teste/checagem roda.

## Saída esperada

- O que o usuário deve receber ao final (artefatos/arquivos/relatório).
- Formato (bullets, Markdown, patch, checklist).

## Checklist

- [ ] Item verificável 1
- [ ] Item verificável 2

## Recursos inclusos (opcional)

- `scripts/`: scripts relevantes e como rodar.
- `references/`: referências e quando consultar.
- `assets/`: templates/arquivos de apoio.

## Limitações e recomendações futuras

- Limitações conhecidas.
- Próximas melhorias (se fizer sentido).

## Consulte também

- Referências internas do repo (instructions/ e outras skills).


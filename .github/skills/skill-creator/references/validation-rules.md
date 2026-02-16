# Regras de Validação para SKILL.md

Estas regras garantem que todas as skills do MedEspecialista sigam um padrão consistente e sejam facilmente reutilizáveis.

## Frontmatter YAML obrigatório

- O arquivo SKILL.md deve começar com um bloco YAML entre `---`.
- Campos obrigatórios:
  - `name`: Nome da skill (string)
  - `description`: Descrição clara do que a skill faz e quando deve ser usada (string)
- Campos opcionais permitidos:
  - `license`: Informação de licença (string)
  - `allowed-tools`: Lista de ferramentas externas permitidas (array)
  - `metadata`: Objeto para metadados adicionais (objeto)
- Não use outros campos além dos listados acima.

## Exemplo de frontmatter válido

```yaml
---
name: maintain-docs
description: Skill para criar ou manter documentação técnica e funcional em Português, seguindo padrões do projeto MedEspecialista. Use quando solicitado para gerar, atualizar ou revisar documentação de código, features, módulos ou APIs.
license: MIT
allowed-tools:
  - markdownlint
metadata:
  author: Equipe MedEspecialista
  created: 2026-01-26
---
```

## Regras adicionais

- O frontmatter deve ser um dicionário YAML válido.
- Não inclua campos desconhecidos no frontmatter (exceto chaves dentro de `metadata`).
- O corpo do SKILL.md deve começar após o segundo `---`.
- Sempre inclua exemplos de uso e instruções claras no corpo do arquivo.
- É obrigatório incluir uma seção "Exemplos de Prompt" com exemplos reais de comandos ou frases que devem acionar a skill.
- Sempre explique claramente o contexto de uso e os gatilhos esperados para a skill.

## Checklist de Validação Manual

- [ ] O arquivo SKILL.md existe na raiz da skill
- [ ] O frontmatter YAML está presente e válido
- [ ] Os campos obrigatórios estão preenchidos
- [ ] Não há campos não permitidos
- [ ] O corpo do arquivo está bem documentado

> Dica: Use o template em `references/skill-template.md` para criar novas skills seguindo todas as regras acima. Consulte também os arquivos de padrões em `references/` para garantir consistência de saída e workflows.

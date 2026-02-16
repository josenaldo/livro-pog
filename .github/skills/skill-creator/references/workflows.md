# Padrões de Workflow

## Workflows Sequenciais

Para tarefas complexas, divida as operações em etapas claras e sequenciais. É útil apresentar uma visão geral do processo no início do SKILL.md:

```markdown
Preencher um formulário PDF envolve estas etapas:

1. Analisar o formulário (executar analyze_form.py)
2. Criar o mapeamento de campos (editar fields.json)
3. Validar o mapeamento (executar validate_fields.py)
4. Preencher o formulário (executar fill_form.py)
5. Verificar o resultado (executar verify_output.py)
```

## Workflows Condicionais

Para tarefas com lógica de ramificação, oriente o agente pelos pontos de decisão:

```markdown
1. Determine o tipo de modificação:
   **Criar novo conteúdo?** → Siga o "workflow de criação" abaixo
   **Editar conteúdo existente?** → Siga o "workflow de edição" abaixo

2. Workflow de criação: [etapas]
3. Workflow de edição: [etapas]
```

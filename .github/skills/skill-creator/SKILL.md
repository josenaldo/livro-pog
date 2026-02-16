---
name: skill-creator
description: Guia para criar skills eficazes. Use esta skill quando quiser criar ou atualizar uma skill que expanda as capacidades do agente Copilot com conhecimento especializado, fluxos de trabalho ou integrações técnicas.
---

# Skill Creator

Este guia ensina como criar, adaptar e manter Skills para agentes Copilot no padrão Anthropic/Claude, com foco em reutilização, clareza e manutenção progressiva. Siga este padrão para garantir que as Skills sejam fáceis de compor, evoluir e usar em prompts e fluxos de trabalho do MedEspecialista.

## Princípios Fundamentais

1. **Composição, não duplicação**: Skills devem ser referenciadas por prompts e outras skills, nunca duplicadas. Centralize regras e exemplos em um único local.
2. **Divulgação progressiva**: Estruture o conteúdo para que apenas o necessário seja lido/executado conforme o contexto do usuário. Use arquivos de referência e exemplos para detalhamento.
3. **Reutilização máxima**: Scripts, assets e referências devem ser organizados para fácil reaproveitamento entre skills e prompts.
4. **Documentação clara e acionável**: O arquivo SKILL.md deve ser objetivo, com exemplos concretos e instruções diretas para o agente.

## Estrutura de Diretórios de uma Skill

Cada skill deve seguir a estrutura abaixo:

```markdown
{skill}/
  SKILL.md           # Guia principal da skill (frontmatter + instruções)
  scripts/           # Scripts reutilizáveis (opcional)
  references/        # Documentação, padrões, exemplos (opcional)
  assets/            # Templates, imagens, arquivos de apoio (opcional)
```

**Exemplo:**

```markdown
pdf-editor/
  SKILL.md
  scripts/
    rotate_pdf.py
  references/
    schema.md
  assets/
    template.pdf
```

## Padrões de Divulgação Progressiva

### Padrão 1: Referências Temáticas

Quando uma skill cobre múltiplos tópicos, separe cada tema em um arquivo de referência. O SKILL.md deve linkar para cada referência.

```text
image-editor/
  SKILL.md
  references/
    cropping.md
    filters.md
    red-eye.md
```

Quando o usuário pede "remover olhos vermelhos", apenas red-eye.md é lido.

### Padrão 2: Variantes por Framework/Plataforma

Quando a skill cobre múltiplos frameworks, crie um arquivo de referência por variante:

```text
cloud-deploy/
├── SKILL.md (workflow + seleção de provider)
└── references/
    ├── aws.md (padrões AWS) 
    ├── gcp.md (padrões GCP)
    └── azure.md (padrões Azure)
```

Quando o usuário escolhe AWS, apenas aws.md é lido.

### Padrão 3: Detalhamento Condicional

Exiba o básico no SKILL.md e link para detalhes avançados:

```markdown
# Processamento DOCX

## Criando documentos

Use docx-js para novos documentos. Veja [DOCX-JS.md](DOCX-JS.md).

## Editando documentos

Para edições simples, modifique o XML diretamente.

**Para alterações rastreadas**: Veja [REDLINING.md](REDLINING.md)
**Para detalhes OOXML**: Veja [OOXML.md](OOXML.md)
```

O agente só lê REDLINING.md ou OOXML.md quando o usuário precisa dessas features.

### Regras Importantes

- **Evite referências aninhadas**: Mantenha referências a um nível do SKILL.md. Todos os arquivos de referência devem ser linkados diretamente do SKILL.md.
- **Estruture arquivos longos**: Para arquivos com mais de 100 linhas, inclua um sumário no topo para facilitar a navegação.

## Processo de Criação de Skill

O processo envolve:

1. Entender a skill com exemplos concretos
2. Planejar conteúdos reutilizáveis (scripts, referências, assets)
3. Inicializar a skill (rodar init_skill.py)
4. Editar a skill (implementar recursos e escrever o SKILL.md)
5. Empacotar a skill (rodar package_skill.py)
6. Iterar com base no uso real

Siga os passos na ordem, pulando apenas se houver motivo claro.

### Passo 1: Entendimento com Exemplos Concretos

Só pule se o uso da skill já for totalmente conhecido. Mesmo para skills existentes, vale validar exemplos reais.

Para criar uma skill eficaz, entenda exemplos concretos de uso. Isso pode vir de demandas reais ou exemplos gerados e validados com o usuário.

Exemplo: ao criar uma skill image-editor, pergunte:

- "Que funcionalidades a skill deve suportar? Editar, rotacionar, mais algo?"
- "Pode dar exemplos de uso?"
- "Imagino pedidos como 'Remova olhos vermelhos' ou 'Gire esta imagem'. Há outros?"
- "O que o usuário diria que deveria acionar essa skill?"

Não sobrecarregue o usuário com perguntas. Comece pelo essencial e aprofunde conforme necessário.

Conclua este passo quando houver clareza sobre o que a skill deve suportar.

### Passo 2: Planejamento dos Conteúdos Reutilizáveis

Para cada exemplo, analise:

1. Como executar o exemplo do zero
2. Que scripts, referências e assets ajudariam a repetir esse fluxo

Exemplo: skill pdf-editor para "Gire este PDF":

1. Rotacionar PDF exige reescrever o código sempre
2. Um script scripts/rotate_pdf.py seria útil

Exemplo: skill frontend-webapp-builder para "Crie um app de tarefas":

1. Criar webapp exige sempre o mesmo boilerplate
2. Um template assets/hello-world/ com HTML/React base seria útil

Exemplo: skill big-query para "Quantos usuários logaram hoje?":

1. Consultar BigQuery exige redescobrir schemas
2. Um references/schema.md documentando os schemas seria útil

Analise cada exemplo para listar os recursos reutilizáveis: scripts, referências, assets.

### Passo 3: Inicialização da Skill

Se a skill já existe, pule para o próximo passo.

Para criar uma nova skill:

1. Crie uma nova pasta com o nome da skill dentro de `.github/skills/`.
2. Copie o template de SKILL.md disponível em `references/skill-template.md` para dentro da nova pasta e renomeie para `SKILL.md`.
3. Crie as subpastas `scripts/`, `references/` e `assets/` conforme a necessidade da skill (nem toda skill precisa de todas as pastas).
4. Use os exemplos de arquivos de referência e scripts disponíveis em `references/` para acelerar a criação dos recursos da skill.
5. Preencha o SKILL.md com as informações específicas da nova skill, seguindo o template e as orientações deste guia.
6. Remova ou ajuste arquivos de exemplo conforme necessário para a sua skill.

> Dica: Mantenha templates e exemplos atualizados na pasta `references/` para facilitar a criação de novas skills por toda a equipe.

### Passo 4: Edição da Skill

Edite a skill pensando que outro agente Copilot irá usá-la. Inclua informações não óbvias, conhecimento procedural, detalhes de domínio e assets úteis.

#### Consulte Padrões Comprovados

Consulte os guias em references/ conforme a necessidade:

- **Processos multi-etapas**: references/workflows.md
- **Padrões de saída/qualidade**: references/output-patterns.md

Esses arquivos trazem boas práticas para design de skills.

#### Exemplos de Prompt e Contexto de Uso

Inclua sempre uma seção "Exemplos de Prompt" com exemplos reais de comandos ou frases que devem acionar a skill. Explique claramente o contexto de uso e os gatilhos esperados.

#### Comece pelos Conteúdos Reutilizáveis

Implemente primeiro os recursos identificados: scripts/, references/, assets/. Peça insumos ao usuário se necessário (ex: assets de marca, docs, templates).

Teste scripts adicionados para garantir que funcionam. Se houver muitos, teste uma amostra representativa.

Remova arquivos de exemplo não usados. O init_skill.py gera exemplos para demonstrar estrutura, mas nem toda skill precisa de todos.

#### Atualize o SKILL.md

**Dicas de Redação:** Use sempre o imperativo/infinitivo.

##### Frontmatter

Escreva o YAML frontmatter com `name` e `description`:

- `name`: Nome da skill
- `description`: Principal mecanismo de disparo. Ajuda o agente a saber quando usar a skill.
  - Diga o que a skill faz e quando deve ser usada.
  - Inclua todos os "quando usar" aqui – não no corpo. O corpo só é lido após o disparo.
  - Exemplo para skill docx: "Criação, edição e análise de documentos .docx, com suporte a alterações rastreadas, comentários, preservação de formatação e extração de texto. Use quando precisar: (1) Criar documentos, (2) Editar conteúdo, (3) Trabalhar com alterações rastreadas, (4) Adicionar comentários, ou outras tarefas com .docx"

Não inclua outros campos no frontmatter.

> Padrão do repositório (skills MedEspecialista): qualquer dica de inputs (ex.: antigo `argument-hint`) deve virar seção **Inputs** no corpo do SKILL.md.

##### Corpo

Escreva instruções para uso da skill e dos recursos inclusos.

## Padrão único de seções (obrigatório)

Para manter consistência, todas as skills devem usar a mesma espinha dorsal de seções (podem ser curtas quando o assunto for simples):

- Objetivo
- Quando usar (gatilhos)
- Exemplos de prompt
- Inputs (o que pedir ao usuário)
- Princípios e regras
  - Crítico (não negociar)
  - Padrões recomendados (quando aplicável)
- Decision Tree (quando houver variações)
- Workflow (faça em ordem)
- Saída esperada
- Checklist
- Recursos inclusos (opcional)
- Limitações e recomendações futuras
- Consulte também

O template canônico está em `references/skill-template.md`.

#### Limitações e Recomendações Futuras

Inclua uma seção listando limitações conhecidas, pontos de atenção e sugestões para evolução da skill.

### Passo 5: Empacotamento da Skill

Quando terminar, empacote a skill em um arquivo .skill distribuível. O empacotamento valida a skill automaticamente:

```bash
scripts/package_skill.py <caminho/da/skill>
```

Para especificar diretório de saída:

```bash
scripts/package_skill.py <caminho/da/skill> ./dist
```

O script irá:

1. **Validar** a skill:
   - Formato do frontmatter YAML
   - Convenção de nomes e estrutura
   - Descrição completa e de qualidade
   - Organização dos arquivos e referências
2. **Empacotar** se passar na validação, criando .skill (zip) com todos os arquivos e estrutura correta.

Se falhar, corrija os erros e rode novamente.

### Passo 6: Iteração

Após testar, usuários podem pedir melhorias. Isso ocorre logo após o uso, com contexto fresco.

**Fluxo de iteração:**

1. Use a skill em tarefas reais
2. Observe dificuldades ou ineficiências
3. Identifique o que atualizar no SKILL.md ou recursos
4. Implemente e teste novamente

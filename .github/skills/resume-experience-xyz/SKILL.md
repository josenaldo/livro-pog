---
name: resume-experience-xyz
description: Descrever experiências passadas em formato de currículo usando a fórmula XYZ (Google): alcançou X, medido por Y, ao fazer Z. Use esta skill quando o usuário pedir para reescrever experiências, criar bullets fortes, destacar impacto e métricas, ou alinhar uma experiência com uma vaga.
---

# Skill: Resume Experience (XYZ)

Transforma histórico profissional em bullets com impacto e evidência, sem “encher linguiça”.

## Objetivo

- Produzir bullets no formato XYZ, calibradas por senioridade e contexto.
- Garantir que cada bullet descreva impacto, escopo e contribuição do autor.

## Quando usar (gatilhos)

- “Me ajude a descrever minhas experiências do currículo.”
- “Quero bullets mais fortes, no padrão XYZ do Google.”
- “Tenho experiências antigas e quero revisar.”
- “Quero adaptar meu currículo para esta vaga.”

## Exemplos de prompt

- "Pegue minhas anotações da experiência na empresa X e gere 5 bullets XYZ, com métricas e stack."
- "Reescreva esta experiência para focar em backend Java e arquitetura."

## Inputs (o que pedir ao usuário)

Obrigatório:

- Papel/cargo e contexto (time, produto, missão).
- 5–10 fatos brutos: o que você fez, com que restrições, e o resultado.

Opcional (mas ideal):

- Métricas (tempo, custo, SLA, receita, churn, conversão, erros, latência).
- Escopo (tamanho do sistema, tráfego, usuários, volume de dados).
- Stack e práticas (linguagens, cloud, CI/CD, testes, observabilidade).
- O que era “difícil” (risco, legado, prazos, incidentes).

## Princípios e regras

### Crítico (não negociar)

- Não inventar números; se faltar métrica, usar aproximação explicitamente qualificada ou trocar por evidência qualitativa verificável.
- Evitar bullets “responsável por”: começar com verbo forte + resultado.
- Cada bullet deve ter **uma ação principal** e um efeito.
- Preservar confidencialidade: trocar nomes internos por termos genéricos quando necessário.

### Padrões recomendados

- Preferir verbos de entrega e impacto: “reduziu”, “automatizou”, “desenhou”, “liderou”, “stabilizou”, “migrou”, “padronizou”.
- Incluir tecnologia apenas quando ela fortalece a história (não como lista).

## Decision Tree (quando houver variações)

1) Você tem métricas confiáveis?

- Sim → usar Y numérico.
- Não → usar Y qualitativo (ex.: “reduziu incidentes recorrentes”, “melhorou tempo de onboarding”) e marcar pergunta.

1) A vaga pede escopo técnico específico?

- Sim → priorizar bullets alinhados (ex.: performance, cloud, arquitetura).
- Não → equilibrar impacto, colaboração e execução.

## Workflow (faça em ordem)

1) Coletar fatos brutos

- Usar o formulário em `assets/experience-intake.md`.

1) Agrupar por temas

- Performance, confiabilidade, produtividade, arquitetura, produto, liderança.

1) Escrever bullets XYZ

- Usar o template em `assets/xyz-bullets-template.md`.
- Gerar 4–7 bullets por experiência (ajustar para o tamanho do currículo).

1) Calibrar e cortar

- Remover redundâncias.
- Garantir variedade: nem todos os bullets falam de “feature”.

## Saída esperada

- Conjunto de bullets XYZ prontos para colar no currículo e/ou nos arquivos em `content/experiences/**`.
- Lista de perguntas de métrica (se necessário).

## Checklist

- [ ] Bullets começam com verbo forte
- [ ] Cada bullet tem X e Z (e Y quando possível)
- [ ] Há pelo menos 1 bullet de impacto e 1 de escopo técnico
- [ ] Não há buzzwords vazias
- [ ] Confidencialidade respeitada

## Recursos inclusos (opcional)

- `assets/experience-intake.md`
- `assets/xyz-bullets-template.md`

## Limitações e recomendações futuras

- Para experiências muito antigas, priorizar 2–4 bullets e mover detalhes para portfólio.

## Consulte também

- `site-frontmatter-qc` (para consistência de conteúdo)

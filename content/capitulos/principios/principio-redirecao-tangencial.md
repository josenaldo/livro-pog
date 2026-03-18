---
title: Redireção Tangencial
description: A arte milenar de desviar a culpa para qualquer entidade que não seja você
sentence: A culpa não é minha!
sentence_author: Todo POGramador, em toda reunião de post-mortem
order_number: 5150
date: 2020-04-16 00:04
name: principio-redirecao-tangencial
parent: principios
isParent: false
status: done
icon: "tabler/IconArrowBounce"

---

A **Redireção Tangencial** é o princípio que garante que, independente do que aconteceu, a culpa nunca é sua. É um mecanismo de defesa emocional, profissional e existencial que o POGramador invoca automaticamente quando algo dá errado.

O nome "tangencial" vem do fato de que a culpa nunca vai reto para quem causou o problema. Ela sempre sai pela tangente, aterrissando em algum lugar conveniente: a infraestrutura, o legado, o requisito mal escrito, o framework, o estagiário, Mercúrio retrógrado.

## O mecanismo

A Redireção Tangencial opera em camadas de sofisticacao:

**Nível 1 — Redireção Infraestrutural**
"O servidor reiniciou sozinho."
"O banco tava lento."
"A rede oscilou."

**Nível 2 — Redireção Temporal**
"Quando eu cheguei já tava assim."
"Isso é legado, ninguém mexe."
"Deve ter sido o deploy de ontem."

**Nível 3 — Redireção Processual**
"O requisito não era claro."
"O PO mudou o escopo."
"Não foi especificado."

**Nível 4 — Redireção Existencial**
"O universo conspira contra esse projeto."
"Isso não deveria ser possível."
"O computador me odeia."

## Exemplo clássico: o commit da discordia

```
commit a3f8c91
Author: dev-senior <dev@empresa.com>
Date:   Fri Mar 13 17:58:42

    fix: ajuste no calculo de juros

    O bug não era no meu código. O problema era que a função
    calcularJuros recebia o parâmetro em formato errado
    por causa de uma mudança na API do módulo financeiro
    que o time de backend fez sem avisar.

    Corrigido o parse do valor.
```

Note a mensagem de commit: em nenhum momento o autor assume que o bug era dele. A correção foi feita, mas o texto trabalha ativamente para redirecionar a responsabilidade para "o time de backend".

## Caso real: "Works on My Machine"

O fenômeno "Works on My Machine" é a manifestação mais pura da Redireção Tangencial. O desenvolvedor testa localmente, funciona, sobe para staging, quebra. A reação natural:

```
Dev: "Na minha máquina funciona."
QA: "Mas no servidor não funciona."
Dev: "Então o problema é no servidor."
QA: "O servidor é o mesmo de produção."
Dev: "Então o problema é de produção."
```

A culpa viaja do dev para o servidor, do servidor para a infra, da infra para o fornecedor de cloud, do fornecedor para a latencia cosmica.

Esse padrão é tão comum que a Microsoft chegou a criar, como piada interna, um certificado de "Works on My Machine" para desenvolvedores. A brincadeira se tornou tão popular que virou meme oficial da industria.

## Exemplo em código: o try-catch redirecionador

```python
def processar_pedido(pedido):
    try:
        validar(pedido)
        calcular_total(pedido)
        salvar(pedido)
        notificar_cliente(pedido)
    except Exception as e:
        # Redirecao Tangencial implementada em codigo
        logger.error(
            "Erro ao processar pedido. "
            "Provavel causa: instabilidade no servico de notificacao "
            "ou timeout do banco de dados. "
            "Verificar com a equipe de infraestrutura.",
            extra={"pedido_id": pedido.id}
        )
        raise InfrastructureError("Falha em dependencia externa") from e
```

O erro pode ter sido na validação, no cálculo, no salvamento ou na notificação. Mas a mensagem de log já aponta para "infraestrutura" e "dependência externa". O próximo dev que ler esse log vai abrir chamado para o time de infra, que vai dizer que está tudo normal, que vai gerar uma reunião, que vai gerar um post-mortem onde ninguém descobre nada.

## O vocabulário da Redireção

Frases que denunciam a presenca do princípio:

- "Isso não é da minha squad."
- "A gente herdou isso."
- "O requisito mudou no meio da sprint."
- "O Jenkins que fez merda."
- "Isso funcionava até a última atualização do framework."
- "O dev que fez isso já saiu da empresa."
- "Isso é known issue, já tem task no backlog."

A última é especialmente eficaz: transforma o bug em item de backlog e, portanto, em responsabilidade de ninguém.

## Por que a Redireção sobrevive

- **Autopreservacao**: admitir erro em ambiente corporativo pode ter consequências politicas.
- **Complexidade real**: em sistemas distribuidos, a culpa genuinamente pode estar em qualquer lugar.
- **Cultura de culpa**: se o time pune erros, o time cria incentivo para esconder erros.
- **Falta de observabilidade**: sem logs, métricas e traces, ninguém pode provar nada.

## Consequências

- post-mortems inconclusivos que terminam com "vamos monitorar"
- bugs reincidentes porque a causa raiz nunca foi investigada
- erosao de confiança entre times
- cultura de apontar dedos em vez de resolver problemas
- a infra recebe chamados de tudo que ninguém quer investigar

## Relação com outros princípios

- **Insistimento Determinante**: "compila de novo" é uma forma de não precisar admitir que o código está errado.
- **Documentação Espartana**: sem documentação, ninguém pode provar que a culpa é sua.
- **Abstração Ignorancial**: se o erro não é tratado, ele não é de ninguém.
- **SHIT**: quando falta habilidade, sobra criatividade para inventar desculpas.

## Veredicto

A Redireção Tangencial é o princípio mais humano da POG. Não é sobre código, é sobre sobrevivência. Todo mundo já praticou. Todo mundo vai praticar de novo. A diferença entre um POGramador junior é um senior é que o senior redireciona com dados, graficos é uma apresentacao no Confluence.

Se você nunca disse "na minha maquina funciona", você ou está mentindo ou nunca fez deploy.

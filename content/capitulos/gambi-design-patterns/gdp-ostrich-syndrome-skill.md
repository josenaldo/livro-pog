---
title: Ostrich Syndrome Skill
description: Ostrich Syndrome Skill
sentence: Terminei, só falta testar.
sentence_author: POGgramador, às 18h00, com a mochila nas costas, falando pro chefe
order_number: 16000
date: 2020-04-16 00:15
name: gdp-ostrich-syndrome-skill
parent: gambi-design-patterns
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---
O **Ostrich Syndrome Skill** e a habilidade de enterrar a cabeca tecnicamente: warning, deprecacao e alerta de analise estatica sao tratados como ruido de fundo.

A filosofia e ancestral:

- o que os olhos nao veem, o backlog nao sente
- se compila, ta pronto
- warning e ciume da IDE

## Forma ritualistica

```java
@SuppressWarnings("all")
public class ProcessadorLegado {
    // aqui jaz a paz de espirito da equipe
}
```

Esse artefato da tranquilidade elimina alertas visiveis, mas nao elimina risco real.

## Sinais no projeto

- dezenas de supressoes globais sem justificativa
- upgrade de dependencia sempre adiado porque "vai quebrar tudo"
- build verde com log amarelo infinito
- regra de review: "nao mexe nisso agora"

Quando warning vira paisagem, defeito vira surpresa.

## Por que acontece

Motivos praticos:

- pressao por entrega imediata
- base legada muito ruidosa
- pouca maturidade de observabilidade
- medo de abrir frente tecnica sem patrocinio

Ignorar alerta pode ser decisao temporaria legitima. O problema e quando temporario vira dogma.

## Exemplo didatico

### Versao POG

```java
@SuppressWarnings("deprecation")
public void salvar(Data data) {
    repositorioAntigo.save(data); // API descontinuada ha anos
}
```

### Versao com controle

```java
public void salvar(Data data) {
    // TODO(POG-123): migrar para NovoRepositorio ate 2026-06-30
    repositorioAntigo.save(data);
}
```

Melhor ainda:

```java
public void salvar(Data data) {
    if (featureFlags.usarNovoRepositorio()) {
        novoRepositorio.save(data);
        return;
    }
    repositorioAntigo.save(data);
}
```

Nesse formato, alerta vira plano. Nao e so silenciamento.

## Risco acumulado

- vulnerabilidade de dependencia desatualizada
- comportamento removido em upgrade futuro
- dificuldade de onboarding (ninguem sabe o que pode quebrar)
- incidentes em cadeia quando enfim chega a migracao

## Como tratar sem paralisar entrega

1. classificar warning por severidade
2. criar "orcamento de warning" por sprint
3. proibir novas supressoes globais
4. exigir comentario com ticket e prazo ao suprimir
5. priorizar deprecacoes em codigo mais usado

Isso reduz ruido progressivamente sem exigir limpeza total imediata.

## Resumo POG

Ostrich Syndrome Skill da alivio emocional no curto prazo e ansiedade tecnica no longo. Silenciar alerta e facil. Gerenciar consequencia, nem tanto.

No evangelho POGrames: enterramos a cabeca para nao ver o problema, e depois abrimos incidente para descobrir por que ele cresceu no escuro.

## Mini checklist de mitigacao

Toda supressao de warning deve trazer justificativa tecnica e prazo para revisao. Se nao houver ticket, dono e data, nao e supressao estrategica: e abandono controlado. A diferenca entre pragmatismo e negligencia esta na rastreabilidade da decisao.

Esse controle evita que o warning vire folklore tecnico.

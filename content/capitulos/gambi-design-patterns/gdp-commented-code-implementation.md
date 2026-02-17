---
title: Commented Code Implementation Comments Forever
description: Commented Code Implementation Comments Forever
sentence: Bom, deixa estourar a bomba lá, aí quando vierem me pentelhar aqui eu vejo o que faço...
sentence_author: POGgramador, para outro POGgramador, só esperando o problema voltar
order_number: 18000
date: 2020-04-16 00:17
name: gdp-commented-code-implementation
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconMessage"

---
O **Commented Code Implementation** e o padrao em que codigo morto, codigo desativado e blocos de experimento ficam comentados para sempre no arquivo "por seguranca".

A narrativa e conhecida: "nao apaga, vai que precisa depois".

## Exemplo classico

```java
public void calcular() {
    // antiga regra de desconto
    // if (cliente.isPremium()) {
    //     total = total.multiply(new BigDecimal("0.8"));
    // }

    // nova regra (temporaria desde 2019)
    if (cliente.isPremium()) {
        total = total.multiply(new BigDecimal("0.85"));
    }
}
```

O comentario vira arquivo historico embutido no fonte. O problema e que historico verdadeiro ja existe: chama-se Git.

## Problemas que esse padrao cria

- arquivo cresce com ruido sem valor executavel
- leitor nao sabe qual regra vale de fato
- revisao fica lenta, porque ha muito texto irrelevante
- chance de "descomentar" trechos obsoletos por engano

Comentario deveria explicar decisao. Nao substituir versionamento.

## Quando isso comeca

- hotfix de madrugada com medo de perda
- ausencia de confianca em rollback
- equipe sem disciplina de branch/commit claro
- heranca de codigo antigo onde "apagar" e visto como risco

Em contexto de baixa previsibilidade, comentar parece seguro. Na pratica, so adia decisao tecnica.

## Exemplo didatico de alternativa

### Versao POG

```java
// TODO remover depois
// chamadaServicoAntigo();
chamadaServicoNovo();

// if (featureX) {
//   fluxoVelho();
// }
```

### Versao controlada

```java
if (featureFlags.usarFluxoNovo()) {
    chamadaServicoNovo();
} else {
    chamadaServicoAntigo();
}
```

Com feature flag, o comportamento fica explicito e rastreavel. Quando migrar tudo, remove-se o fluxo antigo com commit unico e mensagem clara.

## Comentario bom x comentario ruim

Comentario bom:

- registra contexto de negocio ou decisao arquitetural
- explica "por que" algo existe
- aponta ticket/issue quando ha debito tecnico assumido

Comentario ruim:

- replica o que o codigo ja diz
- guarda codigo morto
- serve de escudo para incerteza eterna

## Estrategia pragmatica de limpeza

1. remover blocos comentados sem uso comprovado
2. migrar excecoes para tickets rastreaveis
3. usar feature flag para transicao real
4. adotar regra de review: codigo comentado executavel nao entra

Isso reduz ruido sem interromper entrega.

## Resumo POG

Commented Code Forever e um museu de decisao incompleta. Parece prudente, mas degrada legibilidade e aumenta risco operacional.

Em modo POGramador: e guardar peças de carro velho na sala para "eventual necessidade" e chamar isso de estrategia de manutencao preventiva.

## Mini checklist de mitigacao

Codigo morto deve sair do arquivo e ficar no historico do Git. Comentario bom explica decisao; comentario ruim armazena medo. Se o trecho precisa existir por transicao, feature flag com prazo e opcao mais segura.

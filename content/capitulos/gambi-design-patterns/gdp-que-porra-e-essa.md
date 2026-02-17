---
title: WTF / WTH / QPE
description: WTF / WTH / QPE
sentence: É só colocar um IF!!
sentence_author: Gerente sem-noção sugerindo a solução técnica
order_number: 12000
date: 2020-04-16 00:11
name: gdp-que-porra-e-essa
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconMoodConfuzed"

---
O **WTF / WTH / QPE** e o padrao do trecho inexplicavel que "funciona" e, justamente por isso, ninguem tem coragem de tocar. Ele nasce de acumulacao de microajustes sem modelo mental claro.

## A assinatura da entidade

```java
"/ .*?<  ".replaceAll("", "").trim();
```

Voce le, pisca, respira fundo e pensa: "QPE e essa porra?".

## Como esse padrao aparece

- regex sem explicacao de intencao
- cadeia de transformacoes opacas (`replace`, `substring`, `split`) em sequencia
- condicoes com dupla negacao e sem nome intermediario
- codigo que depende de ordem acidental de operacoes

Em geral, o autor resolveu um bug real. O problema e que o conserto ficou sem contexto e sem contrato testavel.

## Causa tipica

- hotfix de emergencia
- copia de snippet sem entendimento completo
- falta de testes de comportamento
- ausencia de revisao semantica

No dia da entrega, passa. Na sprint seguinte, vira area proibida.

## Exemplo didatico

### Versao POG

```java
String out = entrada
    .replace("--", "")
    .replaceAll("[\\s]+", " ")
    .replace(" ;", ";")
    .trim();
```

Sem contexto, ninguem sabe quais casos a regra cobre.

### Versao explicita

```java
public String normalizarComando(String entrada) {
    String semComentario = removerComentarioInline(entrada);
    String espacosNormalizados = normalizarEspacos(semComentario);
    return normalizarSeparadores(espacosNormalizados);
}

private String removerComentarioInline(String texto) {
    // remove tudo apos "--"
    int idx = texto.indexOf("--");
    return idx >= 0 ? texto.substring(0, idx) : texto;
}
```

Aqui o comportamento fica nomeado por intencao. Se mudar regra, voce sabe onde alterar.

## Como evitar o efeito "codigo magico"

- nomear subpassos com semantica de negocio
- adicionar testes com exemplos reais de entrada/saida
- documentar limites da regra (o que nao cobre)
- preferir clareza a "one-liner genial"

Codigos curtos nao sao automaticamente bons. Codigos entendiveis sao.

## O perigo social do QPE

Trecho opaco cria dependencia pessoal. So quem escreveu "entende". Isso vira gargalo humano e risco de continuidade.

Quando equipe evita mexer por medo, o software para de evoluir com seguranca.

## Correcao pragmatica

1. escolher um trecho QPE de alto impacto
2. escrever testes de comportamento atual
3. refatorar para passos nomeados
4. manter resultado identico e reduzir opacidade

Assim voce melhora entendimento sem alterar regra de negocio no susto.

## Resumo POG

WTF/WTH/QPE e o ponto onde codigo deixa de ser comunicacao e vira feitico. Pode funcionar anos, mas cobra caro em manutencao e transferencia de contexto.

Na gramatica POGramadora: quando a explicacao de um trecho comeca com "nao me pergunte", ja estamos no dominio do QPE.

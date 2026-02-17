---
title: RCP Pattern (Reuse by Copy and Paste)
description: RCP Pattern (Reuse by Copy and Paste)
sentence: Tive que arrumar direto no banco - daí funcionou! Se o problema "voltar", nos ligue novamente.
sentence_author: POGger sobre O Poder da Fé
order_number: 13000
date: 2020-04-16 00:12
name: gdp-reuse-by-copy-and-paste
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
O **RCP Pattern** (Reuse by Copy and Paste) e o coracao industrial da POG. A regra e objetiva: se um trecho resolveu um problema, multiplique ele sem pudor.

Ctrl+C e Ctrl+V viram framework de produtividade.

## Principio da Reflexao Reprodutoria

A logica e quase poetica:

- copiar acelera entrega
- adaptar "na unha" parece barato
- cada copia vira uma variante do original

No inicio, a equipe sente ganho real de velocidade. Depois, cada alteracao exige cacar todas as duplicacoes, e sempre sobra uma esquecida.

## Exemplo didatico

```java
// Modulo A
if (usuario == null || usuario.getStatus().equals("INATIVO")) {
    throw new RegraDeNegocioException("Usuario invalido");
}

// Modulo B (copiado e colado)
if (usuario == null || usuario.getStatus().equals("INATIVO")) {
    throw new RegraDeNegocioException("Usuario invalido");
}

// Modulo C (copiado e "adaptado")
if (usuario == null || usuario.getStatus().equals("INATIVO") || usuario.isBloqueado()) {
    throw new RegraDeNegocioException("Usuario invalido");
}
```

Quando a regra muda, A e B atualizam. C fica diferente. Surge bug "aleatorio" por divergencia de comportamento.

## Smells associados

- duplicacao de codigo
- shotgun surgery (uma mudanca, muitos arquivos)
- incoerencia de regra entre fluxos "parecidos"
- testes repetitivos cobrindo variacoes acidentais

Esse padrao costuma ser invisivel no code review rapido, porque cada trecho isolado "faz sentido". O problema esta na soma.

## Por que times caem nisso

- backlog pressionando por throughput
- ausencia de componentes reutilizaveis simples
- medo de refatorar codigo compartilhado e quebrar legado
- cultura de "depois a gente organiza"

No contexto certo, copiar e colar e uma decisao taticamente racional. O erro e transformar tatica emergencial em estrategia permanente.

## Evolucao didatica

### Versao com copia

```java
// regra repetida em varios lugares
if (pedido == null || pedido.getItens().isEmpty()) {
    throw new RegraDeNegocioException("Pedido invalido");
}
```

### Versao com encapsulamento minimo

```java
public final class ValidadorPedido {
    public static void validar(Pedido pedido) {
        if (pedido == null || pedido.getItens().isEmpty()) {
            throw new RegraDeNegocioException("Pedido invalido");
        }
    }
}

// uso
ValidadorPedido.validar(pedido);
```

Agora a regra tem dono unico. Mudou uma vez, mudou para todos.

## Estrategia pratica para legado

1. medir duplicacao dos trechos criticos
2. criar utilitario/servico pequeno para regra comum
3. migrar usos aos poucos (por modulo)
4. cobrir com testes de contrato

Sem "big bang". Sem promessa heroica.

## Resumo POG

RCP e maravilhoso para nascer software rapido e produzir variacoes criativas de bug. Em projetos longos, vira multiplicador de custo de manutencao.

No dicionario POGramador: e clonar problema em alta disponibilidade para garantir demanda futura da sustentacao.

---
title: Snow White Returns
description: Snow White Returns
sentence: A Função ficou com 3000 linhas porque é impossível deixar ela menor
sentence_author: Programador POG tentando se passar por expert
order_number: 31000
date: 2021-08-24 00:23
name: gdp-snow-white-returns
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
O **Snow White Returns** celebra multiplos pontos de retorno em funcoes gigantes. A ideia original era simplificar casos locais. O uso extremo transforma fluxo em labirinto.

POrque um `return` claro quando voce pode ter sete, doze ou vinte e um?

## Como o padrao se forma

- metodo cresce sem refatoracao
- cada condicao ganha um `return` de emergencia
- caminhos de saida se multiplicam sem estrategia
- leitura sequencial deixa de representar fluxo real

Em funcoes pequenas, early return pode melhorar legibilidade. Em funcoes enormes e sem estrutura, vira desorientacao.

## Exemplo didatico (caotico)

```java
public Resultado processar(Pedido pedido) {
    if (pedido == null) return Resultado.erro("pedido nulo");
    if (pedido.getItens().isEmpty()) return Resultado.erro("sem itens");

    if (!estoqueDisponivel(pedido)) return Resultado.erro("sem estoque");

    if (pedido.isRetirada()) {
        if (!validarLoja(pedido)) return Resultado.erro("loja invalida");
        return Resultado.ok("retirada liberada");
    }

    if (pedido.isEntrega()) {
        if (!validarEndereco(pedido)) return Resultado.erro("endereco invalido");
        if (pedido.getFrete() == null) return Resultado.erro("frete ausente");
        return Resultado.ok("entrega liberada");
    }

    return Resultado.erro("tipo de entrega desconhecido");
}
```

Aqui ainda parece legivel porque e curto. Agora imagine isso com 700 linhas e efeitos colaterais entre condicoes.

## Risco principal

- ponto de saida demais dificulta rastrear estado
- logging e auditoria ficam inconsistentes
- manutencao adiciona novos retornos sem revisar os antigos
- mudanca de regra quebra caminhos esquecidos

No fim, o bug nao esta em um return especifico. Esta na falta de desenho do fluxo.

## Versao mais organizada

```java
public Resultado processar(Pedido pedido) {
    validarEntrada(pedido);

    if (pedido.isRetirada()) {
        return processarRetirada(pedido);
    }

    if (pedido.isEntrega()) {
        return processarEntrega(pedido);
    }

    return Resultado.erro("tipo de entrega desconhecido");
}

private Resultado processarRetirada(Pedido pedido) {
    validarLojaRetirada(pedido);
    return Resultado.ok("retirada liberada");
}

private Resultado processarEntrega(Pedido pedido) {
    validarDadosEntrega(pedido);
    return Resultado.ok("entrega liberada");
}
```

Ainda existem retornos multiplos, mas cada funcao tem escopo pequeno e intencao clara.

## Como corrigir sem guerra

1. medir funcoes com maior complexidade ciclomática
2. extrair blocos por responsabilidade
3. manter retornos apenas onde aumentam clareza
4. padronizar log de entrada/saida por fluxo

Nao e sobre proibir `return` cedo. E sobre evitar floresta de saidas em metodo sem fronteira.

## Resumo POG

Snow White Returns e divertido enquanto o autor lembra o caminho de cada saida. Quando o contexto muda, vira castelo sem planta baixa.

No idioma POG: cada return extra e uma porta secreta. Bom para quem construiu. Terrivel para quem herdou.

## Mini checklist de mitigacao

Retornos multiplos so sao problema quando escondem complexidade acidental. Se cada retorno estiver em funcao pequena e com intencao clara, tudo bem. O anti-pattern surge quando os retornos viram atalho para evitar modelagem do fluxo principal.

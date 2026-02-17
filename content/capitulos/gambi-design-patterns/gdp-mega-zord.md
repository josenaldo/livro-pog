---
title: Mega Zord
description: Mega Zord
sentence: Claro que dá pra alterar essa configuração. É só mexer no código!
sentence_author: POGramador propondo uma POG ao gerente
order_number: 26000
date: 2020-04-16 00:25
name: gdp-mega-zord
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconRobot"

---
O **Mega Zord** e o padrao da superfuncao: um metodo gigante que concentra multiplas responsabilidades para "facilitar manutencao". Em vez de modularizar, funde tudo em uma unidade colossal.

No discurso: centralizacao. Na pratica: acoplamento total.

## Caracteristicas classicas

- centenas ou milhares de linhas em um unico metodo
- muitos `if`, `switch` e variaveis de controle
- efeitos colaterais em banco, arquivo, API e tela no mesmo fluxo
- baixa cobertura de teste por medo de tocar no bloco

Quando um metodo exige mapa mental para ser lido, o Mega Zord ja atingiu forma completa.

## Exemplo didatico (versao POG)

```java
public Resultado processarTudo(Pedido pedido, Usuario usuario, Map<String, Object> cfg) {
    // valida entrada
    // calcula imposto
    // aplica desconto
    // grava banco
    // envia email
    // chama API externa
    // gera log
    // atualiza cache
    // devolve resposta
    // 800 linhas depois...
    return resultado;
}
```

O problema nao e tamanho por si so. E mistura de motivos de mudanca. Uma regra fiscal muda por motivo A. O email muda por motivo B. Estao presos no mesmo bloco.

## Por que times criam Mega Zord

- evolucao incremental sem refatoracao
- pressa para encaixar regra nova em ponto "que ja funciona"
- baixa confianca em extrair componentes
- ausencia de ownership claro do modulo

A cada sprint, entra "so mais um if". Em um ano, nasce a criatura.

## Efeito colateral

- regressao frequente
- review superficial (arquivo grande desencoraja analise profunda)
- dependencia de "guardiao do modulo"
- onboarding lento

O sistema fica robusto para quem criou e hostil para o resto da equipe.

## Exemplo de decomposicao minima

```java
public Resultado processarTudo(Pedido pedido, Usuario usuario, Map<String, Object> cfg) {
    validarEntrada(pedido, usuario);
    Valores valores = calcularValores(pedido, cfg);
    PersistenciaOut persistencia = persistirPedido(pedido, valores);
    integrarServicosExternos(persistencia);
    notificarPartes(persistencia);
    return montarResultado(persistencia);
}
```

Ainda e um fluxo central, mas com fronteiras internas claras. Isso ja permite teste por etapa e reduz risco de alteracao.

## Estrategia pragmatica de reducao

1. mapear secoes logicas no metodo gigante
2. extrair uma secao por vez para metodo privado
3. adicionar testes de regressao antes/depois da extracao
4. mover etapas estaveis para classes dedicadas

Sem reescrita completa. Sem promessa de refatoracao epica.

## Resumo POG

Mega Zord e poderoso para entrega imediata e aterrorizante para evolucao sustentavel. Quanto mais cresce, mais caro fica tocar nele.

No sotaque POG: e juntar todos os fios do painel num unico disjuntor e comemorar que "agora ta centralizado".

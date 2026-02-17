---
title: Incremental patching debug
description: Incremental patching debug
sentence: Limpa o histórico e o cache e dá um [Control + F5] que funciona
sentence_author: Resposta padrão do Webmaster sobre POG
order_number: 8000
date: 2020-04-16 00:07
name: tecnica-incremental-patching-debug
parent: tecnicas
isParent: false
status: done
icon: "tabler/IconBug"

---
A tecnica de **Incremental Patching Debug** resolve bug sem investigar causa raiz: aplica patch pequeno, testa, aplica outro patch, testa de novo, e repete ate o erro "sumir".

E um processo de tentativa e erro orientado a ansiedade.

## Ritual de aplicacao

- a versao atual parou
- pega um zip antigo "que funcionava"
- reaplica arquivos por substituicao parcial
- sobe para homologacao
- se passar no smoke test, chama de correcao

No curto prazo, pode destravar incidente. No longo prazo, mistura estados de codigo sem rastreabilidade.

## Exemplo classico

```text
Patch 1: trocar apenas Controller
Patch 2: voltar Repository para versao de ontem
Patch 3: copiar Utils de outro branch
Patch 4: comentar trecho suspeito
Resultado: erro principal sumiu, dois bugs novos nasceram
```

O nome "incremental" da impressao de metodo cientifico. A pratica costuma ser bricolagem emergencial.

## O que quase nunca entra nesse fluxo

- depuracao real
- reproducao consistente do problema
- teste automatizado de regressao
- analise de impacto

Sem essas etapas, correcao vira loteria estatistica.

## Por que isso e comum

- pressao por hotfix imediato
- sistema sem observabilidade
- equipe sem ambiente reproduzivel
- cultura de apagar incendio e seguir

A tecnica nao surge de incompetencia individual. Surge de contexto tecnico desorganizado.

## Exemplo didatico

### Versao POG

```java
// "corrige" null pointer sem entender origem
if (cliente == null) {
    cliente = new Cliente();
}
```

Esse patch elimina a excecao localmente, mas pode mascarar falha de integracao que deveria impedir o fluxo.

### Versao mais segura

```java
if (cliente == null) {
    throw new RegraDeNegocioException("Cliente obrigatorio para concluir pedido");
}
```

E junto disso:

- reproduzir cenario em teste
- investigar por que `cliente` veio nulo
- corrigir na origem

## Risco acumulado

- codigo vira mosaico de remendos
- regressao silenciosa cresce
- conhecimento do sistema fica tribal
- cada novo patch aumenta medo de mudar

Quando o time diz "nao encosta nisso que pode piorar", o incremental patching ja virou cultura.

## Como evoluir sem parar entrega

1. manter hotfix emergencial quando necessario
2. abrir tarefa obrigatoria de causa raiz apos incidente
3. registrar testes de regressao para o bug corrigido
4. reduzir area de patch com observabilidade (logs, metricas, tracing)

Assim voce preserva velocidade operacional sem normalizar gambiarra perpetua.

## Resumo POG

Incremental Patching Debug e curativo util para sangramento imediato. O erro esta em chamar curativo de tratamento definitivo.

No glossario POGramador: e consertar encanamento com fita isolante em camadas progressivas e medir sucesso pelo tempo ate o proximo vazamento.

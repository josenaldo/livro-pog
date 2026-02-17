---
title: Nonsense Flag Nonsense Naming
description: Nonsense Flag Nonsense Naming
sentence: É só reiniciar que funciona!
sentence_author: POGgramador logo de manhã com copo de café na mão
order_number: 17000
date: 2020-04-16 00:16
name: gdp-nonsense-flag
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
O **Nonsense Flag Nonsense Naming** transforma nomeacao em criptografia artesanal. Variaveis nao explicam intencao; elas insinuam, confundem e exigem mediunidade de quem le.

```java
teste1, temp2, a, b, x
jaTrocouDeAba, botaoClicado, foiAtualizado, passouPorAqui
numeroMagico, naoAchou, temErro
anterior5, atual5, anteriorDoAnterior5
```

Esse padrao costuma vir acompanhado de flags booleans caoticas (`isOk`, `isReady2`, `podeTalvez`), criando fluxo de decisao que parece enquete de rede social.

## Efeito semantico

Nome ruim nao e so "feio". Ele altera custo cognitivo:

- leitura fica lenta
- regra de negocio vira adivinhacao
- review perde profundidade
- bug de entendimento aumenta

Quando o codigo exige reuniao para explicar cada variavel, a manutencao ja quebrou.

## Exemplo didatico

### Versao POG

```java
if (a && !b && x > 0) {
    faz1();
} else if (a && b && x == 0) {
    faz2();
}
```

### Versao legivel

```java
boolean clienteElegivel = cliente.estaAtivo();
boolean pedidoJaFaturado = pedido.isFaturado();
int quantidadeItens = pedido.getItens().size();

if (clienteElegivel && !pedidoJaFaturado && quantidadeItens > 0) {
    gerarFatura();
} else if (clienteElegivel && pedidoJaFaturado && quantidadeItens == 0) {
    registrarInconsistencia();
}
```

A logica pode ser a mesma. A diferenca e que agora o leitor entende o dominio sem abrir 12 arquivos.

## Por que o time cai nisso

- codigo escrito sob estresse
- falta de padrao de nomeacao
- medo de "nome grande"
- copia de variavel antiga para novo contexto

E comum em legado com baixa cobertura de teste: ninguem renomeia por receio de quebrar algo invisivel.

## Nonsense Flag: o primo perigoso

Flags sem semantica clara criam combinacoes explosivas.

```java
if (isOk && !isReady && podeAtualizar && modo2) {
    // o que exatamente isso significa?
}
```

Cada booleano adicional dobra os estados possiveis. Sem modelagem explicita, o fluxo fica impossivel de validar mentalmente.

## Abordagem pragmatica

1. renomear primeiro as variaveis de maior impacto
2. extrair condicoes para metodos com nome de negocio
3. substituir multiplos booleans por enum/objeto de estado
4. registrar convencoes simples de nomeacao no time

Pequenas mudancas de semantica trazem ganho real sem refatoracao monstruosa.

## Resumo POG

Nonsense Naming e Nonsense Flag dao sensacao de velocidade na digitacao e cobram pedagio eterno na leitura. O sistema roda, mas o entendimento nao escala.

Na tradicao POGristica: se nem voce entende o nome da variavel depois de uma semana, o ritual foi concluido com excelencia duvidosa.

## Mini checklist de mitigacao

Renomeacao progressiva de variavel e melhoria de baixo risco e alto retorno. Cada nome claro reduz duvida em review, onboarding e debug. Sem semantica compartilhada, a equipe conversa sobre sintaxe e nunca sobre dominio.

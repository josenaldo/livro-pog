---
title: Perfectness Execution Bulletproof
description:
image:
sentence: ...ah!!! Isto é um erro comum do Windows!
sentence-author: POGramador tentando ganhar tempo para corrigir seu código
order_number: 21000
date: 2020-04-16 00:20
name: gdp-bulletproof
parent: gambi-design-patterns
isParent: false
status: backlog
---
Garanta que qualquer operação complexa sempre execute com sucesso!
O sistema não deve apresentar erros

```java
try {
    if (alterar(valor1, valor2)) {
        return new Mensagem("Operação concluída com sucesso!");
    } else {
        return new Mensagem("Operação concluída com sucesso!");
    }
} catch (Throwable e) {
     return new Mensagem("Operação concluída com sucesso!");
}
```

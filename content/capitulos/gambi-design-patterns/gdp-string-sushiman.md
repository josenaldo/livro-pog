---
title: String Sushiman
description: String Sushiman
sentence: Quando eu testei, funcionou!
sentence_author: POGramador demonstrando as gambiarras para seu Gerente Sem Noção
order_number: 23000
date: 2020-04-16 00:22
name: gdp-string-sushiman
parent: gambi-design-patterns
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---

Ao invés de criar parâmetros, passe uma ou poucas strings!
Crie quantas regras forem necessárias sobre essas strings!

```java
public Tabela montaTabela(String linguicao){

    String[] colunas = linguicao.split("|");

    for(String coluna : colunas){
        String[] campos = coluna.split(",");
        // POGuices com os valores
    }
}
```

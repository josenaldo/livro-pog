---
title: Exception Success
description: 
image: 
sentence: Quando eu cheguei já tava assim!!!
sentence-author: POGramador, querendo tirar o seu da reta!
order_number: 22000
date: 2020-04-16 00:21
---
Use exceções para o controle de fluxo do POGrama!

```java
public static void somar(int a, int b) {
    System.out.println(a + b);
    throw new RuntimeException("Operação realizada com sucesso!");
}
```

```java
if (!request.getSession(true).getAttribute("TipoUsuario").toString().equals("1")) {
    throw new Exception(
    "<span style="\"color:#ff0000;\""><b><u>Acesso negado</u>:</b>"
    + " somente usuários com perfil de "
    + "administrador podem ter acesso a esta página.</span>");
}
```
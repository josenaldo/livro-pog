---
title: Sleeper Human Factor
description:
image:
sentence: Até ontém quando eu mexi estava tudo funcionando!
sentence_author: Resposta do POGramador ao ser questionado sobre a pane geral no sistema
order_number: 24000
date: 2020-04-16 00:23
name: gdp-human-factor
parent: gambi-design-patterns
isParent: false
status: backlog
---
Se a ação é rápida demais para o usuário perceber, coloque um atraso!

```java
public class MedidorDePOGresso implements Runnable {
    public void run() {
        while (true) {
            // Realiza um processamento rápido aqui...
            try {
                // ... atrasa propositalmente aqui
                Thread.sleep(1000);
            } catch (InterruptedException exc) {
            }
            progress.setValue(blablabla.getPorcentagem());
        }
    }
}
```

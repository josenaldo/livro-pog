---
title: Sleeper Human Factor
description: Sleeper Human Factor
sentence: Até ontém quando eu mexi estava tudo funcionando!
sentence_author: Resposta do POGramador ao ser questionado sobre a pane geral no sistema
order_number: 24000
date: 2020-04-16 00:23
name: gdp-human-factor
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
O **Sleeper Human Factor** aplica atraso artificial para simular processamento, sincronizar corridas acidentais ou "melhorar percepcao" do usuario. O instrumento ritual e `sleep`.

```java
public class MedidorDePOGresso implements Runnable {
    public void run() {
        while (true) {
            // Realiza um processamento rapido aqui...
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

No curto prazo, parece resolver sintomas. No longo, vira latencia institucionalizada.

## Onde esse padrao aparece

- interface piscando rapido demais e alguem "acalma" com delay
- integracao eventual falhando e o time adiciona espera fixa
- teste instavel ficando "verde" com `sleep(2000)`
- fila/concorrencia sem sincronizacao correta

Quando o sistema depende de dormir para funcionar, o design acordou errado.

## Motivos reais para adocao

- corrida de thread dificil de reproduzir
- deadline apertado com bug intermitente
- falta de mecanismo de sincronizacao/evento
- cultura de "se resolveu, nao mexe"

O Human Factor nao e burrice; e resposta emergencial. O problema e deixar permanente.

## Exemplo didatico

### Versao POG

```java
public void enviarNotificacao(Pedido pedido) {
    salvar(pedido);
    try {
        Thread.sleep(3000); // espera "banco refletir"
    } catch (InterruptedException e) {
    }
    mensageria.publicar(pedido.getId());
}
```

### Versao com sincronizacao explicita

```java
public void enviarNotificacao(Pedido pedido) {
    Pedido salvo = repositorio.salvar(pedido);
    // publica quando ha id persistido, sem espera arbitraria
    mensageria.publicar(salvo.getId());
}
```

Se precisar de consistencia assincrona, use evento transacional, fila confirmada ou mecanismo de retry com backoff controlado. Nao tempo fixo magico.

## Impacto tecnico

- tempo de resposta pior sem ganho funcional
- throughput reduzido sob carga
- comportamento imprevisivel conforme ambiente
- testes lentos e flakey

Delay fixo pode passar na maquina do dev e falhar em producao, ou vice-versa.

## Como remover com baixo risco

1. localizar sleeps fora de UI de animacao intencional
2. classificar por finalidade (sincronizacao, UX, workaround)
3. substituir por evento, callback, lock ou polling robusto com timeout
4. medir antes/depois com metrica de latencia

## Sobre UX real

Nem todo atraso e pecado. Em UX, feedback visual minimo pode ser util para comunicar estado. A diferenca e intencao e local:

- atraso visual controlado na camada de interface: ok
- atraso tecnico para esconder bug de fluxo: risco alto

## Resumo POG

Sleeper Human Factor e anestesia operacional. O paciente para de reclamar por alguns segundos, mas a causa da dor permanece.

No catecismo POGristico: se o bug corre demais, deita ele no `sleep` e chama de experiencia humana otimizada.

---
title: Criptocodagem
description: A arte de escrever código que só o autor entende (e olhe lá)
sentence: 1337 h4x0r5 dud3 lol
sentence_author: O código, falando por si mesmo
order_number: 5600
date: 2020-04-16 00:04
name: principio-criptocodagem
parent: principios
isParent: false
status: done
icon: "tabler/IconShieldLock"

---

A **Criptocodagem** é o princípio que transforma código-fonte em texto cifrado. Variáveis de uma letra, funções com nomes incompreensíveis, lógica invertida, formatação alienígena. O resultado é um código que funciona perfeitamente, mas que nenhum ser humano — incluindo o autor, depois de duas semanas — consegue ler.

Se a Documentação Espartana remove a explicação, a Criptocodagem remove a legibilidade. Juntas, formam a dupla perfeita do caos.

## O mecanismo

1. **Nomeação críptica**: variáveis como `x`, `tmp`, `data2`, `aux`, `flag`.
2. **Lógica invertida**: `if (!(!condicao && !outra))` em vez de `if (condicao || outra)`.
3. **Abreviações pessoais**: `usrMgr`, `cntrlr`, `hdlr`, `svc`, `rpo`.
4. **Truques de linguagem**: bitwise operators para coisas simples, comma operator, void expressions.
5. **Formatação caótica**: indentação inconsistente, linhas de tamanhos arbitrários.

## Exemplo clássico: as variáveis do além

```c
int a, b, c, d, e, f;
float x, y, z, w;
char *p, *q, *r;

void fn(int n, int m, int k) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            a = i * m + j;
            b = (a > k) ? a - k : k - a;
            c = b % (n + 1);
            if (c < d) {
                e = f + c;
                *p++ = (char)(e & 0xFF);
            }
        }
    }
}
```

O que esse código faz? Não dá pra saber sem executar passo a passo. Pode ser um algoritmo de compressão, um gerador de hash, ou um jogo da velha. As variáveis não contam. A lógica não revela. É um enigma compilável.

## Caso real: o ofuscamento não-intencional

Em repositórios no GitHub, é comum encontrar código que foi escrito sem intenção de ofuscar, mas que atinge o mesmo resultado por descuido acumulado:

```javascript
// Encontrado em projeto real (nomes alterados por piedade)
function p(d) {
  var r = [], t = {}, n, i, j;
  for (i = 0; i < d.length; i++) {
    n = d[i].t || 'o';
    if (!t[n]) t[n] = [];
    t[n].push(d[i]);
  }
  for (j in t) {
    if (t.hasOwnProperty(j)) {
      r.push({ g: j, c: t[j].length, i: t[j] });
    }
  }
  return r.sort(function(a, b) { return b.c - a.c; });
}
```

O que essa função faz? Agrupa objetos por um campo `t` (tipo), conta quantos tem em cada grupo e retorna ordenado por contagem descendente. Uma operação simples, completamente obscurecida por nomes de uma letra.

Versão legível:

```javascript
function agruparPorTipo(itens) {
  const grupos = {};

  for (const item of itens) {
    const tipo = item.tipo || 'outro';
    if (!grupos[tipo]) grupos[tipo] = [];
    grupos[tipo].push(item);
  }

  return Object.entries(grupos)
    .map(([tipo, membros]) => ({
      grupo: tipo,
      quantidade: membros.length,
      itens: membros,
    }))
    .sort((a, b) => b.quantidade - a.quantidade);
}
```

Mesma lógica. Legível. Mantenível. Sem magia.

## O bestiário da Criptocodagem

Padrões frequentes encontrados em codebases criptografadas:

### A boolean trap

```java
// O que significa o 'true, false, true'?
processarPedido(pedido, true, false, true);
```

Sem ler a assinatura do método, é impossível saber o que cada boolean controla. Poderia ser `(validar, notificar, logar)` ou `(urgente, desconto, internacional)`.

### O número mágico

```python
if status == 7:
    enviar_alerta()
elif status == 13:
    cancelar()
elif status == 42:
    # a resposta para a vida, o universo e tudo mais
    finalizar()
```

O que significam 7, 13 e 42? Sem enum, sem constante nomeada, sem documentação: números mágicos são a forma mais pura de criptografia em código.

### A regex hieroglífica

```perl
$_ =~ s/(?<=\d)(?=(\d{3})+(?!\d))/./g;
```

Essa regex formata números com separador de milhar. Ou invoca um demônio. Pode ser ambos.

## Exemplo do GitHub: minificação manual

Em projetos antigos, antes de bundlers e minifiers automáticos, era prática manual "otimizar" JavaScript removendo espaços e renomeando variáveis:

```javascript
// Original
function calcularTotal(itens, desconto) {
    var total = 0;
    for (var i = 0; i < itens.length; i++) {
        total += itens[i].preco * itens[i].quantidade;
    }
    return total - (total * desconto / 100);
}

// "Otimizado" pelo dev
function c(a,d){var t=0;for(var i=0;i<a.length;i++)t+=a[i].p*a[i].q;return t-t*d/100}
```

O "otimizado" era commitado assim. Sem source map. Sem versão legível ao lado. O próximo dev que precisasse ajustar o cálculo teria que decifrar letra por letra.

## A espiral da Criptocodagem

O ciclo é autodestrutivo:

1. Dev escreve código crítico → não nomeia bem
2. Passa no code review → "parece funcionar"
3. Precisa de manutenção → outro dev não entende
4. Outro dev modifica sem entender → introduz bug
5. Bug é corrigido com mais Criptocodagem → complexidade aumenta
6. Repete até ninguém conseguir mexer

## Por que a Criptocodagem sobrevive

- **Hábito**: devs que aprenderam a programar com variáveis de uma letra nunca mudaram.
- **Pressa**: nomes curtos são mais rápidos de digitar.
- **Escopo mental**: o dev entende na hora de escrever e não pensa no leitor futuro.
- **Falta de padrão**: sem linter configurado, cada um escreve como quer.
- **Job security**: se só você entende o código, só você pode mante-lo.

## Consequências

- tempo de leitura de código multiplica por 5-10x
- bugs introduzidos por interpretação errada
- refatoração impossível sem reescrever do zero
- dependência crítica de um indivíduo
- moral da equipe cai quando precisam mexer no "código do Fulano"

## Relação com outros princípios

- **Economia Linear**: compactação extrema gera criptografia natural.
- **Documentação Espartana**: sem docs + sem legibilidade = caixa preta.
- **Onisciência Finita**: o dev não percebe que seu código é ilegível porque *ele* entende.
- **Proatividade Egocêntrica**: "meu estilo" que ninguém mais compartilha.

## Veredicto

A Criptocodagem é o princípio mais silencioso da POG. Ela não gera erro. Não quebra testes. Não bloqueia deploy. Ela simplesmente torna o código impenetrável, lentamente, commit a commit, até que a manutenção se torna arqueologia.

O antídoto é simples mas exige disciplina: nomeie coisas pelo que elas representam, não pelo que o teclado oferece de mais rápido. Variáveis deveriam contar uma história. Se a sua conta uma cifra, o leitor vai precisar de um decodificador.

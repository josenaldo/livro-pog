---
title: Documentação Espartana
description: A crença de que código bom se explica sozinho e comentários são fraqueza
sentence: Comentários são para amadores!
sentence_author: Dev senior, cujo código ninguém consegue ler
order_number: 5500
date: 2020-04-16 00:04
name: principio-documentacao-espartana
parent: principios
isParent: false
status: done
icon: "tabler/IconFileOff"

---

A **Documentação Espartana** é o princípio que defende: se o código precisa de comentário, o código está mal escrito. E se o código está bem escrito, comentário é redundância. Portanto, em *nenhum* cenário comentários são necessários.

A lógica é sedutora. O problema é que o conceito de "código auto-explicativo" e muito mais raro do que os praticantes da Documentação Espartana acreditam.

## O mecanismo

1. **Dev escreve código**: com lógica complexa, regras de negócio implícitas e decisões de design.
2. **Dev não comenta**: porque "o código fala por si".
3. **Outro dev le o código**: e não entende.
4. **Dev original explica verbalmente**: "ah, isso é porque o cliente queria assim".
5. **Explicacao se perde**: o dev original sai da empresa. O contexto morre com ele.

## Exemplo clássico: o código "auto-explicativo"

```python
def proc(d, f, t):
    r = []
    for i in d:
        if i[f] > t:
            r.append(i)
    return r
```

O dev que escreveu esse código jura que é auto-explicativo. Ele sabe que `d` é "dados", `f` é "field", `t` é "threshold" e `r` é "result". O problema é que mais ninguém sabe. E o dev vai esquecer em 3 meses.

Versão com nome de variáveis decentes (sem precisar de comentários):

```python
def filtrar_acima_do_limite(registros, campo, limite):
    return [r for r in registros if r[campo] > limite]
```

Mas a Documentação Espartana vai além de nomes ruins. Ela se manifesta também na ausência de documentação de *decisões*.

## O problema das decisões invisiveis

Código pode ser legível é ainda assim inexplicavel. Por exemplo:

```javascript
const TIMEOUT_MS = 3700;

function calcularDesconto(valor) {
  if (valor > 500 && valor < 500.01) {
    return 0;
  }
  return valor * 0.1;
}
```

O código é legível. Mas por que o timeout e 3700ms e não 3000 ou 5000? Por que existe uma verificacao para valores entre 500 e 500.01? Sem comentário, ninguém sabe. Com comentário:

```javascript
// Timeout ajustado para 3700ms porque o gateway de pagamento
// retorna timeout apos 4000ms e precisamos de margem para retry
const TIMEOUT_MS = 3700;

function calcularDesconto(valor) {
  // Bug #4521: valores exatamente iguais a 500 geravam desconto
  // negativo por erro de arredondamento no IEEE 754.
  // Workaround: tratar faixa de epsilon como caso especial.
  if (valor > 500 && valor < 500.01) {
    return 0;
  }
  return valor * 0.1;
}
```

Agora faz sentido. Mas o praticante da Documentação Espartana removeria esses comentários porque "poluem o código".

## Caso real: README.md vazio

Em repositórios no GitHub, é deprimentemente comum encontrar:

```markdown
# meu-projeto

TODO: adicionar documentacao
```

Ou, pior:

```markdown
# meu-projeto
```

Sem descrição. Sem instruções de instalacao. Sem explicação do que o projeto faz. O dev que criou o repo sabe o que o projeto faz. Todos os outros seres humanos do planeta não sabem.

O contrário também existe e e igualmente problematico: o README gerado automaticamente pelo framework que ninguém atualizou:

```markdown
# Create React App

This project was bootstrapped with Create React App.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
```

O README explica como rodar um projeto genérico. Não explica o que *este* projeto faz, quais são as regras de negócio, como configurar o ambiente, ou onde estão as coisas.

## Exemplo em código: a função sem contrato

```java
public Map<String, Object> processar(Map<String, Object> entrada) {
    // ... 200 linhas de logica ...
    return resultado;
}
```

Qual é a estrutura esperada do `Map` de entrada? Quais chaves são obrigatórias? O que cada valor representa? Qual é o formato do retorno? Quando lanca exceção?

Sem documentação, a única forma de descobrir e ler as 200 linhas. Ou perguntar ao autor. Ou rodar com dados de teste e ver o que sai.

## O mito do "bom dev não precisa de docs"

A Documentação Espartana frequentemente se sustenta em uma hierarquia implícita:

- Dev junior precisa de comentários → dev junior é fraco
- Dev senior entende sem comentários → dev senior é forte
- Logo, comentários são para fracos

O problema é que até dev senior esquece. Dev senior muda de projeto. Dev senior le código as 23h e não está no auge cognitivo. Dev senior trabalha em 5 repos ao mesmo tempo e não lembra o contexto de cada um.

A documentação não é para o dev que escreveu. É para o dev que vai ler. E esse dev pode ser você mesmo, daqui a 6 meses, sem a menor ideia do que estava pensando.

## Por que a Documentação Espartana sobrevive

- **Preguica intelectualizada**: "código auto-explicativo" é uma forma elegante de não documentar.
- **Velocidade de entrega**: escrever docs leva tempo que o prazo não oferece.
- **Dificuldade de manter sincronizado**: docs desatualizados são piores que nenhuma doc.
- **Cultura de depreciar docs**: em muitos times, escrever documentação é visto como trabalho de estagiário.

## Consequências

- onboarding lento: cada novo dev precisa decifrar o codebase sozinho
- bus factor crítico: se o autor sair, o conhecimento vai junto
- decisões repetidas: sem registro do "por que", o time rediscute as mesmas decisões
- debugging mais lento: sem contexto, encontrar a causa raiz leva o dobro do tempo

## Relação com outros princípios

- **Foco Morcegativo**: "documento depois" → nunca documenta.
- **Imperativo Funcional**: se funciona, não precisa explicar.
- **Criptocodagem**: código sem docs + nomes criticos = texto cifrado.
- **Reflexão Reprodutória**: se copiou de algum lugar, a "doc" ficou lá.

## Veredicto

A Documentação Espartana é o princípio mais justificado e mais perigoso ao mesmo tempo. É verdade que comentários ruins são piores que nenhum comentário. É verdade que nomes bons reduzem a necessidade de explicação. Mas é falso que código nunca precisa de contexto extra.

O bom comentário não explica o *que* o código faz — explica o *por que*. Por que essa constante tem esse valor. Por que esse `if` existe. Por que essa abordagem foi escolhida em vez de outra. Esse tipo de informação não cabe em nome de variável. E quando se perde, gera horas de arqueologia digital.

Como diria o provérbio POG: "O código mostra como. Só o comentário mostra por quê."

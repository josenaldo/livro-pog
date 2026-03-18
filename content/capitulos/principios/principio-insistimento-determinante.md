---
title: Insistimento Determinante
description: A fé inabalável de que, na próxima tentativa, vai funcionar
sentence: Compila de novo que dessa vez vai dar certo.
sentence_author: POGramador, na décima tentativa consecutiva
order_number: 5200
date: 2020-04-16 00:04
name: principio-insistimento-determinante
parent: principios
isParent: false
status: done
icon: "tabler/IconRepeat"

---

O **Insistimento Determinante** é o princípio que sustenta a crença de que repetir a mesma ação, nas mesmas condições, vai produzir um resultado diferente. Alguns chamam isso de loucura. O POGramador chama de persistência.

Compilar de novo. Rodar o teste de novo. Dar refresh no browser. Reiniciar o servidor. Limpar o cache. Fazer `npm install` mais uma vez. A própria definição de ritual místico: se não funcionou, repita a reza.

## O mecanismo

O Insistimento Determinante segue um ciclo previsível:

1. **Tentativa**: o POGramador executa o código.
2. **Falha**: o código falha.
3. **Negação**: "deve ter sido fluke, vou tentar de novo."
4. **Repetição**: executa exatamente a mesma coisa.
5. **Falha identica**: o erro se repete.
6. **Escalação mística**: "vou limpar o cache", "vou reiniciar", "vou dar rebuild".
7. **Sucesso eventual ou desistência**: funciona por motivo desconhecido ou o dev muda de abordagem 40 minutos depois.

Quando funciona na terceira tentativa, o POGramador sente-se validado. Quando não funciona após a décima, ele recorre ao próximo nível: reiniciar o computador.

## Exemplo clássico: o loop do CI

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

# Historico de commits do dev:
# a1b2c3d - fix: ajuste no teste (tentativa 1)
# d4e5f6g - fix: ajuste no teste v2 (tentativa 2)
# h7i8j9k - fix: revert e tenta de novo (tentativa 3)
# l0m1n2o - fix: agora vai (tentativa 4)
# p3q4r5s - fix: agora vai de verdade (tentativa 5)
# t6u7v8w - fix: ok agora eu li o erro (tentativa 6) ← so aqui leu o log
```

Seis commits para um erro que exigia ler a mensagem de erro. Mas ler o erro não faz parte do ritual. O ritual e empurrar e torcer.

## Caso real: re-run do pipeline

Em qualquer projeto com CI/CD, existe o Botão "Re-run jobs". Esse Botão deveria ser usado quando há falhas intermitentes de infraestrutura. Na prática, ele é usado como mecanismo de esperança:

- teste flakey falhou → re-run
- falhou de novo → re-run
- falhou de novo → "o GitHub Actions ta com problema hoje"
- funciona na quarta tentativa → "eu sabia que ia passar"

O problema é que testes flakey que passam na re-tentativa não são investigados. Eles se acumulam. Em projetos grandes, é comum ver pipelines onde 3 de 200 testes falham aleatoriamente, é a cultura do time e "roda de novo até passar".

O repositório do Chromium, por exemplo, tem centenas de testes marcados como `FlakyTest` que são automaticamente re-executados. A diferença é que lá existe processo para triar e corrigir. Na maioria dos projetos, o re-run *e* o processo.

## Exemplo em código: retry sem lógica

```javascript
async function buscarDados(url) {
  let tentativas = 0;
  const MAX = 5;

  while (tentativas < MAX) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      tentativas++;
      console.log(`Tentativa ${tentativas} falhou. Tentando de novo...`);
      // Nenhum delay, nenhum backoff, nenhuma analise do erro.
      // O fetch falhou por DNS? Por timeout? Por 401?
      // Nao importa. Tenta de novo.
    }
  }

  throw new Error('Falhou apos 5 tentativas. Provavelmente a infra.');
}
```

O retry sem backoff, sem análise de erro e sem distincao entre erros transientes e erros permanentes é a versão algorítmica do Insistimento Determinante. Se o servidor retorna 401 (não autorizado), não adianta tentar mais 4 vezes — você não vai ficar autorizado por insistência.

## A variante humana: o "mexe no código é roda de novo"

Pior que repetir o mesmo comando e fazer pequenas mudancas aleatorias no código até funcionar:

```python
# Tentativa 1
resultado = calcular(dados, formato='json')

# Tentativa 2 — "talvez seja o formato"
resultado = calcular(dados, formato='dict')

# Tentativa 3 — "talvez precise converter"
resultado = calcular(list(dados), formato='json')

# Tentativa 4 — "vou tirar o parametro"
resultado = calcular(dados)

# Tentativa 5 — funciona! Mas ninguem sabe por que.
resultado = calcular(list(dados.values()))
```

O dev não leu a documentação da função. Não leu a stacktrace. Não debugou. Ele fez permutações até uma delas funcionar. Programação por tentativa e erro, mas sem a parte do "entender o erro".

## Por que o Insistimento sobrevive

- **Experiência de flakiness real**: às vezes, coisas intermitentes realmente se resolvem na segunda tentativa (rede, cache, race condition).
- **Custo cognitivo de investigar**: ler log, entender stack trace e depurar leva tempo. Clicar "Run Again" leva 2 segundos.
- **Pressão de prazo**: "não tenho tempo pra investigar, preciso que passe".
- **Superstição computacional**: "depois que eu limpei o `node_modules` começou a funcionar".

## Consequências

- bugs intermitentes nunca são investigados
- histórico de commits poluído com tentativas
- pipeline lento por re-runs constantes
- falsa sensação de estabilidade
- quando o problema é real e determinístico, tempo é desperdiçado tentando a sorte

## Relação com outros princípios

- **Redireção Tangencial**: se insistir não funciona, a culpa é de outro.
- **Onisciência Finita**: se o dev soubesse o que está errado, não precisaria insistir.
- **Imperativo Funcional**: se passou no retry, ta funcionando.
- **Devaneio Entusiasmado**: "na próxima tentativa vai dar certo" é puro otimismo irracional.

## Veredicto

O Insistimento Determinante é a esperança transformada em metodologia. É o princípio que mantém o POGramador vivo nas trincheiras. Sem ele, muitos teriam desistido na primeira compilação com erro.

Mas há uma linha tênue entre persistência saudável e rituais de magia computacional. Se você está repetindo o mesmo comando pela quinta vez, pare. Leia o erro. O computador está tentando te dizer algo. Ele não é seu inimigo. Ele é seu intérprete — e você está ignorando a tradução.

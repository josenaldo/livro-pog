---
title: Reflexão Reprodutória
description: Copiar código alheio como se fosse seu, sem remorso nem compreensão
sentence: Copie o código da biblioteca XYZ. Ninguém vai notar.
sentence_author: Dev senior, em code review após o almoço
order_number: 5100
date: 2020-04-16 00:04
name: principio-reflexao-reprodutoria
parent: principios
isParent: false
status: done
icon: "tabler/IconCopy"

---

A **Reflexão Reprodutória** é o princípio segundo o qual todo código que existe em algum lugar da internet é, por direito natural, código seu. Stack Overflow, GitHub, blog de 2014, resposta do ChatGPT: tudo é matéria-prima legítima. O ato de copiar, colar e rezar para funcionar é elevado ao status de metodologia.

O POGramador praticante da Reflexão Reprodutória não plagia. Ele "referência a implementação de terceiros com adaptações pontuais". A diferença entre um pesquisador é um POGramador é que o pesquisador cita a fonte.

## O mecanismo

1. **Busca**: o POGramador pesquisa o problema no Google, Stack Overflow ou fórum obscuro.
2. **Selecao**: escolhe a resposta com mais upvotes (ou a primeira que aparece).
3. **Transplante**: Ctrl+C, Ctrl+V, ajusta o nome da variável.
4. **Validação**: compila? Funciona? Então está pronto.
5. **Amnesia seletiva**: esquece de onde veio, o que faz, e por que funciona.

## Exemplo clássico: o regex do Stack Overflow

Todo desenvolvedor já colou um regex que não entende. É o artefato mais copiado da história da computação:

```python
# Validacao de email "que funciona"
# Fonte: Stack Overflow, resposta de 2011 com 847 upvotes
import re

def validar_email(email):
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(padrao, email) is not None

# Funciona para 90% dos casos.
# Para os outros 10%, abrimos chamado.
```

O regex passou no teste? Passou. Alguém sabe explicar cada grupo de captura? Ninguém. Mas o PR foi aprovado.

## Caso real: left-pad é a fragilidade Reprodutória

Em marco de 2016, o pacote `left-pad` foi removido do npm. Um módulo de 11 linhas que fazia padding de strings a esquerda. Resultado: milhares de projetos quebraram em cascata, incluindo React, Babel é muitos outros.

O código original era este:

```javascript
module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;

  if (!ch && ch !== 0) ch = ' ';

  len = len - str.length;

  while (++i < len) {
    str = ch + str;
  }

  return str;
}
```

Onze linhas. Milhares de dependências. Ninguém escreveu as suas próprias onze linhas porque "já existia um pacote pra isso". A Reflexão Reprodutória em escala industrial.

## Exemplo do mundo real: vendor.js copiado

Em projetos legados, é comum encontrar um diretório `vendor/` ou `lib/` com arquivos JavaScript copiados diretamente de bibliotecas externas, sem package manager, sem versionamento, sem possibilidade de atualização:

```
lib/
├── jquery-1.8.3.min.js
├── jquery-1.11.0.min.js      ← duas versoes, ninguem sabe qual e usada
├── bootstrap.js               ← versao desconhecida, modificada manualmente
├── utils.js                   ← copiado de um blog, autor desconhecido
└── datepicker-custom.js       ← fork de um plugin que nao existe mais
```

O `bootstrap.js` tem 47 linhas modificadas "pra funcionar com o nosso layout". Ninguém documentou quais. Atualizar é impossível. Remover da mais medo que deploy em sexta-feira.

## A variante moderna: copiar do ChatGPT

A Reflexão Reprodutória evoluiu. Agora, em vez de copiar de humanos desconhecidos no Stack Overflow, copiamos de modelos de linguagem que alucinam com confiança:

```javascript
// "O ChatGPT disse que e assim"
const resultado = await fetch('/api/dados', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados),
  mode: 'no-cors',  // "pra resolver o CORS" — spoiler: nao resolve
});

const json = await resultado.json(); // vai dar erro com no-cors, mas ok
```

O código parece profissional. A confiança é alta. E o `mode: 'no-cors'` transforma a resposta em um objeto opaco que não pode ser lido. Mas o dev não sabe disso porque não leu a documentação — afinal, por que ler documentação quando a IA já respondeu?

## Por que a Reflexão sobrevive

- **Velocidade aparente**: copiar é mais rápido que entender.
- **Autoridade social**: "tem 2 mil upvotes, deve estar certo".
- **Barreira de conhecimento**: o dev não sabe resolver, é a resposta pronta existe.
- **Cultura de entrega**: ninguém pergunta de onde veio, só se funciona.

## Consequências

- código que ninguém do time entende em profundidade
- vulnerabilidades importadas silenciosamente (copiar snippet com `eval`, SQL sem parametrização)
- licencas violadas sem saber (código GPL em projeto proprietario)
- impossibilidade de manutenção quando o contexto muda
- Stack Overflow se torna o único ponto de documentação do sistema

## Relação com outros princípios

- **Enjambração Criativística**: a Reflexão fornece o material bruto, a Enjambração da o propósito alternativo.
- **Documentação Espartana**: se o código veio de fora, a documentação ficou de fora também.
- **Onisciência Finita**: "eu sei copiar, logo eu sei programar".
- **Imperativo Funcional**: se compilou depois do paste, missão cumprida.

## Veredicto

A Reflexão Reprodutória é talvez o princípio mais democrático da POG. Do estagiário ao arquiteto, todo mundo já colou código sem entender. A diferença está na escala da destruição: o estagiário cola um regex; o arquiteto cola uma arquitetura inteira de um blog post do Medium.

A próxima vez que você fizer Ctrl+C, Ctrl+V, pare por um segundo e se pergunte: "eu sei o que esse código faz?". Se a resposta for "mais ou menos", parabéns: você está praticando Reflexão Reprodutória com honestidade.

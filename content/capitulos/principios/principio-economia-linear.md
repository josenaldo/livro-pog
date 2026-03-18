---
title: Economia Linear
description: A obsessao por reduzir linhas de código a qualquer custo
sentence: Menos linhas é sempre melhor!
sentence_author: Dev que escreveu um ternario de 200 caracteres
order_number: 5550
date: 2020-04-16 00:04
name: principio-economia-linear
parent: principios
isParent: false
status: done
icon: "tabler/IconArrowsMinimize"

---

A **Economia Linear** é o princípio que mede qualidade de código pela quantidade de linhas: quanto menos, melhor. O dev praticante da Economia Linear vê cada linha como um custo, cada variável intermediária como desperdício e cada bloco `if/else` como uma oportunidade de ternário aninhado.

O resultado é código compacto, denso, e incompreensível.

## O mecanismo

1. **Dev escreve código legível**: com variáveis intermediarias, blocos claros, formatação arejada.
2. **Dev olha o código**: "muito grande".
3. **Dev compacta**: inline de variáveis, ternarios aninhados, encadeamento de métodos.
4. **Dev admira**: "agora sim, elegante".
5. **Outro dev le**: "que porra é essa?"

## Exemplo clássico: o ternario de Lovecraft

```javascript
// Versao legivel: 8 linhas
function obterRotulo(usuario) {
  if (usuario.admin) {
    return 'Administrador';
  } else if (usuario.moderador) {
    return 'Moderador';
  } else {
    return 'Usuário';
  }
}

// Versao "economica": 1 linha
const obterRotulo = u => u.admin ? 'Administrador' : u.moderador ? 'Moderador' : 'Usuário';
```

Uma linha. Mais "limpa". Mais "funcional". É o início de uma espiral de compactação que não tem fundo:

```javascript
// A evolucao natural da Economia Linear
const r = u => u.a ? 'A' : u.m ? 'M' : 'U';
```

Agora o nome da função é as condições também foram "otimizados". O código cabe num tweet. E ninguém entende.

## Caso real: code golf em produção

Code golf é uma competição onde o objetivo é resolver um problema com o menor número de caracteres possível. É um exercício divertido. O problema é quando a mentalidade de code golf invade o código de produção:

```python
# Encontrar numeros primos ate n
# Versao code golf
p=lambda n:[x for x in range(2,n) if all(x%d for d in range(2,x))]

# Versao que um ser humano consegue manter
def primos_ate(n):
    resultado = []
    for candidato in range(2, n):
        eh_primo = True
        for divisor in range(2, candidato):
            if candidato % divisor == 0:
                eh_primo = False
                break
        if eh_primo:
            resultado.append(candidato)
    return resultado
```

A versão compacta é impressionante em exercício. Em produção com milhões de números? Performance péssima em ambas, mas a legível pelo menos pode ser otimizada por alguém que consiga ***lê-la***.

## O encadeamento sem fim

A Economia Linear ama encadeamento de métodos (method chaining). Quando bem feito, é idiomático. Quando sob influência do princípio, vira isso:

```javascript
const resultado = dados
  .filter(d => d.ativo && d.tipo === 'premium' && new Date(d.expira) > new Date())
  .map(d => ({ ...d, nome: d.nome.trim().toLowerCase(), score: d.vendas * 0.7 + d.reviews * 0.3 }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 10)
  .reduce((acc, d) => ({ ...acc, [d.id]: { nome: d.nome, score: d.score, rank: Object.keys(acc).length + 1 } }), {});
```

Uma "única expressão" que filtra, transforma, ordena, página e reestrutura dados. Debugar isso quando o resultado está errado é como procurar agulha num palheiro — um palheiro que está todo numa única linha.

## Exemplo do mundo real: o CSS compactado manualmente

Antes de minifiers automáticos se tornarem padrão, havia devs que compactavam CSS manualmente para "otimizar":

```css
.h{color:#333;font:700 16px/1.4 Arial;margin:0 0 10px}.c{background:#fff;padding:20px;border:1px solid #ddd;border-radius:4px}.b{display:inline-block;padding:8px 16px;background:#007bff;color:#fff;border:0;cursor:pointer}
```

Cada classe tem um nome de uma letra. Todas as propriedades estão numa linha. Ninguém sabe o que `.h`, `.c` e `.b` significam. Mas o arquivo tem menos bytes!

## A métrica enganosa

A Economia Linear se baseia numa métrica que parece lógica mas é falsa:

> Menos linhas = menos complexidade

Na realidade:

> Menos linhas com a mesma lógica = mesma complexidade comprimida em menor espaço visual

A complexidade não desaparece quando você compacta o código. Ela se esconde. E complexidade escondida é pior que complexidade visível, porque não dispara alarmes em code review.

Estudos de engenharia de software mostram que a métrica mais correlacionada com bugs não é número de linhas, mas complexidade ciclomatica (quantidade de caminhos de execução). Compactar código geralmente mantém a complexidade ciclomatica identica — ou até aumenta, quando o dev usa tricks para eliminar linhas.

## Por que a Economia Linear sobrevive

- **Estetica**: código compacto *parece* mais elegante.
- **Métricas ruins**: ferramentas que contam linhas incentivam redução.
- **Cultura de "clever code"**: em certas comunidades, código denso é sinal de habilidade.
- **Confusao com DRY**: "Don't Repeat Yourself" não significa "comprima tudo".

## Consequências

- código que ninguém quer mexer porque ninguém entende
- debugging significativamente mais lento
- code reviews superficiais ("parece certo, aprovado")
- erros escondidos em expressões complexas
- regras de negócio enterradas em one-liners

## Relação com outros princípios

- **Criptocodagem**: compactação extrema + variáveis curtas = cifra.
- **Documentação Espartana**: código compacto "não precisa de comentário" (precisa, é muito).
- **Proatividade Egocêntrica**: "meu estilo é escrever tudo em uma linha".
- **Imperativo Funcional**: se a one-liner retorna o resultado certo, ta pronto.

## Veredicto

A Economia Linear é um princípio que nasce de uma intuição correta (menos código geralmente é melhor) levada ao extremo (menos linhas a qualquer custo). A diferença é sutil mas fundamental:

- Menos código é bom quando simplifica a lógica.
- Menos linhas é ruim quando comprime a mesma lógica em espaço menor.

A próxima vez que você olhar orgulhoso para um one-liner de 180 caracteres, pergunte-se: "alguém consegue debugar isso as 3h da manha numa sexta-feira?". Se a resposta for não, você não escreveu código elegante. Você escreveu um enigma.

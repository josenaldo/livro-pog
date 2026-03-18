---
title: Imperativo Funcional
description: O princípio supremo de que, se funciona, está pronto
sentence: O importante é funcionar!
sentence_author: Tech lead, aprovando PR sem review
order_number: 5300
date: 2020-04-16 00:04
name: principio-imperativo-funcional
parent: principios
isParent: false
status: done
icon: "tabler/IconCircleCheck"

---

O **Imperativo Funcional** é o princípio cardeal da POG. Ele estabelece que o único critério de qualidade relevante e: **funciona?** Se sim, está pronto. Se não, ajuste até funcionar. Se funcionar de um jeito estranho, documente como "feature".

Não importa como o código está escrito. Não importa se é legível, testável, seguro ou mantenível. O único tribunal que importa é a execução. Se o programa faz o que deveria fazer quando você clica no Botão, está aprovado.

## O mecanismo

1. **Requisito chega**: "preciso de um relatório que mostra as vendas do mês."
2. **Dev implementa**: da forma mais rápida possível.
3. **Teste manual**: clica, olha, "apareceu os números certos".
4. **Declaracao de vitoria**: "ta funcionando".
5. **Deploy**: sem testes automatizados, sem code review profundo, sem verificacao de edge cases.

O Imperativo Funcional não é preguiça — e um sistema de valores. O POGramador genuinamente acredita que "funcionar" é suficiente.

## Exemplo clássico: o endpoint que funciona

```python
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/vendas')
def vendas():
    mes = request.args.get('mes')
    ano = request.args.get('ano')

    # Funciona? Funciona.
    conn = sqlite3.connect('producao.db')
    cursor = conn.cursor()
    cursor.execute(
        f"SELECT * FROM vendas WHERE mes = {mes} AND ano = {ano}"
    )
    dados = cursor.fetchall()
    conn.close()

    return jsonify(dados)
```

Funciona? Funciona. Retorna os dados? Retorna.

Mas também:
- tem SQL injection (parametros direto na query)
- abre e fecha conexão a cada request (sem pool)
- não trata erro (se o banco estiver fora, crashou)
- não valida input (mês=13? ano=abc?)
- não tem paginação (tabela com 1 milhao de linhas? retorna tudo)

Nenhum desses problemas impede o código de "funcionar" no teste manual com 3 registros.

## Caso real: o CSS que funciona

Em muitos projetos, o CSS "funciona" de formas criativas:

```css
/* O botao precisava ficar centralizado. Funciona? Funciona. */
.botao-principal {
    position: absolute;
    left: 47%;
    top: 312px;
    margin-left: -53px;
    z-index: 99999;
}

/* O modal precisava ficar na frente de tudo */
.modal-overlay {
    z-index: 999999;
}

/* O tooltip precisava ficar na frente do modal */
.tooltip {
    z-index: 9999999;
}
```

O posicionamento absoluto com valores mágicos funciona no monitor do dev. No celular, o Botão some. Em tela widescreen, ele flutua. Mas na demo pro PO, funcionou.

A escalação de `z-index` e outro clássico: cada novo componente precisa "ficar na frente" do anterior, resultando numa corrida armamentista de zeros.

## Exemplo do mundo real: testes que validam pelo resultado

```javascript
// test/vendas.test.js
describe('Vendas', () => {
  it('deve retornar vendas', async () => {
    const res = await request(app).get('/vendas?mes=3&ano=2024');

    // O teste valida que "funciona"
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);

    // Nao valida:
    // - se os dados estao corretos
    // - se os campos estao no formato esperado
    // - se o filtro de mes/ano esta sendo aplicado
    // - se o calculo esta certo
    // - se funciona com dados vazios
  });
});
```

O teste passa. O CI fica verde. O dev dorme tranquilo. O QA encontra o bug na segunda-feira.

## A frase que resume tudo

> "Depois a gente melhora."

Essa é a promessa que nunca se cumpre. O "depois" só chega quando o sistema para de funcionar. E aí não é melhoria — é emergência.

Em qualquer codebase com mais de 2 anos, você encontra comentários assim:

```java
// TODO: melhorar isso depois
// FIXME: gambiarra temporaria
// HACK: funciona mas nao deveria
// XXX: nao mexer, pode quebrar tudo
```

Esses comentários são fósseis da promessa de melhoria que nunca veio.

## A métrica que importa

Para o Imperativo Funcional, existe uma única métrica:

| State        | Significado           |
| ------------ | --------------------- |
| Funciona     | Pronto                |
| Não funciona | Ainda não está pronto |

Não existe: "funciona mas é frágil", "funciona mas não escala", "funciona mas é inseguro". Se funciona, o adjetivo é irrelevante.

## Por que o Imperativo sobrevive

- **Pragmatismo genuíno**: entregar algo que funciona é melhor que entregar nada.
- **Pressão de mercado**: clientes querem resultado, não código bonito.
- **Dificuldade de medir qualidade interna**: funcionalidade é visível, mantenibilidade não.
- **Recompensa imediata**: dev que entrega rápido é promovido. Dev que refatora é "improdutivo".

## Consequências

- débito técnico acumulado silenciosamente
- bugs que só aparecem em produção com dados reais
- custo de manutenção que cresce exponencialmente
- sistema que ninguém quer mexer porque "ta funcionando e não sabemos por que"
- a frase "não mexe nisso" substitui documentação técnica

## Relação com outros princípios

- **Insistimento Determinante**: insistir até funcionar combina perfeitamente com "funcionar é tudo".
- **Documentação Espartana**: se funciona, não precisa documentar.
- **Simplicidade Indolente**: se funciona sem teste, pra que teste?
- **Abstração Ignorancial**: erros são ignoráveis se o happy path funciona.

## Veredicto

O Imperativo Funcional é o mais sedutor dos princípios da POG. Ele tem um fundo de verdade real: software que não funciona não serve para nada, não importa quao elegante seja. Código bonito que não resolve problema é poesia, não engenharia.

O perigo é quando "funciona" vira o *único* critério. Quando "funciona" substitui "funciona de forma segura", "funciona de forma mantenível", "funciona sob carga". Aí, o que funciona hoje é o incêndio de amanhã.

A sabedoria do POGramador experiente é saber que "funciona" é necessário mas não suficiente. É a sabedoria de saber disso e continuar fazendo POG é o que diferencia o POGramador consciente do irresponsável.

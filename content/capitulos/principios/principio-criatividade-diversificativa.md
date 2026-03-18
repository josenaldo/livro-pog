---
title: Criatividade Diversificativa
description: A compulsao por fazer diferente do que já existe, só por fazer
sentence: Se alguém já usou uma solução, faça diferente.
sentence_author: Arquiteto de software reinventando o ORM
order_number: 5700
date: 2020-04-16 00:04
name: principio-criatividade-diversificativa
parent: principios
isParent: false
status: done
icon: "tabler/IconBulb"

---

A **Criatividade Diversificativa** é o princípio que impulsiona o POGramador a rejeitar soluções existentes em favor de soluções próprias. Biblioteca pronta? "Vou fazer a minha." Padrão da industria? "Prefiro inventar um novo." Framework consolidado? "E pesado demais, vou criar um leve."

Também conhecida como síndrome **NIH** (*Not Invented Here*), a Criatividade Diversificativa transforma toda solução alheia em solução inferior, simplesmente por ser alheia.

## O mecanismo

1. **Problema aparece**: o dev precisa de autenticação, ORM, validação, router, etc.
2. **Solução existente**: já existe biblioteca madura, testada, documentada.
3. **Rejeicao criativa**: "não atende 100% do meu caso" / "e complexa demais" / "tem dependência que não gosto".
4. **Implementação própria**: o dev escreve sua versão do zero.
5. **Resultado**: 20% da funcionalidade, 200% do custo de manutenção.

## Exemplo clássico: o ORM caseiro

```python
# "SQLAlchemy é complexo demais. Vou fazer o meu."
class MeuORM:
    def __init__(self, conexao):
        self.conn = conexao

    def buscar(self, tabela, **filtros):
        where = " AND ".join(f"{k} = '{v}'" for k, v in filtros.items())
        sql = f"SELECT * FROM {tabela}"
        if where:
            sql += f" WHERE {where}"
        cursor = self.conn.cursor()
        cursor.execute(sql)
        return cursor.fetchall()

    def inserir(self, tabela, **dados):
        colunas = ", ".join(dados.keys())
        valores = ", ".join(f"'{v}'" for v in dados.values())
        sql = f"INSERT INTO {tabela} ({colunas}) VALUES ({valores})"
        self.conn.cursor().execute(sql)
        self.conn.commit()

# Uso:
orm = MeuORM(conexao)
orm.inserir('usuarios', nome="O'Brien", email="obrien@empresa.com")
# SQL injection garantida. O'Brien quebra a query.
# SQLAlchemy resolvia isso nativamente.
```

O "ORM simples" não tem: parametrização de queries, pool de conexões, lazy loading, migrations, transações aninhadas, suporte a múltiplos bancos, proteção contra SQL injection. Mas e "leve".

## Caso real: frameworks JavaScript reinventados

O ecossistema JavaScript é o habitat natural da Criatividade Diversificativa. A quantidade de frameworks, bibliotecas e ferramentas que fazem fundamentalmente a mesma coisa e legendaria.

Em 2015, existiam mais geradores de projetos (scaffolding tools) no npm do que projetos que os usavam. Cada dev que criava um `create-my-app` estava exercitando a Criatividade Diversificativa em escala publica.

O padrão se repete em validação:

```javascript
// npm tem 847 pacotes de validacao de email
// Mas o dev prefere o seu:
function validarEmail(email) {
  return email.includes('@') && email.includes('.');
}

// "bob@.com" → valido
// ".@." → valido
// "usuario@empresa.com.br" → valido (ate que funciona)
```

A função cobre 70% dos casos. Os 30% restantes vao para produção como bugs.

## O framework interno da empresa

A manifestação mais custosa da Criatividade Diversificativa é o framework interno:

```
Gerente: "Precisamos de um sistema web."
Arquiteto: "Vou criar nosso proprio framework."
Equipe: "... Angular, React, Vue?"
Arquiteto: "Pesados demais. O nosso vai ser focado nas nossas necessidades."

6 meses depois:
- Framework com 30% das features do React
- Zero documentacao (porque so 3 pessoas usam)
- Zero comunidade (porque so existe aqui)
- Bugs que ninguem de fora pode ajudar a resolver
- Dev novo: "preciso aprender essa coisa antes de trabalhar?"
```

O framework interno resolve os problemas da empresa — os que existiam 6 meses atrás. Os problemas novos exigem features que o framework não tem, e agora o time mantém duas coisas: o produto é o framework.

## Exemplo do mundo real: o wrapper desnecessário

Mais sutil que o framework caseiro é o wrapper desnecessário:

```javascript
// utils/http.js
// "Vou abstrair o fetch pra facilitar"
export async function httpGet(url) {
  const response = await fetch(url);
  return response.json();
}

export async function httpPost(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 6 meses depois, o wrapper precisa de:
// - interceptors
// - retry logic
// - cancelation
// - upload progress
// - timeout
// Ou seja, precisa virar o Axios. Que ja existia.
```

O wrapper começou simples. As necessidades cresceram. E agora o time mantém uma versão inferior de algo que já existia pronto.

## A escala da diversificação

Em empresas grandes, a Criatividade Diversificativa se manifesta entre equipes:

```
Time A: usa React + Redux
Time B: usa React + MobX
Time C: usa React + Context API + custom hooks
Time D: usa React + Zustand
Time E: criou "ReactLite" (nao e React)

Resultado: 5 formas diferentes de fazer a mesma coisa
Nenhuma compartilha componentes com a outra
Cada time contrata devs com skills diferentes
Unificacao? "Fica pro proximo quarter"
```

## Por que a Criatividade Diversificativa sobrevive

- **Curiosidade genuína**: construir do zero é a melhor forma de aprender.
- **Frustração com complexidade**: bibliotecas maduras frequentemente *são* complexas.
- **Controle**: dependência externa é risco. Código próprio é "nosso".
- **Ego técnico**: criar algo novo é mais prestigioso que usar algo existente.
- **Contexto real**: às vezes a solução existente genuinamente não serve.

## Consequências

- custo de manutenção multiplicado
- reinvenção de bugs já resolvidos em bibliotecas maduras
- dificuldade de contratar (ninguém sabe usar seu framework caseiro)
- vulnerabilidades de segurança em implementações custom
- tempo gasto mantendo infraestrutura em vez de entregar produto

## Relação com outros princípios

- **Proatividade Egocêntrica**: "minha solução > solução dos outros".
- **Onisciência Finita**: não conhecer o que existe leva a reinventar.
- **Enjambração Criativística**: adaptar algo existente é primo da reinvenção.
- **Imperativo Funcional**: se a versão caseira funciona, não precisa da biblioteca.

## Veredicto

A Criatividade Diversificativa é o princípio que gera, paradoxalmente, tanto inovação quanto desperdício. Sem ela, não existiriam bibliotecas novas e melhores. Com ela em excesso, cada projeto vira um universo isolado de soluções custom que só fazem sentido internamente.

A regra prática: se a solução existente resolve 80% do seu problema, use-a. Se resolve menos de 50%, considere alternativas. Se resolve 0%, aí sim construa. Mas se você está no 80% e decidiu construir do zero "porque é mais simples", você não está simplificando — está trocando complexidade externa por complexidade interna. E a interna é pior, porque você não pode pedir ajuda no Stack Overflow.

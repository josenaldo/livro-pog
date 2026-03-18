---
title: SHIT — Sem Habilidade, Improviso Total
description: Quando falta conhecimento técnico e sobra criatividade desesperada
sentence: Sem Habilidade, Improviso Total.
sentence_author: A vida como ela e
order_number: 5800
date: 2020-04-16 00:04
name: principio-shit
parent: principios
isParent: false
status: done
icon: "tabler/IconFlame"

---

**SHIT** — *Sem Habilidade, Improviso Total* — é o princípio que descreve o que acontece quando um POGramador enfrenta um problema para o qual não tem o menor preparo técnico. Sem domínio da linguagem, sem conhecimento do framework, sem noção da arquitetura. O que resta? Improviso.

O SHIT não é malícia. É sobrevivência. O dev foi jogado numa situação que excede suas competências e, em vez de admitir, improvisa com o que tem. O resultado é código que funciona por acidente e que desafia as leis da lógica computacional.

## O mecanismo

1. **Dev recebe tarefa**: que exige conhecimento que não possui.
2. **Dev não admite**: por medo, vergonha ou cultura da empresa.
3. **Dev improvisa**: usando técnicas que conhece de outros contextos.
4. **Código funciona**: de forma inexplicavel.
5. **Ninguém questiona**: porque "ta funcionando" (Imperativo Funcional).

## Exemplo clássico: CSS by improviso

```css
/* Dev backend escalado pra mexer no frontend */

/* "Como centralizar um div?" */
.container {
    /* Tentativa 1 */
    margin: auto;

    /* Nao funcionou. Tentativa 2 */
    text-align: center;

    /* Nao funcionou. Tentativa 3 */
    position: absolute;
    left: 50%;
    top: 50%;

    /* Quase. Tentativa 4 */
    transform: translate(-50%, -50%);
    /* Funcionou! Mas agora o footer sumiu */

    /* Fix do footer que sumiu */
    margin-bottom: -200px;

    /* Fix do fix: o scroll quebrou */
    overflow: hidden; /* esconde o problema, nao resolve */
}
```

O dev não sabe CSS. Cada linha é uma tentativa. As tentativas anteriores ficaram no código (porque remover pode quebrar algo). O resultado é um frankenstein de propriedades conflitantes que, somadas, produzem o visual desejado por coincidencia.

## Caso real: banco de dados como fila

Quando devs que não conhecem message queues (RabbitMQ, SQS, Kafka) precisam implementar processamento assincrono:

```sql
-- "Fila" implementada como tabela
CREATE TABLE fila_tarefas (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50),
    payload TEXT,
    status VARCHAR(20) DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT NOW(),
    processado_em TIMESTAMP
);

-- Worker: query que roda a cada 5 segundos via cron
UPDATE fila_tarefas
SET status = 'processando', processado_em = NOW()
WHERE id = (
    SELECT id FROM fila_tarefas
    WHERE status = 'pendente'
    ORDER BY criado_em
    LIMIT 1
    FOR UPDATE SKIP LOCKED  -- se o dev souber disso
);
```

Funciona? Funciona (mais ou menos). Mas não tem: retry automático, dead letter queue, back-pressure, ordenação garantida, escalabilidade horizontal, monitoramento de lag. É um banco de dados fingindo ser uma fila, porque o dev não sabia que filas existem como produto.

O padrão é tão comum que Martin Fowler o documentou como anti-pattern: "Database as Message Queue".

## Exemplo do mundo real: HTML como API

Em projetos onde o dev não sabe criar APIs REST, é possível encontrar este padrão:

```python
# "API" que retorna HTML pra ser parseado pelo frontend
@app.route('/buscar-usuario')
def buscar_usuario():
    user = db.get_user(request.args['id'])
    return f"""
    <div id="resultado">
        <span class="nome">{user.nome}</span>
        <span class="email">{user.email}</span>
        <span class="idade">{user.idade}</span>
    </div>
    """

# Frontend "consome" a "API"
# fetch('/buscar-usuario?id=1')
#   .then(r => r.text())
#   .then(html => {
#     const parser = new DOMParser();
#     const doc = parser.parseFromString(html, 'text/html');
#     const nome = doc.querySelector('.nome').textContent;
#   });
```

O dev não sabia retornar JSON. Então retornou HTML. O frontend parseia o HTML como se fosse XML. Funciona. Até alguém mudar a classe CSS é a "API" quebrar.

## A escalada do improviso

O SHIT tem níveis de escalada:

**Nível 1 — Improviso local**
Dev não sabe usar `reduce`, faz com `for` loop. Funciona, e até aceitável.

**Nível 2 — Improviso estrutural**
Dev não sabe usar ORM, escreve SQL com concatenação de string. Funciona, com SQL injection.

**Nível 3 — Improviso arquitetural**
Dev não sabe fazer microservicos, cria 5 instâncias do mesmo monolito com `if (process.env.ROLE === 'pagamento')`. Funciona, com 5x o uso de memoria.

**Nível 4 — Improviso existencial**
Dev não sabe a linguagem do projeto. Escreve Python no estilo Java:

```python
class StringUtils:
    @staticmethod
    def isEmpty(s):
        if s is None:
            return True
        if len(s) == 0:
            return True
        return False

    @staticmethod
    def isNotEmpty(s):
        return not StringUtils.isEmpty(s)

# Em Python idiomatico: "if not s:"
```

O código funciona perfeitamente. Mas um dev Python lendo isso sente dor fisica.

## Por que o SHIT sobrevive

- **Realocação forçada**: devs são colocados em projetos fora de sua expertise.
- **Pressão de prazo**: não há tempo para aprender antes de implementar.
- **Cultura de "full-stack"**: espera-se que todos saibam tudo.
- **Vergonha de pedir ajuda**: admitir que não sabe é visto como fraqueza.

## Consequências

- código que funciona por coincidência, não por design
- fragilidade extrema: qualquer mudança pode quebrar o equilíbrio acidental
- custo de manutenção elevado
- vulnerabilidades de segurança por desconhecimento
- frustração de devs que herdaram o código

## Relação com outros princípios

- **Onisciência Finita**: o dev improvisa porque acredita que sabe o suficiente.
- **Insistimento Determinante**: sem conhecimento, o dev tenta permutações até funcionar.
- **Reflexão Reprodutória**: quando o improviso não funciona, copia do Stack Overflow.
- **Teorema de Namarra**: quando nada funciona, muda na marra.

## Veredicto

O SHIT é o princípio mais compassivo da POG. Ninguém escolhe ser incompetente num domínio. As circunstâncias empurram. O prazo aperta. O projeto muda. E o dev faz o que pode com o que tem.

O problema não é o improviso em si — é a falta de reconhecimento de que o improviso aconteceu. Código escrito por SHIT deveria ser marcado, revisado e eventualmente substituído por alguém que domina o domínio. Quando o improviso vira permanente, ele deixa de ser solução temporária e vira dívida técnica com juros abusivos.

Se você se pegou escrevendo código numa linguagem que não domina, sem ajuda, sem referência, com deadline: você está no SHIT. Não tenha vergonha. Mas registre. E peça revisão. O próximo dev que ler seu código vai agradecer.

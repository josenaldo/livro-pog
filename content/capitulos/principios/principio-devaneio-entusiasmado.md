---
title: Devaneio Entusiasmado
description: O otimismo irracional de que nada pode dar errado
sentence: Lady Murphy? Balela! Faz desse jeito que nada vai dar errado.
sentence_author: POGramador, 5 minutos antes do desastre
order_number: 5400
date: 2020-04-16 00:04
name: principio-devaneio-entusiasmado
parent: principios
isParent: false
status: done
icon: "tabler/IconMoodHappy"

---

O **Devaneio Entusiasmado** é o princípio que anula a Lei de Murphy no coracao do POGramador. Tudo vai dar certo. O deploy de sexta-feira vai ser tranquilo. A migração de banco vai rodar sem problema. O código sem teste vai funcionar em produção. Nenhum edge case vai aparecer.

E o otimismo como metodologia. A fé como infraestrutura. A esperança como plano de contingência.

## O mecanismo

1. **Planejamento otimista**: o dev estima o melhor cenário possível.
2. **Execução confiante**: implementa sem considerar falhas.
3. **Ausência de plano B**: se algo der errado, improvisa na hora.
4. **Surpresa quando da errado**: "isso nunca tinha acontecido antes".
5. **Amnesia seletiva**: esquece que da errado toda vez e repete o ciclo.

## Exemplo clássico: deploy sem rollback

```bash
#!/bin/bash
# deploy-prod.sh — sexta-feira, 17h45

echo "Iniciando deploy em producao..."

# Para o servico
sudo systemctl stop api-producao

# Atualiza o codigo
cd /var/www/api && git pull origin main

# Roda migrations
python manage.py migrate

# Instala dependencias novas
pip install -r requirements.txt

# Reinicia
sudo systemctl start api-producao

echo "Deploy concluido com sucesso!"
# Nota: nao tem rollback, nao tem health check,
# nao tem backup do banco antes da migration.
# Mas vai dar certo. Sempre da.
```

Se a migration falhar no meio, o banco fica num estado inconsistente. Se o `pip install` quebrar, o serviço não sobe. Se o serviço não subir, não tem script de rollback. Mas o dev está confiante.

## Caso real: "vai funcionar em produção"

Uma das manifestações mais clássicas do Devaneio Entusiasmado é a ausência de tratamento de edge cases. O dev testa com dados perfeitos e assume que produção será igualmente perfeita:

```javascript
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const idade = hoje.getFullYear() - nascimento.getFullYear();
  return idade;
}

// Funciona perfeitamente com "1990-05-15"
// Nao funciona com:
//   null
//   undefined
//   "não informado"
//   "15/05/1990" (formato BR)
//   "1890-01-01" (retorna 134 anos)
//   "2030-01-01" (retorna -6 anos)
//   "" (string vazia)
```

O dev testou com sua própria data de nascimento. Funcionou. Deploy.

## O fenômeno do "Happy Path Only"

O Devaneio Entusiasmado produz código que só funciona no caminho feliz. Em APIs, isso se manifesta como:

```python
@app.route('/api/pedido', methods=['POST'])
def criar_pedido():
    dados = request.get_json()

    # Assume que todos os campos existem
    pedido = Pedido(
        cliente_id=dados['cliente_id'],
        produtos=dados['produtos'],
        endereco=dados['endereco']['rua'] + ', ' + dados['endereco']['numero'],
    )

    # Assume que o banco vai aceitar
    db.session.add(pedido)
    db.session.commit()

    # Assume que o email vai ser enviado
    enviar_confirmacao(pedido.cliente.email)

    return jsonify({'id': pedido.id}), 201

# O que acontece quando:
# - dados e None (Content-Type errado)
# - 'cliente_id' nao existe no JSON
# - 'endereco' nao tem 'numero'
# - o banco rejeita por constraint
# - o servico de email esta fora
# - o cliente nao tem email cadastrado
# Resposta: 500 Internal Server Error genérico
```

Cada linha desse código assume que o universo está em perfeita harmonia. E o universo nunca está.

## Exemplo do mundo real: o otimismo do parseInt

Um caso clássico que aparece em milhares de repositórios no GitHub:

```javascript
// O dev assume que o input sempre sera numerico
const pagina = parseInt(req.query.page);
const limite = parseInt(req.query.limit);

const resultados = await db.query(
  `SELECT * FROM produtos LIMIT ${limite} OFFSET ${(pagina - 1) * limite}`
);
```

Se `page` for `undefined`, `parseInt` retorna `NaN`. `NaN - 1` e `NaN`. `NaN * limite` e `NaN`. O SQL vai ter `OFFSET NaN`, que vai gerar erro no banco.

Se `limit` for `"999999999"`, o dev acaba de pedir ao banco que retorne um bilhao de registros. O servidor agradece — com um `OutOfMemoryError`.

O Devaneio Entusiasmado não é só sobre não tratar erros. É sobre não imaginar que erros possam existir.

## A estimativa otimista

O princípio também se manifesta fora do código, nas estimativas:

```
Gerente: "Quanto tempo pra implementar o modulo de pagamento?"
Dev:     "Umas 2 semanas."

Semana 1: estrutura basica pronta.
Semana 2: integracao com gateway comecou.
Semana 3: "o gateway tem um bug na API deles."
Semana 4: "estou esperando retorno do suporte."
Semana 5: "ah, precisa tratar cancelamento tambem?"
Semana 6: "funciona, mas falta o webhook de confirmacao."
Semana 8: "pronto. Mas sem reembolso, isso e fase 2."
```

A estimativa de 2 semanas considerou apenas o happy path do desenvolvimento. Não considerou: integração com terceiros, edge cases, testes, documentação, revisão, bugs emergentes.

## Por que o Devaneio sobrevive

- **Vies de otimismo**: seres humanos são naturalmente otimistas nas estimativas (planning fallacy).
- **Pressão para entregar rápido**: ninguém quer ouvir "6 semanas".
- **Experiencias passadas distorcidas**: "da última vez deu certo" (porque outra pessoa consertou os problemas).
- **Custo emocional do pessimismo**: pensar em tudo que pode dar errado é exaustivo.

## Consequências

- deploys que quebram produção
- migrações que corrompem dados
- estimativas cronicamente otimistas
- ausência de planos de contingência
- sistemas frágeis que funcionam "enquanto ninguém tocar"

## Relação com outros princípios

- **Insistimento Determinante**: o otimismo alimenta a insistência. "Da próxima vez vai dar certo."
- **Imperativo Funcional**: se funciona no happy path, ta pronto.
- **Abstração Ignorancial**: erros não tratados são erros não imaginados.
- **Simplicidade Indolente**: plano B e complexidade desnecessária — se não vai dar errado, pra que?

## Veredicto

O Devaneio Entusiasmado é o princípio que faz o POGramador levantar da cama todo dia. Sem um pouco de otimismo, ninguém teria coragem de escrever código. O problema é quando o otimismo substitui a engenharia.

A diferença entre confiança e imprudência é um plano de rollback. Se você tem fé de que vai funcionar *e* tem um procedimento para quando não funcionar, você é um profissional otimista. Se você só tem a fé, você é um POGramador clássico.

Murphy não é balela. Murphy é estatística. É a estatística sempre vence no longo prazo.

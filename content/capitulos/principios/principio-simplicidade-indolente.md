---
title: Simplicidade Indolente
description: Se está funcionando sem isso, não precisa adicionar
sentence: Se tá funcionando sem isso, pra que colocar?
sentence_author: Dev, recusando adicionar testes no PR
order_number: 5750
date: 2020-04-16 00:04
name: principio-simplicidade-indolente
parent: principios
isParent: false
status: done
icon: "tabler/IconZzz"

---

A **Simplicidade Indolente** é o princípio que transforma a falta de esforço em filosofia de design. Se o sistema funciona sem testes, pra que testes? Se funciona sem logging, pra que logging? Se funciona sem validação, pra que validar?

Não confunda com o princípio legítimo de simplicidade (KISS — Keep It Simple, Stupid). A Simplicidade Indolente não simplifica; ela *omite*. A diferença é que simplificar é um ato de design. Omitir é um ato de preguiça.

## O mecanismo

1. **Feature pronta**: o dev implementou o happy path.
2. **Sugestão de melhoria**: "adiciona testes", "adiciona tratamento de erro", "adiciona validação".
3. **Resistência**: "mas ta funcionando sem isso."
4. **Justificativa filosófica**: "YAGNI" (You Ain't Gonna Need It), "KISS", "premature optimization".
5. **Deploy**: sem testes, sem logging, sem monitoramento.

## Exemplo clássico: a API sem validação

```javascript
app.post('/api/usuarios', async (req, res) => {
  // Confia que o frontend manda os dados certos
  const usuario = await db.usuarios.create({
    nome: req.body.nome,
    email: req.body.email,
    idade: req.body.idade,
  });

  res.json(usuario);
});

// O que acontece quando:
// - nome e undefined: salva null no banco
// - email e "naoemail": salva string invalida
// - idade e -5: salva numero negativo
// - body e vazio: crash por propriedade de undefined
// - alguem manda campo extra "admin: true": salva e cria admin
```

O dev argumenta: "o frontend valida". É verdade — o frontend valida. Mas qualquer pessoa com `curl` ou Postman pode chamar a API diretamente. A validação no frontend é UX. A validação no backend é segurança. Omitir a segunda é Simplicidade Indolente em estado puro.

## Caso real: sistema sem logging

```python
# views.py de um projeto Django em producao

def processar_pagamento(request):
    dados = json.loads(request.body)
    resultado = gateway.cobrar(dados['valor'], dados['cartao'])

    if resultado.sucesso:
        Pedido.objects.filter(id=dados['pedido_id']).update(status='pago')
        return JsonResponse({'ok': True})
    else:
        return JsonResponse({'ok': False})
```

Nenhum log. Nenhuma métrica. Nenhum trace. Se um pagamento falhar, a única forma de investigar é pedir ao gateway um extrato, cruzar com o banco de dados, e torcer para achar a transação.

"Pra que log? O Sentry pega os erros." — só que a função não lanca exceção. Ela retorna `{'ok': False}`. O Sentry não vê nada. O problema é invisível.

## Exemplo do mundo real: projeto sem testes

No GitHub, a porcentagem de repositórios sem nenhum teste automatizado e significativa. A justificativa mais comum:

```
Repo: sistema-critico-de-producao
Testes: 0
Coverage: N/A
README: "Para rodar: npm start"

Contribuidor: "Por que não tem testes?"
Autor: "O sistema é simples, não precisa."
```

O sistema é simples até não ser. Até mudar um requisito. Até outro dev mexer. Até a regressão aparecer. Sem testes, a única forma de validar é "rodar e ver se funciona". Que é exatamente o que testes automatizados fazem, só que de forma reproduzível, rápida e confiável.

## A escada da omissão

A Simplicidade Indolente opera em níveis de omissão:

**Nível 1 — Sem testes**
"Testei manualmente, funciona."

**Nível 2 — Sem validação**
"O frontend valida."

**Nível 3 — Sem logging**
"Se der erro, o usuário avisa."

**Nível 4 — Sem monitoramento**
"Se cair, o Nagios avisa." (Nagios não está configurado.)

**Nível 5 — Sem backup**
"O disco é redundante." (Não é, é RAID 0.)

**Nível 6 — Sem documentação**
"O código é simples, não precisa."

**Nível 7 — Sem controle de versão**
"Tenho uma copia no Desktop." (Verdadeira história real.)

## O abuso dos acrônimos

A Simplicidade Indolente frequentemente se esconde atrás de princípios reais de engenharia:

- **YAGNI** (You Ain't Gonna Need It): usado para justificar não adicionar tratamento de erro, validação e logging.
- **KISS** (Keep It Simple): usado para justificar ausência de testes e documentação.
- **MVP** (Minimum Viable Product): usado para justificar ausência de *tudo*.

O problema não é o princípio original. É a interpretação preguiçosa. YAGNI não diz "não trate erros". Diz "não construa features que ninguém pediu". Tratamento de erros não é feature — é infraestrutura.

## Exemplo em código: autenticação "simples"

```javascript
// "Pra que usar middleware de autenticacao? Faz inline que é mais simples."
app.get('/api/admin/relatorios', (req, res) => {
  if (req.headers.authorization === 'Bearer segredo123') {
    // gera relatorio
    return res.json(gerarRelatorio());
  }
  res.status(401).json({ erro: 'nao autorizado' });
});

app.get('/api/admin/usuarios', (req, res) => {
  if (req.headers.authorization === 'Bearer segredo123') {
    return res.json(listarUsuarios());
  }
  res.status(401).json({ erro: 'nao autorizado' });
});

// Token hardcoded, logica duplicada, sem expirazion, sem refresh.
// Mas e "simples".
```

A "simplicidade" criou: token sem expiração, lógica duplicada em cada rota, segredo em texto plano no código, e nenhum mecanismo de revogação.

## Por que a Simplicidade Indolente sobrevive

- **Custo real de adicionar**: testes, logging e validação levam tempo.
- **Retorno invisível**: segurança e observabilidade previnem problemas futuros. Ninguém agradece pelo bug que não aconteceu.
- **Recompensa da velocidade**: entregar rápido é visível. Entregar seguro não.
- **Precedente**: "sempre fizemos assim e nunca deu problema" (sorting bias — você não mediu os problemas).

## Consequências

- bugs que só aparecem em produção e são impossíveis de diagnosticar
- vulnerabilidades de segurança básicas
- regressões frequentes por falta de testes
- sistemas que ninguém confia em mexer
- debugging por tentativa e erro

## Relação com outros princípios

- **Imperativo Funcional**: "funciona" é o único critério. Validação, teste e log são extras.
- **Foco Morcegativo**: "adiciono testes depois" → nunca adiciona.
- **Devaneio Entusiasmado**: "não vai dar erro, não precisa de tratamento".
- **Documentação Espartana**: documentação é "extra" que a Simplicidade Indolente corta primeiro.

## Veredicto

A Simplicidade Indolente é o princípio que confunde falta de esforço com elegância. É a diferença entre um arquiteto que desenha uma casa minimalista e um pedreiro que esquece de colocar a porta.

A simplicidade real requer mais esforço, não menos. Simplificar e remover complexidade desnecessária mantendo o necessário. Omitir é remover tudo que dá trabalho e torcer para que dê certo.

Se alguém te disser "não precisa disso, ta funcionando sem", pergunte: "está funcionando sem porque não precisa, ou porque ninguém testou o cenário que precisa?". A resposta quase sempre é a segunda opção.

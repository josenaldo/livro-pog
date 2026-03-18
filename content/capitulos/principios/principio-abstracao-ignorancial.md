---
title: Abstração Ignorancial
description: A prática de ignorar tratamento de erros como se erros não existissem
sentence: Esqueça o tratamento de erros. Depois cuidamos disso.
sentence_author: Lider técnico, na daily de sexta-feira
order_number: 5650
date: 2020-04-16 00:04
name: principio-abstracao-ignorancial
parent: principios
isParent: false
status: done
icon: "tabler/IconEyeOff"

---

A **Abstração Ignorancial** é o princípio que declara: se você não trata o erro, o erro não existe. O mecanismo é filosoficamente sofisticado: o POGramador abstrai a existência de falhas do seu modelo mental, criando uma realidade alternativa onde tudo sempre funciona.

Na prática, isso se traduz em: `catch` vazio, exceção engolida, retorno silencioso de `null`, é a fé inabalável de que "isso nunca vai acontecer".

## O mecanismo

1. **Função pode falhar**: conexão de rede, banco de dados, input inválido.
2. **Dev sabe que pode falhar**: mas não quer lidar com isso agora.
3. **Dev ignora a falha**: catch vazio, sem validação, sem fallback.
4. **Sistema funciona nos testes**: porque testes usam dados perfeitos.
5. **Sistema explode em produção**: com a mensagem mais inútil possível.

## Exemplo clássico: o catch vazio

```java
public User buscarUsuario(int id) {
    try {
        return repository.findById(id);
    } catch (Exception e) {
        // TODO: tratar erro
        return null;
    }
}
```

Esse padrão é tão comum que tem nome próprio: **Pokemon Exception Handling** ("gotta catch 'em all"). O `catch (Exception e)` captura tudo — timeout de banco, null pointer, divisão por zero, falta de memoria — e trata tudo da mesma forma: ignorando.

O `return null` é especialmente perverso. O chamador recebe `null`, não sabe por que, e eventualmente gera um `NullPointerException` em outro lugar completamente diferente. O erro original se perde. A investigação começa a quilometros do problema real.

## Caso real: a piramide do null check

A consequência direta da Abstração Ignorancial é a proliferação de null checks defensivos em toda a codebase:

```java
public String obterNomeDoCliente(Pedido pedido) {
    if (pedido != null) {
        if (pedido.getCliente() != null) {
            if (pedido.getCliente().getPessoa() != null) {
                if (pedido.getCliente().getPessoa().getNome() != null) {
                    return pedido.getCliente().getPessoa().getNome();
                }
            }
        }
    }
    return "N/A"; // Ninguem sabe por que retorna "N/A"
}
```

Cada `if (x != null)` e um sintoma de que algum lugar no sistema retorna `null` em vez de tratar o erro. A piramide de null checks é a consequência arquitetural de ignorar erros na origem.

## Exemplo do mundo real: o console.log que esconde tudo

Em projetos JavaScript, a Abstração Ignorancial se manifesta frequentemente assim:

```javascript
async function carregarDados() {
  try {
    const res = await fetch('/api/dados');
    const json = await res.json();
    return json;
  } catch (err) {
    console.log('erro:', err);
    return [];
  }
}
```

O erro é capturado, logado no console (que ninguém olha em produção), e o retorno é um array vazio. O componente que chamou `carregarDados()` recebe um array vazio e renderiza uma lista sem itens. O usuário vê uma tela em branco. Ninguém sabe por que.

O `console.log` dá a ilusão de que o erro está sendo tratado. Na verdade, ele está sendo *documentado no void*.

## A escala do problema

Em projetos grandes, a Abstração Ignorancial se combina com a complexidade para criar cenários de debugging impossíveis:

```python
# Servico A chama Servico B que chama Servico C
# Servico C falha
# Servico B captura a excecao e retorna None
# Servico A recebe None e retorna valor padrao
# Frontend recebe valor padrao e mostra pro usuario
# Usuario reclama: "o valor ta errado"
# Time investiga Servico A: tudo ok
# Time investiga Servico B: tudo ok
# Time investiga Servico C: ah, o banco de dados ta cheio
```

O problema estava em C. Mas B escondeu o erro retornando `None`. E A escondeu o `None` retornando valor padrão. O resultado é um sistema que "funciona" com dados errados, e ninguém percebe até o cliente reclamar.

## Exemplo famoso: o return silencioso

Em muitas APIs legadas, é comum encontrar este padrão:

```java
public boolean salvar(Entidade entidade) {
    try {
        entityManager.persist(entidade);
        entityManager.flush();
        return true;
    } catch (Exception e) {
        logger.warn("Erro ao salvar entidade: " + e.getMessage());
        return false;
    }
}

// Chamador
if (!service.salvar(pedido)) {
    // O que fazer aqui? Nao sei qual foi o erro.
    // Constraint violation? Disco cheio? Conexao perdida?
    // Tanto faz, mostra mensagem generica.
    mostrarErro("Não foi possível salvar. Tente novamente.");
}
```

O `return false` comprime toda a riqueza de informação de uma exceção num único bit. O chamador sabe que falhou, mas não sabe por que. A única ação possível é uma mensagem genérica que não ajuda ninguém.

## O antipadrao do @SuppressWarnings

```java
@SuppressWarnings("unchecked")
public List<User> listarUsuarios() {
    // O compilador avisa que tem cast inseguro.
    // O dev manda calar.
    return (List<User>) em.createQuery("SELECT u FROM User u").getResultList();
}
```

O `@SuppressWarnings` é a versão institucionalizada da Abstração Ignorancial. O compilador tenta avisar. O dev responde: "eu sei o que estou fazendo". O compilador cala. O ClassCastException aparece em produção.

## Por que a Abstração Ignorancial sobrevive

- **Complexidade do error handling**: tratar erros corretamente é trabalho significativo.
- **Otimismo (Devaneio Entusiasmado)**: "isso nunca vai acontecer".
- **Pressa**: "depois a gente trata os erros".
- **Falta de padrão**: sem convenção de error handling, cada dev faz (ou não faz) do seu jeito.

## Consequências

- erros silenciosos que corrompem dados sem ninguém perceber
- debugging que leva horas ou dias por falta de informação
- usuários recebendo resultados errados sem saber
- `NullPointerException` em locais distantes da causa real
- logs poluídos com mensagens genéricas que não ajudam
- sistemas que "funcionam" com dados incorretos

## Relação com outros princípios

- **Devaneio Entusiasmado**: "não vai dar erro" é o fundamento filosófico da Abstração.
- **Foco Morcegativo**: "trato os erros depois" = nunca.
- **Imperativo Funcional**: se o happy path funciona, ta pronto.
- **Redireção Tangencial**: quando o erro cobrado aparece, "a culpa é do serviço externo".

## Veredicto

A Abstração Ignorancial é o princípio que transforma software em bomba-relógio silenciosa. O sistema não explode — ele apodrece. Dados corrompem lentamente, resultados desviam sutilmente, e quando alguém finalmente percebe, a origem do problema está enterrada sob camadas de `catch` vazio e `return null`.

O tratamento de erros não é perfumaria. É a diferença entre um sistema que falha de forma compreensível e um sistema que falha de forma mística. Entre "o banco recusou a transação por saldo insuficiente" e "deu ruim, tenta de novo".

Se o seu código tem um `catch` vazio, não é código. É uma prece.

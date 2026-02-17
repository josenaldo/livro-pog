---
title: Perfectness Execution Bulletproof
description: Perfectness Execution Bulletproof
sentence: ...ah!!! Isto é um erro comum do Windows!
sentence_author: POGramador tentando ganhar tempo para corrigir seu código
order_number: 21000
date: 2020-04-16 00:20
name: gdp-bulletproof
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconShield"

---
O **Bulletproof** é o padrão em que toda operação, independentemente do que aconteça, termina com mensagem de sucesso. Deu certo? Sucesso. Deu errado? Sucesso também. Explodiu? Sucesso com fé.

```java
try {
    if (alterar(valor1, valor2)) {
        return new Mensagem("Operação concluída com sucesso!");
    } else {
        return new Mensagem("Operação concluída com sucesso!");
    }
} catch (Throwable e) {
    return new Mensagem("Operação concluída com sucesso!");
}
```

Na superfície, parece experiência positiva para o usuário. No fundo, é supressão sistemática da realidade.

## Como esse padrão se instala

Ele costuma surgir quando o time sofre pressão por indicadores simplistas, tipo:

- "não pode aparecer erro para o usuário"
- "precisamos reduzir chamados"
- "a tela sempre deve retornar ok"

Em vez de melhorar validação, observabilidade e tratamento adequado, adota-se o atalho: uniformizar resposta de sucesso. O bug deixa de ser visível, mas continua existindo.

## Exemplo didático (problema real disfarçado)

Imagine um endpoint de atualização cadastral:

```java
public Mensagem atualizarEmail(Long usuarioId, String novoEmail) {
    try {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario == null) {
            return new Mensagem("Operação concluída com sucesso!");
        }

        usuario.setEmail(novoEmail);
        usuarioRepository.save(usuario);

        // Se save falhar por constraint, cai no catch e também retorna sucesso.
        return new Mensagem("Operação concluída com sucesso!");
    } catch (Exception e) {
        return new Mensagem("Operação concluída com sucesso!");
    }
}
```

O usuário recebe sucesso mesmo quando:

- ID não existe
- e-mail é inválido
- banco está indisponível
- transação foi revertida

Isso sabota o ciclo de feedback da aplicação.

## Efeito colateral em cadeia

O Bulletproof cria danos silenciosos:

- suporte não consegue reproduzir erro porque "o sistema diz que deu certo"
- monitoramento perde sinal útil
- inconsistência de dados cresce sem alarme
- times consumidores da API tomam decisões erradas com base em falso positivo

É o equivalente a arrancar a luz do painel do carro para "resolver" o aviso do óleo.

## Versão didática melhor (sem perder UX)

Você pode ser amigável com usuário sem mentir para ele:

```java
public ResultadoAtualizacao atualizarEmail(Long usuarioId, String novoEmail) {
    if (novoEmail == null || !novoEmail.contains("@")) {
        return ResultadoAtualizacao.falha("E-mail inválido");
    }

    Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
    if (usuario == null) {
        return ResultadoAtualizacao.falha("Usuário não encontrado");
    }

    try {
        usuario.setEmail(novoEmail);
        usuarioRepository.save(usuario);
        return ResultadoAtualizacao.sucesso("E-mail atualizado com sucesso");
    } catch (DataAccessException e) {
        // Log técnico detalhado para equipe
        logger.error("Falha ao atualizar e-mail do usuário {}", usuarioId, e);
        // Mensagem amigável para usuário
        return ResultadoAtualizacao.falha("Não foi possível concluir agora. Tente novamente.");
    }
}
```

Aqui você tem:

- resultado honesto
- mensagem compreensível
- log técnico para diagnóstico
- separação entre erro de negócio e erro de infraestrutura

## Quando o Bulletproof já está em produção

Não precisa reescrever tudo de uma vez. Estratégia incremental:

1. mapear endpoints com maior taxa de chamado
2. trocar retorno único por contrato de sucesso/falha
3. manter compatibilidade externa temporária
4. instrumentar logs e métricas antes de mudar comportamento de UI
5. remover `catch` genérico com retorno otimista

## Resumo POG

Bulletproof é a prova de bala mais famosa da POG: não impede o tiro, só apaga o buraco da parede no relatório. Ele melhora aparência de curto prazo e destrói confiança sistêmica no longo prazo.

Sistema confiável não é o que "sempre responde sucesso". É o que responde a verdade, com contexto e previsibilidade. O restante é maquiagem operacional com prazo de validade curto.

---
title: You Shall Not Pass
description: You Shall Not Pass
sentence: Que lixo que fizeram!!! Olha isso!!
sentence_author: POGgramador falando sobre o código de outro POGgramador
order_number: 20000
date: 2020-04-16 00:19
name: gdp-you-shall-not-pass
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
O **You Shall Not Pass** é o padrão de captura total: tudo é envolvido por `try/catch` amplo, normalmente com `Exception` ou `Throwable`, para garantir que nada "escape".

A intenção parece nobre: proteger o sistema. O efeito real costuma ser o oposto: esconder causa raiz, diluir contexto e dificultar manutenção.

## Sintoma clássico

```java
public String processar(String entrada) {
    try {
        return servicoA.executar(entrada);
    } catch (Throwable t) {
        return "Falha ao processar";
    }
}
```

Nesse modelo, falhas completamente diferentes viram a mesma resposta:

- erro de validação
- timeout de rede
- bug de programação
- erro de banco
- bug de serialização

Tudo cai no mesmo balaio sem rastreabilidade adequada.

## Por que isso é perigoso

Capturar `Throwable` é especialmente arriscado porque inclui `Error` (ex.: `OutOfMemoryError`), que em geral não deveria ser "tratado" como fluxo comum da aplicação.

Quando o código captura amplo demais:

- o sistema parece estável, mas está cego
- logs úteis somem
- retries automáticos podem repetir operações perigosas
- estado inconsistente pode continuar rodando sem alerta

É o equivalente operacional de desligar o alarme de incêndio porque ele faz barulho.

## Exemplo didático (controle de granularidade)

### Versão POG

```java
public Resultado gerarRelatorio(Filtro filtro) {
    try {
        validar(filtro);
        Dados dados = repositorio.buscar(filtro);
        byte[] pdf = renderizador.gerarPdf(dados);
        return Resultado.ok(pdf);
    } catch (Exception e) {
        return Resultado.erro("Não foi possível gerar relatório");
    }
}
```

### Versão com tratamento útil

```java
public Resultado gerarRelatorio(Filtro filtro) {
    try {
        validar(filtro);
    } catch (ValidacaoException e) {
        return Resultado.erro("Filtro inválido: " + e.getMessage());
    }

    Dados dados;
    try {
        dados = repositorio.buscar(filtro);
    } catch (DataAccessException e) {
        logger.error("Falha no banco ao buscar relatório", e);
        return Resultado.erro("Falha temporária ao consultar dados");
    }

    try {
        byte[] pdf = renderizador.gerarPdf(dados);
        return Resultado.ok(pdf);
    } catch (RenderizacaoException e) {
        logger.error("Falha ao renderizar PDF", e);
        return Resultado.erro("Não foi possível gerar o arquivo PDF");
    }
}
```

Aqui cada tipo de problema recebe:

- tratamento adequado
- mensagem correta
- log contextualizado

## Quando usar captura ampla, então?

Existe um uso legítimo: fronteiras globais de aplicação (filtro HTTP, middleware, handler global), para evitar queda abrupta e registrar erro inesperado.

Mesmo nesses casos:

- capture para registrar e encerrar com segurança
- não converta tudo em "deu ruim" sem contexto
- não continue fluxo normal após falha crítica

## Estratégia de correção gradual

Se seu legado está dominado por `catch` genérico:

1. mapeie os pontos com maior volume de erro
2. substitua captura genérica por exceções específicas
3. adicione logs com contexto de negócio (id, operação, usuário)
4. padronize respostas por categoria de erro
5. mantenha fallback global para o que for realmente inesperado

Essa abordagem reduz risco sem parar o trem.

## Resumo POG

You Shall Not Pass nasce da boa intenção de blindar o sistema, mas frequentemente vira blindagem contra diagnóstico. O código até "não quebra" na frente do usuário, porém quebra a capacidade do time de entender e corrigir problemas.

No fim, erro que não aparece não desaparece. Ele só muda de lugar: sai da tela e vai morar no backlog eterno da sustentação.

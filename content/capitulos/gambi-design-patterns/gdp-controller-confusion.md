---
title: Controller Confusion
description: Controller Confusion
sentence: Não se preocupe, nenhum sistema "entra redondo". O importante agora é entrar em produção, depois consertamos os erros!
sentence_author: Gerente sem noção tentando acalmar desenvolvedor sobre projeto POG com prazo estourado.
order_number: 28000
date: 2020-04-16 00:27
name: gdp-controller-confusion
parent: gambi-design-patterns
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---
O **Controller Confusion** é a evolução natural do MVC cansado. No discurso, o projeto ainda "usa camadas". No código real, o controller virou templo monolítico: valida, transforma, persiste, chama API externa, gera relatório e decide mensagem de tela.

É o padrão VCC: **View/Controller Confusion**. Em estágio avançado, vira CCC: **Chaotic Controller Confusion**.

## De onde isso vem

Esse padrão quase sempre nasce em projeto com uma mistura de:

- prazo curto com escopo longo
- time mudando frequentemente
- ausência de limites claros entre camadas
- cultura de "só mais esse if aqui no endpoint"

No início, parece uma economia. Você evita criar serviço, evita DTO, evita caso de uso. Só que cada economia dessas vira dívida semântica.

Com o tempo, o controller acumula responsabilidades demais e vira equivalente ao anti-pattern conhecido como **God Object**: uma entidade central que conhece tudo e acopla tudo.

## Exemplo didático (Controller Confusion clássico)

```java
@PostMapping("/pedidos")
public ResponseEntity<?> criar(@RequestBody Map<String, Object> body) {
    try {
        // 1) Validação de entrada
        if (body.get("clienteId") == null) {
            return ResponseEntity.badRequest().body("clienteId obrigatório");
        }

        // 2) Regra de negócio direto no controller
        BigDecimal total = new BigDecimal(body.get("total").toString());
        if (total.compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.badRequest().body("total inválido");
        }

        // 3) Persistência direto aqui
        PedidoEntity pedido = new PedidoEntity();
        pedido.setClienteId(Long.parseLong(body.get("clienteId").toString()));
        pedido.setTotal(total);
        pedidoRepository.save(pedido);

        // 4) Integração externa também aqui
        String token = authClient.login("usuario", "senha");
        freteClient.calcular(token, pedido.getId(), pedido.getTotal());

        // 5) Formatação de resposta
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", pedido.getId());
        resp.put("status", "CRIADO");
        return ResponseEntity.ok(resp);
    } catch (Exception e) {
        // 6) Tratamento genérico sem contexto
        return ResponseEntity.internalServerError().body("erro inesperado");
    }
}
```

Repare na sobrecarga cognitiva. Um único método mistura várias preocupações que mudam por motivos diferentes. Resultado: qualquer ajuste simples vira cirurgia de alto risco.

## Sinais de que virou confusão

- controller com centenas ou milhares de linhas
- mesmo endpoint mexendo em banco, fila, arquivo e API externa
- testes de controller gigantes tentando cobrir regra de negócio
- bugs regressivos frequentes por efeitos colaterais não intencionais

Isso bate diretamente com smells clássicos de engenharia de software: *long method*, *long parameter list*, *divergent change* e *shotgun surgery*.

## Versão didática com separação mínima

```java
@PostMapping("/pedidos")
public ResponseEntity<?> criar(@RequestBody CriarPedidoRequest req) {
    try {
        ResultadoCriacaoPedido resultado = criarPedidoUseCase.executar(req);
        return ResponseEntity.status(201).body(resultado);
    } catch (ValidacaoException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    } catch (IntegracaoException e) {
        return ResponseEntity.status(502).body("Falha em integração externa");
    }
}

public class CriarPedidoUseCase {
    public ResultadoCriacaoPedido executar(CriarPedidoRequest req) {
        // validação e regras aqui, de forma testável
        // persistência via gateway/repositório
        // integrações encapsuladas
        // retorno explícito
    }
}
```

Aqui o controller volta ao papel dele: orquestrar I/O HTTP e traduzir resultado para resposta. A regra deixa de ficar refém de framework web.

## Como reduzir sem reescrever tudo

Abordagem pragmática, sprint por sprint:

1. escolha um endpoint crítico (o mais alterado)
2. extraia uma regra para um serviço/caso de uso
3. mantenha assinatura antiga para não quebrar cliente
4. adicione teste no caso de uso extraído
5. repita até o controller emagrecer

Isso evita refatoração épica e reduz risco operacional.

## Resumo POG

Controller Confusion é confortável no curto prazo, cruel no médio e impagável no longo. É o padrão ideal para gerar chamados em série e sustentar o emprego de meio time de sustentação.

Se a meta é continuar entregando sem criar um cemitério de endpoint, trate controller como fronteira e não como depósito. Caso contrário, cedo ou tarde, o MVC vira apenas uma lenda oral contada para estagiário.

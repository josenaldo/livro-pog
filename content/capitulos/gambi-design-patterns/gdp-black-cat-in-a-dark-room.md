---
title: Black Cat In A Dark Room
description: Black Cat In A Dark Room
sentence: Tem bug, mas não é no código!!
sentence_author: Estagiário justificando os erros no programa para o gerente
order_number: 25000
date: 2020-04-16 00:24
name: gdp-black-cat-in-a-dark-room
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconMoon"
---
O **Black Cat In A Dark Room** é o padrão em que um método recebe um `Map` genérico (ou estrutura equivalente) com tudo dentro: parâmetros de entrada, flags de comportamento, contexto técnico e, às vezes, traumas da sprint passada.

É como procurar um gato preto num quarto escuro: você sabe que algo está lá, mas não sabe onde, nem em qual tipo.

## Anatomia da gambiarra

A ideia inicial parece elegante: "em vez de 12 parâmetros, passo um `Map` só". O problema é que esse ganho de assinatura vira perda de contrato.

```java
public Object processar(Map<String, Object> params) {
    String operacao = (String) params.get("op");
    Long clienteId = Long.valueOf(params.get("id").toString());
    Boolean urgente = Boolean.valueOf(params.get("urgente").toString());

    // Se alguém enviou "true" como "S" já era.
    // Se "id" vier nulo, explode aqui.
    // Se a chave vier como "clienteId" em outro ponto, não funciona.

    return servico.executar(operacao, clienteId, urgente);
}
```

O compilador para de ajudar cedo. E a validação passa a ser uma colcha de retalhos em runtime.

## Cheiro técnico associado

Esse padrão conversa diretamente com smells conhecidos:

- **Long Parameter List** disfarçado
- **Primitive Obsession** (muito dado cru, pouca modelagem)
- **Data Clumps** (os mesmos campos reaparecendo juntos em vários lugares)

Na prática, você troca uma assinatura verbosa por acoplamento implícito: todo mundo precisa "saber de cabeça" os nomes mágicos das chaves.

Quando ninguém mais consegue explicar o contrato sem abrir cinco chamadas diferentes, o que resta é technobabble operacional.

## Exemplo didático de evolução

### Versão POG

```java
public void criarBoleto(Map<String, Object> map) {
    String nome = (String) map.get("nome");
    String documento = (String) map.get("doc");
    BigDecimal valor = new BigDecimal(map.get("valor").toString());
    String vencimento = (String) map.get("dataVenc");

    // várias conversões, vários riscos silenciosos
}
```

### Versão com contrato explícito

```java
public record CriarBoletoRequest(
    String nome,
    String documento,
    BigDecimal valor,
    LocalDate dataVencimento
) {}

public void criarBoleto(CriarBoletoRequest req) {
    // Aqui o compilador ajuda
    // e o contrato fica autoexplicativo
}
```

Benefícios imediatos:

- tipagem forte
- documentação natural na assinatura
- erro detectado antes da produção
- teste mais simples e legível

## Por que times continuam usando Map genérico

Motivos reais, e não caricatos:

- integração com payload dinâmico/legado
- tentativa de evitar mudanças em cadeia
- medo de criar classes "demais"
- pressão de prazo

Ou seja: o padrão não nasce de burrice, nasce de contexto ruim. O problema é quando ele vira decisão padrão para tudo.

## Como usar sem virar caos

Se precisar usar `Map` por fronteira técnica (por exemplo, parser de payload desconhecido), faça contenção:

1. converta para objeto tipado o mais cedo possível
2. valide presença e tipo das chaves logo na entrada
3. nunca propague `Map` cru pela regra de negócio
4. centralize mapeamento em um único ponto

Assim você transforma o quarto escuro em corredor iluminado.

## Resumo POG

Black Cat In A Dark Room é irresistível no dia de entrega porque parece flexível. Só que flexibilidade sem contrato cobra caro na manutenção.

Em linguagem POGráfica: é uma mochila sem divisória. Cabe tudo. Você só não acha nada quando precisa, principalmente em produção às 17h58 de sexta-feira.

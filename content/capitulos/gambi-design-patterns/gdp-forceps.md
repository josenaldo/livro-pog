---
title: Forceps
description: Forceps
sentence: O código tá certo, deve ser problema na massa de dados.
sentence_author: POGgramador Experiente, com várias certificações em POG
order_number: 15000
date: 2020-04-16 00:14
name: gdp-forceps
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconTool"

---
O **Forceps** e o padrao obstetrico da POG. Ele aparece quando uma variavel nao recebe o valor esperado e, em vez de investigar causa raiz, o POGramador "puxa" o valor correto no ponto de uso.

Em termos praticos, e a arte de corrigir o sintoma localmente para manter o fluxo vivo. Funciona hoje. Custa caro amanha.

## Exemplo classico

```java
/* Variavel e inicializada */
String valor = "123";

/* ... logica do programa ... */

/* Dentro de um metodo que utiliza a variavel 'valor' */
if (!"123".equals(valor)) {
    valor = "123";
    processaValor(valor);
}
```

O trecho parece inocente. Mas repare no que ele comunica: "se veio errado, conserta aqui mesmo". Isso cria uma blindagem local que mascara o defeito real do fluxo.

## Como reconhecer o Forceps no codigo

- verificacoes redundantes do mesmo valor em varios pontos
- atribuicoes "defensivas" copiadas entre metodos
- comentarios tipo "garantia extra para evitar bug intermitente"
- logica de negocio baseada em fallback manual

Quando voce encontra o mesmo `if` em cinco classes diferentes, ja existe um ritual de Forceps consolidado.

## Por que o time adota isso

Motivos reais:

- bug em producao sem tempo para investigacao profunda
- desconhecimento do fluxo completo em legado grande
- medo de tocar na origem e quebrar outras telas
- cultura de apagar incendio primeiro e pensar depois

Ou seja, o Forceps quase nunca nasce por maldade. Ele nasce por sobrevivencia operacional.

## Impactos no medio prazo

- causa raiz segue ativa
- inconsistencias se espalham em silencio
- manutencao fica confusa (qual ponto esta "corrigindo" o que?)
- testes passam sem garantir consistencia global

No fim, o sistema vira uma colcha de microcorrecoes. Cada parte se protege da outra.

## Exemplo didatico de abordagem melhor

```java
public class PedidoService {

    public void processar(Pedido pedido) {
        String codigo = normalizarCodigo(pedido.getCodigo());
        validarCodigo(codigo);
        pedido.setCodigo(codigo);
        repositorio.salvar(pedido);
    }

    private String normalizarCodigo(String codigo) {
        if (codigo == null) {
            return "123"; // regra explicita e centralizada
        }
        return codigo.trim();
    }

    private void validarCodigo(String codigo) {
        if (!"123".equals(codigo)) {
            throw new RegraDeNegocioException("Codigo invalido para este fluxo");
        }
    }
}
```

Aqui, a regra fica centralizada. Se a origem estiver ruim, voce tem erro claro para tratar no ponto certo, em vez de remendo espalhado.

## Estrategia pragmatica de correcao

1. mapear onde o valor esta sendo forçado
2. eleger um unico ponto de normalizacao
3. adicionar teste de contrato para entrada/saida
4. remover os Forceps duplicados aos poucos

Isso evita refatoracao heroica e reduz risco de regressao.

## Resumo POG

Forceps e excelente para entregar hoje e manter o chamado fechado. Mas ele nao resolve defeito sistemico; apenas empurra o problema para frente com juros.

No dialeto POGrames: e um parto feito no corredor. A crianca nasce, mas o prontuario vira lenda urbana dentro do repositorio.

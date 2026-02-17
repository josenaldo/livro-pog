---
title: THUNDER MEGA ZORD
description: THUNDER MEGA ZORD
sentence: O Senhor já tentou reiniciar seu computador? Caso sim vou pedir que desligue seu modem e religue novamente...
sentence_author: Atendente da Algar ou Telefonica utilizando técnicas de TelePOG
order_number: 27000
date: 2020-04-16 00:26
name: gdp-thunder-mega-zord
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconBolt"

---
O **Thunder Mega Zord** e a fusao entre duas potencias da gambiarra: metodo gigantesco + contrato opaco com `Map` de entrada e `Object[]` de saida. E a tempestade perfeita do acoplamento.

```java
/**
 * Processa
 *
 * @param parametros
 * @return
 * @throws Throwable
 */
public static Object[] processar(Map parametros) throws Throwable {
    // Aí é aquilo, mermão...
    // ...
    // ...
    return processado;
}
```

A assinatura nao diz quase nada. So promete incerteza com confianca.

## Como identificar

- `Map` sem tipo para entrada complexa
- `Object[]` com indices sem semantica
- throws amplo (`Throwable`/`Exception`) para tudo
- javadoc generico sem contrato util

Quando a documentacao diz "Processa" e o retorno e `Object[]`, voce nao tem API: voce tem adivinhacao.

## Exemplo didatico de risco

```java
Object[] retorno = processar(params);
String status = (String) retorno[0];
BigDecimal total = (BigDecimal) retorno[1];
Date data = (Date) retorno[2];
```

Se alguem mudar a ordem interna para `[total, status, data]`, o compilador nao reclama. O bug aparece em runtime, geralmente em producao.

## Por que esse padrao surge

- metodo legado cresceu sem contrato formal
- tentativa de evitar criacao de classes de entrada/saida
- integracao rapida entre equipes sem alinhamento de tipos
- "nao mexe na assinatura que quebra tudo"

Em ambientes de prazo extremo, e compreensivel. Em ambiente de manutencao continua, e erosao programada.

## Versao didatica mais segura

```java
public record ProcessarRequest(Long clienteId, BigDecimal valor, boolean urgente) {}
public record ProcessarResponse(String status, BigDecimal total, LocalDate dataProcessamento) {}

public ProcessarResponse processar(ProcessarRequest req) {
    // regra aqui
    return new ProcessarResponse("OK", req.valor(), LocalDate.now());
}
```

Agora:

- contrato e autoexplicativo
- compilador ajuda
- mudanca de campo exige ajuste explicito
- teste fica legivel

## Migracao incremental possivel

1. manter assinatura antiga como adaptador temporario
2. converter `Map` para request tipado internamente
3. devolver response tipado e mapear para `Object[]` apenas no adaptador
4. migrar consumidores gradualmente

Assim voce moderniza sem quebrar tudo de uma vez.

## Resumo POG

Thunder Mega Zord entrega flexibilidade instantanea e debito estrutural de longo prazo. Ele parece universal porque aceita tudo e devolve qualquer coisa.

No evangelho da TelePOG: se nao souber diagnosticar, reinicia. Se continuar ruim, culpa a internet e abre outro chamado.

## Mini checklist de mitigacao

Contrato opaco precisa de quarentena: converta entradas e saidas genericas em objetos tipados na fronteira do metodo. Mesmo que internamente continue legado por um tempo, essa adaptacao reduz risco imediato e prepara migracao segura dos consumidores.

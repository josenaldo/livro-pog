---
title: Db Is Our God
description: Db Is Our God
sentence: Se o sistema está lento é por causa do banco.
sentence_author: POGramador tirando o dele da reta
order_number: 30000
date: 2020-04-16 00:29
name: gdp-db-is-our-god
parent: gambi-design-patterns
isParent: false
status: done
icon: "tabler/IconDatabase"

---
No **Db Is Our God**, o banco de dados deixa de ser camada de persistencia e vira centro do universo: regra de negocio, orquestracao de fluxo, validacao, transformacao, geracao de relatorio e ate HTML.

Tambem conhecido como **In DB We Trust**.

## Dogmas do padrao

Tudo vai para o banco:

- dados e arquivos
- imagens e logs
- regra de negocio em procedure
- tratamento de erro em trigger
- composicao de resposta em SQL

A promessa e "centralizar para padronizar". O risco e concentrar complexidade e gargalo no mesmo ponto.

## Exemplo didatico

```sql
CREATE PROCEDURE processar_pedido(
    IN p_cliente_id BIGINT,
    IN p_valor DECIMAL(10,2)
)
BEGIN
    -- valida cliente
    -- calcula imposto
    -- grava pedido
    -- atualiza estoque
    -- chama funcao de notificacao
    -- retorna mensagem formatada
END;
```

Procedure grande pode funcionar bem em cenario especifico. O problema surge quando ela vira lugar padrao para toda regra, sem fronteira clara entre dominio e persistencia.

## Sintomas de culto ao banco

- alteracao de regra exige deploy de script + janela de manutencao
- time de aplicacao nao entende mais o fluxo completo
- logica espalhada entre app e SQL sem contrato
- dificuldade de testar regra fora do ambiente de banco

Quando o dominio mora em trigger, a aplicacao vira um cliente passivo de eventos invisiveis.

## Por que isso acontece

- historico forte de time DBA-centric
- performance local excelente em consultas complexas
- legado construido antes de camada de servico madura
- tentativa de garantir consistencia "na marra"

Existe valor real em banco: transacao, integridade referencial, constraints, consulta. O excesso e que vira anti-pattern.

## Exemplo de equilibrio pragmatico

- banco cuida de integridade e consulta eficiente
- aplicacao cuida de caso de uso e orquestracao
- procedures ficam para cenarios realmente justificados

```java
public void criarPedido(CriarPedidoInput input) {
    validarRegras(input);      // regra de negocio
    Pedido pedido = mapper.map(input);
    repositorio.salvar(pedido); // persistencia
}
```

No banco:

```sql
ALTER TABLE pedido
ADD CONSTRAINT chk_valor_positivo CHECK (valor > 0);
```

Cada camada cumpre seu papel.

## Estrategia de migracao

1. mapear procedures criticas por dominio
2. separar validacoes de negocio das constraints de integridade
3. expor regras em camada de aplicacao com testes
4. manter no banco o que e estrutural e transacional

Sem guerra santa. Com criterio.

## Resumo POG

Db Is Our God da sensacao de controle total, mas centraliza risco e reduz flexibilidade de evolucao. Banco e essencial, mas nao precisa ser divindade onipotente do sistema.

No catecismo POGramador: quando tudo e milagre de procedure, qualquer manutencao vira peregrinacao com janela de madrugada.

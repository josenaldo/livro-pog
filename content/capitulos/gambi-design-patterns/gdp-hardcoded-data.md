---
title: Hardcoded Data
description: Hardcoded Data
sentence: É só gerar tudo de novo, provavelmente deu erro na especificação.
sentence_author: POGgramador com sua desculpa POG para o problema
order_number: 14000
date: 2020-04-16 00:13
name: gdp-hardcoded-data
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
No **Hardcoded Data**, dado de configuracao, regra de negocio e detalhe de ambiente sao colocados diretamente no codigo-fonte. O mantra e simples: "se esta no codigo, eu sei onde esta".

O problema e que o codigo vira ao mesmo tempo executavel, banco de parametros e painel operacional.

## Exemplo classico

```java
// Xunxa o nome da impressora no codigo. Quem quer escolher impressora?
infoImpressao = ImpressaoUtils.getInfoImpressao(codigoRelatorio, "PADRAO");
```

Hoje e o nome da impressora. Amanha e URL de servico, aliquota fiscal, chave de parceiro e data de corte. Em poucas sprints, o deploy vira painel de configuracao manual.

## Sinais de que o padrao tomou conta

- strings magicas repetidas em varias classes
- alteracao de regra operacional exigindo merge + pipeline
- ambiente homolog/producao diferenciados por `if (isProd)`
- chamados de negocio resolvidos com "vamos subir patch"

Quando mudar um texto de mensagem exige release, o Hardcoded Data venceu.

## Por que ele aparece

- pressa para colocar funcionalidade no ar
- falta de estrategia de configuracao por ambiente
- legado sem centralizacao de parametros
- medo de criar tabela/config store "mais uma vez"

No curto prazo, parece pratico. No longo, todo ajuste vira risco de regressao funcional.

## Exemplo didatico de evolucao

### Versao POG

```java
public void emitirRelatorio() {
    String impressora = "PADRAO";
    String endpoint = "https://api.parceiro.com/v1";
    int timeout = 30;
    // ...
}
```

### Versao com configuracao explicita

```java
public class ConfiguracaoRelatorio {
    private final String impressoraPadrao;
    private final String endpointParceiro;
    private final int timeoutSegundos;

    public ConfiguracaoRelatorio(String impressoraPadrao, String endpointParceiro, int timeoutSegundos) {
        this.impressoraPadrao = impressoraPadrao;
        this.endpointParceiro = endpointParceiro;
        this.timeoutSegundos = timeoutSegundos;
    }

    public String getImpressoraPadrao() { return impressoraPadrao; }
    public String getEndpointParceiro() { return endpointParceiro; }
    public int getTimeoutSegundos() { return timeoutSegundos; }
}

public void emitirRelatorio(ConfiguracaoRelatorio cfg) {
    // usa cfg sem chutar valor em runtime
}
```

A regra sai do codigo e vai para contrato de configuracao. Resultado: menos release de emergencia para ajuste operacional.

## Impactos de negocio

- time de produto depende de dev para mudar qualquer parametro
- incidentes aumentam por ajustes urgentes em horario critico
- rollback de versao pode desfazer configuracoes validas
- auditoria fica fraca (quem mudou o que e quando?)

## Correcao sem trauma

1. mapear constantes criticas (URL, timeout, codigos de regra)
2. extrair para configuracao externa versionada
3. manter default seguro apenas onde fizer sentido
4. adicionar validacao na inicializacao do sistema

Assim voce reduz acoplamento sem parar a entrega.

## Resumo POG

Hardcoded Data e a forma mais rapida de transformar deploy em ferramenta administrativa. Funciona enquanto o sistema e pequeno. Quando cresce, vira gargalo organizacional.

No linguajar POGristico: e tatuar instrucoes operacionais no corpo do programa e fingir surpresa quando mudar de ideia doi.

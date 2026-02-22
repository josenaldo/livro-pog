---
title: Psychoding
description: Psychoding
sentence: Não me interessa se é restrição da ferramenta, dá um jeito e coloca isso funcionando até amanhã!
sentence_author: Gerente de Projeto mostrando como se lidera a equipe a criar uma POG
order_number: 10000
date: 2020-04-16 00:09
name: tecnica-psychoding
parent: tecnicas
isParent: false
status: done
icon: "tabler/IconBrain"

---
**Psychoding** e a tecnica espiritual da POG: voce nao sabe como resolver, entao abre o navegador, entra em transe de busca, copia blocos de codigo de fontes aleatorias e monta uma solucao por intuicao.

Nao e estudo. E incorporacao tecnica.

Quando a defesa da solucao comeca a soar como explicacao pseudo-cientifica improvisada, temos um cangro simondrônico em plena manifestacao.

## Etapas do transe

1. abre o Google com desespero sincero
2. cai em forum, gist, post antigo e resposta sem contexto
3. copia o trecho que "parece igual"
4. ajusta ate compilar
5. agradece aos deuses quando passa em homologacao

A mente chama isso de produtividade. O repositorio chama isso de risco latente.

## Exemplo classico

```java
// trecho copiado sem entender impacto
SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd");
String data = sdf.format(new Date());
```

Funciona "na maioria dos dias". Em virada de ano, `YYYY` pode gerar comportamento inesperado porque representa semana-ano em certos contextos, nao ano calendario.

## Por que Psychoding pega tao facil

- prazo agressivo
- baixa cultura de aprofundamento
- excesso de confianca em snippet pronto
- recompensa imediata por "fazer funcionar"

Copiar e colar nao e pecado em si. O problema e nao validar premissas e nao compreender o que foi trazido.

## Sinais de que a tecnica virou rotina

- codigo com estilos inconsistentes dentro do mesmo metodo
- dependencias adicionadas sem justificativa
- solucoes com API deprecated ou insegura
- time que nao consegue explicar por que algo foi implementado daquele jeito

Quando a explicacao oficial e "peguei no Stack Overflow", falta camada de engenharia.

## Exemplo didatico de uso consciente

### Versao POG

```java
// copiar, ajustar, subir
Pattern p = Pattern.compile("(.*)");
```

### Versao responsavel

```java
// 1) entender o problema
// 2) escolher abordagem
// 3) validar com testes
Pattern p = Pattern.compile("^[A-Z0-9]{8}$");
boolean valido = p.matcher(codigo).matches();
```

Diferenca principal: intencao explicita e verificavel.

## Como aproveitar pesquisa sem cair em Psychoding

- tratar snippet como referencia, nao como produto final
- ler documentacao oficial da API usada
- escrever teste para casos limite
- registrar por que a solucao foi escolhida

Assim voce usa inteligencia coletiva sem terceirizar entendimento.

## Risco de longo prazo

- base incoerente e dificil de manter
- vulnerabilidades por codigo copiado sem auditoria
- efeito "torre de babel" entre modulos
- dependencia de sorte para incidentes nao acontecerem

Psychoding gera entrega rapida, mas cobra pedagio tecnico crescente.

## Resumo POG

Psychoding e mediunidade aplicada ao backlog: incorpora codigo de terceiros e espera que os espiritos da producao colaborem.

No evangelho POGramador: pesquisar e necessario, mas compreender e opcional so ate a primeira madrugada de incidente.

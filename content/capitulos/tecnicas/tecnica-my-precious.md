---
title: My precious
description: My precious
sentence: Ontem tava funcionando!
sentence_author: POGramador dando uma desculpa sobre POG
order_number: 9000
date: 2020-04-16 00:08
name: tecnica-my-precious
parent: tecnicas
isParent: false
status: done
icon: "tabler/IconDiamond"

---
A tecnica **My Precious** estabelece propriedade emocional de codigo: "esse modulo e meu, so eu mexo". O objetivo oculto e manter controle absoluto sobre um trecho critico e, por tabela, sobre o fluxo de trabalho da equipe.

## Sinais classicos

- apenas uma pessoa aprova PR daquele modulo
- qualquer alteracao exige consulta ao "dono"
- documentacao minima, contexto maximo na cabeca de alguem
- incidentes resolvidos por chamada direta para a mesma pessoa

Em estado avancado, o codigo nao pertence ao produto. Pertence ao guardiao.

## Por que isso acontece

- historico de sistema criado por uma pessoa so
- falta de padrao de compartilhamento de conhecimento
- inseguranca tecnica (medo de "estragarem" o que funciona)
- reconhecimento organizacional baseado em dependencia

My Precious nao e so tecnica de codigo. E dinamica de poder tecnico.

## Exemplo do efeito colateral

```text
Dev A entra de ferias -> modulo de faturamento para
Dev A adoece -> release adiado
Dev A sai da empresa -> time abre 17 chamados de emergencia
```

Quando continuidade depende de uma unica pessoa, o risco do negocio ja esta materializado.

## Exemplo didatico de comportamento

### Versao My Precious

```java
// Classe enorme sem testes
public class FechamentoMensalService {
    // "nao mexer sem falar comigo"
}
```

### Versao colaborativa minima

- testes cobrindo fluxos principais
- revisao em par para mudancas criticas
- README do modulo com regras e pontos de atencao
- rotacao de ownership em tarefas relevantes

Codigo compartilhado reduz dependencia sem eliminar responsabilidade.

## O mito da protecao

A justificativa comum e "se muita gente mexer, vai quebrar". Na realidade, isolamento sem transparencia costuma piorar:

- bug permanece escondido
- melhoria fica represada
- onboarding nao evolui
- qualidade cai quando o dono nao esta disponivel

Controle individual da uma sensacao de ordem. Colaboracao disciplinada entrega resiliencia real.

## Como desmontar o padrao sem conflito

1. mapear modulos com ownership concentrado
2. criar pareamento tecnico nas manutencoes criticas
3. exigir testes para mudancas de alto risco
4. distribuir gradualmente revisao e sustentacao
5. reconhecer colaboracao, nao apenas heroismo individual

Mudanca cultural e incremental, mas precisa ser intencional.

## Resumo POG

My Precious protege ego no curto prazo e fragiliza sistema no longo. O projeto fica refem de disponibilidade humana, nao de processo tecnico.

No idioma POGramador: e guardar o anel no bolso e chamar isso de estrategia de governanca de software.

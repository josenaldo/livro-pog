---
title: Foco Morcegativo
description: A procrastinação elevada a prática de engenharia
sentence: Depois eu faço isso!
sentence_author: Autor do TODO mais antigo do repositório (2017)
order_number: 5450
date: 2020-04-16 00:04
name: principio-foco-morcegativo
parent: principios
isParent: false
status: done
icon: "tabler/IconClockPause"

---

O **Foco Morcegativo** é o princípio da procrastinação sistemática. Tudo que pode ser adiado, será adiado. Testes? Depois. Documentação? Depois. Refatoração? Depois. Tratamento de erros? Depois. O "depois" é o horizonte de eventos da POG: tudo que cai lá nunca mais volta.

O nome "morcegativo" vem da combinação de morcego (criatura noturna que deixa tudo pra escuridao) com negativo (a negação da urgência). O POGramador morcegativo não ignora o problema — ele apenas o agenda para um futuro que nunca chega.

## O mecanismo

1. **Identificação do trabalho necessário**: o dev sabe que precisa fazer.
2. **Classificacao como "não urgente"**: "não vai quebrar agora".
3. **Substituição por trabalho mais atraente**: feature nova > limpeza de código.
4. **Marcacao ritual**: um TODO no código, uma task no backlog, um post-it no monitor.
5. **Esquecimento estrutural**: o TODO vira parte da paisagem.

## Exemplo clássico: o cemiterio de TODOs

```java
public class PedidoService {

    // TODO: adicionar validacao de estoque (2019-03-15)
    public Pedido criarPedido(CarrinhoDTO carrinho) {
        // TODO: verificar se o cliente esta ativo
        // TODO: aplicar regras de desconto
        // FIXME: esse calculo ta errado pra frete internacional
        // HACK: conversao de moeda hardcoded (ver ticket #1247)

        Pedido pedido = new Pedido();
        pedido.setItens(carrinho.getItens());
        pedido.setTotal(carrinho.getTotal() * 1.0); // TODO: impostos

        // TODO: enviar email de confirmacao
        // TODO: integrar com ERP
        // TODO: notificar o setor financeiro

        return repository.save(pedido);
    }
}
```

Sete TODOs, um FIXME e um HACK. A data mais antiga é de 2019. O código está em produção. Ninguém nunca voltou pra resolver. O "depois" já faz 7 anos.

## Caso real: TODOs em projetos open-source

O fenômeno dos TODOs eternos não é exclusivo de projetos corporativos. Em repositórios famosos do GitHub, é possível encontrar TODOs que sobrevivem por anos:

No kernel Linux, existem comentários `TODO` e `FIXME` que datam de decadas atrás. O próprio Linus Torvalds já comentou que muitos deles se tornaram irrelevantes porque o código ao redor mudou completamente, mas o comentário ficou.

Em projetos Node.js, a busca por `TODO` em qualquer codebase maduro revela centenas de itens. O `TODO` virou, na prática, uma forma de documentação: "eu sei que isso ta ruim, mas olha, eu marquei".

```bash
# Busca real em projetos populares
$ grep -r "TODO" src/ | wc -l
247

$ grep -r "FIXME" src/ | wc -l
38

$ grep -r "HACK" src/ | wc -l
12

# Total de itens "temporarios" convivendo em producao: 297
```

## O backlog como cemiterio

A versão corporativa do TODO é o item de backlog que nunca sobe de prioridade:

```
Titulo: [TECH DEBT] Refatorar modulo de autenticacao
Criado em: 2021-06-14
Prioridade: Baixa
Assignee: Ninguem
Sprint: Backlog (sem previsao)
Comentarios:
  2021-06-14 - "Criado para acompanhamento"
  2021-09-03 - "Vamos priorizar no Q4"
  2022-01-15 - "Movido para Q2 2022"
  2022-07-20 - "Movido para backlog"
  (silencio desde entao)
```

O item existe. Ele é visível. Ele aparece nas dashboards. Mas ninguém trabalha nele. Sua existência serve como talismã: "a gente sabe do problema, ta no backlog".

## Exemplo em código: o switch que cresce

O Foco Morcegativo frequentemente se manifesta em código que acumula casos especiais porque ninguém para pra refatorar:

```javascript
function formatarDocumento(tipo, numero) {
  switch (tipo) {
    case 'cpf':
      return numero.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    case 'cnpj':
      return numero.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    case 'rg':
      return numero; // TODO: formatar RG (varia por estado)
    case 'passaporte':
      return numero; // TODO: formatar passaporte
    case 'cnh':
      return numero; // TODO: formatar CNH
    case 'titulo_eleitor':
      return numero; // TODO: formatar titulo de eleitor
    case 'carteira_trabalho':
      return numero; // depois
    case 'pis':
      return numero; // idem
    case 'sus':
      return numero;
    default:
      return numero; // TODO: tratar tipo desconhecido
  }
}
```

A função começou formatando CPF e CNPJ. Cada novo tipo de documento foi adicionado com o corpo vazio e um `return número` que não formata nada. O `switch` cresceu, os TODOs acumularam, e a função faz o que deveria fazer em apenas 2 de 10 casos.

## A lei do congelamento

O Foco Morcegativo tem uma propriedade termodinâmica: quanto mais tempo um TODO fica no código, mais difícil é resolvê-lo. Isso acontece porque:

1. O contexto original se perde (quem escreveu já saiu)
2. O código ao redor muda (a correção ficou mais complexa)
3. O sistema cria dependências do comportamento bugado
4. O custo de mudar supera o custo de conviver

Depois de certo ponto, o TODO congela. Ele vira infraestrutura.

## Por que o Foco Morcegativo sobrevive

- **Priorização real**: nem todo TODO é urgente, e recursos são finitos.
- **Dopamina da feature nova**: construir algo novo é mais motivador que arrumar algo velho.
- **Recompensa organizacional**: ninguém é promovido por resolver TODOs.
- **Complexidade acumulada**: quanto mais se adia, mais difícil fica, o que incentiva adiar mais.

## Consequências

- débito técnico que cresce em juros compostos
- código com dezenas de "buracos" conhecidos mas não resolvidos
- onboarding confuso ("esse TODO é pra fazer?" "não, é histórico")
- falsa sensação de controle ("ta no backlog")
- eventual colapso quando os TODOs se acumulam além do suportavel

## Relação com outros princípios

- **Documentação Espartana**: o TODO *é* a documentação. É a única.
- **Imperativo Funcional**: se funciona sem resolver o TODO, pra que resolver?
- **Simplicidade Indolente**: não fazer algo é a forma mais simples de não complicar.
- **Abstração Ignorancial**: o TODO avisa, o dev ignora. É a ignorância documentada.

## Veredicto

O Foco Morcegativo é o princípio mais honesto da POG. Pelo menos o POGramador morcegativo reconhece o problema e deixa uma marca. É mais do que muitos fazem.

O perigo é quando o "depois" vira "nunca". Quando o backlog vira museu. Quando o TODO vira piada interna. Nesse ponto, o princípio deixou de ser procrastinação e virou política da empresa.

Se você quer medir a saúde de um projeto, conte os TODOs. Mais de 50? O Foco Morcegativo já é cultura. Menos de 5? Ou o time é disciplinado, ou ninguém escreve TODOs (o que é pior).

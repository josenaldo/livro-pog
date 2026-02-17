---
title: No More Layers
description: No More Layers
sentence: Deu erro...comenta!
sentence_author: Alunos descobrindo como fazer POG, na faculdade.
order_number: 29000
date: 2020-04-16 00:28
name: gdp-no-more-layers
parent: gambi-design-patterns
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---
No **No More Layers**, arquitetura em camadas e considerada burocracia. Tudo acontece no mesmo lugar, normalmente na tela/controlador: validacao, regra de negocio, acesso a dados e formatacao de resposta.

A promessa e velocidade. O custo e acoplamento total.

## Exemplo classico

```java
private void botaoSalvar_Click(Object sender, EventArgs e) {
    // 1) le campos da tela
    // 2) valida regra
    // 3) monta SQL
    // 4) executa no banco
    // 5) monta mensagem de retorno
    // 6) atualiza grid
}
```

Tudo numa unica rotina de interface. Parece eficiente enquanto o sistema e pequeno. Quando cresce, cada alteracao de regra exige tocar na tela.

## Consequencias praticas

- baixa reutilizacao de regra de negocio
- testes automatizados dificeis
- dependencia forte de framework de UI
- regressao em cascata a cada ajuste visual

Quando a troca de banco exige alterar formulario, a separacao de responsabilidades ja morreu.

## Onde esse padrao e comum

- legados desktop (Delphi, VB6, WinForms)
- sistemas web antigos com script + SQL inline
- projetos que cresceram sem desenho arquitetural
- times pressionados por entregas imediatas

Nao e um problema de tecnologia especifica. E um problema de limite de responsabilidade.

## Exemplo didatico de separacao minima

```java
// camada de interface
public Resultado salvarPedido(FormPedido form) {
    CriarPedidoInput input = mapear(form);
    return criarPedidoUseCase.executar(input);
}

// caso de uso
public Resultado executar(CriarPedidoInput input) {
    validar(input);
    Pedido pedido = Pedido.novo(input);
    repositorio.salvar(pedido);
    return Resultado.sucesso(pedido.getId());
}
```

Aqui a tela para de saber SQL e regra fiscal. Ela apenas traduz entrada/saida.

## Correcao gradual

1. escolher um fluxo com muita manutencao
2. extrair regra para servico/caso de uso
3. manter UI como adaptador
4. repetir por partes sem reescrita global

Abordagem incremental reduz risco de parada total.

## Beneficio real de manter camadas

- mudanca de regra sem mexer na tela
- possibilidade de reaproveitar fluxo em API/job
- testes de negocio sem subir interface
- codigo mais legivel para onboarding

Arquitetura em camadas nao e luxo academico. E estrategia para reduzir custo de mudanca.

## Resumo POG

No More Layers e gostoso no curto prazo: menos arquivos, mais entrega rapida. No longo prazo, transforma cada ajuste simples em operacao delicada.

Na linguagem POG: e cozinhar, atender cliente e lavar prato no mesmo fogao. Da para fazer. Escalar e outra historia.

## Mini checklist de mitigacao

Se a tela conhece SQL, regra fiscal e formato de resposta externa, a camada de interface ja esta sobrecarregada. Comece separando apenas uma responsabilidade por sprint. Em poucos ciclos, o ganho de teste e previsibilidade aparece sem precisar pausar o roadmap.

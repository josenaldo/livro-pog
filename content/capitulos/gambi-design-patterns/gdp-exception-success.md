---
title: Exception Success
description: Exception Success
sentence: Quando eu cheguei já tava assim!!!
sentence_author: POGramador, querendo tirar o seu da reta!
order_number: 22000
date: 2020-04-16 00:21
name: gdp-exception-success
parent: gambi-design-patterns
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---
O **Exception Success** é o padrão em que a exceção deixa de representar situação excepcional e passa a ser usada como fluxo normal da aplicação. Em vez de retornar um resultado, o código "comunica" sucesso, validação, autorização e até regra de negócio por `throw`.

Na teoria, exceção deveria sinalizar algo fora do caminho esperado. Na prática POG, ela vira API oficial da casa.

```java
public static void somar(int a, int b) {
    System.out.println(a + b);
    // POG clássica: sucesso tratado como "erro"
    throw new RuntimeException("Operação realizada com sucesso!");
}
```

## Como reconhecer esse padrão

Você provavelmente está diante de um Exception Success quando vê este combo:

- métodos "felizes" que sempre terminam com `throw`
- `catch (Exception e)` decidindo regra de negócio
- mensagem de usuário final embutida em exception técnica
- sistema que "funciona" só porque alguém conhece a ordem dos `catch`

Outro sinal típico é a classe de serviço com assinatura sem retorno útil, e toda decisão sendo tomada no controlador por blocos de captura.

## Exemplo didático (versão POG)

```java
public void processarPagamento(Pagamento pagamento) throws Exception {
    if (pagamento == null) {
        throw new Exception("Pagamento inválido");
    }

    if (pagamento.getValor() <= 0) {
        throw new Exception("Valor deve ser maior que zero");
    }

    gateway.cobrar(pagamento);

    // "Sucesso" sinalizado por exceção para cair no catch correto
    throw new Exception("PAGAMENTO_OK");
}

public String concluir(Pagamento pagamento) {
    try {
        processarPagamento(pagamento);
        return "Fluxo inesperado"; // nunca chega aqui
    } catch (Exception e) {
        if ("PAGAMENTO_OK".equals(e.getMessage())) {
            return "Pagamento concluído";
        }
        return "Falha: " + e.getMessage();
    }
}
```

Esse código parece "esperto" no curto prazo, porque centraliza tudo no `catch`. O problema é que mistura semânticas diferentes no mesmo canal:

- erro de infraestrutura
- erro de validação
- estado de sucesso

Quando tudo vira exceção, nada mais é exceção.

## Por que isso aparece em projeto real

Esse padrão nasce por combinação de pressa, legado e falta de contrato claro entre camadas. É comum em contexto onde o time precisa "fazer entrar em produção hoje" e adota soluções improvisadas:

- não havia tipo de retorno definido
- o sistema já tinha muito `try/catch` espalhado
- cada dev adicionou mais um `throw` para não quebrar fluxo antigo

Também aparece como versão digital do cargo cult programming: alguém viu que um `throw` resolveu um bug específico, copiou a técnica, e passou a reproduzir o ritual sem entender o efeito colateral.

## Impactos técnicos

Os danos costumam ser progressivos:

- observabilidade piora, porque logs ficam poluídos com "erros" que não são erros
- monitoramento dispara alerta falso
- leitura do código fica ambígua
- testes ficam frágeis, pois dependem de mensagens textuais
- qualquer internacionalização quebra regra de negócio baseada em `e.getMessage()`

Em sistemas Java, isso ainda conflita com a intenção da própria linguagem e bibliotecas, que tratam exceções como mecanismo de anomalia de execução, não como retorno padrão.

## Exemplo didático (versão menos caótica)

```java
public final class ResultadoPagamento {
    private final boolean sucesso;
    private final String mensagem;

    private ResultadoPagamento(boolean sucesso, String mensagem) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
    }

    public static ResultadoPagamento ok(String mensagem) {
        return new ResultadoPagamento(true, mensagem);
    }

    public static ResultadoPagamento falha(String mensagem) {
        return new ResultadoPagamento(false, mensagem);
    }

    public boolean isSucesso() { return sucesso; }
    public String getMensagem() { return mensagem; }
}

public ResultadoPagamento processarPagamento(Pagamento pagamento) {
    if (pagamento == null) {
        return ResultadoPagamento.falha("Pagamento inválido");
    }

    if (pagamento.getValor() <= 0) {
        return ResultadoPagamento.falha("Valor deve ser maior que zero");
    }

    try {
        gateway.cobrar(pagamento);
        return ResultadoPagamento.ok("Pagamento concluído");
    } catch (GatewayIndisponivelException e) {
        // aqui sim: exceção realmente excepcional
        return ResultadoPagamento.falha("Gateway indisponível");
    }
}
```

Perceba a diferença didática:

- fluxo de negócio usa retorno explícito
- exceção fica para falha inesperada/infraestrutura
- contrato fica legível para quem mantém depois

## Resumo POG

Exception Success é sedutor porque parece reduzir código no início. Só que ele troca clareza por truque, e truque em software envelhece mal. Em termos gambiarrísticos, é uma técnica de "entrega imediata com juros compostos".

Se ainda existir Exception Success no seu sistema, não precisa derrubar tudo. Comece isolando os pontos críticos e separando, pouco a pouco, **resultado de negócio** de **condição excepcional**. Assim você preserva produção e reduz o caos sem ferir o GLS.

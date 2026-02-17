---
title: String Sushiman
description: String Sushiman
sentence: Quando eu testei, funcionou!
sentence_author: POGramador demonstrando as gambiarras para seu Gerente Sem Noção
order_number: 23000
date: 2020-04-16 00:22
name: gdp-string-sushiman
parent: gambi-design-patterns
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
No **String Sushiman**, parametros estruturados sao compactados em uma string "linguicao" com delimitadores magicos. Depois, o codigo faz `split` em camadas e torce para cada posicao vir no formato correto.

## Exemplo classico

```java
public Tabela montaTabela(String linguicao) {

    String[] colunas = linguicao.split("\\|");

    for (String coluna : colunas) {
        String[] campos = coluna.split(",");
        // POGuices com os valores
    }
}
```

Parece rapido para enviar dados sem criar contrato formal. O custo vem depois: qualquer virgula fora do lugar quebra o parsing inteiro.

## Sinais de maturidade Sushiman

- metodo com um unico `String` recebendo tudo
- documento externo explicando "ordem dos campos" em texto livre
- erros de parse intermitentes conforme dados reais
- codigo cheio de `split`, `trim`, `substring` e `try/catch`

Quando a validacao e "se nao explodiu, ta valido", o padrao esta em pleno vigor.

## Por que aparece

- pressa para integrar sistemas heterogeneos
- aversao a criar DTO/JSON/XML formal
- legado com protocolo artesanal
- tentativa de economizar mudancas de assinatura

No curtissimo prazo, pode destravar entrega. No medio, vira debito tecnico dificil de auditar.

## Exemplo didatico

### Versao POG

```java
String payload = "nome=Ana,idade=29,ativo=true|nome=Joao,idade=31,ativo=false";
```

Se um nome vier com virgula (`"Ana, Maria"`), tudo quebra.

### Versao com contrato simples

```java
public record UsuarioDTO(String nome, int idade, boolean ativo) {}

List<UsuarioDTO> usuarios = List.of(
    new UsuarioDTO("Ana", 29, true),
    new UsuarioDTO("Joao", 31, false)
);
```

Ou, se fronteira exigir texto, use formato estruturado (JSON/CSV formal) com parser robusto e esquema validado.

## Impacto operacional

- bugs de integracao de dificil reproducao
- acoplamento forte ao "formato secreto"
- evolucao dolorosa (adicionar campo quebra consumidores antigos)
- testes extensos so para validar parsing

## Mitigacao pragmatica

1. mapear strings-protocolo mais criticas
2. criar parser dedicado com validacao clara
3. converter cedo para objeto tipado
4. planejar migracao para contrato explicito

Mesmo sem reescrever tudo, so de isolar parsing em um ponto voce reduz caos.

## Resumo POG

String Sushiman e arte de empilhar informacao heterogenea em texto linear e chamar isso de protocolo. Funciona enquanto todos decoram a ordem. Quando alguem esquece, estoura em producao.

No idioma POGramador: e servir feijoada em rolinho de sushi. Alimenta, mas cada mordida e um evento imprevisivel.

## Mini checklist de mitigacao

Antes de aceitar uma linguica de string em producao, valide tres pontos: formato versionado, parser unico e erro com mensagem clara. Sem isso, cada consumidor interpreta o payload de um jeito e a integracao vira loteria. Em ambiente serio, protocolo textual sem contrato formal e convite para incidente recorrente.

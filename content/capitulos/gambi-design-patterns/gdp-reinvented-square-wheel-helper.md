---
title: Reinvented Square Wheel Helper
description: Reinvented Square Wheel Helper
sentence: Hmmm.. que estranho... Não era para acontecer isso...
sentence_author: Programador fazendo uma demonstração do software
order_number: 19000
date: 2020-04-16 00:18
name: gdp-reinvented-square-wheel-helper
parent: gambi-design-patterns
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---
O **Reinvented Square Wheel Helper** e o padrao de reimplementar manualmente algo que a linguagem, framework ou biblioteca ja fornece com qualidade melhor.

A motivacao costuma ser nobre: "quero controle total". O resultado, quase sempre, e uma roda quadrada de manutencao pesada.

## Exemplo classico

```java
if (number.equals("1")) {
    return 1;
} else if (number.equals("2")) {
    return 2;
} else if (number.equals("3")) {
    return 3;
} else if (number.equals("4")) {
    return 4;
} else if (number.equals("5")) {
    return 5;
} // ... ate o infinito
```

Aqui, algo que poderia ser `Integer.parseInt(number)` vira cascata manual sujeita a erro, inconsistencia e custo de manutencao absurdo.

## Sintomas do padrao

- helpers enormes para funcao basica
- "framework interno" para resolver problema trivial
- implementacoes caseiras sem teste robusto
- divergencia entre comportamento esperado e padrao de mercado

Quando o time escreve parser de data na mao em projeto Java moderno, a roda quadrada ja esta em producao.

## Por que isso acontece

- desconhecimento de recurso nativo
- trauma com biblioteca antiga
- desconfiança de dependencia externa
- ego tecnico ("eu faco melhor")

Nem sempre e vaidade. Muitas vezes e falta de repertorio compartilhado no time.

## Exemplo didatico

### Versao POG

```java
public boolean isEmailValido(String email) {
    if (email == null) return false;
    if (!email.contains("@")) return false;
    if (!email.contains(".")) return false;
    if (email.startsWith("@")) return false;
    // dezenas de regras incompletas...
    return true;
}
```

### Versao mais segura

```java
public boolean isEmailValido(String email) {
    if (email == null) return false;
    return javax.mail.internet.InternetAddress
        .parse(email, true)
        .length == 1;
}
```

Voce delega para implementacao madura, reduz bug e foca na regra de negocio real.

## Custo oculto

- aumento de superficie de bug
- onboarding lento (aprender ferramentas internas desnecessarias)
- dificuldade de evolucao (cada helper caseiro vira dependente de contexto)
- retrabalho em manutencao corretiva

Em resumo: mais codigo para manter sem ganho proporcional de valor.

## Correcao pragmatica

1. identificar helpers caseiros de alto risco
2. comparar com API nativa equivalente
3. migrar gradualmente com testes de comportamento
4. documentar quando realmente precisar de implementacao propria

Se houver requisito especifico legitimo, mantenha customizacao minima e justificada.

## Resumo POG

Reinvented Square Wheel Helper e o orgulho de construir do zero o que ja existe pronto. Da sensacao de autoria e traz manutencao vitalicia.

No vocabulário POGristico: e trocar elevador por escada rolante movida a manivela para provar independencia tecnologica.

## Mini checklist de mitigacao

Antes de criar helper caseiro, responda: existe API nativa madura para isso? Se existir, o onus da prova e de quem quer reinventar. Em geral, software de negocio ganha mais quando reutiliza base estavel.

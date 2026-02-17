---
title: Monkey Patching
description: Monkey Patching
sentence: A principio isso nao tem nada a ver com o erro, mas pode ser que tenha....algo a ver
sentence_author: Programador POG, sobre o erro no programa que nao sabe da onde veio
order_number: 7001
date: 2020-06-14 00:00
name: tecnica-monkey-patching
parent: tecnicas
isParent: false
status: done
image: "/images/capitulos/default.jpg"

---
**Monkey Patching** e a tecnica de alterar comportamento de codigo existente em tempo de execucao, geralmente sem mudar a origem oficial do componente. Em linguagem POG: e colocar remendo direto no macaco e mandar ele continuar o show.

Em algumas linguagens dinamicas, isso e facil e ate util em cenarios controlados (testes, adaptacoes pontuais). Em ambiente desorganizado, vira detonador de efeito colateral.

## Como aparece em projeto real

- sobrescrever metodo de biblioteca para "corrigir bug"
- alterar prototipo/classe global para todas as chamadas
- injetar comportamento diferente dependendo de ambiente
- patch em runtime para evitar fork de dependencia

Sem fronteira clara, ninguem sabe mais qual e o comportamento original.

## Exemplo didatico (JavaScript)

```javascript
// biblioteca esperava toUpperCase normal
String.prototype.toUpperCase = function () {
  // "patch" com regra local de negocio
  return this.replace(/a/g, '@').toUpperCase();
};

console.log('casa'.toUpperCase());
// resultado inesperado para qualquer modulo que use string
```

Esse patch resolve "um problema" local e cria surpresa global.

## Exemplo didatico (Python)

```python
class Gateway:
    def cobrar(self, valor):
        return f"cobrando {valor}"

gateway = Gateway()

# monkey patch em runtime

def cobrar_fake(valor):
    return "cobranca desativada"

gateway.cobrar = cobrar_fake
```

Em teste, pode ser util para simular dependencias. Em producao, sem controle, vira fonte de bug dificil de rastrear.

## Quando a tecnica pode ser aceitavel

- ambiente de teste isolado
- workaround temporario com prazo e rastreio
- adaptacao de legado sem alternativa imediata

Mesmo nesses casos, o patch precisa ser explicito, limitado e reversivel.

## Sinais de abuso

- patches globais sem documentacao
- comportamento diferente entre ambientes sem motivo claro
- incidentes "fantasmas" que somem ao reiniciar processo
- dependencia de ordem de importacao/execucao

Quando o sistema so funciona com "sequencia certa de inicializacao", monkey patch virou arquitetura.

## Mitigacao pragmatica

1. preferir extensao oficial (wrapper, adapter, subclass) quando existir
2. isolar patch em modulo unico com nome explicito
3. registrar ticket e prazo para remocao
4. cobrir com teste que valide comportamento esperado
5. evitar alterar objetos globais compartilhados

Monkey patch sem governanca e tiro de escopeta em runtime.

## Resumo POG

Monkey Patching e poderosa, rapida e perigosa na mesma proporcao. Resolve dor imediata e pode contaminar comportamento do sistema inteiro.

No dialeto POGramador: e trocar peca de motor com o carro em movimento. Pode ate continuar andando, mas voce nunca mais confia no painel.

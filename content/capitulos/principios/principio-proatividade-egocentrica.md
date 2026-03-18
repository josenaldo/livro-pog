---
title: Proatividade Egocêntrica
description: A convicção inabalável de que seu jeito é o melhor jeito
sentence: Vamos fazer do meu jeito!
sentence_author: Dev pleno, ignorando a RFC da equipe
order_number: 5350
date: 2020-04-16 00:04
name: principio-proatividade-egocentrica
parent: principios
isParent: false
status: done
icon: "tabler/IconCrown"

---

A **Proatividade Egocêntrica** é o princípio que estabelece: quando há múltiplas formas de resolver um problema, a forma correta é a minha. Não importa se existe padrão, convenção, decisão de equipe ou arquitetura definida. A visão pessoal do POGramador prevalece.

Não confunda com confiança saudável. A Proatividade Egocêntrica é a confiança que ignora contexto, equipe e consequência. É o "meu jeito funciona" elevado a filosofia de vida.

## O mecanismo

1. **Problema aparece**: o time discute abordagem.
2. **Consenso se forma**: a equipe decide usar a abordagem X.
3. **Dev implementa**: usando a abordagem Y, que é "melhor".
4. **Justificativa**: "eu sei o que estou fazendo".
5. **Resultado**: duas abordagens diferentes no mesmo codebase, nenhuma documentada.

## Exemplo clássico: o framework caseiro

```javascript
// A equipe usa Express. O dev "sabe mais".
// arquivo: meu-framework.js

class MeuRouter {
  constructor() {
    this.rotas = {};
  }

  get(path, handler) {
    this.rotas[`GET:${path}`] = handler;
  }

  post(path, handler) {
    this.rotas[`POST:${path}`] = handler;
  }

  handle(req, res) {
    const chave = `${req.method}:${req.url}`;
    const handler = this.rotas[chave];
    if (handler) {
      handler(req, res);
    } else {
      res.statusCode = 404;
      res.end('Nao achei');
    }
  }
}

// "Express é pesado demais. O meu é mais simples."
// O "mais simples" nao tem: middleware, error handling,
// parsing de params, query string, static files...
```

O dev criou um mini-framework que faz 5% do que o Express faz e introduziu 100% da responsabilidade de manutenção.

## Caso real: estilos de código conflitantes

Em qualquer repositório com mais de 3 contribuidores, é possível encontrar estilos diferentes convivendo no mesmo projeto. A Proatividade Egocêntrica se manifesta como:

```python
# Arquivo A — dev que gosta de classes
class UserService:
    def __init__(self, repository):
        self.repository = repository

    def get_user(self, user_id):
        return self.repository.find(user_id)


# Arquivo B — dev que gosta de funcoes
def get_user(repository, user_id):
    return repository.find(user_id)


# Arquivo C — dev que gosta de decorators
@inject_repository
def get_user(user_id):
    return current_repository.find(user_id)


# Arquivo D — dev que descobriu dataclasses ontem
@dataclass
class GetUserQuery:
    user_id: int

    def execute(self, repository):
        return repository.find(self.user_id)
```

Quatro abordagens diferentes para a mesma operação. Cada dev fez "do seu jeito". Nenhum consultou o outro. O codebase virou uma exposição de estilos pessoais.

## Exemplo do mundo real: o over-engineering solitário

Um padrão comum em projetos open-source no GitHub é o "refactoring não-solicitado". Um contribuidor submete um PR que:

- muda o estilo de imports de todo o projeto
- substitui o linter configurado por outro "melhor"
- migra de CommonJS para ESM sem discussão prévia
- adiciona TypeScript a um projeto JavaScript puro

O PR tecnicamente "melhora" o código. Mas ninguém pediu. Ninguém concordou. E o mantenedor agora precisa gastar tempo revisando uma mudança que não estava no roadmap.

Em projetos como Node.js e React, as contributing guidelines existem especificamente para conter a Proatividade Egocêntrica. Regras como "discuta antes de implementar" e "abra uma issue antes do PR" são mecanismos de defesa contra devs que fazem primeiro e perguntam depois.

## A variante arquitetural

A forma mais perigosa da Proatividade Egocêntrica é a decisão arquitetural unilateral:

```
Reuniao de planning:
- Equipe decide usar REST para a API
- Um dev decide usar GraphQL "porque é melhor"
- Implementa metade dos endpoints em GraphQL
- A outra metade continua em REST
- Frontend precisa lidar com dois protocolos
- Ninguem sabe qual endpoint esta onde
```

O dev não agiu por maldade. Ele genuinamente acredita que GraphQL é superior. Mas a decisão unilateral criou um sistema híbrido que ninguém pediu e que custa mais para manter do que qualquer uma das abordagens isoladas.

## O ego no commit

Mensagens de commit que revelam Proatividade Egocêntrica:

```
refactor: reescrita completa do modulo de autenticacao
  - agora usa minha implementacao de JWT
  - removido passport.js (desnecessario)
  - adicionado sistema custom de sessions

nota: nao discuti com a equipe mas ficou melhor
```

A "reescrita completa" não solicitada é o pico do princípio. Remover uma biblioteca consolidada e substituir por implementação custom em módulo de autenticação é o tipo de decisão que gera CVEs.

## Por que a Proatividade sobrevive

- **Competência real**: às vezes o dev realmente sabe mais que o time sobre aquele assunto.
- **Autonomia excessiva**: times sem padrão definido deixam cada um fazer o que quiser.
- **Falta de code review efetivo**: se ninguém revisa com atenção, tudo passa.
- **Cultura hero-driven**: empresas que premiam "iniciativa individual" incentivam decisões unilaterais.

## Consequências

- codebase com múltiplas "personalidades"
- onboarding de novos devs mais lento e confuso
- conflitos de merge constantes
- decisões arquiteturais que ninguém assume
- ressentimento silencioso no time

## Relação com outros princípios

- **Onisciência Finita**: "meu jeito" geralmente é "o único jeito que eu conheço".
- **Criatividade Diversificativa**: "se alguém já fez assim, vou fazer diferente".
- **Imperativo Funcional**: "meu jeito funciona, então está certo".
- **Documentação Espartana**: o dev não documenta sua decisão porque "é óbvio".

## Veredicto

A Proatividade Egocêntrica é o princípio que transforma times em coleções de indivíduos. Cada um puxa para um lado, cada um acredita que seu jeito é superior, e o resultado é um sistema que reflete não uma arquitetura, mas uma colagem de egos.

O antídoto não é suprimir individualidade. É canalizá-la. Dev bom tem opinião forte. Dev bom *em equipe* tem opinião forte, defende, e aceita quando o grupo decide diferente. A maturidade não está em ceder sempre — está em saber quando a decisão coletiva importa mais que a preferência pessoal.

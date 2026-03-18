---
title: Enjambração Criativística
description: A arte de reutilizar código de forma criativa, ignorando completamente o propósito original
sentence: Use o código do sistema financeiro para criar o sistema de EAD.
sentence_author: Gerente de projeto, num momento de inspiração divina
order_number: 5050
date: 2020-04-16 00:04
name: principio-enjambracao-criativistica
parent: principios
isParent: false
status: done
icon: "tabler/IconPuzzle"

---

A **Enjambração Criativística** é o princípio que transforma qualquer código existente em matéria-prima para qualquer outro sistema. Não importa se o código original foi feito para calcular folha de pagamento: com criatividade suficiente, ele serve para gerenciar matriculas de um EAD.

O raciocínio é simples: se já existe código que "funciona", por que escrever do zero? A alma da Enjambração é o reaproveitamento radical, aquele onde o POGramador olha para um sistema de controle de estoque e pensa "isso aqui, com uns ajustes, vira um chat em tempo real".

## O mecanismo

A Enjambração Criativística opera em três fases:

1. **Identificação oportunista**: o POGramador encontra um código que resolve *algo*.
2. **Analogia forçada**: ele convence a si mesmo (e ao time) de que o problema atual e "parecido" com o que o código original resolvia.
3. **Adaptação cirurgica com marreta**: o código é modificado até parecer funcionar no novo contexto, com uma camada de `if/else` que faria um compilador chorar.

## Exemplo clássico

Imagine um sistema de boletos bancários. O módulo de geração de PDF funciona bem, tem testes, a equipe confia nele. Chega uma demanda: "precisamos gerar certificados de conclusão de curso".

O POGramador olha para o gerador de boletos e pensa: "boleto tem layout, certificado tem layout. É a mesma coisa."

```java
public class GeradorDeCertificado {

    // "Reaproveitando" o gerador de boletos
    private final GeradorDeBoleto geradorBase;

    public GeradorDeCertificado(GeradorDeBoleto geradorBase) {
        this.geradorBase = geradorBase;
    }

    public byte[] gerarCertificado(Aluno aluno, Curso curso) {
        Boleto boleto = new Boleto();
        // Campos do boleto reaproveitados criativamente
        boleto.setSacado(aluno.getNome());           // "sacado" = nome do aluno
        boleto.setCedente(curso.getNome());           // "cedente" = nome do curso
        boleto.setValor(0.00);                        // certificado e gratuito, ne?
        boleto.setVencimento(curso.getDataConclusao()); // "vencimento" = data de conclusao
        boleto.setInstrucoes("Certificamos que o aluno concluiu o curso com aproveitamento.");

        // Gera o PDF do "boleto" que na verdade e um certificado
        return geradorBase.gerarPDF(boleto);
    }
}
```

O certificado sai com código de barras embaixo? Sai. E isso é pra conferência do certificado no site da empresa! O layout fica estranho? Fica. Mas o importante é que "funciona". E quando chegar a demanda de gerar carteirinhas de estudante, o mesmo raciocínio se aplica: "carteirinha tem layout, certificado tem layout. É a mesma coisa."

E tudo funciona.

## Caso real: o FrankenCMS

Um padrão recorrente em repositórios open-source é a criação de sistemas de gerenciamento de conteúdo a partir de templates de e-commerce. O raciocínio é o mesmo: "produto tem título, descrição e imagem; artigo tem título, descrição e imagem; logo, artigo e produto".

Em projetos WordPress, é comum encontrar plugins que reaproveitam Custom Post Types de `product` para gerenciar coisas como "depoimentos", "portfolios" e "membros da equipe", carregando consigo campos como `price`, `sku` e `stock_quantity` que ficam zerados ou preenchidos com dados sem sentido.

No ecossistema JavaScript, há casos de projetos que usaram templates de loja virtual (com carrinho de compras e checkout) como base para sistemas de reserva de salas de reunião. O "carrinho" virou "lista de reservas" e o "pagamento" virou "confirmação". A lógica de cupom de desconto ficou lá, intocada, como um fóssil digital.

## Exemplo do mundo real: Sequelize migrations como seed

Em muitos projetos Node.js com Sequelize, é possível encontrar migrations sendo usadas como mecanismo de seed de dados. A migration foi feita para alterar estrutura de banco, mas como "já funciona pra rodar SQL", o POGramador usa o mesmo canal para inserir dados iniciais:

```javascript
// 20200416-create-users.js — migration arquivo, mas seed na pratica
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
    });

    // "Ja que estamos aqui, bora inserir os usuarios padrao"
    await queryInterface.bulkInsert('users', [
      { name: 'Admin', email: 'admin@empresa.com' },
      { name: 'Suporte', email: 'suporte@empresa.com' },
      { name: 'Robo de Testes', email: 'qa@empresa.com' },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
```

Quando alguém roda `sequelize db:migrate:undo` e depois `db:migrate` de novo, os dados somem e reaparecem de forma mágica. Faz parte do encanto.

## Por que a Enjambração sobrevive

- **Pressão de prazo**: criar algo do zero demora. Adaptar algo pronto parece rápido.
- **Ilusão de economia**: "já temos 80% pronto" (na verdade temos 80% de problemas).
- **Herança organizacional**: o sistema antigo é o único que o time conhece.
- **Medo do desconhecido**: melhor o diabo conhecido do que o framework novo.

## Consequências

- domínio original e domínio novo ficam acoplados eternamente
- bugs no sistema A causam bugs no sistema B sem motivo aparente
- novos devs precisam entender dois dominios para mexer em um
- a documentação (se existir) não faz sentido em nenhum dos dois contextos
- o nome das variáveis conta uma história que não tem nada a ver com o que o código faz

## Relação com outros princípios

A Enjambração Criativística combina naturalmente com:

- **Reflexão Reprodutória**: copiar e adaptar são primos de primeiro grau.
- **Onisciência Finita**: se o POGramador só conhece um sistema, todos os problemas viram variantes desse sistema.
- **Imperativo Funcional**: se o certificado-boleto gera PDF, então funciona. Ponto.

## Veredicto

A Enjambração é um dos princípios mais antigos da POG. Ela precede a própria computação: todo engenheiro que já usou um alicate como martelo conhece essa força. No software, o alicate tem mil linhas de código e o martelo precisava de vinte.

Mas lembre-se: quando tudo é prego, todo código vira martelo. E quando todo código vira martelo, a arquitetura vira uma oficina de funilaria.

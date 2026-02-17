---
title: Dimensão Temporal
description: Quando o tempo se resume a uma contagem para o apocalipse
sentence: Como não faz?! Tem que implementar, acabamos de vender o produto com isto.
sentence_author: Gerente de vendas de uma empresa qualquer
order_number: 4500
date: 2021-12-21 00:00
name: dimensao-temporal
parent: requisitos
isParent: false
status: backlog
image: "/images/capitulos/requisitos/dimensao-temporal.jpg"

---
Se a Dimensão Humana é o motor da desgracença e a Dimensão Tecnológica é a oficina da calamidade, a **Dimensão Temporal** é o relógio amaldiçoado que garante que tudo dê errado no pior instante possível.

Tempo, no mundo ideal, deveria ser usado para planejamento, execução consciente, validação e melhoria contínua. No ambiente POG, tempo é usado para um esporte corporativo muito mais nobre: **atropelar o bom senso em velocidade supersônica**.

Não importa quão competente seja a equipe. Se o contexto temporal for manipulado com crueldade suficiente, a POG brota com a força de uma samambaia mutante em adubo radioativo.

## O próprio tempo

Existe uma lei universal da POGramação:

> Toda tarefa cuja estimativa é minimamente razoável será imediatamente tratada como exagero pessimista por alguém que nunca implementou nada em produção.

A relação da empresa com o tempo costuma seguir três fases:

1. O cliente pede algo para "ontem".
2. O gerente negocia e promete para "anteontem".
3. A equipe recebe hoje de manhã com prioridade "máxima absoluta crítica urgente top".

Com isso, o tempo deixa de ser recurso de engenharia e vira instrumento de tortura processual.

Um prazo saudável permite pensar. E pensar reduz POG. Portanto, para a prosperidade do caos, pensar deve ser desencorajado por meio de:

- interrupções constantes
- replanejamento diário sem critério
- alteração de prioridade no meio da execução
- pressa travestida de "agilidade"

Quanto menor o tempo real de execução e maior o tempo gasto explicando por que não há tempo, maior a taxa de geração de gambiarras por sprint.

### Dilatação cronológica gerencial

Na física clássica, o tempo passa de forma uniforme. Na gestão de projetos POG, ele se deforma conforme o cargo de quem está falando.

- Para quem vendeu: "é simples"
- Para quem estima: "é complexo"
- Para quem aprova: "vamos alinhar"
- Para quem implementa: "já devia estar pronto"

Essa distorção produz um fenômeno raro: o **prazo quântico**. Ele existe e não existe ao mesmo tempo, até que alguém abra o Jira e descubra que venceu ontem.

### Progcrastinação reversa

Em equipes comuns, a procrastinação atrasa entrega. Em equipes POG, ela é invertida:

- adia-se entendimento
- adia-se validação
- adia-se teste
- adia-se documentação

Mas não se adia deploy.

O resultado é uma entrega no prazo, um incidente em produção e uma longa discussão sobre "lições aprendidas" que ninguém aplicará no próximo ciclo, porque o próximo ciclo já começou atrasado.

## Os quatro Fs

A Dimensão Temporal atinge seu ápice quando convergem os quatro grandes marcos do caos corporativo. São eles: **Fim do expediente, Férias, Feriado e Fim de semana**.

Quando um requisito nasce perto de qualquer um desses eventos, o risco POG sobe. Quando nasce perto dos quatro ao mesmo tempo, o capiroto abre champanhe.

### Fim do expediente

Nada gera mais criatividade gambiarrística do que uma demanda "rapidinha" às 17h42.

Nesse horário, o POGramador já está com o cérebro em modo de economia de energia, o ônibus mental já saiu da estação e o corpo inteiro exige apenas uma coisa: ir embora.

É exatamente nesse momento que surge a mensagem:

> "Consegue só ajustar isso em produção hoje? É pequeno."

Ajuste pequeno em fim de expediente costuma incluir, em ordem aleatória:

- alteração de regra central
- script manual no banco
- ajuste de configuração sem rollback
- deploy sem teste porque "não deu tempo"

Se der certo, ninguém lembra. Se der errado, a culpa é do deploy noturno. Se der muito errado, agenda-se uma retrospectiva para concluir que "precisamos melhorar comunicação".

### Férias

Férias são essenciais para saúde humana e profundamente perigosas para arquitetura negligenciada.

Quando o detentor do contexto entra de férias, o sistema revela sua verdadeira natureza:

- documentação inexistente
- automações parciais
- decisões críticas escondidas em mensagens antigas
- segredos operacionais guardados em memória RAM humana

A equipe descobre que o módulo X só funciona porque alguém "sempre fazia do jeito certo". Como esse alguém está na praia, o time improvisa. E improviso sob pressão é a incubadora oficial da POG.

Existe também o subfenômeno **férias canceladas por incidente**, conhecido como "home office de biquíni traumático".

### Feriado

Feriado não é pausa. É multiplicador de risco temporal.

Toda empresa POG respeita o seguinte ritual:

1. deixa para fechar algo importante na véspera
2. encontra um problema de última hora
3. aplica workaround heroico
4. descobre no retorno que o workaround virou regra de negócio

Durante o feriado, o sistema permanece no ar sustentado por fé, logs incompletos e uma equipe de plantão que não participou das decisões originais.

Quando chega terça-feira, abre-se o chamado clássico:

> "Após pequenas melhorias, fluxo principal apresenta comportamento inesperado."

Com tradução simultânea:

> "A gambiarra evoluiu sozinha no escuro."

### Fim de semana

Fim de semana é o habitat natural de migração não planejada, hotfix de emergência e manutenção "sem impacto" que impacta tudo.

A justificativa é sempre sedutora:

- "tem menos usuário"
- "se quebrar, dá tempo de arrumar"
- "segunda cedo já estará estável"

Na prática, o que acontece:

- mudanças entram sem revisão adequada
- dependências externas falham
- ninguém com contexto completo está disponível
- segunda-feira começa com guerra civil no Slack

O fim de semana também favorece o mito do herói solitário, aquela criatura que corrige tudo de madrugada e deixa um legado indecifrável para o resto da equipe interpretar na segunda às 9h03.

## Janela de caos combinada

Agora imagine o combo completo:

- sexta-feira
- fim do expediente
- véspera de feriado
- principal mantenedor saindo de férias

Se nesse exato instante alguém disser "é só um ajuste pequeno", saiba que você não está diante de uma tarefa. Você está diante de um portal dimensional.

A taxa de POG nesse cenário atinge patamares tão elevados que qualquer regra de qualidade vira item decorativo de processo.

## Como manter a POG sob controle (sem virar monge da engenharia)

Não precisamos fingir que o mundo real é perfeito. Sempre haverá pressão de prazo. A questão é reduzir dano.

Alguns antídotos pragmáticos para a Dimensão Temporal:

1. Proibir deploy de risco no fim do expediente sem plano de rollback.
2. Mapear módulos críticos antes de férias e distribuir contexto.
3. Tratar véspera de feriado como janela de congelamento para mudanças perigosas.
4. Usar checklists mínimos de release, mesmo em hotfix.
5. Registrar decisões rápidas em lugar acessível para o time.

Isso não elimina a POG, mas evita que ela escale para nível apocalíptico.

## Encerramento temporal

A Dimensão Temporal não cria bug sozinha. Ela cria o ambiente em que decisões ruins parecem razoáveis e atalhos arriscados parecem inevitáveis.

Tempo mal gerido é fertilizante da gambiarra: invisível no começo, onipresente no resultado.

E lembre-se da versão POGráfica da regra do escoteiro:

> "Sempre deixar o código um pouco pior do que ele estava quando começou a mexer." 

Se isso acontecer perto de qualquer um dos quatro Fs, parabéns. Você não apenas implementou uma POG. Você inaugurou uma era.

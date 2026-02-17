---
title: Dimensão Processual
description: Quando os processos são uma receita para o desastre
sentence: É so botar botar um @
sentence_author: Programador PHP sobre o erro que aconteceu sobre POG
order_number: 4400
date: 2021-12-21 00:00
name: dimensao-processual
parent: requisitos
isParent: false
status: progress
image: "/images/capitulos/requisitos/dimensao-processual.jpg"

---

O capitalismo (conhecido carinhosamente como Capetalismo) é uma beleza. Lá está a equipe engajada e preparada, com as melhores tecnologias do mercado, num escritório tão bem feito que dá vontade de adicionar o termo "home office" a alguma lista da antiga Inquisição... Mas o capetalismo precisa da POG e alguém tem que fazer alguma coisa.

É nesse momento que entra em cena a equipe de processos da empresa!

A **Dimensão Processual** engloba os requisitos que são satisfeitos e documentados através dos processos escolhidos pela empresa por puro sadismo organizacional.

Enquanto a Dimensão Humana dá o empurrão inicial e a Dimensão Tecnológica fornece as ferramentas da desgracença, é o processo que oficializa o caos com logo da empresa, ata de reunião e plano de ação em PowerPoint.

Em resumo: processo ruim não só permite POG, ele **industrializa** POG.

### Prazos suicidas

Em qualquer empresa humanamente decente, prazos são definidos de acordo com um conjunto de fatores que tenta minimizar ao máximo as incertezas:

- Estatísticas dos projetos anteriores
- Custos
- Estimativa da equipe sobre tempo e complexidade das tarefas
- Velocidade da equipe
- Técnicas de engenharia para cálculo de prazo

Mas nós sabemos que a diminuição das incertezas leva à diminuição do surgimento de POGs, certo?

Nesse contexto, devemos manter um certo nível de incerteza no ar. Contudo, ao se definir um prazo para as tarefas, devemos optar pelo prazo mais longo?

**JAMAIS!**

![Prazo suicida {caption: Diagrama meticulosamente criado para ilustrar o tamanho ideal do prazo}](/images/capitulos/requisitos/dimensao-processual/prazo-suicida.jpg)

Como podemos ver no diagrama acima, qualquer prazo que a equipe aceite será devidamente deserdiçado com progcrastinação (ou pior, estudando!), pânico e choro! Somente na pequena porção final do prazo é que a equipe vai se dedicar à entrega, trabalhando ferozmente e gerando POGs como se não houvesse amanhã.

Como saber exatamente quão curto deve ser o prazo? É simples:

1. Pergunte o prazo pra equipe
2. Divida esse prazo por dois.
3. Repita o passo 2 até observar a vida se esvaindo dos membros da equipe. Se ouvir dentes rangendo, gemidos de dor e perceber claramente a alma tentando sair do corpo, você está no caminho certo.

O Prazo Suicida é um requisito que deve ser levado em consideração em qualquer projeto POG. Afinal, se a equipe não estiver sob pressão, não vai entregar nada!

#### Exemplo didático: requisito simples, processo caótico

Demanda original:

> "Só precisamos adicionar um campo de telefone no cadastro."

Processo POG padrão:

1. Vendas promete para hoje.
2. Produto manda áudio no WhatsApp com "regra principal".
3. Cliente muda o formato no meio da implementação.
4. QA testa uma versão antiga da regra.
5. Produção recebe hotfix "temporário definitivo".

Resultado final: não existe mais "campo de telefone". Existe uma entidade ontológica chamada `ContatoComercialPrioritario`, com três máscaras, duas validações contraditórias e uma trigger triste no banco.

### Aparecimento caótico de requisitos

No mundo ideal, requisito nasce, é refinado, validado, implementado, testado e entregue.

No mundo POG, requisito aparece assim:

- em reunião sem ata
- em áudio com eco de ventilador
- em print de conversa sem contexto
- em "só mais esse ajuste" no fim da tarde

Esse fenômeno é conhecido como **Aparecimento Caótico de Requisitos**, onde a origem do requisito é sempre nebulosa e a responsabilidade é sempre coletiva (ou seja, de ninguém).

O efeito colateral mais poderoso desse cenário é a **mutação semântica**:

- "opcional" vira "obrigatório"
- "depois" vira "agora"
- "MVP" vira "produto completo"
- "ajuste visual" vira "reestruturação arquitetural"

Quando requisitos surgem sem trilha clara, o time passa mais tempo discutindo o que precisa ser feito do que fazendo. E quando finalmente faz, implementa metade da regra certa em cima da premissa errada, com ótima performance e total inutilidade.

### Upfront design (BDUF – geralmente associado ao modelo Waterfall/Cascata)

O **Big Design Up Front** não é ruim por natureza. O problema começa quando ele vira religião.

No modo POG, BDUF funciona assim:

1. três semanas desenhando diagramas
2. zero feedback de usuário real
3. premissas rígidas baseadas em "achismo premium"
4. implementação correndo atrás do documento, não do problema

Quando a realidade bate, o desenho já está velho. Em vez de adaptar o design, adapta-se o sistema na marretada para caber no desenho. Nasce então a clássica arquitetura de museu: bonita no PDF, sofrível em produção.

#### Exemplo didático: fluxograma perfeito, sistema inútil

Um fluxo de aprovação é desenhado com cinco estados impecáveis:

- `rascunho`
- `em_analise`
- `aprovado`
- `revisao`
- `publicado`

No primeiro mês, surge a necessidade de "aprovar com ressalva". Como não existe estado intermediário e ninguém quer mexer no modelo "fechado", inventa-se:

- `aprovado = true`
- `temRessalva = true`
- `ressalvaAprovada = false`

Parabéns: você transformou uma máquina de estados em uma roleta russa booleana.

### Desenvolvimento não iterativo

Desenvolvimento não iterativo é aquele onde se planeja tudo no início e só se descobre os problemas no final, quando já é tarde demais para qualquer dignidade.

Os sintomas são clássicos:

- entregas longas sem validação intermediária
- demonstração para usuário apenas no "grande dia"
- descobertas críticas já no fim do prazo
- correção por remendo em vez de aprendizado por ciclo

Sem iteração, não existe ajuste fino. Só existe correção traumática.

No contexto POG, isso é excelente, porque cada erro descoberto tarde custa mais e exige gambiarra mais criativa.

### Projeto de churrasco

Toda empresa tem aquele projeto que "começou pequeno". Era para ser uma landing page. Depois virou painel. Depois virou módulo financeiro. Depois virou integração com legado de 2003.

Isso é o **Projeto de Churrasco**:

- cada pessoa traz um ingrediente
- ninguém combina receita
- no final alguém pergunta onde está o carvão

No código, isso se manifesta em:

- nomenclatura inconsistente
- camadas misturadas
- regra de negócio no front, no back e no script de banco
- decisões importantes espalhadas em comentários de PR antigo

É um modelo extremamente eficiente para gerar a sensação de progresso com risco acumulado.

### Convivência com a Codinga

Na comunicação verbal: catinga + código = **codinga**.

Codinga é o estado em que a equipe se acostuma tanto com decisões ruins que passa a tratá-las como "o jeito que funciona aqui".

Frases típicas de ambiente codinga:

- "Não mexe nisso que quebra."
- "Sempre foi assim."
- "Depois a gente refatora."
- "Tá feio, mas funciona."

Convivência prolongada com codinga causa:

- baixa capacidade de reação
- perda de senso crítico técnico
- normalização da gambiarra como padrão arquitetural

Em estágio avançado, o time para de discutir qualidade e passa a discutir só sobrevivência operacional.

### Débito técnico

Débito técnico é o imposto da pressa. Ele pode ser estratégico, controlado e pago depois. Mas no ambiente POG ele é usado como cartão de crédito sem limite, sem fatura e sem vergonha.

- Débito técnico como medida de POG
  - Imprudente intencional: “Sabemos do problemas mas não vamos resolver!”
  - Imprudente não intencional: “Trabalhar com uma nova linguagem de programação”
  - Consciente intencional: “Temos um prazo X, precisamos entregar com esse problemas, depois corrigimos”
  - Consciente não intencional: “Agora que entregamos o projeto sabemos como deveríamos ter feito.”

- É inevitável, ela sempre vai existir
- Se não for pago, o débito tende a aumentar com o tempo
- É “subjetivo”

#### Exemplo didático: dívida pequena que vira financiamento habitacional

Semana 1:

- "Vamos só duplicar esse método para ganhar tempo."

Semana 3:

- cinco cópias divergentes do mesmo método
- duas regras conflitantes
- um bug em cada variante

Mês 3:

- qualquer ajuste exige cirurgia em múltiplos arquivos
- ninguém sabe qual versão é a correta
- prazo de correção dobra
- equipe culpa "complexidade do domínio"

Não era complexidade do domínio. Era dívida capitalizada.

### Processo Go Horse institucionalizado

Há empresas em que o Go Horse deixa de ser exceção e vira método oficial, com três pilares:

1. pressa como valor
2. ausência de critério de aceite
3. celebração do herói que apaga incêndio

Nesses ambientes, qualidade é tratada como obstáculo, teste vira luxo e documentação vira literatura de ficção.

No curto prazo parece funcionar. No médio prazo custa caro. No longo prazo só sobrevive quem domina a arte da gambiarra arqueológica.

## Como reduzir a Dimensão Processual sem matar a produtividade

Não precisa virar monastério da engenharia para reduzir POG processual. Alguns ajustes simples já derrubam bastante a taxa de caos:

1. Definir critério mínimo de entrada para requisito (origem, objetivo, regra e impacto).
2. Trabalhar com entregas curtas e validação frequente.
3. Impedir mudança de escopo sem registrar decisão.
4. Reservar capacidade explícita para pagar débito técnico.
5. Proibir promessa externa sem consulta de quem implementa.

Isso não elimina a gambiarra (nem deve, por questões culturais da obra), mas evita que o projeto vire uma seita de sofrimento automatizado.

## Encerramento processual

Processo ruim é aquele que transforma problema simples em ritual corporativo de dor.

Quando a Dimensão Processual está plenamente atendida, a empresa alcança o estado da arte da POGramação: tudo tem rito, tudo tem dono no organograma, e nada funciona direito sem intervenção emergencial.

Se você identificou metade desses sinais no seu ambiente, parabéns: você não trabalha em uma empresa. Você trabalha em uma fábrica de POG com certificação ISO do capeta.

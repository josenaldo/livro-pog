---
title: Zipomatic versioning
description: Cada zip, uma versão
sentence: Na minha máquina funcionou
sentence_author: POGramador sobre POG
order_number: 7000
date: 2020-04-16 00:06
name: tecnica-zipomatic-versioning
parent: tecnicas
isParent: false
status: backlog
image: "/images/capitulos/default.jpg"

---
O **Zipomatic Versioning** e a arte de fazer controle de versao sem ferramenta de versao. Cada entrega gera um arquivo comprimido com nome criativo, normalmente algo entre `Projeto_FINAL.zip` e `Projeto_FINAL_AGORA_VAI_2.zip`.

## Como funciona o ritual

1. copia a pasta atual do projeto
2. compacta em zip
3. coloca data no nome
4. joga na pasta compartilhada da equipe
5. torce para ninguem sobrescrever nada

Parece simples. E de fato e. O problema e quando duas pessoas alteram o mesmo arquivo no mesmo dia e ninguem sabe qual zip representa o estado correto.

## Exemplo do mundo real

```
Projeto_2020-10-01.zip
Projeto_2020-10-01_CORRIGIDO.zip
Projeto_2020-10-01_CORRIGIDO_FINAL.zip
Projeto_2020-10-01_CORRIGIDO_FINAL_MESMO.zip
```

Esse historico nao permite diferenca clara entre versoes. So mostra que alguem sofreu.

## Sinais de que o Zipomatic dominou

- equipe trocando codigo por e-mail ou pendrive
- pasta de rede com dezenas de zips sem dono claro
- merge manual na base do copiar/colar
- rollback feito por tentativa e erro

Quando o processo de release depende de memoria humana, o desastre ja e questao de agenda.

## Por que a tecnica surge

- ambiente sem cultura de versionamento
- receio de aprender ferramenta nova
- legado antigo mantido por poucas pessoas
- falsa sensacao de seguranca: "zip e backup"

Backup e versionamento nao sao a mesma coisa. Backup protege contra perda fisica. Versionamento protege contra perda de contexto.

## Exemplo didatico de diferenca

### Zipomatic

- Joana altera `PagamentoService.java`
- Carlos altera `PagamentoService.java`
- ambos geram zip
- alguem extrai o zip "mais novo" e perde metade das mudancas

### Versionamento real

- cada alteracao vira commit
- conflitos aparecem explicitamente
- historico mostra quem mudou, quando e por que
- e possivel voltar exatamente para ponto estavel

## Impacto tecnico e humano

- retrabalho constante
- bugs regressivos por sobrescrita
- auditoria impossivel
- onboarding doloroso (o novato precisa "adivinhar" fluxo)

Zipomatic parece economizar tempo no inicio, mas consome energia brutal em manutencao.

## Como sair sem trauma

1. adotar repositorio central para o projeto atual
2. manter zips apenas como backup historico temporario
3. criar fluxo minimo: branch, commit com mensagem, merge revisado
4. treinar equipe no essencial (nao precisa virar especialista de imediato)

Migracao gradual funciona melhor que guerra santa de ferramenta.

## Resumo POG

Zipomatic Versioning e romantico, artesanal e perigosamente opaco. Bom para gerar nostalgia, ruim para manter sistema vivo com previsibilidade.

No dialeto POGramador: cada zip e uma capsula do tempo. O problema e que nunca sabemos qual capsula contem o codigo que ainda funciona.

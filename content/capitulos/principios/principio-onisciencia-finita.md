---
title: Onisciência Finita
description: A convicção de que o que você já sabe é suficiente para qualquer desafio
sentence: Não precisa fazer curso. Usa o que você já sabe.
sentence_author: Dev que aprendeu PHP em 2008 e nunca mais estudou
order_number: 5250
date: 2020-04-16 00:04
name: principio-onisciencia-finita
parent: principios
isParent: false
status: done
icon: "tabler/IconBrain"

---

A **Onisciência Finita** é o princípio segundo o qual o conhecimento que o POGramador já possui é suficiente para resolver qualquer problema presente, passado e futuro. Não é preciso estudar, não é preciso ler documentação, não é preciso aprender ferramenta nova. O que se sabe já basta.

O termo "Onisciência" é ironicamente preciso: o POGramador se sente todo-poderoso com um conjunto finito (e frequentemente desatualizado) de conhecimento.

## O mecanismo

1. **Zona de conforto**: o dev domina uma tecnologia, linguagem ou padrão.
2. **Generalizacao**: aplica esse conhecimento a *todos* os problemas, independente do contexto.
3. **Rejeicao do novo**: quando confrontado com solução melhor, reage com "pra que, se o meu jeito funciona?".
4. **Estagnação**: o mundo evolui, o dev fica parado, é a distância entre o que ele sabe é o que ele precisa saber só cresce.

## Exemplo clássico: tudo é jQuery

```html
<!-- Projeto iniciado em 2024 -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
$(document).ready(function() {
    // Buscar dados da API e renderizar na tela
    $.ajax({
        url: '/api/produtos',
        method: 'GET',
        success: function(data) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<div class="produto">';
                html += '<h3>' + data[i].nome + '</h3>';
                html += '<p>R$ ' + data[i].preco + '</p>';
                html += '</div>';
            }
            $('#lista-produtos').html(html);
        },
        error: function() {
            $('#lista-produtos').html('<p>Deu ruim.</p>');
        }
    });

    // SPA routing via jQuery
    $(window).on('hashchange', function() {
        var pagina = window.location.hash.substring(1);
        $.get('/pages/' + pagina + '.html', function(conteudo) {
            $('#conteudo').html(conteudo);
        });
    });
});
</script>
```

jQuery é uma biblioteca excelente para o que foi projetada. Mas construir uma SPA inteira com manipulação manual de DOM, string concatenation de HTML e routing via hashchange em 2024 é sinal de Onisciência Finita em estado avançado.

O dev sabe jQuery. jQuery resolve o problema (de um jeito). Então por que aprender React, Vue ou até vanilla JS moderno?

## Caso real: o martelo de ouro

No livro "The Law of the Instrument", Abraham Kaplan escreveu: "give a small boy a hammer, and he will find that everything he encounters needs pounding". Em software, isso se manifesta assim:

- dev que sabe SQL resolve tudo com stored procedures
- dev que sabe bash resolve tudo com shell script
- dev que sabe Excel resolve tudo com planilha
- dev que sabe Java resolve tudo com classes abstratas

Um caso famoso é o uso de stored procedures como camada de aplicação inteira. Em muitos sistemas bancários e governamentais, a lógica de negócio vive em PL/SQL, com procedures de milhares de linhas que fazem validação, cálculo, formatação, envio de email e geração de relatório. Tudo dentro do banco.

```sql
-- Procedure "faz tudo" encontrada em sistema legado real
CREATE OR REPLACE PROCEDURE PRC_PROCESSAR_FOLHA(
    p_mes IN NUMBER,
    p_ano IN NUMBER,
    p_empresa IN NUMBER
) AS
    -- 47 variaveis declaradas aqui
    v_total NUMBER := 0;
    v_html  CLOB;
    v_email VARCHAR2(200);
BEGIN
    -- 800 linhas de logica de negocio
    -- incluindo:
    --   calculo de impostos
    --   geracao de HTML do holerite
    --   envio de email via UTL_SMTP
    --   log em tabela auxiliar
    --   atualizacao de 12 tabelas
    --   commit a cada 100 registros "pra nao travar"
    NULL; -- resumido por piedade
END;
```

O DBA que escreveu essa procedure provavelmente era muito competente — em PL/SQL. Ele não precisou de framework web, não precisou de servidor de email, não precisou de template engine. Ele sabia PL/SQL e PL/SQL resolveu. De um jeito.

## Exemplo do GitHub: configuração manual vs. ferramenta

Em repositórios open-source, é possível encontrar scripts de deploy escritos em bash puro que reimplementam funcionalidades de ferramentas como Docker, Ansible ou Terraform:

```bash
#!/bin/bash
# deploy.sh — escrito por alguem que conhece bash e nada mais

# "Docker é complicado demais"
ssh producao "cd /var/www/app && git pull origin main"
ssh producao "pip install -r requirements.txt"
ssh producao "python manage.py migrate --no-input"
ssh producao "sudo systemctl restart gunicorn"

# Rollback? Sei nao. Da um git revert la.
echo "Deploy concluido. Provavelmente."
```

O script funciona? Funciona. Mas não tem: rollback, zero-downtime, health check, versionamento de artefato, reproducibilidade, isolamento de ambiente. Tudo que Docker + CI/CD resolve de forma padronizada.

Mas o dev não sabe Docker. E, pela Onisciência Finita, ele não precisa saber.

## A armadilha do "sempre funcionou"

A frase mais perigosa do princípio:

> "Eu faço assim há 10 anos é sempre funcionou."

O que essa frase realmente diz e: "eu não evolui em 10 anos é o contexto ao meu redor mudou sem que eu percebesse."

Sempre funcionou — até a escala mudar. Até a equipe crescer. Até o requisito de segurança apertar. Até o cliente exigir performance. Então o que "sempre funcionou" passa a ser o gargalo, e ninguém sabe como substituir porque só uma pessoa entende aquele jeito.

## Por que a Onisciência sobrevive

- **Eficiência de curto prazo**: usar o que se sabe é mais rápido do que aprender algo novo.
- **Custo de aprendizado**: tecnologias novas exigem tempo, que o prazo não oferece.
- **Síndrome do impostor invertida**: o dev acredita genuinamente que domina tudo que precisa.
- **Reforco organizacional**: empresas que não investem em capacitação perpetuam a estagnação.

## Consequências

- stack tecnológico fossilizado
- soluções cada vez mais tortas para problemas cada vez mais simples
- resistência à modernização e refatoração
- dependência crítica de um único indivíduo ("só o Fulano sabe fazer isso")
- novos membros do time precisam aprender o "jeito da casa" em vez de usar padrões da industria

## Relação com outros princípios

- **Enjambração Criativística**: se o dev só sabe uma coisa, todo problema vira aquela coisa.
- **Reflexão Reprodutória**: quando o conhecimento próprio não basta, copia de alguém.
- **Proatividade Egocêntrica**: "meu jeito" é o único jeito porque é o único que se conhece.
- **Criatividade Diversificativa**: paradoxalmente, a ignorância do padrão leva a reinventar a roda.

## Veredicto

A Onisciência Finita é confortável. É eficiente no curto prazo. É absolutamente letal no longo prazo. O POGramador que não aprende coisas novas não está sendo produtivo — está acumulando juros que outro dev vai pagar.

A verdade é cruel mas simples: se suas ferramentas favoritas são as mesmas de cinco anos atrás, você não é estável. Você está estagnado. E a diferença entre os dois é só uma questão de quando o contexto muda.

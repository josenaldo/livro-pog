---
title: Geração de Imagens de Conteúdo
trigger:
  - "gerar imagem de post"
  - "criar imagem de capa de blog"
  - "criar imagem de capa de página"
  - "criar imagem de conteúdo"
description: "Gera imagens de capa para posts, páginas e outros conteúdos do site a partir do conteúdo em Markdown, seguindo o padrão visual do projeto. Salva a imagem na pasta apropriada (ex: public/images/blog/)."
workflow:
  overview: |
    Esta skill automatiza a criação de imagens de capa para conteúdos do site (posts de blog, páginas, cursos, etc). A imagem é gerada a partir do conteúdo (título, resumo, categoria, etc), respeitando o padrão visual do site (cores, tipografia, proporção, branding).

    O arquivo gerado é salvo na pasta correta (ex: public/images/blog/slug.png) e o frontmatter do conteúdo pode ser atualizado para referenciar a nova imagem.

    Exemplos de uso:
    - "Gerar imagem de capa para o post 'Como aprender Python'"
    - "Criar imagem de capa para a página Sobre"
    - "Gerar imagem para o curso 'Design Patterns em Python'"

  steps:
    - Identificar o tipo de conteúdo (blog, página, curso, etc) e o slug.
    - Extrair título, resumo e categoria do conteúdo.
    - Gerar uma imagem (1200x630px, PNG) com base nesses dados, usando o padrão visual do site (ver exemplos em public/images/).
    - Salvar a imagem em public/images/{tipo}/{slug}.png.
    - (Opcional) Atualizar o frontmatter do conteúdo para referenciar a nova imagem.
    - Exibir o caminho da imagem gerada e instruções para revisão manual, se necessário.

  tips:
    - Use sempre as cores e fontes do site (ver src/styles/theme.js).
    - O layout deve ser limpo, legível e responsivo para redes sociais.
    - Inclua o título do conteúdo e, se possível, um elemento visual relacionado ao tema.
    - Para posts em inglês e português, adapte o texto conforme o idioma.
    - Veja exemplos em public/images/blog/ para manter consistência visual.
    - Se o conteúdo já tem imagem, pergunte antes de sobrescrever.

  pitfalls:
    - Não gere imagens genéricas sem contexto do conteúdo.
    - Não salve imagens fora da pasta public/images/{tipo}/.
    - Não altere o frontmatter sem confirmação do usuário.
    - Evite usar imagens com baixa resolução ou proporção errada.

  references:
    - src/styles/theme.js (cores, fontes)
    - public/images/blog/ (exemplos de imagens)
    - content/blog/, content/pages/, content/courses/ (conteúdos)
    - site-seo-and-sitemap (para padrões de SEO e imagens)
    - https://vercel.com/docs/ai/skills/creating-skills
    - https://og-playground.vercel.app/
    - https://vercel.com/docs/og-image
---

# Skill: Geração de Imagens de Conteúdo

Automatiza a criação de imagens de capa para posts, páginas e outros conteúdos do site, garantindo consistência visual e SEO. Gera imagens a partir do conteúdo e salva na pasta correta, pronta para uso em Open Graph, SEO e redes sociais.

## Exemplos de uso

- Gerar imagem de capa para o post "Como aprender Python"
- Criar imagem de capa para a página Sobre
- Gerar imagem para o curso "Design Patterns em Python"

## Fluxo resumido

1. Identifica tipo e slug do conteúdo
2. Extrai título/resumo/categoria
3. Gera imagem (1200x630px, PNG) com padrão visual do site
4. Salva em public/images/{tipo}/{slug}.png
5. (Opcional) Atualiza frontmatter
6. Exibe caminho e instruções para revisão

## Dicas

- Use sempre as cores/fontes do site
- Layout limpo, legível, responsivo
- Inclua título e elemento visual relacionado
- Adapte idioma conforme conteúdo
- Veja exemplos em public/images/blog/

## Cuidados

- Não gere imagens sem contexto
- Não salve fora de public/images/{tipo}/
- Não altere frontmatter sem confirmação
- Evite baixa resolução ou proporção errada

## Referências

- src/styles/theme.js
- public/images/blog/
- content/blog/, content/pages/, content/courses/
- site-seo-and-sitemap
- <https://vercel.com/docs/ai/skills/creating-skills>
- <https://og-playground.vercel.app/>
- <https://vercel.com/docs/og-image>

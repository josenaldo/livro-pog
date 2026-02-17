# Customização da Geração de eBooks

Este documento detalha as opções de customização para a geração de PDF e EPUB.

## Melhorias Possíveis

### 1. **Formatação do PDF**

#### Opções de Layout

```bash
# Margens personalizadas
-V geometry:margin=1.5in
-V geometry:top=2cm,bottom=2cm,left=3cm,right=3cm

# Tamanho da página
-V papersize=a4
-V papersize=letter

# Fonte
-V mainfont="Arial"
-V monofont="Courier New"
-V fontsize=12pt
```

#### Opções de Estilo

```bash
# Tipo de documento
-V documentclass=book     # (atual)
-V documentclass=report   # alternativa
-V documentclass=article  # mais simples

# Numeração de capítulos
-V numbersections
-V secnumdepth=2

# Header/Footer personalizados
-V header-includes='\usepackage{fancyhdr}'
```

#### Capa Personalizada

```bash
# Adicionar capa
--epub-cover-image=public/images/capa.jpg

# Adicionar metadados
--metadata title="Programação Orientada a Gambiarra"
--metadata author="Josenaldo Matos Filho"
--metadata subject="Humor técnico"
--metadata keywords="programação,gambiarra,humor"
```

### 2. **Formatação do EPUB**

```bash
# Folha de estilo customizada
--css=styles/ebook.css

# Metadados adicionais
--epub-metadata=metadata.xml

# Fontes embarcadas
--epub-embed-font=fonts/*.ttf
```

### 3. **Imagens**

Atualmente apenas uma imagem é incluída. Para incluir todas:

**Opção 1: Copiar imagens para o Docker**

```bash
docker run --rm \
    -v "$(pwd)/public:/workspace" \
    livro-pog-ebook-builder \
    pandoc ...
```

**Opção 2: Remover imagens do markdown**
Adicionar ao `generate-ebook.js`:

```javascript
function removeImages(content) {
  return content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
}
```

### 4. **Índice (TOC)**

```bash
# Profundidade do índice
--toc-depth=3  # até h3
--toc-depth=2  # até h2 (atual)
--toc-depth=1  # só h1

# Título do índice
-V toc-title="Índice"
```

### 5. **Tipografia Avançada (XeLaTeX)**

```bash
# Suporte a caracteres especiais
-V mainfont="DejaVu Serif"
-V sansfont="DejaVu Sans"
-V monofont="DejaVu Sans Mono"

# Espaçamento
-V linestretch=1.5  # espaçamento entre linhas
-V indent            # indentar parágrafos
```

### 6. **Quebras de Página**

Atualmente usa `\newpage` entre capítulos. Opções:

```javascript
// Sempre começar capítulo em página ímpar
combinedContent += '\\cleardoublepage\n\n';

// Adicionar quebra antes de seções
combinedContent += '\\pagebreak\n\n';
```

### 7. **Metadados Avançados**

Criar arquivo `metadata.yaml`:

```yaml
---
title: Programação Orientada a Gambiarra
subtitle: Um Guia Completo
author: Josenaldo Matos Filho
date: 2024
lang: pt-BR
rights: © 2024 Josenaldo Matos Filho. CC BY-NC-SA 4.0
publisher: Auto-publicado
description: |
  Um livro satírico sobre as gambiarras no desenvolvimento de software.
---
```

Usar no Pandoc:

```bash
pandoc metadata.yaml livro-pog-combined.md -o livro.pdf ...
```

### 8. **Templates Customizados**

Criar template LaTeX customizado:

```bash
pandoc -D latex > template.tex
# Editar template.tex
pandoc --template=template.tex ...
```

---

## Exemplos de Customizações Comuns

### PDF Bonito (margens maiores, fonte maior)

```bash
pandoc combined.md -o livro.pdf \
  --pdf-engine=xelatex \
  --toc --toc-depth=2 \
  -V geometry:margin=1.5in \
  -V fontsize=12pt \
  -V linestretch=1.3 \
  -V mainfont="DejaVu Serif" \
  -V documentclass=book \
  -V lang=pt-BR
```

### EPUB com CSS customizado

```bash
pandoc combined.md -o livro.epub \
  --toc --toc-depth=2 \
  --css=styles/custom.css \
  --epub-cover-image=capa.jpg \
  --metadata title="..." \
  --metadata author="..."
```

### PDF sem imagens

Modificar `generate-ebook.js`:

```javascript
function fixImagePaths(content) {
  // Remover todas as imagens
  return content.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
}
```

---

## Aplicar Customizações

1. **Editar scripts:**
   - `scripts/generate-ebook.js` - lógica de combinação
   - `scripts/docker-generate.sh` - comandos Pandoc
   - `.github/workflows/generate-ebook.yml` - CI/CD

2. **Testar localmente:**

   ```bash
   yarn ebook:docker:all
   ```

3. **Commitar mudanças**

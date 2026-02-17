# Instalação Local para Desenvolvimento

Para gerar os arquivos PDF e EPUB localmente, você tem duas opções:

## Opção 1: Docker (Recomendado)

Não requer instalação de dependências pesadas no sistema.

### Pré-requisito
- Docker instalado

### Comandos

```bash
# 1. Construir a imagem Docker (uma vez apenas)
yarn ebook:docker:build

# 2. Gerar PDF
yarn ebook:docker:pdf

# 3. Gerar EPUB
yarn ebook:docker:epub

# 4. Gerar tudo (Markdown + PDF + EPUB)
yarn ebook:docker:all
```

---

## Opção 2: Instalação Local

### Ubuntu/Debian/Pop!_OS

```bash
sudo apt-get update
sudo apt-get install -y pandoc texlive-xetex texlive-fonts-recommended texlive-plain-generic texlive-lang-portuguese
```

### Arch/Manjaro

```bash
sudo pacman -S pandoc texlive-core texlive-fontsextra texlive-langportuguese
```

### macOS

```bash
# Via Homebrew
brew install pandoc
brew install --cask mactex-no-gui
```

### Windows

Baixe e instale os instaladores:
- [Pandoc](https://pandoc.org/installing.html)
- [MiKTeX](https://miktex.org/download)

### Comandos (após instalação)

```bash
# 1. Gerar apenas o Markdown combinado (rápido, sem dependências)
yarn ebook:markdown

# 2. Gerar PDF
yarn ebook:pdf

# 3. Gerar EPUB
yarn ebook:epub

# 4. Gerar tudo
yarn ebook:all
```

---

## Workflow de Desenvolvimento

1. **Edite os capítulos** em `content/capitulos/`
2. **Gere os eBooks**:
   ```bash
   yarn ebook:docker:all   # com Docker
   # ou
   yarn ebook:all          # com instalação local
   ```
3. **Revise** os arquivos em `public/downloads/`

---

## Arquivos Gerados

- `livro-pog-combined.md` - Markdown combinado (ignorado pelo git)
- `livro-pog.pdf` - Versão PDF do livro
- `livro-pog.epub` - Versão EPUB do livro

---

## Verificar Instalação

```bash
# Docker
docker --version

# Pandoc
pandoc --version

# LaTeX
xelatex --version
```

---

## Notas

- **Docker**: ~500MB de imagem, isolado do sistema
- **Instalação local**: LaTeX ocupa ~1-2GB, mas é mais rápido
- O script automaticamente converte caminhos de imagens (`/images/` → `./images/`)
- Apenas capítulos com `status: done` são incluídos
- Ordenação usa o campo `order_number` do frontmatter

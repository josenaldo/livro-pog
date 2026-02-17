# Geração de eBook (PDF & EPUB)

Este diretório contém o script para gerar versões PDF e EPUB do livro a partir dos capítulos em Markdown.

## Como funciona

1. **Script Node.js** (`generate-ebook.js`):
   - Lê todos os `.md` de `content/capitulos/`
   - Filtra apenas capítulos com `status: done`
   - Ordena pelo campo `order_number`
   - Gera um arquivo Markdown combinado em `public/downloads/livro-pog-combined.md`

2. **GitHub Action** (`.github/workflows/generate-ebook.yml`):
   - Roda automaticamente quando há mudanças em `content/capitulos/**`
   - Instala Pandoc e LaTeX
   - Gera PDF e EPUB usando Pandoc
   - Commita os arquivos finais em `public/downloads/`

3. **Arquivos gerados**:
   - `public/downloads/livro-pog.pdf` - Versão PDF do livro
   - `public/downloads/livro-pog.epub` - Versão EPUB do livro
   - `public/downloads/livro-pog-combined.md` - Markdown combinado (temporário, ignorado pelo git)

## Executar localmente

```bash
# Gerar apenas o Markdown combinado
node scripts/generate-ebook.js

# Gerar PDF (requer Pandoc e LaTeX instalados)
pandoc public/downloads/livro-pog-combined.md \
  -o public/downloads/livro-pog.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=2 \
  -V geometry:margin=1in \
  -V documentclass=book \
  -V lang=pt-BR \
  --metadata title="Programação Orientada a Gambiarra" \
  --metadata author="Josenaldo Matos Filho"

# Gerar EPUB (requer Pandoc)
pandoc public/downloads/livro-pog-combined.md \
  -o public/downloads/livro-pog.epub \
  --toc \
  --toc-depth=2 \
  --metadata title="Programação Orientada a Gambiarra" \
  --metadata author="Josenaldo Matos Filho" \
  --metadata lang=pt-BR
```

## Instalar Pandoc e LaTeX

### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install -y pandoc texlive-xetex texlive-fonts-recommended texlive-plain-generic
```

### macOS
```bash
brew install pandoc
brew install --cask mactex-no-gui
```

### Windows
Baixar instaladores:
- [Pandoc](https://pandoc.org/installing.html)
- [MiKTeX](https://miktex.org/download)

## Personalização

Para customizar a geração, edite:
- **Metadados**: `scripts/generate-ebook.js` (linhas 46-50)
- **Formatação PDF**: `.github/workflows/generate-ebook.yml` (opções do Pandoc)
- **Capa EPUB**: Altere `--epub-cover-image` no workflow

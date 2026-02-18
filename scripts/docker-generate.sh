#!/bin/bash
set -e

FORMAT=$1
IMAGE_NAME="livro-pog-ebook-builder"

if [ -z "$FORMAT" ]; then
    echo "Usage: $0 [pdf|epub|all]"
    exit 1
fi

# Check if image exists
if ! docker image inspect $IMAGE_NAME >/dev/null 2>&1; then
    echo "Docker image not found. Building..."
    ./scripts/docker-build.sh
fi

# Generate combined markdown first
echo "Generating combined markdown..."
node scripts/generate-ebook.js

# Generate PDF
if [ "$FORMAT" == "pdf" ] || [ "$FORMAT" == "all" ]; then
    echo "Generating PDF..."
    docker run --rm \
        -v "$(pwd)/public:/workspace" \
        -v "$(pwd)/templates:/templates" \
        -w /workspace/downloads \
        -e LANG=pt_BR.UTF-8 \
        $IMAGE_NAME \
        pandoc livro-pog-combined.md \
        -o livro-pog.pdf \
        --template=/templates/ebook.latex \
        --pdf-engine=xelatex \
        --toc \
        --toc-depth=3 \
        -V toc-title="Sumário" \
        --top-level-division=chapter \
        --number-sections \
        -V geometry:top=2.5cm,bottom=2.5cm,left=3cm,right=2.5cm \
        -V linestretch=1.3 \
        -V documentclass=book \
        -V lang=pt-BR \
        -V mainfont="EB Garamond" \
        -V sansfont="Liberation Sans" \
        -V monofont="DejaVu Sans Mono" \
        --metadata title="Programação Orientada a Gambiarra" \
        --metadata subtitle="Um guia (não tão) prático de como programar com humor" \
        --metadata author="Josenaldo Matos Filho" \
        --metadata subject="Humor e Técnicas de Programação" \
        --metadata keywords="programação, gambiarra, humor, padrões de design, engenharia de software" \
        --metadata publisher="Auto-publicado" \
        --metadata rights="© 2026 Josenaldo Matos Filho. Licença CC BY-NC-SA 4.0" \
        --metadata date="2026" \
        -V cover-image=../images/cover/capa.png
    echo "✓ PDF generated: public/downloads/livro-pog.pdf"
fi

# Generate EPUB
if [ "$FORMAT" == "epub" ] || [ "$FORMAT" == "all" ]; then
    echo "Generating EPUB..."
    docker run --rm \
        -v "$(pwd)/public:/workspace" \
        -w /workspace/downloads \
        -e LANG=pt_BR.UTF-8 \
        $IMAGE_NAME \
        pandoc livro-pog-combined.md \
        -o livro-pog.epub \
        --toc \
        --toc-depth=3 \
        --top-level-division=chapter \
        --number-sections \
        --epub-cover-image=../images/cover/capa.png \
        --css=../styles/ebook.css \
        --metadata title="Programação Orientada a Gambiarra" \
        --metadata author="Josenaldo Matos Filho" \
        --metadata lang=pt-BR \
        --metadata subject="Humor e Técnicas de Programação" \
        --metadata keywords="programação, gambiarra, humor, padrões de design, engenharia de software" \
        --metadata publisher="Auto-publicado" \
        --metadata rights="© 2026 Josenaldo Matos Filho. Licença CC BY-NC-SA 4.0" \
        --metadata creator="Josenaldo Matos Filho"
    echo "✓ EPUB generated: public/downloads/livro-pog.epub"
fi

echo ""
echo "✓ eBook generation complete!"

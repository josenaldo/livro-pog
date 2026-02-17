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
        -w /workspace/downloads \
        -e LANG=pt_BR.UTF-8 \
        $IMAGE_NAME \
        pandoc livro-pog-combined.md \
        -o livro-pog.pdf \
        --pdf-engine=xelatex \
        --toc \
        --toc-depth=2 \
        --number-sections \
        -V geometry:top=2.5cm,bottom=2.5cm,left=3cm,right=2.5cm \
        -V linestretch=1.3 \
        -V documentclass=book \
        -V lang=pt-BR \
        -V mainfont="DejaVu Serif" \
        -V sansfont="DejaVu Sans" \
        -V monofont="DejaVu Sans Mono" \
        --metadata title="Programação Orientada a Gambiarra" \
        --metadata author="Josenaldo Matos Filho"
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
        --toc-depth=2 \
        --number-sections \
        --epub-cover-image=../images/cover/capa.jpg \
        --epub-embed-font=../styles/ebook.css \
        --css=../styles/ebook.css \
        --metadata title="Programação Orientada a Gambiarra" \
        --metadata author="Josenaldo Matos Filho" \
        --metadata lang=pt-BR
    echo "✓ EPUB generated: public/downloads/livro-pog.epub"
fi

echo ""
echo "✓ eBook generation complete!"

#!/bin/bash
set -e

FORMAT=$1
IMAGE_NAME="livro-pog-ebook-builder"

KEEP_TEX=${KEEP_TEX:-0}
PANDOC_LOG=${PANDOC_LOG:-0}
CLEAN_DOWNLOADS=${CLEAN_DOWNLOADS:-1}

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

    PDF_EXTRA_ARGS=()
    if [ "$PANDOC_LOG" == "1" ]; then
        PDF_EXTRA_ARGS+=(--log=livro-pog-pandoc-pdf.log)
    fi

    if [ "$KEEP_TEX" == "1" ]; then
        docker run --rm \
            -v "$(pwd)/public:/workspace" \
            -v "$(pwd)/templates:/templates" \
            -v "$(pwd)/scripts/pandoc:/pandoc-defaults:ro" \
            -w /workspace/downloads \
            -e LANG=pt_BR.UTF-8 \
            $IMAGE_NAME \
            bash -lc 'set -e; pandoc --defaults=/pandoc-defaults/docker-ebook-pdf.yaml -t latex -o livro-pog.tex '"${PDF_EXTRA_ARGS[*]}"' && xelatex -file-line-error -interaction=nonstopmode -halt-on-error livro-pog.tex && xelatex -file-line-error -interaction=nonstopmode -halt-on-error livro-pog.tex'
    else
        docker run --rm \
            -v "$(pwd)/public:/workspace" \
            -v "$(pwd)/templates:/templates" \
            -v "$(pwd)/scripts/pandoc:/pandoc-defaults:ro" \
            -w /workspace/downloads \
            -e LANG=pt_BR.UTF-8 \
            $IMAGE_NAME \
            pandoc --defaults=/pandoc-defaults/docker-ebook-pdf.yaml "${PDF_EXTRA_ARGS[@]}"
    fi
    echo "✓ PDF generated: public/downloads/livro-pog.pdf"
fi

# Generate EPUB
if [ "$FORMAT" == "epub" ] || [ "$FORMAT" == "all" ]; then
    echo "Generating EPUB..."

    EPUB_EXTRA_ARGS=()
    if [ "$PANDOC_LOG" == "1" ]; then
        EPUB_EXTRA_ARGS+=(--log=livro-pog-pandoc-epub.log)
    fi

    docker run --rm \
        -v "$(pwd)/public:/workspace" \
        -v "$(pwd)/scripts/pandoc:/pandoc-defaults:ro" \
        -w /workspace/downloads \
        -e LANG=pt_BR.UTF-8 \
        $IMAGE_NAME \
        pandoc --defaults=/pandoc-defaults/docker-ebook-epub.yaml "${EPUB_EXTRA_ARGS[@]}"
    echo "✓ EPUB generated: public/downloads/livro-pog.epub"
fi

cleanup_downloads_dir() {
    local downloads_dir="$(pwd)/public/downloads"

    if [ ! -d "$downloads_dir" ]; then
        return 0
    fi

    # Keep only final artifacts in downloads/
    # (Combined markdown, bibliography, .tex/.aux/.log/etc are regenerated on each run.)
    find "$downloads_dir" -maxdepth 1 -type f \
        ! -name 'livro-pog.pdf' \
        ! -name 'livro-pog.epub' \
        -delete
}

if [ "$CLEAN_DOWNLOADS" == "1" ]; then
    # When debugging, keep intermediates/logs around unless user explicitly forces cleanup.
    if [ "$KEEP_TEX" == "1" ] || [ "$PANDOC_LOG" == "1" ]; then
        echo "Skipping downloads cleanup (KEEP_TEX=$KEEP_TEX, PANDOC_LOG=$PANDOC_LOG). Set CLEAN_DOWNLOADS=1 and disable KEEP_TEX/PANDOC_LOG to auto-clean."
    else
        echo "Cleaning temporary files from public/downloads (keeping only PDF/EPUB)..."
        cleanup_downloads_dir
    fi
fi

echo ""
echo "✓ eBook generation complete!"

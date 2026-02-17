#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

IMAGE_NAME="livro-pog-ebook-builder"

echo -e "${BLUE}Building Docker image for eBook generation...${NC}"
docker build -f Dockerfile.ebook -t $IMAGE_NAME .

echo -e "${GREEN}✓ Docker image ready: $IMAGE_NAME${NC}"
echo ""
echo "You can now run:"
echo "  yarn ebook:docker:pdf   - Generate PDF"
echo "  yarn ebook:docker:epub  - Generate EPUB"
echo "  yarn ebook:docker:all   - Generate both"

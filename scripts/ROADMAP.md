# Próximas Melhorias para os eBooks

## 🎯 Prioridade Alta (Impacto Visual/UX)

### 1. **Capa Personalizada para EPUB**
**Status:** EPUB usa capa padrão do Pandoc  
**Impacto:** Alta - primeira impressão do leitor  
**Dificuldade:** Baixa  
**Como:**
```bash
# Adicionar ao comando Pandoc do EPUB:
--epub-cover-image=public/images/cover/livro-pog-capa.jpg
```
**Ação:** Criar/usar imagem de capa existente

---

### 2. **Incluir Imagens dos Capítulos**
**Status:** Apenas 2 imagens incluídas de ~50+ disponíveis  
**Impacto:** Alta - conteúdo visual importante  
**Dificuldade:** Média  
**Problema:** Paths absolutos (`/images/...`) não funcionam em PDF/EPUB  
**Soluções:**
- **A) Copiar imagens para pasta temporária** (recomendado)
- **B) Converter imagens para base64 inline**
- **C) Remover todas as imagens** (simplificar)

---

### 3. **Numeração de Capítulos e Seções**
**Status:** Capítulos sem numeração  
**Impacto:** Média - facilita referências  
**Dificuldade:** Baixa  
**Como:**
```bash
# Adicionar ao Pandoc:
-V numbersections
-V secnumdepth=2  # numerar até h2
```

---

### 4. **Melhorar Formatação do Índice**
**Status:** Índice básico  
**Impacto:** Média - navegação  
**Dificuldade:** Baixa  
**Como:**
```bash
-V toc-title="Sumário"
--toc-depth=3  # incluir mais níveis
```

---

## 📚 Prioridade Média (Conteúdo)

### 5. **Metadados Avançados**
**Status:** Apenas título e autor  
**Impacto:** Baixa - SEO/catalogação  
**Como:**
```bash
--metadata subject="Humor técnico"
--metadata keywords="programação,gambiarra,humor,padrões"
--metadata publisher="Auto-publicado"
--metadata date="2024"
--metadata rights="CC BY-NC-SA 4.0"
```

---

### 6. **Corrigir Warning de Referência Duplicada**
**Status:** `Duplicate note reference 'fn-nomes-capeta'`  
**Impacto:** Baixa - não afeta geração  
**Ação:** Revisar footnotes no Markdown

---

### 7. **Página de Título Customizada**
**Status:** Página de título padrão do Pandoc  
**Impacto:** Média - profissionalismo  
**Como:** Criar template LaTeX customizado ou adicionar página HTML

---

### 8. **Bibliografia/Referências Consolidadas**
**Status:** Referências no final de cada capítulo  
**Impacto:** Baixa - organização  
**Ação:** Consolidar todas no final do livro

---

## 🎨 Prioridade Baixa (Estética)

### 9. **Espaçamento e Margens Otimizadas**
**Status:** Margens padrão (1 inch)  
**Impacto:** Baixa - conforto de leitura  
**Como:**
```bash
-V geometry:top=2.5cm,bottom=2.5cm,left=3cm,right=2cm
-V linestretch=1.3  # espaçamento entre linhas
```

---

### 10. **CSS Customizado para EPUB**
**Status:** Estilo padrão do Pandoc  
**Impacto:** Baixa - identidade visual  
**Como:** Criar `styles/ebook.css` e adicionar `--css=styles/ebook.css`

---

### 11. **Header/Footer Personalizados (PDF)**
**Status:** Padrão do LaTeX  
**Impacto:** Baixa - profissionalismo  
**Como:** Template LaTeX customizado com fancyhdr

---

### 12. **Fonte Diferenciada**
**Status:** DejaVu Serif (funcional)  
**Impacto:** Baixa - estética  
**Alternativas:** Libertinus, EB Garamond, etc.

---

## 🚀 Prioridade Baixa (Distribuição)

### 13. **Geração de MOBI (Kindle)**
**Status:** Não implementado  
**Impacto:** Média - compatibilidade Kindle  
**Como:** Instalar Calibre `ebook-convert` e adicionar step

---

### 14. **GitHub Releases com Artifacts**
**Status:** Arquivos commitados no repo  
**Impacto:** Média - histórico limpo  
**Como:** Fazer upload para GitHub Releases em vez de commitar

---

### 15. **Versioning Automático**
**Status:** Sem versionamento  
**Impacto:** Baixa - rastreabilidade  
**Como:** Adicionar data/versão ao nome do arquivo

---

### 16. **Badge de Download no README**
**Status:** Não existe  
**Impacto:** Baixa - descoberta  
**Como:** Badge shields.io apontando para `/downloads/livro-pog.pdf`

---

## 🔧 Melhorias Técnicas

### 17. **Otimização de Tamanho**
**Status:** 500 KB (PDF) / 271 KB (EPUB) - razoável  
**Impacto:** Baixa  
**Como:** Comprimir imagens, otimizar PDF com Ghostscript

---

### 18. **Validação de Links Internos**
**Status:** Não validado  
**Impacto:** Baixa  
**Como:** Script para verificar links quebrados no Markdown

---

### 19. **CI/CD Otimizado**
**Status:** Funcional mas lento  
**Impacto:** Baixa - tempo de build  
**Como:** Cache de pacotes LaTeX

---

### 20. **Preview de Mudanças**
**Status:** Não existe  
**Impacho:** Baixa - QA  
**Como:** Gerar diff de PDFs em PRs

---

## 📊 Recomendação de Implementação

### **Fase 1 (Quick Wins - ~1h)**
1. ✅ Capa personalizada para EPUB
2. ✅ Numeração de capítulos
3. ✅ Metadados avançados
4. ✅ Melhorar título do índice

### **Fase 2 (Impacto Visual - ~2-3h)**
5. ✅ Incluir todas as imagens dos capítulos
6. ✅ CSS customizado para EPUB
7. ✅ Ajustar margens e espaçamento

### **Fase 3 (Distribuição - ~1-2h)**
8. ✅ GitHub Releases em vez de commit
9. ✅ Gerar MOBI para Kindle
10. ✅ Badge de download no README

### **Fase 4 (Polimento - conforme necessário)**
11. Template LaTeX customizado
12. Consolidar bibliografia
13. Header/footer personalizados

---

## 🎯 Próxima Ação Recomendada

**TOP 3 para implementar agora:**
1. **Capa personalizada** (5 min se já existir imagem)
2. **Numeração de capítulos** (1 linha de config)
3. **Incluir todas as imagens** (20-30 min)

Qual você quer implementar primeiro?

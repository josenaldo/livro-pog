# Copilot instructions

- Single source of truth:
  - Skills live in `.github/skills/`.
  - Rules live in `.github/instructions/`.
  - Prompt templates live in `.github/prompts/`.
- Prefer repo-aware changes: update code/content in place, run `npm run build` when changing site/build-related files.
- Contentlayer schema source of truth is `contentlayer.config.js`.
- Content files live under `content/blog/**` (Post) and `content/capitulos/**` (Chapter).

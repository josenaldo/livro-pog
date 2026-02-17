# Agent instructions (source of truth)

This repository centralizes agent guidance in these locations:

- Skills: `.github/skills/`
- Rules/instructions: `.github/instructions/`
- Prompt templates: `.github/prompts/`

If you are an agent/tooling that supports custom instructions, prefer reading files in `.github/instructions/`.

## Conventions

- Treat `.github/skills/` as the only source of truth for skills (no duplicated skill copies in agent-specific folders).
- Keep instructions small and composable; prefer adding a new file in this folder instead of growing one mega file.

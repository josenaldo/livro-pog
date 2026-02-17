# Modernize Next.js (repo-specific)

Goal: modernize this repository to the latest compatible versions.

Constraints:
- Keep the site working (Next.js + Contentlayer + next-sitemap + next-pwa).
- Prefer the latest versions that are compatible with each other.
- Use `npm run build` as the validation command.

Steps:
1) Inspect `package.json` for current versions and constraints.
2) Propose an upgrade target (Next major, React, TS, ESLint) with compatibility notes.
3) Apply dependency upgrades.
4) Fix build/runtime issues.
5) Run `npm run build` and report remaining issues.

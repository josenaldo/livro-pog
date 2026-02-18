import nextConfig from 'eslint-config-next'
import prettierConfig from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
    // Next.js rules (includes react, react-hooks, import, jsx-a11y, @next/next)
    ...nextConfig,

    // React recommended rules (flat config variant)
    pluginReact.configs.flat.recommended,

    // React 17+ JSX transform: no need to import React in scope
    pluginReact.configs.flat['jsx-runtime'],

    // Prettier: disables formatting rules that conflict with prettier
    prettierConfig,

    // Project-specific overrides
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            '@next/next/no-img-element': 'off',
            // Project does not use PropTypes (no TS either); disable the rule
            'react/prop-types': 'off',
            // New rules from react-hooks v7 (React Compiler patterns).
            // Downgraded to warn: these are pre-existing issues, not regressions.
            'react-hooks/static-components': 'warn',
            'react-hooks/immutability': 'warn',
            'react-hooks/preserve-manual-memoization': 'warn',

            // ── Import organisation ──────────────────────────────────────────
            // Disable the weaker built-in rule so simple-import-sort owns this
            'import/order': 'off',
            'sort-imports': 'off',

            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // 1. React (core framework)
                        ['^react$', '^react/'],
                        // 2. Next.js (meta-framework)
                        ['^next$', '^next/'],
                        // 3. External npm packages
                        //    @mui/*, other @-scoped, and unscoped packages
                        ['^@mui/', '^@(?!pog|data)[^/]+', '^[a-z]'],
                        // 4. Internal project aliases (@pog/*)
                        ['^@pog/'],
                        // 5. Data layer (@data/*, contentlayer)
                        ['^@data/', '^contentlayer'],
                        // 6. Relative imports (./foo, ../foo)
                        ['^\\.'],
                        // 7. Side-effect imports (CSS, global styles)
                        ['^\\u0000'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]

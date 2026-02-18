import nextConfig from 'eslint-config-next'
import prettierConfig from 'eslint-config-prettier'
import pluginReact from 'eslint-plugin-react'

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
        rules: {
            '@next/next/no-img-element': 'off',
            // Project does not use PropTypes (no TS either); disable the rule
            'react/prop-types': 'off',
            // New rules from react-hooks v7 (React Compiler patterns).
            // Downgraded to warn: these are pre-existing issues, not regressions.
            'react-hooks/static-components': 'warn',
            'react-hooks/immutability': 'warn',
            'react-hooks/preserve-manual-memoization': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]

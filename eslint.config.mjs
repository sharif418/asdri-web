// ESLint flat config. eslint-config-next 16 ships flat configs directly, so we no longer need
// FlatCompat (which breaks with a circular-structure error on this version).
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

// React Compiler lint rules (new in eslint-config-next 16). The Payload template's theme /
// header providers trip them; those files are replaced in phase 1 (see docs/06-roadmap.md).
// Kept as warnings so CI stays meaningful. New code must not add warnings here.
// Rule overrides must live in the config object that registers the plugin, hence the map.
const RELAXED_COMPILER_RULES = {
  'react-hooks/set-state-in-effect': 'warn',
  'react-hooks/refs': 'warn',
}

const nextCoreWebVitalsRelaxed = nextCoreWebVitals.map((config) =>
  config.plugins && 'react-hooks' in config.plugins
    ? { ...config, rules: { ...config.rules, ...RELAXED_COMPILER_RULES } }
    : config,
)

const eslintConfig = [
  ...nextCoreWebVitalsRelaxed,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'src/payload-types.ts',
      'src/payload-generated-schema.ts',
      'src/migrations/',
      'src/app/(payload)/admin/importMap.js',
      'public/',
      'docs/',
    ],
  },
]

export default eslintConfig

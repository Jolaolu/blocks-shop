module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['**/*.vue', '**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
      },
      plugins: ['import', 'import-alias'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        'vue/component-name-in-template-casing': [
          'error',
          'kebab-case',
          {
            registeredComponentsOnly: false,
            ignores: [],
          },
        ],
        'import-alias/import-alias': [
          'error',
          {
            relativeDepth: 0, // allows relative paths for colocated files (import FILE from "./FILE.js")
            aliases: [{ alias: '~', matcher: '^src' }],
          },
        ],
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
}

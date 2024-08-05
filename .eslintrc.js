module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react-perf', 'relay', '@typescript-eslint', 'import'],
  extends: [
    'airbnb-typescript/base',
    'airbnb/rules/react',
    'airbnb/rules/react-a11y',
    'plugin:relay/strict',
    'next/core-web-vitals',
    "prettier"
  ],
  rules: {
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.mdx'] }],

    // We utilize prop spreading
    'react/jsx-props-no-spreading': 'off',

    // We utilize class properties
    'react/state-in-constructor': 'off',

    // Dont use prop types since were using TypeScript
    'react/default-props-match-prop-types': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-read-only-props': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': 'off',

    // Performance: Avoid unnecessary renders
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',

    // We prefer function declarations
    'react/function-component-definition': [
      'error',
      { namedComponents: 'function-declaration', unnamedComponents: 'function-expression' },
    ],

    // We prefer on/handle named events
    'react/jsx-handler-names': 'error',

    // We require named functions for inferred `displayName`
    // This is required for memo() and forwardRef() usage
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

    'react/jsx-one-expression-per-line': 'off',

    // We dont use flow
    'relay/generated-flow-types': 'off',

    // Shorthand types
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-inferrable-types': 'error',

    // Forbid types
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',

    // Readability
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',

    // Correctness
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/restrict-plus-operands': ['error', { checkCompoundAssignments: true }],
    '@typescript-eslint/unified-signatures': 'error',

    // Assertions
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/prefer-as-const': 'error',

    // Comments
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { path: 'never', types: 'never', lib: 'never' },
    ],

    // Async
    'no-void': 'off',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/promise-function-async': 'error',

    // APIs
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    // Hard to migrate
    // Errors for all try/catch blocks and any types from third-parties
    '@typescript-eslint/no-unsafe-member-access': 'off',

    // We prefer React named imports only
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',

    // We prefer sorting imports by groups
    'import/order': [
      'error',
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "@/**",
            "group": "external",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"]
      }
    ],

    // We prefer labels to be associated with inputs
    'jsx-a11y/label-has-associated-control': ['error', {
      'required': {
        'some': ['nesting', 'id']
      }
    }],
    'jsx-a11y/label-has-for': ['error', {
      'required': {
        'some': ['nesting', 'id']
      }
    }]
  },
};

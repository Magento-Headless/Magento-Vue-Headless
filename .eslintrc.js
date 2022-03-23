module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['vue'],
  rules: {
    semi: ['error', 'never'],
    camelcase: 0,
    'consistent-return': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        mjs: 'never',
        js: 'never',
        vue: 'never'
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'off',
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['graphQLErrors', 'state']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        usePrettierrc: false,
        trailingCommas: 'none',
        fileInfoOptions: {
          withNodeModules: true
        }
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}

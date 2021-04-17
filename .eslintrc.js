module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 11,
    sourceType: 'module',

  },
  plugins: [
    'react',
  ],
  rules: {
    'no-prototype-builtins': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'max-len': ['error', { code: 205 }],
    'object-curly-newline': 'off',
    'react/state-in-constructor': 'off',
    'no-nested-ternary': 'off',
    'consistent-return': 'warn',
    'react/no-array-index-key': 'warn',
  },
};

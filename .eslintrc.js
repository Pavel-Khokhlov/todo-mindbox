module.exports = {
  root: true,
  extends: [
    'plugin:react/recommended'
  ],
  rules: {
    eqeqeq: 'off',
    curly: 'error',
    quotes: ['error', 'single', {allowTemplateLiterals: true}],
  },
  noInlineConfig: true,
  parserOptions: {
    ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true,
        modules: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'public/src'), 'node_modules', path.resolve('node_modules')],
  }
};

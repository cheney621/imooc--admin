module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eol-last': 0,
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/return-in-computed-property': 0,
    'quotes': 'off',
    'semi': 'off'
  }
}

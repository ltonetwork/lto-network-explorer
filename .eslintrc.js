module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended'
  ],
  // add your custom rules here
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}

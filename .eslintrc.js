module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 'off',
    'import/prefer-default-export': 'off',
    'prefer-object-spread': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/singleline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/script-indent': ['error', 2, { baseIndent: 0, switchCase: 1 }],
    'vue/component-name-in-template-casing': 'off',
    'vue/html-self-closing': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
  },
};

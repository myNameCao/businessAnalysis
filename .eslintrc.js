module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    // ECMAScript 模块
    sourceType: 'module',
    // 想使用的额外的语言特性:
    ecmaFeatures: {
      // 允许在全局作用域下使用 return 语句
      globalReturn: true,
      // impliedStric
      impliedStrict: true,
      // 启用 JSX
      jsx: true
    }
  },

  /**
   * 'off'    或 0 - 关闭规则
   * 'warn'   或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * 'error'  或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 禁止tab和 空格 混合使用
    'no-mixed-spaces-and-tabs': 2,
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 2,
    // 禁止不规则的空白。
    'no-irregular-whitespace': 2,
    // 字符串开头和结束使用单引号
    quotes: [2, 'single'],
    // 禁止冗余的括号
    'no-extra-parens': 2,
    // console
    'no-console': process.env.VUE_APP_ENV === 'production' ? 0 : 1,
    // alert、confirm 和 prompt
    'no-alert': 1,
    // 使用 node 全局变量 global
    'no-undef': 1,
    //  vue内部 script 规则
    // 强制在 function 的左括号之前没有空格
    'space-before-function-paren': [2, 'never'],
    // allow async-await
    'generator-star-spacing': 0,
    // Disallow or enforce spaces inside of parentheses
    'space-in-parens': 2,
    semi: ['error', 'never']
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
}

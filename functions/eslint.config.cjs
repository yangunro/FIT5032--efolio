// functions/eslint.config.cjs
const js = require("@eslint/js");

module.exports = [
  // 忽略 legacy 配置文件，防止被当普通文件扫描
  { ignores: [".eslintrc.cjs"] },

  // 基础推荐规则
  js.configs.recommended,

  // 这里专门为 Cloud Functions (Node/CommonJS) 设置环境
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // 关键：允许 require/module.exports
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      // 关闭 no-undef，避免 require 被误判
      "no-undef": "off",
      "no-unused-vars": "warn",
    },
  },
];

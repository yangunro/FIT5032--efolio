/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  extends: ["eslint:recommended"],
  rules: {
    
    "no-unused-vars": "warn",
    "no-undef": "off",  
  },
  globals: {
    require: "readonly",
    module: "readonly",
    exports: "readonly",
    __dirname: "readonly",
  },
};




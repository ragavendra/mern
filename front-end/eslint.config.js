// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: ["**/dist/"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    },
  }
];

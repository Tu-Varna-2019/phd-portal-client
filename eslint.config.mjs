import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "react-hooks/rules-of-hooks": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/no-children-prop": "off",
      "react/no-unescaped-entities": "off"
    },
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier
];

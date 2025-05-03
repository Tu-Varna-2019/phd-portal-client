const pluginJs = require("@eslint/js");
const pluginReact = require("eslint-plugin-react");
const eslintConfigPrettier = require("eslint-config-prettier");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "import/prefer-default-export": "off",
      "no-unused-vars": "warn",
      "no-undef": "off",
      "react-hooks/rules-of-hooks": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/no-children-prop": "off",
      "react/no-unescaped-entities": "off"
    },
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
        fetch: "readonly"
      }
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier
];

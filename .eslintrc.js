module.exports = {
  env: { browser: true, es2021: true },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [{ env: { node: true }, files: [".eslintrc.{js,cjs}"], parserOptions: { sourceType: "script" } }],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react"],
  rules: {
    "react-hooks/rules-of-hooks": "off",
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "off",
    "react/prop-types": "off",
    "react/no-unknown-property": "off",
    "react/no-children-prop": "off",
    "react/no-unescaped-entities": "off",
  },
}

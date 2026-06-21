/**
 * Shared ESLint configuration for CortexIQ Node.js services.
 * Placeholder — will be expanded with plugin configs per phase.
 */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
  },
};

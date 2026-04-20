import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [
    "typescript",
    "unicorn",
    "react",
    "react-perf",
    "import",
    "jsx-a11y",
  ],
  categories: {
    correctness: "error",
  },
  rules: {},
  settings: {
    react: { version: "19" },
  },
  env: { builtin: true },
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.convex/**",
    "**/convex/_generated/**",
    "**/*.gen.ts",
  ],
  options: {
    typeAware: true,
  },
});

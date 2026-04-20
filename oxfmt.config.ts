import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
  sortTailwindcss: {
    stylesheet: "./src/styles/globals.css",
    functions: ["cn", "cva"],
  },
  sortImports: {
    ignoreCase: false,
    newlinesBetween: true,
    internalPattern: ["@/*"],

    customGroups: [
      {
        groupName: "react",
        elementNamePattern: ["react", "react-*"],
      },
      {
        groupName: "convex",
        elementNamePattern: [
          "convex",
          "convex/*",
          "convex-helpers/*",
          "@/convex/*",
        ],
      },
      {
        groupName: "internal-types",
        elementNamePattern: ["@/types", "@/types/*"],
      },
      {
        groupName: "internal-config",
        elementNamePattern: ["@/config/*"],
      },
      {
        groupName: "internal-lib",
        elementNamePattern: ["@/lib/*"],
      },
      {
        groupName: "internal-hooks",
        elementNamePattern: ["@/hooks/*"],
      },
      {
        groupName: "internal-ui",
        elementNamePattern: ["@/components/ui/*"],
      },
      {
        groupName: "internal-components",
        elementNamePattern: ["@/components/*"],
      },
      {
        groupName: "internal-styles",
        elementNamePattern: ["@/styles/*"],
      },
    ],

    groups: [
      "react", // 1. react
      "external", // 2. third party npm packages
      "convex", // 3. convex
      "internal-types", // 4. @/types
      "internal-config", // 5. @/config
      "internal-lib", // 6. @/lib
      "internal-hooks", // 7. @/hooks
      "internal-ui", // 8. @/components/ui
      "internal-components", // 9. @/components
      "internal-styles", // 10. @/styles
      "internal",
      ["parent", "sibling", "index"], // 12. relative imports
      "type", // 13. type imports last
    ],
  },
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.convex/**",
    "**/convex/_generated/**",
    "**/*.gen.ts",
  ],
});

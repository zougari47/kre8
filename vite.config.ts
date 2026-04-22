import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    hmr: {
      host: "localhost",
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["@convex-dev/better-auth"],
  },
  plugins: [
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    nitro({
      preset: process.env.NITRO_PRESET, // controlled per deployment
    }),
    viteReact(),
    tailwindcss(),
  ],
});

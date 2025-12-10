import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/Final-Project-Guatemala/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  }
});

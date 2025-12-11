import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    root: "src",
    base: command === "serve" ? "/" : "/Final-Project-Guatemala/",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    }
  };
});

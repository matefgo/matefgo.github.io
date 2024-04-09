import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    root: "src",
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve("src", "index.html"),
          about: resolve("src", "about/index.html"),
        },
      },
    },
  };
});

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    root: "src",
    build: {
      outDir: "../docs",
      rollupOptions: {
        input: {
          main: resolve("src", "index.html"),
          about: resolve("src", "about/index.html"),
          story: resolve("src", "story/index.html"),
          contact: resolve("src", "contact/index.html"),
          portfolio: resolve("src", "portfolio/index.html"),
        },
      },
    },
  };
});

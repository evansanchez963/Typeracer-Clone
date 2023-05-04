import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    server: {
      open: true,
    },
    build: {
      outDir: "build",
    },
    plugins: [react(), svgr({ svgrOptions: { icon: true } })],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.js",
    },
  };
});

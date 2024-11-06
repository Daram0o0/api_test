import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const MOAFORM_API_BASE_URL = "https://api.moaform.com";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: MOAFORM_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      api: "/src/api",
      assets: "/src/assets",
      components: "/src/components",
      pages: "/src/pages",
      slices: "/src/slices",
      store: "/src/store",
      styles: "/src/styles",
      types: "/src/types",
      hooks: "/src/hooks",
      services: "/src/services",
      utils: "/src/utils",
    },
  },
});

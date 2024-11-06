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
});

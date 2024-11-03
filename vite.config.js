import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Moaform API 기본 URL 설정
const MOAFORM_API_BASE_URL = "https://api.moaform.com";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Moaform API 요청을 프록시로 설정
      "/api": {
        target: MOAFORM_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

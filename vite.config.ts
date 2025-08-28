import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    // ✅ 먼저 SVGR가 .svg를 컴포넌트로 변환하게 두는 게 안전합니다
    svgr({ svgrOptions: { svgProps: { overflow: 'visible' }, icon: false }, include: ['**/*.svg?react'] }),
    react(),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: "wss",
      host: "775828225ce3.ngrok-free.app",
      clientPort: 443,
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: "wss",
      host: "775828225ce3.ngrok-free.app", // ← 프로토콜 없이 도메인만!
      clientPort: 443,
    },
  },
});

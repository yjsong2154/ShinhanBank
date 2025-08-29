// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: { svgProps: { overflow: "visible" }, icon: false },
      include: ["**/*.svg?react"],
    }),
    react(),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    origin: "https://55f4d5e0ada8.ngrok-free.app",
    hmr: {
      protocol: "wss",
      host: "55f4d5e0ada8.ngrok-free.app",
      clientPort: 443,
    },
  },
});

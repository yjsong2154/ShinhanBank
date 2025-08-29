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
    origin: "https://610c11e2c9d0.ngrok-free.app",
    hmr: {
      protocol: "wss",
      host: "610c11e2c9d0.ngrok-free.app",
      clientPort: 443,
    },
  },
});

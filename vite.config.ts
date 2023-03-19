import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});

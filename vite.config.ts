import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // Local dev server settings
  server: {
    host: "::", // listen on all interfaces
    port: 8080, // your dev port
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Vercel expects this
    sourcemap: mode === "development", // optional, helps debug preview builds
  },
  base: "/", // important for Vercel deployment, ensures assets load correctly
}));

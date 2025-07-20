import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Reemplaza esto con tu nombre exacto de repo
const repoName = 'Detection-Mapping-of-Antipatterns-DMAP-';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: `/${repoName}/`,

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

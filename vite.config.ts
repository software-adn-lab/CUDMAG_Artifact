import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Keep repoName for historical reference — use a safe relative base in production
const repoName = 'Detection-Mapping-of-Antipatterns-DMAP-';

export default defineConfig(({ mode }) => ({
  // When deploying to GitHub Pages the repo path can change; using a relative
  // base ('./') for production ensures assets are referenced relative to the
  // generated `index.html`, which avoids blank pages caused by incorrect paths.
  base: mode === 'production' ? './' : '/',
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
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
}));
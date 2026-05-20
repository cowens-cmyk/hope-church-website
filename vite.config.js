import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Hope Church website — Vite + React build.
// Stylesheets, fonts, and images live in /public and are served as-is at /assets
// and /fonts, exactly as the original design prototype referenced them.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});

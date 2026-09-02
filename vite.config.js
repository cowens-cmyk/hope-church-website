import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'node:fs';

// One static page per event, so a shared link previews correctly and the
// content is in the HTML rather than appearing after a fetch. The list is
// written by scripts/gen-events.mjs before the build. Events created after a
// build are not here; vercel.json falls those back to the SPA shell.
function eventPaths() {
  const f = new URL('./src/generated/events.json', import.meta.url);
  if (!existsSync(f)) return [];
  try {
    return JSON.parse(readFileSync(f, 'utf8')).map((e) => `/events/${e.slug}`);
  } catch {
    return [];
  }
}

// Hope Church website — Vite + React build.
// Stylesheets, fonts, and images live in /public and are served as-is at /assets
// and /fonts, exactly as the original design prototype referenced them.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  ssgOptions: {
    includedRoutes(paths) {
      // Drop the parameterised route itself; add a real path per event.
      return [...paths.filter((p) => !p.includes(':')), ...eventPaths()];
    },
  },
});

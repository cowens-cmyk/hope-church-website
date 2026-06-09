/* Vercel (and most static hosts) serve dist/404.html for unknown URLs and
   return a proper 404 status. vite-react-ssg pre-renders our 404 page to
   dist/404/index.html, so we copy it to dist/404.html after the build. */
import { copyFileSync, existsSync } from 'node:fs';

const src = new URL('../dist/404/index.html', import.meta.url);
const dest = new URL('../dist/404.html', import.meta.url);

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log('Wrote dist/404.html');
} else {
  console.warn('Skipped: dist/404/index.html not found');
}

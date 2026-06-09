/* Hope Church — application entry point.

   Previously this mounted a single React tree whose "page" was just a piece of
   state. It now hands the route table to vite-react-ssg, which:
     • in the browser, hydrates the right page for the current URL, and
     • at build time, pre-renders every route to its own static HTML file.

   The route definitions live in ./routes.jsx. */
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes.jsx';

export const createRoot = ViteReactSSG({ routes });

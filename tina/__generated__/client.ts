import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/Users/cameronowens/hope-church-website/tina/__generated__/.cache/1785178023612', url: 'http://localhost:4001/graphql', token: 'null', queries,  });
export default client;
  
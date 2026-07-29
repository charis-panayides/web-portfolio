import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/web-portfolio/",
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        filter: ({ path }) =>
          !path.startsWith("/.mcp") && !path.startsWith("/.well-known") && path !== "/mcp",
        pages: [
          { path: "/projects/aktina" },
          { path: "/projects/cy-omt" },
          { path: "/projects/mia-fora" },
          { path: "/projects/viiibe" },
        ],
      },
    }),
    viteReact(),
  ],
});

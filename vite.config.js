import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fontsByPath, heroByPath, pageByPath } from "./src/data/heroImages.js";
import { imageManifest } from "./src/data/imageManifest.js";

/**
 * Skriver et lite inline-script i <head> som preloader rutens hero-bilde
 * (webp-srcset med riktige sizes), rutespesifikke fonter og rutens sidechunk
 * (modulepreload, kun i build der chunk-navnene er kjent) før CSS og JS er
 * lastet. Erstatter en fast preload av forsidens bilde på alle ruter, og gir
 * undersidene samme forsprang på LCP-bildet som forsiden.
 */
function heroPreloadPlugin() {
  return {
    name: "gtm-hero-preload",
    transformIndexHtml(html, ctx) {
      const chunkByPage = {};
      for (const [file, chunk] of Object.entries(ctx.bundle || {})) {
        if (chunk.type !== "chunk" || !chunk.facadeModuleId) continue;
        const match = /\/pages\/(\w+)\.jsx$/.exec(chunk.facadeModuleId.replace(/\\/g, "/"));
        if (match) chunkByPage[match[1]] = `/${file}`;
      }
      const chunks = {};
      for (const [path, page] of Object.entries(pageByPath)) {
        if (chunkByPage[page]) chunks[path] = chunkByPage[page];
      }
      const heroes = {};
      for (const [path, { image, sizes }] of Object.entries(heroByPath)) {
        const entry = imageManifest[image];
        if (!entry) continue;
        const srcset = [...entry.sizes]
          .sort((a, b) => a.w - b.w)
          .map((s) => `${image}-${s.w}.webp ${s.w}w`)
          .join(", ");
        heroes[path] = [srcset, sizes];
      }
      const script = `<script>(function(){var p=location.pathname.replace(/\\/$/,"")||"/";var h=${JSON.stringify(heroes)}[p];var d=document.head;if(h){var l=document.createElement("link");l.rel="preload";l.as="image";l.type="image/webp";l.setAttribute("imagesrcset",h[0]);l.setAttribute("imagesizes",h[1]);l.setAttribute("fetchpriority","high");d.appendChild(l);}var f=${JSON.stringify(fontsByPath)}[p]||[];for(var i=0;i<f.length;i++){var k=document.createElement("link");k.rel="preload";k.as="font";k.type="font/woff2";k.href=f[i];k.crossOrigin="anonymous";d.appendChild(k);}var c=${JSON.stringify(chunks)}[p];if(c){var m=document.createElement("link");m.rel="modulepreload";m.href=c;d.appendChild(m);}})();</script>`;
      return html.replace("<!-- hero-preload -->", script);
    },
  };
}

export default defineConfig({
  plugins: [react(), heroPreloadPlugin()],
  build: {
    target: "es2020",
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
});

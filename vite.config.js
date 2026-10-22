import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fontsByPath, heroByPath, pageByPath } from "./src/data/heroImages.js";
import { imageManifest } from "./src/data/imageManifest.js";
import { categories } from "./src/data/nb/catalog.js";

/**
 * Skriver et lite inline-script i <head> som preloader rutens hero-bilde. Stien
 * leses uten språkprefikset /en, så engelske sider får samme forhåndslasting.
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
      const script = `<script>(function(){var p=location.pathname;if(p==="/en"||p.indexOf("/en/")===0){p=p.slice(3)||"/";}p=p.replace(/\\/$/,"")||"/";var h=${JSON.stringify(heroes)}[p];var d=document.head;if(h){var l=document.createElement("link");l.rel="preload";l.as="image";l.type="image/webp";l.setAttribute("imagesrcset",h[0]);l.setAttribute("imagesizes",h[1]);l.setAttribute("fetchpriority","high");d.appendChild(l);}var f=${JSON.stringify(fontsByPath)}[p]||[];for(var i=0;i<f.length;i++){var k=document.createElement("link");k.rel="preload";k.as="font";k.type="font/woff2";k.href=f[i];k.crossOrigin="anonymous";d.appendChild(k);}var C=${JSON.stringify(chunks)};var c=C[p];if(!c){for(var k in C){if(k.split("/").length>2&&p.indexOf(k+"/")===0){c=C[k];break;}}}if(c){var m=document.createElement("link");m.rel="modulepreload";m.href=c;d.appendChild(m);}})();</script>`;
      return html.replace("<!-- hero-preload -->", script);
    },
  };
}

/**
 * Setter byggets versjon inn i public/sw.js (plassholderen __GTM_BUILD__) etter at
 * dist/ er skrevet, så hvert bygg får nytt cachenavn og gamle cacher slettes.
 */
function serviceWorkerVersionPlugin() {
  let outDir = "dist";
  return {
    name: "gtm-sw-version",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const file = path.resolve(outDir, "sw.js");
      try {
        const source = readFileSync(file, "utf8");
        writeFileSync(file, source.replace("__GTM_BUILD__", Date.now().toString(36)));
      } catch {
        // Ingen sw.js i public/, ingenting å stemple.
      }
    },
  };
}

/**
 * Skriver dist/sitemap.xml i bygget: hovedsidene og kategorisidene på norsk (/) og
 * engelsk (/en), med hreflang-alternativer per side. SITE_URL byttes til
 * gtmaskin.com ved go-live (STATUS.md). Indeksering er fortsatt av (noindex), så
 * kartet er klart, men ikke i bruk før robots.txt og noindex slås om.
 */
const SITE_URL = "https://gt-maskin-demo.vercel.app";
const MAIN_PATHS = [
  "/",
  "/verksted",
  "/deler",
  "/deler/bil",
  "/deler/kategori",
  "/biler-til-salgs",
  "/video",
  "/utleie",
  "/om-oss",
  "/bestill",
  "/kontakt",
  "/personvern",
];

function sitemapPlugin() {
  let outDir = "dist";
  return {
    name: "gtm-sitemap",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const paths = [...MAIN_PATHS, ...categories.map((c) => `/deler/kategori/${c.slug}`)];
      const today = new Date().toISOString().slice(0, 10);
      const entry = (p, locale) => {
        const nb = `${SITE_URL}${p}`;
        const en = `${SITE_URL}${p === "/" ? "/en" : `/en${p}`}`;
        return [
          "  <url>",
          `    <loc>${locale === "en" ? en : nb}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <xhtml:link rel="alternate" hreflang="nb" href="${nb}" />`,
          `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />`,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${nb}" />`,
          "  </url>",
        ].join("\n");
      };
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...paths.flatMap((p) => [entry(p, "nb"), entry(p, "en")]),
        "</urlset>",
        "",
      ].join("\n");
      writeFileSync(path.resolve(outDir, "sitemap.xml"), xml);
    },
  };
}

export default defineConfig({
  plugins: [react(), heroPreloadPlugin(), serviceWorkerVersionPlugin(), sitemapPlugin()],
  build: {
    target: "es2020",
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
});

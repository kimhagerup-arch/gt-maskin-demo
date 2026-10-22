// Oppslag og filtrering i delekatalogen. Rene funksjoner over catalog.js,
// vehicles.js og products.js, så sidene og komponentene slipper å kjenne
// datamodellen. Stiene i butikken bygges og leses her:
//   /deler/bil/<merke>/<modell>/<år>/<kategori>/<deltype>
//   /deler/kategori/<kategori>/<deltype>
//   /deler/sok?q=<søk>
// Alle nivåer kan mangle fra høyre; ugyldige segmenter stopper tolkningen der.

import { categories, getCategory, getType } from "../data/catalog";
import { products } from "../data/products";
import { getBrand, getModel, lastYear, vehicles, yearInModel } from "../data/vehicles";

export const SHOP = "/deler";
export const OIL_CATEGORY = "olje-kjemi-og-tilbehor";
export const CLOTHES_CATEGORY = "klaer-og-utstyr";

/** Lager tekst sammenlignbar: små bokstaver, uten klammer, æøå til ae/o/a. */
export function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[[\]]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/é/g, "e")
    .trim();
}

/* ---------- Stier ---------- */

function categoryPart(segments, start) {
  const category = getCategory(segments[start]);
  if (!category) return { category: null, type: null };
  const type = getType(category.slug, segments[start + 1]);
  return { category, type };
}

/** Leser «chevrolet/camaro/1969/bremser/bremseklosser-foran» til objekter. */
export function parseVehiclePath(splat = "") {
  const segments = splat.split("/").filter(Boolean);
  const result = { brand: null, model: null, year: null, category: null, type: null };
  result.brand = getBrand(segments[0]);
  if (!result.brand) return result;
  result.model = getModel(result.brand.slug, segments[1]);
  if (!result.model) return result;
  const year = Number(segments[2]);
  if (!yearInModel(result.model, year)) return result;
  result.year = year;
  Object.assign(result, categoryPart(segments, 3));
  return result;
}

/** Leser «bremser/bremseklosser-foran» til objekter. */
export function parseCategoryPath(splat = "") {
  const segments = splat.split("/").filter(Boolean);
  return { brand: null, model: null, year: null, ...categoryPart(segments, 0) };
}

/** Bygger stien for et utvalg i «Deler etter bil». Tar objekter eller slugs. */
export function vehiclePath({ brand, model, year, category, type } = {}) {
  const parts = [SHOP, "bil"];
  const b = slugOf(brand);
  if (!b) return parts.join("/");
  parts.push(b);
  const m = slugOf(model);
  if (!m) return parts.join("/");
  parts.push(m);
  if (!year) return parts.join("/");
  parts.push(String(year));
  const c = slugOf(category);
  if (!c) return parts.join("/");
  parts.push(c);
  const t = slugOf(type);
  if (t) parts.push(t);
  return parts.join("/");
}

/** Bygger stien for «Alle kategorier». */
export function categoryPath({ category, type } = {}) {
  const parts = [SHOP, "kategori"];
  const c = slugOf(category);
  if (!c) return parts.join("/");
  parts.push(c);
  const t = slugOf(type);
  if (t) parts.push(t);
  return parts.join("/");
}

export function searchPath(query) {
  return `${SHOP}/sok?q=${encodeURIComponent(query)}`;
}

export function productPath(product) {
  return `${SHOP}/${slugOf(product)}`;
}

function slugOf(value) {
  if (!value) return null;
  return typeof value === "string" ? value : value.slug;
}

/* ---------- Kjøretøy ---------- */

/** «Chevrolet Camaro 1969», «Chevrolet Camaro» eller «Chevrolet». */
export function vehicleLabel({ brand, model, year } = {}) {
  const b = typeof brand === "string" ? getBrand(brand) : brand;
  const m = typeof model === "string" && b ? getModel(b.slug, model) : model;
  return [b?.name, m?.name, year].filter(Boolean).join(" ");
}

/** «Chevrolet Camaro 1967-1969» for én «passer til»-rad på en vare. */
export function formatFit(fit) {
  const b = getBrand(fit.brand);
  const m = getModel(fit.brand, fit.model);
  const years =
    fit.from && fit.to && fit.from !== fit.to
      ? `${fit.from}-${fit.to}`
      : String(fit.from || fit.to || "");
  return [b?.name || fit.brand, m?.name || fit.model, years].filter(Boolean).join(" ");
}

/** Liste med «passer til»-tekster for en vare (tom for universalvarer). */
export function formatFits(product) {
  return (product.fits || []).map(formatFit);
}

/** true når varen passer det som er valgt. Delvis valg (bare merke) gir true for alle fits på merket. */
export function fitsVehicle(product, { brand, model, year } = {}) {
  if (product.universal) return true;
  const b = slugOf(brand);
  if (!b) return true;
  const m = slugOf(model);
  return (product.fits || []).some((fit) => {
    if (fit.brand !== b) return false;
    if (m && fit.model !== m) return false;
    if (year && (year < fit.from || year > fit.to)) return false;
    return true;
  });
}

/** Alle varer som passer akkurat denne bilen (fullt valgt), uten universalvarene. */
export function partsForVehicle(list, vehicle) {
  return list.filter((p) => !p.universal && fitsVehicle(p, vehicle));
}

/* ---------- Utvalg ---------- */

/**
 * Varene som hører til et utvalg: bil (helt eller delvis), kategori og deltype.
 * Uten bil og kategori: alle varer. Universalvarer er med når ingen kategori er
 * valgt, eller når den valgte kategorien er universal.
 */
export function productsFor(selection = {}, list = products) {
  const { brand, category, type } = selection;
  const c = slugOf(category);
  const t = slugOf(type);
  return list.filter((p) => {
    if (c && p.category !== c) return false;
    if (t && p.type !== t) return false;
    if (brand && !p.universal && !fitsVehicle(p, selection)) return false;
    return true;
  });
}

/** Antall varer per kategori-slug og per «kategori/deltype» for et utvalg. */
export function countBy(list) {
  const byCategory = new Map();
  const byType = new Map();
  for (const p of list) {
    byCategory.set(p.category, (byCategory.get(p.category) || 0) + 1);
    const key = `${p.category}/${p.type}`;
    byType.set(key, (byType.get(key) || 0) + 1);
  }
  return {
    category: (slug) => byCategory.get(slugOf(slug)) || 0,
    type: (cat, type) => byType.get(`${slugOf(cat)}/${slugOf(type)}`) || 0,
  };
}

/** Grupperer varer per deltype i katalogens rekkefølge: [{ category, type, items }]. */
export function groupByType(list) {
  const groups = [];
  for (const category of categories) {
    for (const type of category.types) {
      const items = list.filter((p) => p.category === category.slug && p.type === type.slug);
      if (items.length) groups.push({ category, type, items });
    }
  }
  return groups;
}

/* ---------- Sortering ---------- */

export function priceNumber(product) {
  const str = String(product.price ?? "").trim();
  if (!str || str.startsWith("[")) return null;
  const n = Number(str.replace(/\s/g, ""));
  return Number.isNaN(n) ? null : n;
}

export const SORT_MODES = ["relevans", "pris-lav", "pris-hoy"];

/** Sorterer stabilt. Varer uten pris legges sist ved prissortering. */
export function sortProducts(list, mode = "relevans") {
  if (mode === "relevans") return list;
  const dir = mode === "pris-hoy" ? -1 : 1;
  return [...list].sort((a, b) => {
    const pa = priceNumber(a);
    const pb = priceNumber(b);
    if (pa === null && pb === null) return 0;
    if (pa === null) return 1;
    if (pb === null) return -1;
    return (pa - pb) * dir;
  });
}

/* ---------- Søk ---------- */

const YEAR_RE = /^(19|20)\d{2}$/;

function tokenMatches(token, text) {
  const t = normalize(text);
  return t === token || t.split(/[\s,./-]+/).some((w) => w.startsWith(token));
}

/** Finner merker, modeller og årsmodell i søkeordene. */
function detectVehicle(tokens) {
  let year = null;
  const brandHits = [];
  const modelHits = [];
  for (const token of tokens) {
    if (YEAR_RE.test(token)) {
      year = Number(token);
      continue;
    }
    for (const b of vehicles) {
      if (tokenMatches(token, b.name)) brandHits.push({ brand: b, token });
      for (const m of b.models) {
        if (tokenMatches(token, m.name) || tokenMatches(token, m.slug)) {
          modelHits.push({ brand: b, model: m, token });
        }
      }
    }
  }
  let brand = brandHits[0]?.brand || null;
  let model = null;
  const scoped = brand ? modelHits.filter((h) => h.brand.slug === brand.slug) : modelHits;
  if (scoped.length) {
    // Modellnavn som finnes hos flere merker (f.eks. tall): behold alle som kandidater.
    model = scoped[0].model;
    brand = scoped[0].brand;
  }
  if (year && model && !yearInModel(model, year)) year = null;
  const used = new Set();
  for (const h of brandHits) used.add(h.token);
  for (const h of modelHits) used.add(h.token);
  if (year) used.add(String(year));
  return { brand, model, year, used, modelCandidates: scoped.slice(0, 5) };
}

/**
 * Søk i hele katalogen med ett felt: årsmodell, merke, modell, kategori, deltype,
 * varenavn og varenummer i vilkårlig rekkefølge. Returnerer funnet bil, forslag
 * til kategorier og deltyper, varer sortert etter treff, og en eksakt varenummer-
 * match om den finnes. `myCar` gir bonus til varer som passer kundens bil.
 */
export function searchCatalog(query, { myCar = null, list = products } = {}) {
  const q = normalize(query);
  const tokens = q.split(/\s+/).filter(Boolean);
  const empty = {
    tokens,
    vehicle: null,
    vehicles: [],
    categories: [],
    types: [],
    products: [],
    exact: null,
  };
  if (!tokens.length) return empty;

  const exact = list.find((p) => p.sku && normalize(p.sku) === q) || null;

  const detected = detectVehicle(tokens);
  const vehicle =
    detected.brand || detected.year
      ? { brand: detected.brand, model: detected.model, year: detected.year }
      : null;

  const vehicleSuggestions = detected.modelCandidates.map((h) => ({
    brand: h.brand,
    model: h.model,
    year: detected.year && yearInModel(h.model, detected.year) ? detected.year : null,
  }));
  if (!vehicleSuggestions.length && detected.brand) {
    vehicleSuggestions.push({ brand: detected.brand, model: null, year: null });
  }

  const categoryHits = [];
  const typeHits = [];
  for (const c of categories) {
    if (tokens.some((t) => tokenMatches(t, c.name))) categoryHits.push(c);
    for (const type of c.types) {
      if (tokens.some((t) => tokenMatches(t, type.name))) typeHits.push({ category: c, type });
    }
  }

  // Passer varen det som er funnet av merke, modell og årsmodell i søket?
  const fitsDetected = (p) =>
    (p.fits || []).some(
      (f) =>
        (!detected.brand || f.brand === detected.brand.slug) &&
        (!detected.model || f.model === detected.model.slug) &&
        (!detected.year || (detected.year >= f.from && detected.year <= f.to)),
    );

  const scored = [];
  for (const p of list) {
    const category = getCategory(p.category);
    const type = getType(p.category, p.type);
    const fields = [p.title, p.brand, p.sku, category?.name, type?.name];
    let score = 0;
    let ok = true;
    for (const token of tokens) {
      let hit = 0;
      if (p.sku && normalize(p.sku) === token) hit = 50;
      else if (tokenMatches(token, p.title)) hit = 10;
      else if (type && tokenMatches(token, type.name)) hit = 8;
      else if (category && tokenMatches(token, category.name)) hit = 5;
      else if (fields.some((f) => f && tokenMatches(token, f))) hit = 4;
      else if (detected.used.has(token)) {
        // Ordet er et merke, en modell eller et årstall: varen må passe bilen.
        if (p.universal) hit = 1;
        else if (fitsDetected(p)) hit = 6;
      }
      if (!hit) {
        ok = false;
        break;
      }
      score += hit;
    }
    if (!ok) continue;
    if (vehicle?.brand && !p.universal && fitsVehicle(p, vehicle)) score += 3;
    if (myCar && !p.universal && fitsVehicle(p, myCar)) score += 2;
    scored.push({ p, score });
  }
  scored.sort((a, b) => b.score - a.score);

  return {
    tokens,
    vehicle,
    vehicles: vehicleSuggestions,
    categories: categoryHits,
    types: typeHits,
    products: scored.map((s) => s.p),
    exact,
  };
}

/* ---------- Min bil ---------- */

/** Passer varen kundens bil? "ja" | "alle" | "nei" | null (ingen bil valgt). */
export function fitStatus(product, myCar) {
  if (product.universal) return "alle";
  if (!myCar) return null;
  return fitsVehicle(product, myCar) ? "ja" : "nei";
}

export { lastYear };

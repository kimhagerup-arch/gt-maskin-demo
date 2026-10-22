// «Min bil»: bilen kunden har valgt i butikken, husket i localStorage og delt
// mellom butikksiden og produktsiden uten provider (useSyncExternalStore).
// Lesing og skriving skjer i try/catch, så siden virker også når lagring er
// blokkert; da lever valget bare i minnet til siden lastes på nytt.
import { useSyncExternalStore } from "react";
import { getBrand, getModel, yearInModel } from "../data/vehicles";

const KEY = "gtm-min-bil";
const listeners = new Set();

/** Godtar bare biler som finnes i vehicles.js. Returnerer { brand, model, year } med slugs. */
function sanitize(value) {
  if (!value || typeof value !== "object") return null;
  const model = getModel(value.brand, value.model);
  const year = Number(value.year);
  if (!model || !yearInModel(model, year)) return null;
  return { brand: value.brand, model: value.model, year };
}

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return sanitize(raw ? JSON.parse(raw) : null);
  } catch {
    return null;
  }
}

let current = typeof window === "undefined" ? null : read();

function emit() {
  for (const fn of listeners) fn();
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot() {
  return current;
}

export function useMyCar() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

export function setMyCar(car) {
  const next = sanitize(car);
  if (!next) return;
  if (
    current &&
    current.brand === next.brand &&
    current.model === next.model &&
    current.year === next.year
  ) {
    return;
  }
  current = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Lagring blokkert: valget lever bare i minnet.
  }
  emit();
}

export function clearMyCar() {
  current = null;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Ingenting å fjerne.
  }
  emit();
}

/** Objektene bak «Min bil», til tekst og stier. */
export function expandCar(car) {
  if (!car) return null;
  const brand = getBrand(car.brand);
  const model = getModel(car.brand, car.model);
  if (!brand || !model) return null;
  return { brand, model, year: car.year };
}

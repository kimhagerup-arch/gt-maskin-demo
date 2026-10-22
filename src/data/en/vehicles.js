// Vehicles, English. Same shape, slugs and years as nb/vehicles.js. Make and model
// names are the same in both languages except the few descriptive ones below.
import { vehicles as nbVehicles } from "../nb/vehicles.js";

const modelNames = {
  "dodge/caravan": "Caravan and Grand Caravan",
  "dodge/ram-pickup": "Ram pickup (through 2010)",
  "ford/e-series": "E-Series (Econoline)",
};

export const vehicles = nbVehicles.map((b) => ({
  ...b,
  models: b.models.map((m) => ({ ...m, name: modelNames[`${b.slug}/${m.slug}`] ?? m.name })),
}));

export const otherVehicle = { slug: "annet", name: "Other make or model" };

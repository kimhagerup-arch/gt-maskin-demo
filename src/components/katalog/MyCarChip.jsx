import { partsSection } from "../../data/siteContent";
import { Link } from "../../i18n/LocaleLink";
import { vehicleLabel } from "../../lib/catalog";
import { cx } from "../../lib/format";
import { clearMyCar, expandCar } from "../../lib/myCar";
import Icon from "../Icon";
import LicensePlate from "../LicensePlate";

/**
 * «Min bil» som et lite amerikansk bilskilt (runde 5b): «ALTA · NORWAY» øverst,
 * modell og årsmodell i midten («CAMARO 69»), skruer i hjørnene. Skjermlesere
 * får hele bilen som tekst («Min bil: Chevrolet Camaro 1969»). «Bytt» og
 * «Fjern» som før, på begge språk. Skjult uten valgt bil.
 */
export default function MyCarChip({ car, className }) {
  const c = partsSection.catalog.myCar;
  const full = expandCar(car);
  if (!full) return null;
  const main = `${full.model.name} ${String(full.year).slice(-2)}`;
  const label = `${c.label}: ${vehicleLabel(full)}`;

  return (
    <div
      className={cx(
        "flex flex-wrap items-center gap-x-4 gap-y-2 border border-brand-border-dark bg-brand-primary px-3 py-2.5 text-sm text-brand-text-inverse",
        className,
      )}
    >
      <LicensePlate top={c.plateTop} main={main} label={label} />
      <span className="flex flex-col leading-tight" aria-hidden="true">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-muted-inverse">
          {c.label}
        </span>
        <strong className="font-bold" translate="no">
          {vehicleLabel(full)}
        </strong>
      </span>
      <span className="ml-auto flex items-center gap-1">
        <Link
          to="/deler/bil"
          className="inline-flex h-9 items-center px-2 font-semibold text-brand-muted-inverse hover:text-brand-text-inverse"
        >
          {c.change}
        </Link>
        <button
          type="button"
          onClick={clearMyCar}
          aria-label={c.removeAria}
          className="inline-flex h-9 items-center gap-1 px-2 font-semibold text-brand-muted-inverse hover:text-brand-accent-light"
        >
          <Icon name="X" size={14} strokeWidth={2.2} />
          {c.remove}
        </button>
      </span>
    </div>
  );
}

import { partsSection } from "../../data/siteContent";
import { Link } from "../../i18n/LocaleLink";
import { vehicleLabel } from "../../lib/catalog";
import { cx } from "../../lib/format";
import { clearMyCar, expandCar } from "../../lib/myCar";
import Icon from "../Icon";

/** «Min bil: Chevrolet Camaro 1969» med «Bytt» og «Fjern». Skjult uten valgt bil. */
export default function MyCarChip({ car, className }) {
  const c = partsSection.catalog.myCar;
  const full = expandCar(car);
  if (!full) return null;
  return (
    <div
      className={cx(
        "flex flex-wrap items-center gap-x-3 gap-y-1 border border-brand-primary bg-brand-primary px-3 py-2 text-sm text-brand-text-inverse",
        className,
      )}
    >
      <Icon name="Car" size={18} strokeWidth={2} className="text-brand-accent-light" />
      <span>
        {c.label}:{" "}
        <strong className="font-bold" translate="no">
          {vehicleLabel(full)}
        </strong>
      </span>
      <span className="ml-auto flex items-center gap-1">
        <Link
          to="/deler/bil"
          className="inline-flex h-8 items-center px-2 font-semibold text-brand-muted-inverse hover:text-brand-text-inverse"
        >
          {c.change}
        </Link>
        <button
          type="button"
          onClick={clearMyCar}
          aria-label={c.removeAria}
          className="inline-flex h-8 items-center gap-1 px-2 font-semibold text-brand-muted-inverse hover:text-brand-accent-light"
        >
          <Icon name="X" size={14} strokeWidth={2.2} />
          {c.remove}
        </button>
      </span>
    </div>
  );
}

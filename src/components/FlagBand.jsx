import { cx } from "../lib/format";

/**
 * Stjerner og striper: et smalt bånd (6 px) helt øverst i headeren med flaggets
 * røde og hvite striper og et blått felt med små stjerner i venstre ende. En
 * langsom glans glir over (bare transform, index.css). Ren pynt, aria-hidden.
 */
export default function FlagBand({ className }) {
  return <div className={cx("flag-band", className)} aria-hidden="true" />;
}

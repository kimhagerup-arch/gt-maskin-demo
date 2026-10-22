import { cx } from "../lib/format";

/**
 * Små flagg tegnet i SVG (ikke emoji) til språkvelgeren. USA: 13 striper og
 * blått felt med stjerner som punkter. Norge: rødt med hvitt og blått kors.
 * Fargene er flaggtokens fra designsystemet (tailwind.config.js), så de
 * stemmer med båndet i headeren.
 */
export function UsFlag({ className, title }) {
  return (
    <svg
      viewBox="0 0 38 20"
      className={cx("block h-[14px] w-[27px]", className)}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <rect width="38" height="20" className="fill-flag-white" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="38" height={20 / 13} className="fill-flag-red" />
      ))}
      <rect width="15.2" height={(7 * 20) / 13} className="fill-flag-blue" />
      {[1, 2, 3, 4].map((row) =>
        [1, 2, 3, 4, 5].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 2.6 - 0.4 + (row % 2 ? 0 : 1.3)}
            cy={row * 2.3 - 0.8}
            r="0.55"
            className="fill-flag-white"
          />
        )),
      )}
    </svg>
  );
}

export function NoFlag({ className, title }) {
  return (
    <svg
      viewBox="0 0 22 16"
      className={cx("block h-[14px] w-[19px]", className)}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <rect width="22" height="16" className="fill-flag-red" />
      <rect x="6" width="4" height="16" className="fill-flag-white" />
      <rect y="6" width="22" height="4" className="fill-flag-white" />
      <rect x="7" width="2" height="16" className="fill-flag-blue" />
      <rect y="7" width="22" height="2" className="fill-flag-blue" />
    </svg>
  );
}

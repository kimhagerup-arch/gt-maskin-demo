import { Link } from "../i18n/LocaleLink";
import { cx } from "../lib/format";
import Icon from "./Icon";

const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-button font-bold transition-[color,background-color,border-color,filter] duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const SIZES = {
  md: "h-12 px-6 text-base md:h-14 md:px-7 md:text-[17px]",
  sm: "h-11 px-5 text-[15px]",
  xs: "h-10 px-3.5 text-[13px]",
};

const VARIANTS = {
  primary: "bg-brand-accent text-brand-primary hover:bg-brand-accent-hover",
  outlineDark:
    "border-[1.5px] border-brand-outline text-brand-text-inverse hover:border-brand-muted-inverse",
  dark: "bg-brand-primary text-brand-text-inverse hover:bg-brand-primary-light",
  light: "bg-brand-bg text-brand-primary hover:bg-brand-surface",
  facebook: "bg-brand-facebook text-brand-on-facebook hover:brightness-110",
  snapchat: "bg-brand-snapchat text-brand-on-snapchat hover:brightness-95",
};

/**
 * Knapp eller lenke i samme stil. `to` gir intern Link, `href` gir ekstern <a>,
 * ellers <button>. `arrow` legger på pil til høyre.
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  external = false,
  className,
  children,
  type = "button",
  ...rest
}) {
  const classes = cx(BASE, SIZES[size], VARIANTS[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="ArrowRight" size={size === "xs" ? 16 : 20} strokeWidth={2.2} />}
      {external && !arrow && <Icon name="ExternalLink" size={18} strokeWidth={2} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}

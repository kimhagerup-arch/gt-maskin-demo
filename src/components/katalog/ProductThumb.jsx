import { getCategory } from "../../data/catalog";
import { cx } from "../../lib/format";
import Icon from "../Icon";
import Picture from "../Picture";

/**
 * Lite varebilde i lister og kort. Finnes det ikke bilde, vises ikonet til
 * hovedkategorien på en lys flate, aldri en grå plassholderboks.
 */
export default function ProductThumb({ product, size = 44, sizes, className, iconSize }) {
  const imageKey = product.image || product.placeholderImage;
  const category = getCategory(product.category);
  if (imageKey) {
    return (
      <Picture
        src={imageKey}
        alt=""
        sizes={sizes || `${size}px`}
        className={cx("shrink-0 overflow-hidden", className)}
        imgClassName="h-full w-full object-cover"
        tone="light"
        fallbackLabel=""
      />
    );
  }
  return (
    <span
      className={cx(
        "flex shrink-0 items-center justify-center bg-brand-surface text-brand-muted",
        className,
      )}
      aria-hidden="true"
    >
      <Icon name={category?.icon || "Package"} size={iconSize || Math.round(size * 0.5)} />
    </span>
  );
}

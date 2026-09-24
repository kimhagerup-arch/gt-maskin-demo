import { trust } from "../data/siteContent";
import Icon from "./Icon";

export default function TrustStrip() {
  return (
    <section
      className="border-y border-brand-border-dark bg-brand-primary-light"
      aria-label="Kort om GT Maskin"
    >
      <ul className="container-site grid grid-cols-1 gap-3 py-6 text-[15px] font-semibold text-brand-text-inverse sm:grid-cols-2 md:flex md:min-h-[96px] md:flex-wrap md:items-center md:justify-between md:gap-6 md:py-4">
        {trust.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <Icon
              name={item.icon}
              size={22}
              strokeWidth={2}
              className="shrink-0 text-brand-accent-light"
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

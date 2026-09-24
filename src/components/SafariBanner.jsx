import { safari } from "../data/rental";
import Button from "./Button";

export default function SafariBanner() {
  return (
    <div className="flex flex-col gap-5 bg-brand-bg px-6 py-7 text-brand-text md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
        <h3 className="font-display text-3xl tracking-wide md:text-[34px]">{safari.title}</h3>
        <p className="text-base text-brand-muted">{safari.text}</p>
      </div>
      <Button href={safari.url} external arrow size="sm" className="shrink-0">
        {safari.ctaLabel}
      </Button>
    </div>
  );
}

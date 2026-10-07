import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { partsSection } from "../data/siteContent";
import { formatPrice } from "../lib/format";
import Button from "./Button";
import Icon from "./Icon";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

/** Handlekurv-skuff fra høyre. Escape lukker, fokus flyttes inn og tilbake. */
export default function CartDrawer() {
  const cart = useCart();
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const t = partsSection.cart;

  useEffect(() => {
    if (!cart.isOpen) return undefined;
    openerRef.current = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e) => {
      if (e.key === "Escape") cart.close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
      openerRef.current?.focus?.();
    };
  }, [cart.isOpen, cart.close]);

  if (!cart.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-brand-primary/70 animate-fade-in"
        onClick={cart.close}
        aria-label={t.close}
        tabIndex={-1}
      />
      <aside
        className="relative flex h-full w-full max-w-md flex-col border-l border-brand-border-dark bg-brand-primary text-brand-text-inverse animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="handlekurv-tittel"
      >
        <div className="flex h-16 items-center justify-between border-b border-brand-border-dark px-5">
          <h2 id="handlekurv-tittel" className="font-display text-3xl tracking-wide">
            {t.title}
            {cart.count > 0 && (
              <span className="ml-3 font-sans text-sm font-semibold text-brand-muted-inverse">
                {cart.count} {cart.count === 1 ? t.item : t.items}
              </span>
            )}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={cart.close}
            className="flex h-11 w-11 items-center justify-center border border-brand-border-dark-strong"
            aria-label={t.close}
          >
            <Icon name="X" size={22} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <p className="text-brand-muted-inverse">{t.empty}</p>
              <Button
                to={partsSection.checkout.emptyCta.to}
                variant="outlineDark"
                size="sm"
                arrow
                onClick={cart.close}
              >
                {partsSection.checkout.emptyCta.label}
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-brand-border-dark">
              {cart.items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="h-20 w-24 shrink-0 overflow-hidden">
                    {item.image ? (
                      <Picture src={item.image} alt="" sizes="96px" className="h-full w-full" />
                    ) : (
                      <Placeholder label="" className="h-full w-full" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-muted-inverse">
                      {item.brand}
                    </span>
                    <span className="truncate font-bold">{item.title}</span>
                    {item.size && (
                      <span className="text-sm text-brand-muted-inverse">
                        {partsSection.checkout.size} {item.size}
                      </span>
                    )}
                    <span className="font-display text-xl text-brand-accent-light">
                      {formatPrice(item.price)} {partsSection.card.priceSuffix}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="inline-flex items-center border border-brand-border-dark-strong">
                        <button
                          type="button"
                          onClick={() => cart.setQty(item.key, item.qty - 1)}
                          className="flex h-9 w-9 items-center justify-center hover:bg-brand-primary-light"
                          aria-label={`Færre ${item.title}`}
                        >
                          <Icon name="Minus" size={16} strokeWidth={2} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.setQty(item.key, item.qty + 1)}
                          className="flex h-9 w-9 items-center justify-center hover:bg-brand-primary-light"
                          aria-label={`Flere ${item.title}`}
                        >
                          <Icon name="Plus" size={16} strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.key)}
                        className="ml-auto inline-flex h-9 items-center gap-1.5 px-2 text-sm text-brand-muted-inverse hover:text-brand-accent-light"
                      >
                        <Icon name="Trash2" size={16} strokeWidth={2} />
                        {partsSection.checkout.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-brand-border-dark px-5 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-brand-muted-inverse">
                {partsSection.checkout.subtotal}
              </span>
              <span className="font-display text-2xl">
                {cart.subtotal === null ? "[PRIS]" : formatPrice(cart.subtotal)}{" "}
                {partsSection.card.priceSuffix}
              </span>
            </div>
            <p className="text-xs text-brand-muted-inverse">{partsSection.checkout.subtotalNote}</p>
            <Button to="/kasse" onClick={cart.close} arrow disabled={cart.items.length === 0}>
              {t.checkout}
            </Button>
            <Button variant="outlineDark" size="sm" onClick={cart.close}>
              {t.continue}
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}

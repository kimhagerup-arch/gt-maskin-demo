import { useState } from "react";
import Button from "../components/Button";
import CheckoutForm from "../components/CheckoutForm";
import Icon from "../components/Icon";
import Picture from "../components/Picture";
import Placeholder from "../components/Placeholder";
import { useCart } from "../context/CartContext";
import { partsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { formatPrice } from "../lib/format";

export default function Kasse() {
  useSeoMeta(seo.kasse);
  const cart = useCart();
  const t = partsSection.checkout;
  const [done, setDone] = useState(false);

  return (
    <section className="section-pad bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-3">
          <p className="kicker text-brand-accent-light">{partsSection.kicker}</p>
          <h1 className="h1-page">{t.title}</h1>
          <p className="max-w-xl text-lg text-brand-muted-inverse">{t.lead}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <h2 className="text-lg font-bold md:text-[22px]">{t.cartTitle}</h2>
            {cart.items.length === 0 && !done ? (
              <div className="flex flex-col items-start gap-4 border border-brand-border-dark bg-brand-primary-light p-6">
                <p className="text-brand-muted-inverse">{t.empty}</p>
                <Button to={t.emptyCta.to} variant="outlineDark" size="sm" arrow>
                  {t.emptyCta.label}
                </Button>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-brand-border-dark border border-brand-border-dark bg-brand-primary-light px-5">
                {cart.items.map((item) => (
                  <li key={item.slug} className="flex gap-4 py-4">
                    <div className="h-16 w-20 shrink-0 overflow-hidden">
                      {item.image ? (
                        <Picture src={item.image} alt="" sizes="80px" className="h-full w-full" />
                      ) : (
                        <Placeholder label="" className="h-full w-full" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-muted-inverse">
                        {item.brand}
                      </span>
                      <span className="truncate font-bold">{item.title}</span>
                      <span className="text-sm text-brand-muted-inverse">
                        {t.qty}: {item.qty}
                      </span>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <span className="font-display text-xl text-brand-accent-light">
                        {formatPrice(item.price)} {partsSection.card.priceSuffix}
                      </span>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.slug)}
                        className="inline-flex items-center gap-1 text-xs text-brand-muted-inverse hover:text-brand-accent-light"
                      >
                        <Icon name="Trash2" size={14} strokeWidth={2} />
                        {t.remove}
                      </button>
                    </div>
                  </li>
                ))}
                {cart.items.length > 0 && (
                  <li className="flex items-baseline justify-between py-4">
                    <span className="text-sm font-semibold text-brand-muted-inverse">
                      {t.subtotal}
                    </span>
                    <span className="font-display text-2xl">
                      {cart.subtotal === null ? "[PRIS]" : formatPrice(cart.subtotal)}{" "}
                      {partsSection.card.priceSuffix}
                    </span>
                  </li>
                )}
              </ul>
            )}
            {cart.items.length > 0 && (
              <p className="text-xs text-brand-muted-inverse">{t.subtotalNote}</p>
            )}
          </div>

          <div className="lg:col-span-7">
            <CheckoutForm onSuccess={() => setDone(true)} />
          </div>
        </div>
      </div>
    </section>
  );
}

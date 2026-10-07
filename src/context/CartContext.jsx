import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gtm-cart";
const CartContext = createContext(null);

/** Linjenøkkel: slug pluss størrelse, slik at samme plagg i to størrelser gir to linjer. */
export function lineKey(slug, size) {
  return size ? `${slug}::${size}` : slug;
}

function readStorage() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Eldre lagrede linjer uten nøkkel får en.
    return parsed.map((i) => ({ ...i, key: i.key || lineKey(i.slug, i.size) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStorage);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // sessionStorage kan være utilgjengelig, kurven lever da bare i minnet
    }
  }, [items]);

  const add = useCallback((product, qty = 1, size = null) => {
    const key = lineKey(product.slug, size);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          size,
          title: product.title,
          brand: product.brand,
          price: product.price,
          image: product.image || product.placeholderImage || null,
          placeholderLabel: product.placeholderLabel,
          qty,
        },
      ];
    });
    setLastAdded(key);
    setOpen(true);
  }, []);

  const remove = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const setQty = useCallback((key, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const hasUnknownPrice = items.some((i) => String(i.price).startsWith("["));
    const subtotal = hasUnknownPrice
      ? null
      : items.reduce((sum, i) => sum + Number(String(i.price).replace(/\s/g, "")) * i.qty, 0);
    return {
      items,
      count,
      subtotal,
      add,
      remove,
      setQty,
      clear,
      isOpen,
      open,
      close,
      lastAdded,
    };
  }, [items, add, remove, setQty, clear, isOpen, open, close, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart må brukes innenfor CartProvider");
  return ctx;
}

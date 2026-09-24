import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gtm-cart";
const CartContext = createContext(null);

function readStorage() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
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

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          slug: product.slug,
          title: product.title,
          brand: product.brand,
          price: product.price,
          image: product.image,
          placeholderLabel: product.placeholderLabel,
          qty,
        },
      ];
    });
    setLastAdded(product.slug);
    setOpen(true);
  }, []);

  const remove = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
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

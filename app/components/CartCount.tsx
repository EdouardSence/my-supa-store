"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        const items = data.items ?? [];
        const total = items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
        setCount(total);
      } catch {
        // ignore
      }
    }

    fetchCount();

    function handleUpdate() {
      fetchCount();
    }

    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  return (
    <Link
      href="/panier"
      className="relative flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
      aria-label={`Panier — ${count} article${count !== 1 ? "s" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span className="hidden sm:inline">Panier</span>
      {count > 0 && (
        <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold leading-none text-background">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

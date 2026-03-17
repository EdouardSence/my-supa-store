"use client";

import Link from "next/link";
import { useCart } from "@/app/context/cart";

export default function CartCount() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/panier"
      className="relative flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
      aria-label={`Panier — ${totalItems} article${totalItems !== 1 ? "s" : ""}`}
    >
      {/* Bag icon */}
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

      {/* Badge */}
      {totalItems > 0 && (
        <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold leading-none text-background">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}

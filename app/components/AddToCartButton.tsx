"use client";

import { useState } from "react";

type Props = {
  productId: string;
  inStock: boolean;
};

export default function AddToCartButton({ productId, inStock }: Props) {
  const [added, setAdded] = useState(false);

  async function handleClick() {
    if (!inStock) return;

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      setAdded(true);
      window.dispatchEvent(new CustomEvent("cart-updated"));
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!inStock}
      className="w-full rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {!inStock ? "Indisponible" : added ? "Ajouté ✓" : "Ajouter au panier"}
    </button>
  );
}

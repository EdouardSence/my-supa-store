"use client";

import { useState } from "react";
import { useCart } from "@/app/context/cart";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  inStock: boolean;
};

export default function AddToCartButton({ product, inStock }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
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

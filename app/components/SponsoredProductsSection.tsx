"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import SponsoredProductCard from "./SponsoredProductCard";
import type { SponsoredProduct } from "@/domains/catalog/entity/sponsoredProduct";

export default function SponsoredProductsSection({
  products,
}: {
  products: SponsoredProduct[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [revalidating, setRevalidating] = useState(false);

  async function handleRevalidate() {
    setRevalidating(true);
    await fetch("/api/revalidate", { method: "POST" });
    startTransition(() => {
      router.refresh();
      setTimeout(() => setRevalidating(false), 100);
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div
        className="mb-10 flex items-end justify-between border-b pb-4 transition-opacity duration-300"
        style={{
          borderColor: "var(--border-color)",
          opacity: revalidating ? 0.3 : 1,
        }}
      >
        <div>
          <p
            className="mb-1 font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Partenaires
          </p>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-bitcount), monospace" }}
          >
            Produits sponsorisés
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRevalidate}
            disabled={revalidating}
            className="px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border transition-all hover:bg-foreground/5 disabled:opacity-50"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--muted-fg)",
              opacity: revalidating ? 0.3 : 1,
            }}
            title="Actualiser le cache"
          >
            {revalidating ? "..." : "↻"}
          </button>
          <Link
            href="/sponsored"
            className="font-mono text-[10px] tracking-widest uppercase transition-colors hover:text-foreground"
            style={{
              color: "var(--muted-fg)",
              opacity: revalidating ? 0.3 : 1,
            }}
          >
            Voir tout →
          </Link>
        </div>
      </div>

      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-opacity duration-300"
        style={{ opacity: revalidating ? 0.3 : 1 }}
      >
        {products.slice(0, 4).map((product, i: number) => (
          <li
            key={product.id}
            style={{
              animation: revalidating ? "none" : `slide-up 0.5s ${i * 0.08}s ease both`,
              opacity: revalidating ? 0 : 0,
              animationFillMode: revalidating ? "none" : "forwards",
            }}
          >
            <SponsoredProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { getSponsoredProducts } from "@/lib/graphql/client";
import SponsoredProductCard from "@/app/components/SponsoredProductCard";

export default async function SponsoredPage() {
  const products = await getSponsoredProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b py-16" style={{ borderColor: "var(--border-color)" }}>
        <div
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{ background: "var(--accent)", animation: "reveal-line 0.8s ease forwards" }}
          aria-hidden
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8">
          <div>
            <p
              className="mb-4 font-mono text-[10px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              Partenaires
            </p>
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-bitcount), monospace" }}
            >
              Produits<br />Sponsorisés
            </h1>
          </div>

          <div
            className="max-w-xs lg:text-right"
            style={{ animation: "slide-up 0.7s 0.15s ease both", opacity: 0, animationFillMode: "forwards" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              Ces produits sont présentés par nos partenaires. Cliquez sur un article pour en savoir plus.
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-mono text-[20vw] font-bold leading-none"
          style={{ color: "rgba(212,255,30,0.04)" }}
        >
          S
        </span>
      </section>

      {/* ── Products ── */}
      <section className="pt-12">
        <div className="mb-8 flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted-fg)" }}>
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/"
            className="font-mono text-[9px] tracking-widest uppercase transition-colors hover:text-foreground"
            style={{ color: "var(--muted-fg)" }}
          >
            ← Retour
          </Link>
        </div>

        {products.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i: number) => (
              <li
                key={product.id}
                style={{
                  animation: `slide-up 0.5s ${i * 0.08}s ease both`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <SponsoredProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
          >
            <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted-fg)" }}>
              Aucun produit disponible
            </p>
            <Link
              href="/"
              className="mt-4 font-mono text-[9px] tracking-widest uppercase transition-colors hover:text-foreground"
              style={{ color: "var(--accent)" }}
            >
              Retour à l&apos;accueil →
            </Link>
          </div>
        )}
      </section>

      {/* ── Info ── */}
      <section className="mt-16 border-t pt-12" style={{ borderColor: "var(--border-color)" }}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="p-6" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
            <p className="font-mono text-[9px] tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
              À propos
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              Les produits sponsorisés sont sélectionnés par nos équipes en fonction de leur qualité et de leur pertinence pour notre communauté.
            </p>
          </div>
          <div className="p-6" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
            <p className="font-mono text-[9px] tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
              Livraison
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg)" }}>
              Les conditions de vente et de livraison peuvent varier selon les partenaires. Vérifiez les informations sur la page produit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { getAllProducts } from "@/lib/queries";
import { getSponsoredProducts } from "@/lib/graphql/client";
import ProductCard from "@/app/components/ProductCard";
import SponsoredProductsSection from "@/app/components/SponsoredProductsSection";

export default async function HomePage() {
  const [products, sponsoredProducts] = await Promise.all([
    getAllProducts(),
    getSponsoredProducts(),
  ]);

  const featured = products.slice(0, 4);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--border-color)" }}>
        <div
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{ background: "var(--accent)", animation: "reveal-line 1s ease forwards" }}
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8 py-20 lg:py-32">
            <div style={{ animation: "slide-up 0.7s ease both" }}>
              <p
                className="mb-4 font-mono text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                Collection 2026
              </p>
              <h1
                className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight"
                style={{ fontFamily: "var(--font-bitcount), monospace" }}
              >
                My<br />Supa<br />Store
              </h1>
            </div>

            <div
              className="flex flex-col items-start gap-8 pb-2 lg:items-end"
              style={{ animation: "slide-up 0.7s 0.15s ease both", opacity: 0, animationFillMode: "forwards" }}
            >
              <p
                className="max-w-xs text-sm leading-relaxed lg:text-right"
                style={{ color: "var(--muted-fg)" }}
              >
                Des produits soigneusement sélectionnés.<br />
                Une esthétique qui ne fait aucun compromis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/produits"
                  className="px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
                  style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
                >
                  Catalogue →
                </Link>
                <Link
                  href="/a-propos"
                  className="px-6 py-3 font-mono text-xs tracking-widest uppercase border transition-colors hover:bg-foreground/5"
                  style={{ borderColor: "var(--border-color)", color: "var(--muted-fg)" }}
                >
                  À propos
                </Link>
              </div>
            </div>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-mono text-[20vw] font-bold leading-none"
          style={{ color: "rgba(212,255,30,0.04)" }}
        >
          26
        </span>
      </section>

      {/* ── Sponsored products ── */}
      {sponsoredProducts.length > 0 && (
        <SponsoredProductsSection products={sponsoredProducts} />
      )}

      {/* ── Featured products ── */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="mb-1 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
                Sélection
              </p>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-bitcount), monospace" }}
              >
                Du moment
              </h2>
            </div>
            <Link
              href="/produits"
              className="font-mono text-[10px] tracking-widest uppercase transition-colors hover:text-foreground"
              style={{ color: "var(--muted-fg)" }}
            >
              Tout voir →
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i: number) => (
              <li
                key={product.id}
                style={{
                  animation: `slide-up 0.5s ${i * 0.08}s ease both`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Editorial strip ── */}
      <section
        className="border-t border-b py-10 overflow-hidden"
        style={{ borderColor: "var(--border-color)" }}
      >
        <p
          className="whitespace-nowrap font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--muted-fg)" }}
        >
          MY SUPA STORE — DESIGN &amp; QUALITÉ — LIVRAISON RAPIDE — RETOURS FACILES —&nbsp;
          MY SUPA STORE — DESIGN &amp; QUALITÉ — LIVRAISON RAPIDE — RETOURS FACILES —&nbsp;
          MY SUPA STORE — DESIGN &amp; QUALITÉ — LIVRAISON RAPIDE — RETOURS FACILES
        </p>
      </section>
    </div>
  );
}

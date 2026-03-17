import Link from "next/link";
import { getAllProducts } from "@/lib/queries";
import ProductCard from "@/app/components/ProductCard";

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-foreground/40">
          Bienvenue
        </p>
        <h1
          className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-bitcount), sans-serif" }}
        >
          My Supa Store
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/60">
          Des produits soigneusement sélectionnés pour votre quotidien.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/produits"
            className="rounded-xl bg-foreground px-7 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
          >
            Voir le catalogue
          </Link>
          <Link
            href="/a-propos"
            className="rounded-xl border border-foreground/15 px-7 py-3 text-sm font-semibold hover:bg-foreground/5 transition-colors"
          >
            En savoir plus
          </Link>
        </div>

        {/* Decorative gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--foreground) 6%, transparent), transparent)",
          }}
        />
      </section>

      {/* ── Featured products ── */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Sélection du moment</h2>
            <Link
              href="/produits"
              className="text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              Tout voir →
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

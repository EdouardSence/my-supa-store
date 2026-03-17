import { getAllProducts } from "@/lib/queries";
import ProductCard from "@/app/components/ProductCard";

export const metadata = {
  title: "Produits — My Supa Store",
  description: "Parcourez notre catalogue de produits.",
};

export default async function ProduitsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* ── Page header ── */}
      <header className="relative border-b py-14 lg:py-20" style={{ borderColor: "var(--border-color)" }}>
        {/* Accent rule */}
        <div
          className="absolute top-0 left-0 h-px w-24 origin-left"
          style={{ background: "var(--accent)", animation: "reveal-line 0.8s ease forwards" }}
          aria-hidden
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="mb-3 font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              Catalogue
            </p>
            <h1
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-none tracking-tight"
              style={{ fontFamily: "var(--font-bitcount), monospace" }}
            >
              Nos produits
            </h1>
          </div>

          <p
            className="font-mono text-xs tracking-widest pb-1"
            style={{ color: "var(--muted-fg)" }}
          >
            {products.length}&nbsp;article{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      {/* ── Grid ── */}
      <section className="py-10 pb-20">
        {products.length === 0 ? (
          <p
            className="py-24 text-center font-mono text-sm tracking-widest uppercase"
            style={{ color: "var(--muted-fg)" }}
          >
            Aucun produit disponible.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

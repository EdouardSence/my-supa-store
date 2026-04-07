import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  abGroup?: "A" | "B";
};

export default function SimilarProducts({ products, abGroup = "A" }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <p className="mb-1 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
            Vous aimerez aussi
          </p>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-bitcount), monospace" }}
          >
            Produits similaires
          </h2>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <li
            key={p.id}
            style={{
              animation: `slide-up 0.5s ${i * 0.08}s ease both`,
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <ProductCard product={p} abGroup={abGroup} />
          </li>
        ))}
      </ul>
    </section>
  );
}

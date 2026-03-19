import { getSponsoredProducts } from "@/lib/graphql/client";
import SponsoredProductCard from "@/app/components/SponsoredProductCard";

export default async function SponsoredSlot() {
  const sponsored = await getSponsoredProducts();
  if (sponsored.length === 0) return null;
  return (
    <section className="mt-20 border-t pt-16" style={{ borderColor: "var(--border-color)" }}>
      <div className="mb-10">
        <p className="mb-1 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
          Partenaires
        </p>
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-bitcount), monospace" }}
        >
          Produits sponsorisés
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sponsored.slice(0, 4).map((product) => (
          <li key={product.id}>
            <SponsoredProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

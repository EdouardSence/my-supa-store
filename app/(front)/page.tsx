import { getAllProducts } from "@/lib/queries";
import ProductCard from "@/app/components/ProductCard";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Nos produits</h1>
        <p className="mt-3 text-foreground/60">
          {products.length} article{products.length !== 1 ? "s" : ""} disponible{products.length !== 1 ? "s" : ""}
        </p>
      </section>

      {/* Product grid */}
      <section>
        {products.length === 0 ? (
          <p className="text-center text-foreground/50">Aucun produit disponible.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

import { products } from "@/lib/products";
import ProductCard from "@/app/components/ProductCard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Nos produits
        </h1>
        <p className="mt-3 text-foreground/60">
          {products.length} articles disponibles
        </p>
      </section>

      {/* Product grid */}
      <section>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { type Product, formatPrice } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, price, currency, stock, category, brand, images } =
    product;

  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 10;

  return (
    <Link
      href={`/produits/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-foreground/5">
        <Image
          src={images.main}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Stock badge */}
        {!inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-xs font-medium text-background">
            Rupture de stock
          </span>
        )}
        {lowStock && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-medium text-white">
            Plus que {stock}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-foreground/50">
              {brand} · {category}
            </p>
            <h2 className="mt-0.5 text-sm font-semibold leading-snug">{name}</h2>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold">
            {formatPrice(price, currency)}
          </span>
          <span
            className={`text-xs font-medium ${
              inStock ? "text-green-600 dark:text-green-400" : "text-foreground/40"
            }`}
          >
            {inStock ? "En stock" : "Indisponible"}
          </span>
        </div>
      </div>
    </Link>
  );
}

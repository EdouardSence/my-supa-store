import Image from "next/image";
import Link from "next/link";
import { type Product, formatPrice } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, price, currency, stock, category, brand, images } = product;

  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 10;

  return (
    <Link
      href={`/produits/${slug}`}
      className="group relative block overflow-hidden bg-[--card-bg]"
      style={{ border: "1px solid var(--border-color)" }}
    >
      {/* Portrait image — 4:5 ratio */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={images.main}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Gradient scrim — always present, intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category — top left */}
        <span className="absolute left-3 top-3 font-mono text-[9px] tracking-[0.15em] uppercase text-white/50">
          {category}
        </span>

        {/* Stock badge */}
        {!inStock && (
          <span className="absolute right-3 top-3 bg-foreground/80 px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase text-background">
            Rupture
          </span>
        )}
        {lowStock && (
          <span className="absolute right-3 top-3 bg-accent px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase text-accent-fg">
            {stock} restants
          </span>
        )}

        {/* Info overlay — bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">{brand}</p>
          <h2 className="mt-1 text-sm font-semibold leading-snug text-white"
            style={{ fontFamily: "var(--font-bitcount), monospace" }}>
            {name}
          </h2>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-sm font-bold text-white">
              {formatPrice(price, currency)}
            </span>
            {/* Arrow — appears on hover */}
            <span
              className="flex h-7 w-7 items-center justify-center border border-white/20 text-xs text-white/0 transition-all duration-300 group-hover:border-accent group-hover:text-accent"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

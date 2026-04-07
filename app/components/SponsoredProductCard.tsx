import Link from "next/link";
import Image from "next/image";
import type { SponsoredProduct } from "@/domains/catalog/entity/sponsoredProduct";

type Props = {
  product: SponsoredProduct;
  showDescription?: boolean;
};

function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export default function SponsoredProductCard({ product, showDescription = true }: Props) {
  return (
    <Link
      href={`/sponsored/${product.handle}`}
      className="group block overflow-hidden transition-all hover:opacity-90"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--card-bg)" }}>
            <span className="font-mono text-4xl text-[var(--muted-fg)]" style={{ opacity: 0.3 }}>
              ?
            </span>
          </div>
        )}
        <span
          className="absolute left-0 top-4 px-2 py-1 text-[8px] font-mono tracking-widest uppercase"
          style={{
            background: "var(--accent)",
            color: "var(--accent-fg)",
          }}
        >
          Sponsorisé
        </span>
      </div>

      <div className="p-4">
        <h3
          className="text-sm font-medium leading-tight line-clamp-2"
          style={{ fontFamily: "var(--font-bitcount), monospace" }}
        >
          {product.name}
        </h3>

        <p
          className="mt-2 font-mono text-sm font-bold"
          style={{ color: "var(--accent)" }}
        >
          {formatPrice(product.price, product.currency)}
        </p>

        {showDescription && product.description && (
          <p
            className="mt-3 text-xs leading-relaxed line-clamp-2 transition-opacity duration-300 group-hover:opacity-100"
            style={{ color: "var(--muted-fg)", opacity: 0.7 }}
          >
            {product.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <span
            className="font-mono text-[9px] tracking-widest uppercase transition-colors group-hover:text-foreground"
            style={{ color: "var(--accent)" }}
          >
            Voir details
          </span>
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: "var(--accent)" }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

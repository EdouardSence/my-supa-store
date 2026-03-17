import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug, formatPrice } from "@/lib/products";

// ─── Types ────────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.name} — My Supa Store`,
    description: product.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const { name, description, price, currency, stock, category, brand, images, specs, sku } =
    product;

  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 10;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-8 flex items-center gap-2 text-sm text-foreground/50">
        <Link href="/" className="hover:text-foreground transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/produits" className="hover:text-foreground transition-colors">
          Produits
        </Link>
        <span>/</span>
        <span className="text-foreground">{name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* ── Gallery ── */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-foreground/5">
            <Image
              src={images.main}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          {images.gallery.length > 1 && (
            <ul className="flex gap-3">
              {images.gallery.map((src, i) => (
                <li key={i} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-foreground/5">
                  <Image
                    src={src}
                    alt={`${name} — vue ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <p className="text-sm text-foreground/50">
              {brand} · {category}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{name}</h1>
            <p className="mt-1 text-xs text-foreground/40">SKU : {sku}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold">
              {formatPrice(price, currency)}
            </span>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                inStock ? "bg-green-500" : "bg-foreground/30"
              }`}
            />
            <span className="text-sm">
              {!inStock && "Rupture de stock"}
              {lowStock && `Plus que ${stock} en stock`}
              {inStock && !lowStock && "En stock"}
            </span>
          </div>

          {/* Description */}
          <p className="leading-relaxed text-foreground/70">{description}</p>

          {/* CTA */}
          <button
            disabled={!inStock}
            className="w-full rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {inStock ? "Ajouter au panier" : "Indisponible"}
          </button>

          {/* Specs */}
          <div className="rounded-xl border border-foreground/10 p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/50">
              Caractéristiques
            </h2>
            <dl className="space-y-2">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <dt className="capitalize text-foreground/60">
                    {key.replace(/([A-Z])/g, " $1")}
                  </dt>
                  <dd className="font-medium">
                    {typeof value === "boolean" ? (value ? "Oui" : "Non") : String(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

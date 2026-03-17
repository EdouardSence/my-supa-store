import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@/lib/queries";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "@/app/components/AddToCartButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ slug: string }>;
};

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.name} — My Supa Store`,
    description: product.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { name, description, price, currency, stock, category, brand, images, specs, sku } =
    product;

  const inStock = stock > 0;
  const lowStock = stock > 0 && stock <= 10;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-2 py-6 font-mono text-[9px] tracking-[0.2em] uppercase"
        style={{ color: "var(--muted-fg)" }}
      >
        <Link href="/" className="transition-colors hover:text-foreground">Accueil</Link>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <Link href="/produits" className="transition-colors hover:text-foreground">Produits</Link>
        <span style={{ color: "var(--border-color)" }}>╱</span>
        <span className="text-foreground">{name}</span>
      </nav>

      {/* ── Content grid ── */}
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1px_1fr]">
        {/* ── Gallery ── */}
        <div className="flex flex-col gap-4 pr-0 pb-12 lg:pr-12 lg:pb-0">
          {/* Main image */}
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
          >
            <Image
              src={images.main}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Category tag — top left */}
            <span
              className="absolute left-0 top-6 px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            >
              {category}
            </span>
            {/* Out-of-stock veil */}
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(12,12,12,0.7)" }}>
                <span className="font-mono text-sm tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
                  Rupture de stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.gallery.length > 1 && (
            <ul className="flex gap-2">
              {images.gallery.map((src, i) => (
                <li
                  key={i}
                  className="relative h-16 w-16 flex-shrink-0 overflow-hidden"
                  style={{ border: "1px solid var(--border-color)" }}
                >
                  <Image
                    src={src}
                    alt={`${name} — vue ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block" style={{ background: "var(--border-color)" }} />

        {/* ── Info ── */}
        <div className="flex flex-col gap-8 pt-0 lg:pl-12 lg:pt-0">
          {/* Brand + name */}
          <div className="border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
            {/* Accent top rule */}
            <div
              className="mb-8 h-px w-12 origin-left"
              style={{ background: "var(--accent)", animation: "reveal-line 0.8s ease forwards" }}
              aria-hidden
            />
            <p
              className="mb-2 font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "var(--muted-fg)" }}
            >
              {brand}
            </p>
            <h1
              className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-bitcount), monospace" }}
            >
              {name}
            </h1>
            <p
              className="mt-2 font-mono text-[9px] tracking-widest"
              style={{ color: "var(--muted-fg)" }}
            >
              SKU: {sku}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between border-b pb-8" style={{ borderColor: "var(--border-color)" }}>
            <span
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight"
            >
              {formatPrice(price, currency)}
            </span>

            {/* Stock indicator */}
            <span
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5"
              style={
                !inStock
                  ? { color: "var(--muted-fg)", border: "1px solid var(--border-color)" }
                  : lowStock
                  ? { background: "var(--accent)", color: "var(--accent-fg)" }
                  : { color: "var(--accent)", border: "1px solid var(--accent)" }
              }
            >
              {!inStock ? "Rupture" : lowStock ? `${stock} restants` : "En stock"}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--muted-fg)" }}
          >
            {description}
          </p>

          {/* CTA */}
          <AddToCartButton product={product} inStock={inStock} />

          {/* Specs */}
          <div className="border-t pt-8" style={{ borderColor: "var(--border-color)" }}>
            <p
              className="mb-4 font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              Caractéristiques
            </p>
            <dl>
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-baseline justify-between border-b py-2.5 last:border-0"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <dt
                    className="font-mono text-[10px] tracking-widest capitalize"
                    style={{ color: "var(--muted-fg)" }}
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </dt>
                  <dd className="text-sm font-medium">
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
